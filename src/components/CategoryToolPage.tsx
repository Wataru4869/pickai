"use client";

import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { scoreColorHex } from "@/lib/data";

type Tool = {
  id: string;
  name: string;
  provider: string;
  descriptionJapanese?: string;
  url: string;
  scores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  japaneseSupport: boolean;
  bestFor: string;
  pricing: any;
};

type CategoryData = {
  categoryLabel: string;
  categoryIcon: string;
  description: string;
  evaluationAxes: { key: string; label: string; maxScore: number }[];
  tools: Tool[];
  ranking: { rank: number; toolId: string; score: number }[];
  lastUpdated: string;
};

export function CategoryToolPage({ data }: { data: CategoryData }) {
  const rankedTools = data.ranking.map((r) => {
    const tool = data.tools.find((t) => t.id === r.toolId);
    return { ...r, tool };
  });

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      {/* Hero */}
      <div className="bg-white py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="text-[11px] text-[#86868b] mb-1">
            <a href="/" className="text-[#0066cc] hover:underline no-underline">トップ</a>
            {" ＞ "}
            <a href="/categories" className="text-[#0066cc] hover:underline no-underline">カテゴリ</a>
            {" ＞ "}
            <span>{data.categoryLabel}</span>
          </div>
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">
            {data.categoryLabel}
          </h1>
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            {data.description}
          </p>
          <div className="flex items-center gap-2 mt-3 text-[10px]">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed]">
              {data.tools.length}ツール比較
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed]">
              外部レビュー・ベンチマーク基準
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed]">
              {data.lastUpdated}更新
            </span>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <Block>
        <SectionHeader title="ランキング" />
        <div className="space-y-0">
          {rankedTools.map((r) => {
            if (!r.tool) return null;
            const t = r.tool;
            return (
              <div
                key={r.toolId}
                className="flex items-center gap-3 py-4 border-t border-[#e8e8ed] first:border-t-0"
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
                  style={{
                    backgroundColor:
                      r.rank === 1 ? "#a0820a" : r.rank === 2 ? "#6e6e73" : r.rank === 3 ? "#8b6c4f" : "#d2d2d7",
                  }}
                >
                  {r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] font-semibold text-[#1d1d1f]">{t.name}</span>
                    <span className="text-[11px] text-[#86868b]">{t.provider}</span>
                    {t.japaneseSupport && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#fafafa] text-[#666666] border border-[#e5e5e5]">日本語対応</span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#6e6e73] mt-0.5">
                    {t.bestFor}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="text-[24px] font-bold"
                    style={{ color: scoreColorHex(r.score) }}
                  >
                    {r.score}
                  </div>
                  <div className="text-[10px] text-[#86868b]">/ 100</div>
                </div>
              </div>
            );
          })}
        </div>
      </Block>

      {/* Evaluation Axes */}
      <Block>
        <SectionHeader title="評価軸別スコア" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="p-2 text-left font-semibold border-b border-[#e5e5e5] text-[#333333]">ツール</th>
                {data.evaluationAxes.map((axis) => (
                  <th key={axis.key} className="p-2 text-center font-semibold border-b border-[#e5e5e5] text-[#333333]">
                    {axis.label}
                  </th>
                ))}
                <th className="p-2 text-center font-semibold border-b border-[#e5e5e5] text-[#333333]">総合</th>
              </tr>
            </thead>
            <tbody>
              {rankedTools.map((r, i) => {
                if (!r.tool) return null;
                const t = r.tool;
                return (
                  <tr key={r.toolId} className={i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}>
                    <td className="p-2 border-b border-[#f0f0f0] font-medium text-[#333333]">{t.name}</td>
                    {data.evaluationAxes.map((axis) => {
                      const score = t.scores[axis.key] ?? 0;
                      const maxInAxis = Math.max(...data.tools.map((tool) => tool.scores[axis.key] ?? 0));
                      const isBest = score === maxInAxis && score > 0;
                      return (
                        <td
                          key={axis.key}
                          className="p-2 text-center border-b border-[#f0f0f0]"
                          style={{
                            fontWeight: isBest ? 600 : 400,
                            color: scoreColorHex(score * 5),
                            backgroundColor: isBest ? "#f0f5f0" : "transparent",
                          }}
                        >
                          {score}/{axis.maxScore}
                        </td>
                      );
                    })}
                    <td
                      className="p-2 text-center border-b border-[#e8e8ed] font-bold"
                      style={{ color: scoreColorHex(r.score) }}
                    >
                      {r.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Block>

      {/* Tool Details */}
      {rankedTools.map((r) => {
        if (!r.tool) return null;
        const t = r.tool;
        return (
          <Block key={r.toolId}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-semibold text-white"
                  style={{
                    backgroundColor:
                      r.rank === 1 ? "#a0820a" : r.rank === 2 ? "#6e6e73" : r.rank === 3 ? "#8b6c4f" : "#d2d2d7",
                  }}
                >
                  {r.rank}
                </span>
                <span className="text-[15px] font-semibold text-[#1d1d1f]">{t.name}</span>
                <span className="text-[11px] text-[#86868b]">{t.provider}</span>
              </div>
              <span
                className="text-[20px] font-bold"
                style={{ color: scoreColorHex(r.score) }}
              >
                {r.score}
              </span>
            </div>

            <p className="text-[12px] text-[#6e6e73] mb-3">
              {t.descriptionJapanese || t.bestFor}
            </p>

            <div className="flex gap-3 mb-3">
              <div className="flex-1 border-l-2 border-[#3d7a5f] pl-2.5 py-1">
                <div className="text-[11px] font-semibold text-[#3d7a5f] mb-1">強み</div>
                <div className="text-[11px] text-[#333333] leading-relaxed">
                  {t.strengths.map((s: string, i: number) => (
                    <div key={i} className="py-0.5">・{s}</div>
                  ))}
                </div>
              </div>
              <div className="flex-1 border-l-2 border-[#b08d57] pl-2.5 py-1">
                <div className="text-[11px] font-semibold text-[#b08d57] mb-1">弱み</div>
                <div className="text-[11px] text-[#333333] leading-relaxed">
                  {t.weaknesses.map((w: string, i: number) => (
                    <div key={i} className="py-0.5">・{w}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing summary */}
            <div className="text-[11px] text-[#6e6e73]">
              <span className="font-semibold text-[#1d1d1f]">料金: </span>
              {t.pricing?.freeTier?.available !== false && t.pricing?.freeTier ? "無料枠あり" : "有料のみ"}
              {t.pricing?.standardPlan && t.pricing.standardPlan.priceJPY > 0 &&
                ` ｜ 有料: ¥${t.pricing.standardPlan.priceJPY?.toLocaleString()}/月〜`
              }
              {t.pricing?.standardPlan && t.pricing.standardPlan.priceUSD > 0 && !t.pricing.standardPlan.priceJPY &&
                ` ｜ 有料: $${t.pricing.standardPlan.priceUSD}/月〜`
              }
            </div>

            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[11px] text-[#4a7ab5] hover:underline no-underline"
            >
              公式サイトを見る →
            </a>
          </Block>
        );
      })}

      {/* Disclaimer */}
      <Block>
        <div className="bg-[#f5f5f7] rounded p-3 text-[11px] text-[#86868b] leading-relaxed">
          ※ スコアは外部レビュー・ベンチマーク・公式情報を基にした参考値です。
          独自テストによるスコアではありません。最新の料金・機能は各公式サイトでご確認ください。
          <br />
          最終更新: {data.lastUpdated}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
