"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { products, guides } from "@/lib/data";

const stats = [
  { value: `${products.length}`, label: "Products Tested" },
  { value: `${guides.length}`, label: "In-Depth Guides" },
  { value: "100%", label: "Independent" },
  { value: "3 yrs", label: "On the Road" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-earth-950 grain">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/home.jpg"
          alt="Van life kitchen at golden hour"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover scale-105"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-950 via-earth-950/70 to-earth-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-transparent to-earth-950/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-page w-full pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent-orange">
              <span className="block w-8 h-px bg-accent-orange" />
              The Nomad&apos;s Culinary Field Guide
            </span>
          </m.div>

          {/* Headline */}
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white text-display-lg text-balance mb-8"
          >
            Cook Anywhere.{" "}
            <span className="block">
              Live{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-serif italic text-accent-orange-soft">Everywhere.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-4 text-accent-orange/80"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
          </m.h1>

          {/* Subheadline */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-earth-100/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl text-pretty"
          >
            Independent reviews and long-form field guides for the best van life kitchen gear.
            Tested on dirt roads and desert washes — not in a lab, not by people who&apos;ve never lived in
            eighty square feet.
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <Link href="/reviews" className="btn-primary group">
              Browse Reviews
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/guides" className="btn-ghost">
              Read the Guides
            </Link>
          </m.div>

          {/* Stats bar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl pt-10 border-t border-white/15"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-4xl md:text-5xl text-white font-bold mb-1 tabular-nums">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </m.div>
      </m.div>
    </section>
  );
}
