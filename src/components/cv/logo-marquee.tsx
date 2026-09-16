"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

type Mark = { title: string; logo?: string; logoFilter?: string };

/**
 * The client marks, drifting past on the page's own dark ground.
 *
 * The grid this replaced sat every logo on a light plate, because these marks
 * are a mixed bag — some drawn in white, some in black, some carrying their
 * own colour — and no single treatment suits all of them. A band on the dark
 * ground inverts that problem rather than solving it, so the two that do not
 * read are corrected individually in the data instead of by a blanket
 * silhouette filter, which would have flattened the three that carry colour
 * into white blocks.
 *
 * The track is rendered twice and translated by exactly half its width, which
 * is what makes the loop seamless; `aria-hidden` on the copy keeps the screen
 * reader from hearing every client twice.
 */
export function LogoMarquee({ items }: { items: Mark[] }) {
  const reduce = useReducedMotion();
  const marks = items.filter((item): item is Mark & { logo: string } =>
    Boolean(item.logo),
  );
  if (marks.length === 0) return null;

  const track = (duplicate: boolean) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20"
    >
      {marks.map((mark) => (
        <li key={`${mark.title}-${duplicate}`} className="shrink-0">
          <Image
            src={mark.logo}
            alt={duplicate ? "" : mark.title}
            width={180}
            height={48}
            style={mark.logoFilter ? { filter: mark.logoFilter } : undefined}
            className="h-7 w-auto object-contain opacity-70 transition-opacity duration-500 hover:opacity-100 md:h-8"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group relative mt-12 overflow-hidden border-y border-border/50 py-8 md:py-10"
      style={{
        // the marks fade out rather than being sliced off at the column edge
        maskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className={
          reduce
            ? "flex w-max"
            : "flex w-max animate-[marquee_44s_linear_infinite] group-hover:[animation-play-state:paused]"
        }
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
