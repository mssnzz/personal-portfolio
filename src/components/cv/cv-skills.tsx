"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { skillGroups } from "@/components/cv/data";

const icons: Record<string, React.ReactNode> = {
  "QA & Testing": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 14h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4zM20 14h-2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2z" />
      <path d="M20 19v1a2 2 0 0 1-2 2h-4" />
    </svg>
  ),
  Engineering: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 17l-5-5 5-5M16 7l5 5-5 5M13.5 4l-3 16" />
    </svg>
  ),
  "How I work": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l2.5 2.5L16 9" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  ),
};

export function CvSkills() {
  return (
    <section id="skills" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                Day-one ready
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Used on real users and real releases, not a course syllabus.
            </p>
          </Reveal>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/50 bg-border/50 md:grid-cols-3"
          staggerDelay={0.08}
        >
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="group flex h-full flex-col bg-background p-6 transition-colors duration-500 hover:bg-foreground/[0.02] md:p-8">
                <div className="flex items-center justify-between gap-3">
                  {/* Square and hairline like every other box here. The chip
                      this replaced was the one rounded, filled thing on the
                      page. */}
                  <span className="flex size-9 items-center justify-center border border-border/50 text-foreground/70 transition-colors duration-500 group-hover:border-foreground/30 group-hover:text-foreground">
                    {icons[group.title]}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                    {group.items.length} entries
                  </span>
                </div>

                <h3 className="mt-5 text-base font-medium">{group.title}</h3>

                {/* A spec list, not sentences: at a third of the column the
                    "key — value" run-on wrapped mid-phrase and every item
                    looked like the next one. The label is furniture, so it is
                    set in the mono the rest of the CV furniture uses, and the
                    value gets the line to itself. Same rows as the product
                    card's fact list. */}
                <dl className="mt-5 flex flex-1 flex-col">
                  {group.items.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col gap-0.5 border-t border-border/40 py-2.5"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                        {key}
                      </dt>
                      <dd className="text-sm leading-relaxed text-foreground/85">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Flush under the grid, sharing its border rather than floating six
            pixels below it as a second stranded box — the same stacking the
            projects section uses. The date column matches the experience
            entries, so education reads as one more row of the same ledger. */}
        <Reveal>
          <div className="grid gap-4 border-x border-b border-border/50 p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8">
            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-2">
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                2017 — Present
              </span>
              <span className="border border-border/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                In progress
              </span>
            </div>
            <div>
              <h3 className="text-base font-medium">B.Sc. Computer Science</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Universidad Autónoma de Santo Domingo (UASD) — programming,
                systems, databases.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
