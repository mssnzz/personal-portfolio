"use client";

import { motion, useReducedMotion } from "motion/react";
import { AsciiPhoto } from "@/components/cv/ascii-photo";
import { TechBadges } from "@/components/cv/tech-badges";
import { profile } from "@/components/cv/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: the statement plus a compact meta row. Identity (avatar, name,
 * verified) lives in the nav, so nothing is repeated here. Left-aligned and
 * asymmetric — centered-everything is a template tell.
 *
 * Both entrance helpers keep `initial` constant across server and client and
 * vary only the transition. Branching it on `useReducedMotion` renders a
 * hidden inline style on the server and none on the client, which React
 * reports as a hydration mismatch and does not patch up. `data-reveal` hands
 * these to the same reduced-motion CSS that covers the scroll reveals.
 */

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        data-reveal
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }
        }
        className={`block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Fade({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.7, delay, ease: EASE }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  ["5 yrs", "development"],
  ["5 yrs", "defect triage"],
  ["11", "sites shipped"],
  ["C1", "English"],
] as const;

export function CvHero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-12 px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32 lg:grid-cols-2 lg:gap-0"
    >
      <div className="lg:pr-12">
      {/* eyebrow */}
      <Fade delay={0.1}>
        {/* leading-none so the line box starts at the cap height: the default
            leading put 5px of air above these glyphs, which is exactly how far
            the portrait panel's top edge missed this row. */}
        <p className="flex items-center gap-2.5 font-mono text-[13px] uppercase leading-none tracking-[0.12em] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="pf-accent-bg absolute inline-flex size-full animate-ping rounded-full opacity-60" />
            <span className="pf-accent-bg relative inline-flex size-2 rounded-full" />
          </span>
          Open to remote engineering roles
        </p>
      </Fade>

      {/* statement */}
      {/* Mono runs about half again as wide per character as Geist, so the
          scale drops and the negative tracking comes off — at -0.045em a
          monospace face closes up and stops reading as one. The cap is set by
          the longest line. The column is 488px, which at Geist Mono's 0.6em
          advance is 16 characters at this cap — so the statement breaks over
          three lines rather than dropping to 36px to fit "Then I try to break
          it." on two, which would cost the headline its weight. */}
      <h1
        className="mt-9 font-mono text-[clamp(1.75rem,4.2vw,3rem)] font-medium leading-[1.15]"
        style={{ letterSpacing: "-0.02em" }}
      >
        <Line delay={0.2}>I build it.</Line>
        <Line delay={0.32} className="text-muted-foreground">
          Then I try to
        </Line>
        <Line delay={0.42} className="text-muted-foreground">
          <span className="pf-accent">break it.</span>
        </Line>
      </h1>

      {/* thesis */}
      <Fade delay={0.7}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/70 md:text-xl">
          I write the feature and the test that catches its regression.
        </p>
      </Fade>

      {/* compact meta row — the facts, without a boxed card duplicating the
          avatar and name that now live in the nav */}
      <Fade delay={0.78}>
        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-muted-foreground">
          {[profile.role, profile.location].map((item, i) => (
            <li key={item} className="flex items-center gap-5">
              {i > 0 ? (
                <span className="text-border" aria-hidden="true">
                  /
                </span>
              ) : null}
              {item}
            </li>
          ))}
        </ul>
      </Fade>

      {/* ctas */}
      <Fade delay={0.82}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
          >
            Get in touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#work"
            className="inline-flex items-center border border-border/60 px-7 py-3 text-sm transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/[0.03]"
          >
            See the work
          </a>
        </div>
      </Fade>

      {/* direct links — the three places someone actually goes next */}
      <Fade delay={0.86}>
        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-muted-foreground">
          {[
            { label: "GitHub", href: profile.github },
            { label: "LinkedIn", href: profile.linkedin },
            { label: "Email", href: `mailto:${profile.email}` },
          ].map((link, i) => (
            <li key={link.label} className="flex items-center gap-5">
              {i > 0 ? (
                <span className="text-border" aria-hidden="true">
                  /
                </span>
              ) : null}
              <a
                href={link.href}
                className="pf-link transition-colors duration-300 hover:text-foreground"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Fade>

      {/* stack chips */}
      <Fade delay={0.9}>
        <TechBadges className="mt-9" />
      </Fade>

      {/* stat line */}
      <Fade delay={0.98}>
        {/* two up rather than four: at half the column width the four-across
            row broke "defect triage" onto a second line, and the taller block
            is what lets the portrait panel beside it run full height */}
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-border/50 bg-border/50">
          {stats.map(([value, label]) => (
            <div key={label} className="bg-background px-5 py-4">
              <dt className="font-display text-2xl font-semibold tabular-nums">
                {value}
              </dt>
              <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </Fade>
      </div>

      {/* Right column — the portrait as animated ASCII dither, desktop only.
          It runs up to meet the fixed header so the two borders meet on one
          line instead of the panel floating below it: the hero's own top
          padding (8rem) less the header's height (3.5rem). The height grows by
          the same amount rather than the box just sliding up, or the bottom
          would lift off the left column it is aligned to. */}
      <Fade
        delay={0.5}
        className="hidden h-full w-full lg:-mt-[calc(8rem-3.5rem)] lg:block lg:h-[calc(100%+8rem-3.5rem)]"
      >
        <AsciiPhoto src="/me.webp" />
      </Fade>
    </section>
  );
}
