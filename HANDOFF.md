# 10&2 Talent — Site Handoff
**Date:** 2026-06-16
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

3-beat scroll page → Roster → Contact → Footer

| Section | Key content |
|---|---|
| **Beat 1** | Full wordmark + "CREATIVE TALENT REPRESENTATION" + MBJ photo |
| **Beat 2** | "ARTIST MANAGEMENT…" copy + Halle Berry photo |
| **Beat 3** | "WE REPRESENT CREATIVE TALENT…" + leather portrait + "THIS IS 10&2." tagline |
| **Roster** | "The Roster" heading + curated-by-submission note (no artist cards yet) |
| **Contact** | "REPRESENT THE BEST. LET'S TALK" + agent info |
| **Footer** | Wordmark + copyright |

---

## Contacts

| Role | Name | Email |
|---|---|---|
| Sr. Agent | Meredith Rodriguez | meredith@10and2talent.com |
| General Inquiries | — | info@10and2talent.com |
| Address | 220 W Ivy Ave, Inglewood, CA 90302 | — |

---

## How to Update

**Content changes** (copy, emails, contacts):
```
~/10-and-2/src/App.tsx  — all page content
```

**Style changes** (colors, fonts, spacing):
```
~/10-and-2/src/styles.css  — design tokens + component styles
```

**To deploy public site after changes:**
```bash
cd ~/10-and-2
# Edit source files
git add -A && git commit -m "your message"
git push  # pushes to SteptStudios/10and2talent → GH Actions auto-builds
```

**To deploy intranet site:**
```bash
# Mirror changes to monorepo
cp ~/10-and-2/src/App.tsx ~/conductor/repos/stept-intranet/apps/10and2/src/
cp ~/10-and-2/src/styles.css ~/conductor/repos/stept-intranet/apps/10and2/src/
# Commit + PR to main in Stept-Intranet → CI builds Docker and deploys
```

---

## Talent Photos

Located at `public/images/`:
- `talent-1.png` — Michael B. Jordan (Formula racing)
- `talent-2.png` — Portrait (Halle Berry)
- `talent-3.png` — Portrait (leather jacket, profile)

To swap a photo: replace the file at the same path. No code change needed.

---

## Pending / Next Steps

| Item | Owner | Notes |
|---|---|---|
| First talent card (Jake Rosenberg) | Erich / Nick | Need archive format from Jake |
| Custom domain DNS verification | Nate | `10and2talent.com` CNAME → GitHub Pages |
| Color confirmation (red accent) | Meredith / Nick | Current: `#B81500` — placeholder |
| Artist submission flow | TBD | mailto link for now |
| Steptopedia entity profile for 10&2 | Erich | Links to/from Stept intranet |
