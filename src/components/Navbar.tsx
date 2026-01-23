"use client";

import Link from "next/link";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50 font-mono text-sm uppercase tracking-wider">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--primary)] hover:text-white transition-colors group z-50">
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

        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={clsx(
        "fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <Link href="/archive" className="text-xl hover:text-[var(--primary)]" onClick={() => setIsOpen(false)}>[ARCHIVE]</Link>
        <Link href="/categories" className="text-xl hover:text-[var(--primary)]" onClick={() => setIsOpen(false)}>[DIR:CATS]</Link>
        <Link href="/tags" className="text-xl hover:text-[var(--primary)]" onClick={() => setIsOpen(false)}>[DIR:TAGS]</Link>
        <Link href="/about" className="text-xl hover:text-[var(--primary)]" onClick={() => setIsOpen(false)}>[SYS_INFO]</Link>
        
        <div className="flex gap-6 mt-8">
           <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
