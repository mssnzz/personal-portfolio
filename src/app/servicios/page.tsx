import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Trusted } from "@/components/trusted";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Noise } from "@/components/grid-bg";

export const metadata: Metadata = {
  title: "Manuel Sanchez | Diseño Web & Desarrollo de Apps",
  description:
    "Diseño y desarrollo sitios web profesionales y aplicaciones que generan resultados para tu negocio. +4 años de experiencia con clientes en salud, seguros y fintech.",
  openGraph: {
    title: "Manuel Sanchez | Diseño Web & Desarrollo de Apps",
    description:
      "Diseño y desarrollo sitios web profesionales y aplicaciones que generan resultados para tu negocio.",
    type: "website",
    locale: "es_DO",
  },
};

export default function ServiciosPage() {
  return (
    <div lang="es">
      <Noise />
      <Header />
      <Hero />
      <main className="relative z-10">
        <Trusted />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
