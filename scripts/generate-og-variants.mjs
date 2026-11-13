/**
 * Writes a 1200x630 social card for every page that has its own hero image,
 * mirroring the source path under public/og/.
 *
 * WHY A SEPARATE TREE UNDER public/og:
 * Pages keep their own artwork: a 4:3 resource screenshot stays 4:3 in the
 * listing, in the hero and in `next/image`. Only the `og:image` tag points at
 * the prepared crop. Putting the variants in their own folder means the source
 * files are never touched, so no listing layout shifts and no browser cache is
 * invalidated for the pictures readers already downloaded.
 *
 * WHICH SOURCES, AND WHY NOT `find public/`:
 * Only three fields are ever used as a page-level preview: `coverImage` in the
 * blog frontmatter, `image` on a resource, `ogImage` on a template. Walking the
 * whole of `public/` produced 1755 files, most of them in-article screenshots
 * and listing thumbnails that no crawler ever sees as `og:image`. Reading the
 * three fields gives 294 cards and keeps the folder honest about its purpose.
 *
 * WHY `cover` AND NOT `contain`:
 * `contain` would letterbox a square cover with white bars, which looks broken
 * in a timeline. `cover` crops the centre instead, which is what every social
 * network does anyway; the difference is that here the crop happens once and
 * identically, instead of four different platforms cutting four different
 * frames.
 *
 * IDEMPOTENCY:
 * A variant is skipped when it is newer than its source, so re-running after
 * adding one post costs one image. Pass `--force` to rebuild everything.
 *
 * Run with: npm run seo:og
 */
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const OUT_ROOT = path.join(PUBLIC, "og");

const WIDTH = 1200;
const HEIGHT = 630;
const FORCE = process.argv.includes("--force");

/**
 * Pull one scalar field out of a YAML frontmatter block.
 *
 * Handles both the plain form (`coverImage: /blog/covers/x.webp`) and the folded
 * form some of the older posts use for long values:
 *
 *   coverImage: >-
 *     /blog/covers/x.webp
 *
 * A regex over a single line cannot see the second shape, which is why five
 * posts were skipped before this was handled.
 */
function frontmatterValue(raw, key) {
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return null;

  const body = block[1];
  const match = body.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!match) return null;

  const inline = match[1].trim();

  // YAML block scalar: the real value is on the following indented lines.
  if (/^[>|][-+]?$/.test(inline)) {
    const after = body.slice(body.indexOf(match[0]) + match[0].length);
    const lines = [];
    for (const line of after.split(/\r?\n/).slice(1)) {
      if (!line.trim()) break;
      if (!/^\s+/.test(line)) break;
      lines.push(line.trim());
    }
    return lines.join(" ").replace(/^["']|["']$/g, "");
  }

  return inline.replace(/^["']|["']$/g, "");
}

async function blogCovers() {
  const dir = path.join(ROOT, "content", "blog");
  const out = [];
  for (const name of await readdir(dir)) {
    if (!name.endsWith(".mdx")) continue;
    const raw = await readFile(path.join(dir, name), "utf8");
    const cover = frontmatterValue(raw, "coverImage");
    if (cover) out.push({ source: cover, page: `/blog/${name.replace(/\.mdx$/, "")}` });
  }
  return out;
}

/** Read an array of `slug` + image-field pairs out of a data module. */
async function dataModuleCovers(file, imageKey, urlPrefix) {
  const raw = await readFile(path.join(ROOT, "data", file), "utf8");
  const out = [];
  const blocks = raw.split(/\n\s*\{\s*\n/);
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/);
    const image = block.match(new RegExp(`${imageKey}:\\s*\\n?\\s*"([^"]+)"`));
    if (slug && image) out.push({ source: image[1], page: `${urlPrefix}/${slug[1]}` });
  }
  return out;
}

function targetFor(source) {
  const rel = source.replace(/^\//, "").replace(/\.(webp|gif|png|jpe?g)$/i, ".jpg");
  return path.join(OUT_ROOT, rel);
}

async function isFresh(sourceFile, targetFile) {
  if (FORCE) return false;
  try {
    const [src, out] = await Promise.all([stat(sourceFile), stat(targetFile)]);
    return out.mtimeMs >= src.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  const entries = [
    ...(await blogCovers()),
    ...(await dataModuleCovers("freebies-listing.ts", "image", "/freebies")),
    ...(await dataModuleCovers("templates-listing.ts", "ogImage", "/templates")),
  ];

  const stats = {
    total: entries.length,
    written: 0,
    skipped: 0,
    failed: 0,
    missingSource: [],
    upscaled: [],
  };

  for (const entry of entries) {
    const sourceFile = path.join(PUBLIC, entry.source.replace(/^\//, ""));
    const targetFile = targetFor(entry.source);

    if (await isFresh(sourceFile, targetFile)) {
      stats.skipped += 1;
      continue;
    }

    try {
      const meta = await sharp(sourceFile, { animated: false, page: 0 }).metadata();

      // A picture shorter than 630px on its short side cannot fill the card
      // without stretching. It is still written (a soft card is better than a
      // missing one) but recorded so the author can replace the artwork.
      const shortSide = Math.min(meta.width ?? 0, meta.height ?? 0);
      if (shortSide < HEIGHT) {
        stats.upscaled.push({ page: entry.page, shortSide, source: entry.source });
      }

      await mkdir(path.dirname(targetFile), { recursive: true });
      await sharp(sourceFile, { animated: false, page: 0 })
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
        .jpeg({ quality: 86, mozjpeg: true })
        .toFile(targetFile);

      stats.written += 1;
      process.stdout.write(".");
    } catch (error) {
      if (error.code === "ENOENT") {
        stats.missingSource.push({ page: entry.page, source: entry.source });
      } else {
        stats.failed += 1;
        console.warn(`\nFailed: ${entry.source} — ${error.message}`);
      }
    }
  }

  console.log("");
  await writeFile(
    path.join(ROOT, "scripts", "og-variants-report.json"),
    JSON.stringify(stats, null, 2),
  );

  console.log(`sources : ${stats.total}`);
  console.log(`written : ${stats.written}`);
  console.log(`skipped : ${stats.skipped}`);
  console.log(`failed  : ${stats.failed}`);
  console.log(`missing : ${stats.missingSource.length}`);
  for (const item of stats.missingSource.slice(0, 10)) {
    console.log(`  ${item.source}  (${item.page})`);
  }
  console.log(`small   : ${stats.upscaled.length} (short side under ${HEIGHT}px)`);
  for (const item of stats.upscaled.slice(0, 10)) {
    console.log(`  ${item.shortSide}px  ${item.page}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
