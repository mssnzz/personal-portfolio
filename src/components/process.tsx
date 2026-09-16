"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Entiendo tu negocio, objetivos y lo que necesitas.",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Wireframes y diseño visual. Revisamos hasta que sea perfecto.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construyo tu proyecto con tecnología moderna y te muestro avances.",
  },
  {
    number: "04",
    title: "Lanzamiento",
    description: "Publicamos. Soporte post-lanzamiento y capacitación incluida.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Proceso
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                Cómo trabajo
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Un proceso claro y transparente. Siempre sabes en qué etapa está
              tu proyecto.
            </p>
          </Reveal>
        </div>

        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative rounded-2xl border border-border/50 p-6 transition-colors duration-500 hover:border-border/80 hover:bg-foreground/[0.02] md:p-8">
                <div className="flex size-10 items-center justify-center rounded-full bg-foreground/[0.05]">
                  <span className="font-mono text-xs text-muted-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
