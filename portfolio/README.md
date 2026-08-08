# Shahriar Newaz — Portfolio

Premium personal portfolio built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, and **shadcn/ui-style** components.

## Features

- Apple-inspired glassmorphism UI with dark / light mode
- Sticky nav with active section highlighting
- Scroll progress indicator & back-to-top
- Animated hero, timeline experience, skill bars, counters
- SEO metadata, Open Graph image, `robots.txt`, `sitemap.xml`
- Accessible semantics, keyboard focus rings, reduced-motion support

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |

## Project structure

```
src/
  app/                 # App Router pages, SEO, styles
  components/
    layout/            # Navbar, footer, theme, scroll UX
    sections/          # Hero → Contact portfolio sections
    shared/            # FadeIn, counters, headings
    ui/                # Button, Card, Badge, Input, …
  data/profile.ts      # Content from LinkedIn / resume
  types/               # TypeScript interfaces
  lib/utils.ts         # cn() helper
public/
  projects/            # SVG project placeholders
  resume.pdf           # Replace with your real CV
```

## Chat assistant (OpenRouter)

The bottom-right chat widget calls `/api/chat`, which proxies to OpenRouter on the server.

1. Copy `.env.example` → `.env.local`
2. Set `OPENROUTER_API_KEY` (never use a `NEXT_PUBLIC_` prefix)
3. Optionally set `OPENROUTER_MODEL` (default: `openai/gpt-4o-mini`)
4. Restart `npm run dev`

## Customize

1. **Photo** — replace the hero monogram placeholder in `src/components/sections/hero.tsx`.
2. **Resume** — overwrite `public/resume.pdf`.
3. **Content** — edit `src/data/profile.ts` (placeholders are marked in comments / badges).
4. **Contact form** — wire `src/components/sections/contact.tsx` to Formspree, Resend, or an API route.
5. **Site URL** — set `NEXT_PUBLIC_SITE_URL` for canonical SEO links.

## Placeholders to replace

- Professional headshot
- Certification cards (marked as Placeholder)
- Sample GenAI / Sportsbook project links
- Third testimonial
- Live contact form backend
- Real resume PDF

## License

Personal portfolio — all rights reserved.
