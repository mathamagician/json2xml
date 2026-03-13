# JSON2XML Converter — Project Instructions

## Project Identity
- Free browser-based JSON ↔ XML converter at json2xml.com
- Privacy-first: all conversion runs client-side, nothing sent to a server
- Monetization: Google AdSense + Buy Me a Coffee

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS (dark theme: slate-950 background, brand blue sky-600)
- `fast-xml-parser` v4 for XML parsing/building
- Static export: `output: "export"` in next.config.ts — no server needed
- Vercel Analytics for usage metrics

## Critical Constraints
- **Static export only** — no server-side features, no API routes, no dynamic rendering
- All routes needing metadata exports must use `export const dynamic = "force-static"`
- **AdSense scripts**: use direct `<script async={true}>` in layout.tsx, NOT `next/script` (bots can't see next/script in static exports)
- **Client-side only conversion** — this is a privacy selling point, never add server-side processing

## Architecture
```
app/
  layout.tsx          — metadata, fonts, AdSense script, Analytics
  page.tsx            — hero, Converter, features, how-to, FAQ, footer
  globals.css         — Tailwind base + component classes
  sitemap.ts          — /sitemap.xml (force-static)
  robots.ts           — /robots.txt (force-static)
  opengraph-image.tsx — 1200x630 OG image at build time (force-static)
  privacy/page.tsx    — privacy policy
components/
  Converter.tsx       — two-panel editor with all conversion UI
lib/
  converter.ts        — jsonToXml(), xmlToJson(), detectFormat()
  converter.worker.ts — Web Worker for large file handling
```

## Web Worker Thresholds
- < 512 KB: sync conversion on main thread (instant)
- 512 KB – 5 MB: Web Worker with progress bar
- 5 MB+: file processed in Worker, download-only output
- 10 MB+: textarea too large to render, download-only overlay

## Styling
- Dark theme throughout (slate-950 background)
- Brand color: sky-600 / sky-500 for accents and interactive elements
- Tailwind utility classes only — no inline styles, no CSS modules

## Deployment
- Push to `main` → Vercel auto-deploys (GitHub integration connected)
- DNS: GoDaddy A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- No staging workflow needed — small project, low risk

## SEO Setup
- Sitemap, robots.txt, canonical URL, JSON-LD WebApplication schema
- 12 long-tail keywords in meta description
- OG image auto-generated at build time
- Google Search Console verified, sitemap submitted

## Known Gotchas
- `create-next-app` fails if directory name has capitals — scaffold manually
- Next.js 15.2.2 had critical security vuln — upgraded to 16.1.6
- `output: "export"` breaks if any route lacks force-static export
