"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/lib/data";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/reviews/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-earth-100 mb-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />

          {/* Score badge */}
          <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-soft-xl flex flex-col items-center justify-center">
            <span className="font-serif text-lg font-bold text-earth-950 leading-none tabular-nums">
              {product.score}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-earth-500 mt-0.5">
              Score
            </span>
          </div>

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-5 left-5 bg-accent-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {product.tag}
            </span>
          )}

          {/* Wishlist heart (bottom-left) */}
          <div className="absolute bottom-5 left-5 z-10">
            <WishlistButton slug={product.slug} variant="icon" />
          </div>

          {/* Bottom gradient + quick action */}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-earth-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="inline-flex items-center gap-1 text-white text-sm font-semibold">
              Read Review
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-semibold text-earth-500 mb-2">
          <span>{product.category}</span>
          <span className="inline-flex items-center gap-1 text-accent-orange">
            <Star className="w-3 h-3 fill-current" />
            <span className="tabular-nums">{product.rating}</span>
            <span className="text-earth-400 font-normal normal-case tracking-normal">
              ({product.reviews})
            </span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-earth-950 leading-tight mb-3 text-balance group-hover:text-accent-orange transition-colors duration-300">
          {product.name}
        </h3>

        {/* Verdict excerpt */}
        <p className="text-sm text-earth-600 leading-relaxed mb-4 line-clamp-2">
          {product.verdict}
        </p>

        {/* Price */}
        <div className="flex items-end justify-between pt-4 border-t border-earth-200/70">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-earth-500 font-semibold mb-0.5">
              From
            </div>
            <div className="font-serif text-2xl font-bold text-earth-950 tabular-nums">
              {product.priceLabel}
            </div>
          </div>
          <span className="text-accent-orange font-semibold text-sm inline-flex items-center gap-1">
            Full Review
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </m.article>
  );
}
