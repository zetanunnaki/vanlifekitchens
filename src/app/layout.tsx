import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: {
    default: "VanLifeKitchens — Cook Anywhere. Live Everywhere.",
    template: "%s | VanLifeKitchens",
  },
  description:
    "Independent reviews and field guides for van life kitchen gear. Tested on the road, written by nomads — never sponsored, never ranked by commission.",
  metadataBase: new URL("https://vanlifekitchens.com"),
  applicationName: "VanLifeKitchens",
  authors: [
    { name: "Maya Larsen", url: "https://vanlifekitchens.com/about" },
    { name: "Theo Park", url: "https://vanlifekitchens.com/about" },
    { name: "Cassidy Brooks", url: "https://vanlifekitchens.com/about" },
  ],
  creator: "VanLifeKitchens Editorial Team",
  publisher: "VanLifeKitchens",
  keywords: [
    "van life kitchen",
    "12V fridge",
    "portable induction cooktop",
    "van life cookware",
    "van kitchen layout",
    "RV kitchen gear",
    "overland kitchen",
    "van life reviews",
  ],
  openGraph: {
    type: "website",
    siteName: "VanLifeKitchens",
    locale: "en_US",
    url: "https://vanlifekitchens.com",
    title: "VanLifeKitchens — Cook Anywhere. Live Everywhere.",
    description:
      "Independent reviews and field guides for van life kitchen gear. Tested on the road, written by nomads.",
    images: [
      {
        url: "/images/hero/og-default.jpg",
        width: 1920,
        height: 1080,
        alt: "Van life kitchen interior at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vanlifekitchen",
    creator: "@vanlifekitchen",
    title: "VanLifeKitchens — Cook Anywhere. Live Everywhere.",
    description:
      "Independent reviews and field guides for van life kitchen gear. Tested on the road.",
    images: ["/images/hero/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "VanLifeKitchens — Reviews, Guides & Setups" },
      ],
    },
  },
  manifest: "/manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", url: "/icon-64x64.png", sizes: "64x64", type: "image/png" },
    { rel: "apple-touch-icon", url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    { rel: "icon", url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { rel: "icon", url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  other: {
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: import("next").Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VanLifeKitchens",
  alternateName: "VanLifeKitchens.com",
  url: "https://vanlifekitchens.com",
  logo: "https://vanlifekitchens.com/images/hero/og-default.jpg",
  description:
    "Independent reviews and field guides for van life kitchen gear. Tested on the road, written by nomads.",
  founder: { "@type": "Person", name: "Maya Larsen" },
  employee: [
    { "@type": "Person", name: "Maya Larsen", jobTitle: "Senior Editor & Founder" },
    { "@type": "Person", name: "Theo Park", jobTitle: "Field Editor & Recipe Lead" },
    { "@type": "Person", name: "Cassidy Brooks", jobTitle: "Gear Reviewer" },
  ],
  email: "hello@vanlifekitchens.com",
  sameAs: [
    "https://twitter.com/vanlifekitchen",
    "https://www.instagram.com/vanlifekitchen",
    "https://www.youtube.com/@vanlifekitchen",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VanLifeKitchens",
  url: "https://vanlifekitchens.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://vanlifekitchens.com/reviews?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} ${fraunces.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y3R2RTNB7B" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Y3R2RTNB7B');`,
          }}
        />
        <link rel="preload" href="/images/hero/home.jpg" as="image" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-accent-orange focus:text-white focus:px-6 focus:py-3 focus:rounded-full focus:text-sm focus:font-bold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
