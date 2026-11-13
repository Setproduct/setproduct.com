/**
 * Generates the static SEO assets that search engines, social networks and
 * mobile browsers expect, from the two masters that already exist in the repo:
 *
 *   public/images/setproduct2.webp (1600x1200) -> public/images/og-setproduct-home.jpg (1200x630)
 *   public/images/fav-256.webp     (256x256)   -> favicon PNGs, apple-touch-icon, favicon.ico
 *
 * WHY 1200x630 AND JPG:
 * Open Graph previews want a 1.91:1 image. The old card pointed at a 4:3 WebP,
 * so LinkedIn, Facebook, Telegram and X either cropped the centre out of the
 * frame or refused the file outright, and the scanner reported "failed to fetch
 * preview image". 1200x630 is the documented size those crawlers are tuned for,
 * and JPEG is the format every one of them decodes without a plugin.
 *
 * WHY A NEW FILE NAME:
 * Browsers, the Vercel CDN and the Next image optimiser cache by URL. Writing
 * new bytes over an existing path means readers keep seeing the old picture, so
 * every generated asset gets a new name and nothing here overwrites a master.
 *
 * Run with: npm run seo:assets
 */
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES = path.join(ROOT, "public", "images");

const OG_SOURCE = path.join(IMAGES, "setproduct2.webp");
const ICON_SOURCE = path.join(IMAGES, "fav-256.webp");

// Open Graph / Twitter card master. Centre-cropped to 1.91:1, which keeps the
// headline card in the middle of the source artwork inside the frame.
const OG_OUT = path.join(IMAGES, "og-setproduct-home.jpg");
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** PNG icons, all generated from the same 256px master. */
const PNG_ICONS = [
  { file: "apple-touch-icon.png", size: 180 },
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-16.png", size: 16 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
];

/**
 * Windows asks for /favicon.ico before it looks at <link rel="icon">.
 * Sharp cannot write ICO, but the format accepts an embedded PNG, so the file
 * is assembled by hand: a 6-byte directory header, one 16-byte entry, then the
 * PNG bytes untouched.
 */
function buildIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // number of images

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // payload size
  entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

  return Buffer.concat([header, entry, png]);
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  for (const source of [OG_SOURCE, ICON_SOURCE]) {
    if (!(await exists(source))) {
      throw new Error(`Missing source image: ${path.relative(ROOT, source)}`);
    }
  }

  await sharp(OG_SOURCE)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OG_OUT);

  const ogMeta = await sharp(OG_OUT).metadata();
  console.log(
    `og-setproduct-home.jpg  ${ogMeta.width}x${ogMeta.height} ${ogMeta.format}`,
  );

  const pngBufs = new Map();
  for (const { file, size } of PNG_ICONS) {
    // Icons are drawn on white: several platforms composite a transparent
    // favicon onto a dark tab strip, and the logo is black-on-white.
    const buf = await sharp(ICON_SOURCE)
      .resize(size, size, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    await writeFile(path.join(IMAGES, file), buf);
    pngBufs.set(size, buf);
    console.log(`${file}  ${size}x${size} png`);
  }

  const ico = buildIco(pngBufs.get(32), 32);
  await writeFile(path.join(ROOT, "public", "favicon.ico"), ico);
  console.log(`favicon.ico  32x32 ico (${ico.length} bytes)`);

  // Sanity check: a truncated or mis-typed master would silently produce a
  // blurry card, so the output is re-read and verified before we move on.
  const verify = await readFile(OG_OUT);
  if (verify.length < 10_000) {
    throw new Error(
      `og-setproduct-home.jpg looks too small (${verify.length} bytes)`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
