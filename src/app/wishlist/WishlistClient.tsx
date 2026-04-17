"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { products } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/ProductCard";

export function WishlistClient() {
  const { slugs, count, clear } = useWishlist();
  // Defer first render until client hydration to avoid mismatches since
  // localStorage is not available during SSR/static rendering.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-earth-400 text-sm">
        Loading your saved items…
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="bg-white border border-earth-100 rounded-3xl p-12 md:p-16 text-center shadow-soft-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-100 mb-6">
          <Heart className="w-7 h-7 text-earth-400" strokeWidth={2} />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-earth-950 mb-3">
          No saved products yet
        </h2>
        <p className="text-earth-600 max-w-md mx-auto mb-8 leading-relaxed">
          Tap the heart icon on any review or product card to save it here.
          Great for building out a shopping list before a restock run.
        </p>
        <Link href="/reviews" className="btn-primary">
          Browse Reviews
        </Link>
      </div>
    );
  }

  const saved = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const missing = slugs.length - saved.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-earth-600">
          <strong className="text-earth-950 font-bold tabular-nums">{saved.length}</strong>{" "}
          product{saved.length === 1 ? "" : "s"} saved
          {missing > 0 && (
            <span className="text-earth-400 ml-2">
              ({missing} removed product{missing === 1 ? "" : "s"} cleared)
            </span>
          )}
        </div>
        <button
          onClick={() => {
            if (confirm("Clear your entire wishlist?")) clear();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-earth-500 hover:text-accent-orange transition-colors"
          aria-label="Clear wishlist"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {saved.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
