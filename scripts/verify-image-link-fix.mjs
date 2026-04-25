// Verifies that fixed posts compile to MDX where the image is wrapped
// in an anchor (i.e. real linked-image), not a stray "[" + image + autolink.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");

const TARGETS = [
  "how-to-study-saas-dashboard-in-the-ai-era.mdx",
  "how-to-get-better-at-ui-design-by-studying-ai-generated-examples.mdx",
  "button-ui-design.mdx",
  "your-startups-user-persona-is-probably-wrong.mdx",
];

const SHOW = process.argv.includes("--show");

function countLinkedImages(src) {
  let n = 0;
  const re = /_components\.a/g;
  let m;
  while ((m = re.exec(src))) {
    const window = src.slice(m.index, m.index + 700);
    const nextA = window.slice(1).indexOf("_components.a");
    const imgIdx = window.indexOf("_components.img");
    if (imgIdx !== -1 && (nextA === -1 || imgIdx < nextA + 1)) n += 1;
  }
  return n;
}

let failed = 0;
for (const file of TARGETS) {
  const full = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { content } = matter(raw);
  const result = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });
  const src = result.compiledSource;

  if (SHOW && file === TARGETS[0]) {
    const idx = src.indexOf("img");
    console.log("=== compiledSource snippet ===");
    console.log(src.slice(Math.max(0, idx - 400), idx + 400));
    console.log("=== end ===");
  }

  const anchorCount = (src.match(/_components\.a/g) || []).length;
  const imageCount = (src.match(/_components\.img/g) || []).length;
  const linkedImages = countLinkedImages(src);
  const leakedBracket = /children:\s*"\["/.test(src);

  const status = linkedImages > 0 && !leakedBracket ? "OK" : "FAIL";
  if (status === "FAIL") failed += 1;
  console.log(
    `${status}  ${file}  anchors=${anchorCount} images=${imageCount} linkedImages=${linkedImages} leakedBracket=${leakedBracket}`
  );
}

if (failed > 0) {
  console.error(`\n${failed} file(s) failed verification`);
  process.exit(1);
}
console.log("\nAll sampled posts compile to anchor-wrapped images.");
