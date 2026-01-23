"use client";

import { useEffect, useState } from "react";
import { TOCItem } from "@/lib/utils";
import { clsx } from "clsx";

interface TableOfContentsProps {
  toc: TOCItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto pl-4 border-l-2 border-[var(--border)]">
      <h4 className="font-mono text-xs font-bold text-[var(--primary)] uppercase mb-4 tracking-wider flex items-center gap-2">
        <span>{"//"}</span> INDEX
      </h4>
      <ul className="space-y-2 text-xs font-mono">
        {toc.map((item) => (
          <li key={item.slug} style={{ paddingLeft: `${(item.depth - 1) * 0.5}rem` }}>
            <a
              href={`#${item.slug}`}
              className={clsx(
                "block transition-colors border-l-2 pl-2 -ml-[calc(1rem+2px)]",
                activeId === item.slug
                  ? "border-[var(--primary)] text-[var(--primary)] font-bold bg-[var(--primary)]/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.slug)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.slug);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
