const fs = require("fs");
const path = require("path");

function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : "";
}

function rewriteLegacyLinks(markup) {
  return markup
    .replace(/href="\.\.\/index\.html"/g, 'href="/"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="\/(blog|templates|freebies)\/([^"]+)\.html"/g, 'href="/$1/$2"')
    .replace(/href="\.\.\/(blog|templates|freebies)\/([^"]+)\.html"/g, 'href="/$1/$2"')
    .replace(/href="(blog|templates|freebies)\/([^"]+)\.html"/g, 'href="/$1/$2"')
    .replace(/href="\.\.\/legal\/license\.html"/g, 'href="/legal/license"')
    .replace(/href="\.\.\/legal\/refunds-policy\.html"/g, 'href="/legal/refunds-policy"')
    .replace(/href="\/legal\/license\.html"/g, 'href="/legal/license"')
    .replace(/href="\/legal\/refunds-policy\.html"/g, 'href="/legal/refunds-policy"');
}

function extractMatches(input, regex, groupIndex = 1) {
  return [...input.matchAll(regex)].map((match) => match[groupIndex]);
}

function stripScriptTags(markup) {
  return markup.replace(/<script[\s\S]*?<\/script>/gi, "");
}

function buildLegacyPageData(relativePath) {
  const htmlPath = path.join(process.cwd(), "legacy-pages", relativePath);
  const html = fs.readFileSync(htmlPath, "utf8");
  const head = extract(html, /<head[^>]*>([\s\S]*?)<\/head>/i);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extract(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  const canonical = extract(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  const body = stripScriptTags(extract(html, /<body[^>]*>([\s\S]*?)<\/body>/i));
  const inlineStyles = extractMatches(head, /<style[^>]*>([\s\S]*?)<\/style>/gi);

  return {
    title,
    description,
    canonical,
    inlineStyles,
    bodyHtml: rewriteLegacyLinks(body),
  };
}

module.exports = { buildLegacyPageData };
