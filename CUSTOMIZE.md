# Customize

Phase 5–7 specifics for working from this template. Assumes you've completed Phase 1–4 (selection, research, design) and have a research dossier + design decisions locked.

## Palette swap

Edit `src/styles/global.css`. Replace the `--color-accent-*` and `--color-warn-*` tokens with your sampled values. The template ships with neutral greys so you must change these — don't ship a grey site.

```css
@theme {
  /* Sampled from <game> screenshots, key art, UI panels */
  --color-accent-300: #YOUR_LIGHT_HEX;
  --color-accent-400: #YOUR_PRIMARY_HEX;
  --color-accent-500: #YOUR_DARK_HEX;
  --color-warn-400:   #YOUR_WARN_HEX;
}
```

If your game's palette wants more than 3 hue families (e.g., a multi-faction game), add more `--color-<faction>-*` tokens. The site identity should still be dominated by ONE primary accent.

## Brand mark

Replace `public/favicon.svg` and `public/og-default.svg` with hand-drawn SVGs derived from the chosen game's motif. The template's placeholders are intentionally ugly to remind you to do this.

Tips:

- favicon: 64×64 viewBox; brand letter / monogram inside the chosen motif shape; rounded square background with the deep bg color
- OG image: 1200×630, your brand mark + site name + 3-line value prop + (optional) 3-4 stat counters
- Keep both in sync visually so social cards match the favicon

## Header navigation

Edit `src/components/Header.astro`. Set `NAV_ITEMS` to match your tool combination from Phase 4:

```ts
const navItems = [
  { href: '/forecaster/', label: 'Forecaster', hint: "What's coming" },
  { href: '/planner/', label: 'Planner', hint: 'Build planner' },
  { href: '/weekly/', label: 'Weekly', hint: 'ROI-ranked routine' },
];
```

Cap nav at 3–5 items. More than that → put secondary tools in a footer link list or a "More tools" homepage strip.

## Adding data files

Pattern (replicate per data file):

```ts
// src/data/<your-file>.ts

export const LAST_REVIEWED = '2026-XX-XX';

export interface YourEntity {
  id: string;
  // ...
}

export const YOUR_ENTITIES: YourEntity[] = [
  // ...
];
```

Then import `LAST_REVIEWED` into `Footer.astro`'s aggregation:

```ts
// src/components/Footer.astro
import { LAST_REVIEWED as YOUR_LAST } from '@/data/your-file';

function freshnessSignal(): string {
  const dates = [PATCHES_LAST, CODES_LAST, EVENTS_LAST, WEEKLY_LAST, YOUR_LAST].filter(Boolean);
  // ...
}
```

The footer will now show the OLDEST date across all data files — your project's freshness signal.

## Per-entity dynamic routes

The single highest-leverage SEO move. Pattern:

```astro
---
// src/pages/<entity>/[id].astro

import BaseLayout from '@/layouts/BaseLayout.astro';
import { ENTITIES, type Entity } from '@/data/entities';

export async function getStaticPaths() {
  return ENTITIES.map((e) => ({ params: { id: e.id }, props: { entity: e } }));
}

interface Props { entity: Entity; }
const { entity } = Astro.props;
---

<BaseLayout title={`${entity.name} — guide`} description={`...`}>
  <!-- per-entity hero, details, related entities -->
</BaseLayout>
```

This generates one HTML file per entity (e.g., 36 class pages, 30 boss pages, 13 region pages). Aim for 30+ entity pages total — that's where long-tail SEO lives.

## Interactive React islands

Use sparingly — only when state matters (filter, calc, drag-drop). Pattern:

```tsx
// src/components/islands/MyIsland.tsx
import { useState } from 'react';
export default function MyIsland() {
  const [n, setN] = useState(0);
  return <div>{n}</div>;
}
```

Then in a page:

```astro
---
import MyIsland from '@/components/islands/MyIsland.tsx';
---
<MyIsland client:load />     {/* immediate hydration */}
<MyIsland client:visible />  {/* hydrate when scrolled into view */}
```

Each island ships ~10–60kb gzipped. Don't add for purely static UI.

## /codes/, /events/, /reset/ utility pages

If your game has redemption codes:

1. Populate `src/data/codes.ts` with `ACTIVE_CODES` + `EXPIRED_CODES` + `REDEEM_STEPS`
2. Create `src/pages/codes.astro` that calls `getLiveCodes()` and `getArchivedCodes()` for sections
3. Add to nav

Same pattern for events and reset timer. The data files already provide auto-filter helpers (`eventsRunningOn(now)`, etc.).

If your game lacks codes / events / weekly resets, just **delete** the data file + remove the `LAST_REVIEWED` import in Footer. Don't keep dead schemas.

## AdSense + Plausible

When eligible (see `REVENUE.md` in the skill):

1. AdSense: set `ADSENSE_CLIENT = 'ca-pub-XXXX'` in `src/consts.ts`. Each `<AdSlot />` placeholder activates when given a real `slot="<id>"` prop.
2. Plausible: set `PLAUSIBLE_DOMAIN = 'your-domain.gg'` in `src/consts.ts`. Script auto-loads.
3. Cloudflare Web Analytics: enable in Cloudflare dashboard for your Pages project — no code change needed.

## Custom domain

After domain registration:

1. Cloudflare dashboard → Workers & Pages → your project → Custom domains → Add
2. Update `src/consts.ts` → `SITE_URL = 'https://your-domain.gg'`
3. Update `public/robots.txt` sitemap line if needed
4. `git push` → auto-deploys with corrected canonical URLs

## Common gotchas

- **Importing a deleted data file in Footer.astro** — TypeScript will fail the build. Remove the corresponding `LAST_REVIEWED` import.
- **Hardcoded grey palette in custom components** — if you copy components from elsewhere, audit hex values. Stick to `var(--accent)` / `var(--fg)` / etc.
- **Forgetting to set `CF_PROJECT_NAME`** in `.github/workflows/deploy.yml` — auto-deploy fails with "project not found". Edit the env var.
- **Skipping `bin/init.sh`** — the consts.ts placeholders propagate to OG cards, sitemap, footer. Always run init before first push.

## Going further

For long-form SEO content, add MDX articles in `src/pages/guides/`:

```
src/pages/guides/
├── best-<class>-build-2026.mdx
├── how-to-clear-<boss>-at-low-stat.mdx
└── ...
```

Don't lead with guides. Tools first; guides as supplementary long-tail.

For a `/news/` aggregator, build a small data file `news.ts` with patch-summary entries and a page that lists them in reverse-chronological order. Each entry can link to its source patch notes plus your data-file change summary.
