"use client";

import { motion } from "motion/react";

export function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export function GlowLine() {
  return (
    <div className="relative mx-auto max-w-5xl px-6">
      <div className="h-px w-full bg-border" />
      <motion.div
        className="absolute top-0 left-0 h-px w-1/4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        animate={{ x: ["0%", "400%"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />
    </div>
  );
}
