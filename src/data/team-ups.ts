// Marvel Rivals — Team-Up Synergies registry.
//
// Team-Ups are passive or active hero-pair bonuses unlocked when a designated
// Anchor is on the team alongside one or more Secondary heroes. The Anchor
// typically gets a stat buff; Secondaries gain a new active or passive ability.
//
// V2 (2026-05-10): cross-checked against marvelrivals.gg + Beebom + Mobalytics.
// 25 active Team-Ups in S7.5. Removed 7 historical entries that had been deactivated
// by NetEase prior to S7.5 (Voltaic Union, Symbiote Bond, Metallic Chaos,
// Storming Ignition, Ragnarok Rebirth, Lunar Force, Guardian Revival) — they
// would have shipped stale info on day 1.
//
// Sources:
//   https://marvelrivals.gg/team-ups/
//   https://rivalsmeta.com/tier-list/team-ups
//   https://beebom.com/marvel-rivals-team-ups/
//   https://www.turtlebeach.com/blog/marvel-rivals-season-7-all-team-up-changes

export const LAST_REVIEWED = '2026-05-10';

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
  /** Best maps for this team-up — references map ids. Heuristic where exact data unavailable. */
  bestMaps?: string[];
}

export const TEAM_UPS: TeamUp[] = [
  // ─── Active Team-Ups ─────────────────────────────────────────────────────

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
    bestMaps: ['midtown', 'yggdrasill-path'],
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
    bestMaps: ['spider-islands', 'birnin-tchalla'],
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
    bestMaps: ['heart-of-heaven', 'hall-of-djalia'],
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
    bestMaps: ['museum-of-contemplation', 'central-park'],
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
    bestMaps: ['krakoa', 'shin-shibuya'],
  },

  // ─── Newly catalogued (post-launch additions confirmed active in S7.5) ───

  {
    id: 'symbiote-shenanigans',
    name: 'Symbiote Shenanigans',
    anchor: 'venom',
    secondaries: ['jeff-the-land-shark', 'hela'],
    ability: 'Venom +150 max HP; Jeff and Hela get healing tendrils.',
    blurb:
      'Replaced the old Symbiote Bond in S2.5. Venom anchors a sustain backline now — Hela ranged poke + Jeff burst heal funnels through symbiote tendrils. S-tier on close-quarter maps.',
    tier: 'S',
    introduced: 'S2.5',
    bestMaps: ['symbiotic-surface', 'hells-heaven'],
  },
  {
    id: 'chilling-assault',
    name: 'Chilling Assault',
    anchor: 'luna-snow',
    secondaries: ['iron-fist', 'emma-frost'],
    ability: 'Winter\'s Chill empowers melee with slow + 15% heal boost.',
    blurb:
      'Slow-on-hit turns Iron Fist into an unkillable mid-skirmish threat. Emma Frost\'s diamond melee gets a freeze chain that locks tanks.',
    tier: 'A',
    introduced: 'S2',
    bestMaps: ['shin-shibuya', 'hall-of-djalia'],
  },
  {
    id: 'rocket-network',
    name: 'Rocket Network',
    anchor: 'rocket-raccoon',
    secondaries: ['star-lord', 'mister-fantastic'],
    ability: '"Web Server" beacon revives + 5% heal boost.',
    blurb:
      'Drop-and-revive utility for two of the squishiest Duelists. The beacon is a sleeper pick on Convergence maps where Rocket can perch above the contested point.',
    tier: 'A',
    introduced: 'S2.5',
    bestMaps: ['krakoa', 'central-park'],
  },
  {
    id: 'stark-protocol',
    name: 'Stark Protocol',
    anchor: 'iron-man',
    secondaries: ['ultron'],
    ability: 'Nano-Tech piercing Unibeam — damage AND heal blast.',
    blurb:
      'The S2.5 Iron Man + Ultron pair turns the Unibeam into both a damage and heal vector. Hardest mid-range pressure tool in the game on open maps.',
    tier: 'S',
    introduced: 'S2.5',
    bestMaps: ['midtown', 'heart-of-heaven'],
  },
  {
    id: 'cosmic-cyclone',
    name: 'Cosmic Cyclone',
    anchor: 'storm',
    secondaries: ['adam-warlock'],
    ability: 'Heavenly Harmony trail dealing damage + healing.',
    blurb:
      'S7 addition. Storm trails leave behind a heal-and-harm corridor that Adam Warlock can ult-anchor through. Excellent on vertical maps where Storm rules altitude.',
    tier: 'A',
    introduced: 'S7',
    bestMaps: ['yggdrasill-path', 'celestial-husk'],
  },
  {
    id: 'stars-aligned',
    name: 'Stars Aligned',
    anchor: 'captain-america',
    secondaries: ['winter-soldier'],
    ability: 'Stellar Impact slam shockwave + slow, +100 HP.',
    blurb:
      'Cap\'s shield throw triggers a Winter Soldier follow-up slam. The +100 HP keeps Cap alive through the dive window. Solid anti-flank tech.',
    tier: 'A',
    introduced: 'S2',
    bestMaps: ['birnin-tchalla', 'midtown'],
  },
  {
    id: 'blessing-of-the-kumiho',
    name: 'Blessing of the Kumiho',
    anchor: 'white-fox',
    secondaries: ['luna-snow'],
    ability: 'Spirit Fox Accord — line-skill heal/charm + speed.',
    blurb:
      'S7 addition that pairs the two K-pop Strategists. The line-skill is a charm-on-hit that disables enemy ults briefly. Pair with Lucky Loan for the meta sustain stack.',
    tier: 'S',
    introduced: 'S7',
    bestMaps: ['shin-shibuya', 'hall-of-djalia'],
  },
  {
    id: 'fastball-special',
    name: 'Fastball Special',
    anchor: 'wolverine',
    secondaries: ['hulk', 'the-thing'],
    ability: 'Hulk or Thing launches Wolverine as an armor-piercing missile.',
    blurb:
      'The launch-day comic-book combo. Hulk or Thing throws Wolverine across the map for instant backline pressure. Irreplaceable tech vs sniper picks.',
    tier: 'S',
    introduced: 'Launch',
    bestMaps: ['krakoa', 'hells-heaven'],
  },
  {
    id: 'blade-of-khonshu',
    name: 'Blade of Khonshu',
    anchor: 'moon-knight',
    secondaries: ['blade'],
    ability: 'Moon God\'s Chosen — bonus crescent damage, 5% damage boost.',
    blurb:
      'Two of the most flank-heavy Duelists pair into a moon-cycle damage scaling. Great into prolonged 1v1 mirror-skirmish patterns.',
    tier: 'B',
    introduced: 'S3.5',
    bestMaps: ['midtown', 'hall-of-djalia'],
  },
  {
    id: 'deep-wrath',
    name: 'Deep Wrath',
    anchor: 'hela',
    secondaries: ['namor'],
    ability: 'Death Kneel summons piranhas/zombies, +15% damage.',
    blurb:
      'Replaced Ragnarok Rebirth as Hela\'s flagship in S4.5. Death Kneel becomes a sustained area-denial that pairs with Namor\'s turrets for site lockdown.',
    tier: 'A',
    introduced: 'S4.5',
    bestMaps: ['spider-islands', 'birnin-tchalla'],
  },
  {
    id: 'divine-armory',
    name: 'Divine Armory',
    anchor: 'angela',
    secondaries: ['thor'],
    ability: 'Thunder Spear restores Thorforce, +100 HP.',
    blurb:
      'Angela anchors the S4 Asgard pair. Spear-throw refunds Thor\'s ult charge + grants both heroes bonus HP. Run on vertical maps where Angela\'s flight rules.',
    tier: 'A',
    introduced: 'S4',
    bestMaps: ['yggdrasill-path', 'heart-of-heaven'],
  },
  {
    id: 'duality-dance',
    name: 'Duality Dance',
    anchor: 'adam-warlock',
    secondaries: ['luna-snow'],
    ability: 'Cosmic Awareness — shared revive aura + 15% heal.',
    blurb:
      'S6 double-Strategist combo. Both heroes revive within the aura — the highest-ceiling support comp in the game when comms are tight.',
    tier: 'B',
    introduced: 'S6',
    bestMaps: ['hall-of-djalia', 'krakoa'],
  },
  {
    id: 'mr-pools-toy-box',
    name: "Mr. Pool's Interdimensional Toy Box",
    anchor: 'deadpool',
    secondaries: ['jeff-the-land-shark', 'elsa-bloodstone'],
    ability: 'Cosmic Chaos — random-roll buffs (damage / heal / HP).',
    blurb:
      'S6 chaos pick. Deadpool rolls a random buff each round — high-variance but always swings momentum somewhere. Run on objective maps where snowballing matters.',
    tier: 'B',
    introduced: 'S6',
    bestMaps: ['museum-of-contemplation', 'central-park'],
  },
  {
    id: 'explosive-entanglement',
    name: 'Explosive Entanglement',
    anchor: 'gambit',
    secondaries: ['magneto', 'rogue'],
    ability: 'Ace of Aces — kinetic-card volatile sphere, 5% heal.',
    blurb:
      'S5 X-Men trio. Gambit\'s charged cards detonate with Magneto + Rogue assistance — area-denial + chip damage that softens entire enemy comps.',
    tier: 'A',
    introduced: 'S5',
    bestMaps: ['arakko', 'midtown'],
  },
  {
    id: 'first-steps',
    name: 'First Steps',
    anchor: 'human-torch',
    secondaries: ['the-thing'],
    ability: 'Two-In-One — Thing punts flaming Torch as a projectile.',
    blurb:
      'Replaced Storming Ignition as Torch\'s flagship in S5. Thing throws a burning Torch into the enemy backline — chaos AOE that competes with Symbiote Shenanigans for top-flight Convergence pick.',
    tier: 'B',
    introduced: 'S5',
    bestMaps: ['celestial-husk', 'heart-of-heaven'],
  },
  {
    id: 'primal-flame',
    name: 'Primal Flame',
    anchor: 'phoenix',
    secondaries: ['wolverine', 'black-widow'],
    ability: 'Mind\'s Grace — telekinetic claw/bullet upgrade, +10% damage.',
    blurb:
      'Phoenix anchors the S3 hitscan + melee combo. Wolverine\'s claws extend with TK; Black Widow\'s bullets get TK redirect. Niche but devastating into open Convoy maps.',
    tier: 'A',
    introduced: 'S3',
    bestMaps: ['krakoa', 'spider-islands'],
  },
  {
    id: 'sword-of-duality',
    name: 'Sword of Duality',
    anchor: 'cloak-and-dagger',
    secondaries: ['hawkeye', 'psylocke'],
    ability: 'From Shadow to Light — light/dark stance swap, 15% heal.',
    blurb:
      'S5 (expanded S5.5). Stance swap toggles bonus heal vs bonus damage. Hawkeye + Psylocke get scaling-on-stance-shift, making this the highest-ceiling Strategist anchor.',
    tier: 'S',
    introduced: 'S5.5',
    bestMaps: ['hall-of-djalia', 'shin-shibuya'],
  },
  {
    id: 'vibrant-vitality',
    name: 'Vibrant Vitality',
    anchor: 'mantis',
    secondaries: ['loki', 'groot'],
    ability: 'Heavenly Guardian — shared regen aura, +10% heal.',
    blurb:
      'S3.5 sustain pack. Loki\'s clones inherit Mantis pollen heals; Groot wall reinforced. Great floor-tier comp for solo-queue Strategist mains.',
    tier: 'B',
    introduced: 'S3.5',
    bestMaps: ['yggdrasill-path', 'central-park'],
  },
  {
    id: 'parker-power-up',
    name: 'Parker Power-Up',
    anchor: 'peni-parker',
    secondaries: ['spider-man'],
    ability: 'Spider-Tech — Peni gives Spider-Man webs, +50 HP.',
    blurb:
      'S6 Spider-Verse callback after Symbiote Bond was retired. Peni shares web charges with Spider-Man — sustain bump for the dive Duelist.',
    tier: 'C',
    introduced: 'S6',
    bestMaps: ['museum-of-contemplation', 'midtown'],
  },
  {
    id: 'psionic-mayhem',
    name: 'Psionic Mayhem',
    anchor: 'invisible-woman',
    secondaries: ['doctor-strange'],
    ability: 'Force-field projectile redirect synergy, +50 HP.',
    blurb:
      'S6.5 Strategist+Vanguard pair. Invisible Woman\'s force field bends through Strange\'s portal — mid-range projectiles loop back at the source.',
    tier: 'A',
    introduced: 'S6.5',
    bestMaps: ['museum-of-contemplation', 'heart-of-heaven'],
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
