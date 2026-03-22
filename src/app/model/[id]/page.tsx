import { notFound } from "next/navigation";
import {
  getAllModels,
  getTests,
  getSafetyRanking,
  scoreColorHex,
  CATEGORY_LABELS,
} from "@/lib/data";
import { Header, Footer, Block, SectionHeader, RankBadge, ShareButton } from "@/components/ui";
import { ModelScoreChart } from "@/components/ModelScoreChart";

export function generateStaticParams() {
  const models = getAllModels();
  return models.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const models = getAllModels();
  const model = models.find((m) => m.id === params.id);
  if (!model) return {};
  return {
    title: `${model.name}の評価・スコア｜Pick AI`,
    description: `${model.name}（${model.provider}）の独自30テスト評価結果。文章${model.scores.writing}点・コード${model.scores.coding}点・画像${model.scores.image}点・安全性${model.scores.safety}点。`,
  };
}

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const models = getAllModels();
  const model = models.find((m) => m.id === params.id);
  if (!model) notFound();

  const tests = getTests();
  const modelTests = tests.map((t: any) => ({
    ...t,
    score: t.results[model.id] ?? null,
    category: CATEGORY_LABELS[t.category as keyof typeof CATEGORY_LABELS] || t.category,
  }));

  const safetyRanking = getSafetyRanking();
  const safetyRank = safetyRanking.findIndex((r: any) => r.model === model.id) + 1;

  // Overall rank
  const rankedModels = models
    .filter((m) => m.scores.overall !== null)
    .sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0));
  const overallRank = rankedModels.findIndex((m) => m.id === model.id) + 1;

  const others = models.filter((m) => m.id !== model.id && m.scores.overall !== null);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      {/* Model Header */}
      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            {overallRank > 0 && <RankBadge rank={overallRank} />}
            <span className="text-[11px] text-[#86868b]">総合（全16テスト）</span>
          </div>
          <div className="flex items-baseline gap-3 mb-1.5">
            <h1 className="text-[24px] font-bold">{model.name}</h1>
            <span
              className="text-[28px] font-bold"
              style={{ color: scoreColorHex(model.scores.overall || 0) }}
            >
              {model.scores.overall ?? "—"}
            </span>
            <span className="text-[12px] text-[#86868b]">/ 100</span>
          </div>
          <p className="text-[12px] text-[#6e6e73]">{model.descriptionJapanese}</p>
          <p className="text-[11px] text-[#86868b] mt-1.5">
            提供: {model.provider}
          </p>

          {/* Category scores */}
          <div className="flex gap-2 mt-3">
            {[
              { label: "文章", score: model.scores.writing },
              { label: "コード", score: model.scores.coding },
              { label: "画像", score: model.scores.image },
              { label: "安全性", score: model.scores.safety },
            ].map((c) => (
              <div
                key={c.label}
                className="flex-1 text-center border border-[#e8e8ed] rounded p-1.5"
              >
                <div className="text-[10px] text-[#86868b]">{c.label}</div>
                <div
                  className="text-[16px] font-bold"
                  style={{ color: c.score ? scoreColorHex(c.score) : "#999" }}
                >
                  {c.score ?? "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <Block>
        <div className="flex gap-2">
          <div className="flex-1 border border-[#d2d2d7] rounded p-3">
            <div className="text-[12px] font-semibold text-green-700 mb-1.5">
              ✓ 強み
            </div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">
              {model.strengths.map((s: string, i: number) => (
                <div key={i} className="py-0.5">
                  ・{s}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 border border-[#d2d2d7] rounded p-3">
            <div className="text-[12px] font-semibold text-red-600 mb-1.5">
              ✗ 弱み
            </div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">
              {model.weaknesses.map((w: string, i: number) => (
                <div key={i} className="py-0.5">
                  ・{w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* All Test Scores */}
      <Block>
        <SectionHeader title="全16テスト詳細" />
        <ModelScoreChart tests={modelTests} />
      </Block>

      {/* Pricing */}
      <Block>
        <SectionHeader title="料金プラン" />
        <div className="flex gap-2">
          {["free", "standard", "premium"].map((tier) => {
            const p = (model.pricing as any)[tier];
            if (!p?.available) return null;
            return (
              <div
                key={tier}
                className="flex-1 border border-[#d2d2d7] rounded p-3"
              >
                <div className="text-[11px] font-bold text-[#86868b] mb-1">
                  {p.name || (tier === "free" ? "無料" : tier)}
                </div>
                <div className="text-[18px] font-bold text-[#0066cc]">
                  {p.priceJPY ? `¥${p.priceJPY.toLocaleString()}` : "¥0"}
                </div>
                <div className="text-[10px] text-[#86868b]">/月</div>
              </div>
            );
          })}
        </div>
      </Block>

      {/* Compare with others */}
      <Block>
        <SectionHeader title="他モデルとの比較" />
        {others.map((other, i) => {
          const diff = ((model.scores.overall || 0) - (other.scores.overall || 0)).toFixed(1);
          const diffNum = parseFloat(diff);
          return (
            <a
              key={other.id}
              href={`/compare/${model.id}-vs-${other.id}`}
              className="flex items-center justify-between py-2.5 border-t border-[#e8e8ed] first:border-t-0 hover:bg-[#f5f5f7] no-underline text-inherit cursor-pointer"
            >
              <span className="text-[13px] font-semibold">
                {model.name} vs {other.name}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="text-[12px] font-bold"
                  style={{ color: diffNum > 0 ? "#1a854a" : diffNum < 0 ? "#cc3333" : "#999" }}
                >
                  {diffNum > 0 ? "+" : ""}
                  {diff}
                </span>
                <span className="text-[11px] text-[#0066cc]">比較 ＞</span>
              </div>
            </a>
          );
        })}
      </Block>

      {/* Share */}
      <Block>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded p-3">
          <div>
            <div className="text-[12px] font-bold">シェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「{model.name}の評価：総合{model.scores.overall}点 #PickAI」
            </div>
          </div>
          <ShareButton
            text={`${model.name}の評価：総合${model.scores.overall}点、コード${model.scores.coding}点、安全性${model.scores.safety}点 #PickAI https://ai-imanani.vercel.app/model/${model.id}`}
          />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
