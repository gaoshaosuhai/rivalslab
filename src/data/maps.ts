// Marvel Rivals — map registry.
//
// 14 maps in the active S7 / S7.5 competitive pool, organized by mode (Convoy /
// Domination / Convergence). Confirmed via Mobalytics maps guide + Esports
// Insider Ignite 2026 preseason map pool article.

export const LAST_REVIEWED = '2026-05-09';

export type Mode = 'Convoy' | 'Domination' | 'Convergence';

export interface MarvelMap {
  /** url-slug. */
  id: string;
  name: string;
  mode: Mode;
  /** Short flavor — describes the location in one phrase. */
  flavor: string;
  /** Which roles get more value here — a quick lean, not a hard rule. */
  favorsRoles: Array<'Vanguard' | 'Duelist' | 'Strategist'>;
  /** Pick patterns — what to know before queue. */
  notes: string;
  /** Hero ids that historically over-perform on this map. */
  topHeroes: string[];
}

export const MAPS: MarvelMap[] = [
  // Convoy
  {
    id: 'midtown',
    name: 'Midtown',
    mode: 'Convoy',
    flavor: 'NYC streets, payload pushed past the Sanctum.',
    favorsRoles: ['Vanguard', 'Strategist'],
    notes: 'Long brawl corridors with vertical sightlines on Stark Tower stretch. Punishes solo-tank picks.',
    topHeroes: ['hulk', 'venom', 'doctor-strange', 'luna-snow'],
  },
  {
    id: 'arakko',
    name: 'Arakko',
    mode: 'Convoy',
    flavor: 'Mutant homeworld — fractured spires, low ceilings late.',
    favorsRoles: ['Duelist'],
    notes: 'Tight late-segment chokes reward dive Duelists; air maps (Iron Man, Storm) struggle on the final point.',
    topHeroes: ['black-panther', 'iron-fist', 'magik'],
  },
  {
    id: 'spider-islands',
    name: 'Spider-Islands (Tokyo 2099)',
    mode: 'Convoy',
    flavor: 'Floating Spider-Verse skyscrapers above 2099 Tokyo.',
    favorsRoles: ['Duelist', 'Strategist'],
    notes: 'Vertical map — Spider-Man and Iron Man over-perform. Punishes Hulk and Captain America\'s short-jump kits.',
    topHeroes: ['spider-man', 'iron-man', 'storm', 'rocket-raccoon'],
  },
  {
    id: 'yggdrasill-path',
    name: 'Yggdrasill Path (Yggsgard)',
    mode: 'Convoy',
    flavor: 'Asgardian root-corridor under the World Tree.',
    favorsRoles: ['Vanguard'],
    notes: 'Linear brawl map with verticality at segment 2. Divine Armory rules here — Angela + Thor exploit the open ceiling. Cosmic Cyclone\'s heal-and-harm trail also peaks on the corridor.',
    topHeroes: ['thor', 'angela', 'storm'],
  },
  {
    id: 'museum-of-contemplation',
    name: 'Museum of Contemplation',
    mode: 'Convoy',
    flavor: 'Cosmic gallery — open atria with deep flank routes.',
    favorsRoles: ['Duelist'],
    notes: 'Open lanes reward Hela / Hawkeye sightlines. Bestial Hunt blind-grenade is the counter tech here.',
    topHeroes: ['hela', 'hawkeye', 'punisher'],
  },

  // Domination
  {
    id: 'krakoa',
    name: 'Krakoa',
    mode: 'Domination',
    flavor: 'Living mutant island, biome point.',
    favorsRoles: ['Vanguard', 'Strategist'],
    notes: 'Single tight point — Voltaic Union and Lunar Force stack on point. Dive picks struggle without an Iron Fist.',
    topHeroes: ['thor', 'doctor-strange', 'luna-snow'],
  },
  {
    id: 'hells-heaven',
    name: 'Hell\'s Heaven',
    mode: 'Domination',
    flavor: 'Sky-bridge between Hell and Heaven realms.',
    favorsRoles: ['Duelist'],
    notes: 'Map has a fall-off-the-edge mechanic — Magneto and Hulk knockback over-perform.',
    topHeroes: ['magneto', 'hulk', 'venom'],
  },
  {
    id: 'birnin-tchalla',
    name: 'Birnin T\'Challa',
    mode: 'Domination',
    flavor: 'Wakandan capital — vibranium-laced streets.',
    favorsRoles: ['Vanguard'],
    notes: 'Open point with elevated peripheries. Strong Hawkeye + Hela map; Black Panther over-performs on home turf.',
    topHeroes: ['black-panther', 'hawkeye', 'storm'],
  },
  {
    id: 'celestial-husk',
    name: 'Celestial Husk',
    mode: 'Domination',
    flavor: 'Inside the body of a fallen Celestial.',
    favorsRoles: ['Duelist'],
    notes: 'Vertical mid + tight top sightlines. Iron Man and Storm rule the high ground.',
    topHeroes: ['iron-man', 'storm', 'scarlet-witch'],
  },

  // Convergence (hybrid: capture point → push payload)
  {
    id: 'symbiotic-surface',
    name: 'Symbiotic Surface (Klyntar)',
    mode: 'Convergence',
    flavor: 'Symbiote homeworld — alien ridges and tar pools.',
    favorsRoles: ['Vanguard'],
    notes: 'Symbiote Shenanigans runs hot here — Venom + Jeff + Hela tendril-heal stack has over-performed the meta since S2.5. Parker Power-Up is the secondary tech for dive variants.',
    topHeroes: ['venom', 'jeff-the-land-shark', 'hela'],
  },
  {
    id: 'heart-of-heaven',
    name: 'Heart of Heaven',
    mode: 'Convergence',
    flavor: 'Celestial nexus — open second segment, brawl first.',
    favorsRoles: ['Strategist'],
    notes: 'Two-mode map: brawl Strategist in segment 1, dive Strategist in segment 2. Loki / Adam Warlock flex picks.',
    topHeroes: ['adam-warlock', 'loki', 'mantis'],
  },
  {
    id: 'shin-shibuya',
    name: 'Shin-Shibuya',
    mode: 'Convergence',
    flavor: 'Cyberpunk Tokyo crossing — neon billboards over choke.',
    favorsRoles: ['Duelist'],
    notes: 'Three-lane choke at the iconic crossing. Wide-flank Duelists (Black Panther, Magik) excel.',
    topHeroes: ['black-panther', 'magik', 'storm'],
  },
  {
    id: 'hall-of-djalia',
    name: 'Hall of Djalia',
    mode: 'Convergence',
    flavor: 'Wakandan ancestral plane — golden-mist arena.',
    favorsRoles: ['Vanguard', 'Strategist'],
    notes: 'Tight first cap, open second segment. Switching comps mid-segment is the high-rank tech.',
    topHeroes: ['captain-america', 'thor', 'rocket-raccoon'],
  },
  {
    id: 'central-park',
    name: 'Central Park',
    mode: 'Convergence',
    flavor: 'NYC park during Avengers parade — mid-fall foliage.',
    favorsRoles: ['Duelist'],
    notes: 'Open first capture, urban second push. Hela + Hawkeye dominate the open cap; dive comps clean second.',
    topHeroes: ['hela', 'hawkeye', 'iron-fist'],
  },
];

export function mapById(id: string): MarvelMap | undefined {
  return MAPS.find((m) => m.id === id);
}

export function mapsByMode(mode: Mode): MarvelMap[] {
  return MAPS.filter((m) => m.mode === mode);
}

export const MODES_ORDER: Mode[] = ['Convoy', 'Domination', 'Convergence'];
