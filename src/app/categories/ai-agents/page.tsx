import { CategoryToolPage } from "@/components/CategoryToolPage";
import { Block } from "@/components/ui";
import data from "@/data/category_ai_agents.json";

export const metadata = {
  title: "AIエージェント5サービスの保存済み比較（2026年3月時点）| AI選び",
  description: "AIエージェント5サービスの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
  alternates: { canonical: "/categories/ai-agents" },
  openGraph: {
    title: "AIエージェント5サービスの保存済み比較（2026年3月時点）| AI選び",
    description: "AIエージェント5サービスの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
    url: "/categories/ai-agents",
  },
};

const relatedArticles = [
  {
    href: "/blog/openclaw-guide-2026",
    title: "OpenClawとは？2026年最注目の自律型AIエージェントを日本語で徹底解説",
  },
  {
    href: "/blog/ai-agents-comparison-2026",
    title: "2026年の自律型AIエージェント比較｜OpenClaw・Devin・Claude Code・Operator",
  },
];

export default function AIAgentsPage() {
  return (
    <CategoryToolPage
      data={data as any}
      relatedArticles={relatedArticles}
      relatedNote="OpenClawは上記ランキングのサービス型エージェントとは異なり、オープンソースのエージェントフレームワークです。詳細はコラムで解説しています。"
    />
  );
}
