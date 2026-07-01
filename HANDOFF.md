# 10&2 Talent — Site Handoff
**Date:** 2026-07-01
**Prepared by:** Erich Roepke / Stept Studios

---

## Live URLs

| Environment | URL | Status |
|---|---|---|
| **Public domain** | `10and2talent.com` | Live via GitHub Pages |
| **Stept intranet (auth-gated)** | `mvp.steptstudios.com/10and2` | Live via Docker/Caddy |

---

## Repos

| Repo | Purpose | Branch |
|---|---|---|
| `SteptStudios/10and2talent` | Public GitHub Pages site | `main` → auto-deploys |
| `SteptStudios/Stept-Intranet` | Monorepo — app at `apps/10and2/` | `main` → CI deploys Docker |

---

## Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Animations:** Framer Motion
- **Fonts:** Special Gothic Expanded One (display), Inter Tight (body) — Google Fonts
- **Build:** `npm run build` → `dist/`
- **Public site:** GitHub Actions builds and deploys to GitHub Pages on push to `main`
- **Intranet site:** Docker + nginx (port 3107), served via Caddy reverse proxy under `/10and2`

---

## Design System

| Token | Value |
|---|---|
| Background | `#FFFFFF` / `#F9F8F7` |
| Ink | `#0A0A0A` |
| Body copy | `#3D3D3D` |
| Muted / labels | `#888888` |
| Red accent | `#B81500` |
| Border | `#E0E0E0` |

**Logo assets** (in `public/`):
- `logo-wordmark.png` — horizontal BW wordmark (used in nav + footer + hero)
- `logo-badge-red.png` — red circle badge (available, not currently used in nav)
- `logo-badge-black.png`, `logo-badge-outline.png` — alternates

---

## Page Architecture

Single-scroll, photo-forward portfolio page.

| Section | Key content |
|---|---|
| **Splash** | Centered wordmark + "CREATIVE TALENT REPRESENTATION" + scroll cue |
| **Feature spread** | Two full-bleed images with white wordmark overlay |
| **Manifesto** | Representation statement |
| **Artist reel** | Jake Rosenberg title + horizontal portfolio scroll |
| **Black showcase** | Two strongest black-background frames |
| **Contact** | Wordmark + general inquiries, artist submissions, location, copyright |

---

## Contacts

| Role | Name | Email |
|---|---|---|
| General Inquiries | — | info@10and2talent.com |
| Artist Submissions | — | submissions@10and2talent.com |
| Address | 220 W Ivy Ave, Inglewood, CA 90302 | — |

---

## How to Update

**Content changes** (copy, emails, contacts):
```
~/Dev/apps/10-and-2/src/App.tsx  — all page content
```

**Style changes** (colors, fonts, spacing):
```
~/10-and-2/src/styles.css  — design tokens + component styles
```

**To deploy public site after changes:**
```bash
cd ~/Dev/apps/10-and-2
# Edit source files
git checkout -b codex/your-branch
git add src/App.tsx src/styles.css
git commit -m "your message"
git push -u origin codex/your-branch
# Open a PR to main. Merge after build/lint and browser smoke pass.
```

**To deploy intranet site:**
```bash
# Mirror changes to monorepo
cp ~/Dev/apps/10-and-2/src/App.tsx ~/conductor/repos/stept-intranet/apps/10and2/src/
cp ~/Dev/apps/10-and-2/src/styles.css ~/conductor/repos/stept-intranet/apps/10and2/src/
# Commit + PR to main in Stept-Intranet → CI builds Docker and deploys
```

---

## Talent Photos

Located at `public/images/`:
- `feat-*.jpg` — feature spreads / hero imagery
- `black-*.jpg` — black-background showcase frames
- `jr-*.jpg` — Jake Rosenberg horizontal reel

To swap a photo: replace the file at the same path. No code change needed.

---

## Pending / Next Steps

| Item | Owner | Notes |
|---|---|---|
| Jake Rosenberg archive | Erich / Nick | Higher-res exports as available |
| Color confirmation (red accent) | Meredith / Nick | Current: `#B81500` — placeholder |
| Steptopedia entity profile for 10&2 | Erich | Links to/from Stept intranet |
