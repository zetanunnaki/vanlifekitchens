#!/usr/bin/env tsx
/**
 * Generate images for VanLifeKitchen.com via Kie.ai (Flux Kontext Pro).
 * Idempotent — skips entries that already have a non-picsum image URL.
 *
 * Usage: npx tsx scripts/generate-images.ts [--force] [--only=reviews|guides|setups|categories|hero]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// Load .env.local manually (avoid adding dotenv dep)
function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

const KIE_API_KEY = process.env.KIE_API_KEY;
if (!KIE_API_KEY) {
  console.error("KIE_API_KEY not set in .env.local or environment");
  process.exit(1);
}

const KIE_BASE = "https://api.kie.ai";
const POLL_INTERVAL_MS = 2500;
const POLL_MAX_ATTEMPTS = 60; // ~2.5 minutes

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const onlyArg = args.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.split("=")[1] : null;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateImage(
  prompt: string,
  aspectRatio: string,
  model: "flux-kontext-pro" | "flux-kontext-max" = "flux-kontext-pro",
): Promise<string> {
  const createRes = await fetch(`${KIE_BASE}/api/v1/flux/kontext/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KIE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, aspectRatio, model, outputFormat: "jpeg" }),
  });
  const createJson = await createRes.json();
  if (createJson.code !== 200 || !createJson.data?.taskId) {
    throw new Error(`Create task failed: ${JSON.stringify(createJson)}`);
  }
  const taskId = createJson.data.taskId;

  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    await sleep(POLL_INTERVAL_MS);
    const pollRes = await fetch(
      `${KIE_BASE}/api/v1/flux/kontext/record-info?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${KIE_API_KEY}` } },
    );
    const pollJson = await pollRes.json();
    const data = pollJson.data;
    if (!data) continue;
    if (data.successFlag === 1) {
      const url = data.response?.resultImageUrl;
      if (!url) throw new Error(`Success but no resultImageUrl: ${JSON.stringify(data)}`);
      return url;
    }
    if (data.successFlag === 2 || data.successFlag === 3) {
      throw new Error(`Task failed: ${data.errorMessage ?? "unknown"} (flag ${data.successFlag})`);
    }
    // successFlag === 0 -> still generating
  }
  throw new Error(`Task ${taskId} timed out after ${POLL_MAX_ATTEMPTS} polls`);
}

async function downloadImage(url: string, destPath: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
}

function isPlaceholder(url: string): boolean {
  return !url || url.includes("picsum.photos") || url.includes("unsplash.com");
}

// Returns true if the entry needs generation: either placeholder, or a local
// path that doesn't yet exist on disk (newly added entry before images were run).
function needsGeneration(imageUrl: string, localPath: string): boolean {
  if (FORCE) return true;
  if (isPlaceholder(imageUrl)) return true;
  if (imageUrl.startsWith("/images/") && !fs.existsSync(path.join(ROOT, localPath))) return true;
  return false;
}

type ImageTask = {
  type: "review" | "guide" | "setup" | "category" | "hero";
  slug: string;
  prompt: string;
  aspectRatio: string;
  model?: "flux-kontext-pro" | "flux-kontext-max";
  destRelative: string;
  updateJson: (newPath: string) => void;
};

// Build the task list
const tasks: ImageTask[] = [];

// Helper to save a JSON file after mutation
const jsonSavers = new Map<string, () => void>();
function registerJsonSaver(filePath: string, obj: unknown) {
  jsonSavers.set(filePath, () => fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n"));
}

// Products
const productsPath = path.join(ROOT, "src/content/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8")) as Array<{
  slug: string;
  name: string;
  category: string;
  verdict: string;
  image: string;
}>;
registerJsonSaver(productsPath, products);

const productPromptStyle = (p: (typeof products)[number]) => {
  const base = `studio product photography of a ${p.name}, clean neutral background, soft diffused softbox lighting, photorealistic, high detail, commercial catalog style, earthy warm tones`;
  const categoryHint: Record<string, string> = {
    "12V Fridges": "portable 12V refrigerator cooler for van life",
    Cooktops: "portable cooking appliance for van camper kitchen",
    "Compact Cookware": "nesting stainless steel cookware set",
    "Water Filters": "water filtration system for outdoor use",
    "Kitchen Storage": "heavy-duty storage container for outdoor adventure",
    "Solar Cooking": "solar-powered cooking device outdoor",
    "Small Appliances": "compact portable kitchen appliance for camper van",
    "Knives & Prep": "kitchen prep tool or knife on a wooden cutting board",
    Drinkware: "insulated stainless steel water bottle or tumbler",
    "Coffee Gear": "coffee brewing equipment for camping and van life",
  };
  const hint = categoryHint[p.category] || "";
  return `${base}, ${hint}`.trim();
};

for (const p of products) {
  if (ONLY && ONLY !== "reviews") continue;
  const dest = `public/images/reviews/${p.slug}.jpg`;
  if (!needsGeneration(p.image, dest)) continue;
  tasks.push({
    type: "review",
    slug: p.slug,
    prompt: productPromptStyle(p),
    aspectRatio: "1:1",
    destRelative: dest,
    updateJson: (newPath) => {
      p.image = newPath;
    },
  });
}

// Categories
const categoriesPath = path.join(ROOT, "src/content/categories.json");
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8")) as Array<{
  slug: string;
  name: string;
  image: string;
}>;
registerJsonSaver(categoriesPath, categories);

const categoryPrompt = (name: string) => {
  const scenes: Record<string, string> = {
    Cooktops: "portable induction cooktop on a wooden van counter, warm morning light streaming through a window, a cast iron pan on top, photorealistic lifestyle photography, earth tones",
    "12V Fridges": "a 12V compressor fridge in a camper van interior, fresh produce visible inside, warm golden hour light, photorealistic lifestyle photography",
    "Compact Cookware": "nesting stainless steel cookware set arranged on a wooden table in a camper van, soft natural window light, photorealistic lifestyle photography, earth tones",
    "Water Filters": "a gravity water filter on a wooden counter next to a clear glass of water, soft morning window light, photorealistic lifestyle photography, earth tones",
    "Kitchen Storage": "stacked durable storage containers with dry goods inside a camper van pantry cabinet, warm soft light, photorealistic lifestyle photography",
    "Solar Cooking": "a solar cooker deployed outside a camper van in golden hour sunlight, mountains in the background, photorealistic lifestyle photography",
    "Coffee Gear": "a beautiful coffee setup on a wooden van counter — pour-over dripper, hand grinder, and steaming mug — golden morning window light, warm earth tones, photorealistic lifestyle photography",
    "Knives & Prep": "a chef knife and a wooden cutting board on a van galley counter with fresh vegetables nearby, soft morning light, warm earth tones, photorealistic lifestyle photography",
    "Small Appliances": "compact kitchen appliances arranged on a camper van counter — a small blender, a vacuum sealer, and a stove-top oven — warm afternoon light, lifestyle product photography, earth tones",
    Drinkware: "a collection of insulated stainless steel water bottles and tumblers on a wooden picnic table at a campsite, golden hour light, mountain background, lifestyle photography, warm earth tones",
  };
  return scenes[name] || `${name} for van life kitchen, photorealistic lifestyle photography, warm earth tones`;
};

for (const c of categories) {
  if (ONLY && ONLY !== "categories") continue;
  const dest = `public/images/categories/${c.slug}.jpg`;
  if (!needsGeneration(c.image, dest)) continue;
  tasks.push({
    type: "category",
    slug: c.slug,
    prompt: categoryPrompt(c.name),
    aspectRatio: "9:16",
    destRelative: dest,
    updateJson: (newPath) => {
      c.image = newPath;
    },
  });
}

// Guides
const guidesPath = path.join(ROOT, "src/content/guides.json");
const guides = JSON.parse(fs.readFileSync(guidesPath, "utf8")) as Array<{
  slug: string;
  title: string;
  category: string;
  image: string;
}>;
registerJsonSaver(guidesPath, guides);

const guidePrompt = (g: (typeof guides)[number]) => {
  const base = "photorealistic editorial photography, warm earth tones, soft natural lighting";
  const scenes: Record<string, string> = {
    "12v-fridge-buying-guide": "a 12V compressor fridge being installed in a camper van, tools nearby, warm afternoon light",
    "van-kitchen-layouts": "a beautifully built camper van kitchen galley interior, wooden cabinets, induction cooktop, sink, and storage visible, golden hour light through the rear doors",
    "one-pot-meals-road": "a single pot of simmering stew on an induction cooktop in a camper van kitchen, steam rising, warm evening light, cozy atmosphere",
    "van-kitchen-power-budget": "a lithium battery bank, inverter, and solar charge controller installed in a camper van electrical compartment, clean wiring, technical documentary style",
    "induction-vs-butane-vs-propane": "three cooktops side by side on a wooden surface — an induction cooktop, a butane burner, and a propane burner — product comparison lighting",
    "van-water-system-setup": "a van water system under a galley counter — fresh water tank, 12V pump, and plumbing — technical documentary photography",
    "van-kitchen-storage-solutions": "an organized camper van pantry cabinet with magnetic spice jars on a wall, stackable bins, and labeled dry goods, warm natural light",
    "van-pantry-shelf-stable-staples": "a top-down flatlay of shelf-stable pantry staples on a wooden surface — canned tomatoes, rice, pasta, olive oil, spices — warm golden light",
    "cold-weather-van-cooking": "a cozy camper van kitchen scene in winter, frosted window, steam rising from a pot, warm interior lighting, snow visible outside",
    "van-kitchen-dishwashing-system": "two collapsible silicone wash bins on a wooden van kitchen counter next to a bar sink, soapy water in one bin, clean stacked dishes drying on a roll-up rack, warm afternoon window light, documentary photography, earth tones",
    "van-kitchen-ventilation-guide": "a 300 CFM range hood installed above a two-burner induction cooktop in a beautifully built camper van kitchen, steam rising from a pot being drawn up into the hood vent, warm soft lighting, technical documentary photography",
    "budget-van-kitchen-under-500": "a complete minimalist van kitchen setup laid out on a wooden surface — a single-burner butane stove, a stainless cookset, two silicone bowls, a 5-gallon water jug, a basic knife, a folding cutting board — affordable practical gear flat-lay photography, warm earth tones",
    "best-battery-bank-van-kitchen": "a clean lithium LiFePO4 battery installation in a camper van with neat wiring, busbars, fuses, and an inverter visible, technical documentary photography, soft natural light, warm earth tones",
    "van-cooking-safety-guide": "a small carbon monoxide detector and a fire extinguisher mounted near a camper van galley with a stovetop in soft focus background, safety equipment focus, warm interior lighting, photorealistic editorial photography",
    "diy-van-sink-setup-under-100": "a simple DIY camper van bar sink installation with a foot pump and clear water lines visible underneath, hands working with basic tools nearby, documentary build photography, warm afternoon light",
    "van-life-coffee-setup-guide": "a beautiful pour-over coffee setup in a camper van \u2014 ceramic dripper, gooseneck kettle on an induction cooktop, fresh ground coffee in a wooden scoop, steam rising, golden morning light through the open rear doors, warm cinematic photography",
    "best-cooktop-for-van-life-buyers-guide": "a flat-lay top-down photograph of multiple portable cooktops on a wooden surface \u2014 an induction cooktop, a butane single burner, and a propane two-burner side by side, comparison editorial photography, warm earth tones",
    "how-to-cool-van-without-ac": "the interior of a parked camper van with rear doors and side windows open, a 12V roof fan visible spinning, reflective window covers, soft afternoon light, no air conditioning visible, photorealistic documentary photography",
    "van-life-grocery-shopping-strategy": "a wooden van counter with fresh groceries unpacked from a paper bag \u2014 produce, eggs, dry goods, bread \u2014 organized for stowing in a camper van pantry, warm afternoon light, lifestyle editorial photography",
    "5-vegetarian-van-life-meals": "a flat-lay of five small bowls on a wooden van counter \u2014 each bowl holds a different colorful vegetarian dish (lentil curry, grain bowl, shakshuka, salad, pasta), warm overhead light, cookbook-style food photography",
    "best-coffee-setup-van-life": "a beautiful coffee gear flat-lay on a wooden van counter \u2014 AeroPress, ceramic Hario V60, gooseneck kettle on induction cooktop, hand grinder, freshly ground beans in a wooden scoop, steaming mug, golden morning light, magazine editorial photography",
    "van-knife-storage-and-safety": "a magnetic knife strip mounted on a wooden van galley wall holding a chef knife and a paring knife, soft warm light, photorealistic editorial photography, earth tones",
    "van-cookware-materials-guide": "a side-by-side comparison flat-lay of four cookware materials \u2014 a stainless steel pot, a cast iron skillet, a hard-anodized aluminum pan, and a titanium pot \u2014 on a wooden surface, soft natural light, editorial product photography",
    "van-life-protein-snacks-shelf-stable": "a flat-lay of shelf-stable protein snacks on a wooden surface \u2014 jerky, nuts, sardines in tins, hard-boiled eggs, energy bars, peanut butter \u2014 organized and appealing, warm natural light, food editorial photography",
    "how-to-make-real-espresso-in-a-van": "a Wacaco Picopresso pulling a real espresso shot into a small ceramic cup on a wooden van counter, warm crema visible on top, soft directional morning light, photorealistic close-up coffee photography",
    "best-12v-fridge-by-budget-2026": "three 12V portable fridges arranged side by side on a wooden surface \u2014 a budget Costway, mid-range Iceco, and premium Dometic \u2014 comparison editorial product photography, warm earth tones",
    "12v-fridges-complete-guide": "an opened 12V compression fridge in a beautifully built camper van kitchen, fresh produce and drinks visible inside, warm golden hour light streaming through open rear doors, magazine editorial photography, warm earth tones",
    "cooktops-complete-guide": "a flat-lay top-down photograph of four portable cooktops on a warm wooden surface \u2014 a portable induction, a butane single-burner, a propane two-burner, and a multi-fuel stove \u2014 editorial product comparison photography, warm earth tones",
    "cookware-complete-guide": "a beautiful flat-lay of van life cookware on a wooden van counter \u2014 a seasoned cast iron skillet, a nesting stainless cookware set stacked beside it, and a titanium pot \u2014 warm afternoon light, magazine editorial photography, earth tones",
    "water-filtration-complete-guide": "a van kitchen counter arrangement showing a countertop gravity water filter, an inline RV water filter, and a small backpacker squeeze filter side by side with clear glass jars of filtered water, warm morning light, documentary editorial photography",
    "storage-complete-guide": "an organized camper van pantry cabinet wall showing labeled stackable bins, a magnetic spice rack with glass jars, and rugged overland storage crates, warm afternoon light, documentary photography, earth tones",
    "solar-cooking-complete-guide": "two solar cookers deployed outside a camper van in golden hour desert light \u2014 a tube-style vacuum cooker with reflective wings and a traditional box-style solar oven \u2014 mountains in the background, photorealistic cinematic photography, warm earth tones",
    "coffee-complete-guide": "a complete pour-over coffee setup on a wooden van counter at sunrise \u2014 AeroPress, Hario V60 ceramic dripper, gooseneck electric kettle, hand grinder, and steaming mug \u2014 golden morning light through the rear doors, magazine editorial photography, warm earth tones",
    "knives-prep-complete-guide": "a prep station flat-lay on a maple cutting board \u2014 a chef knife, a folding Opinel, kitchen shears, and a Japanese mandoline \u2014 sharp wooden surface, soft natural window light, editorial product photography, warm earth tones",
    "best-portable-cooktops-van-life-2026": "five portable cooktops arranged in a row on a wooden surface for comparison photography \u2014 induction, butane, propane single-burner, propane two-burner, multi-fuel \u2014 flat overhead editorial product photography, warm earth tones",
    "best-van-life-cookware-2026": "five cookware sets arranged on a wooden van counter for comparison \u2014 a nesting stainless kit, a cast iron skillet, a stanley adventure set, an all-clad skillet, and a titanium nesting set \u2014 editorial product photography, warm earth tones",
    "best-water-filters-van-life-2026": "five water filters arranged on a van counter for comparison photography \u2014 a gravity pitcher filter, a backpacker squeeze filter, an inline RV filter, a bottle purifier, and a 4L gravity bag system \u2014 editorial product photography, warm earth tones",
    "best-van-kitchen-storage-2026": "five storage solutions arranged on a wooden surface \u2014 weathertight stackable bins, an overland polymer crate, a magnetic spice rack, a premium rotomolded hard case, and a large polymer trunk \u2014 flat editorial product photography, warm earth tones",
    "best-coffee-gear-van-life-2026": "six coffee tools arranged on a wooden van counter flat-lay \u2014 AeroPress, Hario V60, Hario Skerton grinder, electric gooseneck kettle, Wacaco Picopresso, and Bialetti Moka pot \u2014 editorial product photography, golden morning light, warm earth tones",
    "best-van-knives-prep-tools-2026": "five prep tools arranged on a John Boos maple cutting board \u2014 Victorinox chef knife, Opinel folding knife, OXO kitchen shears, Benriner mandoline \u2014 warm afternoon light, editorial product photography, earth tones",
    "winter-van-kitchen-essentials-2026": "a cozy camper van winter kitchen scene \u2014 frosted window, steam rising from a cast iron Dutch oven on a propane stove, warm interior lamp light, snow visible outside through the window, photorealistic editorial photography, warm earth tones",
    "summer-van-kitchen-survival-2026": "an outdoor tailgate van kitchen in summer golden hour \u2014 butane stove and cookware on the tailgate, cold drinks and a dual-zone fridge nearby, a solar oven deployed on a picnic table, desert landscape in the background, cinematic photorealistic photography, warm earth tones",
  };
  return `${scenes[g.slug] || g.title}, ${base}`;
};

for (const g of guides) {
  if (ONLY && ONLY !== "guides") continue;
  const dest = `public/images/guides/${g.slug}.jpg`;
  if (!needsGeneration(g.image, dest)) continue;
  tasks.push({
    type: "guide",
    slug: g.slug,
    prompt: guidePrompt(g),
    aspectRatio: "16:9",
    destRelative: dest,
    updateJson: (newPath) => {
      g.image = newPath;
    },
  });
}

// Setups
const setupsPath = path.join(ROOT, "src/content/setups.json");
const setups = JSON.parse(fs.readFileSync(setupsPath, "utf8")) as Array<{
  slug: string;
  name: string;
  vanType: string;
  image: string;
}>;
registerJsonSaver(setupsPath, setups);

const setupPrompt = (s: (typeof setups)[number]) => {
  const scenes: Record<string, string> = {
    "sprinter-144-minimalist": "the interior of a minimalist Mercedes Sprinter 144 camper van kitchen — portable induction cooktop on a fold-down counter, small 12V fridge under a bench, compact and clean, warm afternoon light streaming through open sliding door",
    "promaster-off-grid-chef": "the interior of a high-end Ram ProMaster camper van kitchen galley — full length butcher block counter, built-in two-burner induction cooktop, large dual-zone 12V fridge, range hood, stainless bar sink, premium chef's kitchen, golden hour light",
    "ford-transit-weekend-warrior": "the interior of a simple Ford Transit weekend camper van kitchen — folding camping table deployed outside the sliding door, portable butane stove, small cooler, minimalist weekend setup, soft outdoor evening light",
    "tacoma-camper-shell-overlander": "a Toyota Tacoma pickup truck with a fiberglass camper shell parked in a high-desert dispersed campsite at golden hour, tailgate down with a butane stove and cookware set up as an outdoor tailgate kitchen, a rooftop tent unfolded on cross bars, mountains and juniper in the background, warm cinematic overland photography, earth tones",
  };
  return `${scenes[s.slug] || `${s.name} ${s.vanType} van kitchen`}, photorealistic documentary photography, warm earth tones`;
};

for (const s of setups) {
  if (ONLY && ONLY !== "setups") continue;
  const dest = `public/images/setups/${s.slug}.jpg`;
  if (!needsGeneration(s.image, dest)) continue;
  tasks.push({
    type: "setup",
    slug: s.slug,
    prompt: setupPrompt(s),
    aspectRatio: "16:9",
    destRelative: dest,
    updateJson: (newPath) => {
      s.image = newPath;
    },
  });
}

// Hero image (special — uses flux-kontext-max for top quality)
if (!ONLY || ONLY === "hero") {
  const heroPath = path.join(ROOT, "public/images/hero/home.jpg");
  if (FORCE || !fs.existsSync(heroPath)) {
    tasks.push({
      type: "hero",
      slug: "home",
      prompt:
        "a beautifully built camper van kitchen interior at golden hour, warm evening light streaming through open rear doors, a cast iron pan on an induction cooktop, fresh bread on a wooden cutting board, mountains visible in the distance, cinematic photorealistic lifestyle photography, earth tones, shallow depth of field, documentary magazine style",
      aspectRatio: "16:9",
      model: "flux-kontext-max",
      destRelative: "public/images/hero/home.jpg",
      updateJson: () => {
        // Hero path is hardcoded in Hero component — no JSON to update
      },
    });
  }
}

// Hub page hero images (reviews, guides, setups, tools hubs + 404 + og default)
const hubImages: Array<{ slug: string; destRelative: string; prompt: string; aspectRatio: string }> = [
  {
    slug: "reviews",
    destRelative: "public/images/hero/reviews.jpg",
    aspectRatio: "16:9",
    prompt:
      "flat lay overhead shot of van life kitchen gear arranged on a wooden surface — a portable induction cooktop, a compact 12V fridge, nesting stainless cookware, a water filter, spice jars, and a cast iron skillet — soft diffused natural light, warm earthy tones, photorealistic editorial catalog photography",
  },
  {
    slug: "guides",
    destRelative: "public/images/hero/guides.jpg",
    aspectRatio: "16:9",
    prompt:
      "a hand-written notebook open on a wooden van kitchen counter next to a cup of coffee, soft morning sunlight from a side window, pencil sketches of a van kitchen layout visible on the page, photorealistic documentary photography, warm earth tones, shallow depth of field",
  },
  {
    slug: "setups",
    destRelative: "public/images/hero/setups.jpg",
    aspectRatio: "16:9",
    prompt:
      "a row of three beautifully built camper vans parked in a desert at golden hour — a Mercedes Sprinter, a Ram Promaster, and a Ford Transit — rear doors open revealing interior kitchens, mountains in the distance, cinematic photorealistic lifestyle photography, warm earth tones",
  },
  {
    slug: "tools",
    destRelative: "public/images/hero/tools.jpg",
    aspectRatio: "16:9",
    prompt:
      "a top-down flat lay on a wooden surface showing a tape measure, a notebook with a sketched van kitchen layout, a multimeter, a calculator, and a small pen — clean workbench vibe, warm soft natural light, photorealistic editorial photography, earth tones",
  },
  {
    slug: "404",
    destRelative: "public/images/hero/404.jpg",
    aspectRatio: "16:9",
    prompt:
      "a vintage compass and a crumpled paper map lying on the wooden floor of a camper van next to hiking boots, warm afternoon light from an open side door, lost-at-the-edge-of-the-map feeling, photorealistic moody documentary photography, earth tones",
  },
  {
    slug: "og-default",
    destRelative: "public/images/hero/og-default.jpg",
    aspectRatio: "16:9",
    prompt:
      "a van life kitchen scene at golden hour with a wooden counter holding a cast iron pan on an induction cooktop, fresh herbs in a glass jar, and a steaming mug of coffee, open rear doors with mountain views behind, warm cinematic light, photorealistic magazine cover photography, clean composition with negative space on the right for text overlay",
  },
];

if (!ONLY || ONLY === "hubs") {
  for (const hub of hubImages) {
    const fullPath = path.join(ROOT, hub.destRelative);
    if (!FORCE && fs.existsSync(fullPath)) continue;
    tasks.push({
      type: "hero",
      slug: hub.slug,
      prompt: hub.prompt,
      aspectRatio: hub.aspectRatio,
      destRelative: hub.destRelative,
      updateJson: () => {
        // Hub hero paths are hardcoded in page components — no JSON to update
      },
    });
  }
}

async function main() {
  console.log(`\nGenerating ${tasks.length} image${tasks.length === 1 ? "" : "s"}...\n`);

  let completed = 0;
  let failed = 0;

  for (const task of tasks) {
    const startTime = Date.now();
    process.stdout.write(`[${completed + failed + 1}/${tasks.length}] ${task.type}/${task.slug}... `);
    try {
      const imageUrl = await generateImage(task.prompt, task.aspectRatio, task.model);
      const destFull = path.join(ROOT, task.destRelative);
      await downloadImage(imageUrl, destFull);
      const publicPath = "/" + task.destRelative.replace(/^public\//, "");
      task.updateJson(publicPath);
      // Save JSON after every successful image so partial runs are durable
      for (const saver of jsonSavers.values()) saver();
      completed++;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`ok (${elapsed}s)`);
    } catch (err) {
      failed++;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`FAILED (${elapsed}s): ${(err as Error).message}`);
    }
  }

  console.log(`\nDone. ${completed} ok, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
