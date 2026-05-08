import Link from "next/link";
import { getAds, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";

export default function TrendsPage() {
  const ads = getAds(30);

  // Daily new-ad bucket from first_seen
  const byDay = new Map<string, number>();
  for (const a of ads) {
    const d = a.first_seen.slice(0, 10);
    byDay.set(d, (byDay.get(d) ?? 0) + 1);
  }
  const days = Array.from(byDay.entries()).sort((a, b) => a[0].localeCompare(b[0])).slice(-30);
  const maxDay = Math.max(1, ...days.map((d) => d[1]));

  // Vertical share
  const byV = new Map<string, number>();
  for (const a of ads) byV.set(a.vertical, (byV.get(a.vertical) ?? 0) + 1);
  const vRows = Array.from(byV.entries()).sort((a, b) => b[1] - a[1]);

  // Network share
  const byN = new Map<string, number>();
  for (const a of ads) byN.set(a.network, (byN.get(a.network) ?? 0) + 1);
  const nRows = Array.from(byN.entries()).sort((a, b) => b[1] - a[1]);

  // Longevity buckets
  const buckets = { "1-7": 0, "8-30": 0, "31+": 0 };
  for (const a of ads) {
    if (a.days_active <= 7) buckets["1-7"]++;
    else if (a.days_active <= 30) buckets["8-30"]++;
    else buckets["31+"]++;
  }

  // Breakout advertisers — most ads in first_seen window of last 14 days
  const recent = ads.filter((a) => Date.now() - new Date(a.first_seen).getTime() < 14 * 86400_000);
  const advCount = new Map<string, { name: string; slug: string; n: number }>();
  for (const a of recent) {
    const e = advCount.get(a.advertiser_slug) ?? { name: a.advertiser, slug: a.advertiser_slug, n: 0 };
    e.n++;
    advCount.set(a.advertiser_slug, e);
  }
  const breakout = Array.from(advCount.values()).sort((a, b) => b.n - a.n).slice(0, 12);

  return (
    <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Trends</h1>
      <p className="text-sm text-muted-foreground mt-1">
        What is gaining momentum across the corpus.
      </p>

      <section className="mt-6 border border-border rounded-lg p-5 bg-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          New ads per day
        </h2>
        <div className="mt-4 flex items-end gap-1 h-32">
          {days.map(([d, n]) => (
            <div
              key={d}
              className="flex-1 bg-foreground/70 hover:bg-foreground rounded-sm relative group"
              style={{ height: `${(n / maxDay) * 100}%` }}
              title={`${d}: ${n}`}
            >
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] bg-background border border-border rounded px-1.5 py-0.5 whitespace-nowrap">
                {d}: {n}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums">
          <span>{days[0]?.[0] ?? ""}</span>
          <span>{days[days.length - 1]?.[0] ?? ""}</span>
        </div>
      </section>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <section className="border border-border rounded-lg p-5 bg-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Vertical mix
          </h2>
          <div className="space-y-2">
            {vRows.map(([v, n]) => {
              const pct = (n / ads.length) * 100;
              return (
                <Link
                  key={v}
                  href={`/verticals/${v}`}
                  className="block hover:bg-accent rounded-md p-2 -mx-2 transition"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{VERTICAL_LABELS[v] ?? v}</span>
                    <span className="text-muted-foreground tabular-nums">{n} · {pct.toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-foreground/70" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border border-border rounded-lg p-5 bg-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Network share
          </h2>
          <div className="space-y-2">
            {nRows.map(([n, c]) => {
              const pct = (c / ads.length) * 100;
              return (
                <Link
                  key={n}
                  href={`/networks/${n}`}
                  className="block hover:bg-accent rounded-md p-2 -mx-2 transition"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{NETWORK_LABELS[n] ?? n}</span>
                    <span className="text-muted-foreground tabular-nums">{c} · {pct.toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-foreground/70" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-6 border border-border rounded-lg p-5 bg-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Longevity distribution
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(buckets).map(([k, v]) => (
            <div key={k} className="border border-border rounded-md p-3 text-center">
              <div className="text-2xl font-semibold tabular-nums">{v.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">{k} days active</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 border border-border rounded-lg p-5 bg-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Breakout advertisers (last 14 days)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {breakout.map((b) => (
            <Link
              key={b.slug}
              href={`/advertisers/${b.slug}`}
              className="flex items-center justify-between border border-border rounded-md px-3 py-2 hover:bg-accent transition text-sm"
            >
              <span className="truncate">{b.name}</span>
              <span className="text-xs text-emerald-400 tabular-nums">+{b.n}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
