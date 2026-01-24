import { getAllCategoriesWithCounts } from "@/lib/posts";
import Link from "next/link";
import { Folder } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Terminal Reverie",
};

export default async function CategoriesPage() {
  const categories = await getAllCategoriesWithCounts();
  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-mono border-b border-border pb-4 text-white">
        <span className="text-primary">/</span>root<span className="text-zinc-500">/</span>
        categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const percentage = (cat.count / maxCount) * 100;

          return (
            <Link
              key={cat.name}
              href={`/categories/${cat.name}`}
              className="group relative block p-6 border border-border bg-zinc-950/50 hover:border-primary transition-all hover:bg-zinc-900 overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-20 border-l-20 border-t-zinc-800 border-l-transparent group-hover:border-t-primary transition-colors"></div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <Folder
                    size={32}
                    className="text-zinc-600 group-hover:text-primary transition-colors"
                  />
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-primary">
                    DIR
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-zinc-300 group-hover:text-white mb-1 font-mono">
                    {cat.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-600 group-hover:bg-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      {cat.count} {cat.count === 1 ? "FILE" : "FILES"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
