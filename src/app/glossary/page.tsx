const terms: Array<{ term: string; def: string }> = [
  { term: "Native ad", def: "An ad that visually matches the editorial design of the page it appears on. Taboola and Outbrain widgets are the canonical example." },
  { term: "Days active", def: "Number of days between an ad's first sighting and its most recent sighting in the corpus." },
  { term: "Vertical", def: "Coarse content category — health, finance, ecom, auto, travel, tech, home, legal, general." },
  { term: "Longevity", def: "How long an ad has been running. Long-running ads are usually profitable; short-runners are usually tests." },
  { term: "CTA", def: "Call to action — the button text on the ad or its landing page (Learn more, Shop now, Sign up)." },
  { term: "Branding text", def: "Sponsor label that appears next to the headline; usually the advertiser name or a content brand." },
  { term: "Ad type", def: "Format: text-only widget unit, image card, or video card." },
  { term: "Network", def: "The native ad exchange running the placement (Taboola, Outbrain, MGID, RevContent)." },
  { term: "First seen / Last seen", def: "Timestamps of the earliest and most recent crawler observation of the creative." },
  { term: "Country list", def: "Set of country codes where the ad has been observed by the crawler. ISO-3166 alpha-2." },
];

export default function GlossaryPage() {
  return (
    <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Glossary</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Plain-English definitions for the terms used throughout the app.
      </p>
      <dl className="mt-6 divide-y divide-border border border-border rounded-lg bg-card">
        {terms.map((t) => (
          <div key={t.term} className="px-5 py-4">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{t.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
