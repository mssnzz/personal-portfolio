"use client";

export function Footer() {
  return (
    <footer className="border-t border-border/20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Logo grande centrado */}
        <div className="flex justify-center py-16 md:py-24">
          <span className="font-mono text-4xl font-medium tracking-tight md:text-6xl">
            Manuel Sanchez
          </span>
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col items-center gap-4 border-t border-border/20 py-6 md:flex-row md:justify-between">
          <span className="text-sm text-muted-foreground">
            {new Date().getFullYear()} &copy; Manuel Sanchez
          </span>

          <div className="flex items-center gap-6">
            <FooterLink href="#contacto">Contacto</FooterLink>
            <FooterLink href="https://linkedin.com/in/mssnzz" external>LinkedIn</FooterLink>
            <FooterLink href="https://github.com/mssnzz" external>GitHub</FooterLink>
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
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}
