import { notFound } from "next/navigation";
import {
  getAllModels,
  getTests,
  getSafetyTests,
  getSafetyRanking,
  getSafetyCertifications,
  scoreColorHex,
  CATEGORY_LABELS,
  MODEL_COLORS,
} from "@/lib/data";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { CompareRadarChart } from "@/components/CompareRadarChart";

function parseSlug(slug: string): [string, string] | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}

export function generateStaticParams() {
  const models = getAllModels().filter((m) => m.scores.overall !== null);
  const params: { slug: string }[] = [];
  for (let i = 0; i < models.length; i++) {
    for (let j = i + 1; j < models.length; j++) {
      params.push({ slug: `${models[i].id}-vs-${models[j].id}` });
      params.push({ slug: `${models[j].id}-vs-${models[i].id}` });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const parsed = parseSlug(params.slug);
  if (!parsed) return {};
  const models = getAllModels();
  const a = models.find((m) => m.id === parsed[0]);
  const b = models.find((m) => m.id === parsed[1]);
  if (!a || !b) return {};

  const scoreA = a.scores.overall;
  const scoreB = b.scores.overall;
  let scoreSummary = "";
  if (scoreA !== null && scoreB !== null) {
    const diff = Math.abs(scoreA - scoreB).toFixed(1);
    const winner = scoreA > scoreB ? a.name : scoreB > scoreA ? b.name : null;
    scoreSummary = winner
      ? `総合スコアは${winner}が${diff}点差でリード。`
      : "総合スコアは同点。";
  }

  const strengths: string[] = [];
  if (a.scores.writing !== null && b.scores.writing !== null) {
    const w = a.scores.writing > b.scores.writing ? a.name : b.name;
    strengths.push(`文章は${w}`);
  }
  if (a.scores.coding !== null && b.scores.coding !== null) {
    const w = a.scores.coding > b.scores.coding ? a.name : b.name;
    strengths.push(`コードは${w}`);
  }
  if (a.scores.image !== null && b.scores.image !== null) {
    const w = a.scores.image > b.scores.image ? a.name : b.name;
    strengths.push(`画像は${w}`);
  }
  const strengthStr = strengths.length > 0 ? strengths.join("、") + "が優勢。" : "";

  const title = `${a.name} vs ${b.name} 徹底比較【2026年最新】| AI選び`;
  const description = `${a.name}（${scoreA ?? "—"}点）と${b.name}（${scoreB ?? "—"}点）を30テスト＋安全性14項目で直接比較。${scoreSummary}${strengthStr}料金・安全性・用途別の違いを一覧で解説。`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${params.slug}` },
    openGraph: { title, description, url: `/compare/${params.slug}` },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const parsed = parseSlug(params.slug);
  if (!parsed) notFound();

  const models = getAllModels();
  const modelA = models.find((m) => m.id === parsed[0]);
  const modelB = models.find((m) => m.id === parsed[1]);
  if (!modelA || !modelB) notFound();

  const tests = getTests();
  const safetyTests = getSafetyTests();
  const safetyRanking = getSafetyRanking();
  const certs = getSafetyCertifications() as Record<string, string[]>;

  const safetyA = safetyRanking.find((r: any) => r.model === modelA.id);
  const safetyB = safetyRanking.find((r: any) => r.model === modelB.id);

  const categories = ["writing", "coding", "image", "safety"] as const;

  const testCategories = [
    { key: "writing", label: "文章生成（8テスト）" },
    { key: "coding", label: "コーディング（4テスト）" },
    { key: "image", label: "画像生成（4テスト）" },
  ];

  let winsA = 0;
  let winsB = 0;
  let draws = 0;
  tests.forEach((t: any) => {
    const sa = t.results[modelA.id] ?? 0;
    const sb = t.results[modelB.id] ?? 0;
    if (sa > sb) winsA++;
    else if (sb > sa) winsB++;
    else draws++;
  });

  const diffOverall =
    (modelA.scores.overall || 0) - (modelB.scores.overall || 0);
  const verdict =
    Math.abs(diffOverall) < 3
      ? "ほぼ互角。用途で選ぶのが正解"
      : diffOverall > 0
        ? `総合では${modelA.name}が優勢`
        : `総合では${modelB.name}が優勢`;

  // Auto-generated overall summary based on category-best scores
  const catLabelMap: Record<string, string> = {
    writing: "文章生成",
    coding: "コーディング",
    image: "画像生成",
    safety: "安全性",
  };
  function bestCategoryFor(model: NonNullable<typeof modelA>): string {
    const entries: { key: string; score: number }[] = [];
    (["writing", "coding", "image"] as const).forEach((k) => {
      const s = (model.scores as any)[k];
      if (typeof s === "number") entries.push({ key: k, score: s });
    });
    const safetyEntry = safetyRanking.find((r: any) => r.model === model.id) as any;
    if (safetyEntry?.score) entries.push({ key: "safety", score: safetyEntry.score });
    if (entries.length === 0) return "汎用利用";
    entries.sort((x, y) => y.score - x.score);
    return catLabelMap[entries[0].key] || entries[0].key;
  }
  const bestA = bestCategoryFor(modelA);
  const bestB = bestCategoryFor(modelB);
  const recommended =
    Math.abs(diffOverall) < 3
      ? `用途次第。${bestA}重視なら${modelA.name}、${bestB}重視なら${modelB.name}`
      : diffOverall > 0
        ? modelA.name
        : modelB.name;
  const overallSummary = `${modelA.name}は${bestA}で強く、${modelB.name}は${bestB}で優れる。総合では${
    Math.abs(diffOverall) < 3 ? "両者ほぼ互角" : `${diffOverall > 0 ? modelA.name : modelB.name}が${Math.abs(diffOverall).toFixed(1)}点リード`
  }。用途を絞って選ぶなら${recommended}を選ぶと満足度が高いだろう。`;

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#e8e8ed] py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="text-[11px] text-[#86868b] mb-2">
            <a href="/" className="text-[#0066cc] hover:underline no-underline">トップ</a>
            {" ＞ "}
            <span>比較</span>
          </div>
          <h1 className="text-[22px] font-bold text-[#1d1d1f] mb-1.5">
            {modelA.name} vs {modelB.name}
          </h1>
          <p className="text-[12px] text-[#6e6e73] mb-2.5">
            全16テスト ＋ 安全性14項目で直接比較
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {["独自30テスト", "採点基準公開", "2026.03更新"].map((b) => (
              <span key={b} className="text-[11px] font-medium text-[#6e6e73] px-2 py-0.5 border border-[#d2d2d7] rounded">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Block>
        <SectionHeader title="スコア概要" />
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="border border-[#d2d2d7] rounded-md p-4 text-center">
            <div className="text-[14px] font-semibold text-[#1d1d1f] mb-1">{modelA.name}</div>
            <div className="text-[40px] font-bold text-[#1d1d1f] leading-none mb-1">
              {modelA.scores.overall ?? "—"}
            </div>
            <div className="text-[10px] font-medium text-[#86868b]">総合スコア</div>
          </div>
          <div className="text-[14px] font-bold text-[#d2d2d7] text-center">vs</div>
          <div className="border border-[#d2d2d7] rounded-md p-4 text-center">
            <div className="text-[14px] font-semibold text-[#1d1d1f] mb-1">{modelB.name}</div>
            <div className="text-[40px] font-bold text-[#1d1d1f] leading-none mb-1">
              {modelB.scores.overall ?? "—"}
            </div>
            <div className="text-[10px] font-medium text-[#86868b]">総合スコア</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 text-[12px]">
          <span className="font-bold text-[#1d1d1f]">{modelA.name} {winsA}勝</span>
          <span className="text-[#86868b]">{draws}引分</span>
          <span className="font-bold text-[#1d1d1f]">{modelB.name} {winsB}勝</span>
        </div>
        <div className="text-center mt-3 px-4 py-2.5 bg-[#f5f5f7] rounded text-[12px] font-semibold text-[#1d1d1f]">
          {verdict}
        </div>
      </Block>

      <Block>
        <SectionHeader title="カテゴリ別比較" />
        <div className="space-y-2">
          {categories.map((cat) => {
            const scoreA = cat === "safety"
              ? (safetyA as any)?.score || 0
              : (modelA.scores as any)[cat] || 0;
            const scoreB = cat === "safety"
              ? (safetyB as any)?.score || 0
              : (modelB.scores as any)[cat] || 0;
            const diff = scoreA - scoreB;
            const absDiff = Math.abs(diff);
            let verdictText = "拮抗";
            if (absDiff >= 30) verdictText = diff > 0 ? `${modelA.name}圧勝` : `${modelB.name}圧勝`;
            else if (absDiff >= 10) verdictText = diff > 0 ? `${modelA.name}優勢` : `${modelB.name}優勢`;
            else if (absDiff >= 3) verdictText = diff > 0 ? `${modelA.name}やや有利` : `${modelB.name}やや有利`;

            const showAdvantage = absDiff >= 10;
            const advantageWinner = diff > 0 ? "A" : "B";
            return (
              <div key={cat} className="border border-[#e8e8ed] rounded-md p-3">
                <div className="text-[11px] font-bold text-[#6e6e73] mb-2 uppercase tracking-wider">
                  {CATEGORY_LABELS[cat] || cat}
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3 items-center">
                  <div>
                    <div className="flex items-baseline justify-between mb-1 gap-1">
                      <span className="text-[11px] text-[#86868b] flex items-center gap-1">
                        {modelA.name}
                        {showAdvantage && advantageWinner === "A" && (
                          <span className="text-[9px] font-semibold text-[#4a7ab5] border border-[#4a7ab5] rounded px-1 leading-tight">
                            優位
                          </span>
                        )}
                      </span>
                      <span className="text-[15px] font-bold text-[#1d1d1f]">
                        {typeof scoreA === "number" && scoreA.toFixed ? scoreA.toFixed(1) : scoreA}
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#f0f0f0] rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm"
                        style={{
                          width: `${scoreA}%`,
                          backgroundColor: scoreColorHex(scoreA),
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center w-[70px] shrink-0">
                    <div className="text-[13px] font-bold text-[#1d1d1f]">
                      {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                    </div>
                    <div className="text-[9px] text-[#86868b] mt-0.5">{verdictText}</div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-1 gap-1">
                      <span className="text-[11px] text-[#86868b] flex items-center gap-1">
                        {modelB.name}
                        {showAdvantage && advantageWinner === "B" && (
                          <span className="text-[9px] font-semibold text-[#4a7ab5] border border-[#4a7ab5] rounded px-1 leading-tight">
                            優位
                          </span>
                        )}
                      </span>
                      <span className="text-[15px] font-bold text-[#1d1d1f]">
                        {typeof scoreB === "number" && scoreB.toFixed ? scoreB.toFixed(1) : scoreB}
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#f0f0f0] rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm"
                        style={{
                          width: `${scoreB}%`,
                          backgroundColor: scoreColorHex(scoreB),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Block>

      <Block>
        <SectionHeader title="レーダーチャート" />
        <CompareRadarChart modelA={modelA} modelB={modelB} />
      </Block>

      {testCategories.map(({ key, label }) => {
        const catTests = tests.filter((t: any) => t.category === key);
        return (
          <Block key={key}>
            <SectionHeader title={label} />
            <div className="overflow-x-auto max-h-[420px] overflow-y-auto border border-[#f0f0f0] rounded-sm">
              <table className="w-full text-[11px] border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#fafafa]">
                    <th className="p-1.5 text-left font-bold border-b-2 border-[#e5e5e5] bg-[#fafafa]">テスト</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5] bg-[#fafafa]">{modelA.name}</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5] bg-[#fafafa]">{modelB.name}</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5] bg-[#fafafa]">差</th>
                  </tr>
                </thead>
                <tbody>
                  {catTests.map((t: any, i: number) => {
                    const sa = t.results[modelA.id] ?? 0;
                    const sb = t.results[modelB.id] ?? 0;
                    const d = sa - sb;
                    return (
                      <tr key={t.testId} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                        <td className="p-1.5 border-b border-[#f0f0f0] font-medium">{t.nameJapanese}</td>
                        <td
                          className="p-1.5 text-center border-b border-[#f0f0f0] font-bold"
                          style={{
                            color: scoreColorHex(sa),
                            backgroundColor: sa > sb ? "#f0f5f0" : "transparent",
                          }}
                        >
                          {sa}
                        </td>
                        <td
                          className="p-1.5 text-center border-b border-[#f0f0f0] font-bold"
                          style={{
                            color: scoreColorHex(sb),
                            backgroundColor: sb > sa ? "#f0f5f0" : "transparent",
                          }}
                        >
                          {sb}
                        </td>
                        <td
                          className="p-1.5 text-center border-b border-[#f0f0f0] font-semibold"
                          style={{
                            color: d > 0 ? MODEL_COLORS[modelA.id] : d < 0 ? MODEL_COLORS[modelB.id] : "#999",
                          }}
                        >
                          {d > 0 ? "+" : ""}{d}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Block>
        );
      })}

      <Block>
        <SectionHeader title="安全性比較" />
        <div className="flex gap-2 mb-3">
          <div className="flex-1 text-center border border-[#e5e5e5] rounded p-2">
            <div className="text-[11px] text-[#86868b]">{modelA.name}</div>
            <div
              className="text-[22px] font-bold"
              style={{ color: scoreColorHex((safetyA as any)?.score || 0) }}
            >
              {(safetyA as any)?.score?.toFixed(2) || "—"}
            </div>
          </div>
          <div className="flex-1 text-center border border-[#e5e5e5] rounded p-2">
            <div className="text-[11px] text-[#86868b]">{modelB.name}</div>
            <div
              className="text-[22px] font-bold"
              style={{ color: scoreColorHex((safetyB as any)?.score || 0) }}
            >
              {(safetyB as any)?.score?.toFixed(2) || "—"}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="p-1 text-left font-bold border-b-2 border-[#e5e5e5]">テスト</th>
                <th className="p-1 text-center font-bold border-b-2 border-[#e5e5e5]">{modelA.name}</th>
                <th className="p-1 text-center font-bold border-b-2 border-[#e5e5e5]">{modelB.name}</th>
              </tr>
            </thead>
            <tbody>
              {safetyTests.map((st: any, i: number) => {
                const sa = st.scores[modelA.id] ?? 0;
                const sb = st.scores[modelB.id] ?? 0;
                return (
                  <tr key={st.testId} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                    <td className="p-1 border-b border-[#f0f0f0] font-medium">{st.nameJapanese}</td>
                    <td
                      className="p-1 text-center border-b border-[#f0f0f0] font-bold"
                      style={{
                        color: scoreColorHex((sa / st.maxScore) * 100),
                        backgroundColor: sa > sb ? "#f0f5f0" : "transparent",
                      }}
                    >
                      {sa}/{st.maxScore}
                    </td>
                    <td
                      className="p-1 text-center border-b border-[#f0f0f0] font-bold"
                      style={{
                        color: scoreColorHex((sb / st.maxScore) * 100),
                        backgroundColor: sb > sa ? "#f0f5f0" : "transparent",
                      }}
                    >
                      {sb}/{st.maxScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[11px]">
          <div className="font-bold text-[#6e6e73] mb-1">セキュリティ認証</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-[11px] text-[#86868b] mb-0.5">{modelA.name}</div>
              <div className="flex flex-wrap gap-1">
                {(certs[modelA.id] || []).map((c: string) => (
                  <span key={c} className="badge badge-scoring">{c}</span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-[#86868b] mb-0.5">{modelB.name}</div>
              <div className="flex flex-wrap gap-1">
                {(certs[modelB.id] || []).map((c: string) => (
                  <span key={c} className="badge badge-scoring">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Block>

      <Block>
        <SectionHeader title="料金比較" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#e5e5e5]">プラン</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">{modelA.name}</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#e5e5e5]">{modelB.name}</th>
              </tr>
            </thead>
            <tbody>
              {(["free", "standard", "premium"] as const).map((tier, i) => {
                const pA = (modelA.pricing as any)[tier];
                const pB = (modelB.pricing as any)[tier];
                return (
                  <tr key={tier} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                    <td className="p-1.5 border-b border-[#f0f0f0] font-medium">
                      {tier === "free" ? "無料" : tier === "standard" ? "スタンダード" : "プレミアム"}
                    </td>
                    <td className="p-1.5 text-center border-b border-[#f0f0f0]">
                      {pA?.available ? (
                        <span>
                          <span className="font-bold">{pA.name || "無料"}</span>
                          {pA.priceJPY ? (
                            <span className="text-[#6e6e73] ml-1">¥{pA.priceJPY.toLocaleString()}/月</span>
                          ) : (
                            <span className="text-green-700 font-bold ml-1">¥0</span>
                          )}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="p-1.5 text-center border-b border-[#f0f0f0]">
                      {pB?.available ? (
                        <span>
                          <span className="font-bold">{pB.name || "無料"}</span>
                          {pB.priceJPY ? (
                            <span className="text-[#6e6e73] ml-1">¥{pB.priceJPY.toLocaleString()}/月</span>
                          ) : (
                            <span className="text-green-700 font-bold ml-1">¥0</span>
                          )}
                        </span>
                      ) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Block>

      <Block>
        <SectionHeader title="結論：どっちを選ぶべき？" />
        <div className="space-y-2">
          <div className="border border-[#e8e8ed] rounded-md p-3 bg-white">
            <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5 pl-2 border-l-2 border-[#3d7a5f]">{modelA.name}が向いている人</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed space-y-0.5">
              {modelA.strengths.slice(0, 3).map((s: string, i: number) => (
                <div key={i}>・{s}</div>
              ))}
            </div>
          </div>
          <div className="border border-[#e8e8ed] rounded-md p-3 bg-white">
            <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5 pl-2 border-l-2 border-[#3d7a5f]">{modelB.name}が向いている人</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed space-y-0.5">
              {modelB.strengths.slice(0, 3).map((s: string, i: number) => (
                <div key={i}>・{s}</div>
              ))}
            </div>
          </div>
          <div className="border border-[#e8e8ed] rounded-md p-3 bg-[#fafafa]">
            <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5 pl-2 border-l-2 border-[#4a7ab5]">
              総合所見
            </div>
            <p className="text-[12px] leading-[1.7] text-[#333333] m-0">{overallSummary}</p>
          </div>
          <div className="text-center text-[11px] text-[#6e6e73] bg-[#f5f5f7] rounded p-2.5 mt-2">
            迷ったら両方の無料枠を試すのがベスト。併用が最も賢い選択です。
          </div>
        </div>
      </Block>

      <Block>
        <SectionHeader title="他の比較を見る" />
        <div className="flex flex-wrap gap-1.5">
          {models
            .filter((m) => m.scores.overall !== null && m.id !== modelA.id && m.id !== modelB.id)
            .map((m) => (
              <a
                key={m.id}
                href={`/compare/${modelA.id}-vs-${m.id}`}
                className="text-[11px] text-[#1d1d1f] border border-[#d2d2d7] rounded px-2.5 py-1 hover:border-[#0066cc] hover:text-[#0066cc] transition-colors no-underline"
              >
                {modelA.name} vs {m.name}
              </a>
            ))}
          {models
            .filter((m) => m.scores.overall !== null && m.id !== modelA.id && m.id !== modelB.id)
            .map((m) => (
              <a
                key={`b-${m.id}`}
                href={`/compare/${modelB.id}-vs-${m.id}`}
                className="text-[11px] text-[#1d1d1f] border border-[#d2d2d7] rounded px-2.5 py-1 hover:border-[#0066cc] hover:text-[#0066cc] transition-colors no-underline"
              >
                {modelB.name} vs {m.name}
              </a>
            ))}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
