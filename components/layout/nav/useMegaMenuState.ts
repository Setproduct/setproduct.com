import { useEffect, useRef, useState } from "react";
import type { FocusEvent as ReactFocusEvent } from "react";
import type { NavOpenSource } from "../../../lib/nav/analytics";
import { isDesktopLayout, isFinePointer } from "./interaction";
import {
  NAV_HOVER_CLOSE_DELAY_MS,
  NAV_HOVER_OPEN_DELAY_MS,
  NAV_SUBCATEGORY_HOVER_DELAY_MS,
} from "./navConfig";
import type { CategoryMenuKey, MenuKey } from "./navConfig";

export type MenuCategories = Record<CategoryMenuKey, string | null>;

const INITIAL_CATEGORIES: MenuCategories = {
  inspiration: null,
  tutorials: null,
  freebies: null,
  designKits: null,
};

/**
 * Open/close state of the navbar dropdowns plus the active subcategory of each
 * panel. Owns hover-intent timers, click/tap/keyboard toggling (disclosure
 * pattern: focus alone never opens a panel), blur, Escape and outside-tap
 * closing, and the menu-to-menu switch without the collapse bounce.
 */
export function useMegaMenuState() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [categories, setCategories] = useState<MenuCategories>(INITIAL_CATEGORIES);
  const hoverIntentRef = useRef<number | null>(null);
  const subHoverIntentRef = useRef<number | null>(null);
  // How the most recent menu was opened, read when `nav_menu_open` is sent.
  const lastOpenSourceRef = useRef<NavOpenSource>("hover");

  const isMenuOpen = (menuName: MenuKey) => openMenu === menuName;

  const clearHoverIntent = () => {
    if (hoverIntentRef.current !== null) {
      window.clearTimeout(hoverIntentRef.current);
      hoverIntentRef.current = null;
    }
  };

  const clearSubHoverIntent = () => {
    if (subHoverIntentRef.current !== null) {
      window.clearTimeout(subHoverIntentRef.current);
      subHoverIntentRef.current = null;
    }
  };

  // Open (or swap between) menus immediately: hover across an open bar,
  // click, tap and keyboard all go through here.
  const openMenuImmediate = (menuName: MenuKey) => {
    clearHoverIntent();
    // Moving straight from one already-open menu to another: swap the panel
    // content without the collapse→expand bounce. `is-switching` disables the
    // panel's max-height transition so the new panel snaps to full height
    // while its inner content cross-fades in.
    setIsSwitching(openMenu !== null && openMenu !== menuName);
    setOpenMenu(menuName);
  };

  const closeMenuImmediate = () => {
    clearHoverIntent();
    clearSubHoverIntent();
    setIsSwitching(false);
    setOpenMenu(null);
  };

  /**
   * Trigger button activation. `source` tells a mouse click, a touch tap and
   * Enter/Space apart. A click on a panel the pointer already opened by hover
   * pins it instead of closing it: the cursor is resting on the trigger, so
   * the user wants the panel, not to dismiss it.
   */
  const toggleMenu = (menuName: MenuKey, source: NavOpenSource = isFinePointer() ? "click" : "tap") => {
    if (openMenu === menuName) {
      if (source === "click" && lastOpenSourceRef.current === "hover") {
        clearHoverIntent();
        lastOpenSourceRef.current = "click";
        return;
      }
      closeMenuImmediate();
      return;
    }
    lastOpenSourceRef.current = source;
    openMenuImmediate(menuName);
  };

  /** ↓ on a closed trigger: open without toggling an already open panel. */
  const openFromKeyboard = (menuName: MenuKey) => {
    if (openMenu === menuName) return;
    lastOpenSourceRef.current = "keyboard";
    openMenuImmediate(menuName);
  };

  const openOnHover = (menuName: MenuKey) => {
    if (!isFinePointer()) return;
    clearHoverIntent();
    if (openMenu !== menuName) lastOpenSourceRef.current = "hover";
    // If a sibling menu is already open, swap instantly so sweeping across the
    // bar stays responsive. Opening from a closed state waits out a short
    // intent delay so an incidental pass-over never drops the panel.
    if (openMenu !== null) {
      openMenuImmediate(menuName);
      return;
    }
    hoverIntentRef.current = window.setTimeout(() => {
      hoverIntentRef.current = null;
      setIsSwitching(false);
      setOpenMenu(menuName);
    }, NAV_HOVER_OPEN_DELAY_MS);
  };

  const closeOnHoverLeave = () => {
    if (!isFinePointer()) return;
    clearHoverIntent();
    // Grace period before collapsing: a diagonal path from trigger into the
    // panel, or a quick hop to a neighbouring trigger, cancels this timer.
    hoverIntentRef.current = window.setTimeout(() => {
      hoverIntentRef.current = null;
      clearSubHoverIntent();
      setIsSwitching(false);
      setOpenMenu(null);
    }, NAV_HOVER_CLOSE_DELAY_MS);
  };

  // Focus leaving a dropdown wrapper entirely closes its panel, so Tab past
  // the last link never leaves a stale panel over the page. Focus arriving on
  // a trigger does NOT open anything: Tab walks the bar trigger by trigger.
  // `relatedTarget` is null when focus goes to <body> (e.g. a tap on blank
  // page area); the outside-tap handler below covers that case on desktop.
  const closeOnBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || event.currentTarget.contains(next)) return;
    if (!event.currentTarget.querySelector(".w--open")) return;
    closeMenuImmediate();
  };

  /** Event handlers for a `.nav_dropdown-wr` wrapper. */
  const getWrapperProps = (menuName: MenuKey) => ({
    onMouseEnter: () => openOnHover(menuName),
    onMouseLeave: closeOnHoverLeave,
    onBlur: closeOnBlur,
  });

  const commitCategory = (menuName: CategoryMenuKey, value: string | null) => {
    setCategories((prev) => (prev[menuName] === value ? prev : { ...prev, [menuName]: value }));
  };

  // Pointer hover over a subcategory: debounce so a passing cursor doesn't
  // load every set on the way; only the one it lingers on commits.
  const setCategoryOnHover = (menuName: CategoryMenuKey, value: string | null) => {
    clearSubHoverIntent();
    subHoverIntentRef.current = window.setTimeout(() => {
      subHoverIntentRef.current = null;
      commitCategory(menuName, value);
    }, NAV_SUBCATEGORY_HOVER_DELAY_MS);
  };

  // Keyboard focus on a subcategory: cancel any queued hover switch and commit
  // instantly so Tab navigation maps 1:1 to the previews shown.
  const setCategoryNow = (menuName: CategoryMenuKey, value: string | null) => {
    clearSubHoverIntent();
    commitCategory(menuName, value);
  };

  // Close any open dropdown on Escape (keyboard escape hatch). If focus was
  // inside the menu, hand it back to that menu's trigger button so the
  // keyboard user keeps their place in the navbar instead of landing on <body>.
  useEffect(() => {
    if (openMenu === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const active = document.activeElement as HTMLElement | null;
      const wrapper = active?.closest<HTMLElement>(".nav_dropdown-wr") ?? null;
      clearHoverIntent();
      clearSubHoverIntent();
      setIsSwitching(false);
      setOpenMenu(null);
      const trigger = wrapper?.querySelector<HTMLElement>(".nav_dropdown_toggle");
      if (trigger && trigger !== active) trigger.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openMenu]);

  // Desktop: a tap or click anywhere outside the dropdowns closes the open
  // panel. Touch screens wider than 991px have no hover-out, so without this
  // a tapped-open panel would stay over the page. The mobile drawer is left
  // alone: its accordion collapses only through its own triggers.
  useEffect(() => {
    if (openMenu === null) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!isDesktopLayout()) return;
      const target = event.target as Element | null;
      if (target?.closest(".nav_dropdown-wr")) return;
      closeMenuImmediate();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
    // closeMenuImmediate only touches refs and state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu]);

  // Tidy any pending hover-intent timer on unmount so a queued open/close
  // never fires after teardown.
  useEffect(
    () => () => {
      if (hoverIntentRef.current !== null) window.clearTimeout(hoverIntentRef.current);
      if (subHoverIntentRef.current !== null) window.clearTimeout(subHoverIntentRef.current);
    },
    [],
  );

  return {
    openMenu,
    isSwitching,
    categories,
    lastOpenSourceRef,
    isMenuOpen,
    toggleMenu,
    openFromKeyboard,
    /** Close whatever is open right now, cancelling pending hover timers. */
    closeMenu: closeMenuImmediate,
    getWrapperProps,
    setCategoryOnHover,
    setCategoryNow,
    clearCategoryHover: clearSubHoverIntent,
  };
}

export type MegaMenuState = ReturnType<typeof useMegaMenuState>;
