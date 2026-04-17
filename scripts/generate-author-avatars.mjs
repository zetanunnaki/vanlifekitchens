import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const envPath = path.join(ROOT, ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const keyMatch = envContent.match(/KIE_API_KEY=(\S+)/);
const KIE_API_KEY = keyMatch?.[1];
if (!KIE_API_KEY) { console.error("No KIE_API_KEY"); process.exit(1); }

const KIE_BASE = "https://api.kie.ai";

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateImage(prompt, aspectRatio) {
  const res = await fetch(`${KIE_BASE}/api/v1/flux/kontext/generate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KIE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, aspectRatio, model: "flux-kontext-pro", outputFormat: "jpeg" }),
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

const authors = [
  {
    slug: "maya",
    prompt: "professional headshot portrait of a woman in her early 30s with light brown hair pulled back, wearing a olive green outdoor jacket, warm natural smile, soft golden hour lighting, blurred outdoor mountain background, photorealistic editorial portrait photography, warm earth tones, shallow depth of field",
  },
  {
    slug: "theo",
    prompt: "professional headshot portrait of a Korean-American man in his late 20s with short black hair, wearing a navy blue henley shirt, confident friendly expression, soft golden hour lighting, blurred outdoor campsite background, photorealistic editorial portrait photography, warm earth tones, shallow depth of field",
  },
  {
    slug: "cassidy",
    prompt: "professional headshot portrait of a woman in her mid-20s with curly auburn hair, wearing a tan canvas jacket, relaxed genuine smile, soft golden hour lighting, blurred outdoor desert landscape background, photorealistic editorial portrait photography, warm earth tones, shallow depth of field",
  },
];

for (const a of authors) {
  const dest = path.join(ROOT, `public/images/authors/${a.slug}.jpg`);
  if (fs.existsSync(dest)) { console.log(`${a.slug}: exists, skipping`); continue; }
  process.stdout.write(`${a.slug}... `);
  try {
    const url = await generateImage(a.prompt, "1:1");
    await download(url, dest);
    console.log("ok");
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}
console.log("Done.");
