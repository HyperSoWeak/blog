/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export function CustomImage({ src, alt, title, ...props }: CustomImageProps) {
  if (!src) return null;

  const image = (
    <img
      src={src}
      alt={alt || ""}
      title={title}
      className="rounded-lg border border-[var(--border)] max-w-full h-auto mx-auto"
      {...props}
    />
  );

  if (title) {
    return (
      <figure className="my-8 flex flex-col items-center">
        {image}
        <figcaption className="mt-3 text-sm text-zinc-500 font-mono text-center italic border-b border-[var(--primary-dim)] pb-1 inline-block">
          {title}
        </figcaption>
      </figure>
    );
  }

  return <div className="my-8 flex justify-center">{image}</div>;
}
