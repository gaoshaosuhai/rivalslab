# Maintenance playbook — RivalsLab

Goal: keep the site looking alive without burning weekends. The footer's `Data reviewed: YYYY-MM-DD` is your reputation — it should never be more than 60 days stale.

## Cadence at a glance

| Cadence | Trigger | Time |
|---|---|---|
| **Per-patch** | New X.0 or X.5 patch ships (~every 4–5 weeks) | 30–60 min |
| **Bug-fix patches** | Mid-season hotfix drops | 5–10 min |
| **Per-event start** | New Path-to-Doomsday arc beat begins | 10–15 min |
| **Bi-weekly skim** | Routine | 5 min |
| **Quarterly review** | Calendar reminder | ~30 min |
| **Yearly housekeeping** | Calendar reminder | ~1 h |

A monthly GitHub Action issue ([`.github/workflows/maintenance-reminder.yml`](.github/workflows/maintenance-reminder.yml)) auto-opens an issue on the 1st of each month with the checklist below.

The 2026 Path-to-Doomsday arc ships in 4 confirmed event windows: **Jun (Age of Ultron) · Aug (Infinity War) · Oct (Endgame) · Dec (Avengers: Doomsday film tie-in)**. Each lands inside a specific season; expect at minimum a content bump per quarter even if no patch shipped.

---

## Per-patch (the big one) — 30–60 min

Marvel Rivals patches drop in two flavors: **X.0** (start of season, new hero + Battle Pass + sometimes new map) and **X.5** (mid-season, 1 hero + Team-Up shifts + balance). Bug-fix patches are smaller and covered separately below.

Do this within 24 h of the patch dropping — fresh data is the SEO compounding asset.

### Steps

1. **`src/consts.ts`** — bump the snapshot constants:
   ```ts
   export const SOURCE_VERSION = 'NNNNNNNN';   // patch yyyymmdd id from NetEase bulletin
   export const TARGET_VERSION = 'NNNNNNNN';   // next confirmed/teased patch
   export const TARGET_VERSION_NAME = 'Season N';  // codename
   export const SNAPSHOT_DATE = 'yyyy-mm-dd';      // today
   ```

2. **`src/data/patches.ts`**
   - If a TARGET_PATCH just shipped, prepend it to `TARGET_PATCHES` with the actual NetEase bulletin URL (`marvelrivals.com/gameupdate/<id>/...`).
   - Update the `UPCOMING` array with the next confirmed patch (community leaks ok at `Medium` confidence; trailer-confirmed = `High`).
   - Bump `LAST_REVIEWED`.

3. **`src/data/heroes.ts`**
   - If a new hero shipped: add full entry (id slug, role, difficulty, signature, blurb, tier, introduced).
   - For the **48 hours after a new hero drops** all reads are noisy; default tier to `A` until rivalsmeta.com data settles, then refine on day 5.
   - Apply tier shifts for any heroes touched by balance pass.
   - Bump `LAST_REVIEWED`.

4. **`src/data/team-ups.ts`**
   - If new Team-Ups shipped: add entries (id slug, anchor, secondaries, ability, blurb, tier, introduced, bestMaps).
   - **Critical:** if any Team-Ups were deactivated, REMOVE them. Do not leave dead entries — running stale Team-Up data is the fastest credibility kill on /r/marvelrivals.
   - Cross-check against [marvelrivals.gg/team-ups/](https://marvelrivals.gg/team-ups/) and [Beebom's roster](https://beebom.com/marvel-rivals-team-ups/).
   - Bump `LAST_REVIEWED`.

5. **`src/data/maps.ts`**
   - Only touch if a new map landed OR competitive map pool rotated.
   - Bump `LAST_REVIEWED` even if no map changed (consistency signal).

6. **`src/data/events.ts`**
   - Add new active events with announced start/end dates.
   - Old ones auto-filter via `eventsRunningOn()`. Optional: prune events whose `endsAt` is more than 60 days past.
   - Bump `LAST_REVIEWED`.

7. **`src/pages/guides/season-N-meta.astro`** (rotating)
   - The `season-8-meta.astro` will rot post-launch. **Don't delete it** — rename to `season-N-retro.astro` and write a new `season-N+1-meta.astro` for the next forecast.
   - Keeps both URLs alive for SEO long-tail of "season N retro" / "season N+1 meta".

8. **`src/pages/guides/getting-started.astro`** + **`best-heroes-by-rank.astro`**
   - Skim for stale references. Update if a hero changed role (e.g. Multi-Role expansions) or a Team-Up was removed/added.

9. **Build + verify**
   ```bash
   npm run build         # 0 errors expected
   npm run dev           # spot-check homepage + /team-ups/ + /season/
   ```

10. **Data integrity check** (the cross-reference audit)
    ```bash
    cat <<'NODE' | node --experimental-strip-types --no-warnings
    import { HEROES } from './src/data/heroes.ts';
    import { TEAM_UPS } from './src/data/team-ups.ts';
    import { MAPS } from './src/data/maps.ts';
    const heroIds = new Set(HEROES.map(h => h.id));
    const mapIds = new Set(MAPS.map(m => m.id));
    const errors = [];
    for (const tu of TEAM_UPS) {
      if (!heroIds.has(tu.anchor)) errors.push(`tu "${tu.id}" anchor "${tu.anchor}" missing`);
      tu.secondaries.forEach(s => !heroIds.has(s) && errors.push(`tu "${tu.id}" sec "${s}" missing`));
      (tu.bestMaps ?? []).forEach(m => !mapIds.has(m) && errors.push(`tu "${tu.id}" map "${m}" missing`));
    }
    MAPS.forEach(m => m.topHeroes.forEach(h => !heroIds.has(h) && errors.push(`map "${m.id}" hero "${h}" missing`)));
    if (errors.length === 0) console.log(`✅ OK — ${HEROES.length} heroes, ${TEAM_UPS.length} team-ups, ${MAPS.length} maps`);
    else { console.log(`❌ ${errors.length} errors`); errors.forEach(e => console.log('  ', e)); process.exit(1); }
    NODE
    ```

11. **Commit + push**
    ```bash
    git add -A
    git commit -m "patch <version> — <codename>"
    git push
    ```
    Cloudflare Pages auto-deploys in ~60 s (whether via GitHub Actions or CF git integration — see [README.md](./README.md) Deployment).

12. **Search Console resubmit** (only if a major page tier was added — e.g. new tool, new map, multiple new heroes):
    Search Console → Sitemaps → resubmit `https://rivalslab.gg/sitemap-index.xml`.

---

## Bug-fix patches — 5–10 min

NetEase ships bug-fix patches between X.0 / X.5 drops (typically one mid-season). Most don't change tier or content materially. Quick pass:

1. Prepend the bug-fix entry to `TARGET_PATCHES` in `src/data/patches.ts` with NetEase bulletin URL.
2. Bump `LAST_REVIEWED` on `patches.ts`.
3. If any hero kit was changed (rare in bug-fix patches), update that hero's blurb in `heroes.ts`.
4. Build + commit + push.

---

## Per-event start (Path to Doomsday) — 10–15 min

Confirmed 2026 event windows:

| Window | Event | Action |
|---|---|---|
| ~Jun 12, 2026 | Avengers: Age of Ultron tie-in | Promote `events.ts` entry to "running"; surface on homepage via ActiveEvents |
| ~Aug, 2026 | Infinity War tie-in | Add new `events.ts` entry with confirmed dates; mention in active patch entry |
| ~Oct, 2026 | Endgame tie-in | Same |
| ~Dec, 2026 | Doomsday film tie-in | Same; biggest one — write a `/guides/doomsday-event-walkthrough.astro` |

For each event start:
1. Confirm dates from NetEase devdiary or PCGamer 2026 plans coverage.
2. Add event to `ACTIVE_EVENTS` in `src/data/events.ts`. Use real start/end dates.
3. The homepage's `<ActiveEvents />` component picks up running events automatically.
4. Bump `LAST_REVIEWED` on `events.ts`.
5. Optional: write a short event-specific guide if rewards are notable.

---

## Bi-weekly skim — 5 min

Light pass to keep `LAST_REVIEWED` fresh:

1. Read [Marvel Rivals' news feed](https://www.marvelrivals.com/news) for any micro-patches you missed.
2. Read top 5 posts on /r/marvelrivals from past 14 days. If a recurring complaint about a hero balance shifted consensus, retune that hero's tier.
3. Even if nothing changed, **bump `LAST_REVIEWED` on at least one data file every 30 days** so the footer's freshness signal doesn't go stale.
4. Commit + push.

---

## Quarterly review — ~30 min

Once per season (~every 9 weeks aligns):

- Re-skim **rivalsmeta.com tier list** and **Mobalytics**. If their consensus shifted by ≥1 tier on multiple heroes, retune ours.
- Test **every interactive tool**:
  - `/team-ups/` filter island — anchor / role / tier filters all functional?
  - `/heroes/`, `/maps/`, `/team-ups/` index pages render with HeroGlyph correctly?
  - `/season/` SeasonCountdown — live ticker counts down properly?
  - CookieBanner appears on first visit, dismisses, doesn't re-appear?
- Open dev console on every tool page. Zero JS errors expected.
- **Lighthouse** check on homepage (Chrome DevTools). Aim ≥ 95 perf, ≥ 95 SEO. Don't chase 100; diminishing returns.
- Re-skim `/guides/*` for stale specifics. The S8 meta forecast will rot fast — rotate it.

---

## Yearly housekeeping — ~1 h

- Review `src/pages/about.astro` and `privacy.astro` for accuracy. Update if you added analytics, ads, or affiliate links.
- Refresh `/guides/getting-started/` — game has shifted enough in 12 months that early-game advice is different.
- Re-evaluate domain renewal, Cloudflare Pages plan, AdSense / Mediavine eligibility per [REVENUE.md ladder](https://github.com/gaoshaosuhai/launch-game-tracker-skill).
- Audit external dependencies in `package.json`. Run `npm outdated`; bump majors that don't break.
- Verify `LAST_REVIEWED` aggregation in `Footer.astro` includes every active data file.

---

## "Is this site still maintained?"

The answer is in the footer: **`Data reviewed: YYYY-MM-DD`**. Make sure that timestamp is never more than 60 days stale. If it is, either:

- Bump `LAST_REVIEWED` on the data file you actually verified, **or**
- Add a hiatus banner to the homepage stating you're paused

Lying to readers about freshness is worse than an honest hiatus banner.

---

## Adding things to this playbook

- **New page** → add to footer + sitemap is auto.
- **New data file** → add a `LAST_REVIEWED` constant + import in `Footer.astro`'s aggregation function.
- **New external content source** (e.g. you start using a different tier-list mirror) → mention in `/about/` so readers can verify your sourcing.
- **New tool / island** → add to `Header.astro` nav and homepage 4-tool strip.
