# 10&2 Talent — Hosting & Sites-Droplet Plan

> **Status:** `dev.10and2talent.com` near-term hosting is **✅ LIVE (2026-06-16)**; the dedicated **sites-droplet remains a proposal** for review.
> **Date:** 2026-06-16 · **Author:** Nate (with Claude) · **Builds on:** [`HANDOFF.md`](../HANDOFF.md) (Erich Roepke)

---

## TL;DR

- **Near-term (✅ LIVE 2026-06-16):** `dev.10and2talent.com` (auth-gated / internal) runs on the **existing Stept dev droplet** — no new infrastructure. The public apex `10and2talent.com` **stays on GitHub Pages, untouched.**
- **Future direction (this proposal, deferred):** a dedicated, low-cost **"sites" droplet** to host all Stept public brand websites — `steptstudios.com`, `lockt-post.com`, `vaultcinemarentals.com`, and `10and2talent.com` — cleanly separated from the auth/intranet stack.
- **For Erich to weigh in on:** whether to bless the sites-droplet direction, the droplet size/naming, and when (if ever) to migrate the `10and2talent.com` apex off GitHub Pages onto it.

---

## Why this came up

The goal was simple on paper: a `dev` branch → `dev.10and2talent.com` and a `prod` branch → `10and2talent.com`. Two hosting constraints make that less simple than it looks:

1. **GitHub Pages allows only one custom domain per repo.** The published artifact carries exactly one `CNAME`, so a single Pages repo *cannot* serve both `dev.10and2talent.com` and `10and2talent.com` from two branches. Per-branch domains require a host that supports them (Vercel/Cloudflare Pages, DO App Platform, or our own Caddy).
2. **`dev` must be auth-gated/internal.** DO App Platform static sites have no integration with our Authentik SSO. The only stack in Stept's infra that does Authentik gating is **Caddy `forward_auth` on a droplet** — exactly how `dev.steptstudios.com` and `mvp.steptstudios.com/10and2` already work. And this app is *already* containerized for it (`Dockerfile` + `nginx.conf`, port 3107).

So Pages stays great for the public apex, but the internal `dev` site belongs on our Caddy/Authentik stack.

---

## Current state (verified 2026-06-16)

| Surface | Where it lives | Notes |
|---|---|---|
| `10and2talent.com` (+`www`) | **GitHub Pages**, built from `main` via Actions | HTTPS cert valid through **2026-09-14**, `https_enforced` |
| `mvp.steptstudios.com/10and2` | **`tenandtwo` container on the edge droplet** (`ghcr.io/steptstudios/10and2:latest`, :3107) | Auth-gated via edge Caddy `forward_auth`. Uses **~3 MB RAM** — it's static nginx |
| DNS | **GoDaddy** (`ns57/58.domaincontrol.com`) | Apex → GH Pages IPs `185.199.108–111.153`; `www` → `steptstudios.github.io`. *All DNS edits are manual in GoDaddy.* |

> ⚠️ **Build-pipeline note for the build phase:** this repo's only workflow is the Pages build (`deploy.yml`); it does **not** build the Docker image. The existing `ghcr.io/steptstudios/10and2` image is built elsewhere and is effectively orphaned now that `apps/10and2` was removed from the Stept-Intranet monorepo (#984/#986). If we lean on the container path, this repo should get its own clean Docker build→push workflow for `dev` (and later `main`).

### Existing droplets

| Droplet | Size | $/mo | Region | Load |
|---|---|---|---|---|
| `stept-intranet-edge` | 4 GB / 2 vCPU / 80 GB | $24 | sfo3 | ~81% RAM used, **0 swap**, ~737 MB free. Runs Caddy + Authentik + Neo4j + ~14 app containers |
| `dev-stept-intranet` | 4 GB / 2 vCPU / 80 GB | $24 | sfo3 | Staging backend behind `dev.steptstudios.com` |

The edge box is the **auth + prod-intranet critical host** and is already tight. Static sites add ~nothing to RAM, but we don't want public marketing sites coupled to the box that gates every internal app.

---

## Near-term hosting — ✅ AS-BUILT (LIVE 2026-06-16)

`dev.10and2talent.com` runs on the **existing dev droplet**, gated by the existing Authentik — mirroring the `dev.steptstudios.com` pattern. **Cost: $0** (reuses both droplets + Authentik). Public apex `10and2talent.com` **stays on GitHub Pages**.

```
GoDaddy A  dev.10and2talent.com → 209.38.154.79 (edge droplet)
  └→ edge Caddy vhost (forward_auth → Authentik embedded outpost, email-allowlist policy)
       └→ reverse_proxy 100.100.113.27:3107 over Tailscale
            └→ `tenandtwo` container on dev droplet (/opt/tenandtwo)
```

**Implementation details:**

- **Branch:** `dev` (off `main`; `main` stays the Pages/prod branch). Site image built from a root-serving variant — `Dockerfile.site` + `nginx.site.conf` (serves the Vite SPA at the domain root on :3107, vs. the `/10and2` subpath mount used on the intranet).
- **Container:** `10and2-site:dev`, run via `/opt/tenandtwo/docker-compose.yml`, port bound to the **Tailscale IP only** (`100.100.113.27:3107`) so the un-gated raw site isn't exposed on the dev droplet's public IP.
- **TLS:** Let's Encrypt cert auto-issued by edge Caddy.
- **Authentik:** proxy provider `Provider for 10and2-dev` (forward_single, `https://dev.10and2talent.com`) + application `10and2-dev`, added to the embedded outpost. Access controlled by expression policy **`10and2-dev-allowlist`** (5 people + their `10and2.com`/`10and2talent.com` alias forms): nate, erich (`erichroepke@gmail.com`), nick, meredith, frith. All five verified able to log in.
- **Accounts:** nate/erich/nick/frith/meredith all exist in Authentik (Meredith — President of Stept Studios — added to `stept-admins`/T1).

> **Redeploy (manual, no CI yet):** edit on `dev`, then from a local clone:
> `git archive --format=tar HEAD | ssh root@dev-stept-intranet 'rm -rf /opt/tenandtwo/build && mkdir -p /opt/tenandtwo/build && tar -x -C /opt/tenandtwo/build && cd /opt/tenandtwo/build && docker build -t 10and2-site:dev -f Dockerfile.site .'`
> then `ssh root@dev-stept-intranet 'cd /opt/tenandtwo && docker compose up -d'`.
> **CI auto-build→push→deploy on push to `dev` is the natural next improvement** (Phase 0 below).

---

## Future direction (proposal): a `stept-sites` droplet

A single small droplet running **Docker + Caddy** (auto-TLS via Let's Encrypt), joined to **Tailscale**. Each brand site is its own container (static nginx, as the 3 MB `tenandtwo` already proves), fronted by a Caddy vhost.

```
stept-sites droplet  (public 80/443, sfo3, on tailnet)
├─ Caddy (auto-TLS)
│   ├─ steptstudios.com        → site container   [public]
│   ├─ lockt-post.com          → site container   [public]
│   ├─ vaultcinemarentals.com  → site container   [public]
│   ├─ 10and2talent.com        → site container   [public]   (later — apex stays on Pages until we choose to migrate)
│   └─ dev.10and2talent.com    → forward_auth ─┐  [auth-gated]
│                                              └→ shared Authentik on edge (over Tailscale)
└─ images: ghcr.io/steptstudios/*  (built by each repo's CI)
```

- **Public sites** terminate TLS right on the sites-droplet Caddy — no dependency on the intranet box.
- **Auth-gated vhosts** reuse the **existing Authentik** on edge via Tailscale `forward_auth` — no second auth stack.
- **Tailscale membership** future-proofs the "`steptstudios.com` / `lockt-post.com` share content with the intranet droplets" goal — the wire is there when wanted, but nothing has to talk now.

### Sizing & cost

| Size | $/mo | Fit |
|---|---|---|
| 1 GB / 1 vCPU | $6 | Enough for pure static, zero margin |
| **2 GB / 1 vCPU** | **$12** | **Recommended** — a dozen+ static sites + swap + small dynamic bits |
| 2 GB / 2 vCPU | $18 | Only if a site builds on-box (CI builds images, so not needed) |

Recommended: **2 GB / $12** — brings the total to ~$60/mo across three droplets, with public marketing cleanly separated from the auth/intranet stack. Upgrading the edge box for this is **not** justified (static sites need no capacity).

### Phased rollout

| Phase | Work |
|---|---|
| **0 — repo/CI** | Per repo: Docker build→push workflow for the site image (10&2 first; its `dev` branch already exists). |
| **1 — provision** | Stand up `stept-sites`: Docker + Caddy + Tailscale + firewall (80/443 + tailnet SSH). |
| **2 — 10&2** | Public `10and2talent.com` vhost (when migrating off Pages) + auth-gated `dev.10and2talent.com` (Authentik forward_auth + outpost binding). |
| **3 — other brands** | `steptstudios.com`, `lockt-post.com`, `vaultcinemarentals.com` as public vhosts, as each repo's content is ready. |

### DNS handoff (manual, GoDaddy)

For each domain/subdomain as it goes live, add an `A` record → sites-droplet public IP. Apex migration for `10and2talent.com` means repointing the four `185.199.x.153` records off GitHub Pages — a deliberate, separate cutover.

---

## Open questions for Erich

1. **Bless the sites-droplet direction?** Or keep public sites on Pages/elsewhere and only use the droplet for auth-gated `dev` surfaces?
2. **Apex migration timing:** do we eventually move `10and2talent.com` off GitHub Pages onto the sites droplet, or leave it on Pages indefinitely?
3. **Brand-site repos:** one repo per brand (like this one) vs. a sites monorepo? Affects the CI image pipeline in Phase 0.
4. **Content sharing:** when `steptstudios.com` / `lockt-post.com` need data from the intranet droplets, what's the boundary (read-only API over Tailscale, build-time pull, etc.)? Not needed now — flagged for design.
