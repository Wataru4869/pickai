import {
  getModels,
  getTests,
  getOverallRanking,
  getCategorySummary,
  getSafetyRanking,
  CATEGORY_LABELS,
  scoreColorHex,
} from "@/lib/data";
import {
  Header,
  Footer,
  Block,
  SectionHeader,
  RankBadge,
  ScoreDisplay,
  CategoryScoreBar,
  TrustBadges,
  ShareButton,
} from "@/components/ui";
import { CategoryTabs } from "@/components/CategoryTabs";
import { UseCaseRecommendations } from "@/components/UseCaseRecommendations";

export default function HomePage() {
  const models = getModels();
  const ranking = getOverallRanking();
  const catSummary = getCategorySummary() as Record<string, any>;
  const safetyRanking = getSafetyRanking();

  // Build ranking with model details
  const rankedModels = ranking.map((r: any, i: number) => {
    const model = models.find((m) => m.id === r.model);
    return { ...r, ...model, rank: i + 1 };
  });

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      {/* Hero */}
      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            ChatGPT・Claude・Gemini・Grok・Perplexityを独自30テスト（文章8＋コード4＋画像4＋安全性14）で徹底比較。
            用途別のおすすめを提案します。
          </p>
          <TrustBadges />
        </div>
      </div>

      {/* Overall Ranking */}
      <Block>
        <SectionHeader title="総合ランキング（全16テスト）" />
        <div className="space-y-0">
          {rankedModels.map((m: any, i: number) => (
            <a
              key={m.id}
              href={`/model/${m.id}`}
              className="flex items-center gap-3 py-3 border-t border-[#e8e8ed] first:border-t-0 hover:bg-[#f5f5f7] transition-colors cursor-pointer no-underline text-inherit"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                style={{
                  backgroundColor:
                    i === 0 ? "#a0820a" : i === 1 ? "#888" : i === 2 ? "#b87333" : "#DDD",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] font-semibold">{m.name}</span>
                  <span className="text-[11px] text-[#86868b]">{m.provider}</span>
                </div>
                <div className="flex gap-3 mt-1 text-[11px] text-[#86868b]">
                  <span>
                    文{" "}
                    <strong style={{ color: scoreColorHex(m.scores?.writing || 0) }}>
                      {m.scores?.writing}
                    </strong>
                  </span>
                  <span>
                    コ{" "}
                    <strong style={{ color: scoreColorHex(m.scores?.coding || 0) }}>
                      {m.scores?.coding}
                    </strong>
                  </span>
                  <span>
                    画{" "}
                    <strong style={{ color: scoreColorHex(m.scores?.image || 0) }}>
                      {m.scores?.image}
                    </strong>
                  </span>
                  <span>
                    安{" "}
                    <strong style={{ color: scoreColorHex(m.scores?.safety || 0) }}>
                      {m.scores?.safety}
                    </strong>
                  </span>
                </div>
              </div>
              <ScoreDisplay score={m.score} size="lg" />
              <span className="text-[11px] text-gray-300 ml-1">＞</span>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[#86868b] mt-2">
          ※ 総合スコア = 全16テスト（文章8＋コード4＋画像4）の平均点。安全性は別軸で評価。
        </p>
      </Block>

      {/* Category Tabs */}
      <Block>
        <SectionHeader title="カテゴリ別ランキング" />
        <CategoryTabs />
      </Block>

      {/* Use Case Recommendations */}
      <Block>
        <SectionHeader title="用途別おすすめ" />
        <UseCaseRecommendations />
      </Block>

      {/* Category Links */}
      <Block>
        <SectionHeader title="カテゴリ別AI比較" />
        <p className="text-[11px] text-[#86868b] mb-3">
          汎用AI以外の専門ツールも網羅。外部レビュー・ベンチマーク基準。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { href: "/categories/image-generation", icon: "🖼️", label: "画像生成", count: 7 },
            { href: "/categories/video-generation", icon: "🎬", label: "動画生成", count: 7 },
            { href: "/categories/coding-tools", icon: "💻", label: "コーディング", count: 7 },
            { href: "/categories/ai-agents", icon: "🤖", label: "AIエージェント", count: 5 },
            { href: "/categories/ai-search", icon: "🔍", label: "AI検索", count: 5 },
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="flex items-center gap-2 p-3 border border-[#e8e8ed] rounded-lg hover:bg-[#f5f5f7] transition-colors no-underline text-inherit"
            >
              <span className="text-[18px]">{cat.icon}</span>
              <div>
                <div className="text-[12px] font-semibold text-[#1d1d1f]">{cat.label}</div>
                <div className="text-[10px] text-[#86868b]">{cat.count}ツール</div>
              </div>
            </a>
          ))}
        </div>
      </Block>

      {/* Safety Summary */}
      <Block>
        <SectionHeader title="安全性ランキング" />
        <p className="text-[11px] text-[#6e6e73] mb-3">
          14テスト（ハルシネーション・著作権・プライバシー等）＋セキュリティ認証の加重スコア
        </p>
        {safetyRanking.map((r: any, i: number) => {
          const model = models.find((m) => m.id === r.model);
          return (
            <div
              key={r.model}
              className="flex items-center justify-between py-2 border-t border-[#e8e8ed] first:border-t-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#86868b] w-5">
                  {i + 1}
                </span>
                <span className="text-[13px] font-bold">{model?.name}</span>
              </div>
              <span
                className="text-[15px] font-bold"
                style={{ color: scoreColorHex(r.score) }}
              >
                {r.score}
              </span>
            </div>
          );
        })}
        <a
          href="/safety"
          className="block text-center text-[11px] text-[#0066cc] mt-3 hover:underline"
        >
          安全性の詳細比較を見る →
        </a>
      </Block>

      {/* Quick Price Comparison */}
      <Block>
        <SectionHeader title="料金比較" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#f5f5f7]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">
                  モデル
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  無料
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  スタンダード
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  総合点
                </th>
              </tr>
            </thead>
            <tbody className="table-striped">
              {rankedModels.map((m: any) => (
                <tr key={m.id}>
                  <td className="p-1.5 font-semibold border-b border-[#e8e8ed]">
                    {m.name}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] text-green-700 font-semibold">
                    {m.pricing?.free?.available ? "✓" : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed]">
                    {m.pricing?.standard?.priceJPY
                      ? `¥${m.pricing.standard.priceJPY.toLocaleString()}/月`
                      : "—"}
                  </td>
                  <td
                    className="p-1.5 text-center border-b border-[#e8e8ed] font-semibold"
                    style={{ color: scoreColorHex(m.score) }}
                  >
                    {m.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href="/cost"
          className="block text-center text-[11px] text-[#0066cc] mt-3 hover:underline"
        >
          コスト計算機で最適プランを見つける →
        </a>
      </Block>

      {/* Share */}
      <Block>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded p-3">
          <div>
            <div className="text-[12px] font-bold">この比較結果をシェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「2026年AI比較：総合1位ChatGPT、コード最強Claude、安全性もClaude #PickAI」
            </div>
          </div>
          <ShareButton text="2026年AI比較：総合1位ChatGPT（86.5）コード最強Claude（94.3）安全性もClaude（93.7）#PickAI https://ai-imanani.vercel.app" />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
