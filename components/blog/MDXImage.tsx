import Image from "next/image";

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

  const isExternal = src.startsWith("http://") || src.startsWith("https://");

  const imageEl =
    width && height ? (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        // sizes="(max-width: 768px) 100vw, 900px"
        className="rounded-md"
        style={{ width: "100%", height: "auto", maxWidth: "100%" }}
        unoptimized={isExternal}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        // sizes="(max-width: 768px) 100vw, 900px"
        className="rounded-md"
        style={{ width: "100%", height: "auto", maxWidth: "100%" }}
        unoptimized={isExternal}
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
