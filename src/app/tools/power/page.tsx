import type { Metadata } from "next";
import PowerCalculatorClient from "./PowerCalculatorClient";

export const metadata: Metadata = {
  title: "Power Consumption Calculator",
  description:
    "Add your van kitchen appliances and get daily amp-hours plus recommended battery and solar sizing. Free tool.",
  openGraph: {
    title: "Power Consumption Calculator",
    description:
      "Add your van kitchen appliances and get daily amp-hours plus recommended battery and solar sizing. Free tool.",
    type: "website",
    images: [{ url: "/images/hero/og-default.jpg", width: 1920, height: 1080, alt: "Van power consumption calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "Power Consumption Calculator",
    description:
      "Add your van kitchen appliances and get daily amp-hours plus recommended battery and solar sizing. Free tool.",
  },
  alternates: { canonical: "/tools/power" },
};

export default function PowerCalculatorPage() {
  return <PowerCalculatorClient />;
}
