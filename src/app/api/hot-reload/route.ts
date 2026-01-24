import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not available in production", { status: 404 });
  }

  const contentDir = path.join(process.cwd(), "content");
  
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      const sendUpdate = () => {
        try {
          controller.enqueue(encoder.encode("data: update\n\n"));
        } catch (e) {
          // Stream likely closed
        }
      };

      // Watch content directory recursively
      const watcher = fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
        // Debounce or just send? Next.js router.refresh() handles quick calls well enough usually.
        // We'll just send.
        // Ignore dotfiles to avoid noise
        if (filename && !filename.startsWith(".")) {
           console.log(`[HotReload] Change detected: ${filename}`);
           sendUpdate();
        }
      });

      // Keep connection alive
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch (e) {
             clearInterval(interval);
             watcher.close();
        }
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        watcher.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
