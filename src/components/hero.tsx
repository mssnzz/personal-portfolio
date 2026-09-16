"use client";

import { Suspense } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/components/scene").then((mod) => mod.Scene),
  { ssr: false }
);

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

function SlideUp({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ ...transition, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);

  return (
    <>
      <motion.section
        style={{ opacity: heroOpacity }}
        className="sticky top-0 z-0 h-svh overflow-hidden"
      >
        {/* 3D Brain */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </motion.div>

        {/* Gradient overlays */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
        />

        <motion.div style={{ scale: textScale }} className="relative flex h-full flex-col">
          {/* Center — heading */}
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <SlideUp delay={0.8}>
                <h1 className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em]">
                  Tu idea, hecha real.
                </h1>
              </SlideUp>
              <FadeIn delay={1.2}>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
                  Diseño y desarrollo sitios web, apps y plataformas que
                  impulsan negocios.
                </p>
              </FadeIn>
              <FadeIn delay={1.4}>
                <a
                  href="#contacto"
                  className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-all duration-500 hover:opacity-85"
                >
                  Hablemos
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-500 group-hover:translate-x-0.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </FadeIn>
            </div>
          </div>

          {/* Bottom — scroll indicator centered */}
          <FadeIn delay={1.6} className="pb-6">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-sm text-muted-foreground">Scroll</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </motion.div>
          </FadeIn>
        </motion.div>
      </motion.section>
      <div className="relative z-0 h-[10vh]" />
    </>
  );
}
