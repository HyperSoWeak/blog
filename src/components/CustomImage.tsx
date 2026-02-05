"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import { X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";

type CustomImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt?: string;
  title?: string;
  priority?: boolean;
  sizes?: string;
};

export function CustomImage({
  src,
  alt,
  title,
  className,
  width,
  height,
  sizes,
  loading,
  priority,
  ...rest
}: CustomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canPortal = typeof document !== "undefined";
  const safeWidth = typeof width === "number" ? width : 1200;
  const safeHeight = typeof height === "number" ? height : 800;
  const safeSizes = sizes || "100vw";

  if (!src) return null;

  const toggleZoom = () => setIsOpen(!isOpen);

  const imageElement = (
    <div className="relative group/image cursor-zoom-in overflow-hidden" onClick={toggleZoom}>
      <Image
        src={src}
        alt={alt || ""}
        title={title}
        width={safeWidth}
        height={safeHeight}
        sizes={safeSizes}
        loading={loading}
        priority={priority}
        className="max-w-full h-auto mx-auto border border-border"
        unoptimized
        {...rest}
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
      {canPortal &&
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
              <Image
                src={src}
                alt={alt || ""}
                className="max-w-full max-h-[calc(100vh-10rem)] shadow-2xl object-contain"
                width={safeWidth}
                height={safeHeight}
                sizes="100vw"
                priority
                unoptimized
                {...rest}
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
