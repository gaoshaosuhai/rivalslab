// Limited-time events registry. For Marvel Rivals' "Path to Doomsday" 2026 arc:
// June (Age of Ultron) → Aug (Infinity War) → Oct (Endgame) → Dec (Doomsday tie-in).
// Past-end events auto-filter via eventsRunningOn().

export const LAST_REVIEWED = '2026-05-09';

export interface ActiveEvent {
  id: string;
  name: string;
  /** ISO yyyy-mm-dd. */
  startsAt: string;
  /** ISO yyyy-mm-dd. */
  endsAt: string;
  /** Tied to which patch / season. */
  patch: string;
  rewards: string[];
  blurb: string;
  /** Hero = "must do", Strong = "if you have time", Filler = skip. */
  priority: 'Hero' | 'Strong' | 'Filler';
}

export const ACTIVE_EVENTS: ActiveEvent[] = [
  // S8 Avengers: Age of Ultron event window — confirmed in PCGamer 2026 plans coverage.
  {
    id: 'age-of-ultron-2026',
    name: 'Avengers: Age of Ultron — Tie-in event',
    startsAt: '2026-06-12',
    endsAt: '2026-07-03',
    patch: 'S8',
    rewards: ['Ultron-themed namecard', 'Themed sprays', 'Free Lattice (~200)'],
    blurb: 'Limited-time Ultron-themed mode + cosmetics during the S8 mid-arc.',
    priority: 'Strong',
  },
];

export function eventsRunningOn(date: Date): ActiveEvent[] {
  const iso = date.toISOString().slice(0, 10);
  return ACTIVE_EVENTS.filter((e) => iso >= e.startsAt && iso <= e.endsAt);
}

export function upcomingEvents(now = new Date()): ActiveEvent[] {
  const iso = now.toISOString().slice(0, 10);
  return ACTIVE_EVENTS.filter((e) => iso < e.startsAt).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function daysUntil(iso: string, from = new Date()): number {
  const ms = new Date(iso + 'T23:59:59Z').getTime() - from.getTime();
  return Math.ceil(ms / 86_400_000);
}
