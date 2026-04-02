import { CategoryToolPage } from "@/components/CategoryToolPage";
import { Block } from "@/components/ui";
import data from "@/data/category_ai_agents.json";

export const metadata = {
  title: "AIエージェント おすすめ5選比較【2026年最新】| AI選び",
  description: "Manus・Genspark Claw・Devin・Claude Computer Use・OpenAI Operatorを5軸で比較。",
  alternates: { canonical: "/categories/ai-agents" },
  openGraph: {
    title: "AIエージェント おすすめ5選比較【2026年最新】| AI選び",
    description: "Manus・Genspark Claw・Devin・Claude Computer Use・OpenAI Operatorを5軸で比較。",
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
