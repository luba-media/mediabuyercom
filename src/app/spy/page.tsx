import type { Metadata } from "next";
import Link from "next/link";
import { getAds, getNetworks, getVerticals, NETWORK_LABELS, VERTICAL_LABELS, COUNTRY_NAMES } from "@/lib/data";
import { AdCard } from "@/components/ad-card";

export const metadata: Metadata = {
  title: "Spy — browse 20,000 native ads",
  description:
    "Filter live Taboola, Outbrain, MGID and RevContent creatives by network, vertical, country, ad type and longevity. Sortable, hourly-fresh.",
  alternates: { canonical: "/spy" },
};

type SP = Promise<{
  q?: string;
  network?: string;
  vertical?: string;
  cc?: string;
  type?: string;
  longevity?: string;
  sort?: string;
  page?: string;
}>;

const PAGE_SIZE = 48;

export default async function SpyPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const ads = getAds(20); // ~4000 ads as the browse corpus
  const { networks } = getNetworks();
  const { verticals } = getVerticals();

  const q = (sp.q ?? "").toLowerCase().trim();
  const networkFilter = sp.network ?? "";
  const verticalFilter = sp.vertical ?? "";
  const ccFilter = (sp.cc ?? "").toUpperCase();
  const typeFilter = sp.type ?? "";
  const longevity = sp.longevity ?? "";
  const sort = sp.sort ?? "newest";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  let filtered = ads;
  if (q) filtered = filtered.filter((a) => a.title.toLowerCase().includes(q) || a.advertiser.toLowerCase().includes(q));
  if (networkFilter) filtered = filtered.filter((a) => a.network === networkFilter);
  if (verticalFilter) filtered = filtered.filter((a) => a.vertical === verticalFilter);
  if (ccFilter) filtered = filtered.filter((a) => a.countries.includes(ccFilter));
  if (typeFilter) filtered = filtered.filter((a) => a.ad_type === typeFilter);
  if (longevity === "1-7") filtered = filtered.filter((a) => a.days_active <= 7);
  else if (longevity === "8-30") filtered = filtered.filter((a) => a.days_active >= 8 && a.days_active <= 30);
  else if (longevity === "31") filtered = filtered.filter((a) => a.days_active > 30);

  if (sort === "newest") filtered = filtered.slice().sort((a, b) => b.last_seen.localeCompare(a.last_seen));
  else if (sort === "oldest") filtered = filtered.slice().sort((a, b) => a.first_seen.localeCompare(b.first_seen));
  else if (sort === "longest") filtered = filtered.slice().sort((a, b) => b.days_active - a.days_active);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  const ccTop = Array.from(
    ads.reduce((m, a) => {
      for (const c of a.countries) m.set(c, (m.get(c) ?? 0) + 1);
      return m;
    }, new Map<string, number>()).entries()
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([cc]) => cc);

  function makeQS(over: Record<string, string | undefined>) {
    const merged: Record<string, string> = {};
    for (const [k, v] of Object.entries({
      q,
      network: networkFilter,
      vertical: verticalFilter,
      cc: ccFilter,
      type: typeFilter,
      longevity,
      sort,
      page: String(page),
      ...over,
    })) {
      if (v) merged[k] = v;
    }
    const qs = new URLSearchParams(merged).toString();
    return `/spy${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto pb-24">
      <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Spy</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {total.toLocaleString()} ads match · sorted by {labelSort(sort)}
          </p>
        </div>
        <form action="/spy" role="search" className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="spy-q" className="sr-only">Search ad titles and advertisers</label>
          <input
            id="spy-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search title, advertiser…"
            className="bg-muted/60 border border-border rounded-md px-3 h-9 text-sm w-full sm:w-72 outline-none focus:border-foreground/40 focus:bg-muted transition"
          />
          {networkFilter && <input type="hidden" name="network" value={networkFilter} />}
          {verticalFilter && <input type="hidden" name="vertical" value={verticalFilter} />}
          {ccFilter && <input type="hidden" name="cc" value={ccFilter} />}
          {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
          {longevity && <input type="hidden" name="longevity" value={longevity} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
        </form>
      </div>

      <div className="border border-border rounded-lg p-3 mb-6 bg-card">
        <FilterRow label="Network">
          <Chip href={makeQS({ network: undefined, page: "1" })} active={!networkFilter}>All</Chip>
          {networks.map((n) => (
            <Chip key={n.slug} href={makeQS({ network: n.slug, page: "1" })} active={networkFilter === n.slug}>
              {NETWORK_LABELS[n.slug] ?? n.label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Vertical">
          <Chip href={makeQS({ vertical: undefined, page: "1" })} active={!verticalFilter}>All</Chip>
          {verticals.map((v) => (
            <Chip key={v.vertical} href={makeQS({ vertical: v.vertical, page: "1" })} active={verticalFilter === v.vertical}>
              {VERTICAL_LABELS[v.vertical] ?? v.vertical}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Country">
          <Chip href={makeQS({ cc: undefined, page: "1" })} active={!ccFilter}>All</Chip>
          {ccTop.map((cc) => (
            <Chip key={cc} href={makeQS({ cc, page: "1" })} active={ccFilter === cc}>
              {cc}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Type">
          {[
            ["", "All"],
            ["text", "Text"],
            ["image", "Image"],
            ["video", "Video"],
          ].map(([v, label]) => (
            <Chip key={v || "all"} href={makeQS({ type: v || undefined, page: "1" })} active={typeFilter === v}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Longevity">
          {[
            ["", "All"],
            ["1-7", "1-7d"],
            ["8-30", "8-30d"],
            ["31", "31d+"],
          ].map(([v, label]) => (
            <Chip key={v || "all"} href={makeQS({ longevity: v || undefined, page: "1" })} active={longevity === v}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Sort">
          {[
            ["newest", "Newest"],
            ["oldest", "Oldest"],
            ["longest", "Longest running"],
          ].map(([v, label]) => (
            <Chip key={v} href={makeQS({ sort: v, page: "1" })} active={sort === v}>
              {label}
            </Chip>
          ))}
        </FilterRow>
      </div>

      {slice.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <div className="text-lg font-medium">No ads match</div>
          <p className="text-sm text-muted-foreground mt-1">
            Try clearing a filter or broadening your search.
          </p>
          <Link href="/spy" className="inline-block mt-4 px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm">
            Reset filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {slice.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <PageLink href={makeQS({ page: String(Math.max(1, page - 1)) })} disabled={page === 1}>← Prev</PageLink>
          <span className="text-sm text-muted-foreground tabular-nums">
            Page {page} / {totalPages}
          </span>
          <PageLink href={makeQS({ page: String(Math.min(totalPages, page + 1)) })} disabled={page >= totalPages}>Next →</PageLink>
        </div>
      )}

      {ccFilter && COUNTRY_NAMES[ccFilter] && (
        <div className="mt-4 text-xs text-muted-foreground">
          Showing ads visible in {COUNTRY_NAMES[ccFilter]}.
        </div>
      )}
    </div>
  );
}

function labelSort(s: string) {
  if (s === "oldest") return "first seen";
  if (s === "longest") return "longest running";
  return "newest";
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-1.5 border-b border-border last:border-0">
      <div className="w-16 sm:w-20 shrink-0 text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold pt-1.5">
        {label}
      </div>
      <div className="flex sm:flex-wrap gap-1.5 flex-1 overflow-x-auto thin-scroll -mr-3 pr-3 sm:mr-0 sm:pr-0 sm:overflow-x-visible">
        {children}
      </div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={
        "px-2.5 py-1 rounded-md text-xs border transition whitespace-nowrap shrink-0 " +
        (active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:bg-accent")
      }
    >
      {children}
    </Link>
  );
}

function PageLink({ href, disabled, children }: { href: string; disabled?: boolean; children: React.ReactNode }) {
  if (disabled)
    return <span className="px-3 h-9 leading-9 rounded-md border border-border text-muted-foreground/50 text-sm">{children}</span>;
  return (
    <Link
      href={href}
      className="px-3 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm"
    >
      {children}
    </Link>
  );
}
