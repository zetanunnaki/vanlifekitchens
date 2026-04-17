"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, Menu, Search, X } from "lucide-react";
import { SearchDialog } from "./SearchDialog";
import { WishlistCount } from "./WishlistCount";

const nav = [
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/setups", label: "Setups" },
  { href: "/tools", label: "Tools" },
  { href: "/reviews/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Home page has a dark hero — use white nav text when not scrolled
  const onHome = pathname === "/";
  const useDarkText = scrolled || !onHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center text-white shadow-warm group-hover:shadow-warm-lg transition-shadow">
            <Flame className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <span
            className={`text-xl font-display font-bold tracking-tight transition-colors ${
              useDarkText ? "text-earth-950" : "text-white"
            }`}
          >
            VanLife<span className="text-accent-orange">Kitchen</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = isActive(n.href, pathname);
            return (
              <Link
                key={n.label}
                href={n.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                  useDarkText
                    ? active
                      ? "text-accent-orange"
                      : "text-earth-700 hover:text-earth-950"
                    : active
                      ? "text-accent-orange-soft"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-accent-orange"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold transition-all ${
              useDarkText
                ? "border-earth-200 text-earth-600 hover:border-earth-300 hover:text-earth-950 bg-white/50"
                : "border-white/25 text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-md"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Search
            <kbd
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                useDarkText ? "bg-earth-100 text-earth-500" : "bg-white/15 text-white/70"
              }`}
            >
              ⌘K
            </kbd>
          </button>
          <div className={useDarkText ? "" : "text-white"}>
            <WishlistCount />
          </div>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="w-6 h-6 text-earth-950" />
          ) : (
            <Menu className={`w-6 h-6 ${useDarkText ? "text-earth-950" : "text-white"}`} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-soft-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="text-lg font-medium text-earth-800 border-b border-earth-100 py-3"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 btn-primary"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
