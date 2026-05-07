import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/HubHero";
import { setups } from "@/lib/data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Van Kitchen Setups",
  description:
    "Step inside real van kitchen builds from the road. Every product, every cost, every lesson learned from actual van dwellers.",
  openGraph: {
    title: "Real Van Kitchen Setups",
    description:
      "Step inside real van kitchen builds from the road. Every product, every cost, every lesson learned from actual van dwellers.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Real van kitchen setups" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Real Van Kitchen Setups",
    description:
      "Step inside real van kitchen builds from the road. Every product, every cost, every lesson learned from actual van dwellers.",
  },
  alternates: { canonical: "/setups" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Real Van Kitchen Setups",
  "description":
    "Step inside real builds from the road. Every product, every cost, every lesson learned.",
  "url": "https://vanlifekitchens.com/setups",
};

export default function SetupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HubHero
        image="/images/hero/setups.jpg"
        alt="Three camper vans parked at golden hour"
        eyebrow="Kitchen Setups"
        title="Real Van Kitchen Setups"
        subtitle="Step inside real builds from the road. Every product, every cost, every lesson learned."
      />
    <section className="py-24 bg-earth-50">
      <div className="container-page">

        <div className="max-w-3xl mx-auto mb-16 space-y-10">
          <div className="prose-editorial">
            <p className="text-lg leading-[1.85] text-earth-800">
              Nothing beats seeing how other van dwellers solved the same kitchen challenges you&apos;re
              facing. Each setup tour below is a real van kitchen built and used by actual nomads —
              complete with every product they chose, what it cost, how they organized their space,
              and the lessons they learned after months of daily cooking on the road. Whether you&apos;re
              building from scratch or upgrading an existing setup, these real-world builds show
              what&apos;s possible at every budget level.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-earth-100 p-8 md:p-10 shadow-soft-xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="section-number">— What&apos;s Inside</span>
              <span className="eyebrow">Every Setup Includes</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4 text-earth-700">
              <li className="flex gap-3 text-sm leading-relaxed">
                <span className="text-accent-orange font-bold mt-0.5">01</span>
                <span>Complete gear list with links to every product used</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed">
                <span className="text-accent-orange font-bold mt-0.5">02</span>
                <span>Total build cost breakdown by category</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed">
                <span className="text-accent-orange font-bold mt-0.5">03</span>
                <span>Layout photos and zone-by-zone walkthrough</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed">
                <span className="text-accent-orange font-bold mt-0.5">04</span>
                <span>Honest takes on what works and what they&apos;d change</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setups.map((s) => (
            <Link
              key={s.slug}
              href={`/setups/${s.slug}`}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden block"
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-950/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange mb-2">
                  {s.vanType} · {s.budget}
                </span>
                <h3 className="text-white text-2xl font-display font-bold leading-tight">{s.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-white/80 text-sm font-semibold">
                  See Full Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
