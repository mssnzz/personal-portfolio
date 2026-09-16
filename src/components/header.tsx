"use client";

import {
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { GitHubStar } from "@/components/cv/github-star";

const defaultNavLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajo", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

/** Never changes, so React never resubscribes. */
const noopSubscribe = () => () => {};

/**
 * False while rendering on the server and through the first client render,
 * true afterwards.
 *
 * The theme is unknowable on the server, so the toggle has to hold a
 * placeholder until hydration or the markup will not match. The usual
 * `useEffect(() => setMounted(true))` does that with a state write during an
 * effect, which schedules a second render pass for something React can answer
 * directly: `useSyncExternalStore` takes a separate server snapshot, so the
 * two renders differ without a re-render being queued.
 */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** `external` links leave the site: they open in a new tab and carry a ↗. */
type NavLink = { label: string; href: string; external?: boolean };

const externalProps = { target: "_blank", rel: "noreferrer noopener" } as const;

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 7 7 3M3.5 3H7v3.5" />
    </svg>
  );
}

/** Height of the fixed bar (h-14), as the observer's top inset. */
const HEADER_PX = 56;

/**
 * Marks the nav link whose section is currently under the header.
 *
 * A section counts as current while it crosses the band between the bar and
 * the top third of the viewport, so the mark flips as a heading reaches
 * reading position rather than when the section merely peeks in from below.
 * Document order breaks ties when two sections share the band, and when none
 * do — the footer, or any stretch with no observed section — the last match
 * stays lit instead of blanking the nav.
 */
function useActiveSection(navLinks: NavLink[]) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const ids = navLinks
      .filter((link) => !link.external && link.href.startsWith("#"))
      .map((link) => link.href.slice(1));

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const current = sections.find((section) => visible.has(section.id));
        setActiveHref((prev) => (current ? `#${current.id}` : prev));
      },
      { rootMargin: `-${HEADER_PX}px 0px -66% 0px` },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  return activeHref;
}

/**
 * Shared across the portfolio (`/`) and the services landing (`/servicios`).
 * Every prop defaults to the services landing's original values, so that page
 * renders exactly as before.
 */
export function Header({
  navLinks = defaultNavLinks,
  homeHref = "/servicios",
  ctaLabel = "Contacto",
  ctaHref = "#contacto",
  menuLabel = "Menú",
  themeLabel = "Cambiar tema",
  githubRepo,
  githubHint = false,
  brandName = "Manuel Sanchez",
  avatarInitials,
  verified = false,
  bordered = false,
}: {
  navLinks?: NavLink[];
  homeHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  menuLabel?: string;
  themeLabel?: string;
  githubRepo?: string;
  /** Show the handwritten 'star it' aviso under the GitHub button. */
  githubHint?: boolean;
  /** Wordmark text (defaults to the name). */
  brandName?: string;
  /** When set, a small avatar monogram is shown before the name. */
  avatarInitials?: string;
  /** When true, a verified check follows the name. */
  verified?: boolean;
  /** Full-width blurred bar with a bottom hairline — for content pages that
   *  scroll behind the nav. Off by default (the agency hero is transparent). */
  bordered?: boolean;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeHref = useActiveSection(navLinks);
  const reduceMotion = useReducedMotion();
  const mounted = useHydrated();

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }

    document.startViewTransition(() => {
      setTheme(next);
    });
  }, [theme, setTheme]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        bordered
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md"
          : ""
      }`}
    >
      {/* px-6 max-w-6xl — identical to the hero and sections, so the avatar's
          left edge lands on the same content-column guide as everything below. */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href={homeHref}
          className={`group flex items-center gap-2.5 text-[15px] font-medium tracking-tight ${
            avatarInitials ? "font-display" : "font-mono"
          }`}
        >
          {avatarInitials ? (
            <span className="flex size-7 items-center justify-center rounded-full border border-border/60 bg-foreground/[0.04] text-[11px] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {avatarInitials}
            </span>
          ) : null}
          <span>{brandName}</span>
          {verified ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-sky-500"
              aria-label="Verified"
            >
              <path d="M12 2 9.8 4.2 6.7 4l-.6 3.1L3.5 9l1.4 2.8-1.4 2.8 2.6 1.9.6 3.1 3.1-.2L12 22l2.2-2.5 3.1.2.6-3.1 2.6-1.9-1.4-2.8L20.5 9l-2.6-1.9-.6-3.1-3.1.2Z" />
              <path
                d="m8.5 12 2.2 2.2 4.8-4.8"
                fill="none"
                stroke="var(--background)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = link.href === activeHref;

            return (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? externalProps : {})}
                aria-current={active ? "true" : undefined}
                className={`relative inline-flex items-center gap-1 px-3.5 py-1.5 text-sm transition-colors duration-300 hover:bg-foreground/5 hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {link.external ? <ExternalArrow className="opacity-60" /> : null}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 bottom-0.5 h-px bg-foreground"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 38 }
                    }
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {githubRepo ? <GitHubStar repo={githubRepo} hint={githubHint} /> : null}

          <button
            onClick={toggleTheme}
            className="relative flex size-8 items-center justify-center text-muted-foreground transition-colors duration-300 hover:bg-foreground/5 hover:text-foreground"
            aria-label={themeLabel}
          >
            {mounted ? (
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.svg
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="8" r="3" />
                    <path d="M8 1.5v1M8 13.5v1M3.4 3.4l.7.7M11.9 11.9l.7.7M1.5 8h1M13.5 8h1M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 8.5A6 6 0 0 1 7.5 2a6 6 0 1 0 6.5 6.5z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            ) : (
              <span className="size-[15px]" />
            )}
          </button>

          <span className="mx-1 hidden h-4 w-px bg-border/60 md:block" />

          <a
            href={ctaHref}
            className="hidden bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85 md:block"
          >
            {ctaLabel}
          </a>

          <button
            className="flex size-8 items-center justify-center text-muted-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuLabel}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                className="block h-px w-5 bg-current"
                animate={
                  menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-5 bg-current"
                animate={
                  menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-14 border-b border-border/40 bg-background/95 px-6 pb-8 pt-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, i) => {
                const active = link.href === activeHref;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? externalProps : {})}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`inline-flex items-center gap-2 text-2xl font-light ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    {link.external ? (
                      <ExternalArrow className="size-3.5 opacity-50" />
                    ) : null}
                  </motion.a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
