import { Header, Footer, Block, SectionHeader } from "@/components/ui";
import { CostCalculatorFlow } from "@/components/CostCalculatorFlow";
import { getModels, scoreColorHex } from "@/lib/data";

export const metadata = {
  title: "AI料金比較・コスト計算機【2026年最新】| AI選び",
  description: "3つの質問に答えるだけで最適なAIプランを提案。ChatGPT/Claude/Gemini/Grok/Perplexityの料金を円建てで比較。",
  alternates: { canonical: "/cost" },
  openGraph: {
    title: "AI料金比較・コスト計算機【2026年最新】| AI選び",
    description: "3つの質問に答えるだけで最適なAIプランを提案。ChatGPT/Claude/Gemini/Grok/Perplexityの料金を円建てで比較。",
    url: "/cost",
  },
};

export default function CostPage() {
  const models = getModels();

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#e5e5e5] py-4">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold mb-1">コスト計算機</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            3つの質問に答えるだけで最適プランを提案。テスト結果（30テスト）に基づくおすすめ付き。
          </p>
        </div>
      </div>

      <CostCalculatorFlow />

      {/* Full price table */}
      <Block>
        <SectionHeader title="全プラン比較" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#e5e5e5]">モデル</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">無料</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">スタンダード</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">プレミアム</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">総合点</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                  <td className="p-1.5 font-bold border-b border-[#e8e8ed]">{m.name}</td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] text-[#3d7a5f] font-semibold">
                    {m.pricing.free.available ? "✓ 無料" : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed]">
                    {m.pricing.standard.priceJPY ? (
                      <div>
                        <div className="font-bold">{m.pricing.standard.name}</div>
                        <div>¥{m.pricing.standard.priceJPY.toLocaleString()}/月</div>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed]">
                    {m.pricing.premium.priceJPY ? (
                      <div>
                        <div className="font-bold">{m.pricing.premium.name}</div>
                        <div>¥{m.pricing.premium.priceJPY.toLocaleString()}/月</div>
                      </div>
                    ) : m.pricing.premium.name || "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] font-semibold" style={{ color: scoreColorHex(m.scores.overall || 0) }}>
                    {m.scores.overall ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-[#86868b] mt-2">※ 2026年3月時点。最新価格は各公式サイトをご確認ください。</p>
      </Block>

      <Footer />
    </div>
  );
}
