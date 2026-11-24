"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";
import { ArrowOut } from "@/components/cv/arrow-out";
import { openSource } from "@/components/cv/data";
import { SectionHeader, SectionShell } from "@/components/cv/section-header";

/**
 * The public repositories, listed rather than screenshotted — a repo's value
 * is what the code does, and a thumbnail of a README says nothing.
 *
 * Three entries, not nineteen. The rest of the account is coursework, technical
 * tests and undescribed experiments; padding this out with them would cost the
 * three that are worth opening.
 */
export function CvOpenSource() {
  return (
    <SectionShell id="open-source">
      <SectionHeader
        index="03"
        label="Open source"
        meta={`${openSource.length} public repos`}
        title="Code you can read."
        lead="Public repositories, not private claims."
      />

        <StaggerContainer
          className="mt-16 flex flex-col gap-px overflow-hidden border border-border bg-border"
          staggerDelay={0.1}
        >
          {openSource.map((repo) => (
            <StaggerItem key={repo.url}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-3 bg-background p-6 transition-colors duration-500 hover:bg-foreground/[0.02] md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-base">{repo.name}</h3>
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                    {repo.note}
                  </span>
                  <span className="ml-auto hidden items-center gap-1 font-mono text-[13px] text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:flex">
                    Read the code
                    <ArrowOut />
                  </span>
                </div>

                <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>

                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {repo.stack}
                </p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
    </SectionShell>
  );
}
