"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { clsx } from "clsx";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}

export function Grid({ children, cols = 2, className }: GridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => !(typeof child === "string" && child.trim() === "")
      ),
    [children]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-jg-item]"));
    const cleanup: Array<() => void> = [];

    const updateItem = (item: HTMLElement) => {
      const img = item.querySelector<HTMLImageElement>("img");
      if (!img || !img.naturalWidth || !img.naturalHeight) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      item.style.flexGrow = ratio.toString();
      item.style.flexBasis = "0";
    };

    for (const item of itemNodes) {
      const img = item.querySelector<HTMLImageElement>("img");
      if (!img) continue;
      if (img.complete) {
        updateItem(item);
      } else {
        const handler = () => updateItem(item);
        img.addEventListener("load", handler);
        cleanup.push(() => img.removeEventListener("load", handler));
      }
    }

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [items]);

  return (
    <div
      className={clsx(
        "flex flex-wrap gap-4 items-start",
        "[--jg-row-height:180px] sm:[--jg-row-height:210px] md:[--jg-row-height:240px]",
        "[&>.jg-item]:flex [&>.jg-item]:min-w-0",
        "[&>.jg-item>div]:w-full [&>.jg-item>figure>div]:w-full",
        "[&>.jg-item>div>div]:h-full [&>.jg-item>div>div]:w-full",
        "[&>.jg-item>figure>div>div]:h-full [&>.jg-item>figure>div>div]:w-full",
        "[&_.cursor-zoom-in>img]:h-full! [&_.cursor-zoom-in>img]:w-full! [&_.cursor-zoom-in>img]:object-contain",
        "[&_.cursor-zoom-in>img]:max-w-none!",
        "[&_figure]:my-0 [&_div]:my-0 [&_img]:my-0",
        className
      )}
      ref={containerRef}
    >
      {items.map((child, index) => (
        <div data-jg-item key={index} className="jg-item">
          {child}
        </div>
      ))}
    </div>
  );
}
