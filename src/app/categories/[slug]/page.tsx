import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return {
    title: `${category} | Terminal Reverie`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(post => post.categories.includes(category));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-zinc-800 pb-4">
        <span className="text-green-500">/</span>categories<span className="text-zinc-500">/</span>{category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
