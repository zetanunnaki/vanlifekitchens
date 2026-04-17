import type { Metadata } from "next";
import { CompareClient } from "@/components/CompareClient";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Van Life Kitchen Gear",
  description:
    "Side-by-side comparison of van life kitchen gear — specs, prices, scores, pros and cons. Pick up to 4 products to compare.",
  alternates: { canonical: "/reviews/compare" },
};

export default function ComparePage() {
  return (
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
  );
}
