/**
 * Shared body scroll lock.
 *
 * Several overlays (mobile nav drawer, contact dialog) can be open at once or
 * hand over to each other. Each of them used to save and restore
 * `body.style.overflow` on its own, so closing one could unlock the page while
 * the other was still open. A counter keeps the page locked until the last
 * overlay lets go.
 *
 * While locked, the width of the vanished scrollbar is added as
 * `padding-right` so the page does not jump sideways. The same value is
 * exposed as `--scrollbar-compensation` for fixed elements that need it.
 */

let lockCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

export function lockScroll(): void {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;

  const { body, documentElement } = document;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  savedOverflow = body.style.overflow;
  savedPaddingRight = body.style.paddingRight;

  if (scrollbarWidth > 0) {
    const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbarWidth}px`;
  }
  documentElement.style.setProperty("--scrollbar-compensation", `${Math.max(scrollbarWidth, 0)}px`);
  body.style.overflow = "hidden";
}

export function unlockScroll(): void {
  if (typeof document === "undefined" || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const { body, documentElement } = document;
  body.style.overflow = savedOverflow;
  body.style.paddingRight = savedPaddingRight;
  documentElement.style.removeProperty("--scrollbar-compensation");
}
