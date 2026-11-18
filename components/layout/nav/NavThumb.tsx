import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "./NavLink";

// Image URLs already revealed once in this session. Cards remount whenever the
// active category changes (the preview list gets a fresh React `key`), so
// without this every switch would replay the shimmer and the blur fade-in even
// though the file is already cached. Remembering revealed URLs lets a remounted
// thumb start in the loaded state, so the reveal plays only the first time each
// preview appears.
const revealedNavThumbs = new Set<string>();

type NavThumbProps = {
  /** Where the image frame leads. */
  href: string;
  /** Source of the preview image. */
  image: string;
  /** Card title, used to build the alt text. */
  title: string;
  /** Off-site section: the frame opens in a new tab. */
  external?: boolean;
  /**
   * `sizes` of a `next/image` rendered with `fill`. Passing it switches the
   * thumb to the optimised image pipeline (Resources, the design kit shelf);
   * without it a plain <img> is used (Magazine, UI guides), which is enough for
   * the pre-generated thumbs in /blog/covers/thumbs/.
   */
  sizes?: string;
  /**
   * Hide the frame from assistive tech and the tab order. The title link right
   * next to it goes to the same place, so the image frame is a duplicate.
   */
  decorative?: boolean;
};

/**
 * Image frame of a mega-menu preview card: a shimmer skeleton until the lazy
 * image decodes, then the picture blur-fades in. Shared by all four panels so
 * previews behave the same everywhere instead of popping in one by one.
 *
 * The wrapper gets `.is-loaded` on load → shimmer fades out, image fades in. We
 * check `complete` on mount so cached images (which may skip onLoad) reveal at
 * once, and skip the animation entirely for previews already shown earlier.
 *
 * Markup and sizing come from `.nav_tabs-list-item-img-wr`; the shimmer and the
 * reveal transition live in styles/globals.css (`.nav_thumb-img-wr`).
 */
export function NavThumb({ href, image, title, external = false, sizes, decorative = true }: NavThumbProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(() => revealedNavThumbs.has(image));

  const reveal = () => {
    revealedNavThumbs.add(image);
    setLoaded(true);
  };

  useEffect(() => {
    // Read the set instead of the state so the effect can stay mount-only.
    if (!revealedNavThumbs.has(image) && imgRef.current?.complete) reveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frameClassName =
    `nav_tabs-list-item-img-wr nav_thumb-img-wr hover-lift-media w-inline-block relative` +
    (loaded ? " is-loaded" : "");

  return (
    <NavLink
      className={frameClassName}
      href={href}
      external={external}
      aria-hidden={decorative ? "true" : undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      {sizes ? (
        <Image
          ref={imgRef}
          alt={`${title} preview`}
          src={image}
          fill
          sizes={sizes}
          onLoad={reveal}
          onError={reveal}
          className="image-cover nav_thumb-img"
        />
      ) : (
        <img
          ref={imgRef}
          alt={`${title} preview`}
          src={image}
          loading="lazy"
          decoding="async"
          onLoad={reveal}
          onError={reveal}
          className="image-cover nav_thumb-img"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </NavLink>
  );
}
