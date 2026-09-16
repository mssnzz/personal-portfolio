import { Header } from "@/components/header";
import { Noise } from "@/components/grid-bg";
import { CvHero } from "@/components/cv/cv-hero";
import { SectionRule } from "@/components/cv/section-rule";
import { CvExperience } from "@/components/cv/cv-experience";
import { GithubContributions } from "@/components/cv/github-contributions";
import { CvProduct } from "@/components/cv/cv-product";
import { CvOpenSource } from "@/components/cv/cv-open-source";
import { CvWork } from "@/components/cv/cv-work";
import { CvSkills } from "@/components/cv/cv-skills";
import { CvContact } from "@/components/cv/cv-contact";
import { CvFooter } from "@/components/cv/cv-footer";
import {
  contactRows,
  experience,
  openSource,
  projects,
  skillGroups,
} from "@/components/cv/data";

// Kalenday is a product of its own, so the nav sends visitors to the live site
// rather than to the §02 section further down this page.
const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Experience", href: "#experience" },
  // lands at the head of the three work sections: product, then the
  // public repos, then the client sites
  { label: "Projects", href: "#product" },
  { label: "Skills", href: "#skills" },
  { label: "Kalenday", href: "https://kalenday.com", external: true },
];

export default function Home() {
  return (
    <div data-pf>
      {/* Full-page column grid, fixed behind everything — header and hero
          included, like the msanz.dev reference. */}
      <div className="guide-lines" aria-hidden="true" />
      <Noise />
      <Header
        navLinks={navLinks}
        homeHref="/"
        ctaLabel="Contact"
        ctaHref="#contact"
        menuLabel="Menu"
        themeLabel="Toggle theme"
        githubRepo="mssnzz/personal-portfolio"
        githubHint
        avatarInitials="MS"
        verified
        bordered
      />

      <div className="relative z-10">
        <CvHero />

        <main>
          <SectionRule
            index="01"
            label="Experience"
            meta={`${experience.length} roles · 2019 — 2026`}
          />
          {/* The panel is a server component (it fetches), handed to the
              client section as a prop so it can sit inside its layout. */}
          <CvExperience contributions={<GithubContributions />} />
          <SectionRule index="02" label="Own product" meta="1 · still shipping" />
          <CvProduct />
          <SectionRule
            index="03"
            label="Open source"
            meta={`${openSource.length} public repos`}
          />
          <CvOpenSource />
          <SectionRule
            index="04"
            label="Clients"
            meta={`${projects.length} clients`}
          />
          <CvWork />
          <SectionRule
            index="05"
            label="Toolset"
            meta={`${skillGroups.reduce((n, g) => n + g.items.length, 0)} entries`}
          />
          <CvSkills />
          <SectionRule
            index="06"
            label="Contact"
            meta={`${contactRows.length} ways in`}
          />
          <CvContact />
          <CvFooter />
        </main>
      </div>
    </div>
  );
}
