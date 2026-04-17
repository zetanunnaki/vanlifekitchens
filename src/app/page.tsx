import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { GuidesSection } from "@/components/home/GuidesSection";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products, setups } from "@/lib/data";

export default function HomePage() {
  // Top 4 by editorial score
  const topPicks = [...products].sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Trust principles ticker */}
      <section className="border-y border-earth-200/60 bg-white">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              "Road-Tested Gear",
              "No Sponsored Rankings",
              "Real Power Measurements",
              "Updated Quarterly",
            ].map((line) => (
              <div key={line} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
                <span className="text-[12px] md:text-sm font-semibold text-earth-800 uppercase tracking-wider">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoriesGrid />

      {/* Top Rated Gear — premium magazine style */}
      <section className="relative py-28 md:py-36 bg-white">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <SectionHeading
              number="02"
              eyebrow="Top Rated This Quarter"
              title="The gear that earned its place in our van"
              subtitle="Our four highest-scored picks across every category. These are the items we still recommend three months after buying."
            />
            <Link href="/reviews/compare" className="btn-link whitespace-nowrap lg:self-end lg:pb-2">
              Compare side-by-side
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPicks.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/reviews" className="btn-secondary group">
              Explore All 16 Reviews
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <GuidesSection />

      {/* Real Van Kitchens — full-bleed editorial */}
      <section className="relative py-28 md:py-36 bg-earth-950 text-white overflow-hidden grain">
        <div className="container-page relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-5">
                <span className="section-number text-earth-400">— 04</span>
                <span className="eyebrow">Inside Real Builds</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Three van kitchens, <span className="font-serif italic text-accent-orange-soft">three philosophies</span>
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl text-pretty">
                Minimalist, premium, weekend-ready. See how real van dwellers built their kitchens —
                every product, every trade-off, every dollar spent.
              </p>
            </div>
            <Link
              href="/setups"
              className="inline-flex items-center gap-2 text-accent-orange-soft font-semibold whitespace-nowrap lg:self-end lg:pb-2 hover:text-accent-orange transition-colors"
            >
              All setups
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {setups.map((s, i) => (
              <Link
                key={s.slug}
                href={`/setups/${s.slug}`}
                className={`group relative aspect-[4/5] rounded-3xl overflow-hidden block ${
                  i === 1 ? "md:translate-y-10" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/30 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent-orange-soft mb-3 font-semibold">
                    {s.vanType} · {s.budget}
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4 text-balance">
                    {s.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-sm">
                    Read the build
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Note — magazine style */}
      <section className="py-28 md:py-36 bg-earth-50">
        <div className="container-narrow">
          <div className="flex items-center gap-4 mb-8">
            <span className="section-number">— 05</span>
            <span className="eyebrow">Editor&apos;s Note</span>
          </div>
          <p className="font-serif italic text-2xl md:text-3xl leading-snug text-earth-700 mb-10 text-balance">
            &ldquo;We started VanLifeKitchen because every review we read was written by someone
            who&apos;d never had to cook breakfast next to a composting toilet. If we wouldn&apos;t
            put it in our own van, we don&apos;t recommend it. That&apos;s the whole editorial
            policy.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-orange flex items-center justify-center text-white font-display font-bold text-sm">
              ML
            </div>
            <div>
              <div className="font-display font-bold text-earth-950">Maya Larsen</div>
              <div className="text-sm text-earth-500">Founder &amp; Senior Editor</div>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/about" className="btn-link">
              Meet the full editorial team
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
