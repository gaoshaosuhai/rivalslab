// Marvel Rivals — hero registry.
//
// V1 dataset: 33 launch-roster + early-season heroes the agent research and
// public sources confirm. The full S7.5 roster reaches 49 (12 V / 25 D / 11 S /
// 1 Multi-Role) — the remaining ~16 require a verification pass against
// marvelrivals.com/heroes before the next maintenance bump.

export const LAST_REVIEWED = '2026-05-09';

export type Role = 'Vanguard' | 'Duelist' | 'Strategist' | 'Multi-Role';

export interface Hero {
  /** url-slug. */
  id: string;
  name: string;
  role: Role;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** One-line meta blurb — patch-aware, written in site voice. */
  blurb: string;
  /** Iconic ability or kit hook. */
  signature: string;
  /** Rough current public meta tier. Refine from rivalsmeta.com data. */
  tier: 'S' | 'A' | 'B' | 'C';
  /** Season when introduced. */
  introduced: string;
}

export const HEROES: Hero[] = [
  // Vanguards (launch roster confirmed)
  {
    id: 'captain-america',
    name: 'Captain America',
    role: 'Vanguard',
    difficulty: 'Easy',
    blurb: 'Frontline shield with mobility — anchors dive comps and breaks Hela backlines via Voltaic Union.',
    signature: 'Living Legend (shield throw)',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'doctor-strange',
    name: 'Doctor Strange',
    role: 'Vanguard',
    difficulty: 'Medium',
    blurb: 'Sustain tank with portal utility. Anchors Arcane Order and slots into Gamma Charge as a secondary.',
    signature: 'Maelstrom of Madness (ult)',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'hulk',
    name: 'Hulk',
    role: 'Vanguard',
    difficulty: 'Easy',
    blurb: 'Brawl tank — Gamma Charge anchor. Best on Convoy maps with long brawl corridors.',
    signature: 'Gamma Burst',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'magneto',
    name: 'Magneto',
    role: 'Vanguard',
    difficulty: 'Medium',
    blurb: 'Shield + projectile redirect. Anchor of Metallic Chaos — counters linear hitscan.',
    signature: 'Metallic Fusion',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'peni-parker',
    name: 'Peni Parker',
    role: 'Vanguard',
    difficulty: 'Medium',
    blurb: 'Webbed-zone area control. Slots into Symbiote Bond as Spider-Verse secondary.',
    signature: 'Cyber-Web Cluster',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'thor',
    name: 'Thor',
    role: 'Vanguard',
    difficulty: 'Medium',
    blurb: 'Hammer-throw bruiser. Voltaic Union anchor; secondary in Ragnarok Rebirth.',
    signature: 'God of Thunder',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'venom',
    name: 'Venom',
    role: 'Vanguard',
    difficulty: 'Medium',
    blurb: 'Symbiote Bond anchor — dive tank with reset potential.',
    signature: 'Cellular Corrosion',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'groot',
    name: 'Groot',
    role: 'Vanguard',
    difficulty: 'Easy',
    blurb: 'Wall-builder backbone. Planet X Pals anchor — Rocket turret + Jeff heal stack.',
    signature: 'Living Walls',
    tier: 'S',
    introduced: 'Launch',
  },
  {
    id: 'the-thing',
    name: 'The Thing',
    role: 'Vanguard',
    difficulty: 'Easy',
    blurb: 'Punching tank with knockback. Pairs with FF synergy stacks (Storming Ignition adjacent).',
    signature: 'Embiggened Slam',
    tier: 'B',
    introduced: 'S2 (Fantastic Four)',
  },
  {
    id: 'emma-frost',
    name: 'Emma Frost',
    role: 'Vanguard',
    difficulty: 'Hard',
    blurb: 'Telepathic shield-form tank — high skill ceiling, transforms damage profile mid-fight.',
    signature: 'Diamond Form',
    tier: 'A',
    introduced: 'S5 (X-Men)',
  },

  // Duelists (launch + S2-S7.5 confirmed additions)
  {
    id: 'black-panther',
    name: 'Black Panther',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Dive Duelist with reset-on-elimination kit. Snowballs hard against squishy backlines.',
    signature: 'Spirit Rend',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Hitscan precision Duelist. Punished by long-sightline maps but elite vs over-extending tanks.',
    signature: 'Edge Dancer',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'hawkeye',
    name: 'Hawkeye',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Bow precision pick — wins on open Convergence maps, struggles on close-quarter Domination.',
    signature: 'Hyperion Loose',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'hela',
    name: 'Hela',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Hitscan death-mage. Ragnarok Rebirth anchor — the headliner of any death-pact comp.',
    signature: 'Goddess of Death',
    tier: 'S',
    introduced: 'Launch',
  },
  {
    id: 'iron-fist',
    name: 'Iron Fist',
    role: 'Duelist',
    difficulty: 'Easy',
    blurb: 'Melee dive specialist. The S7.5 Lucky Loan reflective shield is the new tech that breaks him.',
    signature: 'Crane Kick',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Air-superiority Duelist. Gamma Charge unlocks the one-shot Unibeam — peak burst window.',
    signature: 'Armor Overdrive',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'magik',
    name: 'Magik',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Soulsword melee + portal mobility. Arcane Order secondary; Metallic Chaos secondary.',
    signature: 'Darkchild',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'moon-knight',
    name: 'Moon Knight',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Ankh-bouncing damage projector. Lunar Force anchor with Cloak & Dagger.',
    signature: 'Hand of Khonshu',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'namor',
    name: 'Namor',
    role: 'Duelist',
    difficulty: 'Easy',
    blurb: 'Monstro Spawn turrets — area-denial Duelist. Strong on Domination chokes.',
    signature: 'Monstro Spawn',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'psylocke',
    name: 'Psylocke',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Stealth-dive Duelist. Metallic Chaos rebounds her ranged kunai for free chip damage.',
    signature: 'Psionic Disturbance',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'punisher',
    name: 'Punisher',
    role: 'Duelist',
    difficulty: 'Easy',
    blurb: 'Hitscan flex pick. Bestial Hunt with Daredevil unlocks blind-on-grenade — hard counter to Hawkeye.',
    signature: 'Final Judgment',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'scarlet-witch',
    name: 'Scarlet Witch',
    role: 'Duelist',
    difficulty: 'Easy',
    blurb: 'Auto-aim chaos magic. Arcane Order secondary; Metallic Chaos secondary — high pick rate.',
    signature: 'Reality Erasure',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'spider-man',
    name: 'Spider-Man',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Web-swing dive — Symbiote Bond secondary. High ceiling, mechanical-only.',
    signature: 'Spectacular Spin',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'squirrel-girl',
    name: 'Squirrel Girl',
    role: 'Duelist',
    difficulty: 'Easy',
    blurb: 'Bouncing acorn projectiles. Forgiving entry pick; punishes overextended supports.',
    signature: 'Unbeatable Squirrel Tsunami',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'star-lord',
    name: 'Star-Lord',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Twin-pistol mobility. Guardian Revival self-revive secondary — bait the ult, win the fight.',
    signature: 'Galactic Legend',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'storm',
    name: 'Storm',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Flying AOE control. Voltaic Union secondary; Storming Ignition anchor with Human Torch.',
    signature: 'Goddess Ascendant',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Berserker tank-shredder. Counter-tech vs Hulk and Venom in the brawl mirror.',
    signature: 'Berserker Rage',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'winter-soldier',
    name: 'Winter Soldier',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Mid-range hitscan with bionic arm executes. Strong solo-carry on Convoy.',
    signature: 'Kraken Impact',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'mister-fantastic',
    name: 'Mister Fantastic',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Stretchy melee + ranged hybrid. FF synergy package shines on stacked maps.',
    signature: 'Elastic Strength',
    tier: 'B',
    introduced: 'S2 (Fantastic Four)',
  },
  {
    id: 'human-torch',
    name: 'Human Torch',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Fire-trail Duelist. Storming Ignition secondary — the AOE punishment pick.',
    signature: 'Supernova',
    tier: 'A',
    introduced: 'S2 (Fantastic Four)',
  },
  {
    id: 'daredevil',
    name: 'Daredevil',
    role: 'Duelist',
    difficulty: 'Hard',
    blurb: 'Sense-based melee. Bestial Hunt anchor — flips long-sightline matchups.',
    signature: 'Devil\'s Reckoning',
    tier: 'B',
    introduced: 'S5',
  },
  {
    id: 'black-cat',
    name: 'Black Cat',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'S7.5 headliner. Lucky Loan anchor — radius heal + reflective shield. The new dive-counter.',
    signature: 'Tablet of Destinies',
    tier: 'S',
    introduced: 'S7.5',
  },
  {
    id: 'white-fox',
    name: 'White Fox',
    role: 'Duelist',
    difficulty: 'Medium',
    blurb: 'Lucky Loan secondary. Trap-based area denial paired with Black Cat\'s reflective shield.',
    signature: 'Spirit Hunt',
    tier: 'A',
    introduced: 'S7.5',
  },

  // Strategists (launch + early-season confirmed)
  {
    id: 'adam-warlock',
    name: 'Adam Warlock',
    role: 'Strategist',
    difficulty: 'Hard',
    blurb: 'Soul-link Strategist. Guardian Revival anchor — the highest-ceiling support comp.',
    signature: 'Soul Bond',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'cloak-and-dagger',
    name: 'Cloak & Dagger',
    role: 'Strategist',
    difficulty: 'Easy',
    blurb: 'Light/dark dual-form healer. Lunar Force secondary with Moon Knight.',
    signature: 'Eternal Bond',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'jeff-the-land-shark',
    name: 'Jeff the Land Shark',
    role: 'Strategist',
    difficulty: 'Easy',
    blurb: 'Burst heal + ult-swallow gimmick. Planet X Pals secondary covers Groot ult-windows.',
    signature: 'It\'s Jeff!',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'loki',
    name: 'Loki',
    role: 'Strategist',
    difficulty: 'Hard',
    blurb: 'Illusion-clone Strategist. Ragnarok Rebirth secondary — the respawn-pact tech.',
    signature: 'God of Mischief',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'luna-snow',
    name: 'Luna Snow',
    role: 'Strategist',
    difficulty: 'Medium',
    blurb: 'K-pop ice-skater healer. Universal pick — every comp wants her ult.',
    signature: 'Fate of Both Worlds',
    tier: 'S',
    introduced: 'Launch',
  },
  {
    id: 'mantis',
    name: 'Mantis',
    role: 'Strategist',
    difficulty: 'Easy',
    blurb: 'Pollen heal + sleep-CC Strategist. Guardian Revival secondary.',
    signature: 'Soul Resonance',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'rocket-raccoon',
    name: 'Rocket Raccoon',
    role: 'Strategist',
    difficulty: 'Easy',
    blurb: 'Beam-heal + ult-revive Strategist. Planet X Pals secondary — turret-rides Groot wall.',
    signature: 'C.Y.A.',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'invisible-woman',
    name: 'Invisible Woman',
    role: 'Strategist',
    difficulty: 'Medium',
    blurb: 'Force-field heal + invisibility utility. The FF support pillar.',
    signature: 'Force Field Cradle',
    tier: 'A',
    introduced: 'S2 (Fantastic Four)',
  },
];

export function heroById(id: string): Hero | undefined {
  return HEROES.find((h) => h.id === id);
}

export function heroesByRole(role: Role): Hero[] {
  return HEROES.filter((h) => h.role === role).sort((a, b) => a.name.localeCompare(b.name));
}

export const ROLES_ORDER: Role[] = ['Vanguard', 'Duelist', 'Strategist', 'Multi-Role'];

export const ROLE_TINT: Record<Role, string> = {
  Vanguard: '#6db1ff',
  Duelist: '#ff7a59',
  Strategist: '#b794f4',
  'Multi-Role': '#FFD60A',
};

export function roleClass(role: Role): string {
  return role === 'Vanguard'
    ? 'role-vanguard'
    : role === 'Duelist'
      ? 'role-duelist'
      : role === 'Strategist'
        ? 'role-strategist'
        : '';
}
