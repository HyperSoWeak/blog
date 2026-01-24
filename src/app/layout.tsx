import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotReload } from "@/components/HotReload";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Terminal Reverie",
  description: "A personal blog for thoughts and code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="dark">
      <body
        className={`${inter.variable} ${firaMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="grow container max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "development" && <HotReload />}
      </body>
    </html>
  );
}
