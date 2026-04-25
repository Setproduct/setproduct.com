#!/usr/bin/env node
// Fixes the broken `[\n\n![alt](src)\n\n](url)` MDX pattern by collapsing
// it into a single-line `[![alt](src)](url)` link, which is the only form
// CommonMark / remark-gfm reliably parses as link-wrapping-image.
//
// Usage:
//   node scripts/fix-broken-image-links.mjs           # apply changes
//   node scripts/fix-broken-image-links.mjs --dry     # preview only

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const DRY = process.argv.includes("--dry");

// Match exactly the broken multi-line shape:
//
//   [
//   <blank>
//   ![alt](src)
//   <blank>
//   ](url)
//
// - `^\[\s*\n` — opening bracket alone on a line
// - `\s*\n`    — at least one blank line (allow trailing whitespace)
// - `(!\[[^\]\n]*\]\([^)\n]+\))` — the image, captured
// - `\s*\n`    — at least one blank line
// - `\]\(([^)\n]+)\)` — closing `](url)` on its own line
//
// Anchored with multiline flag so each match starts at line begin.
const PATTERN =
  /^\[[ \t]*\r?\n(?:[ \t]*\r?\n)+(!\[[^\]\n]*\]\([^)\n]+\))[ \t]*\r?\n(?:[ \t]*\r?\n)+\]\(([^)\n]+)\)/gm;

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => path.join(BLOG_DIR, f));

let totalFixes = 0;
const changedFiles = [];

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let count = 0;
  const fixed = original.replace(PATTERN, (_match, image, url) => {
    count += 1;
    return `[${image}](${url})`;
  });

  if (count > 0) {
    totalFixes += count;
    changedFiles.push({ file, count });
    if (!DRY) {
      fs.writeFileSync(file, fixed, "utf8");
    }
  }
}

const rel = (p) => path.relative(ROOT, p);
console.log(`${DRY ? "[dry-run] " : ""}Fixed ${totalFixes} broken image-link block(s) in ${changedFiles.length} file(s):`);
for (const { file, count } of changedFiles) {
  console.log(`  ${rel(file)}  (${count})`);
}

// Sanity check: no leftover `^\[$` lines that fit the shape we care about.
let leftover = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  // After the fix, an `^\[$` line followed (with blanks) by `![…](…)` and `](…)`
  // is the bug we're hunting. Use the same regex.
  const matches = text.match(PATTERN);
  if (matches) leftover += matches.length;
}
console.log(`Remaining broken blocks after pass: ${leftover}`);
if (leftover > 0) process.exitCode = 1;
