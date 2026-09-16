import { techBadges } from "@/components/cv/data";

/**
 * Stack badges: a real logo + label in a hairline pill. Logos are self-hosted
 * SVGs under public/logos/tech. Monochrome marks (Next.js, shadcn) ship a
 * dark/light pair toggled by the theme; the rest are colour tiles that read on
 * either ground.
 */
export function TechBadges({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {techBadges.map((tech) => (
        <li
          key={tech.name}
          className="inline-flex items-center gap-2 border border-border/50 bg-background/40 px-3 py-1.5 backdrop-blur-sm"
        >
          {tech.iconDark ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt=""
                width={15}
                height={15}
                className="block size-[15px] dark:hidden"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.iconDark}
                alt=""
                width={15}
                height={15}
                className="hidden size-[15px] dark:block"
                aria-hidden="true"
              />
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tech.icon}
              alt=""
              width={15}
              height={15}
              className="size-[15px]"
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-[12px] tracking-tight text-muted-foreground">
            {tech.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
