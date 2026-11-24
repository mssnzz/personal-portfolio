"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { SectionHeader, SectionShell } from "@/components/cv/section-header";
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
    <SectionShell id="skills" tinted>
      <SectionHeader
        index="04"
        label="Toolset"
        meta={`${skillGroups.reduce((n, g) => n + g.items.length, 0)} entries`}
        title="Day-one ready."
        lead="Used on real users and real releases, not a course syllabus."
      />

        <StaggerContainer
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3"
          staggerDelay={0.08}
        >
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="group flex h-full flex-col bg-background p-6 transition-colors duration-500 hover:bg-foreground/[0.02] md:p-8">
                <div className="flex items-center justify-between gap-3">
                  {/* Square and hairline like every other box here. The chip
                      this replaced was the one rounded, filled thing on the
                      page. */}
                  <span className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors duration-500 group-hover:border-foreground/30 group-hover:text-foreground">
                    {icons[group.title]}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                    {group.items.length} entries
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-medium tracking-tight">{group.title}</h3>

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
                      <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                        {key}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-foreground/90">
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
          <div className="grid gap-4 border-x border-b border-border bg-background p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8">
            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-2">
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                2017 — Present
              </span>
              <span className="rounded-full border border-border px-3 py-0.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                In progress
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium">B.Sc. Computer Science</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                Universidad Autónoma de Santo Domingo (UASD) — programming,
                systems, databases.
              </p>
            </div>
          </div>
        </Reveal>
    </SectionShell>
  );
}
