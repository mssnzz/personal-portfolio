"use client";

import { StaggerContainer, StaggerItem, Reveal } from "@/components/motion";
import { ArrowOut } from "@/components/cv/arrow-out";
import { openSource } from "@/components/cv/data";

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
    <section id="open-source" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Code you can read
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Public repositories, not private claims.
            </p>
          </Reveal>
        </div>

        <StaggerContainer
          className="mt-12 flex flex-col gap-px overflow-hidden border border-border/50 bg-border/50"
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
                  <h3 className="font-mono text-sm">{repo.name}</h3>
                  <span className="border border-border/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                    {repo.note}
                  </span>
                  <span className="ml-auto hidden items-center gap-1 font-mono text-[13px] text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground sm:flex">
                    Read the code
                    <ArrowOut />
                  </span>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>

                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                  {repo.stack}
                </p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
