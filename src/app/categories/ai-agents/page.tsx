import { CategoryToolPage } from "@/components/CategoryToolPage";
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

export default function AIAgentsPage() {
  return (
    <>
      <CategoryToolPage data={data as any} />
      <div className="mt-8 pt-4 border-t border-[#e5e5e5]">
        <p className="text-[13px] text-[#333333] font-semibold mb-2">関連コラム</p>
        <div className="space-y-2">
          <a href="/blog/openclaw-guide-2026" className="block text-[13px] text-[#4a7ab5] no-underline hover:underline">
            OpenClawとは？2026年最注目の自律型AIエージェントを日本語で徹底解説
          </a>
          <a href="/blog/ai-agents-comparison-2026" className="block text-[13px] text-[#4a7ab5] no-underline hover:underline">
            2026年の自律型AIエージェント比較｜OpenClaw・Devin・Claude Code・Operator
          </a>
        </div>
        <p className="text-[11px] text-[#999999] mt-2">
          OpenClawは上記ランキングのサービス型エージェントとは異なり、オープンソースのエージェントフレームワークです。詳細はコラムで解説しています。
        </p>
      </div>
    </>
  );
}
