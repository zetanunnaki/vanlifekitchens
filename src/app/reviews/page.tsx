import type { Metadata } from "next";
import { HubHero } from "@/components/HubHero";
import { ReviewsHubClient } from "@/components/ReviewsHubClient";
import { categories, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Honest Gear Reviews",
  description:
    "Independent, road-tested reviews of van life kitchen gear. Filter by category to find fridges, cooktops, cookware, water filters, storage, and solar cooking options.",
  openGraph: {
    title: "Honest Gear Reviews — VanLifeKitchens",
    description:
      "Independent, road-tested reviews of van life kitchen gear. Fridges, cooktops, cookware, water filters, and more.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Van life kitchen gear reviews" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Honest Gear Reviews — VanLifeKitchens",
    description:
      "Independent, road-tested reviews of van life kitchen gear. Fridges, cooktops, cookware, water filters, and more.",
  },
  alternates: { canonical: "/reviews" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Honest Gear Reviews",
  "description":
    "Independent, road-tested reviews of van life kitchen gear. Filter by category to find fridges, cooktops, cookware, water filters, storage, and solar cooking options.",
  "url": "https://vanlifekitchens.com/reviews",
};

export default function ReviewsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
