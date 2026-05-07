type MDXImageProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
};

export default function MDXImage({
  src,
  alt = "",
  width,
  height,
  caption,
}: MDXImageProps) {
  if (!src) return null;

  const imageEl = (
    <img
      src={src}
      alt={alt}
      width={width || 1600}
      height={height || 900}
      className="rounded-md"
      style={{ width: "100%", height: "auto", maxWidth: "100%" }}
      loading="lazy"
    />
  );

  if (caption) {
    return (
      <figure className="my-6">
        {imageEl}
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return imageEl;
}
