/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { X, ZoomIn } from "lucide-react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export function CustomImage({ src, alt, title, className, ...props }: CustomImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  const toggleZoom = () => setIsOpen(!isOpen);

  const imageElement = (
    <div
      className={twMerge("relative group cursor-zoom-in overflow-hidden", className)}
      onClick={toggleZoom}
    >
      <img
        src={src}
        alt={alt || ""}
        title={title}
        className="max-w-full h-auto mx-auto border border-border"
        {...props}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <ZoomIn className="text-white drop-shadow-md" size={32} />
      </div>
    </div>
  );

  return (
    <>
      {title ? (
        <figure className={twMerge("flex flex-col items-center", className)}>
          {imageElement}
          <figcaption className="mt-2 text-sm text-zinc-500 font-mono text-center italic border-b border-primary-dim pb-1 inline-block">
            {title}
          </figcaption>
        </figure>
      ) : (
        <div className={twMerge("flex justify-center", className)}>{imageElement}</div>
      )}

      {/* Lightbox Overlay */}
      {isOpen && (
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
          <img
            src={src}
            alt={alt || ""}
            className="max-w-full max-h-full shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
          {title && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-zinc-300 bg-black/50 p-2 font-mono text-sm">
              {title}
            </div>
          )}
        </div>
      )}
    </>
  );
}
