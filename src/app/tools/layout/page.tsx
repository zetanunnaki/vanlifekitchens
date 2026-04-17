"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import layoutsJson from "@/content/tools/layouts.json";

type Van = {
  key: string;
  label: string;
  subtitle: string;
  zones: { name: string; detail: string }[];
};

const VANS = layoutsJson.vans as Van[];

export default function LayoutPlannerPage() {
  const [selected, setSelected] = useState<string>(VANS[1].key);
  const van = VANS.find((v) => v.key === selected)!;

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container-page max-w-5xl">
        <Link href="/tools" className="inline-flex items-center gap-2 text-earth-500 hover:text-accent-orange mb-6 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-accent-orange rounded-2xl flex items-center justify-center text-white">
            <LayoutGrid className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-950">Kitchen Layout Planner</h1>
            <p className="text-earth-600 mt-1">Pick your vehicle and see recommended kitchen zones.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {VANS.map((v) => (
            <button
              key={v.key}
              onClick={() => setSelected(v.key)}
              className={`text-left rounded-2xl p-5 border-2 transition ${
                selected === v.key
                  ? "border-accent-orange bg-accent-orange/5"
                  : "border-earth-100 hover:border-earth-300"
              }`}
            >
              <div className="font-display font-bold text-earth-950">{v.label}</div>
              <div className="text-xs text-earth-500 mt-1">{v.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="bg-earth-50 rounded-3xl p-8 md:p-12">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-earth-950 mb-8">
            {van.label} — Recommended Zones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {van.zones.map((z, i) => (
              <div key={z.name} className="bg-white rounded-2xl border border-earth-100 p-5 flex gap-4">
                <div className="w-12 h-12 bg-accent-orange/10 rounded-xl flex items-center justify-center text-accent-orange font-display font-bold text-xl flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-earth-950">{z.name}</h3>
                  <p className="text-earth-600 text-sm mt-1">{z.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
