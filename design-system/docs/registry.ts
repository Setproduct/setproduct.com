/**
 * Single source of truth for the design system docs.
 *
 * The left navigation, the mobile navigation, the overview cards and the
 * static routes are all built from this list. A page section exists only if it
 * is listed here: <DocSection id> looks its title up in this file and throws
 * when the id is missing, so the menu and the page can never disagree.
 *
 * This folder must not import anything from the host site (components/, lib/,
 * data/). The site imports the design system, never the other way round, so
 * the folder can later move to its own repository as is.
 */

export type DocStatus = "stable" | "new" | "draft";

export type DocSectionMeta = {
  /** Anchor id on the page, also used in the URL hash. */
  id: string;
  /** Section heading and its label in the navigation. Sentence case. */
  title: string;
};

export type DocEntry = {
  /** URL segment under DOCS_BASE_PATH. */
  slug: string;
  title: string;
  /** One or two sentences: the page lead, the overview card and the meta description. */
  summary: string;
  status: DocStatus;
  sections: DocSectionMeta[];
};

export const DESIGN_SYSTEM_NAME = "Setproduct Design System";

export const DOCS_BASE_PATH = "/design-system";

/** Where the "back" link in the top bar leads. The only host-specific setting. */
export const DOCS_HOME = { href: "/", label: "Back to Setproduct" };

export const STATUS_LABEL: Record<DocStatus, string> = {
  stable: "Stable",
  new: "New",
  draft: "Draft",
};

export const DOC_COMPONENTS: DocEntry[] = [
  {
    slug: "buttons",
    title: "Buttons",
    summary:
      "Three sizes with the push effect. L and M drop onto an outer edge, S presses inside its box, and every size glows on hover and ripples on release.",
    status: "stable",
    sections: [
      { id: "large", title: "L · button" },
      { id: "medium", title: "M · button-small" },
      { id: "small", title: "S · button-x-small" },
      { id: "card", title: "Inside a card with overflow hidden" },
    ],
  },
  {
    slug: "inputs",
    title: "Inputs",
    summary:
      "Fields in three sizes, each paired with the button of the same size: the height, the corner radius and the focus edge match, so a field and a button line up in one row.",
    status: "stable",
    sections: [
      { id: "sizes", title: "Sizes next to the buttons" },
      { id: "settings", title: "Settings panel" },
      { id: "attention", title: "Attention field" },
      { id: "state-default", title: "Default" },
      { id: "state-hover", title: "Hover" },
      { id: "state-focus", title: "Focus" },
      { id: "state-filled", title: "Filled" },
      { id: "state-error", title: "Error" },
      { id: "state-disabled", title: "Disabled" },
      { id: "live", title: "Textarea, select and a field with a button" },
    ],
  },
  {
    slug: "chips",
    title: "Chips",
    summary:
      "Pressable pills for topics and filters. A link chip leads to a page, a filter chip toggles a value in place. Sizes S and M pair with the button and the field of the same size.",
    status: "new",
    sections: [
      { id: "compare", title: "Today on the site and the new chip" },
      { id: "sizes", title: "Sizes next to the button and the field" },
      { id: "kinds", title: "Link chip and filter chip" },
      { id: "states", title: "States" },
      { id: "parts", title: "Icon and counter" },
      { id: "rows", title: "Wrapping row and scrolling row" },
    ],
  },
  {
    slug: "badges",
    title: "Badges",
    summary:
      "Small labels that only inform: a category, a type, a status. No hover, no pointer, no focus. If people should click it, it is a chip.",
    status: "new",
    sections: [
      { id: "compare", title: "Today on the site and the new badge" },
      { id: "sizes", title: "Sizes" },
      { id: "kinds", title: "Kinds and tones" },
      { id: "parts", title: "Dot and icon" },
      { id: "context", title: "In a card and on an image" },
      { id: "boundary", title: "Badge or chip" },
    ],
  },
];

export function docHref(slug: string): string {
  return `${DOCS_BASE_PATH}/${slug}`;
}

export function getDocEntry(slug: string): DocEntry | undefined {
  return DOC_COMPONENTS.find((entry) => entry.slug === slug);
}
