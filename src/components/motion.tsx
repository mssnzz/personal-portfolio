"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variant,
} from "motion/react";

const fadeUpVariants: Record<string, Variant> = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInVariants: Record<string, Variant> = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const variantMap = {
  "fade-up": fadeUpVariants,
  "fade-in": fadeInVariants,
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  // Server and client must render the same element. The server cannot read a
  // motion preference, so branching on `reduce` here renders a motion.div with
  // an inline hidden style on one side and a bare div on the other, which is a
  // hydration mismatch. Keep one element and let `reduce` only collapse the
  // duration; the CSS in globals.css is what actually reveals these for
  // reduced-motion users, since hydration will not strip that inline style.
  return (
    <motion.div
      data-reveal
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantMap[variant]}
      transition={
        reduce ? { duration: 0 } : { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={reduce ? { duration: 0 } : { staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      variants={fadeUpVariants}
      transition={
        reduce ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  children,
  offset = 50,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function TextReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export { motion };
