"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import tiersJson from "@/content/tools/budget-tiers.json";

type Tier = "budget" | "mid" | "premium";

type CategoryDef = {
  key: string;
  label: string;
  tiers: Record<Tier, { name: string; price: number }>;
};

const CATEGORIES = tiersJson.categories as CategoryDef[];

const TIER_STYLE: Record<Tier, { label: string; color: string }> = {
  budget: { label: "Budget", color: "bg-earth-200 text-earth-900" },
  mid: { label: "Mid-Range", color: "bg-accent-green text-white" },
  premium: { label: "Premium", color: "bg-accent-orange text-white" },
};

export default function BudgetCalculatorClient() {
  const [selections, setSelections] = useState<Record<string, Tier | null>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.key, "mid"])),
  );

  const total = useMemo(
    () =>
      CATEGORIES.reduce((sum, c) => {
        const t = selections[c.key];
        return t ? sum + c.tiers[t].price : sum;
      }, 0),
    [selections],
  );

  return (
    <section className="pt-32 pb-24 bg-earth-50 min-h-screen">
      <div className="container-page max-w-5xl">
        <Link href="/tools" className="inline-flex items-center gap-2 text-earth-500 hover:text-accent-orange mb-6 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-accent-orange rounded-2xl flex items-center justify-center text-white">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-950">Budget Calculator</h1>
            <p className="text-earth-600 mt-1">Pick a tier for each category and see what your build will cost.</p>
          </div>
        </div>

        <div className="grid gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="bg-white rounded-2xl border border-earth-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-earth-950 text-lg">{cat.label}</h3>
                <button
                  className="text-xs font-semibold text-earth-400 hover:text-earth-700"
                  onClick={() => setSelections((s) => ({ ...s, [cat.key]: null }))}
                >
                  Skip
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["budget", "mid", "premium"] as Tier[]).map((tier) => {
                  const opt = cat.tiers[tier];
                  const active = selections[cat.key] === tier;
                  return (
                    <button
                      key={tier}
                      onClick={() => setSelections((s) => ({ ...s, [cat.key]: tier }))}
                      className={`text-left rounded-xl p-4 border-2 transition-all ${
                        active
                          ? "border-accent-orange bg-accent-orange/5"
                          : "border-earth-100 hover:border-earth-300"
                      }`}
                    >
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-2 ${TIER_STYLE[tier].color}`}
                      >
                        {TIER_STYLE[tier].label}
                      </span>
                      <div className="font-semibold text-earth-900 text-sm">{opt.name}</div>
                      <div className="font-mono font-bold text-earth-950 mt-1">${opt.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 bg-earth-950 text-white rounded-3xl p-8 shadow-2xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Total Build Cost</div>
            <div className="text-4xl md:text-5xl font-display font-bold mt-1">${total.toLocaleString()}</div>
          </div>
          <Link
            href="/reviews"
            className="bg-accent-orange text-white px-6 py-3 rounded-full font-bold hover:brightness-110 transition"
          >
            Shop Picks
          </Link>
        </div>
      </div>
    </section>
  );
}
