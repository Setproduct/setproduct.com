#!/usr/bin/env node
/**
 * Generate one illustration through the Venice image API and stage it locally.
 *
 *   node --env-file=.env.local scripts/gen-image.mjs <name> [aspect] [model]
 *
 * <name>    prompt file name without extension, read from .tmp-gen/prompts/<name>.txt
 * [aspect]  one of 1:1, 3:2, 16:9, 4:5, 2:3 (default 16:9)
 * [model]   Venice image model id (default $VENICE_IMAGE_MODEL or ideogram-v4)
 *
 * Output lands in .tmp-gen/ with a timestamp in the file name. Nothing is written
 * to public/ and nothing overwrites an earlier attempt: the project rule is that
 * a replaced picture always gets a new file name, because browsers, the Vercel CDN
 * and the Next image optimiser cache by URL.
 *
 * Why the key is read here and not in the app: the site never generates anything.
 * This is a local tool, the key lives in .env.local, and that file is gitignored.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , name, aspectArg, modelArg] = process.argv;

if (!name) {
  console.error("usage: node --env-file=.env.local scripts/gen-image.mjs <name> [aspect] [model]");
  process.exit(1);
}

const KEY = process.env.VENICE_API_KEY;
const BASE = (process.env.VENICE_BASE_URL || "https://api.venice.ai/api/v1").replace(/\/+$/, "");
const MODEL = modelArg || process.env.VENICE_IMAGE_MODEL || "ideogram-v4";
const ASPECT = aspectArg || "16:9";

if (!KEY) {
  console.error("VENICE_API_KEY is missing. Run with --env-file=.env.local and check that file.");
  process.exit(1);
}

const ROOT = process.cwd();
const PROMPT_DIR = path.join(ROOT, ".tmp-gen", "prompts");
const OUT_DIR = path.join(ROOT, ".tmp-gen");

const promptPath = path.join(PROMPT_DIR, `${name}.txt`);

let prompt;
try {
  prompt = (await readFile(promptPath, "utf8")).trim();
} catch {
  console.error(`prompt not found: ${path.relative(ROOT, promptPath)}`);
  process.exit(1);
}

console.log(`model   ${MODEL}`);
console.log(`aspect  ${ASPECT}`);
console.log(`prompt  ${prompt.length} chars`);

const res = await fetch(`${BASE}/image/generate`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${KEY}`,
  },
  body: JSON.stringify({
    model: MODEL,
    prompt,
    aspect_ratio: ASPECT,
    hide_watermark: true,
    safe_mode: false,
  }),
});

const text = await res.text();

if (!res.ok) {
  console.error(`HTTP ${res.status}`);
  console.error(text.slice(0, 800));
  process.exit(1);
}

let json;
try {
  json = JSON.parse(text);
} catch {
  console.error("response is not JSON:", text.slice(0, 300));
  process.exit(1);
}

/**
 * The response shape is not documented in the panel, so accept every form seen
 * in the wild: a base64 array, OpenAI's data[].b64_json, a data URL, or a link.
 */
function pickImage(payload) {
  const candidates = [
    payload.images?.[0],
    payload.data?.[0]?.b64_json,
    payload.data?.[0]?.url,
    payload.image,
    payload.url,
    payload.image_url,
  ].filter(Boolean);

  const wrongKeys = Array.isArray(payload.b64_json) ? payload.b64_json[0] : payload.b64_json;
  if (wrongKeys) candidates.push(wrongKeys);

  return candidates[0] || null;
}

const picked = pickImage(json);

if (!picked) {
  console.error("unexpected response shape, top-level keys:", Object.keys(json).join(", "));
  console.error(text.slice(0, 500));
  process.exit(1);
}

let buf;
if (typeof picked === "string" && picked.startsWith("http")) {
  buf = Buffer.from(await (await fetch(picked)).arrayBuffer());
} else {
  const base64 = String(picked).replace(/^data:image\/\w+;base64,/, "");
  buf = Buffer.from(base64, "base64");
}

if (!buf.length) {
  console.error("decoded image is empty");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "");
const safeModel = MODEL.replace(/[^a-z0-9-]/gi, "-");
const stem = `${name}-${safeModel}-${stamp}`;

const rawPath = path.join(OUT_DIR, `${stem}.png`);
const webpPath = path.join(OUT_DIR, `${stem}.webp`);

await writeFile(rawPath, buf);

const meta = await sharp(buf).metadata();
await sharp(buf).webp({ quality: 92 }).toFile(webpPath);

const outMeta = await sharp(webpPath).metadata();

console.log(`\nsource  ${meta.width}x${meta.height} ${meta.format}`);
console.log(`saved   ${path.relative(ROOT, webpPath)}`);
console.log(`size    ${outMeta.width}x${outMeta.height}, ${Math.round((await sharp(webpPath).metadata()).size ?? 0)} bytes`);
