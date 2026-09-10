import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "用途に合うAI候補診断 | AI選び",
  description: "3つの質問からAI候補を絞ります。現在の性能や料金を保証する診断ではありません。",
  alternates: { canonical: "/recommend" },
  openGraph: {
    title: "用途に合うAI候補診断 | AI選び",
    description: "3つの質問からAI候補を絞ります。現在の性能や料金を保証する診断ではありません。",
    url: "/recommend",
  },
};

export default function RecommendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
