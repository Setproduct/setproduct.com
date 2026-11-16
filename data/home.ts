/**
 * Content settings of the home page (components/pages/HomePage.tsx).
 * Everything an editor may want to change lives here, not in components.
 */

/** Cards in the "Fresh from the magazine" feed: two full masonry rows. */
export const HOME_FEED_LIMIT = 8;

/** Optional post pinned to the first slot of the feed; the rest go by date. */
export const HOME_FEED_PINNED_SLUG: string | null = null;

/** Rows in "Most read" (taken from BLOG_POPULAR_SLUGS in lib/blog/popular.ts). */
export const HOME_MOST_READ_COUNT = 6;

/** Kits shown on the home page; the full catalogue is on /all. */
export const HOME_KITS_COUNT = 6;

/**
 * Resources shown on the home page, ordered by GA4 entrances (12.07–09.10.2026).
 * Slugs from data/freebies-listing.ts.
 */
export const HOME_FREEBIE_SLUGS = [
  "m3e-canvas",
  "ios-datepickers",
  "driver-js",
  "free-ios-ui-kit",
  "website-template",
  "appbar-ui",
];

/**
 * Index of the component guides (content/blog/*-ui-design.mdx), alphabetical.
 * Labels are short component names in sentence case. Add a row when a new
 * guide is published.
 */
export const HOME_UI_GUIDES: Array<{ slug: string; label: string }> = [
  { slug: "accordion-ui-design", label: "Accordion" },
  { slug: "ai-chat-interface-ui-design", label: "AI chat interface" },
  { slug: "appbar-ui-design", label: "App bar" },
  { slug: "avatar-ui-design", label: "Avatar" },
  { slug: "badge-ui-design", label: "Badge" },
  { slug: "breadcrumbs-ui-design", label: "Breadcrumbs" },
  { slug: "button-ui-design", label: "Button" },
  { slug: "calendar-ui-design", label: "Calendar" },
  { slug: "carousel-ui-design", label: "Carousel" },
  { slug: "checkbox-ui-design", label: "Checkbox" },
  { slug: "chip-ui-design", label: "Chip" },
  { slug: "dashboard-ui-design", label: "Dashboard" },
  { slug: "data-table-ui-design", label: "Data table" },
  { slug: "date-picker-ui-design", label: "Date picker" },
  { slug: "dropdown-ui-design", label: "Dropdown" },
  { slug: "empty-state-ui-design", label: "Empty state" },
  { slug: "filter-ui-design", label: "Filter" },
  { slug: "input-ui-design", label: "Input field" },
  { slug: "notifications-ui-design", label: "Notifications" },
  { slug: "pagination-ui-design", label: "Pagination" },
  { slug: "pricing-ui-design", label: "Pricing page" },
  { slug: "radio-button-ui-design", label: "Radio button" },
  { slug: "search-ui-design", label: "Search" },
  { slug: "settings-ui-design", label: "Settings" },
  { slug: "sidebar-navigation-ui-design", label: "Sidebar navigation" },
  { slug: "slider-ui-design", label: "Slider" },
  { slug: "stepper-ui-design", label: "Stepper" },
  { slug: "steps-ui-design", label: "Steps" },
  { slug: "tabs-ui-design", label: "Tabs" },
  { slug: "toggle-switch-ui-design", label: "Toggle switch" },
  { slug: "tooltip-ui-design", label: "Tooltip" },
];
