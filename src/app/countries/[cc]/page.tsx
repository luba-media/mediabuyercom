import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountries, getCountryDetail, COUNTRY_NAMES, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";
import { AdCard } from "@/components/ad-card";

export async function generateStaticParams() {
  return getCountries().countries.map((c) => ({ cc: c.cc.toLowerCase() }));
}

type Params = Promise<{ cc: string }>;

export default async function CountryPage({ params }: { params: Params }) {
  const { cc } = await params;
  const ccUpper = cc.toUpperCase();
  const detail = getCountryDetail(cc);
  const meta = getCountries().countries.find((c) => c.cc === ccUpper);
  if (!detail || !meta) notFound();

  const ads = (detail.ads || []).slice(0, 60);

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto pb-24">
      <nav className="text-xs text-muted-foreground mb-3">
        <Link href="/countries" className="hover:text-foreground">Countries</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{ccUpper}</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight">
        {COUNTRY_NAMES[ccUpper] ?? ccUpper}
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Live native ads visible in {ccUpper}.
      </p>

      <div className="mt-6 border border-border rounded-lg p-5 bg-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
          Top advertisers in {ccUpper}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {meta.top_advertisers.slice(0, 16).map((a) => (
            <Link
              key={a.slug}
              href={`/advertisers/${a.slug}`}
              className="border border-border rounded-md px-3 py-2 hover:bg-accent transition text-sm truncate"
            >
              {a.name}
            </Link>
          ))}
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold tracking-tight">Recent creatives</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {ads.map((ad) => {
          const a = ad as unknown as Partial<{
            id: string; network: string; advertiser: string; advertiser_slug: string;
            title: string; thumbnail: string | null; video_url: string | null;
            countries: string[]; vertical: string; ad_type: string;
            days_active: number; first_seen: string; last_seen: string;
          }>;
          return (
            <AdCard
              key={a.id}
              ad={{
                id: a.id ?? "",
                network: a.network ?? "",
                advertiser: a.advertiser ?? "",
                advertiser_slug: a.advertiser_slug ?? "",
                title: a.title ?? "",
                thumbnail: a.thumbnail ?? null,
                video_url: a.video_url ?? null,
                countries: a.countries ?? [ccUpper],
                vertical: a.vertical ?? "general",
                ad_type: a.ad_type ?? "text",
                days_active: a.days_active ?? 0,
                first_seen: a.first_seen ?? a.last_seen ?? "",
                last_seen: a.last_seen ?? "",
              }}
            />
          );
        })}
      </div>
      {ads.length === 0 && (
        <div className="text-sm text-muted-foreground">
          No ad rollups stored for this country yet.
        </div>
      )}
      <div className="mt-8 text-xs text-muted-foreground">
        Vertical mix: {Object.keys(VERTICAL_LABELS).slice(0, 4).map((v) => VERTICAL_LABELS[v]).join(", ")} and more · networks: {Object.values(NETWORK_LABELS).join(", ")}.
      </div>
    </div>
  );
}
