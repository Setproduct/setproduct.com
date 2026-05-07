/**
 * Convert all .avif files under /public to .webp (quality 80) and delete originals.
 * Usage: node scripts/convert-avif-to-webp.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "../public");

const collect = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) collect(p, out);
    else if (/\.avif$/i.test(p)) out.push(p);
  }
  return out;
};

(async () => {
  const files = collect(publicDir);
  console.log(`Found ${files.length} .avif files`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const src of files) {
    const dst = src.replace(/\.avif$/i, ".webp");
    try {
      if (fs.existsSync(dst)) {
        // .webp already exists — just remove .avif so paths work after rename.
        fs.unlinkSync(src);
        skipped++;
        continue;
      }
      await sharp(src).webp({ quality: 80 }).toFile(dst);
      fs.unlinkSync(src);
      ok++;
      if (ok % 50 === 0) console.log(`  converted ${ok}/${files.length}`);
    } catch (err) {
      console.error(`FAIL ${src}: ${err.message}`);
      failed++;
    }
  }

  console.log(`Done. Converted: ${ok}, already-existed: ${skipped}, failed: ${failed}`);
})();
