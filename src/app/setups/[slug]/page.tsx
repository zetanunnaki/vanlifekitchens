import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { setups, products } from "@/lib/data";
import { breadcrumbJsonLd, setupCrumbs } from "@/lib/breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { SocialShare } from "@/components/SocialShare";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return setups.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const setup = setups.find((s) => s.slug === params.slug);
  if (!setup) return { title: "Setup Not Found" };
  const title = `${setup.name} — ${setup.vanType} Kitchen Build`;
  const description = `Inside the ${setup.name}: a real ${setup.vanType} van kitchen build with a total gear cost of ${setup.budget}. Every product, every trade-off, every lesson learned.`;
  const ogImage = `/og/setups/${setup.slug}.png`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      tags: [setup.vanType, "van life", "build"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@vanlifekitchen",
      creator: "@vanlifekitchen",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `/setups/${setup.slug}` },
  };
}

export default async function SetupDetailPage({ params }: { params: { slug: string } }) {
  const setup = setups.find((s) => s.slug === params.slug);
  if (!setup) notFound();

  let Body: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/setups/${params.slug}.mdx`);
    Body = mod.default;
  } catch {
    Body = null;
  }

  const pageUrl = `https://vanlifekitchens.com/setups/${setup.slug}`;
  const absoluteImage = setup.image.startsWith("http")
    ? setup.image
    : `https://vanlifekitchens.com${setup.image}`;
  const published = setup.published ?? "2025-06-01";
  const updated = setup.updated ?? new Date().toISOString().slice(0, 10);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: `${setup.name} — ${setup.vanType} Kitchen Build`,
    image: [absoluteImage],
    description: `Inside the ${setup.name}: a real ${setup.vanType} van kitchen build with a total gear cost of ${setup.budget}.`,
    articleSection: "Setups",
    datePublished: published,
    dateModified: updated,
    author: {
      "@type": "Organization",
      name: "VanLifeKitchens Editorial Team",
      url: "https://vanlifekitchens.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "VanLifeKitchens",
      url: "https://vanlifekitchens.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vanlifekitchens.com/images/hero/og-default.jpg",
      },
    },
  };
  const breadcrumbLd = breadcrumbJsonLd(setupCrumbs(setup.name, setup.slug));

  return (
    <article className="pt-32 pb-24 bg-earth-50">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="container-page">
        <nav className="text-sm text-earth-500 mb-6">
          <Link href="/setups" className="hover:text-accent-orange">Setups</Link>
          <span className="mx-2">/</span>
          <span>{setup.vanType}</span>
        </nav>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-earth-950 mb-4">{setup.name}</h1>
        <div className="flex flex-wrap gap-4 mb-10 text-sm">
          <span className="bg-earth-100 px-4 py-2 rounded-full font-semibold text-earth-700">{setup.vanType}</span>
          <span className="bg-earth-100 px-4 py-2 rounded-full font-semibold text-earth-700">Total: {setup.budget}</span>
          <span className="bg-earth-100 px-4 py-2 rounded-full font-semibold text-earth-700">Full-time build</span>
        </div>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
          <Image
            src={setup.image}
            alt={setup.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-3xl prose">
          {Body ? <Body /> : <p className="text-earth-500">Full build notes coming soon.</p>}
        </div>

        <div className="max-w-3xl mt-12 pt-8 border-t border-earth-200">
          <SocialShare
            slug={`/setups/${setup.slug}`}
            title={`${setup.name} — ${setup.vanType} Kitchen Build`}
            description={`A real ${setup.vanType} van kitchen build with a total gear cost of ${setup.budget}.`}
            imageUrl={absoluteImage}
          />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-earth-950 mb-8">The Gear List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
