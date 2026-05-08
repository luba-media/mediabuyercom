import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdvertiserDetail,
  listAdvertiserSlugs,
  NETWORK_LABELS,
  VERTICAL_LABELS,
  COUNTRY_NAMES,
} from "@/lib/data";

export async function generateStaticParams() {
  return listAdvertiserSlugs().slice(0, 200).map((slug) => ({ slug }));
}

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export default async function AdvertiserPage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = getAdvertiserDetail(slug);
  if (!a) notFound();

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto pb-24">
      <nav className="text-xs text-muted-foreground mb-3">
        <Link href="/advertisers" className="hover:text-foreground">Advertisers</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{a.name}</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight">{a.name}</h1>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <Tag>{a.ad_count.toLocaleString()} ads</Tag>
        {a.networks.map((n) => (
          <Tag key={n}>{NETWORK_LABELS[n] ?? n}</Tag>
        ))}
        {a.verticals.map((v) => (
          <Tag key={v} subtle>{VERTICAL_LABELS[v] ?? v}</Tag>
        ))}
      </div>

      {a.countries.length > 0 && (
        <div className="mt-6 border border-border rounded-lg p-4 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Active in
          </div>
          <div className="flex flex-wrap gap-1.5">
            {a.countries.map((cc) => (
              <Link
                key={cc}
                href={`/countries/${cc.toLowerCase()}`}
                className="px-2 py-1 rounded text-xs border border-border hover:bg-accent transition"
                title={COUNTRY_NAMES[cc] ?? cc}
              >
                {cc}
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold tracking-tight mb-3">Creatives</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {a.ads.slice(0, 60).map((ad) => {
          const seed = parseInt(ad.id.slice(0, 6), 16) || 0;
          const h1 = seed % 360;
          const h2 = (h1 + 60) % 360;
          return (
            <Link
              key={ad.id}
              href={`/ad/${ad.id}`}
              className="group block border border-border rounded-lg overflow-hidden bg-card hover:border-foreground/40 transition"
            >
              <div
                className="aspect-[16/9] w-full"
                style={{
                  background: `linear-gradient(135deg, hsl(${h1}, 50%, 20%), hsl(${h2}, 60%, 35%))`,
                }}
              />
              <div className="p-3 space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {NETWORK_LABELS[ad.network] ?? ad.network} · {ad.countries.slice(0, 3).join(" ")}
                </div>
                <div className="text-sm font-medium line-clamp-2 leading-snug min-h-10">
                  {ad.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Tag({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
  return (
    <span
      className={
        "px-2 py-0.5 rounded text-[11px] uppercase tracking-wider " +
        (subtle ? "border border-border text-muted-foreground" : "bg-accent text-accent-foreground")
      }
    >
      {children}
    </span>
  );
}
