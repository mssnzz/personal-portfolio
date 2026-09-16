/**
 * Annotation — a handwritten callout with a curved arrow, the "notebook note"
 * motif. `dir` picks which corner the arrow points from toward the target.
 * Decorative: hidden from assistive tech and from print.
 */
export function Annotation({
  children,
  dir = "down-left",
  className,
}: {
  children: React.ReactNode;
  dir?: "down-left" | "down-right" | "up-left" | "up-right";
  className?: string;
}) {
  const arrows: Record<string, string> = {
    // gentle hand-drawn curves; each ends with a small arrowhead
    "down-left": "M22 4 C10 6 6 12 8 22 M8 22 L4 15 M8 22 L15 19",
    "down-right": "M4 4 C16 6 20 12 18 22 M18 22 L22 15 M18 22 L11 19",
    "up-left": "M22 24 C10 22 6 16 8 6 M8 6 L4 13 M8 6 L15 9",
    "up-right": "M4 24 C16 22 20 16 18 6 M18 6 L22 13 M18 6 L11 9",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-start gap-1.5 print:hidden ${className ?? ""}`}
    >
      <svg
        width="26"
        height="28"
        viewBox="0 0 26 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-1 shrink-0 text-muted-foreground/60"
      >
        <path d={arrows[dir]} />
      </svg>
      <span className="font-hand text-[17px] leading-tight text-muted-foreground">
        {children}
      </span>
    </div>
  );
}
