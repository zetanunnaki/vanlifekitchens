import type { Metadata } from "next";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description:
    "Products you've saved from VanLifeKitchens reviews. Your wishlist is stored privately in your browser — no account, no tracking.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Your Wishlist — VanLifeKitchens",
    description:
      "Products you've saved from VanLifeKitchens reviews. Stored privately in your browser — no account needed.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "VanLifeKitchens wishlist" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Your Wishlist — VanLifeKitchens",
    description:
      "Products you've saved from VanLifeKitchens reviews. Stored privately in your browser — no account needed.",
  },
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return (
    <section className="pt-32 pb-24 bg-earth-50 min-h-screen">
      <div className="container-page max-w-5xl">
        <div className="mb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange mb-4">
            Private · Saved in your browser
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-earth-950 mb-4 leading-tight">
            Your wishlist
          </h1>
          <p className="text-earth-600 text-lg max-w-2xl">
            Products you've saved. Your wishlist lives in your browser's local
            storage — no account, no tracking, no way for us to see it.
          </p>
        </div>

        <WishlistClient />
      </div>
    </section>
  );
}
