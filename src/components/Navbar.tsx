"use client";

import Link from "next/link";
import { Github, Linkedin, Menu, X, Terminal } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50 font-mono text-sm uppercase tracking-wider">
      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-white transition-colors group z-50"
          >
            <Terminal size={20} className="stroke-[2.5]" />
            <span className="text-lg font-bold tracking-tight">TERM_REVERIE</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link
              href="/archive"
              className="hover:text-primary transition-colors text-zinc-400 relative group"
            >
              /ARCHIVE
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/categories"
              className="hover:text-primary transition-colors text-zinc-400 relative group"
            >
              /CATS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/tags"
              className="hover:text-primary transition-colors text-zinc-400 relative group"
            >
              /TAGS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors text-zinc-400 relative group"
            >
              /SYS_INFO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-zinc-500">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
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
      <div
        className={clsx(
          "fixed inset-0 bg-[#050505]/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden border-l border-border",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Link
          href="/archive"
          className="text-2xl font-bold hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          /ARCHIVE
        </Link>
        <Link
          href="/categories"
          className="text-2xl font-bold hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          /CATS
        </Link>
        <Link
          href="/tags"
          className="text-2xl font-bold hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          /TAGS
        </Link>
        <Link
          href="/about"
          className="text-2xl font-bold hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          /SYS_INFO
        </Link>

        <div className="flex gap-6 mt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
