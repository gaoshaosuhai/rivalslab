import { useMemo, useState } from 'react';
import type { TeamUp } from '@/data/team-ups';
import type { Hero, Role } from '@/data/heroes';

type Tier = TeamUp['tier'];

interface Props {
  teamUps: TeamUp[];
  heroes: Hero[];
}

const ALL_TIERS: Tier[] = ['S', 'A', 'B', 'C'];
const ALL_ROLES: Role[] = ['Vanguard', 'Duelist', 'Strategist', 'Multi-Role'];

const ROLE_TINT: Record<Role, string> = {
  Vanguard: '#6db1ff',
  Duelist: '#ff7a59',
  Strategist: '#b794f4',
  'Multi-Role': '#FFD60A',
};

export default function TeamUpExplorer({ teamUps, heroes }: Props) {
  const heroMap = useMemo(() => new Map(heroes.map((h) => [h.id, h])), [heroes]);
  const [tiers, setTiers] = useState<Set<Tier>>(new Set(ALL_TIERS));
  const [roles, setRoles] = useState<Set<Role>>(new Set(ALL_ROLES));
  const [anchor, setAnchor] = useState<string>('');
  const [query, setQuery] = useState('');

  const anchors = useMemo(
    () =>
      Array.from(new Set(teamUps.map((t) => t.anchor)))
        .map((id) => heroMap.get(id))
        .filter((h): h is Hero => !!h)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [teamUps, heroMap],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teamUps.filter((tu) => {
      if (!tiers.has(tu.tier)) return false;
      if (anchor && tu.anchor !== anchor) return false;
      const anchorHero = heroMap.get(tu.anchor);
      if (anchorHero && !roles.has(anchorHero.role)) return false;
      if (q) {
        const haystack = `${tu.name} ${tu.ability} ${tu.blurb} ${tu.anchor} ${tu.secondaries.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [teamUps, tiers, roles, anchor, query, heroMap]);

  function toggleTier(t: Tier) {
    setTiers((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next.size === 0 ? new Set(ALL_TIERS) : next;
    });
  }

  function toggleRole(r: Role) {
    setRoles((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next.size === 0 ? new Set(ALL_ROLES) : next;
    });
  }

  function reset() {
    setTiers(new Set(ALL_TIERS));
    setRoles(new Set(ALL_ROLES));
    setAnchor('');
    setQuery('');
  }

  return (
    <div>
      <div className="card p-4 md:p-5 mb-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--fg-dim)] font-semibold block mb-2">
              Search
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ability, hero, season…"
              className="w-full px-3 py-2.5 rounded-md bg-[color:var(--bg-soft)] border border-[color:var(--border)] text-[color:var(--fg)] placeholder:text-[color:var(--fg-dim)] focus:outline-none focus:border-[color:color-mix(in_oklab,var(--accent)_55%,transparent)]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--fg-dim)] font-semibold block mb-2">
              Anchor
            </label>
            <select
              value={anchor}
              onChange={(e) => setAnchor(e.target.value)}
              className="w-full md:w-56 px-3 py-2.5 rounded-md bg-[color:var(--bg-soft)] border border-[color:var(--border)] text-[color:var(--fg)] focus:outline-none focus:border-[color:color-mix(in_oklab,var(--accent)_55%,transparent)]"
            >
              <option value="">Any anchor</option>
              {anchors.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[color:var(--fg-dim)] font-semibold">
              Tier
            </span>
            <div className="flex gap-1.5">
              {ALL_TIERS.map((t) => {
                const active = tiers.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTier(t)}
                    className={`px-2.5 py-1 rounded-md text-sm font-semibold border transition-colors ${
                      active
                        ? 'bg-[color:color-mix(in_oklab,var(--accent)_22%,transparent)] border-[color:color-mix(in_oklab,var(--accent)_50%,transparent)] text-[color:var(--accent)]'
                        : 'border-[color:var(--border)] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[color:var(--fg-dim)] font-semibold">
              Role
            </span>
            <div className="flex gap-1.5">
              {ALL_ROLES.map((r) => {
                const active = roles.has(r);
                const tint = ROLE_TINT[r];
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRole(r)}
                    className={`px-2.5 py-1 rounded-md text-sm font-medium border transition-colors`}
                    style={
                      active
                        ? {
                            background: `color-mix(in oklab, ${tint} 18%, transparent)`,
                            borderColor: `color-mix(in oklab, ${tint} 50%, transparent)`,
                            color: tint,
                          }
                        : { borderColor: 'var(--border)', color: 'var(--fg-muted)' }
                    }
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="ml-auto text-xs uppercase tracking-widest text-[color:var(--fg-dim)] hover:text-[color:var(--fg)]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-sm text-[color:var(--fg-muted)] mb-3">
        Showing <span className="text-[color:var(--fg)] font-semibold">{filtered.length}</span> of {teamUps.length} team-ups
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((tu) => {
          const anchorHero = heroMap.get(tu.anchor);
          return (
            <a
              key={tu.id}
              href={`/team-ups/${tu.id}/`}
              className="card-panel p-4 hover:border-[color:color-mix(in_oklab,var(--accent)_45%,transparent)] transition-colors block"
            >
              <div className="flex items-start gap-2 mb-2">
                <span
                  className={`chip ${tu.tier === 'S' ? 'chip-warn' : 'chip-accent'}`}
                >
                  {tu.tier}
                </span>
                <span className="text-xs uppercase tracking-widest text-[color:var(--fg-dim)] font-semibold">
                  {tu.introduced}
                </span>
              </div>
              <div className="display text-xl uppercase tracking-tight text-[color:var(--fg)]">
                {tu.name}
              </div>
              <div className="text-xs text-[color:var(--fg-dim)] mt-1">
                <span className="text-[color:var(--accent)]">{anchorHero?.name ?? tu.anchor}</span>
                <span className="text-[color:var(--fg-muted)]"> + </span>
                {tu.secondaries
                  .map((id) => heroMap.get(id)?.name ?? id)
                  .join(', ')}
              </div>
              <p className="text-sm text-[color:var(--fg-muted)] mt-2 line-clamp-2">
                {tu.ability}
              </p>
            </a>
          );
        })}
        {filtered.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 card p-8 text-center text-[color:var(--fg-muted)]">
            No team-ups match. Try widening the filters.
          </div>
        )}
      </div>
    </div>
  );
}
