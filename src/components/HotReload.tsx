"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function HotReload() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let eventSource: EventSource | null = null;
    let retryTimeout: NodeJS.Timeout;

    const connect = () => {
      eventSource = new EventSource("/api/hot-reload");

      eventSource.onopen = () => {
        // console.log("[HotReload] Connected");
      };

      eventSource.onmessage = (event) => {
        if (event.data === "update") {
          console.log("[HotReload] Content changed, refreshing...");
          router.refresh();
        }
      };

      eventSource.onerror = () => {
        // console.warn("[HotReload] Connection lost, retrying...");
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
        // Retry connection after 2 seconds
        retryTimeout = setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      clearTimeout(retryTimeout);
    };
  }, [router]);

  return null;
}
