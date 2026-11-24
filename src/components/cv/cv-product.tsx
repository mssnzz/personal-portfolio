"use client";

import Image from "next/image";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { ArrowOut } from "@/components/cv/arrow-out";
import { product } from "@/components/cv/data";
import { SectionHeader, SectionShell } from "@/components/cv/section-header";

/**
 * The one product I own, shown the way a case study opens: name and one line,
 * the product itself at full width in a browser frame, then what I built,
 * one surface per column.
 *
 * It used to be a split card — a cropped screenshot beside an eight-line
 * paragraph and a fact table repeating the paragraph. Nobody reads the
 * paragraph; the frame and four short columns say the same in a glance.
 */
export function CvProduct() {
  return (
    <SectionShell id="product" tinted>
      <SectionHeader
        index="02"
        label="Own product"
        meta="Web · iOS · still shipping"
        title="The product I own."
        lead="Built, shipped and still maintained by me — web and a native iOS app on the App Store."
      />

      <Reveal delay={0.1}>
        <article className="mt-16 overflow-hidden border border-border bg-background">
          {/* name, one line, the way out */}
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-[var(--pf-accent)]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--pf-accent)]">
                  {product.role}
                </span>
              </div>
              <h3 className="mt-4 text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                {product.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.summary}
              </p>
            </div>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-opacity duration-300 hover:opacity-85 md:self-auto"
            >
              Visit {product.host}
              <ArrowOut />
            </a>
          </div>

          {/* The product in a browser frame, full width. The frame says
              "this is a live site" before the reader has parsed a pixel of
              it, and the URL bar names it. */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.title} — open ${product.host}`}
            className="group block px-6 md:px-10"
          >
            <div className="overflow-hidden rounded-t-xl border border-b-0 border-border bg-[#141414] shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)]">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                </div>
                <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 font-mono text-xs text-white/60">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="7" width="10" height="7" rx="1.5" />
                    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                  </svg>
                  {product.host}
                </div>
                <span className="w-[42px]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={product.screenshot}
                  alt={`${product.title} homepage`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </a>

          {/* what I built, one surface per column */}
          <StaggerContainer
            className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {product.highlights.map((item, i) => (
              <StaggerItem key={item.label}>
                <div className="flex h-full flex-col bg-background p-6 md:p-8">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 text-xl font-medium tracking-tight">
                    {item.label}
                  </h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-[var(--pf-accent)]">
                    {item.stack}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </article>
      </Reveal>
    </SectionShell>
  );
}
