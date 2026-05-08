import Link from "next/link";
import { getIndex, getNetworks, getVerticals, getAds, NETWORK_LABELS, VERTICAL_LABELS } from "@/lib/data";
import { Thumbnail } from "@/components/thumbnail";

export default function HomePage() {
  const idx = getIndex();
  const { networks } = getNetworks();
  const { verticals } = getVerticals();
  const ribbon = getAds(1)
    .filter((a) => a.thumbnail_src)
    .slice(0, 12);

  return (
    <div className="relative">
      {/* Hero glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 800px 500px at 50% 0%, rgba(16,185,129,0.10), transparent 70%), radial-gradient(ellipse 600px 400px at 80% 10%, rgba(59,130,246,0.08), transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {idx.totals.ads.toLocaleString()} native ads tracked · updated hourly
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Native ad intelligence
            <br />
            <span className="text-muted-foreground">for performance marketers.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover winning Taboola, Outbrain, MGID and RevContent campaigns. Filter by network,
            vertical, country, ad type and longevity. See what is working — right now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/spy"
              className="inline-flex items-center px-6 h-11 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition shadow-lg shadow-foreground/10"
            >
              Browse the spy
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 h-11 rounded-md border border-border hover:bg-accent transition"
            >
              See pricing
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto text-sm">
            <Stat label="Native ads" value={idx.totals.ads.toLocaleString()} />
            <Stat label="Advertisers" value={idx.totals.advertisers.toLocaleString()} />
            <Stat label="Networks" value={String(idx.totals.networks)} />
            <Stat label="Countries" value={String(idx.totals.countries)} />
          </div>
        </section>

        {ribbon.length > 0 && (
          <section className="mt-14 -mx-4 sm:mx-0">
            <div className="px-4 sm:px-0 mb-3 flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Live now · sample
              </div>
              <Link href="/spy" className="text-xs text-muted-foreground hover:text-foreground transition">
                View all →
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 sm:px-0 pb-3 thin-scroll snap-x snap-mandatory">
              {ribbon.map((ad) => (
                <Link
                  key={ad.id}
                  href={`/ad/${ad.id}`}
                  className="shrink-0 w-44 sm:w-56 snap-start rounded-lg overflow-hidden border border-border bg-card hover:border-foreground/40 transition"
                >
                  <Thumbnail
                    id={ad.id}
                    src={ad.thumbnail_src ?? null}
                    adType={ad.ad_type}
                    className="aspect-[16/9] w-full"
                  />
                  <div className="p-2 text-[11px] text-muted-foreground truncate">
                    {NETWORK_LABELS[ad.network] ?? ad.network} · {ad.advertiser}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      <section className="mt-20">
        <SectionHeader
          eyebrow="Coverage"
          title="Every major native ad network"
          subtitle="One subscription. Hourly crawls. Honest data."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {networks.map((n) => (
            <Link
              key={n.slug}
              href={`/networks/${n.slug}`}
              className="border border-border rounded-lg p-5 bg-card hover:border-foreground/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Network
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition">
                  →
                </span>
              </div>
              <div className="mt-2 text-xl font-semibold">
                {NETWORK_LABELS[n.slug] ?? n.label}
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {n.ad_count.toLocaleString()} live ads
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          eyebrow="Verticals"
          title="Sliced by what matters"
          subtitle="Network, vertical, country, ad type, longevity."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {verticals.map((v) => (
            <Link
              key={v.vertical}
              href={`/verticals/${v.vertical}`}
              className="flex items-center justify-between border border-border rounded-md px-4 py-3 hover:bg-accent transition"
            >
              <div className="font-medium">{VERTICAL_LABELS[v.vertical] ?? v.vertical}</div>
              <div className="text-sm text-muted-foreground tabular-nums">
                {v.ad_count.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 border border-border rounded-xl p-8 lg:p-12 bg-card">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight">Built by media buyers.</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              No fluff. No SEO walls of text. Just the freshest native creatives, sortable filters,
              and the longevity signals you need to bid with confidence.
            </p>
          </div>
          <div className="flex lg:justify-end items-center">
            <Link
              href="/spy"
              className="inline-flex items-center px-5 h-11 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition"
            >
              Start exploring →
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-md p-3 sm:p-4 bg-card/50 backdrop-blur-sm">
      <div className="text-lg sm:text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
