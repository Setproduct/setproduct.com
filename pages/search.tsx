import type { GetStaticProps } from "next";
import SearchPage from "../components/pages/SearchPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import { buildSearchIndex } from "../lib/search/buildIndex";
import type { SearchableItem } from "../lib/search/types";
import type { BlogPostPreview } from "../types/data";

type Props = {
  items: SearchableItem[];
  blogPosts: BlogPostPreview[];
};

export default function SearchRoute({ items, blogPosts }: Props) {
  return <SearchPage items={items} blogPosts={blogPosts} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items: buildSearchIndex(),
      blogPosts: getBlogPostPreviews({ maxPerCategory: 6 }),
    },
  };
};
