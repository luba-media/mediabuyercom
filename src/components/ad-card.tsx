import Link from "next/link";
import { type Ad, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      href={`/ad/${ad.id}`}
      className="group block border border-border rounded-lg overflow-hidden bg-card hover:border-foreground/40 transition"
    >
      <Thumb ad={ad} />
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
            {NETWORK_LABELS[ad.network] ?? ad.network}
          </span>
          <span>·</span>
          <span>{VERTICAL_LABELS[ad.vertical] ?? ad.vertical}</span>
        </div>
        <div className="text-sm font-medium line-clamp-2 leading-snug min-h-10">
          {ad.title || <span className="text-muted-foreground italic">(untitled)</span>}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {ad.advertiser}
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground tabular-nums">
          <span>{ad.days_active}d active</span>
          <span>{ad.countries.slice(0, 3).join(" ")}{ad.countries.length > 3 ? ` +${ad.countries.length - 3}` : ""}</span>
        </div>
      </div>
    </Link>
  );
}

function Thumb({ ad }: { ad: Ad }) {
  // The /_img/<network>/<id> path is served by the upstream mediabuyer ETL; for this static
  // build we render a deterministic gradient fallback keyed by the ad id.
  const seed = parseInt(ad.id.slice(0, 6), 16) || 0;
  const h1 = seed % 360;
  const h2 = (h1 + 60) % 360;
  return (
    <div
      className="aspect-[16/9] w-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${h1}, 50%, 20%), hsl(${h2}, 60%, 35%))`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/70">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
        </svg>
      </div>
      <div className="absolute top-2 left-2 text-[10px] font-mono text-white/80 bg-black/40 backdrop-blur px-1.5 py-0.5 rounded">
        {ad.id.slice(0, 8)}
      </div>
      {ad.ad_type === "video" && (
        <div className="absolute top-2 right-2 text-[10px] font-mono text-white bg-red-600/90 px-1.5 py-0.5 rounded">
          VIDEO
        </div>
      )}
    </div>
  );
}
