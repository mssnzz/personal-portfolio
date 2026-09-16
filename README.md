# manuelsanchez.io

Personal site of Manuel Sanchez — fullstack developer, Santo Domingo (UTC−4).
Two audiences, two routes, one codebase and one design system.

- **`/`** — developer portfolio (English), aimed at remote engineering hiring.
- **`/servicios`** — web-design agency landing (Spanish), for local clients.

**Live:** [manuelsanchez-io.vercel.app](https://manuelsanchez-io.vercel.app)

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn |
| 3D | React Three Fiber · drei · postprocessing (the hero brain) |
| Motion | Motion (`motion/react`) |
| Language | TypeScript |
| Package manager | pnpm |

## Running locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # production build
pnpm start        # serve the build
pnpm lint         # eslint
```

## Layout

```
src/
  app/
    page.tsx            # / — developer portfolio
    servicios/page.tsx  # /servicios — agency landing
    layout.tsx          # root: fonts, theme provider, metadata
    globals.css         # Tailwind v4 theme tokens + print styles
  components/
    cv/                 # portfolio sections (hero, experience, work, …)
    cv/data.ts          # all portfolio content lives here — edit this, not JSX
    scene.tsx           # the 3D hero
    header.tsx          # shared header, parametrized per route
    …                   # agency-landing sections + shadcn ui primitives
```

Portfolio content is data-driven: text, roles, projects and skills are in
`src/components/cv/data.ts`, so the copy can change without touching markup.

## Notes for anyone reusing this

The **code** is MIT-licensed — fork it, learn from it, build your own. The
**content** is not: the name, résumé, client work and screenshots under
`public/` are Manuel's. If you reuse the structure, swap in your own.

The hero renders a 3D brain with WebGL. It is lazy-loaded and hidden in print,
so the portfolio still prints cleanly as a CV.

## License

[MIT](./LICENSE) © 2026 Manuel Sanchez — code only; see the note above.
