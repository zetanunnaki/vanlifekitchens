import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for VanLifeKitchens.com — usage guidelines, warranty disclaimers, and liability limitations.",
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms of service for VanLifeKitchens.com — usage guidelines, warranty disclaimers, and liability limitations.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "VanLifeKitchens terms of service" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Terms of Service",
    description:
      "Terms of service for VanLifeKitchens.com — usage guidelines, warranty disclaimers, and liability limitations.",
  },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-950 mb-8">Terms of Service</h1>
        <p className="text-earth-700 leading-relaxed mb-5">
          By using VanLifeKitchens.com you agree to these terms. Our content is provided for informational
          purposes. Always verify specs and prices on the retailer site before purchase.
        </p>
        <h2 className="text-2xl font-display font-bold text-earth-950 mb-4 mt-10">No warranty</h2>
        <p className="text-earth-700 leading-relaxed mb-5">
          We do our best to keep reviews accurate and up to date, but products change. We make no warranty
          regarding the accuracy or completeness of any product information.
        </p>
        <h2 className="text-2xl font-display font-bold text-earth-950 mb-4 mt-10">Liability</h2>
        <p className="text-earth-700 leading-relaxed">
          VanLifeKitchens.com is not liable for any damages arising from the use of products reviewed or
          recommended on this site.
        </p>
      </div>
    </section>
  );
}
