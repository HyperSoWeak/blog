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
      let debounceTimer: NodeJS.Timeout | null = null;

      const sendUpdate = () => {
        try {
          controller.enqueue(encoder.encode("data: update\n\n"));
        } catch (e) {
          // Stream likely closed
        }
      };

      // Watch content directory recursively
      const watcher = fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
        // Ignore dotfiles to avoid noise
        if (filename && !filename.startsWith(".")) {
          // Debounce: clear existing timer and set a new one
          if (debounceTimer) {
            clearTimeout(debounceTimer);
          }

          debounceTimer = setTimeout(() => {
            console.log(`[HotReload] Change detected: ${filename} (debounced)`);
            sendUpdate();
            debounceTimer = null;
          }, 200); // Wait 200ms for further changes
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
        if (debounceTimer) clearTimeout(debounceTimer);
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
