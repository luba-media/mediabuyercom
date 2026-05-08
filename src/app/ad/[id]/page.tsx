import Link from "next/link";
import { notFound } from "next/navigation";
import { findAdById, getAllAdIds, NETWORK_LABELS, VERTICAL_LABELS, COUNTRY_NAMES } from "@/lib/data";
import { Thumbnail } from "@/components/thumbnail";

export async function generateStaticParams() {
  return getAllAdIds(120).map(({ id }) => ({ id }));
}

export const dynamicParams = true;

type Params = Promise<{ id: string }>;

export default async function AdPage({ params }: { params: Params }) {
  const { id } = await params;
  const ad = findAdById(id);
  if (!ad) notFound();

  return (
    <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto pb-24">
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
        <Link href="/spy" className="hover:text-foreground">Spy</Link>
        <span>/</span>
        <Link href={`/networks/${ad.network}`} className="hover:text-foreground">
          {NETWORK_LABELS[ad.network] ?? ad.network}
        </Link>
        <span>/</span>
        <span className="font-mono text-foreground/70">{ad.id.slice(0, 8)}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Thumbnail
            id={ad.id}
            src={ad.thumbnail_src}
            adType={ad.ad_type}
            big
            className="aspect-[16/9] w-full rounded-lg border border-border"
          />

          <div className="border border-border rounded-lg p-5 bg-card space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <Tag>{NETWORK_LABELS[ad.network] ?? ad.network}</Tag>
              <Tag>{VERTICAL_LABELS[ad.vertical] ?? ad.vertical}</Tag>
              <Tag>{ad.ad_type}</Tag>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {ad.title || <span className="text-muted-foreground italic">(untitled)</span>}
            </h1>
            {ad.body && <p className="text-muted-foreground">{ad.body}</p>}
            {ad.cta_text && (
              <div className="pt-2">
                <span className="inline-flex items-center px-3 h-8 rounded-md bg-foreground text-background text-sm font-medium">
                  {ad.cta_text}
                </span>
              </div>
            )}
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              Branded text: {ad.branding_text || ad.advertiser}
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Live in {ad.countries.length} countries
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ad.countries.map((cc) => (
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
        </div>

        <aside className="space-y-4">
          <div className="border border-border rounded-lg p-5 bg-card space-y-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Advertiser
            </div>
            <Link
              href={`/advertisers/${ad.advertiser_slug}`}
              className="block text-lg font-semibold hover:underline"
            >
              {ad.advertiser}
            </Link>
            <div className="text-sm text-muted-foreground break-all">
              {ad.advertiser_url || `${ad.advertiser_slug}.example`}
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 bg-card space-y-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Activity
            </div>
            <Row label="First seen" value={fmtDate(ad.first_seen)} />
            <Row label="Last seen" value={fmtDate(ad.last_seen)} />
            <Row label="Days active" value={`${ad.days_active}d`} highlight={ad.days_active > 30} />
            <Row label="Network" value={NETWORK_LABELS[ad.network] ?? ad.network} />
            <Row label="Vertical" value={VERTICAL_LABELS[ad.vertical] ?? ad.vertical} />
            <Row label="Format" value={ad.ad_type} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded bg-accent text-accent-foreground text-[11px] uppercase tracking-wider">
      {children}
    </span>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-emerald-400 tabular-nums" : "tabular-nums"}>{value}</span>
    </div>
  );
}
