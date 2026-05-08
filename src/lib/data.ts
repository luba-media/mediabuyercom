import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "public", "data", "spy");

// Ad shape from ads-page-N.json (the lightweight feed)
export type Ad = {
  id: string;
  network: string;
  advertiser: string;
  advertiser_slug: string;
  title: string;
  thumbnail: string | null;
  video_url: string | null;
  countries: string[];
  vertical: string;
  ad_type: string;
  days_active: number;
  first_seen: string;
  last_seen: string;
};

// Full ad shape from by-network-detail-<slug>.json
export type AdDetail = Ad & {
  body?: string | null;
  thumbnail_src?: string | null;
  branding_text?: string | null;
  advertiser_url?: string | null;
  cta_text?: string | null;
  ecpa?: number;
};

export type Network = {
  slug: string;
  label: string;
  ad_count: number;
  top_advertisers: Array<{ slug: string; name: string; ad_count: number }>;
};

export type Vertical = { vertical: string; ad_count: number };

export type Country = {
  cc: string;
  top_advertisers: Array<{ slug: string; name: string }>;
};

export type Advertiser = {
  slug: string;
  name: string;
  ad_count: number;
  networks: string[];
  countries: string[];
  verticals: string[];
};

export type Index = {
  last_updated: string;
  totals: {
    ads: number;
    advertisers: number;
    networks: number;
    countries: number;
    ad_pages: number;
    page_size: number;
  };
  per_network: Record<string, number>;
};

function readJSON<T>(rel: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, rel), "utf8")) as T;
}

export function getIndex(): Index {
  return readJSON<Index>("index.json");
}

export function getNetworks(): { networks: Network[] } {
  return readJSON("networks.json");
}

export function getVerticals(): { verticals: Vertical[] } {
  return readJSON("verticals.json");
}

export function getCountries(): { countries: Country[] } {
  return readJSON("countries.json");
}

export function getAdvertisers(): { count: number; advertisers: Advertiser[] } {
  return readJSON("advertisers.json");
}

export function getAdsPage(page: number): { page: number; page_size: number; ads: Ad[] } {
  return readJSON(`ads-page-${page}.json`);
}

// Aggregate the first N pages of ads — used as the corpus for browse / search.
export function getAds(maxPages = 10): Ad[] {
  const out: Ad[] = [];
  for (let p = 1; p <= maxPages; p++) {
    try {
      const data = getAdsPage(p);
      out.push(...data.ads);
    } catch {
      break;
    }
  }
  return out;
}

export function getNetworkDetail(
  slug: string
): { network: string; count: number; ads: AdDetail[] } | null {
  const file = path.join(DATA_DIR, `by-network-detail-${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getNetworkAds(
  slug: string
): { network: string; count: number; ads: Ad[] } | null {
  const file = path.join(DATA_DIR, "by-network", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getAdvertiserDetail(slug: string): {
  slug: string;
  name: string;
  ad_count: number;
  networks: string[];
  countries: string[];
  verticals: string[];
  ads: Array<{
    id: string;
    network: string;
    thumbnail: string | null;
    video_url: string | null;
    title: string;
    countries: string[];
    last_seen: string;
  }>;
} | null {
  const file = path.join(DATA_DIR, "by-advertiser", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function listAdvertiserSlugs(): string[] {
  const dir = path.join(DATA_DIR, "by-advertiser");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getCountryDetail(cc: string): {
  cc: string;
  ads: Ad[];
} | null {
  const file = path.join(DATA_DIR, "by-country", `${cc.toLowerCase()}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Find one ad detail by id by scanning network-detail files.
export function findAdById(id: string): AdDetail | null {
  for (const slug of ["taboola", "outbrain", "mgid", "revcontent"]) {
    const det = getNetworkDetail(slug);
    if (!det) continue;
    const hit = det.ads.find((a) => a.id === id);
    if (hit) return hit;
  }
  return null;
}

export function getAllAdIds(limit = 500): Array<{ id: string; network: string }> {
  const out: Array<{ id: string; network: string }> = [];
  for (const slug of ["taboola", "outbrain", "mgid", "revcontent"]) {
    const det = getNetworkDetail(slug);
    if (!det) continue;
    for (const a of det.ads.slice(0, Math.ceil(limit / 4))) {
      out.push({ id: a.id, network: a.network });
    }
  }
  return out.slice(0, limit);
}

export function thumbnailUrl(ad: { thumbnail: string | null; thumbnail_src?: string | null }): string {
  if (ad.thumbnail_src) return ad.thumbnail_src;
  if (ad.thumbnail && ad.thumbnail.startsWith("http")) return ad.thumbnail;
  // Fallback placeholder gradient — the /_img/<network>/<id> path in the source data
  // is served by the upstream mediabuyer site, which we don't proxy here.
  return "";
}

export const COUNTRY_NAMES: Record<string, string> = {
  AT: "Austria", AU: "Australia", BE: "Belgium", BG: "Bulgaria", BR: "Brazil",
  CA: "Canada", CH: "Switzerland", CL: "Chile", CZ: "Czechia", DE: "Germany",
  DK: "Denmark", ES: "Spain", FI: "Finland", FR: "France", GB: "United Kingdom",
  GR: "Greece", HU: "Hungary", IE: "Ireland", IT: "Italy", JP: "Japan",
  KR: "South Korea", MX: "Mexico", NL: "Netherlands", NO: "Norway", NZ: "New Zealand",
  PL: "Poland", PT: "Portugal", QA: "Qatar", RO: "Romania", SE: "Sweden",
  SG: "Singapore", SK: "Slovakia", TR: "Turkey", TW: "Taiwan", US: "United States",
  ZA: "South Africa",
};

export const NETWORK_LABELS: Record<string, string> = {
  taboola: "Taboola",
  outbrain: "Outbrain",
  mgid: "MGID",
  revcontent: "RevContent",
};

export const VERTICAL_LABELS: Record<string, string> = {
  general: "General",
  health: "Health",
  tech: "Tech",
  auto: "Auto",
  finance: "Finance",
  ecom: "Ecom",
  travel: "Travel",
  home: "Home",
  legal: "Legal",
};
