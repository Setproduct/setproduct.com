import { useEffect } from "react";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export type AppLightboxProps = {
  open: boolean;
  close: () => void;
  slides: SlideImage[];
  index?: number;
  /** Show the thumbnails strip at the bottom (galleries with 2+ slides). */
  thumbnails?: boolean;
};

/**
 * Single source of truth for lightbox appearance and behavior across the site:
 * - light (white) backdrop so light-toned screenshots read correctly
 * - soft fade in/out (300ms)
 * - dark buttons without the default drop shadow
 * - click on the backdrop (outside the image) closes the lightbox
 * - prev/next arrows are hidden for a single slide
 *
 * Do not import this file directly — use AppLightbox (lazy wrapper),
 * so the yet-another-react-lightbox bundle stays out of the initial JS.
 */
export default function AppLightboxInner({
  open,
  close,
  slides,
  index = 0,
  thumbnails = false,
}: AppLightboxProps) {
  const single = slides.length <= 1;

  // The library locks body scroll while open (react-remove-scroll). On some
  // pages releasing the lock resets the scroll position to the top. Remember
  // the reading position on mount and restore it right after unmount, so the
  // user always lands exactly where they were before opening the lightbox.
  useEffect(() => {
    const scrollY = window.scrollY;
    return () => {
      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - scrollY) > 1) {
          window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
        }
      });
    };
  }, []);

  return (
    <Lightbox
      open={open}
      close={close}
      slides={slides}
      index={index}
      plugins={thumbnails && !single ? [Thumbnails] : []}
      carousel={{ finite: true }}
      animation={{ fade: 300, swipe: 250 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      thumbnails={{
        position: "bottom",
        width: 100,
        height: 60,
        gap: 8,
        border: 0,
        showToggle: false,
      }}
      styles={{
        root: {
          "--yarl__color_backdrop": "rgba(255, 255, 255, 0.96)",
          "--yarl__color_button": "#19181b",
          "--yarl__color_button_active": "#000",
          "--yarl__color_button_disabled": "rgba(25, 24, 27, 0.35)",
          // Kill the default drop shadow under the close/nav icons.
          "--yarl__button_filter": "none",
        },
      }}
      render={single ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
    />
  );
}
