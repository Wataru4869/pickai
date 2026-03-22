import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "【2026年最新】AIツール比較おすすめランキング | Pick AI",
  description:
    "ChatGPT・Claude・Gemini・Grok・Perplexityを独自30テストで徹底比較。文章生成・コーディング・画像生成・安全性を5軸で採点。用途別おすすめAIが見つかります。",
  openGraph: {
    title: "【2026年最新】AIツール比較おすすめランキング | Pick AI",
    description: "6カテゴリ38ツールを網羅。独自30テストで徹底比較。",
    url: "https://pickai.jp",
    siteName: "Pick AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "【2026年最新】AIツール比較おすすめランキング | Pick AI",
    description: "6カテゴリ38ツールを網羅。独自30テストで徹底比較。",
  },
  alternates: {
    canonical: "https://pickai.jp",
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
