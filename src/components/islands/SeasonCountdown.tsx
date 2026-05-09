import { useEffect, useState } from 'react';

interface Props {
  /** ISO yyyy-mm-dd of the target season start. */
  targetISO: string;
  /** Display label, e.g. "Season 8". */
  label: string;
}

function diffParts(targetMs: number, nowMs: number) {
  const diff = Math.max(0, targetMs - nowMs);
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

export default function SeasonCountdown({ targetISO, label }: Props) {
  // The target time is start-of-day UTC. Marvel Rivals seasons reset at 00:00 UTC.
  const targetMs = new Date(targetISO + 'T00:00:00Z').getTime();
  const [parts, setParts] = useState(() => diffParts(targetMs, Date.now()));

  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(targetMs, Date.now())), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (parts.isPast) {
    return (
      <div className="card-panel p-6 md:p-8 text-center">
        <div className="text-xs uppercase tracking-widest text-[color:var(--accent)] font-semibold">{label}</div>
        <div className="display text-4xl md:text-5xl uppercase mt-2 text-[color:var(--fg)]">Live now</div>
        <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
          Patch landed. See the <a href="/patches/" className="text-[color:var(--accent)] hover:text-[color:var(--accent-soft)]">latest diff</a>.
        </p>
      </div>
    );
  }

  const cell = (n: number, unit: string) => (
    <div className="card p-4 md:p-6 text-center min-w-[5.5rem]">
      <div className="stat-num text-4xl md:text-6xl text-[color:var(--accent)]">
        {n.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-[color:var(--fg-dim)] mt-2">{unit}</div>
    </div>
  );

  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-[color:var(--accent)] font-semibold mb-3">
        {label} — drops {targetISO}
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {cell(parts.days, 'days')}
        {cell(parts.hours, 'hours')}
        {cell(parts.minutes, 'min')}
        {cell(parts.seconds, 'sec')}
      </div>
    </div>
  );
}
