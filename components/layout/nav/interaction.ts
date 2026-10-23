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

export type Point = { x: number; y: number };

/** Signed area test: which side of the line a→b the point p lies on. */
function side(p: Point, a: Point, b: Point): number {
  return (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
}

function isInTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
  const d1 = side(p, a, b);
  const d2 = side(p, b, c);
  const d3 = side(p, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

/**
 * Menu aim ("safe triangle"): is the pointer heading for `target`, the preview
 * grid to the right of the Categories column? True when the pointer moved
 * right and its current position lies inside the triangle spanned by its
 * earlier position and the left edge of the target (widened by `tolerance`).
 * Movement mostly down or up the list falls outside the triangle.
 */
export function isAimingAt(prev: Point, curr: Point, target: DOMRect, tolerance = 0): boolean {
  // Hidden grid (drawer layout) or a pointer that isn't moving right.
  if (target.width === 0 || curr.x <= prev.x) return false;
  // Already over the grid or past its edge: nothing left to aim at.
  if (curr.x >= target.left) return false;
  const top = { x: target.left, y: target.top - tolerance };
  const bottom = { x: target.left, y: target.bottom + tolerance };
  return isInTriangle(curr, prev, top, bottom);
}

/**
 * Menu aim for the top bar: is the pointer heading down into an open panel
 * that spans the page below the triggers? The panel is full-width, so the
 * safe triangle reduces to "moving down steeply enough and still above it".
 */
export function isHeadingDownInto(
  prev: Point,
  curr: Point,
  panel: DOMRect,
  slope: number,
  minDy: number,
): boolean {
  if (panel.height === 0) return false;
  const dy = curr.y - prev.y;
  if (dy < minDy) return false;
  // Already inside the panel: its own wrapper handles the hover from here.
  if (curr.y >= panel.top) return false;
  return dy >= slope * Math.abs(curr.x - prev.x);
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
