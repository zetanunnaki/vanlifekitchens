"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${alignClass}`}
    >
      {(number || eyebrow) && (
        <div
          className={`flex items-center gap-4 mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {number && (
            <span className="section-number">— {number}</span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <h2 className="font-display font-bold text-earth-950 text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-earth-600 leading-relaxed max-w-2xl text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
