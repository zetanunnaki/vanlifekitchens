"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function GuidesSection() {
  const featured = guides.slice(0, 3);
  return (
    <section className="py-28 md:py-36 bg-earth-100/60 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading
            number="03"
            eyebrow="Field Guides"
            title="Long-form knowledge for long-form trips"
            subtitle="Twelve guides covering layout, power, water, meal prep, storage, and the honest trade-offs that only show up after six months on the road."
          />
          <Link href="/guides" className="btn-link whitespace-nowrap lg:self-end lg:pb-2">
            Browse all 12
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featured.map((g, idx) => (
            <m.article
              key={g.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href={`/guides/${g.slug}`} className="block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-accent-orange uppercase tracking-widest">
                      {g.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl text-earth-950 mb-3 leading-tight text-balance group-hover:text-accent-orange transition-colors duration-300">
                  {g.title}
                </h3>
                <p className="text-earth-600 leading-relaxed mb-4 text-pretty">
                  {g.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-accent-orange font-semibold text-sm">
                  Read the guide
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
