import type { Metadata } from "next";
import LayoutPlannerClient from "./LayoutPlannerClient";

export const metadata: Metadata = {
  title: "Kitchen Layout Planner",
  description:
    "Select your van size and see zone-by-zone kitchen layout recommendations. Free interactive planner for van builds.",
  openGraph: {
    title: "Kitchen Layout Planner",
    description:
      "Select your van size and see zone-by-zone kitchen layout recommendations. Free interactive planner for van builds.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Van kitchen layout planner" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Kitchen Layout Planner",
    description:
      "Select your van size and see zone-by-zone kitchen layout recommendations. Free interactive planner for van builds.",
  },
  alternates: { canonical: "/tools/layout" },
};

export default function LayoutPlannerPage() {
  return <LayoutPlannerClient />;
}
