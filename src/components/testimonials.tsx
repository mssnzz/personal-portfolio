"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Reveal } from "@/components/motion";

const testimonials = [
  {
    quote:
      "Entendió exactamente lo que necesitábamos. Entregó a tiempo y el resultado superó nuestras expectativas.",
    author: "Robinson Sanchez",
    company: "Doktap",
    role: "CEO",
    metric: "3x",
    metricLabel: "más pacientes online",
  },
  {
    quote:
      "Profesional, rápido y con excelente comunicación. Nuestro sitio finalmente refleja la calidad de nuestro negocio.",
    author: "Buenaventura",
    company: "Clix Solution",
    role: "Director",
    metric: "60%",
    metricLabel: "más leads generados",
  },
  {
    quote:
      "La plataforma que nos construyó automatizó procesos que antes tomaban horas. Muy recomendado.",
    author: "Jeremy Pena",
    company: "Jubatus Enterprises",
    role: "CTO",
    metric: "85%",
    metricLabel: "menos tiempo en procesos",
  },
  {
    quote:
      "Transformó nuestra visión en una plataforma sólida. La calidad del código y el diseño son excepcionales.",
    author: "Marcos Rodriguez",
    company: "Jubatus Enterprises",
    role: "CEO",
    metric: "2x",
    metricLabel: "crecimiento en clientes",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Testimonios
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
            Resultados reales
          </h2>
        </Reveal>

        <div className="mt-12 space-y-0">
          {testimonials.map((t, i) => (
            <TestimonialRow key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group grid grid-cols-1 gap-6 border-t border-border/50 py-10 md:grid-cols-[1fr_2fr] md:gap-16 md:py-14"
    >
      {/* Left: metric */}
      <div>
        <p className="font-mono text-4xl font-light tracking-tight text-foreground md:text-5xl">
          {testimonial.metric}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {testimonial.metricLabel}
        </p>
      </div>

      {/* Right: quote + author */}
      <div>
        <blockquote className="text-lg leading-relaxed text-foreground/80 transition-colors duration-500 group-hover:text-foreground md:text-xl">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 max-w-8 bg-border/60" />
          <p className="text-sm font-medium">
            {testimonial.author}
          </p>
          <span className="text-muted-foreground/30">/</span>
          <p className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
