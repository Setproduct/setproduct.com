import { getImageProps } from "next/image";

// URLs already requested in this session, so repeated hovers cost nothing.
const requested = new Set<string>();

/**
 * Warm the browser cache for a plain <img> (blog thumbs, Inspiration images).
 * A detached Image element downloads its source without touching the DOM.
 */
export function preloadPlainImage(src: string) {
  if (!src || requested.has(src) || typeof window === "undefined") return;
  requested.add(src);
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

/**
 * Warm the cache for a next/image rendered with `fill` and fixed `sizes`.
 * We build the same srcset the component will use, so the browser picks the
 * exact /_next/image variant it later needs for the card.
 */
export function preloadNextImage(src: string, sizes: string) {
  const key = `${src}|${sizes}`;
  if (!src || requested.has(key) || typeof window === "undefined") return;
  requested.add(key);
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  const img = new window.Image();
  img.decoding = "async";
  // sizes must be set before srcset, otherwise the browser may pick a
  // candidate for the default 100vw and fetch a much larger file.
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}
