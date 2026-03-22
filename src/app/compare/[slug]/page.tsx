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
  return {
    title: `${a.name} vs ${b.name} 比較【2026年版】| Pick AI`,
    description: `${a.name}と${b.name}を全16テスト＋安全性14項目で直接比較。文章・コード・画像・安全性・料金のどこで差がつくか一目でわかります。`,
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

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="text-[11px] text-[#86868b] mb-1">
            <a href="/" className="text-[#0066cc] hover:underline">トップ</a>
            {" ＞ "}
            <span>比較</span>
          </div>
          <h1 className="text-[20px] font-bold mb-2">
            {modelA.name} vs {modelB.name}
          </h1>
          <p className="text-[12px] text-[#6e6e73]">
            全16テスト＋安全性14項目で直接比較
          </p>
          <TrustBadges />
        </div>
      </div>

      <Block>
        <SectionHeader title="スコア概要" />
        <div className="flex gap-2">
          <div className="flex-1 border border-[#d2d2d7] rounded p-3 text-center">
            <div className="text-[13px] font-semibold mb-1">{modelA.name}</div>
            <div
              className="text-[32px] font-bold leading-none"
              style={{ color: scoreColorHex(modelA.scores.overall || 0) }}
            >
              {modelA.scores.overall ?? "—"}
            </div>
            <div className="text-[11px] text-[#86868b] mt-0.5">総合</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[11px] font-bold text-[#86868b]">
              VS
            </div>
          </div>
          <div className="flex-1 border border-[#d2d2d7] rounded p-3 text-center">
            <div className="text-[13px] font-semibold mb-1">{modelB.name}</div>
            <div
              className="text-[32px] font-bold leading-none"
              style={{ color: scoreColorHex(modelB.scores.overall || 0) }}
            >
              {modelB.scores.overall ?? "—"}
            </div>
            <div className="text-[11px] text-[#86868b] mt-0.5">総合</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3 text-[11px]">
          <span className="font-bold" style={{ color: MODEL_COLORS[modelA.id] || "#333" }}>
            {winsA}勝
          </span>
          <span className="text-[#86868b]">{draws}引分</span>
          <span className="font-bold" style={{ color: MODEL_COLORS[modelB.id] || "#333" }}>
            {winsB}勝
          </span>
        </div>
        <div className="text-center mt-2 text-[12px] font-bold text-[#6e6e73] bg-[#f5f5f7] rounded p-2">
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
            const winner = diff > 0 ? modelA.id : diff < 0 ? modelB.id : null;

            return (
              <div key={cat} className="border border-[#e8e8ed] rounded p-2.5">
                <div className="text-[11px] font-bold text-[#86868b] mb-1.5">
                  {CATEGORY_LABELS[cat] || cat}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#86868b]">{modelA.name}</span>
                      <span
                        className="text-[15px] font-bold"
                        style={{ color: scoreColorHex(scoreA) }}
                      >
                        {scoreA.toFixed ? scoreA.toFixed(1) : scoreA}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${scoreA}%`,
                          backgroundColor: MODEL_COLORS[modelA.id] || "#333",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center w-16 shrink-0">
                    <div
                      className="text-[12px] font-bold"
                      style={{
                        color: winner === modelA.id
                          ? MODEL_COLORS[modelA.id]
                          : winner === modelB.id
                            ? MODEL_COLORS[modelB.id]
                            : "#999",
                      }}
                    >
                      {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#86868b]">{modelB.name}</span>
                      <span
                        className="text-[15px] font-bold"
                        style={{ color: scoreColorHex(scoreB) }}
                      >
                        {scoreB.toFixed ? scoreB.toFixed(1) : scoreB}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${scoreB}%`,
                          backgroundColor: MODEL_COLORS[modelB.id] || "#333",
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
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f7]">
                    <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">テスト</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">{modelA.name}</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">{modelB.name}</th>
                    <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">差</th>
                  </tr>
                </thead>
                <tbody>
                  {catTests.map((t: any, i: number) => {
                    const sa = t.results[modelA.id] ?? 0;
                    const sb = t.results[modelB.id] ?? 0;
                    const d = sa - sb;
                    return (
                      <tr key={t.testId} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                        <td className="p-1.5 border-b border-[#e8e8ed] font-medium">{t.nameJapanese}</td>
                        <td
                          className="p-1.5 text-center border-b border-[#e8e8ed] font-bold"
                          style={{
                            color: scoreColorHex(sa),
                            backgroundColor: sa > sb ? "#edf7f0" : "transparent",
                          }}
                        >
                          {sa}
                        </td>
                        <td
                          className="p-1.5 text-center border-b border-[#e8e8ed] font-bold"
                          style={{
                            color: scoreColorHex(sb),
                            backgroundColor: sb > sa ? "#edf7f0" : "transparent",
                          }}
                        >
                          {sb}
                        </td>
                        <td
                          className="p-1.5 text-center border-b border-[#e8e8ed] font-semibold"
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
          <div className="flex-1 text-center border border-[#d2d2d7] rounded p-2">
            <div className="text-[11px] text-[#86868b]">{modelA.name}</div>
            <div
              className="text-[22px] font-bold"
              style={{ color: scoreColorHex((safetyA as any)?.score || 0) }}
            >
              {(safetyA as any)?.score?.toFixed(2) || "—"}
            </div>
          </div>
          <div className="flex-1 text-center border border-[#d2d2d7] rounded p-2">
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
              <tr className="bg-[#f5f5f7]">
                <th className="p-1 text-left font-bold border-b-2 border-[#d2d2d7]">テスト</th>
                <th className="p-1 text-center font-bold border-b-2 border-[#d2d2d7]">{modelA.name}</th>
                <th className="p-1 text-center font-bold border-b-2 border-[#d2d2d7]">{modelB.name}</th>
              </tr>
            </thead>
            <tbody>
              {safetyTests.map((st: any, i: number) => {
                const sa = st.scores[modelA.id] ?? 0;
                const sb = st.scores[modelB.id] ?? 0;
                return (
                  <tr key={st.testId} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                    <td className="p-1 border-b border-[#e8e8ed] font-medium">{st.nameJapanese}</td>
                    <td
                      className="p-1 text-center border-b border-[#e8e8ed] font-bold"
                      style={{
                        color: scoreColorHex((sa / st.maxScore) * 100),
                        backgroundColor: sa > sb ? "#edf7f0" : "transparent",
                      }}
                    >
                      {sa}/{st.maxScore}
                    </td>
                    <td
                      className="p-1 text-center border-b border-[#e8e8ed] font-bold"
                      style={{
                        color: scoreColorHex((sb / st.maxScore) * 100),
                        backgroundColor: sb > sa ? "#edf7f0" : "transparent",
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
              <tr className="bg-[#f5f5f7]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">プラン</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">{modelA.name}</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">{modelB.name}</th>
              </tr>
            </thead>
            <tbody>
              {(["free", "standard", "premium"] as const).map((tier, i) => {
                const pA = (modelA.pricing as any)[tier];
                const pB = (modelB.pricing as any)[tier];
                return (
                  <tr key={tier} className={i % 2 === 0 ? "bg-white" : "bg-[#fbfbfd]"}>
                    <td className="p-1.5 border-b border-[#e8e8ed] font-medium">
                      {tier === "free" ? "無料" : tier === "standard" ? "スタンダード" : "プレミアム"}
                    </td>
                    <td className="p-1.5 text-center border-b border-[#e8e8ed]">
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
                    <td className="p-1.5 text-center border-b border-[#e8e8ed]">
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
          <div className="border-l-4 rounded p-3 bg-[#f5f5f7]" style={{ borderColor: MODEL_COLORS[modelA.id] || "#333" }}>
            <div className="text-[12px] font-semibold mb-0.5">{modelA.name}が向いている人</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">
              {modelA.strengths.slice(0, 3).map((s: string, i: number) => (
                <div key={i}>・{s}</div>
              ))}
            </div>
          </div>
          <div className="border-l-4 rounded p-3 bg-[#f5f5f7]" style={{ borderColor: MODEL_COLORS[modelB.id] || "#333" }}>
            <div className="text-[12px] font-semibold mb-0.5">{modelB.name}が向いている人</div>
            <div className="text-[11px] text-[#6e6e73] leading-relaxed">
              {modelB.strengths.slice(0, 3).map((s: string, i: number) => (
                <div key={i}>・{s}</div>
              ))}
            </div>
          </div>
          <div className="text-center text-[11px] text-[#6e6e73] bg-[#fdf6e3] rounded p-2 mt-2">
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
                className="text-[11px] text-[#0066cc] border border-[#d2d2d7] rounded px-2.5 py-1 hover:bg-[#f5f5f7] transition-colors no-underline"
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
                className="text-[11px] text-[#0066cc] border border-[#d2d2d7] rounded px-2.5 py-1 hover:bg-[#f5f5f7] transition-colors no-underline"
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
