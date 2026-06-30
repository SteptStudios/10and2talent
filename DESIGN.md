# 10&2 Talent — Design System

> Source of truth for the 10&2 site. Distilled from **`10&2 Brand Exploration_05.30.26.pdf`** (44pp) and **`10&2 Website.docx`**. Update this doc when the deck changes; the site (`src/App.tsx`, `src/styles.css`) follows it.

---

## 1. Brand essence

10&2 Talent — **creative talent representation / talent agency / artist management**. "Representation for creative talent, built on a modern artist-first approach." Reps are **Agents** (never "reps", never "Ten and Two Management").

**Tone (deck pg 18):**
- We **are**: Premium · Culturally Present · Sophisticated
- We are **not**: Bro · Dark & moody · Stept-branded

**Say / write:** `10&2 Talent`, `10&2`, `Represented by 10&2`.

---

## 2. Site model — full-bleed gallery, ONE scroll

The site is a **single scrolling page**, photo-forward, edge-to-edge. NOT an editorial layout with margins/columns, NOT a multi-page click-through.

Scroll order:
1. **Splash** — white, centered `10&2` wordmark, tagline, scroll cue
2. **Spread** — two images full-bleed (50/50), giant white `10&2` overlaid across both
3. **Wall** — every photo, edge-to-edge masonry, zero gutters
4. **Spread** — second full-bleed cover
5. **Contact** — black, oversize `10&2`, minimal info block

**Nav:** `ARTIST` (left) · `10&2` (center) · `CONTACT` (right). `mix-blend-mode: difference` so it stays legible over any photo or white. Anchors scroll within the page.

**Non-negotiables:**
- Images go **all the way across** — no max-width container, no gutters, no white margins around photos.
- Type gets out of the way. The photos carry the page.
- Centered wordmark is the anchor on every screen.

---

## 3. Logo

- **Primary:** the `10&2` heavy expanded wordmark → `public/logo-wordmark.png`
- **Badge marks (circle lockups):** black / white-outline / red → `public/logo-badge-{black,outline,red}.png`
- On photography, the wordmark goes **solid white**, oversize, centered over the spread.

---

## 4. Type

| Role | Face | Notes |
|------|------|-------|
| Logo / wordmark | **Special Gothic Expanded One** | the heavy expanded `10&2`, big display moments ("THIS IS 10&2.", contact mark) |
| Editorial display | **Instrument Serif** | deck pg 20: *"Instrument Serif + Inter Tight"* — the "We are 10&2 Talent." sophisticated voice. *(Available if/when editorial copy returns; current gallery build is type-light.)* |
| Body / UI | **Inter Tight Medium** (500) | nav, labels, contact — per Website doc "BODY FONT: Inter Tight Medium" |

Loaded via Google Fonts in `index.html`.

---

## 5. Color — Colorways: RED / WHITE / BLACK / GRAY (deck pg 21)

| Variable | Value | Use |
|-------|-------|-----|
| `--ground` | `#FFFFFF` | splash, default ground |
| `--ink` | `#0A0A0A` | text, contact background |
| `--muted` | `#8A8A8A` | eyebrows, secondary |
| `--red` | `#B81500` ⚠ **placeholder** | accent, selection, focus |

> ⚠ **KEY COLORS TBD** (deck pg 18). `--red #B81500` is a placeholder — confirm exact hex with Meredith/Nick (Linear **ERI-2650**), then update `--red` + favicon.

---

## 6. Photography

- **Subjects:** licensed photography by represented talent. The current set is **Jake Rosenberg**'s portfolio (celebrity portrait + campaign work).
- **Treatment:** full-bleed, edge-to-edge. B&W and color both in play.
- **Current assets:** `public/images/talent-1..8.png` — Jake Rosenberg's licensed work, used on the Artist page grid + Home/Contact spreads.

> Higher-resolution exports welcome as Jake's full archive comes in (Linear **ERI-2648**), but the current images are real, licensed portfolio work — not placeholders.

---

## 7. Contact (no individual agent names)

- General Inquiries — `info@10and2talent.com`
- Artist Submissions — `submissions@10and2talent.com`
- Location — 220 W Ivy Ave, Inglewood, CA 90302

> Meredith Rodriguez's name/email **removed** site-wide per direction (2026-06-17). Deck says reps are unnamed "Agents." Website doc lists domain `10and2.com`; live domain is `10and2talent.com` — emails use the live domain.

---

## 8. Repos & deploy

- **Canonical (live):** `SteptStudios/10and2talent` → GitHub Pages → **10and2talent.com** (push to `main` auto-deploys).
- **This copy:** `Stept-Intranet/apps/10and2` (served at base `/10and2`). Legacy per Linear **STE-740**; canonical is source of truth. Asset paths use a base-aware `asset()` helper so they resolve under both `/` and `/10and2`.

---

## 9. Open items

- [ ] Confirm brand red hex (ERI-2650)
- [ ] Jake Rosenberg full archive / higher-res exports as available (ERI-2648)
- [x] Live on canonical `SteptStudios/10and2talent` → 10and2talent.com
- [ ] DNS / GitHub Pages domain verify (ERI-2649)
