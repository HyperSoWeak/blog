import { siteConfig } from "@/lib/config";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const seoConfig = {
  siteName: "Terminal Reverie",
  defaultTitle: "Terminal Reverie",
  defaultDescription: "A personal blog for thoughts and code.",
  siteUrl: DEFAULT_SITE_URL,
  basePath: siteConfig.basePath,
  defaultKeywords: [
    "Terminal Reverie",
    "HyperSoWeak",
    "blog",
    "programming",
    "computer science",
    "資工",
    "演算法",
    "CTF",
    "筆記",
  ],
};

export function withBasePath(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${seoConfig.basePath}${normalizedPath}`;
}

export function absoluteUrl(pathname: string): string {
  return `${seoConfig.siteUrl}${withBasePath(pathname)}`;
}

