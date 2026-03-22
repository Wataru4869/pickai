import { notFound } from "next/navigation";
import {
  getCategories,
  getCategoryById,
  getModels,
  scoreColorHex,
  MODEL_COLORS,
} from "@/lib/data";
import { Header, Footer, Block, SectionHeader, TrustBadges, ShareButton } from "@/components/ui";

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const cat = getCategoryById(params.id);
  if (!cat) return {};
  return {
    title: `${cat.nameJapanese}AI比較｜外部ベンチマーク＋独自テスト｜Pick AI`,
    description: cat.description,
  };
}

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const cat = getCategoryById(params.id);
  if (!cat) notFound();

  const models = getModels();
  const MODEL_NAMES: Record<string, string> = {
    claude: "Claude", chatgpt: "ChatGPT", grok: "Grok",
    perplexity: "Perplexity", gemini: "Gemini",
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">{cat.nameJapanese}AI比較</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">{cat.description}</p>
          <TrustBadges />
        </div>
      </div>

      {/* External Benchmarks */}
      {cat.externalBenchmarks.map((bench, bi) => {
        const entries = Object.entries(bench.scores).sort(([, a], [, b]) => b - a);
        const maxScore = entries[0]?.[1] || 100;

        return (
          <Block key={bi}>
            <SectionHeader title={bench.name} />
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                bench.source.includes("独自") || bench.source.includes("Pick AI")
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-600"
              }`}>
                {bench.source.includes("独自") || bench.source.includes("Pick AI")
                  ? "独自テスト"
                  : "外部ベンチマーク"}
              </span>
              <span className="text-[10px] text-[#86868b]">
                {bench.date} 更新
              </span>
              {bench.sourceUrl && (
                <a
                  href={bench.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#0066cc] hover:underline"
                >
                  出典 →
                </a>
              )}
            </div>

            <p className="text-[11px] text-[#6e6e73] mb-3">{bench.note}</p>

            {/* Bar chart */}
            <div className="space-y-1.5">
              {entries.map(([name, score], i) => {
                const width = Math.max((score / maxScore) * 100, 5);
                return (
                  <div key={name} className="flex items-center gap-2">
                    <div className="w-[100px] text-[11px] text-[#6e6e73] text-right shrink-0 truncate font-medium">
                      {name}
                    </div>
                    <div className="flex-1 h-6 bg-[#f5f5f7] rounded-sm relative overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all duration-300"
                        style={{
                          width: `${width}%`,
                          backgroundColor:
                            i === 0 ? "#c8860a" : i === 1 ? "#1a854a" : i === 2 ? "#1a6dcc" : "#999",
                        }}
                      />
                      <span
                        className="absolute right-2 top-0 h-full flex items-center text-[11px] font-bold"
                        style={{ color: width > 50 ? "white" : "#333" }}
                      >
                        {score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-[#86868b] mt-1.5">
              指標: {bench.metric}
            </div>
          </Block>
        );
      })}

      {/* Chat AI Support */}
      <Block>
        <SectionHeader title={`チャットAIの${cat.nameJapanese}対応状況`} />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#f5f5f7]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">モデル</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">対応</th>
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">備考</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cat.chatAISupport).map(([modelId, info], i) => (
                <tr key={modelId} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                  <td className="p-1.5 font-semibold border-b border-[#e8e8ed]">
                    <a
                      href={`/model/${modelId}`}
                      className="hover:underline"
                      style={{ color: MODEL_COLORS[modelId] || "#333" }}
                    >
                      {MODEL_NAMES[modelId] || modelId}
                    </a>
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] text-[14px]">
                    {info.supported ? <span className="text-green-700 font-bold">○</span> : <span className="text-[#86868b]">—</span>}
                  </td>
                  <td className="p-1.5 text-[#6e6e73] border-b border-[#e8e8ed] text-[11px]">
                    {info.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      {/* Recommendation */}
      <Block>
        <SectionHeader title="おすすめ" />
        <div className="border-2 border-[#1d1d1f] rounded p-3 bg-[#f5f5f7]">
          <div className="text-[12px] text-gray-700 leading-relaxed">
            {cat.recommendation}
          </div>
        </div>
      </Block>

      {/* Other categories */}
      <Block>
        <SectionHeader title="他のカテゴリ" />
        <div className="flex flex-wrap gap-1.5">
          {getCategories()
            .filter((c) => c.id !== cat.id)
            .map((c) => (
              <a
                key={c.id}
                href={`/category/${c.id}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded border border-[#d2d2d7] text-[11px] text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] no-underline transition-colors"
              >
                <span>{c.nameJapanese}</span>
              </a>
            ))}
        </div>
      </Block>

      {/* Share */}
      <Block>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded p-3">
          <div>
            <div className="text-[12px] font-bold">シェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「{cat.nameJapanese}AI比較 #PickAI」
            </div>
          </div>
          <ShareButton
            text={`${cat.nameJapanese}AI比較 - 外部ベンチマーク＋独自テストで徹底比較 #PickAI https://pickai.jp/category/${cat.id}`}
          />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
