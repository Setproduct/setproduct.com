#!/usr/bin/env node
/**
 * Generate blog cover thumbnails.
 *
 * Source:  public/blog/covers/*.webp
 * Output:  public/blog/covers/thumbs/<name>.webp  (max 800px wide, q80)
 *
 * Idempotent: skips files where the thumb already exists and is newer than
 * its source. Re-running is cheap.
 *
 * Usage:
 *   node scripts/generate-blog-thumbs.js
 *   npm run thumbs:blog
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");

// Allow passing source and out dir relative to ROOT via CLI args
// Default to blog covers if no args provided
const srcArg = process.argv[2] || "public/blog/covers";
const outArg = process.argv[3] || path.join(srcArg, "thumbs");

const SRC_DIR = path.resolve(ROOT, srcArg);
const OUT_DIR = path.resolve(ROOT, outArg);

const TARGET_WIDTH = 800;
const QUALITY = 80;
const SUPPORTED = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isFresh(srcPath, outPath) {
  if (!fs.existsSync(outPath)) return false;
  const srcStat = fs.statSync(srcPath);
  const outStat = fs.statSync(outPath);
  return outStat.mtimeMs >= srcStat.mtimeMs;
}

async function processOne(file) {
  const srcPath = path.join(SRC_DIR, file);
  const outName = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const outPath = path.join(OUT_DIR, outName);

  if (isFresh(srcPath, outPath)) {
    return { file, status: "skip" };
  }

  const meta = await sharp(srcPath).metadata();
  const pipeline = sharp(srcPath).rotate();

  if (meta.width && meta.width > TARGET_WIDTH) {
    pipeline.resize({ width: TARGET_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath);

  const outStat = fs.statSync(outPath);
  const srcStat = fs.statSync(srcPath);
  return {
    file,
    status: "ok",
    srcKB: Math.round(srcStat.size / 1024),
    outKB: Math.round(outStat.size / 1024),
  };
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source dir not found: ${SRC_DIR}`);
    process.exit(1);
  }
  ensureDir(OUT_DIR);

  const entries = fs
    .readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => SUPPORTED.has(path.extname(name).toLowerCase()));

  console.log(
    `Found ${entries.length} source images in ${srcArg} (target ${TARGET_WIDTH}px wide, webp q${QUALITY})`,
  );

  let ok = 0;
  let skip = 0;
  let failed = 0;
  let totalSrc = 0;
  let totalOut = 0;

  // Process in small batches to avoid memory spikes.
  const CONCURRENCY = 6;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const chunk = entries.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(chunk.map(processOne));
    for (const r of results) {
      if (r.status === "rejected") {
        failed++;
        console.error("  fail:", r.reason && r.reason.message);
        continue;
      }
      const v = r.value;
      if (v.status === "skip") {
        skip++;
      } else {
        ok++;
        totalSrc += v.srcKB || 0;
        totalOut += v.outKB || 0;
        console.log(`  ${v.file}: ${v.srcKB}KB -> ${v.outKB}KB`);
      }
    }
  }

  console.log("");
  console.log(`Done. generated=${ok} skipped=${skip} failed=${failed}`);
  if (ok > 0) {
    console.log(
      `Size of regenerated set: ${Math.round(totalSrc / 1024)}MB -> ${Math.round(
        totalOut / 1024,
      )}MB`,
    );
  }
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
