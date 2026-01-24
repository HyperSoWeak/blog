import React from "react";
import { clsx } from "clsx";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}

export function Grid({ children, cols = 2, className }: GridProps) {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    }[cols] || "grid-cols-1 md:grid-cols-2";

  return (
    <div
      className={clsx(
        "grid gap-4 my-8",
        gridCols,
        // Override default vertical margins of images/figures inside the grid
        "[&_figure]:my-0 [&_div]:my-0 [&_img]:my-0",
        className
      )}
    >
      {children}
    </div>
  );
}
