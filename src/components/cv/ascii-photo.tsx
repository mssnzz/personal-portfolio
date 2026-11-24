"use client";

import { useEffect, useRef } from "react";
import { mountDither } from "@/components/cv/dither";

/**
 * The hero portrait, rendered as a dithered field of square marks. All of the
 * rendering lives in `dither.ts`; this is the frame around it.
 *
 * Drop the photo at /public and pass its path as `src`. It should be cut out
 * against transparency — the renderer treats alpha as coverage and skips empty
 * cells, so a flattened background would fill one theme or the other with a
 * solid slab.
 *
 * `backdrop` drops the frame and the caption and fills its parent, for the
 * centred hero where the portrait sits behind the statement; the parent owns
 * the opacity and the fade at the edges.
 */
export function AsciiPhoto({
  src,
  backdrop,
}: {
  src: string;
  backdrop?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return mountDither(canvas, {
      source: { kind: "image", src },
      tone: "photo",
      // never crop the sitter, whatever size the frame takes
      fit: "contain",
      // contain leaves the head smaller in frame than cover would, so the
      // grid has to be fine enough to keep an eye and a mouth legible
      cell: 5,
      // brings the far cheek and the hair back as stipple so the head reads
      // centred in its frame
      gamma: 1.5,
    });
  }, [src]);

  if (backdrop) {
    return (
      <canvas
        ref={canvasRef}
        className="h-full w-full text-foreground"
        aria-label="Portrait rendered as ASCII dither"
        role="img"
      />
    );
  }

  return (
    <div className="relative h-full w-full border border-border bg-background/40">
      <canvas
        ref={canvasRef}
        className="h-full min-h-[420px] w-full text-foreground/70"
        aria-label="Portrait rendered as ASCII dither"
        role="img"
      />
      <span className="absolute bottom-2 right-2 font-mono text-xs tracking-[0.06em] text-muted-foreground">
        Fig. 1
      </span>
    </div>
  );
}
