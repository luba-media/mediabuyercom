import Link from "next/link";
import { type Ad, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";
import { Thumbnail } from "./thumbnail";

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      href={`/ad/${ad.id}`}
      className="group block border border-border rounded-lg overflow-hidden bg-card hover:border-foreground/50 hover:shadow-lg hover:shadow-black/30 transition-all"
    >
      <Thumbnail
        id={ad.id}
        src={ad.thumbnail_src ?? null}
        adType={ad.ad_type}
        className="aspect-[16/9] w-full"
      />
      <div className="p-3 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-medium">
            {NETWORK_LABELS[ad.network] ?? ad.network}
          </span>
          <span className="opacity-50">·</span>
          <span>{VERTICAL_LABELS[ad.vertical] ?? ad.vertical}</span>
        </div>
        <div className="text-sm font-medium line-clamp-2 leading-snug min-h-10 text-foreground/95">
          {ad.title || <span className="text-muted-foreground italic">(untitled)</span>}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {ad.advertiser}
        </div>
        <div className="flex items-center justify-between pt-1.5 text-[11px] text-muted-foreground tabular-nums border-t border-border/50">
          <span className={ad.days_active > 30 ? "text-emerald-400 font-medium" : ""}>
            {ad.days_active}d active
          </span>
          <span className="font-mono">
            {ad.countries.slice(0, 3).join(" ")}
            {ad.countries.length > 3 ? ` +${ad.countries.length - 3}` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
