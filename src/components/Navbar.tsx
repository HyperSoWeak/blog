import Link from "next/link";
import { Github, Linkedin, Instagram, Terminal, Cpu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50 font-mono text-sm uppercase tracking-wider">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--primary)] hover:text-white transition-colors group">
            <span className="text-xl font-bold">&gt;_</span>
            <span className="group-hover:underline decoration-[var(--primary)] underline-offset-4">TERM_REVERIE</span>
            <span className="animate-pulse">_</span>
          </Link>
          
          <span className="hidden md:inline text-[var(--border)]">|</span>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/archive" className="hover:text-[var(--primary)] transition-colors">[ARCHIVE]</Link>
            <Link href="/categories" className="hover:text-[var(--primary)] transition-colors">[DIR:CATS]</Link>
            <Link href="/tags" className="hover:text-[var(--primary)] transition-colors">[DIR:TAGS]</Link>
            <Link href="/about" className="hover:text-[var(--primary)] transition-colors">[SYS_INFO]</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}