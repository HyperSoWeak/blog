import { Github, Linkedin, Instagram, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-panel py-8 font-mono text-xs uppercase tracking-widest">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 text-zinc-500">
            <Terminal size={14} className="text-primary" />
            <span>
              &copy; {new Date().getFullYear()} {siteConfig.profile.name.toUpperCase()}. ALL RIGHTS
              RESERVED.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-primary"
            >
              <Github size={16} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-primary"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-primary"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
