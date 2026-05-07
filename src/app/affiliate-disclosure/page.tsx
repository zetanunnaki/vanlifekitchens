import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "VanLifeKitchens.com participates in the Amazon Associates and Walmart Affiliate programs. Full disclosure of how we earn commissions.",
  openGraph: {
    title: "Affiliate Disclosure — VanLifeKitchens",
    description:
      "VanLifeKitchens.com participates in the Amazon Associates and Walmart Affiliate programs. Full disclosure of how we earn commissions.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "VanLifeKitchens affiliate disclosure" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Affiliate Disclosure — VanLifeKitchens",
    description:
      "VanLifeKitchens.com participates in the Amazon Associates and Walmart Affiliate programs. Full disclosure of how we earn commissions.",
  },
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-narrow">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-earth-950 mt-4 mb-10 leading-tight text-balance">
          Affiliate Disclosure
        </h1>

        <p className="text-sm text-earth-500 mb-10 italic">
          Last updated: April 15, 2026
        </p>

        <div className="prose-editorial space-y-6">
          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchens.com (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an
            independent product review website. To keep this site running, we participate in
            two affiliate marketing programs: the <strong>Amazon Services LLC Associates
            Program</strong> and the <strong>Walmart Affiliate Program</strong>. When you click
            an affiliate link on our site and complete a qualifying purchase on the retailer&apos;s
            website, we may earn a commission at no additional cost to you.
          </p>

          <p className="text-lg leading-[1.85] text-earth-800">
            This page exists to be fully transparent about those relationships, in compliance
            with the Federal Trade Commission&apos;s 16 CFR Part 255 (&ldquo;Guides Concerning
            the Use of Endorsements and Testimonials in Advertising&rdquo;) and the operating
            agreements of both affiliate programs.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Amazon Associates Program disclosure
          </h2>

          <div className="bg-earth-50 border-l-4 border-accent-orange p-6 my-6 rounded-r-2xl">
            <p className="text-earth-900 font-semibold leading-relaxed mb-0">
              VanLifeKitchens.com is a participant in the Amazon Services LLC Associates Program,
              an affiliate advertising program designed to provide a means for sites to earn
              advertising fees by advertising and linking to Amazon.com. As an Amazon Associate
              we earn from qualifying purchases.
            </p>
          </div>

          <p className="text-lg leading-[1.85] text-earth-800">
            Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of
            Amazon.com, Inc. or its affiliates. We are not affiliated with, owned by, or
            endorsed by Amazon — we participate in their affiliate program as an independent
            content publisher.
          </p>

          <p className="text-lg leading-[1.85] text-earth-800">
            Our Amazon Associates tracking ID is <code className="font-mono text-sm bg-earth-100 px-2 py-1 rounded">vanlifekitchens-20</code>.
            All Amazon links on this site include this tag.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Walmart Affiliate Program disclosure
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchens.com is also a participant in the Walmart Affiliate Program. When you
            click a Walmart link on our site and complete a purchase on Walmart.com, we may
            earn a commission. We are not affiliated with, owned by, or endorsed by Walmart Inc.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            How we use affiliate links
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            Affiliate links on this site are clearly marked. We use the standard{" "}
            <code className="font-mono text-sm bg-earth-100 px-2 py-1 rounded">rel=&quot;sponsored nofollow&quot;</code>{" "}
            attribute on all affiliate links so search engines and browsers can identify them
            correctly. Buttons labeled &ldquo;Check Price on Amazon&rdquo; or &ldquo;Check
            Price on Walmart&rdquo; are affiliate links.
          </p>

          <p className="text-lg leading-[1.85] text-earth-800">
            <strong>Pricing and availability disclaimer:</strong> Product prices and
            availability shown on this site are accurate as of the date noted on each review
            and are subject to change. Any price displayed at the time of purchase will apply
            to the purchase of the product. Always verify the current price on the retailer&apos;s
            website before completing your purchase.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Editorial independence
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            Our affiliate relationships do not influence our editorial opinions. Every product
            on this site is evaluated on merit alone. When a product fails our testing, we say
            so — even if it would have paid a higher commission than the product we recommend
            instead. We do not accept payment in exchange for positive reviews. We do not
            adjust our rankings based on commission rates. If a manufacturer sends us a product
            sample, we disclose it within the relevant review.
          </p>

          <p className="text-lg leading-[1.85] text-earth-800">
            We buy most of the gear we review with our own money. The affiliate commissions we
            earn from this site help cover the cost of that testing and keep the lights on.
            They do not, and will not, change what we recommend.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Cookies and tracking
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            When you click an affiliate link on our site, the destination retailer (Amazon or
            Walmart) may set tracking cookies on your device. These cookies are how the
            affiliate programs attribute purchases to us so we can be paid commissions. We do
            not have access to your personal purchase information — we only see anonymous,
            aggregated commission reports from the retailers. For more details on what data is
            collected, see our <a href="/privacy" className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors">Privacy Policy</a>.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Questions
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            If you have any questions about this disclosure, our affiliate relationships, or
            how we make money, please contact us at{" "}
            <a
              href="mailto:hello@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              hello@vanlifekitchens.com
            </a>
            . We&apos;re happy to clarify anything.
          </p>
        </div>
      </div>
    </section>
  );
}
