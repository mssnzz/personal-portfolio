"use client";

import { useEffect, useState } from "react";

/**
 * "Star on GitHub" button with a live count.
 *
 * The count comes from the public GitHub API (60 req/hr per IP unauthenticated
 * — fine for a portfolio). If the request fails or is rate-limited, the button
 * still renders as a plain link; the star is the point, the number is a bonus.
 */
export function GitHubStar({
  repo,
  hint = false,
}: {
  repo: string;
  hint?: boolean;
}) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${repo}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        /* offline, rate-limited, aborted: leave the count off */
      });

    return () => controller.abort();
  }, [repo]);

  return (
    <div className="relative hidden sm:block">
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Star this project on GitHub"
        className="group inline-flex items-center gap-2 border border-border/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-border hover:bg-foreground/[0.03] hover:text-foreground"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z" />
        </svg>
        <span className="font-mono text-[13px]">Star</span>
        {stars !== null ? (
          <span className="border-l border-border/50 pl-2 font-mono text-[13px] tabular-nums">
            {stars.toLocaleString()}
          </span>
        ) : null}
      </a>

      {/* handwritten aviso, anchored under the button: text on the left, the
          arrow on the right sitting directly under the Star and curving up to
          point at it. The nav is fixed, so it stays put on scroll. */}
      {hint ? (
        <div className="pointer-events-none absolute right-2 top-full mt-1 flex items-end gap-1.5 whitespace-nowrap text-muted-foreground">
          <span className="font-hand text-[16px] leading-none">
            star it on GitHub
          </span>
          <svg
            width="22"
            height="26"
            viewBox="0 0 22 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-0.5 shrink-0 text-muted-foreground/70"
            aria-hidden="true"
          >
            {/* curves from bottom-left up to the top-right, arrowhead at top */}
            <path d="M3 24 C4 14 9 8 18 5 M18 5 L11 4 M18 5 L16 11" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
