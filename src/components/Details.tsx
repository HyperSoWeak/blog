import React from "react";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";

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
        "group my-4 rounded-lg border border-border bg-panel overflow-hidden",
        className
      )}
      open={open}
    >
      <summary className="flex cursor-pointer items-center justify-between bg-panel p-4 font-mono font-bold text-primary transition-colors hover:bg-background/50 select-none list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-2">
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-open:rotate-90"
          />
          <span>{summary}</span>
        </div>
      </summary>
      <div className="border-t border-border bg-background p-4 text-sm text-zinc-300">
        {children}
      </div>
    </details>
  );
}
