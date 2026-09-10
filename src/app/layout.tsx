import type { Metadata } from "next";
import Script from "next/script";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aierabi.jp"),
  title: {
    default: "AIツール比較｜保存済み評価と公式情報 | AI選び",
    template: "%s",
  },
  description:
    "AIツールの2026年3月時点の保存済み評価と、公式一次情報で確認した客観情報を分けて掲載する比較ガイド。",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-192.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-48.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AI選び｜保存済み評価と公式情報でAIを比較",
    description:
      "2026年3月時点の保存済み評価と公式情報を分けて確認できるAIツール比較ガイド。",
    url: "https://www.aierabi.jp",
    siteName: "AI選び",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "AI選び｜あなたに最適なAIが3分でわかる",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI選び｜保存済み評価と公式情報でAIを比較",
    description:
      "2026年3月時点の保存済み評価と公式情報を分けて確認できるAIツール比較ガイド。",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="58h4q6izcFdGa4utc7jGfjUHUxLAD_Yt5tJ7Z2G2_ls" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-R6WQKPGF2X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R6WQKPGF2X');
          `}
        </Script>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
