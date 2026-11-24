import { Header } from "@/components/header";
import { Noise } from "@/components/grid-bg";
import { CvHero } from "@/components/cv/cv-hero";
import { ScrollStory } from "@/components/cv/scroll-story";
import { CvExperience } from "@/components/cv/cv-experience";
import { GithubContributions } from "@/components/cv/github-contributions";
import { CvProduct } from "@/components/cv/cv-product";
import { CvOpenSource } from "@/components/cv/cv-open-source";
import { CvSkills } from "@/components/cv/cv-skills";
import { CvContact } from "@/components/cv/cv-contact";
import { CvFooter } from "@/components/cv/cv-footer";

// Kalenday is a product of its own, so the nav sends visitors to the live site
// rather than to the §02 section further down this page.
const sections = [
  { id: "top", index: "00", label: "Intro" },
  { id: "experience", index: "01", label: "Experience" },
  { id: "product", index: "02", label: "Product" },
  { id: "open-source", index: "03", label: "Open source" },
  { id: "skills", index: "04", label: "Toolset" },
  { id: "contact", index: "05", label: "Contact" },
];

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
      <ScrollStory sections={sections} />
      <Header
        navLinks={navLinks}
        homeHref="/"
        ctaLabel="Contact"
        ctaHref="#contact"
        menuLabel="Menu"
        themeLabel="Toggle theme"
        cvHref="/manuel-sanchez-cv.pdf"
        avatarInitials="MS"
        verified
        floating
      />

      <div className="relative z-10">
        <CvHero />

        <main>
          {/* The panel is a server component (it fetches), handed to the
              client section as a prop so it can sit inside its layout. */}
          <CvExperience contributions={<GithubContributions />} />
          <CvProduct />
          <CvOpenSource />
          <CvSkills />
          <CvContact />
          <CvFooter />
        </main>
      </div>
    </div>
  );
}
