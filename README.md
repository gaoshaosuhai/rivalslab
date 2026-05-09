# game-tracker-template

Plumbing-only starter for solo + AI-assisted game tool sites that earn ad revenue from organic search traffic. Used by the [`launch-game-tracker`](https://github.com/gaoshaosuhai/launch-game-tracker-skill) Claude skill.

## What this template is

A **minimal Astro 5 + Tailwind 4 + React 19** scaffold that gives you:

- Build infrastructure (zero-config dev / preview / build / typecheck scripts)
- SEO basics (sitemap, RSS, OG tags, JSON-LD, robots.txt)
- AdSense / Plausible feature-flag plumbing
- Privacy + Terms + 404 page templates
- LAST_REVIEWED freshness signal pattern (each data file declares its own; footer aggregates)
- GitHub Actions workflows for auto-deploy + monthly maintenance reminders
- A single placeholder homepage + neutral palette so the project compiles end-to-end on day one

## What this template is NOT

By design, this template does **not** ship with:

- A specific palette
- A specific motif / decoration pattern
- Game-specific tool islands (planners, calculators, pickers)
- Per-entity dynamic routes
- Sample data populated for any specific game
- A "ready-made" site you fork and rename

Each new project's **visual identity, tool combination, and content layout must be designed fresh** from the chosen game's research dossier. See the [`launch-game-tracker`](#related) skill for the full doctrine and step-by-step methodology.

## Quick start

```bash
# Create a new project from this template
gh repo create my-tracker --public --template gaoshaosuhai/game-tracker-template --clone
cd my-tracker

# Install + customize
npm install
bin/init.sh  # interactive — fills consts.ts and global.css palette

# Verify
npm run build  # zero errors expected
npm run dev    # http://localhost:4321
```

## Project layout

```
.
├── astro.config.mjs           # Astro + Tailwind + sitemap + react integrations
├── tsconfig.json              # @/* path alias + strict mode
├── package.json
├── bin/init.sh                # interactive customization script
├── public/
│   ├── favicon.svg            # PLACEHOLDER — replace during DESIGN.md phase
│   ├── og-default.svg         # PLACEHOLDER — replace during DESIGN.md phase
│   └── robots.txt
├── src/
│   ├── consts.ts              # site identity + game-state snapshot + feature flags
│   ├── styles/global.css      # PLACEHOLDER palette (neutral grey) — replace during init
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── BaseHead.astro     # SEO meta, OG, JSON-LD, AdSense/Plausible loading
│   │   ├── Header.astro       # nav (TODO: customize NAV_ITEMS for your tools)
│   │   ├── Footer.astro       # LAST_REVIEWED aggregation + contact + legal links
│   │   └── AdSlot.astro       # AdSense feature-flagged ad slot
│   ├── data/                  # data files — populate during BUILD phase
│   │   ├── patches.ts         # source/target/forecast schema
│   │   ├── codes.ts           # redemption codes with auto-expire
│   │   ├── events.ts          # active events with auto-filter
│   │   └── weekly-tasks.ts    # ROI-ranked routine
│   └── pages/
│       ├── index.astro        # PLACEHOLDER — replace during DESIGN
│       ├── about.astro        # template w/ TODO comments
│       ├── privacy.astro      # AdSense-ready privacy template
│       ├── terms.astro        # legal terms template
│       ├── 404.astro
│       └── rss.xml.ts         # minimal RSS scaffold
└── .github/workflows/
    ├── deploy.yml             # auto-deploy to Cloudflare Pages on push
    └── maintenance-reminder.yml  # monthly issue with checklist
```

## Required Cloudflare setup

Before `git push` triggers an auto-deploy:

1. Create a Cloudflare Pages project: `npx wrangler pages project create <name> --production-branch=main`
2. Set the project name in `.github/workflows/deploy.yml` (replace `TODO-set-project-name`)
3. Set GitHub Actions secrets:
   ```bash
   echo "<account-id>" | gh secret set CLOUDFLARE_ACCOUNT_ID --repo <user>/<repo>
   printf "%s" "<api-token>" | gh secret set CLOUDFLARE_API_TOKEN --repo <user>/<repo>
   ```
   Token created at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) using the "Cloudflare Pages — Edit" template.

## Recommended workflow

This template assumes you're following the [`launch-game-tracker`](https://github.com/gaoshaosuhai/launch-game-tracker-skill) doctrine. Briefly:

1. **Phase 1–2: Selection** — Pick a game using the 10 opportunity vectors + revenue scoring rubric.
2. **Phase 3: Deep research** — Produce a research dossier covering audience, competitors, search keywords, visual identity sampling, tool taxonomy.
3. **Phase 4: Differentiated design** — Lock palette, motif, typography, voice, tool combination. Run a differentiation audit against any prior projects.
4. **Phase 5: Scaffold** — `gh repo create --template`, run `bin/init.sh`.
5. **Phase 6: Data layer** — Populate `src/data/` with real game data.
6. **Phase 7: Pages + islands** — Build bespoke pages + per-entity dynamic routes.
7. **Phase 8: Monetization plumbing** — Customize privacy.astro, terms.astro for the project; add real CONTACT_EMAIL.
8. **Phase 9: Deploy + SEO push** — Cloudflare Pages, sitemap submission, subreddit/Discord cross-links.

See `CUSTOMIZE.md` in this repo for the deep-dive on Phase 5 specifics.

## Anti-patterns to avoid

The skill's doctrine forbids these. The template ships in a state that makes them HARD to do accidentally, but you can still cheat:

- ❌ Don't reuse a previous project's palette, motif, or font pairing
- ❌ Don't auto-include "patch tracker + planner + weekly checklist" if the game doesn't fit the pattern
- ❌ Don't skip Phase 3 (deep research) just because you're confident
- ❌ Don't apply for AdSense before > 1k organic visitors / month + > 50 indexed pages
- ❌ Don't enable ads on a sub-100-page site — Google rejects + delays re-review

See the skill's `SKILL.md` for the full doctrine.

## Customization

See [`CUSTOMIZE.md`](./CUSTOMIZE.md) for:

- How to swap the palette
- How to add data file schemas
- How to add per-entity dynamic routes
- How to plug in interactive React islands
- How to add `/codes/`, `/events/`, `/reset/` utility pages
- How to enable AdSense / Plausible
- How to onboard a custom domain

## Related

- [`launch-game-tracker`](https://github.com/gaoshaosuhai/launch-game-tracker-skill) — Claude skill that drives the whole pipeline (selection → research → design → build → deploy → operate)
- Case studies: `gaoshaosuhai/where-winds-meet-tool-plan`, `gaoshaosuhai/maple-ahead`

## License

MIT for the template scaffolding code itself. Game-related trademarks (when you populate this for a specific game) belong to their respective publishers.
