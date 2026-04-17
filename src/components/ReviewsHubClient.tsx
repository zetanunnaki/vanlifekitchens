"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Category, Product } from "@/lib/data";
import { categoryNameToSlug } from "@/lib/data";

type SortKey = "newest" | "highest" | "cheapest" | "priciest";

export function ReviewsHubClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("highest");

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? [...products]
        : products.filter((p) => categoryNameToSlug(p.category) === activeCategory);

    switch (sort) {
      case "newest":
        return list.sort((a, b) => b.updated.localeCompare(a.updated));
      case "highest":
        return list.sort((a, b) => b.score - a.score);
      case "cheapest":
        return list.sort((a, b) => a.price - b.price);
      case "priciest":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [products, activeCategory, sort]);

  return (
    <>
      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            activeCategory === "all"
              ? "bg-accent-orange text-white"
              : "bg-white text-earth-700 border border-earth-200 hover:border-earth-300"
          }`}
        >
          All ({products.length})
        </button>
        {categories.map((c) => {
          const count = products.filter((p) => categoryNameToSlug(p.category) === c.slug).length;
          if (count === 0) return null;
          return (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === c.slug
                  ? "bg-accent-orange text-white"
                  : "bg-white text-earth-700 border border-earth-200 hover:border-earth-300"
              }`}
            >
              {c.name} ({count})
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-earth-500">
            Sort:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-earth-200 bg-white px-4 py-2 text-sm font-semibold text-earth-700 focus:outline-none focus:ring-2 focus:ring-accent-orange"
          >
            <option value="highest">Highest rated</option>
            <option value="newest">Newest</option>
            <option value="cheapest">Price: low to high</option>
            <option value="priciest">Price: high to low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-earth-500">No products in this category yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
