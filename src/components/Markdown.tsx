import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';
import { CopyButton } from './ui/CopyButton';
import React from 'react';

// Plugin to add raw code to pre tag
const rehypeAddRaw = () => (tree: any) => {
  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'pre') {
      const code = node.children.find((n: any) => n.tagName === 'code');
      if (code && code.children && code.children[0] && code.children[0].type === 'text') {
        node.properties.raw = code.children[0].value;
      }
    }
  });
};

// Plugin to rewrite image src
const rehypeImageRewrite = (options: { slug: string }) => (tree: any) => {
  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'img' && node.properties && node.properties.src) {
      const src = node.properties.src as string;
      if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
         const cleanSrc = src.replace(/^\.\//, '');
         node.properties.src = `/images/${options.slug}/${cleanSrc}`;
      }
    }
  });
};

const Pre = ({ children, raw, ...props }: any) => {
  return (
    <div className="relative group my-6">
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#111] border border-[var(--border)] border-b-0 rounded-t-sm flex items-center px-2 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
      </div>
      <pre {...props} className="pt-8 p-4 bg-[#050505] overflow-x-auto text-sm border border-[var(--border)] font-mono text-zinc-300">
        {children}
      </pre>
      {raw && <CopyButton text={raw} className="top-2 right-2 text-zinc-500 hover:text-[var(--primary)]" />}
    </div>
  );
};

const components = {
  pre: Pre,
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
            [rehypeImageRewrite, { slug }],
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            rehypeAddRaw,
            [rehypePrettyCode, {
              theme: 'github-dark',
              keepBackground: false,
            }],
            rehypeKatex,
          ],
        },
      }}
    />
  );
}