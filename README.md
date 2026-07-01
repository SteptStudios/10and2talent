# 10&2 Talent

Creative talent representation agency. Artist management built on a modern, artist-first approach.

This is the canonical public site for `10and2talent.com`: a single-scroll, photo-forward portfolio site centered on 10&2's wordmark and Jake Rosenberg's licensed work.

## Live URL

| Environment | URL | Status |
|---|---|---|
| Public domain | `10and2talent.com` | Live via GitHub Pages |

## Stack

- Vite + React + TypeScript
- Framer Motion for reveal and horizontal-scroll animation
- Hand-written CSS, no utility framework
- Fonts: Special Gothic Expanded One, Instrument Serif, Inter Tight
- GitHub Actions + GitHub Pages on push to `main`

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run lint
npm run preview
```

## Structure

- `src/App.tsx` - Nav, splash hero, feature spread, manifesto, Jake Rosenberg horizontal reel, black showcase, contact
- `src/styles.css` - design variables, full-bleed layout, responsive behavior
- `index.html` - metadata and Google Font loading
- `DESIGN.md` - design system and source-of-truth notes
- `public/CNAME` - GitHub Pages custom domain
- `public/logo-wordmark.svg` - primary wordmark used by the current build
- `public/logo-wordmark.png` - PNG wordmark retained for legacy/reference use
- `public/logo-badge-*.png` - badge alternates
- `public/images/feat-*.jpg`, `black-*.jpg`, `jr-*.jpg` - current Jake Rosenberg site imagery
- `public/images/talent-*.png` - earlier licensed image set retained for reference/alternate use

## Page Architecture

Single scroll:

| Section | Key content |
|---|---|
| Splash | Centered 10&2 wordmark, "Creative Talent Representation", scroll cue |
| Feature spread | Two full-bleed images with large white wordmark overlay |
| Manifesto | Representation statement |
| Artist reel | Jake Rosenberg title and horizontal portfolio scroll |
| Black showcase | Two strongest black-background frames |
| Contact | Wordmark, general inquiries, artist submissions, location, copyright |

## Design Rules

- Photos carry the page: full-bleed, edge-to-edge where the section calls for it.
- Keep the nav minimal: `ARTIST`, centered 10&2 wordmark, `CONTACT`.
- Use the base-aware `asset()` helper in `src/App.tsx` so assets resolve both at `/` and mirrored `/10and2` deployments.
- Keep the current contact model generic. Do not list individual agents on the site.
- Keep `--red: #B81500` until Meredith/Nick confirm the final brand red.

## Contacts

- General Inquiries: info@10and2talent.com
- Artist Submissions: submissions@10and2talent.com
- 220 W Ivy Ave, Inglewood, CA 90302

## Pending

| Item | Owner | Notes |
|---|---|---|
| Brand red confirmation | Meredith / Nick | Current red accent is `#B81500` |
| Jake Rosenberg archive | Erich / Nick | Higher-res exports as available |
| Steptopedia entity profile for 10&2 | Erich | Links to/from Stept intranet |
