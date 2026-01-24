/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { visit } from "unist-util-visit";
import { CodeBlock } from "./CodeBlock";
import { CustomImage } from "./CustomImage";
import { Grid } from "./Grid";
import { Details } from "./Details";
import React from "react";

// Plugin to add raw code to pre tag
const rehypeAddRaw = () => (tree: any) => {
  visit(tree, "element", (node: any) => {
    if (node.tagName === "figure") {
      const pre = node.children.find((n: any) => n.tagName === "pre");
      if (pre && pre.properties) {
        // Pass data attributes from pre to figure if needed, or handle in Pre component
      }
    }

    if (node.tagName === "pre") {
      const code = node.children.find((n: any) => n.tagName === "code");
      if (code && code.children && code.children[0] && code.children[0].type === "text") {
        node.properties.raw = code.children[0].value;
      }
    }
  });
};

// Plugin to rewrite image src
const rehypeImageRewrite = (options: { slug: string }) => (tree: any) => {
  const BASE_PATH = process.env.NODE_ENV === "production" ? "/blog" : "";
  visit(tree, "element", (node: any) => {
    if (node.tagName === "img" && node.properties && node.properties.src) {
      const src = node.properties.src as string;
      if (!src.startsWith("http") && !src.startsWith("/") && !src.startsWith("data:")) {
        const cleanSrc = src.replace(/^\.\//, "");
        node.properties.src = `${BASE_PATH}/images/${options.slug}/${cleanSrc}`;
      }
    }
  });
};

const components = {
  pre: CodeBlock as any,
  img: CustomImage as any,
  Grid: Grid as any,
  Details: Details as any,
  details: Details as any,
};

interface MarkdownProps {
  source: string;
  slug: string;
}

export async function Markdown({ source, slug }: MarkdownProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeUnwrapImages,
            rehypeAddRaw,
            [
              rehypePrettyCode,
              {
                theme: "one-dark-pro",
                keepBackground: false,
              },
            ],
            [rehypeImageRewrite, { slug }],
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            [rehypeKatex, { strict: false, trust: true }],
          ],
        },
      }}
    />
  );
}
