import type { Metadata } from "next";
import Script from "next/script";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "【2026年最新】AIツール比較おすすめランキング | AI選び",
  description:
    "ChatGPT・Claude・Gemini・Grok・Perplexityを独自30テストで徹底比較。文章生成・コーディング・画像生成・安全性を5軸で採点。用途別おすすめAIが見つかります。",
  openGraph: {
    title: "【2026年最新】AIツール比較おすすめランキング | AI選び",
    description: "6カテゴリ38ツールを網羅。独自30テストで徹底比較。",
    url: "https://aierabi.jp",
    siteName: "AI選び",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "【2026年最新】AIツール比較おすすめランキング | AI選び",
    description: "6カテゴリ38ツールを網羅。独自30テストで徹底比較。",
  },
  alternates: {
    canonical: "https://aierabi.jp",
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
