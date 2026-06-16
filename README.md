# 10&2 Talent

Creative talent representation agency. Artist management built on a modern, artist-first approach.

Canonical layout: brand deck page 6 — white editorial left panel, full-bleed talent photo right panel.

## Stack
- **Vite + React + TypeScript**
- **framer-motion** — scroll beat reveals (reduced-motion safe)
- Hand-written CSS — no utility framework
- Type: **Special Gothic Expanded One** (wordmark, tagline) + **Inter Tight** (labels, copy)

## Run
```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

## Structure
- `src/App.tsx` — Nav, Beat (×3 scroll beats), Artists, Contact, Footer
- `src/styles.css` — design tokens + `.beat` split-panel layout
- `public/logo-wordmark.png` — brand wordmark PNG (2806×820 RGBA, black on transparent)
- `public/images/talent-{1,2,3}.png` — talent photography (MBJ, Halle Berry, leather jacket)
- `DESIGN_BRIEF.md` — design source of truth; all visual decisions trace back here

## Design rules
- WHITE ground — never red background, never dark theme
- Wordmark is always the PNG (`/logo-wordmark.png`), never CSS text
- 3 scroll beats: each = 62/38 split panel + full-width wordmark + "THIS IS 10&2." tagline
- Beat 0: 3-col micro-text grid (CREATIVE TALENT REPRESENTATION / TALENT AGENCY / ARTIST MANAGEMENT)
- Beats 1–2: compact — wordmark + single copy line

## Contacts
- Sr. Agent: Meredith Rodriguez — meredith@10and2.com
- General: contact@10and2.com
- 220 W Ivy Ave, Inglewood, CA 90302
