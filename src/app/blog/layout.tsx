import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ記事一覧 | AI選び",
  description: "AIツールの比較・使い方・選び方に関する記事一覧。公式情報の確認範囲と過去記録を分けて掲載します。",
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
