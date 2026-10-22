import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import AuthorPage from "../../components/pages/AuthorPage";
import { AUTHORS, getAuthor } from "../../lib/blog/authors";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";
import type { Author } from "../../types/blog";
import type { BlogPostPreview } from "../../types/data";

type PageProps = {
  author: Author;
  authorPosts: BlogPostPreview[];
  navData: NavData;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(AUTHORS).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const author = getAuthor(slug);

  return {
    props: {
      author,
      authorPosts: getBlogPostPreviews({ authorSlug: author.slug }),
      navData: getNavData(),
    },
  };
};

export default function AuthorRoute({
  author,
  authorPosts,
  navData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AuthorPage author={author} authorPosts={authorPosts} navData={navData} />;
}
