#!/usr/bin/env node
/**
 * Read-only audit of H2/H3 headings in content/blog/*.mdx.
 *
 * Headings feed the table of contents in the article sidebar, so markup or
 * odd casing inside them shows up in navigation. The script never edits
 * files, it only prints a report.
 *
 * Usage:
 *   node scripts/audit-headings.mjs            # summary + per-post issues
 *   node scripts/audit-headings.mjs --json     # machine-readable output
 *   node scripts/audit-headings.mjs <slug>     # one post only
 *
 * Checks:
 *   bold        **text** or __text__ inside a heading
 *   link        [text](url) inside a heading
 *   html        raw HTML tags (<br>, <span> ...) inside a heading
 *   code        `inline code` inside a heading (allowed, but long in a TOC)
 *   long        heading text longer than 80 characters
 *   colonEnd    heading ends with a colon
 *   titleCase   likely Title Case (sentence case is the project rule)
 *   duplicate   two headings with the same text in one post (same anchor id)
 *   fewH2       fewer than 3 H2 (the TOC is hidden for such posts)
 */
import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MIN_H2 = 3;
const MAX_LEN = 80;

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const onlySlug = args.find((a) => !a.startsWith("--"));

// Words that may stay lowercase in Title Case, so they say nothing either way.
const SMALL_WORDS = new Set(
  "a an and as at but by for from in into is it its of on or per the to vs via with without your you our we".split(" "),
);

function plainText(raw) {
  return raw
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Title Case heuristic: among "normal" words after the first one (skipping
 * the word right after a colon, abbreviations and mixed-case brand names like
 * iOS or GitHub), at least two are capitalized and they are the majority.
 * Brand names in plain capitalized form (Figma, React) can cause false
 * positives, so the result is a candidate list for manual review.
 */
function looksTitleCase(text) {
  const words = text.split(/\s+/);
  let checked = 0;
  let capitalized = 0;
  for (let i = 1; i < words.length; i += 1) {
    if (/:$/.test(words[i - 1])) continue;
    const word = words[i].replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    if (word.length < 2) continue;
    if (SMALL_WORDS.has(word.toLowerCase())) continue;
    if (/^[A-Z0-9]+s?$/.test(word)) continue; // UI, API, CTAs
    if (/[a-z][A-Z]/.test(word)) continue; // iOS, GitHub, SaaS
    checked += 1;
    if (/^[A-Z]/.test(word)) capitalized += 1;
  }
  return capitalized >= 2 && capitalized / checked >= 0.5;
}

function stripFrontmatter(source) {
  if (!source.startsWith("---")) return { body: source, offset: 0 };
  const end = source.indexOf("\n---", 3);
  if (end === -1) return { body: source, offset: 0 };
  const head = source.slice(0, end + 4);
  return { body: source.slice(end + 4), offset: head.split("\n").length - 1 };
}

function auditFile(file) {
  const slug = path.basename(file, ".mdx");
  const { body, offset } = stripFrontmatter(fs.readFileSync(file, "utf8"));
  const lines = body.split("\n");
  const headings = [];
  let inFence = false;

  lines.forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) return;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) return;
    headings.push({ level: match[1].length, raw: match[2], line: index + 1 + offset });
  });

  const issues = [];
  const seen = new Map();
  for (const h of headings) {
    const text = plainText(h.raw);
    const add = (type, detail) => issues.push({ type, line: h.line, level: h.level, text, detail });
    if (/(\*\*|__)/.test(h.raw)) add("bold");
    if (/\[[^\]]*\]\([^)]*\)/.test(h.raw)) add("link");
    if (/<[a-z/][^>]*>/i.test(h.raw)) add("html");
    if (/`[^`]+`/.test(h.raw)) add("code");
    if (text.length > MAX_LEN) add("long", `${text.length} chars`);
    if (/:$/.test(text)) add("colonEnd");
    if (looksTitleCase(text)) add("titleCase");
    const key = text.toLowerCase();
    if (seen.has(key)) add("duplicate", `same as line ${seen.get(key)}`);
    else seen.set(key, h.line);
  }

  const h2 = headings.filter((h) => h.level === 2).length;
  if (h2 < MIN_H2) issues.push({ type: "fewH2", line: 0, level: 2, text: "", detail: `${h2} H2` });

  return { slug, h2, h3: headings.length - h2, issues };
}

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .filter((f) => !onlySlug || f === `${onlySlug}.mdx`)
  .sort()
  .map((f) => path.join(BLOG_DIR, f));

if (files.length === 0) {
  console.error(onlySlug ? `No post found: ${onlySlug}` : "No posts found");
  process.exit(1);
}

const results = files.map(auditFile);

if (asJson) {
  console.log(JSON.stringify(results.filter((r) => r.issues.length > 0), null, 2));
  process.exit(0);
}

const totals = {};
for (const r of results) for (const i of r.issues) totals[i.type] = (totals[i.type] ?? 0) + 1;
const affected = results.filter((r) => r.issues.length > 0);
const h2Counts = results.map((r) => r.h2);

console.log(`Posts scanned: ${results.length}`);
console.log(
  `H2 per post: avg ${(h2Counts.reduce((a, b) => a + b, 0) / results.length).toFixed(1)}, ` +
    `min ${Math.min(...h2Counts)}, max ${Math.max(...h2Counts)}`,
);
console.log(`Posts with issues: ${affected.length}`);
console.log("Issues by type:", Object.keys(totals).length ? totals : "none");
console.log("");

for (const r of affected) {
  console.log(`${r.slug} (H2 ${r.h2}, H3 ${r.h3})`);
  for (const i of r.issues) {
    const where = i.line ? `  L${i.line} H${i.level}` : "  ";
    console.log(`${where} [${i.type}]${i.detail ? ` ${i.detail}` : ""}${i.text ? `  ${i.text}` : ""}`);
  }
}
