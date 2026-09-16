import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Handwritten face for the annotation callouts.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

/** Canonical origin. Everything relative in the metadata below resolves
 *  against it, including the generated OG image, which social crawlers will
 *  only fetch as an absolute URL. */
export const siteUrl = "https://www.manuelsanchez.io";

const title = "Manuel Sanchez — Fullstack Developer & QA";
const description =
  "Fullstack developer: five years shipping and maintaining production React and Node applications, with a parallel QA track — defect triage across iOS, Android and web, and Playwright suites running in CI. Santo Domingo, open to remote.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    // Sub-pages set their own title and get the name appended.
    template: "%s — Manuel Sanchez",
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Manuel Sanchez", url: siteUrl }],
  creator: "Manuel Sanchez",
  keywords: [
    "fullstack developer",
    "react",
    "next.js",
    "node.js",
    "typescript",
    "qa engineer",
    "playwright",
    "cypress",
    "remote",
    "Santo Domingo",
    "Dominican Republic",
  ],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "Manuel Sanchez",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Chillax (agency wordmarks) is loaded via <link>, not a CSS @import:
            the bracketed f[]= URL gets mangled by the CSS bundler and dropped
            from the production build, which silently falls the font back. The
            portfolio headings use Geist (self-hosted via next/font). */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=chillax@700&display=swap"
        />
      </head>
      {/* Extensions (ColorZilla, Grammarly, password managers) inject
          attributes on <body> before React hydrates. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
