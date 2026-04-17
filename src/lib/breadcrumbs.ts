export type Crumb = { name: string; url: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

const BASE = "https://vanlifekitchens.com";

export function reviewCrumbs(productName: string, productSlug: string, category: string): Crumb[] {
  return [
    { name: "Home", url: BASE },
    { name: "Reviews", url: `${BASE}/reviews` },
    { name: category, url: `${BASE}/reviews` },
    { name: productName, url: `${BASE}/reviews/${productSlug}` },
  ];
}

export function guideCrumbs(title: string, slug: string, category: string): Crumb[] {
  return [
    { name: "Home", url: BASE },
    { name: "Guides", url: `${BASE}/guides` },
    { name: category, url: `${BASE}/guides` },
    { name: title, url: `${BASE}/guides/${slug}` },
  ];
}

export function setupCrumbs(name: string, slug: string): Crumb[] {
  return [
    { name: "Home", url: BASE },
    { name: "Setups", url: `${BASE}/setups` },
    { name: name, url: `${BASE}/setups/${slug}` },
  ];
}

export function categoryCrumbs(categoryName: string, categorySlug: string): Crumb[] {
  return [
    { name: "Home", url: BASE },
    { name: "Reviews", url: `${BASE}/reviews` },
    { name: categoryName, url: `${BASE}/reviews/category/${categorySlug}` },
  ];
}
