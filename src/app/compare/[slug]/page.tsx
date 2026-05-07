import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Star, Trophy, X } from "lucide-react";
import matchupsData from "@/content/matchups.json";
import { getProductBySlug, type Product } from "@/lib/data";
import { amazonLink } from "@/lib/affiliate";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";

type Matchup = {
  slug: string;
  a: string;
  b: string;
  winner: string;
  verdict: string;
  intro: string;
};

const matchups = matchupsData as Matchup[];

export function generateStaticParams() {
  return matchups.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = matchups.find((x) => x.slug === params.slug);
  if (!m) return { title: "Comparison Not Found" };
  const a = getProductBySlug(m.a);
  const b = getProductBySlug(m.b);
  if (!a || !b) return { title: "Comparison Not Found" };
  const title = `${a.name} vs ${b.name}`;
  const description = `Head-to-head comparison of the ${a.name} and the ${b.name} for van life kitchens. Specs, scores, prices, and our editorial verdict on which one to buy.`;
  return {
    title,
    description: description.slice(0, 155),
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: a.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [a.image],
    },
    alternates: { canonical: `/compare/${m.slug}` },
  };
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const m = matchups.find((x) => x.slug === params.slug);
  if (!m) notFound();
  const a = getProductBySlug(m.a);
  const b = getProductBySlug(m.b);
  if (!a || !b) notFound();

  const winnerProduct = m.winner === a.slug ? a : b;

  // Union spec keys
  const specKeys: string[] = [];
  const seen = new Set<string>();
  for (const p of [a, b]) {
    for (const k of Object.keys(p.specs)) {
      if (!seen.has(k)) {
        seen.add(k);
        specKeys.push(k);
      }
    }
  }

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "https://vanlifekitchens.com" },
    { name: "Reviews", url: "https://vanlifekitchens.com/reviews" },
    { name: "Compare", url: "https://vanlifekitchens.com/reviews/compare" },
    { name: `${a.name} vs ${b.name}`, url: `https://vanlifekitchens.com/compare/${m.slug}` },
  ]);

  return (
    <article className="pt-32 pb-32 lg:pb-24 bg-earth-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="container-page max-w-5xl">
        <nav className="text-sm text-earth-500 mb-6">
          <Link href="/reviews" className="hover:text-accent-orange">
            Reviews
          </Link>
          <span className="mx-2">/</span>
          <Link href="/reviews/compare" className="hover:text-accent-orange">
            Compare
          </Link>
        </nav>

        <span className="eyebrow mb-6">Head to Head</span>
        <h1 className="font-display text-display-md font-bold text-earth-950 mt-4 mb-6 leading-[1.05] text-balance">
          {a.name} <span className="font-serif italic text-accent-orange">vs</span> {b.name}
        </h1>
        <p className="text-earth-700 text-lg leading-relaxed mb-10 text-pretty max-w-3xl">
          {m.intro}
        </p>

        {/* Two-column hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[a, b].map((p) => {
            const isWinner = p.slug === m.winner;
            return (
              <div
                key={p.slug}
                className={`relative bg-white rounded-3xl border overflow-hidden shadow-soft-xl ${
                  isWinner
                    ? "border-accent-orange ring-2 ring-accent-orange/20"
                    : "border-earth-100"
                }`}
              >
                {isWinner && (
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-accent-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-warm">
                    <Trophy className="w-3 h-3" />
                    Editor&apos;s Pick
                  </div>
                )}
                <Link href={`/reviews/${p.slug}`}>
                  <div className="relative aspect-square bg-earth-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-earth-500 font-semibold">
                      {p.category}
                    </span>
                    <div className="bg-earth-950 text-white font-serif font-bold text-base w-12 h-12 rounded-full flex items-center justify-center tabular-nums">
                      {p.score}
                    </div>
                  </div>
                  <h2 className="font-display font-bold text-xl text-earth-950 leading-tight mb-3 text-balance">
                    <Link
                      href={`/reviews/${p.slug}`}
                      className="hover:text-accent-orange transition-colors"
                    >
                      {p.name}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-3 text-sm mb-5">
                    <div className="flex items-center gap-1 text-accent-orange">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{p.rating}</span>
                      <span className="text-earth-500 font-normal">({p.reviews})</span>
                    </div>
                    <span className="font-mono text-earth-900 font-bold">{p.priceLabel}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={amazonLink(p)}
                      rel="sponsored nofollow noopener"
                      target="_blank"
                      className="bg-accent-orange text-white text-center py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition"
                    >
                      Check Price on Amazon
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial verdict */}
        <section className="mb-14 bg-earth-950 text-white rounded-4xl p-10 md:p-14 grain relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="section-number text-earth-400">— Verdict</span>
              <span className="eyebrow">Our Pick</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4 text-balance">
              We recommend the{" "}
              <span className="font-serif italic text-accent-orange-soft">
                {winnerProduct.name}
              </span>
            </h2>
            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-white/85 text-balance">
              &ldquo;{m.verdict}&rdquo;
            </p>
            <Link
              href={`/reviews/${winnerProduct.slug}`}
              className="mt-8 inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              Read the full {winnerProduct.name} review
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Specs side-by-side */}
        <section className="bg-white rounded-3xl border border-earth-100 shadow-soft-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-earth-100">
            <div className="eyebrow mb-2">Side-by-side</div>
            <h2 className="font-display font-bold text-2xl text-earth-950">Specifications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-earth-100">
                  <th className="bg-earth-50 px-6 py-4 text-left text-[10px] uppercase tracking-widest text-earth-500 font-semibold w-40"></th>
                  <th className="px-6 py-4 text-left text-earth-950 font-display font-bold">
                    {a.name}
                  </th>
                  <th className="px-6 py-4 text-left text-earth-950 font-display font-bold">
                    {b.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                <SpecRow label="Editorial Score" a={`${a.score}/10`} b={`${b.score}/10`} mono />
                <SpecRow
                  label="User Rating"
                  a={`${a.rating} (${a.reviews} reviews)`}
                  b={`${b.rating} (${b.reviews} reviews)`}
                />
                <SpecRow label="Price" a={a.priceLabel} b={b.priceLabel} mono />
                {specKeys.map((k) => (
                  <SpecRow
                    key={k}
                    label={k}
                    a={a.specs[k] ?? "—"}
                    b={b.specs[k] ?? "—"}
                    mono
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros/cons side by side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[a, b].map((p) => (
            <div
              key={p.slug}
              className="bg-white rounded-3xl border border-earth-100 p-8 shadow-soft-xl"
            >
              <h3 className="font-display font-bold text-lg text-earth-950 mb-5">{p.name}</h3>
              <div className="mb-6">
                <div className="eyebrow mb-3">Strengths</div>
                <ul className="space-y-2">
                  {p.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex gap-2.5 text-sm text-earth-800 leading-snug"
                    >
                      <Check className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow mb-3">Trade-offs</div>
                <ul className="space-y-2">
                  {p.cons.map((con) => (
                    <li
                      key={con}
                      className="flex gap-2.5 text-sm text-earth-800 leading-snug"
                    >
                      <X className="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* More comparisons */}
        <section className="mt-16">
          <h2 className="font-display font-bold text-2xl text-earth-950 mb-6">
            More head-to-head comparisons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchups
              .filter((other) => other.slug !== m.slug)
              .slice(0, 6)
              .map((other) => {
                const oa = getProductBySlug(other.a);
                const ob = getProductBySlug(other.b);
                if (!oa || !ob) return null;
                return (
                  <Link
                    key={other.slug}
                    href={`/compare/${other.slug}`}
                    className="bg-white border border-earth-100 rounded-2xl p-5 hover:shadow-soft-xl hover:border-earth-200 transition-all"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-earth-500 font-semibold mb-2">
                      {oa.category}
                    </div>
                    <div className="font-display font-bold text-earth-950 leading-tight">
                      {oa.name} <span className="text-accent-orange italic">vs</span>{" "}
                      {ob.name}
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </article>
  );
}

function SpecRow({
  label,
  a,
  b,
  mono = false,
}: {
  label: string;
  a: React.ReactNode;
  b: React.ReactNode;
  mono?: boolean;
}) {
  const cellClass = `px-6 py-4 text-earth-800 ${mono ? "font-mono text-sm" : ""}`;
  return (
    <tr>
      <td className="bg-earth-50 px-6 py-4 text-[10px] uppercase tracking-widest text-earth-500 font-semibold align-top">
        {label}
      </td>
      <td className={cellClass}>{a}</td>
      <td className={cellClass}>{b}</td>
    </tr>
  );
}
