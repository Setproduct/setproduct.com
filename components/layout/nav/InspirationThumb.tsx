import { useEffect, useRef, useState } from "react";

// Tracks image URLs that have already been revealed once. Cards remount when
// the active category changes (key={item.id}); without this, every remount
// would replay the blur fade-in even though the image is already cached. By
// remembering revealed URLs we initialise such thumbs as already-loaded, so the
// reveal animation plays only the first time each preview appears.
const revealedInspirationImages = new Set<string>();

// Thumbnail with a shimmer skeleton until the lazy image decodes. The wrapper
// gets `.is-loaded` on load → shimmer fades out, image blur-fades in. We check
// `complete` on mount so cached images (which may skip onLoad) reveal at once,
// and skip the animation entirely for previews already shown earlier.
export function InspirationThumb({ href, image }: { href: string; image: string }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(() => revealedInspirationImages.has(image));

  const reveal = () => {
    revealedInspirationImages.add(image);
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded && imgRef.current?.complete) {
      reveal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      className={`nav_tabs-list-item-img-wr nav_inspiration-img-wr hover-lift-media w-inline-block relative${loaded ? " is-loaded" : ""}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <img
        ref={imgRef}
        alt=""
        src={image}
        loading="lazy"
        onLoad={reveal}
        onError={reveal}
        className="image-cover nav_inspiration-img"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </a>
  );
}
