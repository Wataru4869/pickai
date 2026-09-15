import type { Metadata } from "next";
import Script from "next/script";
import { Sidebar } from "@/components/Sidebar";
import AnalyticsListener from "@/components/AnalyticsListener";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aierabi.jp"),
  title: {
    default: "AIツール比較・選び方｜公式情報と用途で探す | AI選び",
    template: "%s",
  },
  description:
    "AIツールを用途・機能・料金・提供条件から比較。公式情報の出典と確認日を示し、過去の独自評価とは分けて選び方を整理します。",
  verification: {
    google: "58h4q6izcFdGa4utc7jGfjUHUxLAD_Yt5tJ7Z2G2_ls",
  },
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
    title: "AI選び｜AIツールを用途と公式情報で比較",
    description:
      "AIツールを用途・機能・料金・提供条件から比較。公式情報の出典と確認日を示します。",
    url: "https://www.aierabi.jp",
    siteName: "AI選び",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "AI選び｜AIツールを用途と公式情報で比較",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI選び｜AIツールを用途と公式情報で比較",
    description:
      "AIツールを用途・機能・料金・提供条件から比較。公式情報の出典と確認日を示します。",
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
  const enableProductionAnalytics = process.env.VERCEL_ENV === "production";

  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <AnalyticsListener />
        {enableProductionAnalytics && (
          <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-R6WQKPGF2X" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-R6WQKPGF2X');
              `}
            </Script>
          </>
        )}
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
