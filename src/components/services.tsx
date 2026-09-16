"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <circle cx="7" cy="6" r="0.5" fill="currentColor" />
        <circle cx="10" cy="6" r="0.5" fill="currentColor" />
      </svg>
    ),
    title: "Sitios Web",
    description:
      "Páginas modernas, rápidas y optimizadas para convertir visitantes en clientes.",
    tags: ["Next.js", "SEO", "Landing Pages", "Responsive"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Aplicaciones",
    description:
      "Plataformas y sistemas a medida. Portales, dashboards y automatización de procesos.",
    tags: ["React", "APIs", "Dashboards", "Portales"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: "E-Commerce",
    description:
      "Tiendas online con catálogo, carrito, pagos integrados y gestión de inventario.",
    tags: ["Pagos", "Inventario", "Catálogo", "Checkout"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
    title: "Rediseño",
    description:
      "Modernización de sitios existentes. Mejora de velocidad, diseño y conversión.",
    tags: ["Performance", "UI/UX", "Migración"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    title: "AI & Chatbots",
    description:
      "Asistentes inteligentes, chatbots personalizados y soluciones con inteligencia artificial.",
    tags: ["OpenAI", "Chatbots", "NLP", "RAG"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Automatizaciones",
    description:
      "Flujos automáticos, integraciones entre plataformas y eliminación de tareas repetitivas.",
    tags: ["Zapier", "n8n", "Webhooks", "CRM"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Servicios
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                Lo que hago
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Soluciones digitales completas, desde el concepto hasta el
              lanzamiento.
            </p>
          </Reveal>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group flex h-full flex-col bg-background p-6 transition-colors duration-500 hover:bg-foreground/[0.02] md:p-8">
                <div className="flex size-10 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/70 transition-colors duration-500 group-hover:bg-foreground/[0.08] group-hover:text-foreground">
                  {service.icon}
                </div>

                <h3 className="mt-5 text-base font-medium">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/40 px-2.5 py-0.5 text-sm text-muted-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
