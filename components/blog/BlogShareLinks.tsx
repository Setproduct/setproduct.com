"use client";
import { useState } from "react";

type BlogShareLinksProps = {
  url: string;
  title: string;
};

export default function BlogShareLinks({ url, title }: BlogShareLinksProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      void _;
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="blogpost_content-share-wr">
      <p className="text-size-medium text-weight-bold">Share this post</p>
      <div className="blogpost_soc-links-wr">
        <div style={{ display: copied ? "block" : "none" }} className="sign">
          <div className="text-size-regular">Link copied</div>
        </div>
        <a href="#" className="blogpost_soc-link w-inline-block" onClick={handleCopy}>
          <img
            src="/images/Share-Button1.svg"
            loading="lazy"
            alt="Copy icon"
            className="image-cover"
          />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blogpost_soc-link w-inline-block"
        >
          <img
            src="/images/008-linkedin-1.svg"
            loading="lazy"
            alt="Linkedin icon"
            className="image-cover"
          />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blogpost_soc-link w-inline-block"
        >
          <img
            src="/images/Share-Button2.svg"
            loading="lazy"
            alt="Facebook icon"
            className="image-cover"
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blogpost_soc-link w-inline-block"
        >
          <img
            src="/images/002-twitter.svg"
            loading="lazy"
            alt="Twitter icon"
            className="image-cover"
          />
        </a>
      </div>
    </div>
  );
}
