import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

// ---------- helpers ----------

function getAllFiles(dir, ext) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(full, ext));
    } else if (entry.name.toLowerCase().endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

// ---------- tracking ----------

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let failed = 0;

async function logResult(label, beforeSize, afterSize) {
  const saved = beforeSize - afterSize;
  const pct = beforeSize > 0 ? ((saved / beforeSize) * 100).toFixed(1) : "0.0";
  console.log(
    `  ${label}  ${fmtSize(beforeSize)} -> ${fmtSize(afterSize)}  (${saved >= 0 ? "-" : "+"}${fmtSize(Math.abs(saved))}, ${pct}%)`
  );
  totalBefore += beforeSize;
  totalAfter += afterSize;
  processed++;
}

// ---------- JPEG optimization ----------

async function optimizeJpegs() {
  const jpgs = getAllFiles(IMAGES_DIR, ".jpg");
  if (jpgs.length === 0) {
    console.log("No JPEG files found in public/images/.");
    return;
  }
  console.log(`\nOptimizing ${jpgs.length} JPEG(s) in public/images/ ...\n`);

  for (const file of jpgs) {
    const rel = path.relative(PUBLIC_DIR, file);
    try {
      const srcBuf = fs.readFileSync(file);
      const beforeSize = srcBuf.length;

      const outBuf = await sharp(srcBuf)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .withMetadata(false)
        .toBuffer();

      fs.writeFileSync(file, outBuf);
      await logResult(rel, beforeSize, outBuf.length);
    } catch (err) {
      console.error(`  [ERROR] ${rel}: ${err.message}`);
      failed++;
    }
  }
}

// ---------- icon optimization ----------

const ICON_SPECS = [
  { file: "favicon-32x32.png", size: 32 },
  { file: "icon-192x192.png", size: 192 },
  { file: "icon-512x512.png", size: 512 },
];

async function optimizeIcons() {
  console.log(`\nOptimizing icon PNGs in public/ ...\n`);

  for (const { file, size } of ICON_SPECS) {
    const full = path.join(PUBLIC_DIR, file);
    if (!fs.existsSync(full)) {
      console.log(`  [SKIP] ${file} not found`);
      continue;
    }
    try {
      const srcBuf = fs.readFileSync(full);
      const beforeSize = srcBuf.length;

      const outBuf = await sharp(srcBuf)
        .resize(size, size, { fit: "contain" })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();

      fs.writeFileSync(full, outBuf);
      await logResult(file, beforeSize, outBuf.length);
    } catch (err) {
      console.error(`  [ERROR] ${file}: ${err.message}`);
      failed++;
    }
  }
}

// ---------- generate missing icons ----------

const GENERATED_ICONS = [
  { file: "icon-64x64.png", size: 64 },
  { file: "apple-icon-180x180.png", size: 180 },
];

async function generateMissingIcons() {
  const source = path.join(PUBLIC_DIR, "icon-192x192.png");
  if (!fs.existsSync(source)) {
    console.log("\n  [SKIP] icon-192x192.png not found — cannot generate derived icons");
    return;
  }

  console.log(`\nGenerating missing icons from icon-192x192.png ...\n`);

  const srcBuf = fs.readFileSync(source);

  for (const { file, size } of GENERATED_ICONS) {
    const full = path.join(PUBLIC_DIR, file);
    try {
      const existed = fs.existsSync(full);
      const beforeSize = existed ? fs.statSync(full).size : 0;

      const outBuf = await sharp(srcBuf)
        .resize(size, size, { fit: "contain" })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();

      fs.writeFileSync(full, outBuf);

      if (existed) {
        await logResult(`${file} (regenerated)`, beforeSize, outBuf.length);
      } else {
        console.log(`  ${file} created  (${fmtSize(outBuf.length)})`);
        totalAfter += outBuf.length;
        processed++;
      }
    } catch (err) {
      console.error(`  [ERROR] ${file}: ${err.message}`);
      failed++;
    }
  }
}

// ---------- main ----------

async function main() {
  console.log("=== Image Optimization ===");

  await optimizeJpegs();
  await optimizeIcons();
  await generateMissingIcons();

  console.log("\n--- Summary ---");
  console.log(`  Files processed : ${processed}`);
  if (failed > 0) console.log(`  Errors          : ${failed}`);
  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((saved / totalBefore) * 100).toFixed(1);
    console.log(`  Before          : ${fmtSize(totalBefore)}`);
    console.log(`  After           : ${fmtSize(totalAfter)}`);
    console.log(`  Saved           : ${fmtSize(saved)} (${pct}%)`);
  }
  console.log("Done.\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
