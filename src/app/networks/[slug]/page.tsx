import Link from "next/link";
import { notFound } from "next/navigation";
import { getNetworks, getNetworkDetail, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";
import { AdCard } from "@/components/ad-card";

export async function generateStaticParams() {
  return getNetworks().networks.map((n) => ({ slug: n.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function NetworkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = getNetworkDetail(slug);
  const list = getNetworks().networks.find((n) => n.slug === slug);
  if (!detail || !list) notFound();

  const ads = detail.ads.slice(0, 60);

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto pb-24">
      <nav className="text-xs text-muted-foreground mb-3">
        <Link href="/networks" className="hover:text-foreground">Networks</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{NETWORK_LABELS[slug] ?? slug}</span>
      </nav>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {NETWORK_LABELS[slug] ?? slug}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {detail.count.toLocaleString()} live ads tracked.
          </p>
        </div>
        <Link
          href={`/spy?network=${slug}`}
          className="px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm"
        >
          Open in Spy →
        </Link>
      </div>

      <div className="mt-6 border border-border rounded-lg p-5 bg-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
          Top advertisers
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {list.top_advertisers.slice(0, 16).map((a) => (
            <Link
              key={a.slug}
              href={`/advertisers/${a.slug}`}
              className="flex items-center justify-between border border-border rounded-md px-3 py-2 hover:bg-accent transition text-sm"
            >
              <span className="truncate">{a.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{a.ad_count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 mb-3 flex items-end justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Recent creatives</h2>
        <span className="text-xs text-muted-foreground">{ads.length} of {detail.count.toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={{
              id: ad.id,
              network: ad.network,
              advertiser: ad.branding_text || "",
              advertiser_slug: ad.advertiser_slug,
              title: ad.title,
              thumbnail: ad.thumbnail,
              video_url: ad.video_url,
              countries: ad.countries,
              vertical: ad.vertical || "general",
              ad_type: ad.ad_type,
              days_active: ad.days_active,
              first_seen: ad.first_seen,
              last_seen: ad.last_seen,
            }}
          />
        ))}
      </div>

      <div className="mt-8 text-xs text-muted-foreground">
        Vertical: {VERTICAL_LABELS[ads[0]?.vertical || "general"]}.
      </div>
    </div>
  );
}
