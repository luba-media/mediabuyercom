import Link from "next/link";
import { getAds, NETWORK_LABELS } from "@/lib/data";

export default function PulsePage() {
  const ads = getAds(20)
    .slice()
    .sort((a, b) => b.last_seen.localeCompare(a.last_seen))
    .slice(0, 50);
  return (
    <div className="px-4 sm:px-6 py-8 max-w-4xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Pulse</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Live activity feed — most recently sighted creatives.
      </p>
      <ol className="mt-6 divide-y divide-border border border-border rounded-lg bg-card">
        {ads.map((a) => (
          <li key={a.id} className="px-4 py-3 flex items-center gap-3 text-sm">
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums w-32 shrink-0">
              {a.last_seen.slice(5, 16).replace("T", " ")}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-accent text-[10px] uppercase tracking-wider w-20 text-center shrink-0">
              {NETWORK_LABELS[a.network] ?? a.network}
            </span>
            <Link href={`/ad/${a.id}`} className="flex-1 truncate hover:underline">
              {a.title || <span className="italic text-muted-foreground">(untitled)</span>}
            </Link>
            <Link
              href={`/advertisers/${a.advertiser_slug}`}
              className="text-xs text-muted-foreground hover:text-foreground hidden md:block max-w-40 truncate"
            >
              {a.advertiser}
            </Link>
            <span className="text-[11px] text-muted-foreground tabular-nums w-12 text-right shrink-0">
              {a.days_active}d
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
