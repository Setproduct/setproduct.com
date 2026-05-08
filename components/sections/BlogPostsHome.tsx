import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostPreview } from "../../types/data";
import ArrowIcon from "./ArrowIcon";
import styles from "./BlogPostsHome.module.css";

type Props = {
  posts: BlogPostPreview[];
  categories: string[];
  limit?: number;
};

export default function BlogPostsHome({ posts, categories, limit = 16 }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    const list = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;
    return list.slice(0, limit);
  }, [activeCategory, posts, limit]);
console.log("filteredPosts",filteredPosts)
  return (
    <div className={`main_blog-liist2-section ${styles.homeBlogSection}`}>
      <div className="heading-center-wr mob-align-left">
        <h2 className="heading-style-h2"> or design better with these practical insights</h2>
      </div>

      <div className="main_blog-liist2-form w-form">
        <div className="main_blog-liist2-filters-wr">
          <div className="main_blog-liist2-wr2 w-dyn-list">
            <div className="main_blog-liist2-2 w-dyn-items" role="list">
              <div className="w-dyn-item" role="listitem">
                <div
                  className={`button-x-small is-text${activeCategory === null ? " fs-cmsfilter_active" : ""}`}
                  onClick={() => setActiveCategory(null)}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-size-small text-weight-bold">Recent Publications</p>
                </div>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="w-dyn-item" role="listitem">
                  <div
                    className={`button-x-small is-text is-main-blog-filter w-radio${activeCategory === cat ? " fs-cmsfilter_active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="text-size-small text-weight-bold w-form-label">{cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main_blog-liist2-wr w-dyn-list">
          <div className="main_blog-liist2 w-dyn-items" role="list">
            {filteredPosts.map((post, index) => (
              <div key={post.slug} className="main_blog-liist2-item w-dyn-item" role="listitem">
                <div className="main_blog-liist2-item-wr">
                  <div className="main_blog-liist2-item-info">
                    <div className="category-tag">
                      <p className="text-size-tiny text-weight-semibold">{post.category}</p>
                    </div>
                    <Link className="w-inline-block" href={`/blog/${post.slug}`}>
                      <p className="heading-style-h5 text-color-dark-primary text-style-3lines">{post.title}</p>
                    </Link>
                    <p className="text-size-small text-style-2lines">{post.description}</p>
                    <div className="main_blog-liist-item-btn-wr">
                      <Link className="button-x-small is-text w-inline-block" href={`/blog/${post.slug}`}>
                        <div className="text-size-regular text-weight-bold">Read more</div>
                        <div className="button-icon is-small text-color-primary w-embed"><ArrowIcon /></div>
                      </Link>
                    </div>
                  </div>
                  <Link
                    className="main_blog-liist2-item-img-wr w-inline-block relative"
                    href={`/blog/${post.slug}`}
                  >
                    <img
                      alt={`/blog/${post.slug}`}
                      src={post.image.replace("/blog/covers/", "/blog/covers/thumbs/")}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="image-cover"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spacer-40" />

        <div className="main_blog-liist2-btn-wr">
          <Link className="button-small w-inline-block" href="/blog">
            <div className="text-size-medium text-weight-bold">Read All</div>
            <div className="button-icon is-small w-embed"><ArrowIcon /></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
