import type { Metadata } from "next";
import Link from "next/link";
import { getNetworks, NETWORK_LABELS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Networks — Taboola, Outbrain, MGID, RevContent",
  description:
    "Coverage across the four major native ad networks. Top advertisers, ad counts, hourly-fresh.",
  alternates: { canonical: "/networks" },
};

export default function NetworksPage() {
  const { networks } = getNetworks();

  return (
    <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Networks</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Coverage across the four major native ad networks.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {networks.map((n) => (
          <Link
            key={n.slug}
            href={`/networks/${n.slug}`}
            className="border border-border rounded-lg p-5 bg-card hover:border-foreground/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">{NETWORK_LABELS[n.slug] ?? n.label}</div>
              <div className="text-sm text-muted-foreground tabular-nums">
                {n.ad_count.toLocaleString()} ads
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Top advertisers
              </div>
              <div className="flex flex-wrap gap-1.5">
                {n.top_advertisers.slice(0, 6).map((a) => (
                  <span key={a.slug} className="px-2 py-1 rounded text-xs border border-border">
                    {a.name} <span className="text-muted-foreground">{a.ad_count}</span>
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
