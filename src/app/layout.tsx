import type { Metadata } from "next";
import { Noto_Sans_TC, Fira_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotReload } from "@/components/HotReload";
import { siteConfig } from "@/lib/config";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  preload: false,
  display: "swap",
});
const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Terminal Reverie",
  description: "A personal blog for thoughts and code.",
  icons: {
    icon: `${siteConfig.basePath || ""}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="dark">
      <body
        className={`${notoSansTC.variable} ${firaMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="grow container max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "development" && <HotReload />}
      </body>
    </html>
  );
}
