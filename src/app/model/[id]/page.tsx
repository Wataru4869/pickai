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
      <div className={`border-b border-[#d2d2d7] py-6 ${
        model.id === 'claude' ? 'bg-gradient-to-b from-[#f3f0ff] to-white' :
        model.id === 'chatgpt' ? 'bg-gradient-to-b from-[#ecf9f4] to-white' :
        model.id === 'gemini' ? 'bg-gradient-to-b from-[#eef4fc] to-white' :
        model.id === 'grok' ? 'bg-gradient-to-b from-[#eef8fc] to-white' :
        model.id === 'perplexity' ? 'bg-gradient-to-b from-[#ecfaf8] to-white' :
        'bg-white'
      }`}>
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 mb-2">
            {overallRank > 0 && <RankBadge rank={overallRank} />}
            <span className="text-[11px] text-[#86868b]">総合（全16テスト）</span>
          </div>
          <div className="flex items-baseline gap-3 mb-1.5">
            <h1 className="text-[24px] font-bold">{model.name}</h1>
            <span className="text-[28px] font-bold" style={{ color: scoreColorHex(model.scores.overall || 0) }}>
              {model.scores.overall ?? "—"}
            </span>
            <span className="text-[12px] text-[#86868b]">/ 100</span>
          </div>
          <p className="text-[12px] text-[#6e6e73]">{model.descriptionJapanese}</p>
          <p className="text-[11px] text-[#86868b] mt-1.5">提供: {model.provider}</p>

          <div className="flex gap-2 mt-3">
            {[
              { label: "文章", score: model.scores.writing },
              { label: "コード", score: model.scores.coding },
              { label: "画像", score: model.scores.image },
              { label: "安全性", score: model.scores.safety },
            ].map((c) => (
              <div key={c.label} className="flex-1 text-center border border-[#e8e8ed] rounded p-1.5">
                <div className="text-[10px] text-[#86868b]">{c.label}</div>
                <div className="text-[16px] font-bold" style={{ color: c.score ? scoreColorHex(c.score) : "#999" }}>
                  {c.score ?? "—"}
                </div>
              </div>
            ))}
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
                <tr className="bg-[#f5f5f7]">
                  <th className="p-2 text-left font-semibold border-b-2 border-[#d2d2d7]">モデル名</th>
                  <th className="p-2 text-left font-semibold border-b-2 border-[#d2d2d7]">利用可能プラン</th>
                  <th className="p-2 text-left font-semibold border-b-2 border-[#d2d2d7]">特徴</th>
                </tr>
              </thead>
              <tbody>
                {details.currentModels.map((cm: any, i: number) => {
                  const isDeprecated = cm.description?.includes("廃止") || cm.description?.includes("前世代");
                  return (
                    <tr key={i} className={`${isDeprecated ? "text-[#86868b]" : ""} ${i % 2 === 1 ? "bg-[#f9f9fb]" : ""}`}>
                      <td className="p-2 border-b border-[#e8e8ed] font-semibold">
                        {cm.name}
                        {cm.releaseDate && <span className="text-[10px] text-[#86868b] ml-1">({cm.releaseDate})</span>}
                      </td>
                      <td className="p-2 border-b border-[#e8e8ed] text-[11px]">{cm.availability}</td>
                      <td className="p-2 border-b border-[#e8e8ed] text-[11px] text-[#6e6e73]">{cm.description}</td>
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
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-[#1d7d3f] mb-2">強み</div>
              <div className="space-y-1.5">
                {details.strengths.map((s: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#1d1d1f] pl-3 border-l-2 border-[#1d7d3f] leading-relaxed">{s}</div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-[#c4314b] mb-2">弱み</div>
              <div className="space-y-1.5">
                {details.weaknesses.map((w: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#1d1d1f] pl-3 border-l-2 border-[#c4314b] leading-relaxed">{w}</div>
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
          <div className="space-y-1.5 mb-4">
            {details.bestFor.map((b: string, i: number) => (
              <div key={i} className="text-[12px] text-[#1d1d1f] pl-3 border-l-2 border-[#0066cc]">{b}</div>
            ))}
          </div>
          {details.notRecommendedFor && (
            <>
              <div className="text-[12px] font-semibold text-[#86868b] mb-2">不向きな用途</div>
              <div className="space-y-1.5">
                {details.notRecommendedFor.map((n: string, i: number) => (
                  <div key={i} className="text-[12px] text-[#6e6e73] pl-3 border-l-2 border-[#d2d2d7]">{n}</div>
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
              <div key={i} className="text-[12px] text-[#1d1d1f] py-1.5 border-t border-[#e8e8ed] first:border-t-0">{f}</div>
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
          <div className="text-[12px] text-[#6e6e73] mb-3 p-2.5 bg-[#f5f5f7] rounded-lg">
            <span className="font-semibold text-[#1d1d1f]">無料枠: </span>{details.pricing.free}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.pricing.plans.map((p: any, i: number) => (
              <div key={i} className="border border-[#e8e8ed] rounded-lg p-3">
                <div className="text-[13px] font-semibold text-[#1d1d1f] mb-1">{p.name}</div>
                <div className="text-[18px] font-bold text-[#0066cc]">{p.priceJPY || p.priceUSD}</div>
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
                <div key={tier} className="flex-1 border border-[#d2d2d7] rounded p-3">
                  <div className="text-[11px] font-bold text-[#86868b] mb-1">{p.name || (tier === "free" ? "無料" : tier)}</div>
                  <div className="text-[18px] font-bold text-[#0066cc]">{p.priceJPY ? `¥${p.priceJPY.toLocaleString()}` : "¥0"}</div>
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
                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] text-[10px] font-medium">
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
          <div className="bg-gradient-to-br from-[#f8f6f0] to-[#f5f5f7] border border-[#e8e8ed] rounded-lg p-4">
            <p className="text-[13px] text-[#1d1d1f] leading-relaxed font-medium">{details.verdict}</p>
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
              className="flex items-center justify-between py-2.5 border-t border-[#e8e8ed] first:border-t-0 hover:bg-[#f5f5f7] no-underline text-inherit cursor-pointer transition-colors"
            >
              <span className="text-[13px] font-semibold">{model.name} vs {other.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold" style={{ color: diffNum > 0 ? "#1d7d3f" : diffNum < 0 ? "#c4314b" : "#999" }}>
                  {diffNum > 0 ? "+" : ""}{diff}
                </span>
                <span className="text-[11px] text-[#0066cc]">比較 ＞</span>
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
              <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-[#0066cc] hover:underline no-underline truncate">
                {s}
              </a>
            ))}
          </div>
        </Block>
      )}

      {/* Share */}
      <Block alt>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded-lg p-3 bg-white">
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
