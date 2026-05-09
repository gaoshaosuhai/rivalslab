# Research Dossier: Marvel Rivals

Snapshot date: 2026-05-09. Game in mid-Season 7.5; **Season 8 launches 2026-05-15** (6 days from snapshot).

## Game profile

- **Name:** Marvel Rivals — NetEase Games + Marvel Games
- **Genre:** 6v6 hero shooter, third-person, free-to-play
- **Launch:** 2024-12-06 PC + console
- **Platforms:** PC (Steam), PS5, PS4 (added 2025-09-12), Xbox Series X/S. Switch 2 confirmed in development. **No mobile.** Crossplay + cross-progression.
- **Roster (May 2026):** 49 heroes — 12 Vanguards, 25 Duelists, 11 Strategists, 1 Multi-Role
- **Team-Ups (S7.5):** 24 active named synergies (anchor hero + 1–2 secondaries)
- **Maps:** ~24 total, 16 in active rotation, 14 in S7 competitive pool. Three modes: Domination, Convoy, Convergence.
- **Patch cadence:** 9-week seasons split X.0 (4 wk) + X.5 (5 wk). Bug-fix patches more frequent.
- **Roadmap (Path to Doomsday 2026):** S8 May 15 (Cyclops + Moon Girl & Devil Dinosaur teased) → June Avengers: Age of Ultron event → Aug Infinity War → Oct Endgame → Dec Avengers: Doomsday film tie-in
- **Monetization:** Cosmetic-only. Lattice premium currency ($9.99/1000). Battle Pass Luxury ~$10 (returns ~$6 net). No P2W.
- **Ranks:** 9 tiers / 23 sub-ranks (Bronze → Silver → Gold → Plat → Diamond → Grandmaster → Celestial → Eternity → One Above All). Hero bans unlock at Diamond III.

## Audience profile

| Metric | Value |
|---|---|
| Steam concurrent (30d avg) | ~69,710 |
| Steam concurrent (24h peak) | ~87,047 |
| All-time peak | 642,333 (Jan 2025) |
| Estimated PC DAU | 400k–700k |
| /r/marvelrivals subscribers | ~189k |
| Official Discord | ~4.29M (one of the largest gaming Discords) |
| Twitch avg viewers (YTD 2026) | ~20,887 |
| Region weighting | NA + EU primary; APAC dropped post-launch |
| Platform skew | PC + console roughly equal |

**Calibration:** Same audience class as Overwatch (~108k vs MR ~70k Steam concurrent). MR is a major hero shooter, well above the 20k DAU safety floor for SEO-driven monetization.

## Competitor analysis (gap matrix)

| Tool type | Top competitor | UX 1–5 | Freshness | Our differentiation angle |
|---|---|---|---|---|
| Counter picker | counterwatch.gg | 4 | Daily | Add Team-Up + Map layers as named entities, not opaque WR weights |
| Team-Up tier list | rivalsmeta.com /tier-list/team-ups | 3 | Daily | Anchor-hero-driven explorer with "complete the trio" suggestions |
| Team-Up encyclopedia | fandom.com /wiki/Team-Ups | 2 | Manual | Filterable cards, patch-history diff, mobile-first |
| Map-by-map hero picks | counterwatch.gg map stats | 3 | Daily | Standalone `/map/<slug>/` pages with role balance + Team-Up overlay |
| Team comps stats | rivalsmeta.com /team-comps | 3 | Daily | Add map filter + Team-Up overlay (no one combines these) |
| Stats tracker (UID) | tracker.gg | 4 | Live | **Skip** — saturated, requires API access |
| Generic tier list | mobalytics, marvelrivals.gg | 4 | Daily | **Skip as headline** — table stakes only, build as supporting page |

**Strongest competitor:** Counterwatch.gg has the most data-mature team builder (50/30/20 weighted on win-rate / counters / synergy, 277K matches). Our edge: making **named Team-Ups** a first-class entity that can be searched, linked, and explored, plus shareable SEO URLs (`/team-up/lucky-loan/`, `/map/tokyo-2099/`).

**UX gaps confirmed:** Fandom (slow LCP, ad reflow, intrusive video), tracker.gg + marvelrivals.gg (Cloudflare-gated heavy desktop dashboards). Mobile-first PWA is a real wedge — players make pick decisions on phones during queue.

## Keyword research

35+ real queries collected, bucketed:

### Hot evergreen (always-on volume)
- marvel rivals tier list / counters / counter picker
- marvel rivals best team up / team up tier list
- marvel rivals how to counter [hero] (×52 hero pages)
- marvel rivals beginner guide / which hero should i main
- marvel rivals best heroes for beginners

### Hot perpetual (high-volume utility)
- marvel rivals best dps / support / tank / solo carry
- marvel rivals best team comp solo queue
- marvel rivals 1-2-3 comp explained
- marvel rivals platinum to diamond / rank up tips
- marvel rivals stats tracker / leaderboard

### Hot seasonal (S8 surge incoming)
- marvel rivals best heroes season 8
- marvel rivals season 8 release date
- marvel rivals patch notes may 2026
- marvel rivals best dps season 7.5

### Long-tail niche (programmatic SEO multipliers)
- marvel rivals best heroes [map] (×~15 maps)
- marvel rivals [hero] best team up (×52 heroes)
- marvel rivals [team-up name] (×24 team-ups)
- marvel rivals which hero counters [hero] (×52 heroes)
- marvel rivals [hero] [team-up] combo (×many)

**SEO surface area:** 49 heroes × 24 team-ups × 15 maps = thousands of programmatic intersections. We need 90+ entity pages minimum (49 heroes + 24 team-ups + 15 maps + tools + utility = ~95 pages).

## Visual identity sampling

Sources: marvelrivals.com landing, "Art Vision Vol. 01: GUI" devdiary, Creative Bloq art-director interview, hero key art, ranked tier badges.

**Game's signature look:** Black + Energy Yellow with 2D-comic-meets-3D-render styling. Art director: "dynamic comic style" — bold primary colors, brushstroke energy, expressionist palette, East/West manhua + ACG influences. **Intentionally avoids gritty MCU realism**.

### Palette (sampled)

| Token | Hex | Role |
|---|---|---|
| `--accent` | `#FFD60A` | Energy Yellow — signature CTA |
| `--accent-strong` | `#E6B800` | Hover/active darker |
| `--accent-soft` | `#FFE873` | Soft yellow for chips |
| `--warn` | `#FF3B3B` | Comic-pow red |
| `--bg` | `#0B0B0F` | Fissure Black — deepest |
| `--bg-soft` | `#15161C` | Lifted surface |
| `--bg-card` | `#1F2129` | Card surface |
| `--fg` | `#F5F5F7` | Radiant White text |
| `--fg-muted` | `#A0A3AD` | Secondary text |
| `--fg-dim` | `#6B6E78` | Labels, captions |

Optional secondary accent `#7C3AED` (cosmic violet) for Strategist role tinting — used sparingly.

### Motif candidates

1. **Comic half-tone dot pattern** (Lichtenstein-style) — directly native to MR's "leap off the page" aesthetic. Subtle background texture.
2. **Angled diagonal panel cuts** — MR's UI uses sharp diagonal slashes between panels. Reads as comic-action layout.
3. **Hexagonal hero portrait frames** — used heavily on landing + team-up display. Reserve for portrait frames only (NOT background grid — that's MapleAhead's signature).

### Typography direction

- **Headline:** **Anton** or **Russo One** (Google Fonts) — condensed heavy sans, comic-poster impact, pairs with MR's all-caps UI. NO serifs.
- **Body:** **Inter** (Google Fonts).

### Voice direction

Knowledgeable Diamond-III peer explaining counter-picks over voice chat. Patch-aware, team-up-fluent, queue-anxious-aware. Not a wiki bot.

### Things to AVOID (vs prior projects)

| Prior site | Their signature | Conflict? |
|---|---|---|
| MapleAhead | Hex grid bg, amber + leaf-green + cherry-red, Noto Serif | **No** — yellow ≠ amber, no green/red, no serif, hexagons restricted to portrait frames only |
| Where Winds Meet | Jade-green + cinnabar + ink, brushstroke, EB Garamond | **No** — no green, no cinnabar, no brushstroke, no serif |

## Tool taxonomy decision

5 tools locked. Headline: Team-Up Synergy Explorer.

| # | Tool | Why this game needs it | Effort | SEO+Retention |
|---|---|---|---|---|
| 1 | **Team-Up Synergy Explorer** | Named in-game mechanic, no competitor has anchor-hero-driven explorer. Fandom owns "team ups" head term with awful UX — beatable. | M | 5 |
| 2 | **Map-Aware Hero Picker** (`/map/<slug>/`) | Players ask "best heroes for [map]"; only Counterwatch has it. Standalone URLs = SEO multiplier × 15 maps. | M | 5 |
| 3 | **Counter Picker with Team-Up overlay** | Table-stakes counter-pick UI but with our Team-Up layer as the differentiator. | M | 4 |
| 4 | **Hero pages** (`/hero/<slug>/`) — 49 pages | Programmatic SEO surface for "[hero] counters", "[hero] best team up", "[hero] guide". | S–M (auto from data) | 5 |
| 5 | **Patch-diff feed** | Each patch (bi-weekly to monthly) shows team-up tier deltas + map meta deltas. Recurrence driver. | S | 3 |

**Skipped:** UID stats tracker (saturated, requires data partnership), generic tier list as headline (table stakes; ship as `/tier-list/` supporting page).

## Layout decision

**Audience priority:** ranked-grinder + casual fan crossover, queue-anxious mobile use case → **mobile-first**, dense scannable layout (84rem max-width), above-the-fold = Team-Up Explorer card + 4-tool strip + S8 patch alert.

## Differentiation audit

What this site is NOT doing that our prior projects did:

- NOT using hex grid as background pattern — using comic half-tone + angled diagonal panels
- NOT using amber / jade-green / cinnabar — using electric yellow + comic-pow red on Fissure Black
- NOT using Noto Serif headlines — using Anton (condensed display sans), all-caps where appropriate
- NOT auto-including a "weekly tracker" — Marvel Rivals has no weekly resets; replaced with patch-diff feed
- NOT auto-including a patch forecaster — MR is single-region (no info-arbitrage); replaced with Team-Up Explorer as headline tool
- NOT building UID-based stats tracker — saturated, going discovery-first instead
- NOT defaulting to 72rem sparse layout — using 84rem dense scannable layout because FPS players scan fast
- NOT using `font-serif` class on logo / site name / h1s — sans-only

## Go / no-go verdict

| Axis (1–5) | Score | Note |
|---|---|---|
| Audience size | 5 | Same class as Overwatch, 4.29M Discord, 70k Steam concurrent |
| Search volume | 5 | Massive long-tail across heroes × team-ups × maps |
| Tool competition (lower = better) | 3 | Saturated for tier list / UID tracker; **open** for Team-Up Explorer, Map Picker, mobile-first |
| Info-edge sustainability | 3 | No region lead-time, but Team-Up + Map combo is structurally underserved + Counterwatch is moving on it |
| Revenue alignment | 4 | Hero shooter peripherals affiliate strong; ~$3–6 RPM tier; AdSense compliant |
| Update cost | 3 | 24 team-ups + 49 heroes manageable; bi-weekly patches |
| **Total** | **23/30** | Above 22 recommendation threshold |

**Decision: PROCEED to Phase 4 design.** Critical timing: Season 8 launches 2026-05-15 — ship Team-Up Explorer + Map Picker before/at S8 to capture day-1 traffic surge from new heroes.
