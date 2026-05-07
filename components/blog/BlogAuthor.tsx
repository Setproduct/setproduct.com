import { getAuthor } from "../../lib/blog/authors";

type BlogAuthorProps = {
  authorSlug: string;
};

export default function BlogAuthor({ authorSlug }: BlogAuthorProps) {
  const author = getAuthor(authorSlug);
  return (
    <a href="#" className="blogpost_author-wr w-inline-block">
      <div className="blogpost_author-img">
        <img
          src={author.avatar}
          alt={author.name}
          width={40}
          height={40}
          className="image-cover"
          loading="lazy"
          style={{ color: "transparent" }}
        />
      </div>
      <p className="text-size-regular text-weight-semibold">{author.name}</p>
    </a>
  );
}
