import productsJson from "@/content/products.json";
import categoriesJson from "@/content/categories.json";
import guidesJson from "@/content/guides.json";
import setupsJson from "@/content/setups.json";

export type Product = {
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  score: number;
  price: number;
  priceLabel: string;
  verdict: string;
  image: string;
  amazonAsin: string;
  walmartUrl: string;
  tag?: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  updated: string;
  author: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  image: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  updated?: string;
};

export type Setup = {
  slug: string;
  name: string;
  vanType: string;
  budget: string;
  image: string;
};

export const products = productsJson as unknown as Product[];
export const categories = categoriesJson as Category[];
export const guides = guidesJson as Guide[];
export const setups = setupsJson as Setup[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  "12V Fridges": "fridges",
  Cooktops: "cooktops",
  "Compact Cookware": "cookware",
  "Water Filters": "water",
  "Kitchen Storage": "storage",
  "Solar Cooking": "solar",
  "Coffee Gear": "coffee",
  "Knives & Prep": "knives",
};

export function categoryNameToSlug(name: string): string | undefined {
  return CATEGORY_NAME_TO_SLUG[name];
}

export function getProductsByCategorySlug(slug: string): Product[] {
  return products.filter((p) => categoryNameToSlug(p.category) === slug);
}
