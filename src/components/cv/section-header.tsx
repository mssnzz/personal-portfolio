"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion";

/**
 * The opening of every section: number, running head, headline, lead.
 *
 * The page used to separate sections with a small mono rule and a 30px h2, and
 * at that size one section ran into the next — a reader could not tell where
 * the experience ended and the product began. The number is now set large in
 * the accent, the headline at display size, and the rule above it spans the
 * column, so each section announces itself before any of its content does.
 */
export function SectionHeader({
  index,
  label,
  meta,
  title,
  lead,
  display,
}: {
  /** Two-digit section number. */
  index: string;
  /** Short running head beside the number. */
  label: string;
  /** Right-hand counter — furniture, not a sentence. */
  meta?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** The close of the page: headline at poster size. */
  display?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <header>
      <div ref={ref} className="flex items-center gap-4">
        <span className="font-mono text-sm tabular-nums text-[var(--pf-accent)]">
          {index}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">
          {label}
        </span>
        {/* Drawn from the number outward, so the eye starts there. */}
        <motion.span
          aria-hidden="true"
          className="h-px flex-1 origin-left bg-border"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        />
        {meta ? (
          <span className="hidden font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:block">
            {meta}
          </span>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
        <Reveal>
          <h2
            className={`font-medium leading-[1.02] tracking-[-0.04em] ${
              display
                ? "text-[clamp(3.5rem,11vw,9rem)]"
                : "text-[clamp(2.25rem,5.5vw,4rem)]"
            }`}
          >
            {title}
          </h2>
        </Reveal>
        {lead ? (
          <Reveal delay={0.12}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

/**
 * The band every section sits in. Alternate sections take a faint tint, so the
 * boundary is carried by the background as well as by the rule — the same
 * reason printed reports shade alternate rows.
 */
export function SectionShell({
  id,
  tinted,
  children,
}: {
  id: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-section
      className={`scroll-mt-24 border-t border-border py-20 md:py-28 ${
        // Opaque either way: the column grid fixed behind the page should
        // stop at the hero, not show through the tint.
        tinted
          ? "bg-[color-mix(in_oklab,var(--foreground)_4.5%,var(--background))]"
          : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  );
}
