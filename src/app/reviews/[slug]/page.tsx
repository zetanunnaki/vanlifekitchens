import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Star, X } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data";
import { amazonLink, walmartLink } from "@/lib/affiliate";
import { breadcrumbJsonLd, reviewCrumbs } from "@/lib/breadcrumbs";
import { reviewFaqSchema } from "@/lib/faq-schema";
import { ProductCard } from "@/components/ProductCard";
import { SocialShare } from "@/components/SocialShare";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Review Not Found" };
  const year = new Date(product.updated).getFullYear();
  const title = `${product.name} Review (${year})`;
  const description = product.verdict.slice(0, 155);
  // Note: OG/Twitter card images are generated dynamically by
  // ./opengraph-image.tsx — Next.js wires them into metadata automatically.
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      authors: [product.author],
      tags: [product.category, "van life", "review"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@vanlifekitchen",
      creator: "@vanlifekitchen",
      title,
      description,
    },
    alternates: { canonical: `/reviews/${product.slug}` },
  };
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  let Body: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/reviews/${params.slug}.mdx`);
    Body = mod.default;
  } catch {
    Body = null;
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  // Derive brand from name using a multi-word prefix heuristic so "John Boos",
  // "All-Clad", "GSI Outdoors", "Front Runner" etc. come out correct in JSON-LD.
  const brandName = (() => {
    const parts = product.name.split(" ");
    const multiWordBrands = ["John Boos", "All-Clad", "GSI Outdoors", "Front Runner", "Snow Peak", "Iris Weathertight", "Sea to Summit", "Camp Chef", "Gas One"];
    for (const b of multiWordBrands) {
      if (product.name.toLowerCase().startsWith(b.toLowerCase())) return b;
    }
    return parts[0];
  })();

  const pageUrl = `https://vanlifekitchens.com/reviews/${product.slug}`;
  const absoluteImage = product.image.startsWith("http")
    ? product.image
    : `https://vanlifekitchens.com${product.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: product.name,
    image: absoluteImage,
    description: product.verdict,
    brand: { "@type": "Brand", name: brandName },
    category: product.category,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.score,
        bestRating: 10,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: product.author,
        url: `https://vanlifekitchens.com/authors/${product.author.split(" ")[0].toLowerCase()}`,
      },
      publisher: {
        "@type": "Organization",
        name: "VanLifeKitchen",
        url: "https://vanlifekitchens.com",
      },
      datePublished: product.updated,
      dateModified: product.updated,
      reviewBody: product.verdict,
      name: `${product.name} Review`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      price: product.price,
      priceCurrency: "USD",
      priceValidUntil: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon" },
    },
  };

  const breadcrumbLd = breadcrumbJsonLd(reviewCrumbs(product.name, product.slug, product.category));
  const faqLd = reviewFaqSchema(product.slug);

  return (
    <article className="pt-32 pb-32 lg:pb-24 bg-earth-50">
      <StickyBuyBar product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="container-page">
        <nav className="text-sm text-earth-500 mb-6">
          <Link href="/reviews" className="hover:text-accent-orange">Reviews</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr,400px] gap-16">
          <div>
            <span className="eyebrow mb-6">{product.category}</span>
            <h1 className="text-display-md font-display font-bold text-earth-950 mt-4 mb-6 text-balance leading-[1.02]">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-earth-500">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold tabular-nums">{product.rating}</span>
                <span className="text-earth-500 font-normal">({product.reviews} reviews)</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-earth-300" />
              <span>Updated <time className="tabular-nums">{product.updated}</time></span>
              <span className="w-1 h-1 rounded-full bg-earth-300" />
              <span>By {product.author}</span>
            </div>

            <div className="relative aspect-[4/3] rounded-4xl overflow-hidden mb-8 shadow-soft-2xl">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.category.toLowerCase()} reviewed by VanLifeKitchen`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            <div className="mb-12">
              <AffiliateDisclosure />
            </div>

            {/* Specs Table */}
            <section className="bg-white rounded-3xl p-8 md:p-10 mb-14 border border-earth-100 shadow-soft-xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="section-number">— 01</span>
                <span className="eyebrow">Specifications</span>
              </div>
              <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline gap-4 border-b border-earth-100 pb-3">
                    <dt className="text-earth-500 text-sm uppercase tracking-wider font-semibold">{k}</dt>
                    <dd className="font-mono text-sm text-earth-900 font-semibold text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* MDX Body — editorial typography */}
            <article className="prose-editorial">
              {Body ? <Body /> : <p className="text-earth-500">Full review coming soon.</p>}
            </article>

            {/* Social share */}
            <div className="mt-12 pt-8 border-t border-earth-200">
              <SocialShare
                slug={`/reviews/${product.slug}`}
                title={`${product.name} Review`}
                description={product.verdict}
                imageUrl={`https://vanlifekitchens.com${product.image}`}
              />
            </div>

            {/* Compare CTA */}
            <div className="mt-20 p-10 bg-earth-950 text-white rounded-4xl grain relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-md relative z-10">
                <div className="eyebrow mb-3">Deciding?</div>
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-2 text-balance">
                  Compare with similar <span className="font-serif italic text-accent-orange-soft">products</span>
                </h3>
                <p className="text-white/70 text-sm">
                  See how this stacks up against the other {product.category.toLowerCase()} we&apos;ve tested.
                </p>
              </div>
              <Link href="/reviews/compare" className="btn-primary relative z-10">
                Open Comparison Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sticky Verdict Box */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-white rounded-4xl border border-earth-100 shadow-soft-2xl p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="eyebrow mb-1">Quick Verdict</div>
                  <div className="font-display text-xl font-bold text-earth-950">
                    Our Take
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="bg-earth-950 text-white font-serif font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center tabular-nums shadow-soft-xl">
                      {product.score}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-semibold text-earth-500 whitespace-nowrap bg-white px-2">
                      of 10
                    </div>
                  </div>
                </div>
              </div>

              <p className="font-serif text-lg italic leading-relaxed text-earth-800 mb-8 text-balance">
                &ldquo;{product.verdict}&rdquo;
              </p>

              <div className="mb-6">
                <div className="eyebrow mb-4">Strengths</div>
                <ul className="space-y-3">
                  {product.pros.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-earth-800 leading-snug">
                      <div className="w-5 h-5 rounded-full bg-accent-green/15 text-accent-green flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <div className="eyebrow mb-4">Trade-offs</div>
                <ul className="space-y-3">
                  {product.cons.map((c) => (
                    <li key={c} className="flex gap-3 text-sm text-earth-800 leading-snug">
                      <div className="w-5 h-5 rounded-full bg-accent-orange/15 text-accent-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-earth-100">
                <div className="text-[10px] uppercase tracking-widest text-earth-500 font-semibold mb-1">
                  Starting at
                </div>
                <div className="font-serif text-4xl font-bold text-earth-950 mb-6 tabular-nums">
                  {product.priceLabel}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={amazonLink(product)}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                    className="btn-primary w-full"
                  >
                    Check Price on Amazon
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={walmartLink(product)}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                    className="btn inline-flex w-full bg-[#0071DC] text-white px-8 py-4 rounded-full text-sm hover:brightness-110"
                  >
                    Check Price on Walmart
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-5 text-[10px] text-earth-400 text-center leading-relaxed">
                  As an Amazon Associate we earn from qualifying purchases. Prices and availability subject to change.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-earth-950 mb-8">Related Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
