# Design: RivalsLab (Marvel Rivals tool site)

Locked from RESEARCH_DOSSIER.md on 2026-05-09. Identity baked into 70+ pages — late changes are expensive.

## Brand

- **Name:** RivalsLab
- **Domain:** rivalslab.gg (working — register before launch)
- **Tagline:** Team-Up explorer + map-aware picks for Marvel Rivals.
- **Description:** Discover the team-ups that win matches and the heroes that win maps. Built for Diamond-III queue brain.
- **Voice direction:** Knowledgeable Diamond-III peer, patch-aware, team-up-fluent, queue-anxious-aware, mobile-second-screen reader.

### Voice examples (3 example headlines)

1. "Storm pairs with Thor for Voltaic Union — but only on Convoy. Here's why."
2. "S8 dropped Cyclops. Three Team-Ups just shifted tier. Here's the diff."
3. "Tokyo 2099 punishes solo-tank picks. Run double-Vanguard or pivot Strategist."

## Visual identity

### Palette (locked)

```css
/* Sampled from marvelrivals.com landing + Art Vision GUI devdiary + ranked tier badges */
--color-panel-50:  #F5F5F7;  /* Radiant White — primary text */
--color-panel-100: #E5E6EA;
--color-panel-200: #C4C6CD;
--color-panel-300: #A0A3AD;  /* secondary text */
--color-panel-400: #6B6E78;  /* labels */
--color-panel-500: #41444C;
--color-panel-600: #2A2C34;
--color-panel-700: #1F2129;  /* card surface */
--color-panel-800: #15161C;  /* lifted bg */
--color-panel-900: #0B0B0F;  /* Fissure Black — deepest */

--color-accent-300: #FFE873;  /* soft yellow for chips */
--color-accent-400: #FFD60A;  /* Energy Yellow — primary signature */
--color-accent-500: #E6B800;  /* hover/active darker */
--color-accent-600: #B38F00;

--color-warn-400:   #FF3B3B;  /* comic-pow red */
--color-warn-500:   #D62828;
--color-warn-600:   #A11212;

--color-cosmic-400: #7C3AED;  /* optional Strategist accent — use sparingly */
```

Token name change vs template: `--color-ink-*` → `--color-panel-*` (comic panel reference, not WWM/MapleAhead "ink" lineage).

### Typography (locked)

```css
--font-display: 'Anton', 'Russo One', 'Bebas Neue', 'Impact', sans-serif;
--font-sans:    'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--font-mono:    ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace;
```

- **Headline (h1, h2, brand mark):** Anton — condensed heavy sans, comic-poster impact. ALL-CAPS for major headlines, regular case for body h2/h3.
- **Body:** Inter — neutral, scannable.
- **NO `font-serif` anywhere.** Footer + Header + Index + page templates rewritten to use `font-display`.

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap`

### Motif (locked: comic half-tone + angled panel)

**Primary motif: Half-tone dot pattern**
- Subtle full-page background texture (4–6% opacity, repeating)
- Implemented as inline SVG `<pattern>` referenced in CSS

**Secondary motif: Angled diagonal panel cuts**
- Card corners, hero section dividers, tool-strip dividers
- 12° slash, decorative but consistent
- Implemented via `clip-path: polygon(...)` on cards

**Tertiary: Hexagonal hero portrait frames** (RESTRICTED USE)
- Only on hero portraits / team-up cards (single-element use)
- Never as background pattern (that's MapleAhead's signature)

**Brand mark:** Lightning-bolt-meets-half-tone glyph in a yellow-on-black square. Favicon redrawn from scratch.

## Layout decisions

- **Density:** Dense scannable. Max-width `84rem` (instead of template default `72rem`). FPS players scan, not read.
- **Mobile-first:** Tool cards stack early, sticky bottom CTA on mobile, ≥48px tap targets, table → card-list view at narrow widths.
- **Above-the-fold (homepage):** Season 8 alert chip → Team-Up Explorer hero card (the headline tool) → 4-tool strip (Map Picker, Counter Picker, Heroes, Patch Diff) → "Recently shifted Team-Ups" feature card

## Tool combination (locked from dossier)

### 1. Team-Up Synergy Explorer — `/team-ups/`

- **Pain:** "I'm playing X — what Team-Up activates with whom, on which maps does it work?"
- **Layout:** Sticky filter bar (anchor hero / role / map / patch) + grid of Team-Up cards. Click card → detail page with anchor + secondaries + ability description + tier delta + best maps.
- **Interactive:** React island for filtering. URL state preserves filters (sharable).
- **Multipliers:** 24 detail pages at `/team-ups/<slug>/`.
- **Persistence:** URL query string. No localStorage needed.

### 2. Map-Aware Hero Picker — `/maps/` + `/map/<slug>/`

- **Pain:** "What heroes are best on [map]?"
- **Layout:** Map index page → per-map page with mode badge, role-balanced 6-stack recommendation, Team-Up suggestions for that map, common counters.
- **Interactive:** Static (data-driven). Per-map pages are pre-rendered for max SEO.
- **Multipliers:** 15 map pages at `/map/<slug>/`.

### 3. Counter Picker with Team-Up overlay — `/counter/`

- **Pain:** "X is dominating my game — what counters X?"
- **Layout:** Hero × hero matrix; click counter → side panel shows counter heroes + Team-Up that breaks the matchup.
- **Interactive:** React island for filtering by role. Hover/click reveals Team-Up overlay.
- **Persistence:** URL state.

### 4. Hero pages — `/hero/<slug>/`

- **Pain:** "Should I main X? What's their kit, who counters them, what Team-Ups suit them?"
- **Layout:** Hero hero (portrait + role + cosmic accent), abilities summary, "best Team-Ups featuring this hero", "counters / countered by", "best maps".
- **Static.** 49 pages auto-generated from `heroes.ts` data file.

### 5. Patch-diff feed — `/patches/`

- **Pain:** "What changed in S8? What Team-Ups got better/worse?"
- **Layout:** Reverse-chronological feed of patch entries. Each entry: date, version, Team-Up tier deltas, hero deltas, map deltas, link to publisher source.
- **Static.** Drives recurring traffic + freshness signal.

### Supporting pages (Tier C utility)

- `/tier-list/` — current top-level hero tier list (table stakes; supporting, not headline)
- `/about/` `/privacy/` `/terms/` `/404/` `/rss.xml`

### Skipped (do NOT build)

- UID-based stats tracker — saturated, requires data partnership
- `/codes/` — Marvel Rivals doesn't have promo codes (delete `codes.ts` data file)
- `/weekly-tasks/` — no weekly resets in MR (delete `weekly-tasks.ts`)
- `/events/` — events are tracked through patch feed; defer separate `events.ts` until V2

## Page taxonomy summary

| Tier | Pages | Count |
|---|---|---|
| A — Tools | Homepage + 5 tool pages | 6 |
| B — Multipliers | 49 hero + 24 team-up + 15 map + N patch entries | ~90+ |
| C — Utility | Tier list, RSS | 2 |
| D — Compliance | About, Privacy, Terms, 404 | 4 |
| **Total at launch** | | **~100+** |

This clears the AdSense "sufficient content" bar (>50 pages, >100 ideal) on day 1.

## Differentiation audit

vs. MapleAhead and Where Winds Meet:

- ✅ NOT hex grid background — using half-tone + angled panels
- ✅ NOT amber / jade / cinnabar palette — Energy Yellow #FFD60A + Fissure Black + comic-red
- ✅ NOT `font-serif` headlines — Anton condensed display sans
- ✅ NOT auto-including weekly tracker — patch-diff feed instead (no weeklies in MR)
- ✅ NOT auto-including patch forecaster — Team-Up Explorer is the headline (no info-arbitrage available)
- ✅ NOT 72rem sparse layout — 84rem dense scannable
- ✅ NOT `--color-ink-*` token names — using `--color-panel-*` (comic panel idiom)
- ✅ NOT defaulting `font-serif` on `Footer.astro` site name + `Header.astro` brand mark — rewrites use `font-display`

## Phase 5+ checklist

- [x] Project copied from template to `/marvel-rivals-tracker/`
- [x] Fresh git init
- [x] `npm install`
- [ ] Update `src/consts.ts` — site identity (skipping interactive `bin/init.sh`, hand-editing for precision)
- [ ] Update `src/styles/global.css` — palette + typography swap
- [ ] Update `src/components/BaseHead.astro` — Google Fonts link, theme-color
- [ ] Update `src/components/Header.astro` — brand mark, `font-display`, real nav
- [ ] Update `src/components/Footer.astro` — `font-display` on site name
- [ ] Replace `public/favicon.svg` and `public/og-default.svg`
- [ ] Replace `src/pages/index.astro` — homepage matched to ranked grinder priority
- [ ] Delete `src/data/codes.ts`, `weekly-tasks.ts` and remove imports from `Footer.astro`
- [ ] Build `src/data/heroes.ts`, `team-ups.ts`, `maps.ts`, `patches.ts` (rename from existing)
- [ ] Add per-entity dynamic routes
- [ ] Build interactive islands (Team-Up filter, counter matrix)
- [ ] Verify `npm run build` clean before deploy
