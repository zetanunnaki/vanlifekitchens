import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const envContent = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
const keyMatch = envContent.match(/KIE_API_KEY=(\S+)/);
const KIE_API_KEY = keyMatch?.[1];
if (!KIE_API_KEY) { console.error("No KIE_API_KEY"); process.exit(1); }

const KIE_BASE = "https://api.kie.ai";
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateImage(prompt, aspectRatio) {
  const res = await fetch(`${KIE_BASE}/api/v1/flux/kontext/generate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KIE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, aspectRatio, model: "flux-kontext-pro", outputFormat: "png" }),
  });
  const json = await res.json();
  if (json.code !== 200 || !json.data?.taskId) throw new Error(`Create failed: ${JSON.stringify(json)}`);
  const taskId = json.data.taskId;
  for (let i = 0; i < 60; i++) {
    await sleep(2500);
    const poll = await fetch(`${KIE_BASE}/api/v1/flux/kontext/record-info?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KIE_API_KEY}` },
    });
    const pj = await poll.json();
    if (pj.data?.successFlag === 1) return pj.data.response.resultImageUrl;
    if (pj.data?.successFlag >= 2) throw new Error(`Failed: ${pj.data.errorMessage}`);
  }
  throw new Error("Timeout");
}

async function download(url, dest) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

const prompt = "a simple, bold, flat-design app icon — a warm orange (#d97706) flame symbol centered on a dark charcoal (#1c1917) rounded-square background, minimal clean vector style, no text, no gradients, solid colors only, suitable as a mobile app icon at any size";

const sizes = [
  { name: "icon-192x192.png", size: 192 },
  { name: "icon-512x512.png", size: 512 },
];

for (const s of sizes) {
  const dest = path.join(ROOT, "public", s.name);
  if (fs.existsSync(dest)) { console.log(`${s.name}: exists, skipping`); continue; }
  process.stdout.write(`${s.name}... `);
  try {
    const url = await generateImage(prompt, "1:1");
    await download(url, dest);
    console.log("ok");
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}

// Also generate a favicon.ico source (32x32 PNG — browsers accept PNG as favicon)
const faviconDest = path.join(ROOT, "public", "favicon-32x32.png");
if (!fs.existsSync(faviconDest)) {
  process.stdout.write("favicon-32x32.png... ");
  try {
    const url = await generateImage(prompt, "1:1");
    await download(url, faviconDest);
    console.log("ok");
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}

console.log("Done.");
