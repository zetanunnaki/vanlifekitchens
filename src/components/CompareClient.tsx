"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Plus, Star, X } from "lucide-react";
import type { Product } from "@/lib/data";
import { amazonLink, walmartLink } from "@/lib/affiliate";

const MAX_COMPARE = 4;

export function CompareClient({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [picker, setPicker] = useState<number | null>(null);

  const chosen = useMemo(
    () => selected.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as Product[],
    [selected, products],
  );

  // Union of all spec keys across chosen products, in insertion order
  const specKeys = useMemo(() => {
    const keys: string[] = [];
    const seen = new Set<string>();
    for (const p of chosen) {
      for (const k of Object.keys(p.specs)) {
        if (!seen.has(k)) {
          seen.add(k);
          keys.push(k);
        }
      }
    }
    return keys;
  }, [chosen]);

  function addSlot(slot: number, slug: string) {
    setSelected((prev) => {
      const next = [...prev];
      next[slot] = slug;
      return next.filter(Boolean);
    });
    setPicker(null);
  }

  function removeAt(slot: number) {
    setSelected((prev) => prev.filter((_, i) => i !== slot));
  }

  // Grid has N chosen + 1 "add" slot up to MAX_COMPARE
  const slotCount = Math.min(chosen.length + 1, MAX_COMPARE);

  return (
    <>
      {/* Product slots */}
      <div
        className="grid gap-4 mb-10"
        style={{ gridTemplateColumns: `repeat(${slotCount}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: slotCount }).map((_, slot) => {
          const product = chosen[slot];
          if (product) {
            return (
              <div
                key={slot}
                className="relative bg-white rounded-2xl border border-earth-100 p-5 shadow-sm"
              >
                <button
                  onClick={() => removeAt(slot)}
                  aria-label="Remove"
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center text-earth-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <Link href={`/reviews/${product.slug}`} className="block">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-earth-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-base font-display font-bold text-earth-950 leading-tight">
                    {product.name}
                  </h3>
                </Link>
              </div>
            );
          }

          return (
            <button
              key={slot}
              onClick={() => setPicker(slot)}
              className="min-h-[280px] rounded-2xl border-2 border-dashed border-earth-200 hover:border-accent-orange bg-white/50 flex flex-col items-center justify-center text-earth-500 hover:text-accent-orange transition"
            >
              <Plus className="w-10 h-10 mb-2" />
              <span className="text-sm font-semibold">Add product to compare</span>
            </button>
          );
        })}
      </div>

      {/* Picker modal */}
      {picker !== null && (
        <div
          className="fixed inset-0 bg-earth-950/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPicker(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-earth-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-earth-950">Choose a product</h3>
              <button
                onClick={() => setPicker(null)}
                className="w-8 h-8 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products
                .filter((p) => !selected.includes(p.slug))
                .map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => addSlot(picker, p.slug)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-earth-100 hover:border-accent-orange hover:bg-accent-orange/5 text-left transition"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-earth-100">
                      <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                        {p.category}
                      </div>
                      <div className="font-semibold text-earth-900 text-sm leading-tight truncate">
                        {p.name}
                      </div>
                      <div className="font-mono text-xs text-earth-500 mt-0.5">{p.priceLabel}</div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison table */}
      {chosen.length >= 2 && (
        <div className="bg-white rounded-3xl border border-earth-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-earth-100">
                <Row label="Price" chosen={chosen} get={(p) => <span className="font-mono font-bold text-earth-950">{p.priceLabel}</span>} />
                <Row
                  label="Editorial Score"
                  chosen={chosen}
                  get={(p) => (
                    <span className="inline-flex items-center justify-center bg-earth-950 text-white font-display font-bold text-sm w-10 h-10 rounded-full">
                      {p.score}
                    </span>
                  )}
                />
                <Row
                  label="User Rating"
                  chosen={chosen}
                  get={(p) => (
                    <span className="inline-flex items-center gap-1 text-accent-orange">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{p.rating}</span>
                      <span className="text-earth-500 font-normal">({p.reviews})</span>
                    </span>
                  )}
                />
                <Row
                  label="Verdict"
                  chosen={chosen}
                  get={(p) => <span className="text-earth-700 leading-relaxed">{p.verdict}</span>}
                />
                <Row
                  label="Pros"
                  chosen={chosen}
                  get={(p) => (
                    <ul className="space-y-1.5">
                      {p.pros.map((pro) => (
                        <li key={pro} className="flex gap-2 text-earth-700">
                          <Check className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                />
                <Row
                  label="Cons"
                  chosen={chosen}
                  get={(p) => (
                    <ul className="space-y-1.5">
                      {p.cons.map((con) => (
                        <li key={con} className="flex gap-2 text-earth-700">
                          <X className="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                />
                {specKeys.map((key) => (
                  <Row
                    key={key}
                    label={key}
                    chosen={chosen}
                    get={(p) => (
                      <span className="font-mono text-earth-800">{p.specs[key] ?? "—"}</span>
                    )}
                  />
                ))}
                <tr>
                  <td className="bg-earth-50 px-5 py-4 font-semibold text-earth-500 uppercase text-[10px] tracking-widest align-top">
                    Buy
                  </td>
                  {chosen.map((p) => (
                    <td key={p.slug} className="px-5 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <a
                          href={amazonLink(p)}
                          rel="sponsored nofollow noopener"
                          target="_blank"
                          className="bg-accent-orange text-white text-center py-2 rounded-full text-xs font-bold hover:brightness-110 transition"
                        >
                          Amazon
                        </a>
                        <a
                          href={walmartLink(p)}
                          rel="sponsored nofollow noopener"
                          target="_blank"
                          className="bg-[#0071DC] text-white text-center py-2 rounded-full text-xs font-bold hover:brightness-110 transition"
                        >
                          Walmart
                        </a>
                        <Link
                          href={`/reviews/${p.slug}`}
                          className="text-center text-xs font-semibold text-earth-600 hover:text-accent-orange py-1"
                        >
                          Full review →
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {chosen.length < 2 && (
        <div className="text-center py-16 text-earth-500">
          Add at least two products to see a side-by-side comparison.
        </div>
      )}
    </>
  );
}

function Row({
  label,
  chosen,
  get,
}: {
  label: string;
  chosen: Product[];
  get: (p: Product) => React.ReactNode;
}) {
  return (
    <tr>
      <td className="bg-earth-50 px-5 py-4 font-semibold text-earth-500 uppercase text-[10px] tracking-widest align-top whitespace-nowrap w-48">
        {label}
      </td>
      {chosen.map((p) => (
        <td key={p.slug} className="px-5 py-4 align-top">
          {get(p)}
        </td>
      ))}
    </tr>
  );
}
