"use client";

import type { ReactNode } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { experience, type Track } from "@/components/cv/data";

/** The section's thesis is two tracks running at once, so the track is the one
 *  thing carried in colour: the dev rail is the accent, support stays neutral. */
const trackRail: Record<Track, string> = {
  dev: "bg-[var(--pf-accent)]",
  support: "bg-foreground/30",
  now: "bg-[var(--pf-accent)]",
};

function TrackKey({ track, label }: { track: Track; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`size-1.5 shrink-0 ${trackRail[track]}`} />
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
    </span>
  );
}

export function CvExperience({
  contributions,
}: {
  /** Server-rendered panel dropped under the roles — see `page.tsx`. */
  contributions?: ReactNode;
}) {
  return (
    <section id="experience" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                Support track, parallel dev track
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full employment history available on request.
            </p>
          </Reveal>
        </div>

        {/* The rail colours mean nothing without this, and the headline claims
            two tracks — so name them once, right above the stack. */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border/50 py-3">
            <TrackKey track="dev" label="Dev track" />
            <TrackKey track="support" label="Support track" />
          </div>
        </Reveal>

        <StaggerContainer
          className="flex flex-col gap-px border-x border-b border-border/50 bg-border/50"
          staggerDelay={0.08}
        >
          {experience.map((job, i) => (
            <StaggerItem key={job.title + job.range}>
              <article className="group relative grid h-full gap-5 bg-background p-6 pl-8 transition-colors duration-500 hover:bg-foreground/[0.02] md:grid-cols-[200px_1fr] md:gap-10 md:p-8 md:pl-10">
                {/* Track rail: the card's left edge, not a decoration floating
                    beside it. Dim until hover so the stack stays quiet. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-0.5 opacity-40 transition-opacity duration-500 group-hover:opacity-100 ${trackRail[job.track]}`}
                />

                {/* Sticky so the dates stay put while a long bullet list
                    scrolls past them. No-op on the shorter cards. */}
                <div className="flex flex-col gap-2 md:sticky md:top-20 md:self-start">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-foreground">
                      {job.range}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pl-[26px]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                      {job.duration}
                    </span>
                    <span className="border border-border/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                      {job.trackLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium tracking-tight">
                    {job.title}
                  </h3>
                  <p className="mt-1 font-mono text-[13px] text-muted-foreground/60">
                    {job.org}
                  </p>

                  {/* The first bullet is the role in one sentence; the rest are
                      detail. Same data, stated hierarchy — five equal bullets
                      per card read as a wall. */}
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
                    {job.bullets[0]}
                  </p>

                  {job.bullets.length > 1 ? (
                    <ul className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
                      {job.bullets.slice(1).map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-[9px] h-px w-3 shrink-0 bg-foreground/25" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {job.note ? (
                    <p className="mt-4 border-l border-border/50 pl-4 text-sm leading-relaxed text-muted-foreground/60">
                      {job.note}
                    </p>
                  ) : null}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {contributions ? <div className="mt-px">{contributions}</div> : null}
      </div>
    </section>
  );
}
