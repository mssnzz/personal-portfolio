import { profile } from "@/components/cv/data";

type Level = 0 | 1 | 2 | 3 | 4;
type Day = { date: string; count: number; level: Level };

/**
 * A year of public GitHub activity, drawn in the site's own hairline grammar
 * rather than embedded as GitHub's SVG.
 *
 * Read straight off the public profile fragment GitHub serves to anyone — no
 * token, so nothing to leak or rotate. A community API used to sit in front of
 * this and was dropped: it caches, and the cache went on reporting 43
 * contributions for days after the profile itself was showing 1,857. Going to
 * the source removes both the staleness and a third party.
 *
 * The trade is that this parses markup rather than JSON, so GitHub can break
 * it by redesigning the page. Every failure path still ends in `null` and the
 * panel degrades to a plain profile link rather than taking the page down.
 * Revalidated every six hours; the graph moves once a day at most.
 */
const ENDPOINT = "https://github.com/users";

/** Cells carry the date and the level; the count lives on a <tool-tip> keyed
 *  to the cell's id ("4 contributions on November 17th."). */
const CELL =
  /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-[\d-]+)"[^>]*data-level="(\d)"/g;
const TOOLTIP =
  /<tool-tip[^>]*for="(contribution-day-component-[\d-]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
const COUNT = /^\s*([\d,]+)\s+contribution/;
const HEADER = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/;

/** Level 0 is a slot in the grid, not an accent value — it reads as the
 *  hairline it sits next to. 1-4 climb toward the full accent. */
const LEVEL_FILL = [
  "color-mix(in oklab, var(--foreground) 9%, transparent)",
  "color-mix(in oklab, var(--pf-accent) 30%, transparent)",
  "color-mix(in oklab, var(--pf-accent) 52%, transparent)",
  "color-mix(in oklab, var(--pf-accent) 74%, transparent)",
  "var(--pf-accent)",
] as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Parsed in UTC: the API emits calendar dates, and a local-time `new Date()`
 *  shifts them a day west of UTC, which slides the whole grid by one row. */
function utcDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function formatDay(day: Day) {
  const d = utcDate(day.date);
  const label = `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  if (day.count === 0) return `No contributions on ${label}`;
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${label}`;
}

async function fetchYear(
  handle: string,
): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch(
      `${ENDPOINT}/${encodeURIComponent(handle)}/contributions`,
      {
        // GitHub serves this fragment to browsers; the default fetch UA gets a
        // different response.
        headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html" },
        next: { revalidate: 21600 },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();

    const tips = new Map<string, string>();
    for (const m of html.matchAll(TOOLTIP)) tips.set(m[1], m[2]);

    const days: Day[] = [];
    for (const m of html.matchAll(CELL)) {
      const count = COUNT.exec(tips.get(m[2]) ?? "");
      days.push({
        date: m[1],
        count: count ? Number(count[1].replace(/,/g, "")) : 0,
        level: Math.min(4, Math.max(0, Number(m[3]))) as Level,
      });
    }
    if (days.length === 0) return null;

    // The table runs a weekday per row, so the cells come out grouped by
    // weekday rather than in date order; everything downstream assumes
    // chronological.
    days.sort((a, b) => a.date.localeCompare(b.date));

    const header = HEADER.exec(html);
    return {
      days,
      total: header
        ? Number(header[1].replace(/,/g, ""))
        : days.reduce((sum, day) => sum + day.count, 0),
    };
  } catch {
    // Offline, DNS, rate limit, markup change: the panel has a fallback.
    return null;
  }
}

/** Chronological days → Sunday-first columns, with the leading partial week
 *  padded so every column is seven cells tall and weekday rows line up. */
function toWeeks(days: Day[]): (Day | null)[][] {
  const lead: (Day | null)[] = Array(utcDate(days[0].date).getUTCDay()).fill(
    null,
  );
  const cells: (Day | null)[] = [...lead, ...days];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** One label per month, on the column where that month first appears. The
 *  first column is skipped when it is a stub, so the label is not clipped. */
function monthLabels(weeks: (Day | null)[][]) {
  const labels: (string | null)[] = [];
  let previous = -1;

  for (const week of weeks) {
    const first = week.find((day): day is Day => day !== null);
    const month = first ? utcDate(first.date).getUTCMonth() : previous;
    const isNew = month !== previous && week.filter(Boolean).length >= 4;
    labels.push(isNew ? MONTHS[month] : null);
    if (month !== previous) previous = month;
  }

  return labels;
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border/50 bg-background p-6 md:p-8">
      {children}
    </div>
  );
}

function Header({ total }: { total?: number }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        Commit activity — last 12 months
      </h3>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer noopener"
        className="font-mono text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        {typeof total === "number"
          ? `${total} contributions · @${profile.githubHandle}`
          : `@${profile.githubHandle}`}
      </a>
    </div>
  );
}

export async function GithubContributions() {
  const data = await fetchYear(profile.githubHandle);

  if (!data) {
    return (
      <Panel>
        <Header />
        <p className="mt-4 text-sm text-muted-foreground/60">
          The contribution graph is unavailable right now — it lives on the
          profile above.
        </p>
      </Panel>
    );
  }

  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks);

  return (
    <Panel>
      <Header total={data.total} />

      {/* The year is 53 columns whatever the panel is, so the columns are
          fractions rather than a fixed 11px: at a fixed size the grid ended
          two hundred pixels short of the panel it sits in. Below `min-w` the
          track stops shrinking and scrolls sideways instead, so a single day
          never falls under a usable target. */}
      <div className="-mx-6 mt-6 overflow-x-auto px-6 md:-mx-8 md:px-8">
        <div className="min-w-[660px]">
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
            }}
          >
            {labels.map((label, i) => (
              <span
                key={i}
                className="font-mono text-[10px] whitespace-nowrap text-muted-foreground/60"
              >
                {label}
              </span>
            ))}
          </div>

          <div
            role="img"
            aria-label={`${data.total} GitHub contributions in the last 12 months`}
            className="mt-1.5 grid grid-flow-col gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            }}
          >
            {weeks.map((week, w) =>
              week.map((day, d) =>
                day ? (
                  <span
                    key={day.date}
                    title={formatDay(day)}
                    className="aspect-square w-full"
                    style={{ background: LEVEL_FILL[day.level] }}
                  />
                ) : (
                  <span key={`${w}-${d}`} className="aspect-square w-full" />
                ),
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60">
          Less
        </span>
        {LEVEL_FILL.map((fill, i) => (
          <span key={i} className="size-[11px]" style={{ background: fill }} />
        ))}
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60">
          More
        </span>
      </div>
    </Panel>
  );
}
