import { techBadges } from "@/components/cv/data";

/**
 * Stack badges: a real logo + label in a hairline pill. Logos are self-hosted
 * SVGs under public/logos/tech. Monochrome marks (Next.js, shadcn) ship a
 * dark/light pair toggled by the theme; the rest are colour tiles that read on
 * either ground.
 */
export function TechBadges({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 md:gap-2 ${className ?? ""}`}>
      {techBadges.map((tech) => (
        <li
          key={tech.name}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-2.5 py-1.5 backdrop-blur-sm md:gap-2.5 md:px-3.5 md:py-2"
        >
          {tech.iconDark ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt=""
                width={18}
                height={18}
                className="block size-[15px] md:size-[18px] dark:hidden"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.iconDark}
                alt=""
                width={18}
                height={18}
                className="hidden size-[15px] md:size-[18px] dark:block"
                aria-hidden="true"
              />
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tech.icon}
              alt=""
              width={18}
              height={18}
              className="size-[15px] md:size-[18px]"
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-xs tracking-tight text-foreground/80 md:text-[13px]">
            {tech.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
