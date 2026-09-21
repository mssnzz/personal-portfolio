export const profile = {
  name: "Manuel Sanchez",
  role: "Fullstack Developer",
  tagline: "Building accessible, responsive web apps — and testing them.",
  location: "Santo Domingo, DR · UTC−4",
  email: "hola@manuelsanchez.io",
  phone: "+1 809 319 0464",
  phoneHref: "+18093190464",
  pronouns: "he/him",
  linkedin: "https://www.linkedin.com/in/manuelsanchezdev/",
  github: "https://github.com/mssnzz",
  githubHandle: "mssnzz",
} as const;

/**
 * Headline stack for the hero badge strip. `dot` is the brand colour; names
 * that are effectively monochrome (Next, Three) fall back to the foreground
 * token so the dot still reads in both themes.
 */
export const techBadges: {
  name: string;
  icon: string;
  /** dark-theme override for monochrome marks (Next.js, shadcn) */
  iconDark?: string;
}[] = [
  { name: "React", icon: "/logos/tech/react.svg" },
  {
    name: "Next.js",
    icon: "/logos/tech/nextjs2-dark.svg",
    iconDark: "/logos/tech/nextjs2-light.svg",
  },
  { name: "TypeScript", icon: "/logos/tech/typescript.svg" },
  { name: "JavaScript", icon: "/logos/tech/js.svg" },
  { name: "Node.js", icon: "/logos/tech/node.svg" },
  { name: "Tailwind CSS", icon: "/logos/tech/tailwindcss.svg" },
  { name: "Motion", icon: "/logos/tech/motion.svg" },
  {
    name: "shadcn/ui",
    icon: "/logos/tech/shadcn-ui-dark.svg",
    iconDark: "/logos/tech/shadcn-ui-light.svg",
  },
  { name: "Cypress", icon: "/logos/tech/cypress.svg" },
  { name: "Git", icon: "/logos/tech/git.svg" },
]

export const specs = [
  { label: "Development", value: "5 years, production" },
  { label: "Defect triage", value: "5 years, live users" },
  { label: "Test surface", value: "iOS · Android · Web" },
  { label: "Automation", value: "Cypress · JS / TS" },
  { label: "English", value: "C1 · client-ready" },
  { label: "Availability", value: "Immediate" },
] as const;

export type Track = "support" | "dev" | "now";

export const experience: {
  range: string;
  /** Rendered under the range; stated rather than parsed out of it. */
  duration: string;
  track: Track;
  trackLabel: string;
  title: string;
  org: string;
  bullets: string[];
  note?: string;
}[] = [
  // Curated to the three roles that carry the QA + development story. Shorter
  // and older stints (Team International, Teleperformance, the HVAC contract)
  // are left off deliberately; full history goes on application forms.
  {
    range: "Jul 2025 — Apr 2026",
    duration: "10 mo",
    track: "support",
    trackLabel: "Defect triage",
    title: "Application Support Technician",
    org: "Turo · Remote",
    bullets: [
      "Reproduced and documented defects for engineering: repro steps, device/OS matrix, logs — the same artefact a QA ticket is judged on.",
      "Triaged incoming reports, separating client-side misuse from genuine platform defects before anything reached the engineering queue.",
      "Covered a three-surface test matrix daily: iOS app, Android app and browser.",
      "Exercised the flows that break hardest in production — identity verification, booking, payments.",
      "Owned escalated cases end to end through resolution.",
    ],
  },
  {
    range: "Apr 2024 — Jun 2025",
    duration: "1 yr 3 mo",
    track: "support",
    trackLabel: "Device testing",
    title: "Help Desk / Technical Support",
    org: "Alorica · Santo Domingo, DO",
    bullets: [
      "Bilingual (EN/ES) troubleshooting across a wide Samsung device and OS-version matrix — hardware, software and configuration.",
      "Isolated reproducible faults from user error on devices that could not be handed to a developer.",
      "Documented every case in the ticketing system and fed confirmed findings back into the knowledge base.",
    ],
  },
  {
    range: "2019 — 2024",
    duration: "5 yrs",
    track: "dev",
    trackLabel: "Development",
    title: "Fullstack Developer",
    org: "Clix Solution Consulting · Remote",
    bullets: [
      "Five years building and maintaining production web applications end to end, across client engagements including REDACTED and REDACTED.",
      "Node.js backends with ORM over SQL and NoSQL databases — the layer most API tests target.",
      "Code review and debugging on existing codebases, not only greenfield work.",
      "Cross-browser and responsive compatibility work on every delivery.",
      "Shipped and still maintain the client sites listed below, across healthcare, insurance and SaaS.",
    ],
  },
];

// NOTE(manu): confirm your exact role. The site's own noscript block says
// "Kalenday es un producto de REDACTED DO LLC", so the earlier claim of
// "my own product / sole developer and operator" was checkable and wrong.
// Wording below is accurate for a developer who builds and maintains it —
// adjust if you are a founder or partner rather than the engineer on it.
export const product = {
  title: "Kalenday",
  tagline: "The product I build and maintain",
  url: "https://kalenday.com",
  screenshot: "/screenshots/kalenday.webp",
  description:
    "An AI communication platform: agents that answer, qualify and book customers across WhatsApp, Instagram, email and SMS, in a single inbox. A React single-page app over a Node backend, with channel integrations that have to stay up because real conversations run through them.",
  facts: [
    ["Role", "Developer — build and maintenance"],
    ["Stack", "React SPA · Node.js · Tailwind"],
    ["Surface", "WhatsApp, Instagram, email, SMS"],
  ],
} as const;

/**
 * Public repositories worth opening, which is not the same as every public
 * repository. The account carries nineteen; the rest are coursework, technical
 * tests and undescribed experiments, and listing them would dilute these three
 * rather than add to them.
 */
export const openSource = [
  {
    name: "playwright-page-audits",
    url: "https://github.com/mssnzz/playwright-page-audits",
    stack: "Playwright · TypeScript",
    description:
      "Reusable assertions for the defects that ship quietly: broken images, console errors, sideways scroll on a phone, skipped heading levels, external links handing over window.opener, a share card that previews blank. Every audit is tested twice — that it stays quiet on a clean page, and that it fires on one carrying the defect.",
    note: "Pulled out of a client suite",
  },
  {
    name: "bayer-dither",
    url: "https://github.com/mssnzz/bayer-dither",
    stack: "Canvas2D · TypeScript · no dependencies",
    description:
      "The renderer behind the portrait on this page, packaged on its own. An image or a line of text becomes a grid of square marks whose size carries the tone, drawn in the element's own colour so it follows the theme. Respects reduced motion and parks itself off-screen.",
    note: "The portrait above",
  },
  {
    name: "personal-portfolio",
    url: "https://github.com/mssnzz/personal-portfolio",
    stack: "Next.js · React · Tailwind",
    description:
      "This site. Server components, a contribution graph read straight off the public profile with no third-party embed, and 38 end-to-end tests across desktop and mobile viewports running in CI.",
    note: "The page you are on",
  },
] as const;

export const projects: {
  title: string;
  category: string;
  description: string;
  url: string;
  screenshot: string;
  /** Client mark where one exists; the card falls back to the name in type. */
  logo?: string;
  /**
   * CSS filter for the mark on the dark band. Most of these read as drawn;
   * the two that do not are set here rather than by a blanket rule, because a
   * uniform silhouette filter flattens the logos that carry their own colour.
   */
  logoFilter?: string;
}[] = [
  {
    title: "REDACTED",
    category: "Telehealth",
    description:
      "Telemedicine platform with video consultations, medical history and appointment management.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
  },
  {
    title: "REDACTED",
    category: "E-commerce",
    description:
      "Dental supplies and equipment store with catalogue, quote requests and ordering.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
    logoFilter: "grayscale(1) invert(1)",
  },
  {
    title: "REDACTED",
    category: "SaaS",
    description:
      "Booking system for small businesses with online reservations and automated reminders.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED",
    logo: "/logos/REDACTED",
  },
  {
    title: "REDACTED",
    category: "Institutional",
    description:
      "Public portal for the life-assurance programme of the Central Bank of the Dominican Republic.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
  },
  {
    title: "REDACTED",
    category: "Insurance",
    description:
      "Insurance provider portal: coverage, affiliated provider network and online authorisations.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
  },
  {
    title: "REDACTED",
    category: "Healthcare",
    description:
      "Health services platform with appointment booking and a medical provider directory.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
  },
  {
    title: "REDACTED",
    category: "E-commerce",
    description:
      "Medical equipment e-commerce platform with catalogue, quote requests and blog.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
  },
  {
    title: "Clix Solution",
    category: "Consulting",
    description:
      "Technology solutions and digital consulting site for growing companies.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
  },
  {
    title: "REDACTED",
    category: "Education",
    description:
      "Scrum Master certification platform with hands-on training and international certification.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
  },
  {
    title: "REDACTED",
    category: "Technology",
    description:
      "Corporate site for a technology and digital transformation company.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED-mark.png",
  },
  {
    title: "REDACTED",
    category: "Software",
    description:
      "Corporate website for an enterprise software company.",
    url: "https://REDACTED",
    screenshot: "/screenshots/REDACTED.webp",
    logo: "/logos/REDACTED.png",
    logoFilter: "invert(1)",
  },
];

export const skillGroups = [
  {
    title: "Engineering",
    items: [
      ["JavaScript", "proficient"],
      ["TypeScript", "working"],
      ["React / Next.js", "proficient"],
      ["Node.js / NestJS", "backends, REST, ORM"],
      ["SQL & NoSQL", "schema and query work"],
      ["Git", "daily, including review"],
    ],
  },
  {
    title: "QA & Testing",
    items: [
      ["Cypress", "end-to-end tests in JavaScript"],
      ["Defect reporting", "repro steps, device/OS matrix, logs"],
      ["Triage", "user error vs. reproducible platform defect"],
      ["Cross-platform", "iOS, Android, browser, Windows"],
      ["Trackers", "Jira, ServiceNow, Intercom, Kustomer"],
      ["Regression windows", "post-deploy and post-migration"],
    ],
  },
  {
    title: "How I work",
    items: [
      ["English C1", "comfortable on client and stakeholder calls"],
      ["Written-first", "async handoffs, no meeting required"],
      ["Repro-first", "a bug report is only done when it reproduces"],
      ["SLA discipline", "queue hygiene and documented closure"],
    ],
  },
] as const;


export const contactRows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "LinkedIn", value: "manuel-sanchez", href: profile.linkedin },
  { label: "GitHub", value: profile.githubHandle, href: profile.github },
  { label: "Based in", value: profile.location },
  { label: "English", value: "C1 — client-ready" },
  { label: "Working hours", value: "UTC−4 · full US Eastern overlap" },
  { label: "Arrangement", value: "Remote, full-time · available immediately" },
  { label: "Target", value: "Frontend · fullstack · QA automation" },
] as const;
