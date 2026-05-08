import type { MetadataRoute } from "next";
import {
  getNetworks,
  getVerticals,
  getCountries,
  getAllAdIds,
  listAdvertiserSlugs,
  getIndex,
} from "@/lib/data";

const SITE_URL = "https://mediabuyercom.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const idx = getIndex();
  const lastModified = idx.last_updated ? new Date(idx.last_updated) : new Date();

  const staticPages = [
    "",
    "/spy",
    "/trends",
    "/pulse",
    "/networks",
    "/verticals",
    "/advertisers",
    "/countries",
    "/glossary",
    "/pricing",
    "/legal",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified,
    changeFrequency: "hourly" as const,
    priority: p === "" ? 1.0 : 0.8,
  }));

  const networkPages = getNetworks().networks.map((n) => ({
    url: `${SITE_URL}/networks/${n.slug}`,
    lastModified,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const verticalPages = getVerticals().verticals.map((v) => ({
    url: `${SITE_URL}/verticals/${v.vertical}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const countryPages = getCountries().countries.map((c) => ({
    url: `${SITE_URL}/countries/${c.cc.toLowerCase()}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));

  // Cap advertisers + ads to keep sitemap reasonable.
  const advertiserPages = listAdvertiserSlugs()
    .slice(0, 200)
    .map((s) => ({
      url: `${SITE_URL}/advertisers/${s}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.4,
    }));

  const adPages = getAllAdIds(120).map(({ id }) => ({
    url: `${SITE_URL}/ad/${id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.3,
  }));

  return [
    ...staticPages,
    ...networkPages,
    ...verticalPages,
    ...countryPages,
    ...advertiserPages,
    ...adPages,
  ];
}
