import { getAllTags } from "@/lib/posts";
import Link from "next/link";
import { Tag } from "lucide-react";

export const metadata = {
  title: "Tags | Terminal Reverie",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 text-white">
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        tags
      </h1>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-zinc-950 hover:border-primary hover:bg-primary/10 transition-all group"
          >
            <Tag size={16} className="text-zinc-500 group-hover:text-primary transition-colors" />
            <span className="font-mono text-zinc-300 group-hover:text-white uppercase">#{tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
