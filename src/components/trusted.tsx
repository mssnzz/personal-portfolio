"use client";

import Image from "next/image";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";

const companies = [
  {
    name: "Doktap",
    category: "Telemedicina",
    description:
      "Plataforma de telemedicina con videollamadas, historial médico y gestión de citas.",
    logo: null,
    wordmark: true as const,
    url: "https://doktap.com",
  },
  {
    name: "Nomi",
    category: "SaaS",
    description:
      "Sistema de agendamiento para negocios con reservas online y recordatorios automáticos.",
    logo: null,
    wordmark: true as const,
    url: "https://nomi.do",
  },
  {
    name: "Kalenday",
    category: "SaaS",
    description:
      "Plataforma de agendamiento y gestión de calendario para profesionales y equipos.",
    logo: null,
    kalenday: true as const,
    url: "https://kalenday.com",
  },
  {
    name: "Clix Solution",
    category: "Consultoría",
    description:
      "Soluciones tecnológicas y consultoría digital para empresas en crecimiento.",
    logo: "/logos/clixsolution.svg",
    noInvert: true as const,
    logoClass: "max-h-10 w-auto max-w-[160px]",
    url: "https://clixsolution.net",
  },
  {
    name: "Farach",
    category: "Laboratorio",
    description:
      "Sitio web profesional para laboratorio clínico con sistema de resultados online.",
    logo: "/logos/farach.png",
    logoClass: "max-h-16 w-auto max-w-[140px]",
    url: null,
  },
  {
    name: "ARS Banco Central",
    category: "Institucional",
    description:
      "Portal web institucional para la ARS del Banco Central de la República Dominicana.",
    logo: "/logos/arsbancocentral.png",
    noInvert: true as const,
    logoClass: "max-h-12 w-auto max-w-[200px]",
    url: null,
  },
  {
    name: "Strongcare",
    category: "CMS",
    description:
      "Sistema de gestión de contenido para el sector salud con panel administrativo.",
    logo: "/logos/strongcare.png",
    noInvert: true as const,
    logoClass: "max-h-10 w-auto max-w-[170px]",
    url: null,
  },
  {
    name: "ARS Abel González",
    category: "Seguros",
    description:
      "Portal para aseguradora: cobertura, red de prestadores y autorizaciones online.",
    logo: "/logos/arsabelgonzalez.png",
    noInvert: true as const,
    logoClass: "max-h-12 w-auto max-w-[160px]",
    url: null,
  },
  {
    name: "Jubatus Enterprises",
    category: "Tecnología",
    description:
      "Empresa de tecnología especializada en soluciones de software y transformación digital.",
    logo: "/logos/jubatus.svg",
    noInvert: true as const,
    logoClass: "max-h-8 w-auto max-w-[130px]",
    url: "https://jubatusenterprises.com",
  },
  {
    name: "Opensoft",
    category: "Software",
    description:
      "Soluciones de software empresarial y desarrollo de aplicaciones a medida.",
    logo: "/logos/opensoft.png",
    url: "https://opensoftdo.com",
  },
  {
    name: "Centro Diagnóstico Bonaire",
    category: "Salud",
    description:
      "Sitio web para centro de diagnóstico médico con servicios de imagenología y laboratorio.",
    logo: "/logos/bonaire.png",
    noInvert: true as const,
    logoClass: "max-h-10 w-auto max-w-[160px]",
    url: "https://centrodiagnosticobonaire.com",
  },
  {
    name: "Rela Brands",
    category: "Marketing",
    description:
      "Agencia de marketing digital con estrategias de branding, publicidad y crecimiento.",
    logo: "/logos/relabrands.png",
    logoClass: "max-h-12 w-auto max-w-[180px]",
    url: "https://relabrands.com",
  },
];

export function Trusted() {
  return (
    <section className="relative bg-gradient-to-b from-transparent from-0% via-background to-background via-15% pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Clientes
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                Empresas que confían en mi trabajo
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              He colaborado con startups, instituciones y agencias para crear productos digitales que generan impacto.
            </p>
          </Reveal>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 md:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.06}
        >
          {companies.map((company) => (
            <StaggerItem key={company.name}>
              <CompanyCard company={company} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CompanyCard({
  company,
}: {
  company: (typeof companies)[number];
}) {
  const inner = (
    <div className="group flex h-full flex-col bg-background transition-colors duration-500 hover:bg-foreground/[0.02]">
      {/* Cover */}
      <div className="flex aspect-[2/1] items-center justify-center border-b border-border/30 bg-black px-6">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={220}
            height={80}
            className={`object-contain ${"noInvert" in company && company.noInvert ? "" : "brightness-0 invert"} ${"logoClass" in company && company.logoClass ? company.logoClass : "max-h-10 w-auto max-w-[140px]"}`}
          />
        ) : "wordmark" in company && company.wordmark ? (
          <span
            className="text-2xl lowercase tracking-tight text-white"
            style={{
              fontFamily: company.name === "Doktap" ? "'Chillax', sans-serif" : "var(--font-geist-sans), sans-serif",
              fontWeight: 700,
            }}
          >
            {company.name}
          </span>
        ) : "kalenday" in company && company.kalenday ? (
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 9C3 6.64298 3 5.46447 3.73223 4.73223C4.46447 4 5.64298 4 8 4H16C18.357 4 19.5355 4 20.2678 4.73223C21 5.46447 21 6.64298 21 9V16C21 18.357 21 19.5355 20.2678 20.2678C19.5355 21 18.357 21 16 21H8C5.64298 21 4.46447 21 3.73223 20.2678C3 19.5355 3 18.357 3 16V9Z" fill="white" />
              <path d="M15 15C14.2 15.62 13.15 16 12 16C10.85 16 9.8 15.62 9 15" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="text-xl text-white"
              style={{ fontFamily: "'Onest', sans-serif", fontWeight: 700 }}
            >
              Kalenday
            </span>
          </div>
        ) : (
          <span className="text-2xl font-semibold text-white/20">
            {company.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{company.name}</h3>
            <span className="text-sm text-muted-foreground/60">
              {company.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {company.description}
          </p>
        </div>

        {company.url && (
          <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground">
            <span>Ver</span>
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

  if (company.url) {
    return (
      <a href={company.url} target="_blank" rel="noopener noreferrer" className="h-full">
        {inner}
      </a>
    );
  }

  return inner;
}
