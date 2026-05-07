"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "vlk-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-earth-950 text-white rounded-2xl shadow-soft-2xl border border-white/10 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 leading-relaxed flex-1">
          We use cookies for analytics and to support our affiliate partnerships. No personal
          data is sold.{" "}
          <Link
            href="/privacy"
            className="text-accent-orange font-semibold underline underline-offset-2 hover:text-accent-orange-soft transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-bold bg-accent-orange text-white rounded-full hover:brightness-110 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
