import type { MetadataRoute } from "next";
import { products, guides, setups, categories } from "@/lib/data";
import matchupsData from "@/content/matchups.json";

type Matchup = { slug: string };
const matchups = matchupsData as Matchup[];

const BASE_URL = "https://vanlifekitchens.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/reviews`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/reviews/compare`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/setups`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools/budget`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/layout`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/power`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const reviewRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: g.updated ? new Date(g.updated) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const setupRoutes: MetadataRoute.Sitemap = setups.map((s) => ({
    url: `${BASE_URL}/setups/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/reviews/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const compareRoutes: MetadataRoute.Sitemap = matchups.map((m) => ({
    url: `${BASE_URL}/compare/${m.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...reviewRoutes,
    ...guideRoutes,
    ...setupRoutes,
    ...categoryRoutes,
    ...compareRoutes,
  ];
}
