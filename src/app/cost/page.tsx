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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white border-b border-[#e8e8ed] py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold mb-1">コスト計算機</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            3つの質問に答えるだけで最適プランを提案。テスト結果（30テスト）に基づくおすすめ付き。
          </p>
        </div>
      </div>

      <CostCalculatorFlow />

      {/* Full price table */}
      <Block alt>
        <SectionHeader title="全プラン比較" />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px] min-w-[480px]">
            <thead>
              <tr>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">モデル</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">無料</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">スタンダード</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">プレミアム</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">総合</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id}>
                  <td className="p-2 border-b border-[#f0f0f0]">
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">{m.name}</span>
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center">
                    {m.pricing.free.available
                      ? <span className="text-[13px] font-semibold text-[#3d7a5f]">◯ 無料</span>
                      : <span className="text-[13px] text-[#86868b]">—</span>}
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center text-[12px] text-[#1d1d1f]">
                    {m.pricing.standard.priceJPY ? (
                      <div>
                        <div className="font-semibold">{m.pricing.standard.name}</div>
                        <div className="text-[11px] text-[#6e6e73]">¥{m.pricing.standard.priceJPY.toLocaleString()}/月</div>
                      </div>
                    ) : <span className="text-[#86868b]">—</span>}
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center text-[12px] text-[#1d1d1f]">
                    {m.pricing.premium.priceJPY ? (
                      <div>
                        <div className="font-semibold">{m.pricing.premium.name}</div>
                        <div className="text-[11px] text-[#6e6e73]">¥{m.pricing.premium.priceJPY.toLocaleString()}/月</div>
                      </div>
                    ) : m.pricing.premium.name ? <span className="text-[12px]">{m.pricing.premium.name}</span> : <span className="text-[#86868b]">—</span>}
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center text-[14px] font-bold text-[#1d1d1f]">
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
