"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import appliancesJson from "@/content/tools/appliances.json";

type Appliance = {
  key: string;
  label: string;
  watts: number;
  hoursPerDay: number;
};

const APPLIANCES = appliancesJson.appliances as Appliance[];

export default function PowerCalculatorClient() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "fridge-small": true,
    induction: true,
    kettle: true,
  });

  const totals = useMemo(() => {
    const chosen = APPLIANCES.filter((a) => selected[a.key]);
    const peakWatts = chosen.reduce((s, a) => s + a.watts, 0);
    const wattHoursPerDay = chosen.reduce((s, a) => s + a.watts * a.hoursPerDay, 0);
    const ampHoursPerDay = wattHoursPerDay / 12;
    return { peakWatts, wattHoursPerDay, ampHoursPerDay };
  }, [selected]);

  const recommendedBattery = Math.ceil(totals.ampHoursPerDay * 3 / 50) * 50;
  const recommendedSolar = Math.ceil((totals.wattHoursPerDay / 4) / 50) * 50;

  return (
    <section className="pt-32 pb-24 bg-earth-50 min-h-screen">
      <div className="container-page max-w-5xl">
        <Link href="/tools" className="inline-flex items-center gap-2 text-earth-500 hover:text-accent-orange mb-6 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-accent-orange rounded-2xl flex items-center justify-center text-white">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-950">Power Calculator</h1>
            <p className="text-earth-600 mt-1">
              Select your appliances and see daily amp-hours + recommended battery/solar sizing.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,360px] gap-8">
          <div className="grid sm:grid-cols-2 gap-3">
            {APPLIANCES.map((a) => {
              const on = !!selected[a.key];
              return (
                <button
                  key={a.key}
                  onClick={() => setSelected((s) => ({ ...s, [a.key]: !on }))}
                  className={`text-left rounded-2xl p-5 border-2 transition ${
                    on ? "border-accent-orange bg-accent-orange/5" : "border-earth-100 bg-white hover:border-earth-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-earth-950">{a.label}</h3>
                    <div
                      className={`w-5 h-5 rounded-md border-2 ${
                        on ? "bg-accent-orange border-accent-orange" : "border-earth-300"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-earth-500 font-mono">
                    <span>{a.watts}W peak</span>
                    <span>~{a.hoursPerDay}h/day</span>
                  </div>
                </button>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-earth-950 text-white rounded-3xl p-8 shadow-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                Your Power Budget
              </span>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Peak Draw</div>
                  <div className="text-3xl font-display font-bold font-mono">{totals.peakWatts}W</div>
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Daily Usage</div>
                  <div className="text-3xl font-display font-bold font-mono">
                    {totals.wattHoursPerDay.toFixed(0)} Wh
                  </div>
                  <div className="text-sm text-white/60 mt-1 font-mono">
                    ({totals.ampHoursPerDay.toFixed(1)} Ah @ 12V)
                  </div>
                </div>
              </div>

              <hr className="my-6 border-white/10" />

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                    Recommended Battery
                  </div>
                  <div className="text-2xl font-display font-bold mt-1">{recommendedBattery} Ah</div>
                  <div className="text-xs text-white/50 mt-1">Lithium, 3-day buffer</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                    Recommended Solar
                  </div>
                  <div className="text-2xl font-display font-bold mt-1">{recommendedSolar}W</div>
                  <div className="text-xs text-white/50 mt-1">Assumes 4 peak-sun hours</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
