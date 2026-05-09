// Marvel Rivals — Team-Up Synergies registry.
//
// Team-Ups are passive or active hero-pair bonuses unlocked when a designated
// Anchor is on the team alongside one or more Secondary heroes. The Anchor
// typically gets a stat buff; Secondaries gain a new active or passive ability.
//
// V1 dataset: 12 verified Team-Ups from agent research (Beebom + Dot Esports +
// marvelrivals.gg sources, May 2026). S7.5 has 24 active Team-Ups total — the
// remaining 12 require a verification pass against marvelrivals.gg/team-ups
// before the next maintenance bump.

export const LAST_REVIEWED = '2026-05-09';

export interface TeamUp {
  /** url-slug. */
  id: string;
  name: string;
  /** Hero id (matches src/data/heroes.ts). */
  anchor: string;
  /** Hero ids of the secondaries. */
  secondaries: string[];
  /** Short ability description — what unlocks. */
  ability: string;
  /** Longer blurb — what it actually does in a match, when to run it. */
  blurb: string;
  /** Coarse public meta tier — refine from rivalsmeta.com /tier-list/team-ups data. */
  tier: 'S' | 'A' | 'B' | 'C';
  /** Season when introduced. */
  introduced: string;
  /** Best maps for this team-up — references map ids. Optional, populated where known. */
  bestMaps?: string[];
}

export const TEAM_UPS: TeamUp[] = [
  {
    id: 'gamma-charge',
    name: 'Gamma Charge',
    anchor: 'hulk',
    secondaries: ['iron-man', 'doctor-strange'],
    ability: 'Hulk gamma-irradiates allies; Iron Man gains a charged Unibeam.',
    blurb:
      'Doctor Strange and Iron Man both pick up armor when Hulk is in range. Iron Man\'s Unibeam becomes a one-shot threat against squishies. Run on Convoy maps with extended team-fight windows.',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'voltaic-union',
    name: 'Voltaic Union',
    anchor: 'thor',
    secondaries: ['storm', 'captain-america'],
    ability: 'Storm and Captain America gain a lightning-empowered melee/throw.',
    blurb:
      'Captain America\'s shield throw chains lightning; Storm\'s tornado pulses. The headline anti-dive synergy of S6+ — pulls value on Domination point fights.',
    tier: 'S',
    introduced: 'Launch',
  },
  {
    id: 'ragnarok-rebirth',
    name: 'Ragnarok Rebirth',
    anchor: 'hela',
    secondaries: ['loki', 'thor'],
    ability: 'Death of Loki / Thor triggers a free respawn near Hela.',
    blurb:
      'The original "uncrackable backline" team-up. Hela\'s ult plus a respawn-on-death pact has been nerfed multiple times but still warps draft phase whenever it goes through ranked.',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'symbiote-bond',
    name: 'Symbiote Bond',
    anchor: 'venom',
    secondaries: ['spider-man', 'peni-parker'],
    ability: 'Adds a symbiote shield burst to allies near Venom.',
    blurb:
      'Spider-Man + Peni Parker turn into a double-flank with Venom diving from front. The shield burst saves over-extends; pairs hard with Convergence maps.',
    tier: 'A',
    introduced: 'Launch',
    bestMaps: ['symbiotic-surface', 'shin-shibuya'],
  },
  {
    id: 'lunar-force',
    name: 'Lunar Force',
    anchor: 'moon-knight',
    secondaries: ['cloak-and-dagger'],
    ability: 'Moon Knight + Cloak & Dagger gain a phase-warp ability.',
    blurb:
      'Phase-warp ducks ult-windows. Cloak\'s heal output spikes when Moon Knight is mid-rotation — niche but underrated.',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'planet-x-pals',
    name: 'Planet X Pals',
    anchor: 'groot',
    secondaries: ['rocket-raccoon', 'jeff-the-land-shark'],
    ability: 'Rocket can ride Groot\'s wall as a turret; Jeff gets a heal pulse.',
    blurb:
      'The lowest-skill-floor backline. Groot wall + Rocket turret on the high ground = free site denial. Jeff\'s heal pulse covers the ult-window vulnerability.',
    tier: 'A',
    introduced: 'Launch',
  },
  {
    id: 'metallic-chaos',
    name: 'Metallic Chaos',
    anchor: 'magneto',
    secondaries: ['scarlet-witch', 'psylocke'],
    ability: 'Magnetic projectile redirection — Magneto bends ally damage.',
    blurb:
      'Magneto\'s shield can rebound Scarlet Witch and Psylocke ranged damage. Shines on Convergence maps where corridors force linear shots.',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'guardian-revival',
    name: 'Guardian Revival',
    anchor: 'adam-warlock',
    secondaries: ['star-lord', 'mantis'],
    ability: 'Star-Lord and Mantis gain a self-revive cocoon.',
    blurb:
      'Self-revive eats one ult per fight if you bait it right. Adam Warlock\'s ult pairs across the trio — high ceiling, requires comms.',
    tier: 'S',
    introduced: 'Launch',
  },
  {
    id: 'storming-ignition',
    name: 'Storming Ignition',
    anchor: 'storm',
    secondaries: ['human-torch'],
    ability: 'Fire-tornado combo — Storm\'s tornado ignites with Torch\'s flames.',
    blurb:
      'AOE area-denial that rewards stacked enemy comps. Strong vs slow tanks; weak vs dive.',
    tier: 'A',
    introduced: 'S2 (Fantastic Four)',
  },
  {
    id: 'arcane-order',
    name: 'Arcane Order',
    anchor: 'doctor-strange',
    secondaries: ['scarlet-witch', 'magik'],
    ability: 'Passive sorcery surge — magic damage scaled near Strange.',
    blurb:
      'Triple-magic comp that punishes anti-tank stacks. Scarlet Witch and Magik scale together; Strange anchors sustain.',
    tier: 'B',
    introduced: 'Launch',
  },
  {
    id: 'bestial-hunt',
    name: 'Bestial Hunt',
    anchor: 'daredevil',
    secondaries: ['punisher'],
    ability: 'Punisher\'s grenades blind hit targets near Daredevil.',
    blurb:
      'Niche but incredible into long-sightline picks (Hawkeye, Hela). Daredevil\'s sense + blind grenade closes those windows.',
    tier: 'B',
    introduced: 'S5',
  },
  {
    id: 'lucky-loan',
    name: 'Lucky Loan',
    anchor: 'black-cat',
    secondaries: ['white-fox', 'captain-america'],
    ability: 'Radius heal pulse + reflective shield to allies near Black Cat.',
    blurb:
      'S7.5 headline addition. Reflective shield turns dive comps inside-out — Cap\'s shield throw + Black Cat\'s heal radius is the new anti-Iron-Fist tech.',
    tier: 'S',
    introduced: 'S7.5',
  },
];

/** Team-ups grouped by anchor hero. Used on /hero/<slug>/ pages. */
export function teamUpsForHero(heroId: string): TeamUp[] {
  return TEAM_UPS.filter(
    (t) => t.anchor === heroId || t.secondaries.includes(heroId),
  );
}

export function teamUpById(id: string): TeamUp | undefined {
  return TEAM_UPS.find((t) => t.id === id);
}

/** Sort by tier, then by name. */
export function teamUpsByTier(): TeamUp[] {
  const order = { S: 0, A: 1, B: 2, C: 3 };
  return [...TEAM_UPS].sort((a, b) => order[a.tier] - order[b.tier] || a.name.localeCompare(b.name));
}
