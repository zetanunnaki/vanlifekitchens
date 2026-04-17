import type { Metadata } from "next";
import { CompareClient } from "@/components/CompareClient";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Van Life Kitchen Gear",
  description:
    "Side-by-side comparison of van life kitchen gear — specs, prices, scores, pros and cons. Pick up to 4 products to compare.",
  openGraph: {
    title: "Compare Van Life Kitchen Gear",
    description:
      "Side-by-side comparison of van life kitchen gear — specs, prices, scores, pros and cons. Pick up to 4 products.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Compare van life kitchen gear" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Compare Van Life Kitchen Gear",
    description:
      "Side-by-side comparison of van life kitchen gear — specs, prices, scores, pros and cons. Pick up to 4 products.",
  },
  alternates: { canonical: "/reviews/compare" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Compare Van Life Kitchen Gear",
  "description":
    "Side-by-side comparison of van life kitchen gear — specs, prices, scores, pros and cons. Pick up to 4 products to compare.",
  "url": "https://vanlifekitchens.com/reviews/compare",
};

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-32 pb-24 bg-earth-50 min-h-screen">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange mb-4">
            Compare
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-earth-950 mb-4">
            Side-by-Side Gear Comparison
          </h1>
          <p className="text-earth-600 max-w-2xl mx-auto text-lg">
            Pick up to 4 products to compare specs, prices, and editorial scores at a glance.
          </p>
        </div>

        <CompareClient products={products} />
      </div>
    </section>
    </>
  );
}
