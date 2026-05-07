import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/lib/data";
import { breadcrumbJsonLd, categoryCrumbs } from "@/lib/breadcrumbs";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };
  const count = getProductsByCategorySlug(params.slug).length;
  const title = `Best ${category.name} for Van Life`;
  const description = `Our honest, road-tested picks for the best ${category.name.toLowerCase()} for van life, RV, and overland kitchens. ${count} products reviewed.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: category.image, width: 1920, height: 1080, alt: `Best ${category.name} for van life` }] },
    twitter: {
      card: "summary_large_image",
      site: "@vanlifekitchen",
      creator: "@vanlifekitchen",
      title,
      description,
    },
    alternates: { canonical: `/reviews/category/${category.slug}` },
  };
}

export default function CategoryReviewsPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategorySlug(params.slug).sort((a, b) => b.score - a.score);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.name} for Van Life`,
    itemListElement: categoryProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://vanlifekitchens.com/reviews/${p.slug}`,
      name: p.name,
    })),
  };

  const breadcrumbLd = breadcrumbJsonLd(categoryCrumbs(category.name, category.slug));

  return (
    <section className="pt-32 pb-24 bg-earth-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="container-page">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-earth-500 hover:text-accent-orange mb-6 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> All Reviews
        </Link>

        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange mb-4">
            {category.name}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-earth-950 mb-4">
            Best {category.name} for Van Life
          </h1>
          <p className="text-earth-600 max-w-2xl mx-auto text-lg">
            {categoryProducts.length} road-tested picks, ranked by our editorial score. Every product tested in real
            van life conditions — no sponsored rankings.
          </p>
        </div>

        {category.intro && (
          <div className="max-w-3xl mx-auto mb-16 space-y-10">
            <div className="prose-editorial">
              <p className="text-lg leading-[1.85] text-earth-800">{category.intro}</p>
            </div>

            {category.buyingAdvice && (
              <div className="bg-white rounded-3xl border border-earth-100 p-8 md:p-10 shadow-soft-xl">
                <div className="flex items-center gap-4 mb-5">
                  <span className="section-number">— Buying</span>
                  <span className="eyebrow">What to Look For</span>
                </div>
                <p className="text-earth-700 leading-[1.85]">{category.buyingAdvice}</p>
              </div>
            )}

            {category.howWeTest && (
              <div className="bg-earth-950 text-white rounded-4xl p-8 md:p-10 grain relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="section-number text-earth-400">— Testing</span>
                    <span className="eyebrow">How We Test</span>
                  </div>
                  <p className="text-white/80 leading-[1.85]">{category.howWeTest}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center text-earth-500">No products reviewed in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
