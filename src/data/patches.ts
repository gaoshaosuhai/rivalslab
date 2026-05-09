// Marvel Rivals patch + content registry.
// Single-region game (Global), so we use TARGET_PATCHES as a single timeline.
// Last 4–6 patches are surfaced; older entries can stay here indefinitely.

export const LAST_REVIEWED = '2026-05-09';

export type ContentTag =
  | 'season'
  | 'hero'
  | 'team-up'
  | 'map'
  | 'mode'
  | 'balance'
  | 'bug-fix'
  | 'cosmetic'
  | 'event';

export interface ContentItem {
  name: string;
  tags: ContentTag[];
  blurb: string;
  /** What players should plan around — hero learning, team-up shifts, map prep. */
  prepHint?: string;
}

export interface Patch {
  /** NetEase patch id (yyyymmdd format) — matches their public bulletin url slug. */
  version: string;
  /** Human-friendly codename, e.g. "Season 7.5 — Lucky Loan". */
  codename?: string;
  /** ISO yyyy-mm-dd. */
  date: string;
  /** Source = (would be) lead region; for MR this stays 'target' since single-region. */
  region: 'target';
  /** Higher-level season this patch belongs to (S7.5, S8, etc.). */
  season: string;
  highlights: ContentItem[];
  /** Link to the official NetEase bulletin if the patch has one. */
  sourceUrl?: string;
}

/** Patches confirmed shipped on the Global server, newest first. */
export const TARGET_PATCHES: Patch[] = [
  {
    version: '20260507',
    codename: 'Season 7.5 — Mid-season patch',
    date: '2026-05-07',
    region: 'target',
    season: 'S7.5',
    sourceUrl: 'https://www.marvelrivals.com/gameupdate/20260506/41548_1299168.html',
    highlights: [
      {
        name: 'Black Cat — Tablet of Destinies fix',
        tags: ['hero', 'bug-fix'],
        blurb: 'Tablet of Destinies could be cast inside spawn rooms — closed.',
      },
      {
        name: 'Slow-fall + knockdown animation patch',
        tags: ['bug-fix'],
        blurb: 'Animation desync on slow-fall / knockdown corrected.',
      },
      {
        name: 'Klyntar map portal bug',
        tags: ['map', 'bug-fix'],
        blurb: 'Symbiotic Surface portal could be entered out-of-bounds — closed.',
      },
      {
        name: 'Winter Soldier "Starlit Gunslinger" bundle',
        tags: ['cosmetic'],
        blurb: 'Cosmetic-only premium bundle.',
      },
      {
        name: 'Venom "War of The Realms" bundle',
        tags: ['cosmetic'],
        blurb: 'Cosmetic-only premium bundle.',
      },
    ],
  },
  {
    version: '20260417',
    codename: 'Season 7.5 launch — Lucky Loan',
    date: '2026-04-17',
    region: 'target',
    season: 'S7.5',
    sourceUrl: 'https://www.marvelrivals.com/gameupdate/20260415/41548_1296163.html',
    highlights: [
      {
        name: 'New Team-Up: Lucky Loan',
        tags: ['team-up', 'season'],
        blurb: 'Black Cat (anchor) + White Fox + Captain America. Radius heal + reflective shield.',
        prepHint: 'Pairs with double-Strategist comps; learn the cone for the reflective shield before ranked.',
      },
      {
        name: 'Map pool rotation',
        tags: ['map', 'mode'],
        blurb: 'Resource Rumble removed; competitive pool rebalanced to 14 maps.',
      },
      {
        name: 'Battle Pass: Lucky Loan',
        tags: ['cosmetic', 'season'],
        blurb: 'New 9-week Battle Pass with Black Cat-themed cosmetics.',
      },
    ],
  },
];

export interface UpcomingPatchEntry {
  /** Predicted target version label, e.g., "S8" or "20260515". */
  targetVersion: string;
  codename: string;
  windowStart: string; // ISO yyyy-mm-dd
  windowEnd: string;
  confidence: 'High' | 'Medium' | 'Low';
  highlights: ContentItem[];
  prepRecap: string[];
}

/** Patches teased / confirmed but not yet shipped. */
export const UPCOMING: UpcomingPatchEntry[] = [
  {
    targetVersion: 'S8',
    codename: 'Season 8 — Path to Doomsday begins',
    windowStart: '2026-05-15',
    windowEnd: '2026-05-15',
    confidence: 'High',
    highlights: [
      {
        name: 'New hero: Cyclops (teased)',
        tags: ['hero', 'season'],
        blurb: 'Optic-blast Duelist confirmed in S8 trailer.',
        prepHint: 'Learn his counters early — first 48h after a hero drops, every match has one.',
      },
      {
        name: 'New duo: Moon Girl & Devil Dinosaur (teased)',
        tags: ['hero', 'season'],
        blurb: 'Pair-controlled Duelist/Vanguard hybrid teased.',
      },
      {
        name: 'Path to Doomsday seasonal arc',
        tags: ['event', 'season'],
        blurb: 'June Avengers: Age of Ultron event → Aug Infinity War → Oct Endgame → Dec Doomsday tie-in.',
      },
    ],
    prepRecap: [
      'Stash Lattice for the S8 Battle Pass before May 15.',
      'Bank Chrono Tokens — they reset season-to-season.',
      'Expect 9 sub-rank drop on May 15. Plan placement matches around Cyclops counters.',
    ],
  },
];

export function highlightedTags(items: ContentItem[]): ContentTag[] {
  return Array.from(new Set(items.flatMap((i) => i.tags)));
}

export function latestPatch(): Patch | undefined {
  return TARGET_PATCHES[0];
}

export function patchesBySeasonReverse(): Patch[] {
  return [...TARGET_PATCHES].sort((a, b) => b.date.localeCompare(a.date));
}
