"use client";

import { profile } from "@/components/cv/data";

export function CvFooter() {
  return (
    <footer className="border-t border-border/20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex justify-center py-12 md:py-16">
          <span className="font-mono text-4xl font-medium tracking-tight md:text-6xl">
            Manuel Sanchez
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border/20 py-6 md:flex-row md:justify-between">
          <span className="text-sm text-muted-foreground">
            {new Date().getFullYear()} &copy; Manuel Sanchez — Fullstack
            Developer · React, Next.js, Node · Santo Domingo, UTC−4
          </span>

          <div className="flex items-center gap-6">
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href={profile.linkedin} external>
              LinkedIn
            </FooterLink>
            <FooterLink href={profile.github} external>
              GitHub
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {children}
    </a>
  );
}
