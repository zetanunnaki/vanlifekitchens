"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Home, Search as SearchIcon, ShoppingBag, Wrench, X } from "lucide-react";
import { guides, products, setups } from "@/lib/data";

type SearchResult = {
  type: "review" | "guide" | "setup";
  title: string;
  subtitle: string;
  href: string;
  haystack: string;
};

const results: SearchResult[] = [
  ...products.map((p) => ({
    type: "review" as const,
    title: p.name,
    subtitle: `${p.category} · ${p.priceLabel}`,
    href: `/reviews/${p.slug}`,
    haystack: `${p.name} ${p.category} ${p.verdict} ${p.pros.join(" ")}`.toLowerCase(),
  })),
  ...guides.map((g) => ({
    type: "guide" as const,
    title: g.title,
    subtitle: `${g.category} · Guide`,
    href: `/guides/${g.slug}`,
    haystack: `${g.title} ${g.category} ${g.excerpt}`.toLowerCase(),
  })),
  ...setups.map((s) => ({
    type: "setup" as const,
    title: s.name,
    subtitle: `${s.vanType} · ${s.budget}`,
    href: `/setups/${s.slug}`,
    haystack: `${s.name} ${s.vanType}`.toLowerCase(),
  })),
];

const typeIcon = {
  review: ShoppingBag,
  guide: BookOpen,
  setup: Home,
  tool: Wrench,
};

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return results.slice(0, 8);
    const terms = q.split(/\s+/);
    return results
      .filter((r) => terms.every((t) => r.haystack.includes(t)))
      .slice(0, 20);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const hit = filtered[activeIndex];
        if (hit) {
          window.location.href = hit.href;
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-earth-950/60 flex items-start justify-center p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[75vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-earth-100 flex items-center gap-3">
          <SearchIcon className="w-5 h-5 text-earth-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews, guides, and setups..."
            className="flex-1 outline-none text-lg placeholder:text-earth-400"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-earth-400">No results for &ldquo;{query}&rdquo;</div>
          ) : (
            <ul className="py-2">
              {filtered.map((r, i) => {
                const Icon = typeIcon[r.type];
                const active = i === activeIndex;
                return (
                  <li key={`${r.type}-${r.href}`}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-center gap-4 px-5 py-3 ${
                        active ? "bg-accent-orange/10" : "hover:bg-earth-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          active ? "bg-accent-orange text-white" : "bg-earth-100 text-earth-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-earth-950 truncate">{r.title}</div>
                        <div className="text-xs text-earth-500 truncate">{r.subtitle}</div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-earth-400">
                        {r.type}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="px-5 py-3 border-t border-earth-100 flex items-center justify-between text-xs text-earth-400">
          <div className="flex gap-4">
            <span>
              <kbd className="font-mono text-[10px] bg-earth-100 px-1.5 py-0.5 rounded">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono text-[10px] bg-earth-100 px-1.5 py-0.5 rounded">↵</kbd> open
            </span>
            <span>
              <kbd className="font-mono text-[10px] bg-earth-100 px-1.5 py-0.5 rounded">esc</kbd> close
            </span>
          </div>
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
