import fs from "node:fs";
const path = "src/content/guides.json";
const existing = JSON.parse(fs.readFileSync(path, "utf8"));
const today = "2026-04-15";

// Backfill `updated` on everything
for (const g of existing) {
  if (!g.updated) g.updated = today;
}

const newEntries = [
  {
    slug: "12v-fridges-complete-guide",
    title: "The Complete Van Life 12V Fridge Guide (2026)",
    excerpt:
      "The definitive resource on 12V compression refrigeration for van life — how they work, how to size them, how to power them, and the 8 fridges we've tested at every price tier. Every review and guide in one place.",
    category: "Buying Guides",
    image: "/images/guides/12v-fridges-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "cooktops-complete-guide",
    title: "The Complete Van Life Cooktop Guide (2026)",
    excerpt:
      "Every fuel type, every product tier, every trade-off — the definitive guide to choosing a portable cooktop for van life. Induction, butane, propane, multi-fuel, with 9 products compared.",
    category: "Buying Guides",
    image: "/images/guides/cooktops-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "cookware-complete-guide",
    title: "The Complete Van Life Cookware Guide (2026)",
    excerpt:
      "Nesting sets, cast iron, stainless, titanium — the definitive guide to cookware for small-space van kitchens. 9 cooksets reviewed, plus the two-pan kit that covers every meal.",
    category: "Buying Guides",
    image: "/images/guides/cookware-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "water-filtration-complete-guide",
    title: "The Complete Van Life Water Filtration Guide (2026)",
    excerpt:
      "Gravity pitchers, inline RV filters, pocket purifiers, emergency straws — every approach to clean water in a van, and the 6 filters we've actually tested across contaminant profiles and use cases.",
    category: "Buying Guides",
    image: "/images/guides/water-filtration-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "storage-complete-guide",
    title: "The Complete Van Kitchen Storage Guide (2026)",
    excerpt:
      "Hard cases, weathertight bins, slide-out drawers, magnetic racks — the definitive guide to organizing a van galley. 6 storage systems tested, plus the modular approach that survives washboard roads.",
    category: "Buying Guides",
    image: "/images/guides/storage-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "solar-cooking-complete-guide",
    title: "The Complete Van Life Solar Cooking Guide (2026)",
    excerpt:
      "Can you really cook with the sun from a van? The definitive guide to tube cookers, box ovens, and hybrid solar-electric systems — 4 products compared, with honest notes on what actually works.",
    category: "Buying Guides",
    image: "/images/guides/solar-cooking-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "coffee-complete-guide",
    title: "The Complete Van Life Coffee Guide (2026)",
    excerpt:
      "Pour-over, AeroPress, moka pot, espresso, French press — the definitive guide to making coffee on the road. 8 coffee tools tested, with the one-gear-list-for-one-morning-ritual recommendation.",
    category: "Buying Guides",
    image: "/images/guides/coffee-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "knives-prep-complete-guide",
    title: "The Complete Van Kitchen Knives & Prep Guide (2026)",
    excerpt:
      "The two-knife rule, the mandoline question, the cutting board debate — the definitive guide to knives and prep tools for van kitchens. 5 tools tested, plus safe storage and sharpening for life on the road.",
    category: "Buying Guides",
    image: "/images/guides/knives-prep-complete-guide.jpg",
    updated: today,
  },
  {
    slug: "best-portable-cooktops-van-life-2026",
    title: "Best Portable Cooktops for Van Life (2026)",
    excerpt:
      "The top 5 portable cooktops for van life, ranked by fuel type and price tier. Induction, butane, propane — every editor's pick with real power numbers, boil times, and the trade-offs that matter.",
    category: "Buying Guides",
    image: "/images/guides/best-portable-cooktops-van-life-2026.jpg",
    updated: today,
  },
  {
    slug: "best-van-life-cookware-2026",
    title: "Best Van Life Cookware Sets (2026)",
    excerpt:
      "The 5 best cookware sets for van life in 2026, from $60 weekender kits to $400 marine-grade nested sets. Every option tested on real van builds with real cooking loads.",
    category: "Buying Guides",
    image: "/images/guides/best-van-life-cookware-2026.jpg",
    updated: today,
  },
  {
    slug: "best-water-filters-van-life-2026",
    title: "Best Water Filters for Van Life (2026)",
    excerpt:
      "The 5 water filters every van dweller should consider — from $40 backup filters to $200 premium inline systems. Ranked by contaminant coverage, daily use, and honest budget.",
    category: "Buying Guides",
    image: "/images/guides/best-water-filters-van-life-2026.jpg",
    updated: today,
  },
  {
    slug: "best-van-kitchen-storage-2026",
    title: "Best Van Kitchen Storage Solutions (2026)",
    excerpt:
      "Pantry bins, slide-out drawers, magnetic spice racks, rugged hard cases — the 5 storage products every van kitchen should consider in 2026, with real-world use case tests.",
    category: "Buying Guides",
    image: "/images/guides/best-van-kitchen-storage-2026.jpg",
    updated: today,
  },
  {
    slug: "best-coffee-gear-van-life-2026",
    title: "Best Coffee Gear for Van Life (2026)",
    excerpt:
      "The 6 coffee tools we carry in our van kitchens in 2026 — from a $45 AeroPress to a $100 portable espresso press. Ranked by real-world daily use and taste ceiling.",
    category: "Buying Guides",
    image: "/images/guides/best-coffee-gear-van-life-2026.jpg",
    updated: today,
  },
  {
    slug: "best-van-knives-prep-tools-2026",
    title: "Best Van Kitchen Knives and Prep Tools (2026)",
    excerpt:
      "The 5 prep tools every van kitchen should own in 2026 — from a $22 Opinel folding knife to a $55 heirloom maple cutting board. Tested across real daily-use conditions.",
    category: "Buying Guides",
    image: "/images/guides/best-van-knives-prep-tools-2026.jpg",
    updated: today,
  },
  {
    slug: "winter-van-kitchen-essentials-2026",
    title: "Winter Van Kitchen Essentials: Gear Guide for Sub-Freezing Cooking (2026)",
    excerpt:
      "The gear that keeps a van kitchen functional when temperatures drop below freezing — cold-rated butane, insulated cookware, freeze-proof water systems, and the backup heat sources that actually work.",
    category: "Buying Guides",
    image: "/images/guides/winter-van-kitchen-essentials-2026.jpg",
    updated: today,
  },
  {
    slug: "summer-van-kitchen-survival-2026",
    title: "Summer Van Kitchen Survival Guide: Cooking in 100°F Heat (2026)",
    excerpt:
      "How to cook real meals in a van when the interior hits 110°F — solar cooking, outdoor prep zones, heat-shedding gear, and the workflow changes that keep the cabin livable in peak summer.",
    category: "Buying Guides",
    image: "/images/guides/summer-van-kitchen-survival-2026.jpg",
    updated: today,
  },
];

// Drop any collisions (idempotent if re-run)
const existingSlugs = new Set(existing.map((g) => g.slug));
const toAdd = newEntries.filter((g) => !existingSlugs.has(g.slug));

const combined = [...toAdd, ...existing];
fs.writeFileSync(path, JSON.stringify(combined, null, 2) + "\n");
console.log(`total guides: ${combined.length}, added: ${toAdd.length}`);
