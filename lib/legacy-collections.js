const fs = require("fs");
const path = require("path");

const { buildLegacyPageData } = require("./legacy-page");

function getCollectionDir(collection) {
  return path.join(process.cwd(), "legacy-pages", collection);
}

function getCollectionSlugs(collection) {
  const dir = getCollectionDir(collection);
  return fs
    .readdirSync(dir)
    .filter((entry) => entry.endsWith(".html"))
    .map((entry) => entry.replace(/\.html$/i, ""));
}

function getCollectionPageData(collection, slug) {
  return buildLegacyPageData(`${collection}/${slug}.html`);
}

module.exports = { getCollectionSlugs, getCollectionPageData };
