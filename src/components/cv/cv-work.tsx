"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { ArrowOut } from "@/components/cv/arrow-out";
import { LogoMarquee } from "@/components/cv/logo-marquee";
import { projects } from "@/components/cv/data";

/**
 * Who trusted me with the work.
 *
 * Kalenday and the public repos used to sit at the head of this stack, which
 * asked a reader to infer from size alone which of these I own, which I can
 * show the source of, and which I was paid to build. They are three different
 * claims, so they are three sections.
 */
export function CvWork() {
  return (
    <section id="work" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                Companies that trusted me
              </h2>
            </Reveal>
          </div>
        </div>

        <LogoMarquee items={projects} />

        {/* The band is the claim; this is the index. Rows rather than cards:
            without a screenshot there is nothing to fill a card with, and a
            name, a sector and a link are what a reader actually needs. */}
        <StaggerContainer
          className="mt-12 flex flex-col gap-px overflow-hidden border border-border/50 bg-border/50"
          staggerDelay={0.05}
        >
          {projects.map((project) => (
            <StaggerItem key={project.url}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 bg-background p-5 transition-colors duration-500 hover:bg-foreground/[0.02] md:flex-row md:items-baseline md:gap-6 md:p-6"
              >
                <h3 className="text-sm font-medium md:w-52 md:shrink-0">
                  {project.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60 md:w-40 md:shrink-0 md:justify-end">
                  {project.category}
                  <ArrowOut />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
