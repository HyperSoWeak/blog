import React from "react";
import { clsx } from "clsx";

interface DetailsProps {
  summary: string;
  children: React.ReactNode;
  open?: boolean;
  className?: string;
}

export function Details({ summary, children, open, className }: DetailsProps) {
  return (
    <details
      className={clsx(
        "group my-6 border border-border bg-panel/30 transition-all duration-200",
        className
      )}
      open={open}
    >
      <summary className="flex cursor-pointer items-center bg-panel px-4 py-3 font-mono text-sm font-bold text-primary transition-colors hover:bg-primary/5 select-none list-none [&::-webkit-details-marker]:hidden border-b border-border group-open:border-primary/30">
        <span className="mr-3 font-mono text-zinc-500 group-open:hidden">[+]</span>
        <span className="mr-3 font-mono text-primary hidden group-open:inline">[-]</span>
        <span className="uppercase tracking-widest">{summary}</span>
      </summary>
      <div className="bg-background/50 p-6 leading-relaxed prose-code:bg-panel prose-code:text-primary">
        {children}
      </div>
    </details>
  );
}
