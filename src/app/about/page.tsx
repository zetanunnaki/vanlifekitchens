import type { Metadata } from "next";
import Image from "next/image";
import { editorList } from "@/lib/editors";

export const metadata: Metadata = {
  title: "About VanLifeKitchens",
  description:
    "VanLifeKitchens.com is run by three full-time van dwellers who test every product on the road. Meet the editors and our methodology.",
  openGraph: {
    title: "About VanLifeKitchens",
    description:
      "VanLifeKitchens.com is run by three full-time van dwellers who test every product on the road. Meet the editors and our methodology.",
    type: "website",
    images: [{ url: "/images/about/cooking.jpg", width: 1920, height: 1080, alt: "Cooking in a van kitchen at golden hour" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "About VanLifeKitchens",
    description:
      "VanLifeKitchens.com is run by three full-time van dwellers who test every product on the road. Meet the editors and our methodology.",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container-narrow">
        <span className="eyebrow mb-6">About</span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-earth-950 mt-4 mb-6 leading-tight text-balance">
          Curated by nomads, <span className="font-serif italic text-accent-orange">for nomads.</span>
        </h1>
        <p className="text-earth-600 text-lg leading-relaxed mb-10 text-pretty">
          VanLifeKitchens was started by three frustrated van dwellers who got tired of gear
          recommendations written by people who&apos;d never lived in 80 square feet. Every product
          on this site has been tested on the road — not in a lab, not by an affiliate farm.
        </p>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-soft-2xl">
          <Image
            src="/images/about/cooking.jpg"
            alt="Cooking dinner in a van kitchen at golden hour"
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-4 mt-16">
          Our mission
        </h2>
        <p className="text-earth-700 text-lg leading-relaxed mb-6">
          Help people cook real food on the road with gear that actually works. That&apos;s it. No
          hype, no sponsored rankings, no &ldquo;best of&rdquo; lists stuffed with whatever
          Amazon is paying to promote this week.
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-4 mt-16">
          How we review
        </h2>
        <p className="text-earth-700 text-lg leading-relaxed mb-4">
          We buy most gear with our own money. When brands send samples, we disclose it in the
          review. We test every product for at least 30 days in real van-life conditions: heat,
          cold, washboard roads, and intermittent power.
        </p>
        <ul className="list-none pl-0 space-y-3 text-lg leading-[1.75] text-earth-700 mb-6">
          <li className="pl-7 relative">
            <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
            Minimum 30 days of real-world testing
          </li>
          <li className="pl-7 relative">
            <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
            Power draw measured with a Victron BMV-712 shunt
          </li>
          <li className="pl-7 relative">
            <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
            Every review scored across the same 8 criteria
          </li>
          <li className="pl-7 relative">
            <span className="absolute left-0 top-3 w-3 h-px bg-accent-orange" />
            We update reviews when products change or firmware breaks
          </li>
        </ul>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-8 mt-16">
          Meet the editors
        </h2>
        <div className="space-y-10">
          {editorList.map((editor) => (
            <div key={editor.slug} className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-accent-orange text-white flex items-center justify-center font-display font-bold text-2xl shadow-warm">
                  {editor.initials}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-earth-950">
                  {editor.name}
                </h3>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-semibold mt-1 mb-3">
                  {editor.role}
                </div>
                <p className="text-earth-700 leading-relaxed mb-3">{editor.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {editor.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold text-earth-600 bg-earth-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-4 mt-16">
          Affiliate disclosure
        </h2>
        <p className="text-earth-700 text-lg leading-relaxed">
          We participate in the Amazon Associates Program and the Walmart Affiliate Program. When
          you buy through our links, we earn a commission at no cost to you. It keeps the lights
          on and lets us keep reviews independent. Full disclosure on our{" "}
          <a
            href="/affiliate-disclosure"
            className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
          >
            affiliate disclosure page
          </a>
          .
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-4 mt-16">
          Contact us
        </h2>
        <p className="text-earth-700 text-lg leading-relaxed mb-4">
          We answer every email. If you have a question about a product, want to suggest gear for
          us to test, spot an error in a review, or want to send us samples to evaluate, get in
          touch:
        </p>
        <ul className="space-y-2 text-earth-700 text-lg">
          <li>
            <strong className="text-earth-900">General:</strong>{" "}
            <a
              href="mailto:hello@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              hello@vanlifekitchens.com
            </a>
          </li>
          <li>
            <strong className="text-earth-900">Editorial / corrections:</strong>{" "}
            <a
              href="mailto:editor@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              editor@vanlifekitchens.com
            </a>
          </li>
          <li>
            <strong className="text-earth-900">Press &amp; samples:</strong>{" "}
            <a
              href="mailto:press@vanlifekitchens.com"
              className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
            >
              press@vanlifekitchens.com
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
