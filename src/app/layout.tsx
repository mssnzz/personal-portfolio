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

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Manuel Sanchez — Technical Support Engineer",
  description:
    "Five years of bilingual L1/L2 technical support across consumer apps, devices and 300-user corporate environments, with a parallel web development track. Open to remote roles.",
  openGraph: {
    title: "Manuel Sanchez — Technical Support Engineer",
    description:
      "Bilingual L1/L2 support with a development background. Open to remote roles, US Eastern hours.",
    type: "profile",
    locale: "en_US",
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
