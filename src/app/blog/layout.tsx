import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ記事一覧 | AI選び",
  description: "AIツールの比較・使い方・選び方に関する記事一覧。ChatGPT・Claude・Gemini・Grokの最新情報をお届けします。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "ブログ記事一覧 | AI選び",
    description: "AIツールの比較・使い方・選び方に関する記事一覧。",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
