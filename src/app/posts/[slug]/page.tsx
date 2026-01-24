/* eslint-disable @next/next/no-img-element */
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { extractTOC, formatDate, resolvePostImage } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Calendar, Tag, Clock, ChevronRight, Folder, List } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Terminal Reverie`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractTOC(post.content);
  const featuredImageUrl = resolvePostImage(post.slug, post.featuredImage);

  return (
    <article className="max-w-6xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6 uppercase">
        <Link href="/" className="hover:text-primary">
          ROOT
        </Link>
        <ChevronRight size={12} />
        <Link href="/archive" className="hover:text-primary">
          POSTS
        </Link>
        <ChevronRight size={12} />
        <span className="text-zinc-300 truncate max-w-50">{post.slug}</span>
      </div>

      <header className="mb-8 border border-border bg-panel relative overflow-hidden">
        {featuredImageUrl && (
          <div className="w-full h-64 md:h-80 relative border-b border-border">
            <img
              src={featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-panel via-transparent to-transparent"></div>
            {/* Scanline overlay on image */}
            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-20 pointer-events-none"></div>
          </div>
        )}

        <div className="p-6 md:p-10 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="flex items-center gap-1 text-xs font-mono bg-primary/10 text-primary border border-primary-dim px-2 py-1 uppercase hover:bg-primary hover:text-black transition-colors"
              >
                <Folder size={12} />
                {cat}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-mono border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <time>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span>{post.wordCount} words</span>
            </div>
            {/* Moved Tags Here */}
            <div className="flex items-center gap-2 ml-auto">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="flex items-center gap-1 text-xs font-mono bg-background hover:bg-primary hover:text-black border border-border px-2 py-1 transition-colors uppercase"
                >
                  <Tag size={12} />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile ToC */}
      {toc.length > 0 && (
        <div className="lg:hidden mb-8">
          <details className="border border-border bg-panel group">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-primary font-mono font-bold uppercase hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-2">
                <List size={16} />
                <span>Table of Contents</span>
              </div>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 border-t border-border">
              <TableOfContents toc={toc} />
            </div>
          </details>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className={toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
          <div
            className="prose prose-invert prose-zinc max-w-none
                prose-headings:font-mono prose-headings:text-foreground prose-headings:font-bold
                prose-h1:text-foreground prose-h1:border-b prose-h1:border-border prose-h1:pb-3
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:text-primary prose-code:bg-zinc-900 prose-code:px-1
                prose-img:border prose-img:border-border
                "
          >
            <Markdown source={post.content} slug={post.slug} />
          </div>
        </div>

        {toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-1">
            <TableOfContents toc={toc} />
          </aside>
        )}
      </div>
    </article>
  );
}
