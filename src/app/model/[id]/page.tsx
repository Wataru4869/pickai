import { notFound } from "next/navigation";
import {
  getAllModels,
  getTests,
  getSafetyRanking,
  getModelDetails,
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
  const title = `${model.name}の評価・料金【2026年最新】| AI選び`;
  const description = `${model.name}（${model.provider}）を独自テストで評価。文章${model.scores.writing}点・コード${model.scores.coding}点・画像${model.scores.image}点・安全性${model.scores.safety}点。`;
  return {
    title,
    description,
    alternates: { canonical: `/model/${params.id}` },
    openGraph: { title, description, url: `/model/${params.id}` },
  };
}

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const models = getAllModels();
  const model = models.find((m) => m.id === params.id);
  if (!model) notFound();

  const details = getModelDetails(params.id);
  const tests = getTests();
  const modelTests = tests.map((t: any) => ({
    ...t,
    score: t.results[model.id] ?? null,
    category: CATEGORY_LABELS[t.category as keyof typeof CATEGORY_LABELS] || t.category,
  }));

  const safetyRanking = getSafetyRanking();
  const safetyRank = safetyRanking.findIndex((r: any) => r.model === model.id) + 1;

  const rankedModels = models
    .filter((m) => m.scores.overall !== null)
    .sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0));
  const overallRank = rankedModels.findIndex((m) => m.id === model.id) + 1;
  const others = models.filter((m) => m.id !== model.id && m.scores.overall !== null);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      {/* Model Header */}
      <div className="border-b border-[#e8e8ed] py-6 bg-white">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="text-[11px] text-[#86868b] mb-2">
            <a href="/" className="text-[#0066cc] hover:underline no-underline">トップ</a>
            {" ＞ "}
            <span>モデル</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-[12px] font-bold text-white ${
              overallRank === 1 ? "bg-[#a0820a]" : overallRank === 2 ? "bg-[#86868b]" : overallRank === 3 ? "bg-[#8b6c4f]" : "bg-[#d2d2d7]"
            }`}>
              {overallRank}
            </span>
            <span className="text-[11px] text-[#86868b]">総合（全16テスト）</span>
          </div>
          <div className="flex items-baseline gap-2.5 mb-1.5">
            <h1 className="text-[26px] font-bold text-[#1d1d1f]">{model.name}</h1>
            <span className="text-[32px] font-bold text-[#1d1d1f]">
              {model.scores.overall ?? "—"}
            </span>
            <span className="text-[12px] text-[#86868b]">/ 100</span>
          </div>
          <p className="text-[12px] text-[#6e6e73]">{model.descriptionJapanese}</p>
          <p className="text-[11px] text-[#86868b] mt-1 mb-3.5">提供: {model.provider}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(() => {
              const modelsAll = models.filter((mm) => mm.scores.overall !== null);
              const wBest = [...modelsAll].sort((a, b) => (b.scores.writing || 0) - (a.scores.writing || 0))[0];
              const cBest = [...modelsAll].sort((a, b) => (b.scores.coding || 0) - (a.scores.coding || 0))[0];
              const iBest = [...modelsAll].sort((a, b) => (b.scores.image || 0) - (a.scores.image || 0))[0];
              const sBest = [...modelsAll].sort((a, b) => (b.scores.safety || 0) - (a.scores.safety || 0))[0];
              const cats = [
                { label: "文章", score: model.scores.writing, isBest: model.id === wBest.id },
                { label: "コード", score: model.scores.coding, isBest: model.id === cBest.id },
                { label: "画像", score: model.scores.image, isBest: model.id === iBest.id },
                { label: "安全性", score: model.scores.safety, isBest: model.id === sBest.id },
              ];
              return cats.map((c) => (
                <div key={c.label} className="border border-[#e8e8ed] rounded p-2 text-center">
                  <div className="text-[10px] text-[#86868b] mb-0.5">{c.label}</div>
                  <div className="text-[18px] font-bold text-[#1d1d1f] leading-tight">
                    {c.score ?? "—"}
                  </div>
                  {c.isBest && <div className="text-[9px] text-[#86868b] mt-0.5">1位</div>}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Overview */}
      {details && (
        <Block>
          <SectionHeader title="概要" />
          <p className="text-[13px] text-[#1d1d1f] leading-relaxed">{details.overview}</p>
          {details.lastVerified && (
            <p className="text-[10px] text-[#86868b] mt-2">最終確認日: {details.lastVerified}</p>
          )}
        </Block>
      )}

      {/* Current Models */}
      {details?.currentModels && (
        <Block alt>
          <SectionHeader title="利用可能なモデル" />
          <div className="overflow-x-auto">
            <table className="w-full text-[12px] border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-[#fafafa]">
                  <th className="p-2 text-left font-semibold border-b-2 border-[#e5e5e5]">モデル名</th>
                  <th className="p-2 text-left font-semibold border-b-2 border-[#e5e5e5]">利用可能プラン</th>
                  <th className="p-2 text-left font-semibold border-b-2 border-[#e5e5e5]">特徴</th>
                </tr>
              </thead>
              <tbody>
                {details.currentModels.map((cm: any, i: number) => {
                  const isDeprecated = cm.description?.includes("廃止") || cm.description?.includes("前世代");
                  return (
                    <tr key={i} className={`${isDeprecated ? "text-[#86868b]" : ""} ${i % 2 === 1 ? "bg-[#f9f9fb]" : ""}`}>
                      <td className="p-2 border-b border-[#f0f0f0] font-semibold">
                        {cm.name}
                        {cm.releaseDate && <span className="text-[10px] text-[#86868b] ml-1">({cm.releaseDate})</span>}
                      </td>
                      <td className="p-2 border-b border-[#f0f0f0] text-[11px]">{cm.availability}</td>
                      <td className="p-2 border-b border-[#f0f0f0] text-[11px] text-[#6e6e73]">{cm.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Block>
      )}

      {/* Strengths / Weaknesses (from details) */}
      {details && (
        <Block>
          <SectionHeader title="強み・弱み" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] font-bold text-[#1d1d1f] mb-2 pl-2 border-l-2 border-[#3d7a5f] uppercase tracking-wider">強み</div>
              <div>
                {details.strengths.map((s: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#1d1d1f] py-1.5 border-b border-[#f0f0f0] last:border-b-0 leading-relaxed">{s}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#1d1d1f] mb-2 pl-2 border-l-2 border-[#a05454] uppercase tracking-wider">弱み</div>
              <div>
                {details.weaknesses.map((w: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#1d1d1f] py-1.5 border-b border-[#f0f0f0] last:border-b-0 leading-relaxed">{w}</div>
                ))}
              </div>
            </div>
          </div>
        </Block>
      )}

      {/* Best For / Not Recommended */}
      {details && (
        <Block alt>
          <SectionHeader title="おすすめ用途" />
          <div className="mb-4">
            {details.bestFor.map((b: string, i: number) => (
              <div key={i} className="text-[12px] text-[#1d1d1f] py-1.5 border-b border-[#f0f0f0] last:border-b-0 leading-relaxed pl-2 border-l-2 border-[#0066cc]">{b}</div>
            ))}
          </div>
          {details.notRecommendedFor && (
            <>
              <div className="text-[11px] font-bold text-[#86868b] mb-2 uppercase tracking-wider">不向きな用途</div>
              <div>
                {details.notRecommendedFor.map((n: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#6e6e73] py-1.5 border-b border-[#f0f0f0] last:border-b-0 leading-relaxed pl-2 border-l-2 border-[#d2d2d7]">{n}</div>
                ))}
              </div>
            </>
          )}
        </Block>
      )}

      {/* Unique Features */}
      {details?.uniqueFeatures && (
        <Block>
          <SectionHeader title="独自機能" />
          <div className="space-y-1.5">
            {details.uniqueFeatures.map((f: string, i: number) => (
              <div key={i} className="text-[12px] text-[#1d1d1f] py-1.5 border-t border-[#f0f0f0] first:border-t-0">{f}</div>
            ))}
          </div>
        </Block>
      )}

      {/* All Test Scores */}
      <Block alt>
        <SectionHeader title="全16テスト詳細" />
        <ModelScoreChart tests={modelTests} />
      </Block>

      {/* Pricing (from details) */}
      {details?.pricing ? (
        <Block>
          <SectionHeader title="料金プラン" />
          <div className="text-[12px] text-[#6e6e73] mb-3 p-2.5 bg-[#fafafa] rounded">
            <span className="font-semibold text-[#1d1d1f]">無料枠: </span>{details.pricing.free}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.pricing.plans.map((p: any, i: number) => (
              <div key={i} className="border border-[#f0f0f0] rounded p-3">
                <div className="text-[13px] font-semibold text-[#1d1d1f] mb-1">{p.name}</div>
                <div className="text-[18px] font-bold text-[#4a7ab5]">{p.priceJPY || p.priceUSD}</div>
                {p.priceJPY && p.priceUSD && (
                  <div className="text-[10px] text-[#86868b]">{p.priceUSD}</div>
                )}
                <div className="text-[11px] text-[#6e6e73] mt-2 leading-relaxed">{p.features}</div>
              </div>
            ))}
          </div>
        </Block>
      ) : (
        <Block>
          <SectionHeader title="料金プラン" />
          <div className="flex gap-2">
            {["free", "standard", "premium"].map((tier) => {
              const p = (model.pricing as any)[tier];
              if (!p?.available) return null;
              return (
                <div key={tier} className="flex-1 border border-[#e5e5e5] rounded p-3">
                  <div className="text-[11px] font-bold text-[#86868b] mb-1">{p.name || (tier === "free" ? "無料" : tier)}</div>
                  <div className="text-[18px] font-bold text-[#4a7ab5]">{p.priceJPY ? `¥${p.priceJPY.toLocaleString()}` : "¥0"}</div>
                  <div className="text-[10px] text-[#86868b]">/月</div>
                </div>
              );
            })}
          </div>
        </Block>
      )}

      {/* Security & Data Policy */}
      {details && (
        <Block alt>
          <SectionHeader title="セキュリティ・データポリシー" />
          {details.securityCertifications && (
            <div className="mb-3">
              <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5">セキュリティ認証</div>
              <div className="flex flex-wrap gap-1.5">
                {details.securityCertifications.map((c: string, i: number) => (
                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#fafafa] text-[#6e6e73] border border-[#f0f0f0] text-[10px] font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {details.dataPolicy && (
            <div>
              <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5">データ利用ポリシー</div>
              <p className="text-[12px] text-[#6e6e73] leading-relaxed">{details.dataPolicy}</p>
            </div>
          )}
        </Block>
      )}

      {/* Verdict */}
      {details?.verdict && (
        <Block>
          <SectionHeader title="AI選びの総評" />
          <div className="bg-[#fafafa] border border-[#e5e5e5] rounded p-4">
            <p className="text-[13px] text-[#333333] leading-relaxed font-medium">{details.verdict}</p>
          </div>
        </Block>
      )}

      {/* Compare with others */}
      <Block alt>
        <SectionHeader title="他モデルとの比較" />
        {others.map((other) => {
          const diff = ((model.scores.overall || 0) - (other.scores.overall || 0)).toFixed(1);
          const diffNum = parseFloat(diff);
          return (
            <a
              key={other.id}
              href={`/compare/${model.id}-vs-${other.id}`}
              className="flex items-center justify-between py-2.5 border-t border-[#f0f0f0] first:border-t-0 hover:bg-[#fafafa] no-underline text-inherit cursor-pointer transition-colors"
            >
              <span className="text-[13px] font-semibold">{model.name} vs {other.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold" style={{ color: diffNum > 0 ? "#3d7a5f" : diffNum < 0 ? "#a05454" : "#999" }}>
                  {diffNum > 0 ? "+" : ""}{diff}
                </span>
                <span className="text-[11px] text-[#4a7ab5]">比較 ＞</span>
              </div>
            </a>
          );
        })}
      </Block>

      {/* Sources */}
      {details?.sources && (
        <Block>
          <SectionHeader title="出典" />
          <div className="space-y-1">
            {details.sources.map((s: string, i: number) => (
              <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-[#4a7ab5] hover:underline no-underline truncate">
                {s}
              </a>
            ))}
          </div>
        </Block>
      )}

      {/* Share */}
      <Block alt>
        <div className="flex items-center justify-between border border-[#e5e5e5] rounded p-3 bg-white">
          <div>
            <div className="text-[12px] font-bold">シェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「{model.name}の評価：総合{model.scores.overall}点 #AI選び」
            </div>
          </div>
          <ShareButton
            text={`${model.name}の評価：総合${model.scores.overall}点、コード${model.scores.coding}点、安全性${model.scores.safety}点 #AI選び https://aierabi.jp/model/${model.id}`}
          />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
