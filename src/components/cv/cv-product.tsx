"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion";
import { ArrowOut } from "@/components/cv/arrow-out";
import { product } from "@/components/cv/data";

/**
 * The one product I own, on its own.
 *
 * It used to lead the projects stack, which made the claim by size alone and
 * left a reader to infer the difference between a thing I own and a thing I
 * was paid to build. Three sections state it instead: this, the public repos,
 * and the client sites.
 */
export function CvProduct() {
  return (
    <section id="product" className="pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              The product I own
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Built, shipped and still maintained by me.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <article className="group relative mt-12 border border-border/50 bg-background transition-colors duration-500 hover:bg-foreground/[0.02]">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/30 bg-muted/30 lg:aspect-auto lg:border-b-0 lg:border-r">
                <Image
                  src={product.screenshot}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between p-6 md:p-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 bg-[var(--pf-accent)]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--pf-accent)]">
                      Own product
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {product.title}
                    </a>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Hairline rows, not a two-column grid: these values are
                      uneven in length and the grid left ragged holes between
                      them. A spec list reads down the labels. */}
                  <dl className="mt-8 flex flex-col">
                    {product.facts.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex flex-col gap-1 border-t border-border/40 py-2.5 sm:flex-row sm:items-baseline sm:gap-6"
                      >
                        <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60 sm:w-24 sm:shrink-0">
                          {label}
                        </dt>
                        <dd className="text-sm text-foreground/85">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-8 flex items-center gap-1 font-mono text-[13px] text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground">
                  <span>kalenday.com</span>
                  <ArrowOut />
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
