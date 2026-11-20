import { useSyncExternalStore } from "react";

/**
 * One switch for every image inside the mega-menu panels.
 *
 * Closed panels stay in the DOM (max-height: 0, needed for the open motion),
 * so the browser treated their ~30 previews as visible and downloaded them at
 * page load with high priority, competing with the page's own LCP image. The
 * previews now render their <img> only after the first sign of intent: the
 * pointer entering the nav, keyboard focus in it, or the mobile drawer opening.
 * The existing hover preloading warms the exact files a moment later.
 *
 * Server render and the first client render both see `false`, so hydration
 * matches.
 */
let armed = false;
const listeners = new Set<() => void>();

export function armNavImages() {
  if (armed) return;
  armed = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => armed;
const getServerSnapshot = () => false;

export function useNavImagesArmed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
