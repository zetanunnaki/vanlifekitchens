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

        <div className="max-w-3xl mx-auto mb-14 space-y-6">
          <div className="prose-editorial">
            <p className="text-base leading-[1.85] text-earth-700 text-center">
              Choosing between two similar products is one of the hardest parts of building a van
              kitchen. Our comparison tool puts real specs, editorial scores, pros, cons, and
              prices side by side so you can see exactly where each product wins and where it falls
              short. Every data point comes from our hands-on testing — not manufacturer claims.
              Select products below to build your own custom comparison, or browse our{" "}
              <a href="/compare" className="text-accent-orange font-semibold hover:underline">
                pre-built head-to-head matchups
              </a>{" "}
              for our most-requested comparisons.
            </p>
          </div>
        </div>

        <CompareClient products={products} />
      </div>
    </section>
    </>
  );
}
