import Link from "next/link";
import { getAdvertisers, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";

export default function AdvertisersPage() {
  const { count, advertisers } = getAdvertisers();
  const top = advertisers.slice(0, 80);

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Advertisers</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Top {top.length} of {count.toLocaleString()} advertisers tracked.
      </p>
      <div className="mt-6 border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-semibold px-4 py-3">Advertiser</th>
              <th className="text-right font-semibold px-4 py-3">Ads</th>
              <th className="text-left font-semibold px-4 py-3 hidden md:table-cell">Networks</th>
              <th className="text-left font-semibold px-4 py-3 hidden lg:table-cell">Verticals</th>
            </tr>
          </thead>
          <tbody>
            {top.map((a) => (
              <tr key={a.slug} className="border-b border-border last:border-0 hover:bg-accent/40 transition">
                <td className="px-4 py-3">
                  <Link href={`/advertisers/${a.slug}`} className="font-medium hover:underline">
                    {a.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{a.ad_count.toLocaleString()}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                  {a.networks.map((n) => NETWORK_LABELS[n] ?? n).join(", ")}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                  {a.verticals.slice(0, 3).map((v) => VERTICAL_LABELS[v] ?? v).join(", ")}
                  {a.verticals.length > 3 ? ` +${a.verticals.length - 3}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
