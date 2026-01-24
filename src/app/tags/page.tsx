import { getAllTagsWithCounts } from "@/lib/posts";
import Link from "next/link";
import { Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Terminal Reverie",
};

function scale(value: number, min: number, max: number, outMin: number, outMax: number) {
  if (max === min) return (outMin + outMax) / 2;
  return outMin + ((value - min) / (max - min)) * (outMax - outMin);
}

export default async function TagsPage() {
  const tags = await getAllTagsWithCounts();

  const counts = tags.map((t) => t.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return (
    <div>
      <h1 className="mb-8 border-b border-border pb-4 font-mono text-3xl font-bold text-white">
        <span className="text-primary">/</span>root
        <span className="text-zinc-500">/</span>tags
      </h1>

      <div className="flex flex-wrap gap-x-5 gap-y-4 leading-tight">
        {tags.map((tag) => {
          const fontSize = scale(tag.count, min, max, 1, 1.8);
          const opacity = scale(tag.count, min, max, 0.75, 1);

          return (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              style={{
                fontSize: `${fontSize}rem`,
                opacity,
              }}
              className="
                group inline-flex items-center gap-2
                font-mono uppercase
                text-zinc-300
                transition-all
                hover:text-white
              "
            >
              <Tag size={16} className="text-zinc-600 transition-colors group-hover:text-primary" />
              <span className="tracking-wide">#{tag.name}</span>
              <span className="text-sm text-zinc-500 group-hover:text-primary">
                {tag.count.toString().padStart(2, "0")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
