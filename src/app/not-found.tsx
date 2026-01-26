import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Not Found | Terminal Reverie",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono relative overflow-hidden">
      <div className="z-10 flex flex-col items-center max-w-lg text-center p-6 border border-border bg-zinc-950/80 backdrop-blur-sm shadow-2xl">
        <AlertTriangle size={48} className="text-red-500 mb-4 animate-pulse" />

        <h1 className="text-4xl font-bold text-white mb-2">SYSTEM_ERROR</h1>

        <div className="w-full h-px bg-linear-to-r from-transparent via-red-500 to-transparent my-4"></div>

        <p className="text-lg text-red-400 mb-6 font-bold tracking-wider">
          ERROR CODE: 404_NOT_FOUND
        </p>

        <div className="text-zinc-400 text-sm space-y-4 mb-8 text-left bg-black/50 p-4 border border-zinc-800 w-full">
          <p>
            <span className="text-primary">&gt;</span> Initiating search sequence...{" "}
            <span className="text-red-500">FAILED</span>
          </p>
          <p>
            <span className="text-primary">&gt;</span> Locating file allocation table...{" "}
            <span className="text-red-500">CORRUPTED</span>
          </p>
          <p>
            <span className="text-primary">&gt;</span> The requested resource is inaccessible or
            does not exist in this sector.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="px-6 py-2 bg-primary text-black font-bold hover:bg-primary-dim transition-colors flex items-center gap-2"
          >
            <span>&gt;</span> REBOOT_SYSTEM
          </Link>
          <Link
            href="/archive"
            className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
          >
            VIEW_LOGS
          </Link>
        </div>
      </div>
    </div>
  );
}
