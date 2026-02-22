import type { Metadata } from "next";
import { Noto_Sans_TC, Fira_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotReload } from "@/components/HotReload";
import { siteConfig } from "@/lib/config";
import { absoluteUrl, seoConfig, withBasePath } from "@/lib/seo";

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
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  category: "technology",
  alternates: {
    canonical: withBasePath("/"),
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: absoluteUrl("/"),
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
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
