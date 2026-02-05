/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export function CustomImage({ src, alt, title, className, ...props }: CustomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!src) return null;

  const toggleZoom = () => setIsOpen(!isOpen);

  const imageElement = (
    <div className="relative group/image cursor-zoom-in overflow-hidden" onClick={toggleZoom}>
      <img
        src={src}
        alt={alt || ""}
        title={title}
        className="max-w-full h-auto mx-auto border border-border"
        {...props}
      />
      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/image:opacity-100">
        <ZoomIn className="text-white drop-shadow-md" size={32} />
      </div>
    </div>
  );

  return (
    <>
      {title ? (
        <figure className={twMerge("mdx-image flex flex-col items-center", className)}>
          {imageElement}
          <figcaption className="mt-2 text-sm text-zinc-500 font-mono text-center italic border-b border-primary-dim pb-1 inline-block">
            {title}
          </figcaption>
        </figure>
      ) : (
        <div className={twMerge("mdx-image flex justify-center", className)}>{imageElement}</div>
      )}

      {/* Lightbox Overlay */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={toggleZoom}
          >
            <button
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={toggleZoom}
            >
              <X size={32} />
            </button>
            <div
              className="flex flex-col items-center gap-3 max-w-[min(92vw,80rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt || ""}
                className="max-w-full max-h-[calc(100vh-10rem)] shadow-2xl object-contain"
              />
              {title && (
                <div className="text-center text-zinc-300 bg-black/50 px-3 py-2 font-mono text-sm w-full">
                  {title}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
