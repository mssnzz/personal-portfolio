/**
 * The Bayer-dither renderer behind both the hero portrait and the section
 * dividers. Canvas2D, monochrome in the element's own `color` so it inherits
 * the theme, square marks rather than round dots, and cells that blink on their
 * own clocks instead of drifting together as one wave.
 *
 * Two source kinds share the pipeline because the only thing that differs is
 * how the cell grid gets filled and how a filled cell becomes ink:
 *
 * - `image` + `tone: "photo"`. A hard-lit portrait is bimodal, so luminance is
 *   graded through an equalised curve before it picks a mark size, and ink
 *   coverage flips with the theme — light ink on a dark page inks the
 *   highlights, dark ink on a light page inks the shadows. Either way the
 *   result reads as a positive rather than a negative.
 * - `text` + `tone: "mask"`. A glyph has no tone to grade: it is either on the
 *   letterform or off it. Alpha alone is the coverage, which also means the
 *   word inks the same way in both themes instead of inverting into its own
 *   counterform. Antialiasing at the glyph edge arrives as partial alpha and
 *   comes out as smaller marks, which is exactly the fringe the look wants.
 */

export type DitherSource =
  | { kind: "image"; src: string }
  | { kind: "text"; text: string };

export type DitherOptions = {
  source: DitherSource;
  tone: "photo" | "mask";
  /** logical px per cell; smaller is finer and costs more per frame */
  cell?: number;
  /**
   * A face has tone everywhere, so noise reads as texture on it. A letterform
   * is a thin solid shape, and the same noise reads as erosion — shrink enough
   * cells inside a two-cell stem and the stroke breaks. Type therefore wants a
   * finer grid and a fraction of the movement.
   */
  flicker?: number;
  flickerDensity?: number;
  ditherAmount?: number;
  /**
   * "cover" fills the grid and crops whatever overhangs; "contain" fits the
   * whole image inside it and leaves the remainder empty. A portrait wants
   * contain — the panel's height is set by whatever the column beside it
   * happens to hold, and nothing about editing that copy should start
   * trimming someone's shoulders off.
   */
  fit?: "cover" | "contain";
  /**
   * How hard the shadows are pushed down after the tone curve. High values
   * separate figure from ground but throw the whole shadow side of a side-lit
   * face away, which leaves the ink piled on the lit half and the frame
   * looking off-centre even when the sitter is dead centre.
   */
  gamma?: number;
};

// Squares tile; circles never do. A mark at full cell size would fuse with its
// neighbours and flatten every highlight into one slab, so cap it short of the
// cell and the lattice stays visible all the way up.
const MAX_FILL = 0.9;
const EQ_MIX = 0.6; // how far to pull the tone curve towards a flat histogram
const GAMMA = 2; // ...then push the shadows back down, to keep hair off skin
const DITHER = 0.35; // how hard the Bayer threshold pushes the mark size around
const FPS = 24; // the flicker reads the same as at 60, at a third of the work
const FLICKER = 0.22; // how far a blinking cell swings its tone
const FLICKER_DENSITY = 0.4; // share of cells that blink at all
const FLICKER_MS = 110; // how long a cell holds a value before re-rolling
const SUPERSAMPLE = 4; // glyphs are drawn this much larger, then averaged down

// Cheap integer hash. Two cells must not agree and one cell must not repeat,
// which is all this needs — a cell's blink is hash(x, y, step), so the value
// is stable for the length of a step and unrelated to its neighbours'.
function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = ((h ^ (h >>> 13)) * 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

/** Starts rendering into `canvas`; returns the teardown. */
export function mountDither(
  canvas: HTMLCanvasElement,
  {
    source,
    tone: toneMode,
    cell: CELL = 7,
    fit = "cover",
    gamma: GAMMA_V = GAMMA,
    flicker: FLICK = FLICKER,
    flickerDensity: FLICK_DENSITY = FLICKER_DENSITY,
    ditherAmount: DITHER_AMT = DITHER,
  }: DitherOptions,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  let cols = 0;
  let rows = 0;
  let sample: Uint8ClampedArray | null = null;
  let tone: Float32Array | null = null;
  // which cells blink, and how far each one is offset into its own cycle so
  // they do not all re-roll on the same tick
  let phase: Float32Array | null = null;
  let raf = 0;
  let ready = false;
  let disposed = false;

  // offscreen buffer sized to the cell grid: drawImage downscales, averaging
  // each cell into one pixel for free.
  const buf = document.createElement("canvas");
  const bctx = buf.getContext("2d", { willReadFrequently: true });

  const img = source.kind === "image" ? new Image() : null;
  if (img) img.crossOrigin = "anonymous";

  function paintImage() {
    if (!bctx || !img) return;
    const ir = img.width / img.height;
    const gr = cols / rows;
    bctx.clearRect(0, 0, cols, rows);

    if (fit === "contain") {
      // whole image, centred, with the leftover grid left transparent
      let dw = cols;
      let dh = cols / ir;
      if (ir < gr) {
        dh = rows;
        dw = rows * ir;
      }
      bctx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      return;
    }

    let sw = img.width;
    let sh = img.height;
    let sx = 0;
    let sy = 0;
    if (ir > gr) {
      sw = img.height * gr;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / gr;
      sy = (img.height - sh) / 2;
    }
    bctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  }

  function paintText(text: string) {
    if (!bctx) return;
    // Draw large and average down: typesetting straight into a grid this
    // coarse would alias the stems away, whereas downscaling turns the glyph
    // edge into the partial coverage the dither wants.
    const tmp = document.createElement("canvas");
    tmp.width = cols * SUPERSAMPLE;
    tmp.height = rows * SUPERSAMPLE;
    const tctx = tmp.getContext("2d");
    if (!tctx) return;

    const family = getComputedStyle(canvas).fontFamily || "monospace";
    tctx.textAlign = "left";
    tctx.textBaseline = "middle";
    tctx.fillStyle = "#fff";

    const target = tmp.width * 0.98;

    // Start from the height the band allows, then shrink to whatever the width
    // permits — advance width is linear in size, so one measurement settles it.
    let size = tmp.height * 0.82;
    tctx.font = `700 ${size}px ${family}`;
    let measured = tctx.measureText(text).width;
    if (measured > 0 && measured > target) {
      size *= target / measured;
      tctx.font = `700 ${size}px ${family}`;
      measured = tctx.measureText(text).width;
    }

    // A short word would otherwise float in the middle of the column while a
    // long one ran edge to edge. Track it out to the same measure instead, so
    // every divider is one full-width rule of type and none of them needs to
    // be centred — which this layout never is anywhere else.
    const gaps = text.length - 1;
    let lead = 0;
    if (gaps > 0 && measured < target) {
      lead = (target - measured) / gaps;
      tctx.letterSpacing = `${lead}px`;
      const tracked = tctx.measureText(text).width;
      // ctx.letterSpacing is recent enough that a browser without it just
      // ignores the assignment. Confirm it actually moved before trusting it,
      // or the centring below would offset by a lead that was never applied.
      if (tracked > measured) measured = tracked;
      else lead = 0;
    }

    // letterSpacing pads the last glyph too, so the drawn run is one lead
    // narrower than the advance the measurement reports.
    const drawn = measured - (lead > 0 ? lead : 0);
    tctx.fillText(text, (tmp.width - drawn) / 2, tmp.height / 2);

    bctx.clearRect(0, 0, cols, rows);
    bctx.drawImage(tmp, 0, 0, cols, rows);
  }

  function measure() {
    if (!bctx || !ready) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(1, Math.floor(w / CELL));
    rows = Math.max(1, Math.floor(h / CELL));
    buf.width = cols;
    buf.height = rows;

    if (source.kind === "image") paintImage();
    else paintText(source.text);

    sample = bctx.getImageData(0, 0, cols, rows).data;
    tone = toneMode === "photo" ? toneCurve(sample) : null;

    // negative marks a cell that never blinks, so the frame loop reads one
    // number per cell instead of hashing twice
    phase = new Float32Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        phase[y * cols + x] =
          hash(x, y, 7) < FLICK_DENSITY ? hash(x, y, 11) : -1;
      }
    }
  }

  // Tone curve for this crop: the CDF of the subject's own luminance, which
  // maps a lopsided histogram onto an even spread of mark sizes, blended
  // back towards the identity so the shadows are not lifted along with it.
  function toneCurve(data: Uint8ClampedArray) {
    const hist = new Uint32Array(256);
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 16) continue; // outside the cut-out
      const l =
        (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      hist[Math.round(l * 255)]++;
      n++;
    }
    const lut = new Float32Array(256);
    if (!n) return lut;
    let acc = 0;
    for (let i = 0; i < 256; i++) {
      acc += hist[i];
      lut[i] = (i / 255) * (1 - EQ_MIX) + (acc / n) * EQ_MIX;
    }
    return lut;
  }

  // Measure the ink instead of parsing it: the computed colour can come back
  // as rgb(), oklch() or color(), so paint one pixel over black and read it
  // back. Cached on the colour string, so a theme flip repaints and anything
  // else is a string compare.
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const pctx = probe.getContext("2d", { willReadFrequently: true });
  let inkCache = { css: "", lum: 0.5 };

  function inkLum(css: string) {
    if (css === inkCache.css || !pctx) return inkCache.lum;
    pctx.fillStyle = "#000";
    pctx.fillRect(0, 0, 1, 1);
    pctx.fillStyle = css;
    pctx.fillRect(0, 0, 1, 1);
    const d = pctx.getImageData(0, 0, 1, 1).data;
    const lum = (0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2]) / 255;
    inkCache = { css, lum };
    return lum;
  }

  function frame(t: number) {
    if (!sample) return;
    const rect = canvas.getBoundingClientRect();
    ctx!.clearRect(0, 0, rect.width, rect.height);
    const css = getComputedStyle(canvas).color || "#888";
    ctx!.fillStyle = css;
    const brightInk = inkLum(css) > 0.5;
    const amp = reduce ? 0 : FLICK;
    const mask = toneMode === "mask";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        // alpha is how much of the cell the subject covers; nothing outside it
        // gets ink, so the page shows through in either theme
        const a = sample[i + 3] / 255;
        if (a < 0.06) continue;

        let lum: number;
        if (mask) {
          lum = a;
        } else {
          const raw =
            (0.299 * sample[i] +
              0.587 * sample[i + 1] +
              0.114 * sample[i + 2]) /
            255;
          lum = tone ? tone[Math.round(raw * 255)] : raw;
        }

        // blink: hold a random offset for a step, then re-roll. Cells in the
        // midtones cross the threshold and wink out; ones deep in the
        // highlights only breathe a little.
        const p = phase ? phase[y * cols + x] : -1;
        if (amp && p >= 0) {
          const step = Math.floor(t / FLICKER_MS + p);
          lum += (hash(x, y, step) - 0.5) * 2 * amp;
        }

        // A glyph is on or off, so its coverage is the mask itself and stays
        // put when the theme flips. A photo's has to follow the ink.
        const signed = mask ? lum : brightInk ? lum : 1 - lum;
        const coverage = mask
          ? Math.max(0, Math.min(1, signed))
          : Math.pow(Math.max(0, Math.min(1, signed)), GAMMA_V);

        const threshold = BAYER[y & 3][x & 3];
        const v = coverage - (threshold - 0.5) * DITHER_AMT;
        if (v <= 0.02) continue;
        // in mask mode alpha is already inside v, so it must not scale twice
        const side = CELL * MAX_FILL * Math.min(1, v) * (mask ? 1 : a);
        if (side < 0.6) continue;
        const off = (CELL - side) / 2;
        ctx!.globalAlpha = Math.min(1, 0.45 + v);
        ctx!.fillRect(x * CELL + off, y * CELL + off, side, side);
      }
    }
    ctx!.globalAlpha = 1;
  }

  // Repaint on a clock rather than every vsync: a 7px cell puts thousands of
  // fillRects in each pass, and the flicker is slow enough that nobody can
  // tell 24 from 60.
  let last = -Infinity;
  function tick(t: number) {
    raf = requestAnimationFrame(tick);
    if (t - last < 1000 / FPS) return;
    last = t;
    frame(t);
  }

  const ro = new ResizeObserver(() => {
    measure();
    if (reduce) frame(0);
  });

  // Several of these run on one page, each redrawing thousands of marks a
  // frame. None of that is worth spending on a divider that is scrolled past,
  // so the loop only runs while the canvas is actually on screen.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!ready || reduce || disposed) return;
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(tick);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { rootMargin: "120px" },
  );

  function start() {
    if (disposed) return;
    ready = true;
    measure();
    ro.observe(canvas);
    if (reduce) {
      frame(0);
      return;
    }
    raf = requestAnimationFrame(tick);
    io.observe(canvas);
  }

  if (img) {
    img.onload = start;
    img.onerror = () => {
      /* no photo yet: leave the canvas transparent, no broken image */
    };
    img.src = (source as { kind: "image"; src: string }).src;
  } else {
    // Type the word only once its face is actually available, or the metrics
    // come from the fallback and the fitted size is wrong.
    const fonts = document.fonts;
    if (fonts?.ready) fonts.ready.then(start).catch(start);
    else start();
  }

  return () => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
}
