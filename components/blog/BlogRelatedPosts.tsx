import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "../../types/blog";

type BlogRelatedPostsProps = {
  posts: BlogPostMeta[];
};

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="main_blog-liist2-section">
      <div className="heading-center-wr mob-align-left">
        <h2 className="heading-style-h3">Related posts</h2>
      </div>
      <div className="spacer-40" />
      <div className="main_blog-liist2 w-dyn-items" role="list">
        {posts.map((post) => (
          <div
            key={post.frontmatter.slug}
            className="main_blog-liist2-item w-dyn-item"
            role="listitem"
          >
            <div className="main_blog-liist2-item-wr">
              <div className="main_blog-liist2-item-info">
                {post.frontmatter.category && (
                  <div className="category-tag">
                    <p className="text-size-tiny text-weight-semibold">
                      {post.frontmatter.category}
                    </p>
                  </div>
                )}
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="w-inline-block"
                >
                  <p className="heading-style-h5 text-color-dark-primary text-style-3lines">
                    {post.frontmatter.title}
                  </p>
                </Link>
                <p className="text-size-small text-style-2lines">
                  {post.frontmatter.cardDescription ?? post.frontmatter.description}
                </p>
                <p className="text-size-small text-color-light-grey">
                  {formatDate(post.frontmatter.date)}
                </p>
              </div>
              {post.frontmatter.coverImage && (
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="main_blog-liist2-item-img-wr w-inline-block"
                >
                  <Image
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.coverImageAlt ?? post.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="image-cover"
                    unoptimized={post.frontmatter.coverImage.startsWith("http")}
                  />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
