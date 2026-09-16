"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { contactRows, profile } from "@/components/cv/data";

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3.5" width="14" height="11" rx="2" />
      <path d="M2 5.5l7 4.5 7-4.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M5.5 7.5v5M5.5 5v.01M9 12.5v-5M12.5 12.5V10a2.5 2.5 0 0 0-3.5-2.3" />
    </svg>
  );
}

/**
 * The close.
 *
 * It used to be a centred panel with its own eyebrow, which made it the one
 * centred block on a page whose whole argument is that centred-everything is
 * the portfolio tell — and the one section reached without a § rule above it.
 * Same header shape as every other section now, left-aligned, and the facts
 * set in the hairline spec rows the toolset and the product card already use.
 */
export function CvContact() {
  return (
    <section id="contact" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Hiring for a remote
              <span className="text-muted-foreground"> engineering role?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Available immediately. I reply the same business day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2.5 bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-500 hover:opacity-85"
            >
              <MailIcon />
              {/* The address itself, not a verb: on a CV this is the string
                  people copy, and it is the one row nobody should have to go
                  hunting for in the table below. */}
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-border/60 px-7 py-3 text-sm transition-colors duration-500 hover:border-foreground/40 hover:bg-foreground/[0.03]"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </Reveal>

        {/* Nine rows over three columns divides evenly; the four-up grid this
            replaced left a single orphan on its last line. */}
        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.05}
        >
          {contactRows.map((row) => (
            <StaggerItem key={row.label}>
              <div className="flex h-full flex-col gap-1 bg-background p-5 transition-colors duration-500 md:p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                  {row.label}
                </span>
                <span className="text-sm text-foreground/85">
                  {"href" in row && row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        row.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="pf-link transition-colors duration-300 hover:text-foreground"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
