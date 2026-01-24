import { getAllCategories } from "@/lib/posts";
import Link from "next/link";
import { Folder } from "lucide-react";

export const metadata = {
  title: "Categories | Terminal Reverie",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 text-white">
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category}`}
            className="flex items-center gap-3 p-4 border border-border bg-zinc-950 hover:border-primary hover:bg-primary/10 transition-all group"
          >
            <Folder className="text-zinc-500 group-hover:text-primary transition-colors" />
            <span className="font-mono text-lg text-zinc-300 group-hover:text-white">
              {category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
