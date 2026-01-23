"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={twMerge(
        "p-2 rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all z-20 absolute",
        className
      )}
      aria-label="Copy code"
      title="Copy to clipboard"
    >
      {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );
}
