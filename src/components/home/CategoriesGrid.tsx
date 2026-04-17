"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChefHat, Coffee, Droplets, Flame, Package, Refrigerator, Sun, UtensilsCrossed } from "lucide-react";
import type { ComponentType } from "react";
import { categories, products } from "@/lib/data";
import { categoryNameToSlug } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Flame,
  Refrigerator,
  UtensilsCrossed,
  Droplets,
  Sun,
  Package,
  Coffee,
  ChefHat,
};

export function CategoriesGrid() {
  const counts = new Map<string, number>();
  for (const p of products) {
    const slug = categoryNameToSlug(p.category);
    if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  const featured = categories[0];
  const rest = categories.slice(1);
  const Icon = iconMap[featured.icon] ?? Flame;

  return (
    <section className="py-28 md:py-36 bg-earth-50 relative">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading
            number="01"
            eyebrow="Shop by Category"
            title="Gear for every zone of your van kitchen"
            subtitle="Six categories, sixteen products, every one tested on the road. Pick the zone you&apos;re building next."
          />
          <Link
            href="/reviews"
            className="btn-link whitespace-nowrap lg:self-end lg:pb-2"
          >
            View all reviews
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric grid: 1 featured large + 5 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured category — spans 2 cols, 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Link
              href={`/reviews/category/${featured.slug}`}
              className="group relative block rounded-4xl overflow-hidden h-full min-h-[480px]"
            >
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/50 to-transparent" />
              <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  Featured
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-orange text-white flex items-center justify-center mb-5 shadow-warm">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-semibold">
                  {counts.get(featured.slug) ?? 0} products reviewed
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4 text-balance">
                  {featured.name}
                </h3>
                <span className="inline-flex items-center gap-2 text-accent-orange-soft font-semibold text-sm">
                  Explore category
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller categories */}
          {rest.map((cat, idx) => {
            const Icon2 = iconMap[cat.icon] ?? Flame;
            const count = counts.get(cat.slug) ?? 0;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/reviews/category/${cat.slug}`}
                  className="group relative block aspect-[4/5] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-950/20 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mb-3 group-hover:bg-accent-orange transition-colors duration-500">
                      <Icon2 className="w-5 h-5" />
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70 mb-1 font-semibold">
                      {count} reviewed
                    </div>
                    <h3 className="font-display font-bold text-lg text-white leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
