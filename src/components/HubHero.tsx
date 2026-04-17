"use client";

import Image from "next/image";
import { m } from "framer-motion";

export function HubHero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  italicWord,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Optional last word to render in serif italic accent */
  italicWord?: string;
}) {
  let mainTitle = title;
  let italic = italicWord;
  if (!italic) {
    // Auto-pick the last word for italic serif treatment
    const parts = title.trim().split(/\s+/);
    if (parts.length > 1) {
      italic = parts.pop();
      mainTitle = parts.join(" ");
    }
  } else {
    mainTitle = title.replace(new RegExp(`\\s*${italic}\\s*$`), "");
  }

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden bg-earth-950 grain">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-950 via-earth-950/70 to-earth-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950/95 via-earth-950/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-page w-full pt-32 pb-20">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent-orange-soft mb-7">
            <span className="block w-8 h-px bg-accent-orange-soft" />
            {eyebrow}
          </span>
          <h1 className="font-display font-bold text-white text-display-md leading-[1.02] text-balance mb-7">
            {mainTitle}{" "}
            {italic && (
              <span className="font-serif italic text-accent-orange-soft">{italic}</span>
            )}
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty">
            {subtitle}
          </p>
        </m.div>
      </div>
    </section>
  );
}
