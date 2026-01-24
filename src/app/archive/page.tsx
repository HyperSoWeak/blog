import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Archive } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive | Terminal Reverie",
};

export default async function ArchivePage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 flex items-center gap-2 text-white">
        <Archive className="text-primary" />
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        archive
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
