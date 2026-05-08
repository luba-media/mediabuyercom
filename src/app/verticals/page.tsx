import Link from "next/link";
import { getVerticals, VERTICAL_LABELS } from "@/lib/data";

export default function VerticalsPage() {
  const { verticals } = getVerticals();
  const total = verticals.reduce((s, v) => s + v.ad_count, 0);

  return (
    <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Verticals</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Distribution of {total.toLocaleString()} live ads across {verticals.length} verticals.
      </p>
      <div className="mt-6 space-y-2">
        {verticals.map((v) => {
          const pct = (v.ad_count / total) * 100;
          return (
            <Link
              key={v.vertical}
              href={`/verticals/${v.vertical}`}
              className="block border border-border rounded-lg p-4 bg-card hover:border-foreground/40 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">{VERTICAL_LABELS[v.vertical] ?? v.vertical}</div>
                <div className="text-sm text-muted-foreground tabular-nums">
                  {v.ad_count.toLocaleString()} ads · {pct.toFixed(1)}%
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground/70"
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
