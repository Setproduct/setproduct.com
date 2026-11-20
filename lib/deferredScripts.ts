/**
 * Third-party scripts that are not needed for the first paint (Google tag,
 * the Gumroad overlay) load on the first sign of a real visitor: pointer
 * movement, a tap, a key, a scroll. If nothing happens, they load a few
 * seconds after the page has finished loading.
 *
 * Why: the two Google tag libraries alone (~350 KB) took ~250 ms of
 * main-thread time right after hydration, which was most of the Total
 * Blocking Time in PageSpeed. Nothing is lost by waiting: `gtag()` is a stub
 * that pushes to `dataLayer`, and the library replays the queue when it
 * arrives.
 */

const INTENT_EVENTS = ["pointermove", "pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;
const FALLBACK_AFTER_LOAD_MS = 6000;

const pending: Array<() => void> = [];
let fired = false;
let armed = false;

function fire() {
  if (fired) return;
  fired = true;
  INTENT_EVENTS.forEach((type) => window.removeEventListener(type, fire, true));
  pending.splice(0).forEach((run) => run());
}

function arm() {
  if (armed) return;
  armed = true;
  INTENT_EVENTS.forEach((type) =>
    window.addEventListener(type, fire, { capture: true, passive: true, once: true }),
  );
  const startFallback = () => window.setTimeout(fire, FALLBACK_AFTER_LOAD_MS);
  if (document.readyState === "complete") startFallback();
  else window.addEventListener("load", startFallback, { once: true });
}

/** Runs `task` on the first visitor intent (or the fallback timer). */
export function onFirstIntent(task: () => void) {
  if (typeof window === "undefined") return;
  if (fired) {
    task();
    return;
  }
  pending.push(task);
  arm();
}

const injected = new Set<string>();

/** Appends an async <script> once. */
export function injectScript(src: string) {
  if (typeof document === "undefined" || injected.has(src)) return;
  injected.add(src);
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}
