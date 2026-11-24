"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Height of the fixed header bar, as the observer's top inset. */
const HEADER_PX = 68;

/**
 * Where the reader is on the page, said twice: a hairline across the top that
 * fills as the page scrolls, and — on screens wide enough to have a margin —
 * a rail of section numbers down the right edge with the current one named.
 *
 * The page is long and its sections share one visual language, so without
 * this a reader mid-scroll has no way to tell how far in they are or which
 * section they are reading.
 */
export function ScrollStory({
  sections,
}: {
  sections: { id: string; index: string; label: string }[];
}) {
  const { scrollYProgress } = useScroll();
  // Sprung rather than raw so the bar glides instead of stepping with each
  // wheel tick.
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[var(--pf-accent)]"
        style={{ scaleX: progress }}
      />

      {/* Only where there is margin for it: below 1440px the rail would sit
          on top of the content column. */}
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block"
      >
        <ol className="flex flex-col items-end gap-3">
          {sections.map((section) => {
            const current = section.id === active;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={current ? "true" : undefined}
                  className="group flex items-center gap-3 font-mono text-xs"
                >
                  <span
                    className={`uppercase tracking-[0.12em] transition-all duration-300 ${
                      current
                        ? "translate-x-0 text-foreground opacity-100"
                        : "translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  >
                    {section.label}
                  </span>
                  <span
                    className={`tabular-nums transition-colors duration-300 ${
                      current
                        ? "text-[var(--pf-accent)]"
                        : "text-muted-foreground/70 group-hover:text-foreground"
                    }`}
                  >
                    {section.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all duration-300 ${
                      current
                        ? "w-6 bg-[var(--pf-accent)]"
                        : "w-3 bg-muted-foreground/50"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** The section crossing the band between the header and the top third of the
 *  viewport — the same rule the header nav uses, so the two agree. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = els.find((el) => visible.has(el.id));
        setActive((prev) => (current ? current.id : prev));
      },
      { rootMargin: `-${HEADER_PX}px 0px -66% 0px` },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
