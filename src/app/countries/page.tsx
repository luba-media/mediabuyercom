import Link from "next/link";
import { getCountries, COUNTRY_NAMES } from "@/lib/data";

export default function CountriesPage() {
  const { countries } = getCountries();

  return (
    <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">Countries</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Coverage across {countries.length} markets.
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {countries.map((c) => (
          <Link
            key={c.cc}
            href={`/countries/${c.cc.toLowerCase()}`}
            className="border border-border rounded-md p-3 bg-card hover:border-foreground/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{c.cc}</span>
              <span className="text-xs text-muted-foreground">{c.top_advertisers.length} top</span>
            </div>
            <div className="mt-1 text-sm font-medium truncate">
              {COUNTRY_NAMES[c.cc] ?? c.cc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
