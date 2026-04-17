"use client";

import { useState } from "react";
import { Check, Copy, MessageSquareQuote } from "lucide-react";

export function CopyVerdict({
  verdict,
  productName,
  url,
  score,
}: {
  verdict: string;
  productName: string;
  url: string;
  score?: number;
}) {
  const [copied, setCopied] = useState(false);

  const block = `**${productName}** — ${score ? `${score}/10` : "VanLifeKitchen review"}

"${verdict}"

Full review → ${url}`;

  function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(block).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy TL;DR for sharing"}
      title={copied ? "Copied!" : "Copy TL;DR for Reddit, Discord, etc."}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all border ${
        copied
          ? "bg-accent-green/10 border-accent-green text-accent-green"
          : "bg-white border-earth-200 text-earth-700 hover:border-earth-950 hover:text-earth-950"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
          Copied!
        </>
      ) : (
        <>
          <MessageSquareQuote className="w-3.5 h-3.5" />
          Copy TL;DR
        </>
      )}
    </button>
  );
}
