import { Metadata } from "next";
import { withBasePath } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "關於 Hyper Hu 與 Terminal Reverie 的介紹。",
  alternates: {
    canonical: withBasePath("/about"),
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

