import type { Metadata } from "next";
import { HubHero } from "@/components/HubHero";
import { ReviewsHubClient } from "@/components/ReviewsHubClient";
import { categories, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Honest Gear Reviews",
  description:
    "Independent, road-tested reviews of van life kitchen gear. Filter by category to find fridges, cooktops, cookware, water filters, storage, and solar cooking options.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsHubPage() {
  return (
    <>
      <HubHero
        image="/images/hero/reviews.jpg"
        alt="Van life kitchen gear arranged on a wooden surface"
        eyebrow="Reviews"
        title="Honest Gear Reviews"
        subtitle="Every product here has been tested on the road. No sponsored fluff — just what works."
      />
      <section className="py-24 bg-earth-50">
        <div className="container-page">
          <ReviewsHubClient products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
