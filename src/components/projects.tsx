"use client";

import Image from "next/image";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";

const projects = [
  {
    title: "Doktap",
    category: "Telemedicina",
    description:
      "Plataforma de telemedicina con videollamadas, historial médico y gestión de citas.",
    url: "https://doktap.com",
    screenshot: "/screenshots/doktap.png",
  },
  {
    title: "Nomi",
    category: "SaaS",
    description:
      "Sistema de agendamiento para negocios con reservas online y recordatorios automáticos.",
    url: "https://nomi.do",
    screenshot: "/screenshots/nomi.png",
  },
  {
    title: "Farach",
    category: "E-Commerce",
    description:
      "E-commerce de insumos y equipos odontológicos con catálogo, cotizaciones y pedidos.",
    url: "https://farachdental.com",
    screenshot: "/screenshots/farach.png",
  },
  {
    title: "Kalenday",
    category: "SaaS",
    description:
      "Plataforma de agendamiento y gestión de calendario para profesionales y equipos.",
    url: "https://kalenday.com",
    screenshot: "/screenshots/kalenday.png",
  },
  {
    title: "Clix Solution",
    category: "Consultoría",
    description:
      "Soluciones tecnológicas y consultoría digital para empresas en crecimiento.",
    url: "https://clixsolution.net",
    screenshot: "/screenshots/clixsolution.png",
  },
  {
    title: "Scrum Clix",
    category: "Educación",
    description:
      "Plataforma de certificación Scrum Master con formación práctica y certificación internacional.",
    url: "https://scrum.clixsolution.consulting",
    screenshot: "/screenshots/scrum-clix.png",
  },
  {
    title: "ARS Abel González",
    category: "Seguros",
    description:
      "Portal para aseguradora: cobertura, red de prestadores y autorizaciones online.",
    url: "https://arsabelgonzalez.com",
    screenshot: "/screenshots/arsabelgonzalez.png",
  },
  {
    title: "ARS Banco Central",
    category: "Institucional",
    description:
      "Portal web institucional para la ARS del Banco Central de la República Dominicana.",
    url: "https://arsbancocentral.org.do",
    screenshot: "/screenshots/arsbancocentral.png",
  },
  {
    title: "Strongcare",
    category: "E-Commerce",
    description:
      "Plataforma e-commerce de equipos médicos con catálogo, cotizaciones y blog.",
    url: "https://strongcarerd.com",
    screenshot: "/screenshots/strongcare.png",
  },
  {
    title: "Opensoft",
    category: "Software",
    description:
      "Sitio web corporativo para empresa de software con soluciones empresariales.",
    url: "https://opensoftdo.com",
    screenshot: "/screenshots/opensoft.png",
  },
  {
    title: "GetWell RD",
    category: "Salud",
    description:
      "Plataforma de servicios de salud con agendamiento de citas y directorio médico.",
    url: "https://getwellrd.com",
    screenshot: "/screenshots/getwellrd.png",
  },
  {
    title: "Jubatus Enterprises",
    category: "Tecnología",
    description:
      "Sitio web corporativo para empresa de tecnología y transformación digital.",
    url: "https://jubatusenterprises.com",
    screenshot: "/screenshots/jubatus.png",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Trabajo seleccionado
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
            Proyectos
          </h2>
        </Reveal>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 md:grid-cols-2"
          staggerDelay={0.1}
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const inner = (
    <div className="group flex h-full flex-col bg-background transition-colors duration-500 hover:bg-foreground/[0.02]">
      {/* Cover */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/30 bg-muted/30">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-black">
            <span className="text-2xl font-semibold text-white/20">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{project.title}</h3>
            <span className="text-sm text-muted-foreground/60">
              {project.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {project.url && (
          <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground">
            <span>Ver proyecto</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M4 12L12 4M12 4H6M12 4v6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="h-full">
        {inner}
      </a>
    );
  }

  return inner;
}
