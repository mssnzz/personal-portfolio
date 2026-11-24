"use client";

import { motion, useReducedMotion } from "motion/react";
import { AsciiPhoto } from "@/components/cv/ascii-photo";
import { TechBadges } from "@/components/cv/tech-badges";
import { profile } from "@/components/cv/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: portrait, availability, statement, proof, next step — centred on one
 * axis so it reads top to bottom in a single glance. The display type matches
 * the section headlines; mono is kept for metadata only.
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

/** The hero's badge shape: availability, role, location and links share it. */
const pill =
  "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm sm:px-3.5 sm:text-[13px]";

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function CodeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 0 0-9 0c0 3.8 4.5 8 4.5 8Z" />
      <circle cx="8" cy="6.5" r="1.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
      <path d="m2 4.5 6 4 6-4" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps}>
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="2" />
      <path d="M5 7v4.5M5 4.75v.01M8 11.5V7m0 2.25a2 2 0 0 1 4 0v2.25" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const stats = [
  ["5 yrs", "development"],
  ["2 yrs", "QA & support"],
  ["1", "app on the App Store"],
  ["C1", "English"],
] as const;

export function CvHero() {
  return (
    <section id="top" data-section className="relative">
      {/* The portrait fills the whole statement block, behind it. Dimmed and
          faded out at the edges with a radial mask so it reads as the
          ground the headline stands on, not as a picture competing with it;
          the statement keeps full contrast on top. */}
      <div className="relative">
        <Fade
          delay={0.05}
          className="pointer-events-none absolute inset-x-0 bottom-[-4rem] top-14 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,black_45%,transparent_100%)]"
        >
          {/* Opacity on an inner box: Fade animates its own opacity to 1
              and would override a class set on it. */}
          <div className="h-full w-full opacity-[0.3] dark:opacity-[0.38]">
            <AsciiPhoto src="/me.webp" backdrop />
          </div>
        </Fade>

        {/* Centred, one column: availability, statement, proof, next step. */}
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-36 text-center md:px-10 md:pt-48">
          {/* availability pill */}
          <Fade delay={0.15}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 py-1.5 pl-3 pr-4 text-sm text-foreground/85 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="pf-accent-bg absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="pf-accent-bg relative inline-flex size-2 rounded-full" />
              </span>
              Open to remote engineering roles
            </p>
          </Fade>

          {/* statement */}
          {/* Set in the same sans and tracking as every section headline, one
            size up, so the page has one display voice instead of a mono hero
            and sans sections. Two lines; the second may wrap on a phone. */}
          <h1 className="pf-halo mt-8 text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            <Line delay={0.25}>I build it.</Line>
            <Line delay={0.37} className="text-muted-foreground">
              Then I try to <span className="pf-accent">break it.</span>
            </Line>
          </h1>

          {/* thesis */}
          <Fade delay={0.7}>
            <p className="pf-halo mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-foreground/80 md:text-2xl md:leading-relaxed">
              I ship React, React Native and AI features — and write the test
              that catches their regression.
            </p>
          </Fade>

          {/* Role and location as badges — the same rounded pill as the
              availability tag and the stack, so the hero's furniture is one
              shape. Facts, not links: no hover. */}
          <Fade delay={0.78}>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
              <li className={pill}>
                <CodeIcon />
                {profile.role}
              </li>
              <li className={pill}>
                <PinIcon />
                {profile.location}
              </li>
            </ul>
          </Fade>

          {/* ctas */}
          <Fade delay={0.82}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-base font-medium text-background transition-opacity duration-300 hover:opacity-85"
              >
                Get in touch
                <svg
                  width="16"
                  height="16"
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
                href="#experience"
                className="inline-flex items-center rounded-full border border-border bg-background/70 px-7 py-3.5 text-base backdrop-blur-sm transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                See the work
              </a>
            </div>
          </Fade>

          {/* direct links — the three places someone actually goes next,
              as pill buttons with their marks */}
          <Fade delay={0.86}>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "GitHub", href: profile.github, icon: <GitHubIcon /> },
                {
                  label: "LinkedIn",
                  href: profile.linkedin,
                  icon: <LinkedInIcon />,
                },
                {
                  label: "Email",
                  href: `mailto:${profile.email}`,
                  icon: <MailIcon />,
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${pill} transition-colors duration-300 hover:border-foreground/40 hover:text-foreground`}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </div>

      {/* Facts band — full width under the statement: the stats as a
          headline row, then the stack, centred on the same axis. */}
      <div className="relative mx-auto mt-28 max-w-6xl px-6 pb-20 md:mt-40 md:px-10 md:pb-28">
        <Fade delay={0.95}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="bg-background px-6 py-6 text-center md:px-8 md:py-8"
              >
                <dt className="text-4xl font-medium tracking-[-0.03em] tabular-nums md:text-5xl">
                  {value}
                </dt>
                <dd className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground md:text-[13px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Fade>

        <Fade delay={1.02}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </p>
            <TechBadges className="justify-center" />
          </div>
        </Fade>
      </div>
    </section>
  );
}
