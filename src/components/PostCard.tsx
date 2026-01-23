import Link from "next/link";
import { formatDate, resolvePostImage } from "@/lib/utils";
import { Post } from "@/lib/posts";
import { Calendar, Hash, FileText, ExternalLink } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const imageUrl = resolvePostImage(post.slug, post.featuredImage);

  return (
    <div className="group border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--primary)] transition-colors relative overflow-hidden flex flex-col h-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#111] border-b border-[var(--border)] text-xs font-mono text-zinc-500">
         <span className="truncate">FILE: {post.slug}.mdx</span>
         <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[var(--primary)] transition-colors"></div>
         </div>
      </div>

      {/* Image Area */}
      {imageUrl ? (
        <div className="aspect-video w-full border-b border-[var(--border)] overflow-hidden bg-black relative">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
          />
          <div className="absolute inset-0 bg-[var(--primary)] mix-blend-overlay opacity-0 group-hover:opacity-10 pointer-events-none"></div>
        </div>
      ) : (
        <div className="aspect-video w-full border-b border-[var(--border)] bg-[#050505] flex items-center justify-center relative overflow-hidden group-hover:bg-[#080808] transition-colors">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <Terminal size={32} className="text-zinc-700 group-hover:text-[var(--primary)] transition-colors" />
        </div>
      )}

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex gap-3 text-xs text-[var(--primary-dim)] font-mono mb-2 uppercase tracking-wide">
           <span className="flex items-center gap-1">
             <Calendar size={12} /> {formatDate(post.date)}
           </span>
           <span className="text-zinc-600">|</span>
           <span className="flex items-center gap-1">
             <FileText size={12} /> {post.wordCount} words
           </span>
        </div>

        <Link href={`/posts/${post.slug}`} className="block mb-2">
          <h2 className="text-lg font-bold text-zinc-100 group-hover:text-[var(--primary)] transition-colors leading-tight glow-text-hover">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-zinc-500 text-sm line-clamp-3 font-mono leading-relaxed mb-4 flex-grow">
          &gt; {post.description}
        </p>

        {/* Tags */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-900/50 px-1.5 py-0.5 border border-zinc-800 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}

// Fallback icon import fix
import { Terminal } from "lucide-react";