/**
 * Index of the UI guides (content/blog/*.mdx), grouped by what the component
 * does. One source for three places: the "UI component guides" block on the
 * home page, the UI guides panel in the navbar and the /ui-guides hub.
 *
 * Rules (author, 16.11.2026):
 * 1. Order inside a group is alphabetical by label: people look a guide up by
 *    name, not by traffic.
 * 2. `label` is a short component or style name in sentence case, not the
 *    article title. Abbreviations keep their capitals (AI, UI).
 * 3. Add a row when a new guide is published and put the group in place. A
 *    slug here that has no matching .mdx file fails the /ui-guides build with
 *    a readable error, so a typo cannot slip through.
 */

export type UiGuideGroupKey =
  | "inputs"
  | "navigation"
  | "data-display"
  | "feedback"
  | "screens"
  | "visual-styles";

export type UiGuide = {
  /** Blog post slug, matches content/blog/<slug>.mdx. */
  slug: string;
  /** Short name shown in lists and menus. */
  label: string;
  group: UiGuideGroupKey;
};

export type UiGuideGroup = {
  key: UiGuideGroupKey;
  /** Heading in the /ui-guides hub and the navbar column. */
  title: string;
};

export const UI_GUIDE_GROUPS: UiGuideGroup[] = [
  { key: "inputs", title: "Inputs" },
  { key: "navigation", title: "Navigation" },
  { key: "data-display", title: "Data display" },
  { key: "feedback", title: "Feedback" },
  { key: "screens", title: "Screens" },
  { key: "visual-styles", title: "Visual styles" },
];

export const UI_GUIDES: UiGuide[] = [
  // Inputs
  { slug: "button-ui-design", label: "Button", group: "inputs" },
  { slug: "button-group-guide", label: "Button group", group: "inputs" },
  { slug: "checkbox-ui-design", label: "Checkbox", group: "inputs" },
  { slug: "date-picker-ui-design", label: "Date picker", group: "inputs" },
  { slug: "dropdown-ui-design", label: "Dropdown", group: "inputs" },
  { slug: "input-ui-design", label: "Input field", group: "inputs" },
  { slug: "radio-button-ui-design", label: "Radio button", group: "inputs" },
  { slug: "slider-ui-design", label: "Slider", group: "inputs" },
  { slug: "stepper-ui-design", label: "Stepper", group: "inputs" },
  { slug: "toggle-switch-ui-design", label: "Toggle switch", group: "inputs" },

  // Navigation
  { slug: "appbar-ui-design", label: "App bar", group: "navigation" },
  { slug: "breadcrumbs-ui-design", label: "Breadcrumbs", group: "navigation" },
  { slug: "command-palette-ui-design-guide", label: "Command palette", group: "navigation" },
  { slug: "filter-ui-design", label: "Filter", group: "navigation" },
  { slug: "pagination-ui-design", label: "Pagination", group: "navigation" },
  { slug: "search-ui-design", label: "Search", group: "navigation" },
  { slug: "sidebar-navigation-ui-design", label: "Sidebar navigation", group: "navigation" },
  { slug: "steps-ui-design", label: "Steps", group: "navigation" },
  { slug: "tabs-ui-design", label: "Tabs", group: "navigation" },

  // Data display
  { slug: "accordion-ui-design", label: "Accordion", group: "data-display" },
  { slug: "avatar-ui-design", label: "Avatar", group: "data-display" },
  { slug: "badge-ui-design", label: "Badge", group: "data-display" },
  { slug: "calendar-ui-design", label: "Calendar", group: "data-display" },
  { slug: "carousel-ui-design", label: "Carousel", group: "data-display" },
  { slug: "chip-ui-design", label: "Chip", group: "data-display" },
  { slug: "data-table-ui-design", label: "Data table", group: "data-display" },

  // Feedback
  { slug: "how-to-design-dialogs", label: "Dialogs", group: "feedback" },
  { slug: "empty-state-ui-design", label: "Empty state", group: "feedback" },
  { slug: "notifications-ui-design", label: "Notifications", group: "feedback" },
  { slug: "tooltip-ui-design", label: "Tooltip", group: "feedback" },

  // Screens
  { slug: "ai-agent-ui-design-patterns", label: "AI agent patterns", group: "screens" },
  { slug: "ai-chat-interface-ui-design", label: "AI chat interface", group: "screens" },
  { slug: "dashboard-ui-design", label: "Dashboard", group: "screens" },
  { slug: "pricing-ui-design", label: "Pricing page", group: "screens" },
  { slug: "settings-ui-design", label: "Settings", group: "screens" },

  // Visual styles
  { slug: "bento-grid-layout-design-guide", label: "Bento grid", group: "visual-styles" },
  { slug: "complete-guide-to-blueprint-grid-design", label: "Blueprint grid", group: "visual-styles" },
  { slug: "claymorphism-design-guide", label: "Claymorphism", group: "visual-styles" },
  { slug: "liquid-glass-vs-glassmorphism", label: "Glassmorphism", group: "visual-styles" },
  { slug: "liquid-glass-design-explained-a-practical-guide", label: "Liquid glass", group: "visual-styles" },
  { slug: "neumorphism-design-guide", label: "Neumorphism", group: "visual-styles" },
  { slug: "retro-brutalist-ui-design-2026", label: "Retro brutalism", group: "visual-styles" },
];

/**
 * The three guides that open the navbar panel: data table (2 417 entries,
 * 12.07–09.10.2026), AI chat interface (1 578) and tabs (1 456). They are also
 * present in their groups, so neither list gets a gap.
 */
export const UI_GUIDE_START_HERE: string[] = [
  "data-table-ui-design",
  "ai-chat-interface-ui-design",
  "tabs-ui-design",
];

/**
 * Component and screen guides only. The home page block promises "anatomy,
 * states and accessibility of the components", and the visual styles series
 * does not answer that promise, so it stays out of the home list.
 */
export const UI_COMPONENT_GUIDES: UiGuide[] = UI_GUIDES.filter(
  (guide) => guide.group !== "visual-styles",
);

export function getGuidesByGroup(group: UiGuideGroupKey): UiGuide[] {
  return UI_GUIDES.filter((guide) => guide.group === group);
}

export function getGuide(slug: string): UiGuide | undefined {
  return UI_GUIDES.find((guide) => guide.slug === slug);
}

/**
 * Grouped form for the navbar panel: one entry per group in UI_GUIDE_GROUPS
 * order, alphabetical inside each. Built once at module load, so the client
 * component never re-filters 42 rows on render.
 */
export const UI_GUIDES_BY_GROUP: Array<{
  key: UiGuideGroupKey;
  title: string;
  guides: UiGuide[];
}> = UI_GUIDE_GROUPS.map((group) => ({
  key: group.key,
  title: group.title,
  guides: getGuidesByGroup(group.key),
}));

/** Anchor of a group on /ui-guides. */
export function guideGroupAnchor(group: UiGuideGroupKey): string {
  return `#${group}`;
}
