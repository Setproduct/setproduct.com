import { getSearchTerms } from "./synonyms";

export type HighlightSegment = { text: string; match: boolean };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Builds one case-insensitive regexp for all query terms (longest first). */
export function buildHighlightRegExp(rawQuery: string): RegExp | null {
  const terms = getSearchTerms(rawQuery).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return null;
  return new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
}

/** Splits text into plain and matched segments. */
export function splitByMatches(
  text: string,
  re: RegExp | null,
): HighlightSegment[] {
  if (!re || !text) return [{ text, match: false }];
  const segments: HighlightSegment[] = [];
  let last = 0;
  re.lastIndex = 0;
  for (const m of text.matchAll(re)) {
    const start = m.index ?? 0;
    if (start > last) segments.push({ text: text.slice(last, start), match: false });
    segments.push({ text: m[0], match: true });
    last = start + m[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), match: false });
  return segments;
}

/**
 * Cuts a snippet of the description around the first match,
 * so the matched word is visible inside the 2-line clamp.
 */
export function buildSnippet(
  text: string,
  re: RegExp | null,
  lead = 60,
): string {
  if (!re || !text) return text;
  re.lastIndex = 0;
  const first = re.exec(text);
  re.lastIndex = 0;
  if (!first || first.index <= lead) return text;
  let start = first.index - lead;
  const space = text.indexOf(" ", start);
  if (space !== -1 && space < first.index) start = space + 1;
  return `…${text.slice(start)}`;
}
