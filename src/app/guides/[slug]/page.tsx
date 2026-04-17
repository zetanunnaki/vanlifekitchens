import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/data";
import { breadcrumbJsonLd, guideCrumbs } from "@/lib/breadcrumbs";
import { guideFaqSchema } from "@/lib/faq-schema";
import { editors } from "@/lib/editors";
import { SocialShare } from "@/components/SocialShare";
import { ReadingProgress } from "@/components/ReadingProgress";

const guideAuthorByCategory: Record<string, keyof typeof editors> = {
  "Buying Guides": "maya",
  "Power & Solar": "maya",
  "Layout Guides": "cassidy",
  "Water Systems": "cassidy",
  "Budget Builds": "cassidy",
  "Meal Prep": "theo",
};

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) return { title: "Guide Not Found" };
  const description = guide.excerpt.slice(0, 155);
  const ogImage = `/og/guides/${guide.slug}.png`;
  return {
    title: guide.title,
    description,
    openGraph: {
      title: guide.title,
      description,
      type: "article",
      tags: [guide.category, "van life", "guide"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@vanlifekitchen",
      creator: "@vanlifekitchen",
      title: guide.title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) notFound();

  let Body: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/guides/${params.slug}.mdx`);
    Body = mod.default;
  } catch {
    Body = null;
  }

  const authorEditor = editors[guideAuthorByCategory[guide.category] ?? "maya"];
  const pageUrl = `https://vanlifekitchens.com/guides/${guide.slug}`;
  const absoluteImage = guide.image.startsWith("http")
    ? guide.image
    : `https://vanlifekitchens.com${guide.image}`;
  const updated = guide.updated ?? "2026-04-15";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: guide.title,
    image: [absoluteImage],
    description: guide.excerpt,
    articleSection: guide.category,
    datePublished: updated,
    dateModified: updated,
    author: {
      "@type": "Person",
      name: authorEditor.name,
      jobTitle: authorEditor.role,
      url: `https://vanlifekitchens.com/authors/${authorEditor.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "VanLifeKitchen",
      url: "https://vanlifekitchens.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vanlifekitchens.com/images/hero/og-default.jpg",
        width: 1920,
        height: 1080,
      },
    },
  };

  const breadcrumbLd = breadcrumbJsonLd(guideCrumbs(guide.title, guide.slug, guide.category));
  const faqLd = guideFaqSchema(guide.slug);

  return (
    <article className="pt-32 pb-24 bg-white">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <div className="container-page max-w-3xl">
        <nav className="text-sm text-earth-500 mb-6">
          <Link href="/guides" className="hover:text-accent-orange">Guides</Link>
          <span className="mx-2">/</span>
          <span>{guide.category}</span>
        </nav>
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange mb-4">
          {guide.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-earth-950 mb-6 leading-tight">
          {guide.title}
        </h1>
        <p className="text-earth-600 text-lg mb-6">{guide.excerpt}</p>
        <div className="flex items-center gap-3 mb-12 text-sm text-earth-500">
          <Image
            src={`/images/authors/${authorEditor.slug}.jpg`}
            alt={authorEditor.name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div>
            By <strong className="text-earth-900">{authorEditor.name}</strong> · {authorEditor.role}
            {updated && (
              <>
                <span className="mx-2">·</span>
                <time className="tabular-nums">Updated {updated}</time>
              </>
            )}
          </div>
        </div>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          {Body ? <Body /> : <p className="text-earth-500">Full guide coming soon.</p>}
        </div>

        {/* Social share */}
        <div className="mt-12 pt-8 border-t border-earth-200">
          <SocialShare
            slug={`/guides/${guide.slug}`}
            title={guide.title}
            description={guide.excerpt}
            imageUrl={`https://vanlifekitchens.com${guide.image}`}
          />
        </div>

        {(() => {
          const related = guides
            .filter((g) => g.slug !== guide.slug && g.category === guide.category)
            .slice(0, 3);
          if (related.length === 0) return null;
          return (
            <section className="mt-20 pt-12 border-t border-earth-100">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-earth-950 mb-8">
                More in {guide.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={g.image}
                        alt={g.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-base font-display font-bold text-earth-950 group-hover:text-accent-orange transition-colors leading-tight">
                      {g.title}
                    </h3>
                    <p className="text-earth-500 text-xs mt-2 line-clamp-2">{g.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </article>
  );
}
