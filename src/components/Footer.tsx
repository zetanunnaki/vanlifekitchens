import Link from "next/link";
import { ArrowUpRight, Flame, Instagram, Youtube, Rss } from "lucide-react";

const followLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vanlifekitchen",
    svg: "instagram" as const,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@vanlifekitchen",
    svg: "youtube" as const,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/vanlifekitchen",
    svg: "pinterest" as const,
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/vanlifekitchen",
    svg: "x" as const,
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/vandwellers",
    svg: "reddit" as const,
  },
  {
    label: "RSS feed",
    href: "/rss.xml",
    svg: "rss" as const,
  },
];

function FollowIcon({ kind, className }: { kind: typeof followLinks[number]["svg"]; className?: string }) {
  switch (kind) {
    case "instagram":
      return <Instagram className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "rss":
      return <Rss className={className} />;
    case "pinterest":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.853c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.029 11.985.029L12.017 0z" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "reddit":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      );
  }
}

const shop = [
  { label: "Cooktops", href: "/reviews/category/cooktops" },
  { label: "12V Fridges", href: "/reviews/category/fridges" },
  { label: "Compact Cookware", href: "/reviews/category/cookware" },
  { label: "Water Filters", href: "/reviews/category/water" },
  { label: "Kitchen Storage", href: "/reviews/category/storage" },
  { label: "Solar Cooking", href: "/reviews/category/solar" },
];

const resources = [
  { label: "All Reviews", href: "/reviews" },
  { label: "Field Guides", href: "/guides" },
  { label: "Real Setups", href: "/setups" },
  { label: "Build Tools", href: "/tools" },
  { label: "Compare Gear", href: "/reviews/compare" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative bg-earth-950 text-white overflow-hidden grain">
      {/* Big editorial wordmark */}
      <div className="container-page pt-24 pb-16 relative z-10">
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl">
              <span className="eyebrow mb-6 text-accent-orange-soft">
                Built for the road
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5 mb-6 text-balance">
                Cook anywhere.{" "}
                <span className="font-serif italic text-accent-orange-soft">
                  Live everywhere.
                </span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-xl text-pretty">
                Independent reviews and long-form field guides for van dwellers, RV owners,
                and overland nomads. Tested on the road. Written by people who actually live it.
              </p>
            </div>
            <Link href="/reviews" className="btn-primary self-start lg:self-end whitespace-nowrap">
              Browse All Reviews
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center text-white shadow-warm group-hover:shadow-warm-lg transition-shadow">
                <Flame className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                VanLife<span className="text-accent-orange">Kitchen</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              Curated by nomads, for nomads. No sponsored rankings, no email list, no
              dark patterns — just honest reviews of gear that earned its place in our van.
            </p>
            <div className="flex flex-wrap gap-3">
              {followLinks.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow on ${label}`}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "me noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all"
                >
                  <FollowIcon kind={svg} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange-soft mb-6">
              Shop by Category
            </h4>
            <ul className="space-y-3">
              {shop.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange-soft mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange-soft mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure block */}
        <div className="pt-10 border-t border-white/10 mb-10">
          <p className="text-white/60 text-xs leading-relaxed max-w-4xl">
            <strong className="text-white/80 font-semibold uppercase tracking-wider text-[10px] mr-2">
              Disclosure:
            </strong>
            VanLifeKitchens.com is reader-supported. When you buy through links on our site, we may
            earn an affiliate commission at no extra cost to you. As an Amazon Associate we earn
            from qualifying purchases. Our editorial opinions are independent and not influenced
            by these commissions.{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-accent-orange-soft font-semibold hover:text-accent-orange transition-colors"
            >
              Read our full disclosure
            </Link>
            .
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs">
            © 2026 VanLifeKitchens.com — All rights reserved
          </p>
          <p className="text-white/40 text-xs text-center md:text-right">
            Curated by nomads, for nomads
          </p>
        </div>
      </div>

      {/* Massive background wordmark */}
      <div
        aria-hidden
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-serif italic text-[20vw] leading-none text-white/[0.025] whitespace-nowrap select-none pointer-events-none"
      >
        VanLifeKitchens
      </div>
    </footer>
  );
}
