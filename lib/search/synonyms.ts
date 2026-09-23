import type { Expression } from "fuse.js";

/** Fields Fuse searches in, with their relative weights. */
export const SEARCH_KEYS = [
  { name: "title", weight: 3 },
  { name: "category", weight: 2 },
  { name: "description", weight: 1 },
] as const;

const KEY_NAMES = SEARCH_KEYS.map((k) => k.name);

/**
 * Groups of interchangeable words. Any word from a group
 * also matches the other words of the same group.
 */
const SYNONYM_GROUPS: string[][] = [
  ["kit", "ui kit", "design system"],
  ["chart", "charts", "dataviz", "data visualization", "graph"],
  ["app", "mobile", "ios", "android"],
  ["dashboard", "admin", "panel"],
  ["icon", "icons", "iconset"],
  ["website", "web", "landing"],
  ["template", "templates", "layout"],
  ["free", "freebie", "freebies"],
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "of",
  "on",
  "the",
  "to",
  "with",
]);

const SYNONYMS: Map<string, string[]> = (() => {
  const map = new Map<string, string[]>();
  for (const group of SYNONYM_GROUPS) {
    for (const word of group) {
      const existing = map.get(word) ?? [];
      map.set(word, Array.from(new Set([...existing, ...group])));
    }
  }
  return map;
})();

/** Splits a raw query into meaningful lowercase tokens. */
export function tokenizeQuery(raw: string): string[] {
  return raw
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.+#-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

function variantsFor(token: string): string[] {
  return SYNONYMS.get(token) ?? [token];
}

/** All words worth highlighting for a query: tokens plus their synonyms. */
export function getSearchTerms(raw: string): string[] {
  return Array.from(new Set(tokenizeQuery(raw).flatMap(variantsFor)));
}

/**
 * Builds a Fuse logical query: every token must match (AND),
 * a token may match any field or any of its synonyms (OR).
 * Returns null when the query has no usable tokens.
 */
export function buildFuseQuery(raw: string): Expression | null {
  const tokens = tokenizeQuery(raw);
  if (tokens.length === 0) return null;

  const clauses: Expression[] = tokens.map((token) => ({
    $or: variantsFor(token).flatMap((variant) =>
      KEY_NAMES.map((key) => ({ [key]: variant })),
    ),
  }));

  return clauses.length === 1 ? clauses[0] : { $and: clauses };
}
