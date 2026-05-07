"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data";
import { amazonLink } from "@/lib/affiliate";

/**
 * Mobile-only sticky bottom buy bar.
 * Appears after the user scrolls past the hero on a review page,
 * so the buy CTA is always one tap away.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after the user scrolls 600px (past the hero/specs)
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-white border-t border-earth-200 shadow-soft-2xl">
        <div className="container-page py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-earth-500 font-semibold">
              {product.score}/10 · Score
            </div>
            <div className="font-serif text-xl font-bold text-earth-950 tabular-nums leading-none mt-0.5">
              {product.priceLabel}
            </div>
          </div>
          <a
            href={amazonLink(product)}
            rel="sponsored nofollow noopener"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-accent-orange text-white px-5 py-3 rounded-full text-sm font-bold shadow-warm whitespace-nowrap min-h-[44px]"
          >
            Amazon
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
