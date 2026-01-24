"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function HotReload() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    console.log("[HotReload] Connecting...");
    const eventSource = new EventSource("/api/hot-reload");

    eventSource.onmessage = (event) => {
      if (event.data === "update") {
        console.log("[HotReload] Content changed, refreshing...");
        router.refresh();
      }
    };

    eventSource.onerror = (error) => {
      console.error("[HotReload] Connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [router]);

  return null;
}
