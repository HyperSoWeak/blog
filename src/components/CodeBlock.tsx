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
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = async () => {
    let textToCopy = raw;

    if (!textToCopy && preRef.current) {
      textToCopy = preRef.current.innerText;
    }

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);

      // Easter egg: 5% chance to show "HACKED!" instead of "OK"
      const isHacked = Math.random() < 0.05;
      setCopyStatus(isHacked ? "HACKED!" : "OK");

      setTimeout(() => setCopyStatus(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group my-8 border border-border bg-background shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      {/* Header - Tech Style */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-panel border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-none animate-pulse"></div>
          <span className="text-xs font-mono text-primary uppercase tracking-wider select-none flex items-center gap-1.5">
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
            className="group/btn flex items-center gap-1.5 px-2 py-0.5 border border-border bg-background hover:border-primary hover:bg-primary/10 transition-all"
            aria-label="Copy code"
            title="Copy to clipboard"
          >
            {copyStatus ? (
              <>
                <Check
                  size={12}
                  className={copyStatus === "HACKED!" ? "text-red-500" : "text-success"}
                />
                <span
                  className={clsx(
                    "text-[10px] font-mono uppercase tracking-wider",
                    copyStatus === "HACKED!" ? "text-red-500 font-bold" : "text-success"
                  )}
                >
                  {copyStatus}
                </span>
              </>
            ) : (
              <>
                <Copy size={12} className="text-zinc-500 group-hover/btn:text-primary" />
                <span className="text-[10px] text-zinc-500 group-hover/btn:text-primary font-mono uppercase tracking-wider cursor-pointer">
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
          className={clsx("text-[16px] leading-relaxed font-mono", className)}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
