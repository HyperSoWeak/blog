import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string[];
  featuredImage?: string;
  content: string;
  wordCount: number;
};

export async function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((file) => {
    return fs.statSync(path.join(POSTS_DIR, file)).isDirectory();
  });
}

function getSnippet(content: string, length = 160): string {
  const plainText = content
    .replace(/---[\s\S]*?---/, "") // Remove frontmatter just in case
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/\$\$[\s\S]*?\$\$/g, "") // Remove block math
    .replace(/\$[^$\n]+\$/g, "") // Remove inline math
    .replace(/#+\s+/g, "") // Remove headers
    .replace(/!?\[\[?.*?\]\]?\(.*?\)/g, "") // Remove images and links
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  return Array.from(plainText).slice(0, length).join("") + "...";
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const postDir = path.join(POSTS_DIR, realSlug);
  const fullPath = path.join(postDir, "index.mdx");

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Chinese word count approximation
  const wordCount =
    (content.match(/[\u4e00-\u9fa5]/g) || []).length + (content.match(/\w+/g) || []).length;

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    description: data.description || getSnippet(content),
    tags: data.tags || [],
    categories: data.categories || [],
    featuredImage: data.featuredImage || null,
    content,
    wordCount,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Filter out nulls and sort by date descending
  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => post.categories.forEach((c) => categories.add(c)));
  return Array.from(categories);
}

export async function getAllCategoriesWithCounts(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    post.categories.forEach((c) => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

export async function getAllTagsWithCounts(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
