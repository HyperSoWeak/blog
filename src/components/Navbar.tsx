"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background font-mono text-sm uppercase tracking-wider">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group z-50 flex items-center gap-2 text-primary transition-colors hover:text-white"
          >
            {/* Use the favicon as the logo */}
            <img src="/favicon.svg" alt="Terminal Reverie Logo" className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight">TERM_REVERIE</span>
          </Link>

          <div className="ml-6 hidden items-center gap-6 md:flex">
            <Link
              href="/archive"
              className="group relative text-zinc-400 transition-colors hover:text-primary"
            >
              /ARCHIVE
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/categories"
              className="group relative text-zinc-400 transition-colors hover:text-primary"
            >
              /CATS
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/tags"
              className="group relative text-zinc-400 transition-colors hover:text-primary"
            >
              /TAGS
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="group relative text-zinc-400 transition-colors hover:text-primary"
            >
              /SYS_INFO
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-4 text-zinc-500 md:flex">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Github size={18} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="z-50 text-zinc-400 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 border-l border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 md:hidden",
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

        <div className="mt-8 flex gap-6">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Github size={24} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
