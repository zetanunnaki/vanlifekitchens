import type { MetadataRoute } from "next";
import { products, guides, setups, categories } from "@/lib/data";
import matchupsData from "@/content/matchups.json";

type Matchup = { slug: string };
const matchups = matchupsData as Matchup[];

const BASE_URL = "https://vanlifekitchens.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/reviews` },
    { url: `${BASE_URL}/reviews/compare` },
    { url: `${BASE_URL}/guides` },
    { url: `${BASE_URL}/setups` },
    { url: `${BASE_URL}/tools` },
    { url: `${BASE_URL}/tools/budget` },
    { url: `${BASE_URL}/tools/layout` },
    { url: `${BASE_URL}/tools/power` },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/contact` },
    { url: `${BASE_URL}/wishlist` },
    { url: `${BASE_URL}/affiliate-disclosure` },
    { url: `${BASE_URL}/privacy` },
    { url: `${BASE_URL}/terms` },
  ];

  const reviewRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    lastModified: new Date(p.updated),
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: g.updated ? new Date(g.updated) : new Date(),
  }));

  const setupRoutes: MetadataRoute.Sitemap = setups.map((s) => ({
    url: `${BASE_URL}/setups/${s.slug}`,
    lastModified: s.updated ? new Date(s.updated) : new Date(),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/reviews/category/${c.slug}`,
  }));

  const compareRoutes: MetadataRoute.Sitemap = matchups.map((m) => ({
    url: `${BASE_URL}/compare/${m.slug}`,
  }));

  const authorSlugs = ["maya", "theo", "cassidy"];
  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${BASE_URL}/authors/${slug}`,
  }));

  return [
    ...staticRoutes,
    ...reviewRoutes,
    ...guideRoutes,
    ...setupRoutes,
    ...categoryRoutes,
    ...compareRoutes,
    ...authorRoutes,
  ];
}
