import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — plans for media buyers",
  description:
    "Starter, Pro and Agency plans. Cancel anytime. Hourly-fresh native ad data across Taboola, Outbrain, MGID and RevContent.",
  alternates: { canonical: "/pricing" },
};

const tiers = [
  {
    name: "Starter",
    blurb: "For solo affiliates getting started with native.",
    price: "$39",
    cadence: "/mo",
    features: [
      "Browse 4 networks",
      "Basic filters (network, country, type)",
      "Save 100 ads",
      "30-day history",
      "CSV export",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    blurb: "For serious media buyers who need every edge.",
    price: "$79",
    cadence: "/mo",
    features: [
      "Unlimited search",
      "Advanced filters + longevity",
      "Unlimited saves & collections",
      "90-day history",
      "Priority data freshness",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Agency",
    blurb: "For teams that need API access and deeper data.",
    price: "$149",
    cadence: "/mo",
    features: [
      "Everything in Pro",
      "API access",
      "365-day history",
      "5 team seats",
      "Priority support",
    ],
    cta: "Contact us",
    highlight: false,
  },
];

const faq = [
  {
    q: "Which networks do you cover?",
    a: "Taboola, Outbrain, MGID and RevContent. Push and pop networks are not on the roadmap.",
  },
  {
    q: "How fresh is the data?",
    a: "Crawlers run hourly. New creatives typically appear within 1–2 hours of going live.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No long-term contracts. Cancel from your account and keep access until the end of the billing period.",
  },
  {
    q: "Do you store advertiser landing pages?",
    a: "We store the public ad creative metadata (title, body, CTA, country list, days active). We don't proxy or rehost landing pages.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards through Stripe. Invoicing available on Agency plans.",
  },
  {
    q: "Do you offer a trial?",
    a: "There's a free read-only browse on /spy. Paid features unlock with a subscription.",
  },
];

export default function PricingPage() {
  return (
    <div className="px-4 sm:px-6 py-12 max-w-6xl mx-auto pb-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Simple pricing for media buyers
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick the plan that matches your workflow. Cancel anytime.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={
              "border rounded-xl p-6 bg-card flex flex-col " +
              (t.highlight ? "border-foreground/60 shadow-lg" : "border-border")
            }
          >
            {t.highlight && (
              <div className="self-start mb-3 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-foreground text-background font-semibold">
                Most popular
              </div>
            )}
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <p className="text-sm text-muted-foreground mt-1 min-h-10">{t.blurb}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
              <span className="text-muted-foreground">{t.cadence}</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-emerald-400"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/spy"
              className={
                "mt-6 inline-flex items-center justify-center h-10 rounded-md font-medium transition " +
                (t.highlight
                  ? "bg-foreground text-background hover:opacity-90"
                  : "border border-border hover:bg-accent")
              }
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently asked</h2>
        <dl className="mt-6 divide-y divide-border border border-border rounded-lg bg-card">
          {faq.map((f) => (
            <div key={f.q} className="px-5 py-4">
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
