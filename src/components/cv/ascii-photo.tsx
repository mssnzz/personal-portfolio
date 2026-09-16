"use client";

import { useEffect, useRef } from "react";
import { mountDither } from "@/components/cv/dither";

/**
 * The hero portrait, rendered as a dithered field of square marks. All of the
 * rendering lives in `dither.ts`, which the section dividers share; this is the
 * framed panel around it.
 *
 * Drop the photo at /public and pass its path as `src`. It should be cut out
 * against transparency — the renderer treats alpha as coverage and skips empty
 * cells, so a flattened background would fill one theme or the other with a
 * solid slab. Match its aspect to the panel's, or cover-fit will crop it.
 */
export function AsciiPhoto({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return mountDither(canvas, {
      source: { kind: "image", src },
      tone: "photo",
      // never crop the sitter, whatever height the column beside this takes
      fit: "contain",
      // contain leaves the head smaller in frame than cover did, so the grid
      // has to get finer to keep an eye and a mouth legible
      cell: 5,
      // 2 threw the shadow side and the hair away entirely, piling every mark
      // on the lit half of the face; 1.4 brings the far cheek and the hair
      // back as stipple so the head reads centred in its frame
      gamma: 1.5,
    });
  }, [src]);

  return (
    <div className="relative h-full w-full border border-border/50 bg-background/40">
      <canvas
        ref={canvasRef}
        className="h-full min-h-[420px] w-full text-foreground/70"
        aria-label="Portrait rendered as ASCII dither"
        role="img"
      />
      <span className="absolute bottom-2 right-2 font-mono text-[11px] tracking-[0.06em] text-muted-foreground/60">
        Fig. 1
      </span>
    </div>
  );
}
