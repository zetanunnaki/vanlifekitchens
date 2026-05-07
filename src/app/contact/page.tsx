import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the VanLifeKitchens editorial team. Questions about reviews, corrections, press inquiries, or product samples.",
  openGraph: {
    title: "Contact Us — VanLifeKitchens",
    description:
      "Get in touch with the VanLifeKitchens editorial team. Questions about reviews, corrections, press inquiries, or product samples.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Contact VanLifeKitchens" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Contact Us — VanLifeKitchens",
    description:
      "Get in touch with the VanLifeKitchens editorial team. Questions about reviews, corrections, press inquiries, or product samples.",
  },
  alternates: { canonical: "/contact" },
};

const contacts = [
  {
    label: "General Inquiries",
    email: "hello@vanlifekitchens.com",
    description: "Questions about the site, partnerships, or anything else.",
  },
  {
    label: "Editorial & Corrections",
    email: "editor@vanlifekitchens.com",
    description: "Spotted a factual error or have a suggestion for a review? Let us know.",
  },
  {
    label: "Press & Product Samples",
    email: "press@vanlifekitchens.com",
    description:
      "Media inquiries and product sample submissions. We test everything for a minimum of 30 days before publishing.",
  },
];

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-narrow">
        <span className="eyebrow mb-6">Get in Touch</span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-earth-950 mt-4 mb-6 leading-tight text-balance">
          Contact Us
        </h1>
        <p className="text-earth-600 text-lg leading-relaxed mb-14 text-pretty max-w-2xl">
          We read every message. Whether you have a question about a review, want to report an
          error, or are a brand looking to send a product for testing, pick the right inbox below
          and we&apos;ll get back to you within 48 hours.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contacts.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="group bg-earth-50 rounded-3xl border border-earth-100 p-8 hover:border-accent-orange hover:shadow-soft-xl transition-all"
            >
              <div className="w-12 h-12 bg-accent-orange/10 text-accent-orange rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-accent-orange mb-2">
                {c.label}
              </div>
              <div className="font-display font-bold text-earth-950 text-lg mb-2">
                {c.email}
              </div>
              <p className="text-sm text-earth-600 leading-relaxed">
                {c.description}
              </p>
            </a>
          ))}
        </div>

        <div className="bg-earth-950 text-white rounded-4xl p-10 md:p-14 grain relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="eyebrow mb-3 text-accent-orange-soft">Response Times</div>
            <h2 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4 text-balance">
              What to <span className="font-serif italic text-accent-orange-soft">expect</span>
            </h2>
            <ul className="space-y-4 text-white/80 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-accent-orange font-bold">01</span>
                <span>
                  <strong className="text-white">General questions</strong> — we typically respond within 24–48 hours.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-orange font-bold">02</span>
                <span>
                  <strong className="text-white">Editorial corrections</strong> — verified errors are fixed within 24 hours and the article is updated with a correction note.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-orange font-bold">03</span>
                <span>
                  <strong className="text-white">Product samples</strong> — we accept products for independent testing but do not guarantee coverage. All reviews are published on our own timeline and reflect our honest opinion.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
