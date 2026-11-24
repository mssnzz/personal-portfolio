"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { experience, type Track } from "@/components/cv/data";
import { SectionHeader, SectionShell } from "@/components/cv/section-header";

/** Development work is carried in the accent; support stays neutral. */
const dotColour: Record<Track, string> = {
  dev: "bg-[var(--pf-accent)] border-[var(--pf-accent)]",
  now: "bg-[var(--pf-accent)] border-[var(--pf-accent)]",
  support: "bg-foreground/60 border-foreground/60",
};

/**
 * The roles as a timeline that fills as you read it.
 *
 * A vertical line runs down the left of the roles and an accent line grows
 * over it with the scroll, so the reader can see how far through the history
 * they are; each role's marker lights as the line reaches it. The cards this
 * replaced were boxed one under another with nothing to say they were a
 * sequence.
 */
export function CvExperience({
  contributions,
}: {
  /** Server-rendered panel dropped under the roles — see `page.tsx`. */
  contributions?: ReactNode;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    // Starts filling as the first role reaches mid-screen, done as the last
    // one does.
    offset: ["start 55%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <SectionShell id="experience">
      <SectionHeader
        index="01"
        label="Experience"
        meta={`${experience.length} roles · 2019 — 2026`}
        title="Building now, tested in production."
        lead="Development first, with two years of QA and support on a live iOS, Android and web product. Full history on request."
      />

      <ol ref={listRef} className="relative mt-16 md:mt-20">
        {/* The track and its fill. Left edge on phones, between the date
            column and the role on desktop. */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-border md:left-[203px]"
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-[var(--pf-accent)] md:left-[203px]"
          style={{ scaleY: reduce ? 1 : fill }}
        />

        {experience.map((job, i) => (
          <li
            key={job.title + job.range}
            className="relative grid gap-4 pb-16 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-12 md:pl-0"
          >
            {/* Marker: hollow until the reader reaches it. */}
            <motion.span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 size-[11px] border-2 md:left-[198px] ${dotColour[job.track]}`}
              initial={{ scale: 0.4, opacity: 0.3 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -45% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            />

            <div className="flex flex-col gap-2 md:sticky md:top-24 md:self-start md:text-right">
              <span className="font-mono text-sm tabular-nums text-foreground">
                {job.range}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                {job.duration} · {job.trackLabel}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduce ? 0 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-reveal
              className="md:pl-6"
            >
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-2xl font-medium tracking-tight md:text-[1.75rem]">
                {job.title}
              </h3>
              <p className="mt-1 text-base text-muted-foreground">{job.org}</p>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-[17px]">
                {job.bullets[0]}
              </p>

              {job.bullets.length > 1 ? (
                <ul className="mt-5 flex max-w-2xl flex-col gap-2.5">
                  {job.bullets.slice(1).map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-foreground/40" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {job.note ? (
                <p className="mt-4 border-l border-border pl-4 text-[15px] leading-relaxed text-muted-foreground">
                  {job.note}
                </p>
              ) : null}
            </motion.div>
          </li>
        ))}
      </ol>

      {contributions ? <div className="mt-20">{contributions}</div> : null}
    </SectionShell>
  );
}
