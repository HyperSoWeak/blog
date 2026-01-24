/* eslint-disable @next/next/no-img-element */
import React from "react";
import { twMerge } from "tailwind-merge";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export function CustomImage({ src, alt, title, className, ...props }: CustomImageProps) {
  if (!src) return null;

  const image = (
    <img
      src={src}
      alt={alt || ""}
      title={title}
      className={twMerge("rounded-lg border border-border max-w-full h-auto mx-auto", className)}
      {...props}
    />
  );

  if (title) {
    return (
      <figure className={twMerge("my-8 flex flex-col items-center", className)}>
        {image}
        <figcaption className="mt-3 text-sm text-zinc-500 font-mono text-center italic border-b border-primary-dim pb-1 inline-block">
          {title}
        </figcaption>
      </figure>
    );
  }

  return <div className={twMerge("my-8 flex justify-center", className)}>{image}</div>;
}
