import { useEffect, useRef, useState } from "react";
import type { FocusEvent as ReactFocusEvent } from "react";
import type { NavOpenSource } from "../../../lib/nav/analytics";
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

function isFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Open/close state of the navbar dropdowns plus the active subcategory of each
 * panel. Owns hover-intent timers, keyboard parity (focus opens, blur and
 * Escape close) and the menu-to-menu switch without the collapse bounce.
 */
export function useMegaMenuState() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [categories, setCategories] = useState<MenuCategories>(INITIAL_CATEGORIES);
  const hoverIntentRef = useRef<number | null>(null);
  const subHoverIntentRef = useRef<number | null>(null);
  // Set right before Escape hands focus back to a trigger, so that programmatic
  // focus doesn't bounce through openOnFocus and reopen the panel just closed.
  const suppressFocusOpenRef = useRef(false);
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

  const toggleMenu = (menuName: MenuKey) => {
    if (openMenu !== menuName) {
      lastOpenSourceRef.current = isFinePointer() ? "click" : "tap";
    }
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  // Open (or swap between) menus immediately. Shared by pointer hover-intent
  // and keyboard focus so both input paths behave identically.
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

  // Keyboard parity: focus entering a dropdown wrapper opens it; focus leaving
  // the wrapper entirely (relatedTarget outside) closes it. Moving focus
  // between the trigger and the links inside keeps the panel open.
  const openOnFocus = (menuName: MenuKey) => {
    if (suppressFocusOpenRef.current) {
      suppressFocusOpenRef.current = false;
      return;
    }
    if (openMenu !== menuName) lastOpenSourceRef.current = "keyboard";
    openMenuImmediate(menuName);
  };

  const closeOnBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    closeMenuImmediate();
  };

  /** Event handlers for a `.nav_dropdown-wr` wrapper. */
  const getWrapperProps = (menuName: MenuKey) => ({
    onMouseEnter: () => openOnHover(menuName),
    onMouseLeave: closeOnHoverLeave,
    onFocus: () => openOnFocus(menuName),
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
  // inside the menu, hand it back to that menu's trigger so the keyboard user
  // keeps their place in the navbar instead of being dropped onto <body>.
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
      if (!wrapper) return;
      // Desktop focuses the transparent section link; the Company toggle is a
      // role="button" div. Hidden candidates (mobile drawer) are skipped.
      const trigger = Array.from(
        wrapper.querySelectorAll<HTMLElement>(
          ".nav_dropdown_toggle-link, .nav_dropdown_toggle[role='button']",
        ),
      ).find((el) => el.offsetParent !== null);
      if (!trigger || trigger === active) return;
      suppressFocusOpenRef.current = true;
      trigger.focus();
      // focus() fires onFocus synchronously; if it didn't reach openOnFocus
      // (e.g. focus was already inside the wrapper), don't leave the flag set.
      suppressFocusOpenRef.current = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
    getWrapperProps,
    setCategoryOnHover,
    setCategoryNow,
    clearCategoryHover: clearSubHoverIntent,
  };
}

export type MegaMenuState = ReturnType<typeof useMegaMenuState>;
