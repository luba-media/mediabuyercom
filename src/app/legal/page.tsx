export default function LegalPage() {
  return (
    <div className="px-4 sm:px-6 py-10 max-w-3xl mx-auto pb-24 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold tracking-tight">Legal</h1>
      <h2 className="mt-6 text-lg font-semibold">Terms</h2>
      <p className="text-muted-foreground mt-2">
        mediabuyer is a tool for performance-marketing intelligence. Use it to research
        creatives, advertisers and trends. Don&apos;t scrape the site or attempt to bypass
        rate limits.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Privacy</h2>
      <p className="text-muted-foreground mt-2">
        We collect the minimum needed to run accounts and billing. We don&apos;t sell or
        share user data with third parties.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Sources</h2>
      <p className="text-muted-foreground mt-2">
        Ad metadata is observed from public ad widgets across the four major native networks.
        Trademarks belong to their respective owners.
      </p>
    </div>
  );
}
