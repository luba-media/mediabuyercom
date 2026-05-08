import Link from "next/link";
import { notFound } from "next/navigation";
import { getAds, getVerticals, VERTICAL_LABELS } from "@/lib/data";
import { AdCard } from "@/components/ad-card";

export async function generateStaticParams() {
  return getVerticals().verticals.map((v) => ({ slug: v.vertical }));
}

type Params = Promise<{ slug: string }>;

export default async function VerticalPage({ params }: { params: Params }) {
  const { slug } = await params;
  const v = getVerticals().verticals.find((x) => x.vertical === slug);
  if (!v) notFound();
  const ads = getAds(20).filter((a) => a.vertical === slug).slice(0, 60);

  return (
    <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto pb-24">
      <nav className="text-xs text-muted-foreground mb-3">
        <Link href="/verticals" className="hover:text-foreground">Verticals</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{VERTICAL_LABELS[slug] ?? slug}</span>
      </nav>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {VERTICAL_LABELS[slug] ?? slug}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {v.ad_count.toLocaleString()} live ads.
          </p>
        </div>
        <Link
          href={`/spy?vertical=${slug}`}
          className="px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm"
        >
          Open in Spy →
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
      {ads.length === 0 && (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <div className="text-lg font-medium">Nothing in this slice yet</div>
          <p className="text-sm text-muted-foreground mt-1">
            Try another vertical or open the full Spy.
          </p>
        </div>
      )}
    </div>
  );
}
