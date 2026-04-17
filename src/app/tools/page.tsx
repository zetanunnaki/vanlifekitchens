import Link from "next/link";
import { Calculator, LayoutGrid, Zap, ArrowRight } from "lucide-react";
import { HubHero } from "@/components/HubHero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Van Kitchen Planning Tools",
  description:
    "Free calculators and planners to budget, lay out, and size the power system for your van kitchen build.",
  openGraph: {
    title: "Van Kitchen Planning Tools",
    description:
      "Free calculators and planners to budget, lay out, and size the power system for your van kitchen build.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Van kitchen planning tools" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Van Kitchen Planning Tools",
    description:
      "Free calculators and planners to budget, lay out, and size the power system for your van kitchen build.",
  },
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    slug: "budget",
    title: "Van Kitchen Budget Calculator",
    description: "Pick your categories and tiers. Get a total cost + product recommendations.",
    icon: Calculator,
  },
  {
    slug: "layout",
    title: "Kitchen Layout Planner",
    description: "Select your van size — see zone-by-zone recommendations for your build.",
    icon: LayoutGrid,
  },
  {
    slug: "power",
    title: "Power Consumption Calculator",
    description: "Add your appliances. Get daily amp-hours + battery/solar sizing.",
    icon: Zap,
  },
];

export default function ToolsPage() {
  return (
    <>
      <HubHero
        image="/images/hero/tools.jpg"
        alt="Van kitchen planning tools on a wooden surface"
        eyebrow="Interactive Tools"
        title="Plan Your Build"
        subtitle="Free calculators and planners to help you size, budget, and lay out your van kitchen."
      />
    <section className="py-24 bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="group bg-earth-50 border border-earth-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 bg-accent-orange/10 rounded-2xl flex items-center justify-center text-accent-orange mb-6 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-earth-950 mb-3">{t.title}</h3>
                <p className="text-earth-600 text-sm leading-relaxed mb-6">{t.description}</p>
                <span className="inline-flex items-center gap-2 text-accent-orange font-bold text-sm">
                  Launch Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
