import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { editors, editorList } from "@/lib/editors";
import { products, guides } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";

const guideCategoryToAuthor: Record<string, string> = {
  "Buying Guides": "maya",
  "Power & Solar": "maya",
  "Layout Guides": "cassidy",
  "Water Systems": "cassidy",
  "Budget Builds": "cassidy",
  "Meal Prep": "theo",
};

export function generateStaticParams() {
  return editorList.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const editor = editors[params.slug];
  if (!editor) return { title: "Author Not Found" };
  const title = `${editor.name} — ${editor.role}`;
  const description = editor.bio.slice(0, 155);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [{ url: "/images/about/cooking.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@vanlifekitchen",
      creator: "@vanlifekitchen",
      title,
      description,
    },
    alternates: { canonical: `/authors/${editor.slug}` },
  };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const editor = editors[params.slug];
  if (!editor) notFound();

  const authoredReviews = products.filter((p) => p.author === editor.name);
  const authoredGuides = guides.filter(
    (g) => guideCategoryToAuthor[g.category] === editor.slug,
  );

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: editor.name,
    jobTitle: editor.role,
    description: editor.bio,
    url: `https://vanlifekitchens.com/authors/${editor.slug}`,
    knowsAbout: editor.expertise,
    worksFor: {
      "@type": "Organization",
      name: "VanLifeKitchens",
      url: "https://vanlifekitchens.com",
    },
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "https://vanlifekitchens.com" },
    { name: "About", url: "https://vanlifekitchens.com/about" },
    { name: editor.name, url: `https://vanlifekitchens.com/authors/${editor.slug}` },
  ]);

  return (
    <article className="pt-32 pb-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="container-page max-w-4xl">
        <nav className="text-sm text-earth-500 mb-6">
          <Link href="/about" className="hover:text-accent-orange">
            About
          </Link>
          <span className="mx-2">/</span>
          <span>Editors</span>
        </nav>

        {/* Author hero */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent-orange text-white flex items-center justify-center font-display font-bold text-5xl shadow-warm-lg">
              {editor.initials}
            </div>
          </div>
          <div className="flex-1">
            <span className="eyebrow mb-4">{editor.role}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-earth-950 mt-3 mb-6 leading-[1.05] text-balance">
              {editor.name}
            </h1>
            <p className="text-earth-700 text-lg leading-relaxed mb-6 text-pretty">
              {editor.bio}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {editor.expertise.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider font-semibold text-earth-600 bg-earth-100 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-6 text-sm text-earth-500">
              <div>
                <span className="font-display text-2xl font-bold text-earth-950 tabular-nums">
                  {authoredReviews.length}
                </span>{" "}
                reviews
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-earth-950 tabular-nums">
                  {authoredGuides.length}
                </span>{" "}
                guides
              </div>
            </div>
          </div>
        </div>

        {/* Reviews authored */}
        {authoredReviews.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-3xl text-earth-950">
                Reviews by {editor.name.split(" ")[0]}
              </h2>
              <Link href="/reviews" className="btn-link">
                All reviews
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {authoredReviews.map((p) => (
                <Link
                  key={p.slug}
                  href={`/reviews/${p.slug}`}
                  className="group flex gap-4 bg-white border border-earth-100 rounded-2xl p-4 hover:shadow-soft-xl hover:border-earth-200 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-earth-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-accent-orange font-semibold mb-1">
                      {p.category}
                    </div>
                    <h3 className="font-display font-bold text-earth-950 text-base leading-tight group-hover:text-accent-orange transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-earth-500 mt-2 font-mono">
                      <span className="font-bold text-earth-900">{p.score}/10</span>
                      <span>·</span>
                      <span>{p.priceLabel}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Guides authored */}
        {authoredGuides.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-3xl text-earth-950">
                Guides by {editor.name.split(" ")[0]}
              </h2>
              <Link href="/guides" className="btn-link">
                All guides
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {authoredGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group flex gap-4 bg-white border border-earth-100 rounded-2xl p-4 hover:shadow-soft-xl hover:border-earth-200 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-earth-100">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-accent-orange font-semibold mb-1">
                      {g.category}
                    </div>
                    <h3 className="font-display font-bold text-earth-950 text-base leading-tight group-hover:text-accent-orange transition-colors line-clamp-2">
                      {g.title}
                    </h3>
                    <p className="text-xs text-earth-500 mt-2 line-clamp-1">{g.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other editors */}
        <section className="mt-20 pt-12 border-t border-earth-200">
          <h2 className="font-display font-bold text-2xl text-earth-950 mb-6">
            Other editors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {editorList
              .filter((e) => e.slug !== editor.slug)
              .map((e) => (
                <Link
                  key={e.slug}
                  href={`/authors/${e.slug}`}
                  className="group flex items-center gap-4 bg-earth-50 rounded-2xl p-5 hover:bg-earth-100 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-accent-orange text-white flex items-center justify-center font-display font-bold text-lg flex-shrink-0">
                    {e.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-earth-950 group-hover:text-accent-orange transition-colors">
                      {e.name}
                    </div>
                    <div className="text-xs text-earth-500">{e.role}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-earth-400 group-hover:text-accent-orange transition-colors" />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </article>
  );
}
