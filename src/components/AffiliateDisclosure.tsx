import Link from "next/link";
import { Info } from "lucide-react";

/**
 * FTC + Amazon Associates compliant inline disclosure.
 * Place this near the top of any page that contains affiliate links,
 * above the first buy button.
 */
export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-earth-500 italic leading-relaxed">
        <strong className="not-italic font-semibold text-earth-700">Disclosure:</strong>{" "}
        VanLifeKitchens.com is reader-supported. When you buy through links on our site, we may
        earn an affiliate commission at no cost to you. As an Amazon Associate we earn from
        qualifying purchases.{" "}
        <Link
          href="/affiliate-disclosure"
          className="text-accent-orange font-semibold hover:underline"
        >
          Learn more
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="flex gap-3 items-start bg-earth-50 border border-earth-200 rounded-2xl px-5 py-4 text-sm">
      <div className="w-8 h-8 rounded-full bg-accent-orange/15 text-accent-orange flex items-center justify-center flex-shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div className="text-earth-700 leading-relaxed">
        <strong className="text-earth-950">Disclosure:</strong> VanLifeKitchens.com is
        reader-supported. When you buy through links on our site, we may earn an affiliate
        commission at no extra cost to you. As an Amazon Associate we earn from qualifying
        purchases. Our editorial opinions are independent and not influenced by these
        commissions.{" "}
        <Link
          href="/affiliate-disclosure"
          className="text-accent-orange font-semibold hover:underline"
        >
          Read our full disclosure
        </Link>
        .
      </div>
    </div>
  );
}
