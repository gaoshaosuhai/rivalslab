# RivalsLab

Team-Up explorer + map-aware picks for Marvel Rivals. Built solo + AI for SEO-driven ad revenue.

## What this is

An independent fan tool for [Marvel Rivals](https://www.marvelrivals.com/) (NetEase + Marvel Games). Core differentiation:

- **Team-Up Synergy Explorer** — every active Team-Up as a named, filterable, shareable entity (`/team-ups/lucky-loan/`). Existing trackers ship static tier lists; we treat Team-Ups as first-class.
- **Map-Aware Hero Picker** — per-map role lean, top heroes, recommended Team-Ups (`/maps/tokyo-2099/`).
- **Counter Picker with Team-Up overlay** — beats commodified counter sites by naming the Team-Up that breaks the matchup.
- **Per-hero / per-team-up / per-map SEO pages** — ~100-page surface area on day one.

Mobile-first because half the audience checks during queue.

## Status

- **Phase 1–8:** complete (research, design, scaffold, data layer, pages, legal). 78 pages building cleanly.
- **Phase 9 (deploy):** awaiting domain + Cloudflare Pages project.
- **V2:** verify the remaining heroes / team-ups (Season 7.5 has 49 / 24, V1 ships with 41 / 12).

See [`RESEARCH_DOSSIER.md`](./RESEARCH_DOSSIER.md) for the strategic rationale and [`DESIGN.md`](./DESIGN.md) for locked visual / tool decisions.

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # 78 static pages → dist/
npm run typecheck    # tsc --noEmit, no output = clean
```

## Tech stack

- Astro 5.1 + React 19 + Tailwind v4 (uses `@theme` blocks + `color-mix(in oklab)`)
- TypeScript with `@/*` path alias
- `@astrojs/sitemap` + `@astrojs/mdx`
- Cloudflare Pages target

## Project layout

```
.
├── RESEARCH_DOSSIER.md          # Phase 3 — full strategic dossier
├── DESIGN.md                    # Phase 4 — locked palette, motif, voice, tools
├── astro.config.mjs
├── public/
│   ├── favicon.svg              # Energy-yellow lightning bolt on Fissure Black
│   ├── og-default.svg           # 1200×630 branded card
│   └── robots.txt
├── src/
│   ├── consts.ts                # site identity + game-state snapshot
│   ├── styles/global.css        # Energy Yellow palette + half-tone motif + display sans
│   ├── data/
│   │   ├── heroes.ts            # 41 heroes (V1; verify remaining for full S7.5 roster)
│   │   ├── team-ups.ts          # 12 verified Team-Ups (V1 of 24 active)
│   │   ├── maps.ts              # 14 active competitive maps
│   │   ├── patches.ts           # MR patch feed + upcoming Season 8
│   │   └── events.ts            # Path to Doomsday seasonal arc
│   ├── components/
│   │   ├── BaseHead.astro       # SEO + Google Fonts (Anton + Inter)
│   │   ├── Header.astro         # 5-tool nav + mobile menu
│   │   ├── Footer.astro         # LAST_REVIEWED aggregation
│   │   ├── AdSlot.astro         # AdSense feature-flag (off until eligible)
│   │   └── islands/
│   │       └── TeamUpExplorer.tsx  # Filterable React island
│   └── pages/
│       ├── index.astro          # Homepage — hero + 4-tool strip + latest patch
│       ├── team-ups/
│       │   ├── index.astro      # Headline tool — hosts the React island
│       │   └── [id].astro       # 12 per-team-up pages (auto-generated)
│       ├── heroes/
│       │   ├── index.astro      # Hero directory grouped by role
│       │   └── [id].astro       # 41 per-hero pages
│       ├── maps/
│       │   ├── index.astro      # Map directory grouped by mode
│       │   └── [id].astro       # 14 per-map pages
│       ├── counter/index.astro  # Archetype-level counter framework
│       ├── patches/index.astro  # Reverse-chronological patch feed
│       ├── tier-list.astro      # Supporting tier list
│       ├── about.astro          # MR-specific editorial standards
│       ├── privacy.astro        # AdSense-ready
│       ├── terms.astro          # MR + NetEase + Marvel Games trademark notice
│       └── 404.astro
└── .github/workflows/
    ├── deploy.yml               # Auto-deploy to Cloudflare Pages on push to main
    └── maintenance-reminder.yml # Monthly LAST_REVIEWED bump checklist
```

## Visual identity

Sampled from marvelrivals.com landing + Art Vision Vol. 01 GUI devdiary + ranked tier badges:

- **Palette:** Energy Yellow `#FFD60A` + Fissure Black `#0B0B0F` + Comic-pow Red `#FF3B3B` + Cosmic violet `#7C3AED`
- **Typography:** Anton (display headlines) + Inter (body). No serifs.
- **Motif:** Comic half-tone dot pattern + diagonal "kapow" panel cuts. Hexagonal portrait frames restricted to portraits only (NOT background — that was MapleAhead's signature).

Differentiation audit vs prior projects (MapleAhead, Where Winds Meet) lives in [`DESIGN.md`](./DESIGN.md).

## Deployment

Two paths — pick one. Path B is simpler and what Where Winds Meet uses; Path A gives you control if CI lint/test gates need to run before deploy.

### Path A — GitHub Actions deploy (current default)

Repo ships with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) configured to run `npm ci && npm run build && wrangler pages deploy dist` on every push to `main`.

```bash
# 1. Push the repo
gh repo create <user>/rivalslab --public --source=. --remote=origin --push

# 2. Create Cloudflare Pages project (do this BEFORE first push or it'll 404)
npx wrangler pages project create rivalslab --production-branch=main

# 3. Generate Cloudflare API token (browser):
#    dash.cloudflare.com/profile/api-tokens → Create Token → "Cloudflare Pages — Edit" template

# 4. Find your Cloudflare account ID at the top of any zone in the dashboard sidebar
#    (or run `npx wrangler whoami`)

# 5. Push the secrets to GitHub
echo "<account-id>" | gh secret set CLOUDFLARE_ACCOUNT_ID
printf "%s" "<api-token>" | gh secret set CLOUDFLARE_API_TOKEN

# 6. Trigger the first deploy
git push origin main
gh run watch  # tails the GitHub Actions run
```

After the first run, your site is live at `https://rivalslab.pages.dev/`. Each subsequent push redeploys in ~60 s.

### Path B — Cloudflare git integration (no Actions, no secrets)

If you'd rather skip GitHub Actions:

1. Push the repo to GitHub (no secrets needed).
2. Cloudflare dashboard → Workers & Pages → **Create application** → **Pages** → **Connect to Git** → pick the GitHub repo.
3. Build settings: framework preset = `Astro`, build command = `npm run build`, output dir = `dist`, Node version = 22 (set under env vars: `NODE_VERSION=22`).
4. Save and deploy. CF auto-deploys on every push to main + gives preview URLs for branch pushes.
5. Delete `.github/workflows/deploy.yml` if you go this route — otherwise you'd double-deploy.

### Custom domain (after first successful deploy)

```bash
# Cloudflare dashboard:
# Workers & Pages → rivalslab → Custom domains → Add custom domain → rivalslab.gg
# Cloudflare auto-creates the CNAME if the domain is on Cloudflare DNS.
```

Then in `src/consts.ts` confirm `SITE_URL = 'https://rivalslab.gg'` (already set), and `git push` so the new canonical hits the sitemap.

### Email routing (required for AdSense application)

```
# Cloudflare dashboard → rivalslab.gg → Email → Email Routing → Enable
# Add a custom address: hello@rivalslab.gg → forward to your real inbox
```

Test by sending an email to `hello@rivalslab.gg` from a different account.

### Pre-launch checklist

- [ ] Register `rivalslab.gg` (or fallback `.com` / `.pro`)
- [ ] Push the repo to GitHub
- [ ] Create Cloudflare Pages project named `rivalslab`
- [ ] Pick deploy Path A or B; complete that path's setup
- [ ] Add custom domain
- [ ] Enable Cloudflare Email Routing → `hello@rivalslab.gg`
- [ ] Smoke test: `https://rivalslab.gg/`, `/team-ups/`, `/heroes/hulk/`, `/season/` all 200
- [ ] Submit `https://rivalslab.gg/sitemap-index.xml` to [Google Search Console](https://search.google.com/search-console) + [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Verify [`public/_headers`](./public/_headers) is being applied via curl: `curl -I https://rivalslab.gg/ | grep -i strict-transport`
- [ ] Verify [`public/_redirects`](./public/_redirects) is working: `curl -I https://rivalslab.gg/hero/hulk/` should 301 to `/heroes/hulk/`
- [ ] Disable Cloudflare's "Always Use HTTPS" rule (the `_headers` HSTS does it already)
- [ ] Enable Cloudflare Web Analytics (free, no JS overhead) — dashboard → Web Analytics → add site

### Cloudflare-specific files

| File | Purpose |
|---|---|
| [`public/_headers`](./public/_headers) | Security response headers (HSTS, XCTO, X-Frame, Permissions-Policy) + cache rules per path |
| [`public/_redirects`](./public/_redirects) | 301 redirects for singular URL forms (`/hero/<id>/` → `/heroes/<id>/`) — preserves link equity from inbound forum links |
| `.wrangler/` | Local wrangler state (gitignored). Created by `npx wrangler pages dev` for local CF-environment preview. |

## Monetization roadmap

Per the [`launch-game-tracker`](https://github.com/gaoshaosuhai/launch-game-tracker-skill) skill's `REVENUE.md` ladder. Hero shooter audience baseline = $3–6 RPM. Climb:

| Stage | Threshold | Action |
|---|---|---|
| 0 — Launch | day 0 | Ads disabled. Submit sitemap. Build affiliate buying-guide pages. |
| 1 — AdSense | 1k MAU | Set `ADSENSE_CLIENT` in `consts.ts`. |
| 2 — Mediavine Journey | 10k sessions/mo | Switch from AdSense to Mediavine. ~1.5–2× RPM lift. |
| 3 — Mediavine standard | 50k sessions/mo | Full Mediavine. Pursue direct hardware sponsorships. |
| 4 — Raptive | 100k pageviews/mo | Migrate to Raptive premium tier. |

Affiliate angles: gaming peripherals (Razer, Logitech, Amazon), gift cards, controllers, monitors. Build `/best-mouse-for-marvel-rivals/`-style buying guides at stage 1.

## Maintenance cadence

- Bump `LAST_REVIEWED` in changed data files on every patch
- Footer surfaces the OLDEST date — if it goes >60 days stale, hiatus banner on homepage
- New patch → update `patches.ts` + tier deltas in `team-ups.ts` / `heroes.ts` within 48 hours

## Trademarks

Marvel Rivals and all hero, ability, and map names are trademarks of NetEase Games and Marvel Games. RivalsLab is an independent fan tool, not affiliated with NetEase or Marvel.
