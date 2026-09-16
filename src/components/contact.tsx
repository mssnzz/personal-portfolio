"use client";

import { Reveal } from "@/components/motion";

export function Contact() {
  return (
    <section id="contacto" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-foreground/[0.02] p-8 md:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Contacto
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
                ¿Tienes un proyecto
                <span className="text-muted-foreground"> en mente?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Cuéntame sobre tu proyecto. Respondo en menos de 24 horas con una
                propuesta personalizada. Sin compromiso.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hola@manuelsanchez.io"
                  className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-500 hover:opacity-85"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3.5" width="14" height="11" rx="2" />
                    <path d="M2 5.5l7 4.5 7-4.5" />
                  </svg>
                  hola@manuelsanchez.io
                </a>
                <a
                  href="https://wa.me/18091234567?text=Hola%20Manuel,%20me%20interesa%20un%20proyecto%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/50 px-7 py-3 text-sm transition-all duration-500 hover:border-border hover:bg-foreground/[0.03]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15.75 12.68v1.98a1.35 1.35 0 0 1-1.44 1.35 13.3 13.3 0 0 1-5.85-2.07 13.1 13.1 0 0 1-4.05-4.05A13.3 13.3 0 0 1 2.34 4.14 1.35 1.35 0 0 1 3.69 2.7h1.98a1.35 1.35 0 0 1 1.35 1.17c.09.63.27 1.26.45 1.8a1.35 1.35 0 0 1-.27 1.44l-.81.81a10.8 10.8 0 0 0 4.05 4.05l.81-.81a1.35 1.35 0 0 1 1.44-.27c.54.18 1.17.36 1.8.45a1.35 1.35 0 0 1 1.17 1.35z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
