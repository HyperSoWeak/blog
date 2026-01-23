import GithubSlugger from "github-slugger";
import { format, parseISO } from "date-fns";

export type TOCItem = {
  title: string;
  slug: string;
  depth: number;
};

export function extractTOC(content: string): TOCItem[] {
  const slugger = new GithubSlugger();
  const regex = /^(#{2,3})\s+(.*)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length;
    const title = match[2];
    const slug = slugger.slug(title);

    headings.push({ title, slug, depth });
  }

  return headings;
}

export function formatDate(dateString: string) {
  try {
    return format(parseISO(dateString), "yyyy-MM-dd"); // ISO format fits the technical theme better
  } catch {
    return dateString;
  }
}

/**
 * Resolves the image path for a post.
 * If the image is a URL (http/https), returns it as is.
 * If it's a relative path (./image.png or image.png), converts it to /images/[slug]/[filename].
 */
export function resolvePostImage(postSlug: string, imagePath?: string): string | null {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  // Remove leading ./ or /
  const cleanPath = imagePath.replace(/^(\.\/|\/)/, "");
  return `/images/${postSlug}/${cleanPath}`;
}
