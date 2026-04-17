"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

export function WishlistButton({
  slug,
  variant = "icon",
  className = "",
}: {
  slug: string;
  variant?: "icon" | "inline" | "prominent";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  if (variant === "prominent") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(slug);
        }}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all border-2 ${
          saved
            ? "bg-accent-orange text-white border-accent-orange"
            : "bg-white text-earth-800 border-earth-200 hover:border-accent-orange hover:text-accent-orange"
        } ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-transform ${saved ? "fill-current scale-110" : ""}`}
          strokeWidth={saved ? 0 : 2}
        />
        {saved ? "Saved" : "Save for later"}
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(slug);
        }}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
          saved ? "text-accent-orange" : "text-earth-500 hover:text-accent-orange"
        } ${className}`}
      >
        <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} strokeWidth={saved ? 0 : 2} />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      className={`w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-soft-xl flex items-center justify-center transition-all hover:scale-110 ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-all ${
          saved ? "text-accent-orange fill-accent-orange" : "text-earth-500"
        }`}
        strokeWidth={saved ? 0 : 2}
      />
    </button>
  );
}
