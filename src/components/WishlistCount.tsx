"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

export function WishlistCount() {
  const { count } = useWishlist();
  return (
    <Link
      href="/wishlist"
      aria-label={count > 0 ? `${count} items saved` : "Wishlist"}
      title="Wishlist"
      className="relative w-10 h-10 rounded-full flex items-center justify-center text-earth-700 hover:bg-earth-100 transition-colors"
    >
      <Heart
        className={`w-4 h-4 ${count > 0 ? "text-accent-orange fill-accent-orange" : ""}`}
        strokeWidth={count > 0 ? 0 : 2}
      />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
