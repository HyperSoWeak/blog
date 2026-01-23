"use client";

import React, { useRef, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { clsx } from "clsx";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  raw?: string;
  "data-language"?: string;
}

export function CodeBlock({
  children,
  raw,
  className,
  "data-language": lang = "text",
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    let textToCopy = raw;

    if (!textToCopy && preRef.current) {
      textToCopy = preRef.current.innerText;
    }

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group my-8 border border-[var(--border)] bg-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      {/* Header - Tech Style */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a0a0a] border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-none animate-pulse"></div>
          <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-wider select-none flex items-center gap-1.5">
            <Terminal size={12} className="inline-block" />
            {lang}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-700 font-mono hidden sm:inline-block tracking-widest">
            [RO]
          </span>
          <button
            onClick={handleCopy}
            className="group/btn flex items-center gap-1.5 px-2 py-0.5 border border-zinc-800 bg-black hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
            aria-label="Copy code"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <>
                <Check size={12} className="text-green-500" />
                <span className="text-[10px] text-green-500 font-mono uppercase tracking-wider">
                  OK
                </span>
              </>
            ) : (
              <>
                <Copy
                  size={12}
                  className="text-zinc-500 group-hover/btn:text-[var(--primary)]"
                />
                <span className="text-[10px] text-zinc-500 group-hover/btn:text-[var(--primary)] font-mono uppercase tracking-wider">
                  CPY
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="p-3 relative overflow-x-auto bg-zinc-900">
        <pre
          ref={preRef}
          {...props}
          className={clsx("text-[15px] leading-relaxed font-mono", className)}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
