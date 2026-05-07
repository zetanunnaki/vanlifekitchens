import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for VanLifeKitchens.com — usage guidelines, content licensing, affiliate disclaimers, warranty limitations, and liability terms.",
  openGraph: {
    title: "Terms of Service — VanLifeKitchens",
    description:
      "Terms of service for VanLifeKitchens.com — usage guidelines, content licensing, affiliate disclaimers, warranty limitations, and liability terms.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "VanLifeKitchens terms of service" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Terms of Service — VanLifeKitchens",
    description:
      "Terms of service for VanLifeKitchens.com — usage guidelines, content licensing, affiliate disclaimers, warranty limitations, and liability terms.",
  },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-narrow">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-earth-950 mt-4 mb-10 leading-tight text-balance">
          Terms of Service
        </h1>

        <p className="text-sm text-earth-500 mb-10 italic">
          Last updated: May 7, 2026
        </p>

        <div className="prose-editorial space-y-6">
          <p className="text-lg leading-[1.85] text-earth-800">
            Welcome to VanLifeKitchens.com (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;, &ldquo;the Site&rdquo;). By accessing or using this website, you
            agree to be bound by these Terms of Service. If you do not agree to these terms,
            please do not use the Site.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Use of the Site
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchens.com provides product reviews, buying guides, comparison tools, and
            editorial content related to van life kitchen gear. This content is intended for
            informational and educational purposes only. You may use the Site for your personal,
            non-commercial reference. You agree not to:
          </p>

          <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-800">
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              Reproduce, distribute, or republish our content (including reviews, images, and
              editorial scores) without prior written permission.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              Use automated tools, scrapers, or bots to access or collect data from the Site
              beyond what is permitted by our robots.txt file.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              Interfere with the Site&apos;s operation, security, or performance.
            </li>
            <li className="pl-7 relative">
              <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
              Misrepresent your relationship with VanLifeKitchens or claim our endorsement of any
              product, service, or brand.
            </li>
          </ul>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Editorial Content & Accuracy
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            Our reviews and guides represent the honest opinions of our editorial team based on
            hands-on testing. We do our best to keep product information, specifications, and
            prices accurate and up to date, but products change, manufacturers update models,
            and prices fluctuate. We make no warranty regarding the accuracy, completeness, or
            timeliness of any product information on the Site. Always verify current specs and
            prices on the retailer&apos;s website before making a purchase.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Affiliate Links & Advertising
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            VanLifeKitchens.com participates in affiliate programs, including the Amazon
            Associates Program. When you click an affiliate link and make a purchase, we may
            earn a commission at no additional cost to you. These commissions help fund our
            editorial work. Our affiliate relationships do not influence our editorial scores,
            rankings, or recommendations. Products are ranked by editorial merit alone. For full
            details, see our{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              Affiliate Disclosure
            </Link>
            .
          </p>

          <p className="text-lg leading-[1.85] text-earth-800">
            The Site may also display advertisements served by third-party ad networks,
            including Google AdSense. These advertisements are clearly distinguishable from
            editorial content and do not influence our reviews or recommendations.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Intellectual Property
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            All content on VanLifeKitchens.com — including text, photographs, illustrations,
            graphics, logos, editorial scores, and page designs — is owned by VanLifeKitchens
            or used under license and is protected by copyright law. You may share links to our
            content and quote brief excerpts with proper attribution (a link back to the
            original page). Bulk reproduction, mirroring, or republishing of our content
            requires written permission.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Product Images
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            Product images on the Site may include manufacturer-provided press photos used under
            fair use or license, as well as original photos taken by our editorial team.
            Manufacturer product images remain the property of their respective brands.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Third-Party Links
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            The Site contains links to third-party websites, including retailer product pages
            and manufacturer sites. These links are provided for your convenience and do not
            imply endorsement of the linked site&apos;s content, products, or policies. We are
            not responsible for the content, privacy practices, or availability of any
            third-party websites.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Disclaimer of Warranties
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            The Site and all content are provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or implied,
            including but not limited to implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not warrant that the Site will be
            uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Limitation of Liability
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            To the fullest extent permitted by law, VanLifeKitchens.com and its editors shall
            not be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages arising from your use of the Site, reliance on any content, or
            purchase of any product reviewed or recommended on the Site. This includes, without
            limitation, damages for personal injury, property damage, or lost profits.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Indemnification
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            You agree to indemnify and hold harmless VanLifeKitchens.com and its editors from
            any claims, damages, losses, or expenses (including reasonable attorney&apos;s fees)
            arising from your use of the Site or violation of these Terms.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Changes to These Terms
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            We may update these Terms of Service from time to time. The &ldquo;Last
            updated&rdquo; date at the top of this page reflects the most recent revision.
            Continued use of the Site after changes are posted constitutes your acceptance of
            the revised terms.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Governing Law
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            These Terms are governed by the laws of the United States. Any disputes arising from
            these Terms or your use of the Site shall be resolved in accordance with applicable
            U.S. law.
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mt-14 mb-5">
            Contact
          </h2>

          <p className="text-lg leading-[1.85] text-earth-800">
            If you have questions about these Terms, contact us at{" "}
            <a
              href="mailto:hello@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              hello@vanlifekitchens.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
