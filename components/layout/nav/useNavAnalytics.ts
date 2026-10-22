import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { INSPIRATION_CATEGORIES } from "../../../data/inspiration";
import {
  NAV_MENU_ID,
  describeHref,
  getNavLinkType,
  parsePrice,
  trackNav,
} from "../../../lib/nav/analytics";
import { DESIGN_KITS, NAV_OPEN_TRACK_DELAY_MS } from "./navConfig";
import type { CategoryMenuKey } from "./navConfig";
import type { MegaMenuState, MenuCategories } from "./useMegaMenuState";

// Human-readable category for reports (matches what the user saw).
function categoryLabel(menuKey: string, category: string | null): string {
  if (category === null) return "all";
  if (menuKey === "inspiration") {
    return INSPIRATION_CATEGORIES.find((c) => c.slug === category)?.label ?? category;
  }
  if (menuKey === "designKits") {
    return DESIGN_KITS.find((k) => k.category === category)?.label ?? category;
  }
  return category;
}

/**
 * GA4 tracking for the mega-menu: `nav_menu_open`, `nav_category_view`,
 * `nav_click` and `nav_buy_click`. Returns the delegated click handler that
 * goes on the root navigation element as `onClickCapture`.
 */
export function useNavAnalytics({ openMenu, categories, lastOpenSourceRef }: MegaMenuState) {
  // Last committed subcategory per panel. Category-view events fire only on a
  // real change, so the mount run (and StrictMode's double effect run in dev)
  // never reports the initial "All" as a user choice.
  const lastTrackedCategoryRef = useRef<MenuCategories>({
    inspiration: null,
    tutorials: null,
    freebies: null,
    designKits: null,
  });

  // Count a panel as opened once it has stayed open for a moment. The source
  // is captured when the panel actually changes, so a later focus event inside
  // an already-open panel can't relabel it.
  useEffect(() => {
    if (openMenu === null) return;
    const source = lastOpenSourceRef.current;
    const menuName = NAV_MENU_ID[openMenu] ?? openMenu;
    const timer = window.setTimeout(() => {
      trackNav("nav_menu_open", { menu_name: menuName, input_type: source });
    }, NAV_OPEN_TRACK_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [openMenu, lastOpenSourceRef]);

  // A subcategory was actually committed (after the hover debounce or on
  // keyboard focus). One effect per panel, deduped against the last value.
  const trackCategoryView = (menuKey: CategoryMenuKey, category: string | null) => {
    if (lastTrackedCategoryRef.current[menuKey] === category) return;
    lastTrackedCategoryRef.current[menuKey] = category;
    trackNav("nav_category_view", {
      menu_name: NAV_MENU_ID[menuKey] ?? menuKey,
      category: categoryLabel(menuKey, category),
    });
  };
  useEffect(() => trackCategoryView("inspiration", categories.inspiration),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories.inspiration]);
  useEffect(() => trackCategoryView("tutorials", categories.tutorials),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories.tutorials]);
  useEffect(() => trackCategoryView("freebies", categories.freebies),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories.freebies]);
  useEffect(() => trackCategoryView("designKits", categories.designKits),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories.designKits]);

  // One delegated capture listener for every link in the navbar menus. Only
  // elements inside a [data-nav-menu] wrapper are tracked, so the logo, search
  // forms and the "Write for us" button stay out of these events.
  const handleNavClickCapture = (event: ReactMouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const el = target?.closest<HTMLElement>("a, button, [role='button']");
    if (!el) return;
    const scope = el.closest<HTMLElement>("[data-nav-menu]");
    if (!scope) return;
    const menuKey = scope.dataset.navMenu ?? "";
    const linkType = getNavLinkType(el);
    // Toggles without a link (mobile accordion, Company) are covered by
    // nav_menu_open; only real navigations are clicks.
    if (!(el instanceof HTMLAnchorElement) || !el.getAttribute("href") || el.getAttribute("href") === "#") {
      if (linkType !== "company_link" && linkType !== "promo") return;
    }

    const card = el.closest<HTMLElement>(".nav_tabs-list-item");
    const itemTitle = card
      ?.querySelector<HTMLElement>(".nav_tabs-list-item-info-wr .hover-lift-title")
      ?.textContent?.trim();
    const itemPosition = card?.parentElement
      ? Array.prototype.indexOf.call(card.parentElement.children, card) + 1
      : undefined;
    const label = el.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const link = el instanceof HTMLAnchorElement && el.href ? describeHref(el) : null;
    const menuName = NAV_MENU_ID[menuKey] ?? menuKey;
    const activeCategory = menuKey in categories ? categories[menuKey as CategoryMenuKey] : null;
    const category = categoryLabel(menuKey, activeCategory);

    trackNav("nav_click", {
      menu_name: menuName,
      category,
      link_type: linkType,
      item_title: itemTitle ?? (linkType === "card_title" ? undefined : label),
      item_position: itemPosition,
      link_url: link?.url,
      outbound: link?.outbound,
    });

    if (menuKey === "designKits" && linkType === "card_cta") {
      trackNav("nav_buy_click", {
        menu_name: menuName,
        category,
        item_title: itemTitle,
        value: parsePrice(label),
        currency: "USD",
      });
    }
  };

  return { handleNavClickCapture };
}
