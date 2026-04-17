import type { Metadata } from "next";
import BudgetCalculatorClient from "./BudgetCalculatorClient";

export const metadata: Metadata = {
  title: "Van Kitchen Budget Calculator",
  description:
    "Pick your categories and tiers to estimate your van kitchen build cost. Free interactive budget planner.",
  openGraph: {
    title: "Van Kitchen Budget Calculator",
    description:
      "Pick your categories and tiers to estimate your van kitchen build cost. Free interactive budget planner.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Van kitchen budget calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Van Kitchen Budget Calculator",
    description:
      "Pick your categories and tiers to estimate your van kitchen build cost. Free interactive budget planner.",
  },
  alternates: { canonical: "/tools/budget" },
};

export default function BudgetCalculatorPage() {
  return <BudgetCalculatorClient />;
}
