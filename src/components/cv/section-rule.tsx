"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * The marker between sections: an index entry, not a title.
 *
 * Each section already opens with its own h2, so a second headline above it
 * split the section's voice in two and won the fight on size alone. This says
 * only what a running head should — where you are, what it is, how much of it
 * there is — in the mono the rest of the CV furniture is set in, and hands the
 * actual heading back to the section.
 *
 * It is real text, so it is selectable, searchable and present without JS; the
 * rule is the only animated part, and it is the only thing lost to a reduced
 * motion preference.
 */
export function SectionRule({
  index,
  label,
  meta,
}: {
  /** Section number, printed as `§ 01`. */
  index: string;
  label: string;
  /** Right-hand counter — kept short; it is furniture, not a sentence. */
  meta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-8 md:px-10 md:pt-10">
      <div ref={ref} className="flex items-center gap-4">
        <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-[var(--pf-accent)]">
          § {index}
        </span>

        {/* Deliberately not a heading: the section's own h2 is the heading,
            and a second one here would duplicate it in the outline — the same
            split this replaced, moved from the page into the a11y tree. */}
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
          {label}
        </span>

        {/* Drawn from the index outward, so the eye starts at the number. */}
        <motion.span
          aria-hidden="true"
          className="h-px flex-1 origin-left bg-border/60"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        />

        {meta ? (
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60 sm:block">
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
