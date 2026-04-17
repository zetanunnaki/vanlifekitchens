import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VanLifeKitchens — Cook Anywhere. Live Everywhere.",
    short_name: "VanLifeKitchens",
    description:
      "Independent reviews and field guides for van life kitchen gear. Tested on the road, written by nomads.",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#d97706",
    orientation: "portrait-primary",
    categories: ["lifestyle", "shopping", "travel", "food"],
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-64x64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/hero/og-default.jpg",
        sizes: "1920x1080",
        type: "image/jpeg",
        // @ts-expect-error — valid PWA field, not yet in Next.js types
        form_factor: "wide",
        label: "VanLifeKitchens homepage at golden hour",
      },
    ],
    shortcuts: [
      {
        name: "Reviews",
        short_name: "Reviews",
        url: "/reviews",
        description: "Browse all product reviews",
      },
      {
        name: "Guides",
        short_name: "Guides",
        url: "/guides",
        description: "Read our field guides",
      },
      {
        name: "Compare",
        short_name: "Compare",
        url: "/reviews/compare",
        description: "Compare gear side by side",
      },
    ],
  };
}
