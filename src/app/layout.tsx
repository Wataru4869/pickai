import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pick AI — AIツール比較ガイド",
  description:
    "ChatGPT・Claude・Gemini・Grok・Perplexityを独自30テストで徹底比較。用途別のおすすめAIを提案します。",
  openGraph: {
    title: "Pick AI — AIツール比較ガイド",
    description: "独自30テストで5大AIモデルを徹底比較。あなたに最適なAIが見つかる。",
    siteName: "Pick AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick AI — AIツール比較ガイド",
    description: "独自30テストで5大AIを徹底比較",
  },
  alternates: {
    canonical: "https://ai-imanani.vercel.app",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
