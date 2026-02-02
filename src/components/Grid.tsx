"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { clsx } from "clsx";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}

export function Grid({ children, className }: GridProps) {
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

    const mql = window.matchMedia("(min-width: 640px)"); // tailwind sm
    const itemNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-jg-item]"));
    const cleanup: Array<() => void> = [];

    const applyWideLayout = (item: HTMLElement) => {
      const img = item.querySelector<HTMLImageElement>("img");
      if (!img || !img.naturalWidth || !img.naturalHeight) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      item.style.flexGrow = ratio.toString();
      item.style.flexBasis = "0";
    };

    const applyMobileLayout = (item: HTMLElement) => {
      item.style.flexGrow = "";
      item.style.flexBasis = "";
    };

    const updateAll = () => {
      const wide = mql.matches;
      for (const item of itemNodes) {
        if (wide) applyWideLayout(item);
        else applyMobileLayout(item);
      }
    };

    for (const item of itemNodes) {
      const img = item.querySelector<HTMLImageElement>("img");
      if (!img) continue;

      const onLoad = () => updateAll();
      if (!img.complete) {
        img.addEventListener("load", onLoad);
        cleanup.push(() => img.removeEventListener("load", onLoad));
      }
    }

    const onChange = () => updateAll();
    mql.addEventListener("change", onChange);
    cleanup.push(() => mql.removeEventListener("change", onChange));

    updateAll();

    return () => cleanup.forEach((fn) => fn());
  }, [items]);

  return (
    <div
      className={clsx(
        "my-4 flex flex-wrap gap-4 items-start",
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
        <div
          data-jg-item
          key={index}
          className="jg-item w-full basis-full flex-none sm:w-auto sm:basis-0 sm:flex-auto"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
