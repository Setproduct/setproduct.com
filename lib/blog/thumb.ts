/**
 * Path of the small cover preview made by scripts/generate-blog-thumbs.js.
 * Every cover in /blog/covers/ has one in /blog/covers/thumbs/ with the same
 * file name, so pages that already ship `image` can derive the thumb on the
 * client instead of sending both paths. Client-safe: no fs access.
 */
export function blogThumbPath(image: string): string {
  if (!image.startsWith("/blog/covers/") || image.startsWith("/blog/covers/thumbs/")) return image;
  return `/blog/covers/thumbs/${image.slice("/blog/covers/".length)}`;
}
