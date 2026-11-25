import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogFrontmatter } from "../../types/blog";
import type { BlogPostPreview } from "../../types/data";
import { UI_GUIDES, UI_GUIDE_GROUPS, UI_GUIDE_START_HERE, type UiGuideGroupKey } from "../../data/ui-guides";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Card data for one guide: exactly the fields a card renders. */
export type UiGuideCard = BlogPostPreview & { label: string };

export type UiGuidesData = {
  startHere: UiGuideCard[];
  groups: Array<{ key: UiGuideGroupKey; title: string; guides: UiGuideCard[] }>;
};

function readCard(slug: string, label: string): UiGuideCard {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    // data/ui-guides.ts lists a guide that has no post. Failing the build is
    // deliberate: silently dropping the row would leave a hole in the index
    // that nobody notices, and a hub page with 46 guides reads as complete.
    throw new Error(
      `[ui-guides] data/ui-guides.ts lists "${slug}", but content/blog/${slug}.mdx does not exist. ` +
        `Fix the slug or remove the row.`,
    );
  }

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  const frontmatter = data as BlogFrontmatter;
  const image = frontmatter.coverImage ?? "";

  return {
    slug: frontmatter.slug ?? slug,
    label,
    title: frontmatter.title ?? label,
    description: frontmatter.cardDescription ?? frontmatter.description ?? "",
    image,
    thumbImage: frontmatter.thumbImage ?? image,
    category: frontmatter.category ?? "UI Design",
  };
}

/**
 * Reads frontmatter for every guide in the index, grouped for the /ui-guides
 * hub. Server-only: touches the filesystem, so call it from getStaticProps.
 */
export function getUiGuidesData(): UiGuidesData {
  const byGroup = new Map<UiGuideGroupKey, UiGuideCard[]>(
    UI_GUIDE_GROUPS.map((group) => [group.key, []]),
  );

  for (const guide of UI_GUIDES) {
    const bucket = byGroup.get(guide.group);
    if (!bucket) {
      throw new Error(`[ui-guides] "${guide.slug}" has unknown group "${guide.group}".`);
    }
    bucket.push(readCard(guide.slug, guide.label));
  }

  const startHere = UI_GUIDE_START_HERE.map((slug) => {
    const guide = UI_GUIDES.find((item) => item.slug === slug);
    if (!guide) {
      throw new Error(
        `[ui-guides] UI_GUIDE_START_HERE lists "${slug}", which is not in UI_GUIDES.`,
      );
    }
    return readCard(guide.slug, guide.label);
  });

  return {
    startHere,
    groups: UI_GUIDE_GROUPS.map((group) => ({
      key: group.key,
      title: group.title,
      guides: byGroup.get(group.key) ?? [],
    })),
  };
}
