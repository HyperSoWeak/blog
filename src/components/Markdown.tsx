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
    if (node.tagName === 'figure') {
       // rehype-pretty-code wraps pre in figure often, look inside
       const pre = node.children.find((n: any) => n.tagName === 'pre');
       if (pre && pre.properties) {
          // If we find raw code in pre (sometimes added by other plugins or if we move this plugin order)
          // But usually we need to extract from code node BEFORE pretty-code runs or use what pretty-code leaves
       }
    }
    
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
  // If raw is missing from props, it might be because rehype-pretty-code handles things differently.
  // We can try to extract text from children if raw isn't provided, but it's risky with highlighted code.
  // The rehypeAddRaw plugin *should* run before pretty-code transforms it too much if ordered correctly.
  
  return (
    <div className="relative group my-6">
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#111] border border-[var(--border)] border-b-0 rounded-t-sm flex items-center px-3 justify-between">
        <div className="flex gap-1.5">
           <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-[10px] text-zinc-600 font-mono uppercase">/bin/sh</div>
      </div>
      
      {/* Container for pre and button */}
      <div className="relative">
         <pre {...props} className="pt-4 p-4 mt-0 bg-[#050505] overflow-x-auto text-sm border border-[var(--border)] font-mono text-zinc-300 rounded-b-sm">
           {children}
         </pre>
         
         {raw && (
            <CopyButton 
              text={raw} 
              className="top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
            />
         )}
      </div>
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
            rehypeAddRaw, // Run BEFORE pretty-code to capture raw text from simple <pre><code> structure
            [rehypePrettyCode, {
              theme: 'github-dark',
              keepBackground: false,
            }],
            [rehypeImageRewrite, { slug }],
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            rehypeKatex,
          ],
        },
      }}
    />
  );
}
