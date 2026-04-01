import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あなたにおすすめのAI診断 | AI選び",
  description: "3つの質問に答えるだけで、あなたに最適なAIツールを提案します。",
  alternates: { canonical: "/recommend" },
  openGraph: {
    title: "あなたにおすすめのAI診断 | AI選び",
    description: "3つの質問に答えるだけで、あなたに最適なAIツールを提案します。",
    url: "/recommend",
  },
};

export default function RecommendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
