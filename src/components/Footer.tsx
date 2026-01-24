import { Github, Linkedin, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[#050505] py-8 font-mono text-xs uppercase tracking-widest">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 text-zinc-500">
            <Terminal size={14} className="text-[var(--primary)]" />
            <span>&copy; {new Date().getFullYear()} HYPER HU. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-[var(--primary)]"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-[var(--primary)]"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
