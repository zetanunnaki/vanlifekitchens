#!/usr/bin/env node
/**
 * generate-og-images.mjs
 * Generates static OG images (1200x630 PNG) for all reviews, guides, and setups.
 * Uses satori + @resvg/resvg-js. Run: node scripts/generate-og-images.mjs
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Data ──────────────────────────────────────────────────────────────
const products = JSON.parse(readFileSync(join(ROOT, "src/content/products.json"), "utf-8"));
const guides   = JSON.parse(readFileSync(join(ROOT, "src/content/guides.json"), "utf-8"));
const setups   = JSON.parse(readFileSync(join(ROOT, "src/content/setups.json"), "utf-8"));

// ── Output dirs ───────────────────────────────────────────────────────
const DIRS = {
  reviews: join(ROOT, "public/og/reviews"),
  guides:  join(ROOT, "public/og/guides"),
  setups:  join(ROOT, "public/og/setups"),
};
for (const d of Object.values(DIRS)) mkdirSync(d, { recursive: true });

// ── Fonts ─────────────────────────────────────────────────────────────
const FONT_URLS = {
  regular: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf",
  bold:    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf",
};

let fontsCache = null;

async function loadFonts() {
  if (fontsCache) return fontsCache;
  console.log("Downloading Inter fonts...");
  const [regular, bold] = await Promise.all([
    fetch(FONT_URLS.regular).then((r) => r.arrayBuffer()),
    fetch(FONT_URLS.bold).then((r) => r.arrayBuffer()),
  ]);
  fontsCache = [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: bold,    weight: 700, style: "normal" },
  ];
  console.log("Fonts loaded.");
  return fontsCache;
}

// ── Helpers ───────────────────────────────────────────────────────────
const WIDTH  = 1200;
const HEIGHT = 630;

function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "\u2026" : text;
}

async function renderPng(jsx, fonts) {
  const svg = await satori(jsx, { width: WIDTH, height: HEIGHT, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  return resvg.render().asPng();
}

// ── VLK logo element (reused in footers) ──────────────────────────────
function vlkBadge() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "18px",
              background: "#d97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
            },
            children: "VLK",
          },
        },
        {
          type: "span",
          props: {
            style: { fontSize: "18px", color: "#78716c" },
            children: "vanlifekitchens.com",
          },
        },
      ],
    },
  };
}

// ── REVIEW layout ─────────────────────────────────────────────────────
function reviewJsx(product) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: "#faf8f5",
        fontFamily: "Inter",
      },
      children: [
        // Orange accent bar
        {
          type: "div",
          props: { style: { width: "100%", height: "12px", background: "#d97706" } },
        },
        // Body
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              padding: "48px 56px 0 56px",
              gap: "48px",
            },
            children: [
              // Left
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "center",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#d97706",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          marginBottom: "16px",
                        },
                        children: `${product.category} \u00b7 Review`,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: product.name.length > 50 ? "32px" : "40px",
                          fontWeight: 700,
                          color: "#1c1917",
                          lineHeight: 1.15,
                          marginBottom: "20px",
                        },
                        children: truncate(product.name, 80),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "18px",
                          fontStyle: "italic",
                          color: "#57534e",
                          lineHeight: 1.5,
                        },
                        children: truncate(product.verdict, 140),
                      },
                    },
                  ],
                },
              },
              // Right — score card
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1c1917",
                    borderRadius: "20px",
                    width: "220px",
                    minWidth: "220px",
                    height: "280px",
                    padding: "32px 24px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "72px",
                          fontWeight: 700,
                          color: "#fbbf24",
                          lineHeight: 1,
                        },
                        children: String(product.score),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "18px",
                          color: "#a8a29e",
                          marginTop: "4px",
                        },
                        children: "of 10",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#fff",
                          marginTop: "24px",
                        },
                        children: product.priceLabel,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Footer
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 56px 36px 56px",
            },
            children: [
              vlkBadge(),
              {
                type: "span",
                props: {
                  style: { fontSize: "16px", color: "#a8a29e" },
                  children: `Review by ${product.author}`,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── GUIDE layout ──────────────────────────────────────────────────────
function guideJsx(guide) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: "#1c1917",
        fontFamily: "Inter",
      },
      children: [
        // Orange accent bar
        {
          type: "div",
          props: { style: { width: "100%", height: "12px", background: "#d97706" } },
        },
        // Body
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              padding: "0 64px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fbbf24",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "20px",
                  },
                  children: `Field Guide \u00b7 ${guide.category}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: guide.title.length > 45 ? "38px" : "48px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.15,
                    marginBottom: "24px",
                  },
                  children: truncate(guide.title, 90),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "20px",
                    color: "#d6d3d1",
                    lineHeight: 1.5,
                  },
                  children: truncate(guide.excerpt, 180),
                },
              },
            ],
          },
        },
        // Footer
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 64px 40px 64px",
            },
            children: [
              // VLK badge with white text
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: "10px" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: "36px",
                          height: "36px",
                          borderRadius: "18px",
                          background: "#d97706",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: 700,
                        },
                        children: "VLK",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: { fontSize: "18px", color: "#a8a29e" },
                        children: "vanlifekitchens.com",
                      },
                    },
                  ],
                },
              },
              {
                type: "span",
                props: {
                  style: { fontSize: "16px", color: "#78716c" },
                  children: "Independent \u00b7 Ad-free",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── SETUP layout ──────────────────────────────────────────────────────
function setupJsx(setup) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: "#fef3e2",
        fontFamily: "Inter",
      },
      children: [
        // Orange accent bar
        {
          type: "div",
          props: { style: { width: "100%", height: "12px", background: "#d97706" } },
        },
        // Body
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              padding: "0 64px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#d97706",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "20px",
                  },
                  children: `Real Setup \u00b7 ${setup.vanType}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "52px",
                    fontWeight: 700,
                    color: "#1c1917",
                    lineHeight: 1.15,
                    marginBottom: "24px",
                  },
                  children: truncate(setup.name, 60),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "22px",
                    color: "#57534e",
                    lineHeight: 1.5,
                  },
                  children: "Inside the build \u2014 every product, every trade-off, every lesson learned.",
                },
              },
            ],
          },
        },
        // Footer
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 64px 40px 64px",
            },
            children: [
              vlkBadge(),
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: { fontSize: "14px", color: "#a8a29e", textTransform: "uppercase", letterSpacing: "1px" },
                        children: "Total gear cost",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: { fontSize: "28px", fontWeight: 700, color: "#1c1917" },
                        children: setup.budget,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  const fonts = await loadFonts();
  let generated = 0;
  const total = products.length + guides.length + setups.length;

  console.log(`Generating ${total} OG images (${products.length} reviews, ${guides.length} guides, ${setups.length} setups)...\n`);

  const tasks = [
    ...products.map(async (p) => {
      const png = await renderPng(reviewJsx(p), fonts);
      writeFileSync(join(DIRS.reviews, `${p.slug}.png`), png);
      generated++;
      console.log(`  [${generated}/${total}] reviews/${p.slug}.png`);
    }),
    ...guides.map(async (g) => {
      const png = await renderPng(guideJsx(g), fonts);
      writeFileSync(join(DIRS.guides, `${g.slug}.png`), png);
      generated++;
      console.log(`  [${generated}/${total}] guides/${g.slug}.png`);
    }),
    ...setups.map(async (s) => {
      const png = await renderPng(setupJsx(s), fonts);
      writeFileSync(join(DIRS.setups, `${s.slug}.png`), png);
      generated++;
      console.log(`  [${generated}/${total}] setups/${s.slug}.png`);
    }),
  ];

  await Promise.all(tasks);
  console.log(`\nDone! ${generated} OG images written to public/og/`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
