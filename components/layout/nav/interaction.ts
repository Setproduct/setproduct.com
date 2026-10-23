import type { KeyboardEvent as ReactKeyboardEvent } from "react";

/**
 * Keyboard helpers for the navbar dropdowns (disclosure navigation pattern):
 * triggers are buttons, panels hold ordinary links. Arrow keys are a shortcut
 * on top of Tab, never a replacement for it.
 */

const FOCUSABLE = "a[href], button:not([disabled])";

export function isFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Desktop layout: panels float over the page (the drawer takes over ≤991px). */
export function isDesktopLayout(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;
}

/** Focusable, visible elements in DOM order, skipping decorative duplicates. */
function getFocusables(root: Element): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex !== -1 && el.offsetParent !== null && !el.closest("[aria-hidden='true']"),
  );
}

/** Columns of a panel that arrow keys move within (`data-nav-group`). */
function getGroups(panel: Element): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>("[data-nav-group]")).filter(
    (group) => getFocusables(group).length > 0,
  );
}

/** Prefer the highlighted category, otherwise the first focusable element. */
function getEntryPoint(root: Element): HTMLElement | undefined {
  const items = getFocusables(root);
  return items.find((el) => el.classList.contains("w--current")) ?? items[0];
}

/** Move focus into a freshly opened panel (it was `inert` a frame ago). */
export function focusPanelEntry(panel: HTMLElement | null) {
  if (!panel) return;
  window.requestAnimationFrame(() => {
    const first = getGroups(panel)[0];
    getEntryPoint(first ?? panel)?.focus();
  });
}

/** ←/→ on a top-level trigger: hop to the neighbouring navbar item. */
export function focusSiblingTrigger(current: HTMLElement, direction: 1 | -1) {
  const bar = current.closest(".nav-menu-links-wr");
  if (!bar) return;
  const triggers = Array.from(
    bar.querySelectorAll<HTMLElement>(".nav_dropdown-wr .nav_dropdown_toggle, :scope > .nav-link-block"),
  ).filter((el) => el.offsetParent !== null);
  const index = triggers.indexOf(current);
  if (index === -1) return;
  triggers[(index + direction + triggers.length) % triggers.length]?.focus();
}

/**
 * Arrow keys inside an open panel. ↑/↓/Home/End move within the current
 * column, ←/→ jump between columns (categories ↔ preview grid). ↑ on the first
 * item hands focus back to the trigger.
 */
export function handlePanelKeyDown(event: ReactKeyboardEvent<HTMLElement>, onExitTop: () => void) {
  const { key } = event;
  if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
  const active = document.activeElement as HTMLElement | null;
  const group = active?.closest<HTMLElement>("[data-nav-group]");
  if (!active || !group || !event.currentTarget.contains(group)) return;

  const items = getFocusables(group);
  const index = items.indexOf(active);
  let next: HTMLElement | undefined;

  switch (key) {
    case "ArrowDown":
      next = items[index + 1];
      break;
    case "ArrowUp":
      if (index <= 0) {
        event.preventDefault();
        onExitTop();
        return;
      }
      next = items[index - 1];
      break;
    case "Home":
      next = items[0];
      break;
    case "End":
      next = items[items.length - 1];
      break;
    default: {
      const groups = getGroups(event.currentTarget);
      const target = groups[groups.indexOf(group) + (key === "ArrowRight" ? 1 : -1)];
      next = target ? getEntryPoint(target) : undefined;
    }
  }

  // Up/down never scroll the page while focus is inside the menu.
  if (next || key === "ArrowDown" || key === "ArrowUp") event.preventDefault();
  next?.focus();
}
