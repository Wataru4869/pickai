"use client";

import { useState } from "react";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { getModels, getSafetyRanking, scoreColorHex, MODEL_COLORS, CATEGORY_LABELS } from "@/lib/data";

export default function SwitchGuidePage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const models = getModels();
  const safetyRanking = getSafetyRanking();

  const currentModel = selectedModel
    ? models.find((m) => m.id === selectedModel)
    : null;

  const others = currentModel
    ? models
        .filter((m) => m.id !== currentModel.id)
        .sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0))
    : [];

  const categories = [
    { key: "writing", label: "文章生成" },
    { key: "coding", label: "コーディング" },
    { key: "image", label: "画像生成" },
  ] as const;

  const getAdvantages = (other: any) => {
    if (!currentModel) return [];
    const advantages: { category: string; diff: number; label: string }[] = [];
    categories.forEach((cat) => {
      const current = (currentModel.scores as any)[cat.key] || 0;
      const otherScore = (other.scores as any)[cat.key] || 0;
      const diff = otherScore - current;
      if (diff > 5) {
        advantages.push({ category: cat.key, diff, label: cat.label });
      }
    });
    const currentSafety = safetyRanking.find((r: any) => r.model === currentModel.id);
    const otherSafety = safetyRanking.find((r: any) => r.model === other.id);
    if (currentSafety && otherSafety) {
      const diff = (otherSafety as any).score - (currentSafety as any).score;
      if (diff > 5) {
        advantages.push({ category: "safety", diff, label: "安全性" });
      }
    }
    return advantages;
  };

  const getDisadvantages = (other: any) => {
    if (!currentModel) return [];
    const disadvantages: { category: string; diff: number; label: string }[] = [];
    categories.forEach((cat) => {
      const current = (currentModel.scores as any)[cat.key] || 0;
      const otherScore = (other.scores as any)[cat.key] || 0;
      const diff = current - otherScore;
      if (diff > 5) {
        disadvantages.push({ category: cat.key, diff, label: cat.label });
      }
    });
    return disadvantages;
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">乗り換えガイド</h1>
          <p className="text-[12px] text-[#6e6e73]">
            今使っているAIを選ぶと、他モデルとの差分を一目で可視化。
            乗り換えるべきか、併用がベストかを判断できます。
          </p>
          <TrustBadges />
        </div>
      </div>

      <Block>
        <SectionHeader title="今、メインで使っているAIは？" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`p-3 border rounded text-center transition-colors cursor-pointer ${
                selectedModel === m.id
                  ? "border-2 bg-[#f5f5f7]"
                  : "border-[#d2d2d7] bg-white hover:border-[#1d1d1f] hover:bg-[#f5f5f7]"
              }`}
              style={{
                borderColor: selectedModel === m.id ? (MODEL_COLORS[m.id] || "#333") : undefined,
              }}
            >
              <div className="text-[14px] font-semibold">{m.name}</div>
              <div className="text-[11px] text-[#86868b]">{m.provider}</div>
              <div
                className="text-[16px] font-bold mt-1"
                style={{ color: scoreColorHex(m.scores.overall || 0) }}
              >
                {m.scores.overall}
              </div>
            </button>
          ))}
        </div>
      </Block>

      {currentModel && (
        <>
          <Block>
            <SectionHeader title={`${currentModel.name}の現在地`} />
            <div className="flex gap-2 mb-3">
              {[...categories, { key: "safety" as const, label: "安全性" }].map((cat) => {
                const score =
                  cat.key === "safety"
                    ? (safetyRanking.find((r: any) => r.model === currentModel.id) as any)?.score || 0
                    : (currentModel.scores as any)[cat.key] || 0;
                const allScores = models
                  .map((m) => ({
                    id: m.id,
                    score:
                      cat.key === "safety"
                        ? (safetyRanking.find((r: any) => r.model === m.id) as any)?.score || 0
                        : (m.scores as any)[cat.key] || 0,
                  }))
                  .sort((a, b) => b.score - a.score);
                const rank = allScores.findIndex((s) => s.id === currentModel.id) + 1;
                return (
                  <div key={cat.key} className="flex-1 text-center border border-[#d2d2d7] rounded p-2">
                    <div className="text-[10px] text-[#86868b]">{cat.label}</div>
                    <div
                      className="text-[16px] font-bold"
                      style={{ color: scoreColorHex(score) }}
                    >
                      {typeof score === "number" ? (score % 1 === 0 ? score : score.toFixed(1)) : score}
                    </div>
                    <div className="text-[10px] text-[#86868b]">{rank}位/5</div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-green-50 rounded p-2">
                <div className="text-[11px] font-bold text-green-700 mb-1">✓ 強い分野</div>
                <div className="text-[11px] text-[#6e6e73]">
                  {currentModel.strengths.slice(0, 2).map((s: string, i: number) => (
                    <div key={i} className="py-0.5">・{s}</div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-red-50 rounded p-2">
                <div className="text-[11px] font-bold text-red-600 mb-1">✗ 弱い分野</div>
                <div className="text-[11px] text-[#6e6e73]">
                  {currentModel.weaknesses.slice(0, 2).map((w: string, i: number) => (
                    <div key={i} className="py-0.5">・{w}</div>
                  ))}
                </div>
              </div>
            </div>
          </Block>

          {others.map((other) => {
            const advantages = getAdvantages(other);
            const disadvantages = getDisadvantages(other);
            const overallDiff =
              (other.scores.overall || 0) - (currentModel.scores.overall || 0);

            let verdict: string;
            let verdictColor: string;
            if (advantages.length >= 2 && disadvantages.length === 0) {
              verdict = "乗り換え推奨";
              verdictColor = "#1a854a";
            } else if (advantages.length > 0 && disadvantages.length > 0) {
              verdict = "併用がベスト";
              verdictColor = "#1a6dcc";
            } else if (advantages.length === 0) {
              verdict = "乗り換え不要";
              verdictColor = "#999";
            } else {
              verdict = "用途次第";
              verdictColor = "#e67700";
            }

            return (
              <Block key={other.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold">{other.name}</span>
                    <span className="text-[11px] text-[#86868b]">{other.provider}</span>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded"
                    style={{
                      color: verdictColor,
                      backgroundColor:
                        verdictColor === "#1a854a"
                          ? "#edf7f0"
                          : verdictColor === "#1a6dcc"
                            ? "#e8f0fa"
                            : verdictColor === "#e67700"
                              ? "#fef3cd"
                              : "#f5f5f5",
                    }}
                  >
                    {verdict}
                  </span>
                </div>

                <div className="space-y-1.5 mb-3">
                  {[...categories, { key: "safety" as const, label: "安全性" }].map((cat) => {
                    const currentScore =
                      cat.key === "safety"
                        ? (safetyRanking.find((r: any) => r.model === currentModel.id) as any)?.score || 0
                        : (currentModel.scores as any)[cat.key] || 0;
                    const otherScore =
                      cat.key === "safety"
                        ? (safetyRanking.find((r: any) => r.model === other.id) as any)?.score || 0
                        : (other.scores as any)[cat.key] || 0;
                    const diff = otherScore - currentScore;

                    return (
                      <div key={cat.key} className="flex items-center gap-2 text-[11px]">
                        <span className="w-16 text-[#86868b] shrink-0">{cat.label}</span>
                        <div className="flex-1 flex items-center gap-1">
                          <span className="w-8 text-right text-[#86868b]">
                            {typeof currentScore === "number" && currentScore % 1 !== 0
                              ? currentScore.toFixed(1)
                              : currentScore}
                          </span>
                          <div className="flex-1 h-1.5 bg-[#f5f5f7] rounded-full relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full opacity-40"
                              style={{
                                width: `${currentScore}%`,
                                backgroundColor: MODEL_COLORS[currentModel.id] || "#999",
                              }}
                            />
                            <div
                              className="absolute top-0 left-0 h-full rounded-full"
                              style={{
                                width: `${otherScore}%`,
                                backgroundColor: MODEL_COLORS[other.id] || "#333",
                                opacity: 0.7,
                              }}
                            />
                          </div>
                          <span
                            className="w-8 text-right font-bold"
                            style={{ color: scoreColorHex(otherScore) }}
                          >
                            {typeof otherScore === "number" && otherScore % 1 !== 0
                              ? otherScore.toFixed(1)
                              : otherScore}
                          </span>
                        </div>
                        <span
                          className="w-10 text-right font-bold"
                          style={{
                            color: diff > 0 ? "#1a854a" : diff < 0 ? "#cc3333" : "#999",
                          }}
                        >
                          {diff > 0 ? "+" : ""}
                          {diff.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {(advantages.length > 0 || disadvantages.length > 0) && (
                  <div className="flex gap-2 text-[11px]">
                    {advantages.length > 0 && (
                      <div className="flex-1 bg-green-50 rounded p-2">
                        <div className="font-bold text-green-700 mb-0.5">
                          {other.name}が勝る点
                        </div>
                        {advantages.map((a) => (
                          <div key={a.category} className="text-[#6e6e73]">
                            ・{a.label} +{a.diff.toFixed(1)}点
                          </div>
                        ))}
                      </div>
                    )}
                    {disadvantages.length > 0 && (
                      <div className="flex-1 bg-red-50 rounded p-2">
                        <div className="font-bold text-red-600 mb-0.5">
                          {currentModel.name}が勝る点
                        </div>
                        {disadvantages.map((d) => (
                          <div key={d.category} className="text-[#6e6e73]">
                            ・{d.label} +{d.diff.toFixed(1)}点
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <a
                  href={`/compare/${currentModel.id}-vs-${other.id}`}
                  className="block text-[11px] text-[#0066cc] mt-2 hover:underline"
                >
                  {currentModel.name} vs {other.name}の詳細比較を見る →
                </a>
              </Block>
            );
          })}

          <Block>
            <SectionHeader title="総合判断" />
            <div className="bg-[#fdf6e3] rounded p-3 text-[11px] text-[#6e6e73] leading-relaxed">
              <div className="font-bold text-[12px] mb-1">
                {currentModel.name}ユーザーへのアドバイス
              </div>
              <p className="mb-1.5">
                どのAIにも明確な強み・弱みがあります。1つに絞るより、
                <strong>メインAI＋サブAIの併用</strong>が最もコスパの良い戦略です。
              </p>
              <p>
                まずは各AIの無料枠で実際に試してみてください。
                有料プランは「このAIでないとできないこと」が見つかってからで十分です。
              </p>
            </div>
            <div className="flex gap-2 mt-3">
              <a
                href="/recommend"
                className="flex-1 text-center py-2 bg-[#1d1d1f] text-white rounded text-[11px] font-bold no-underline hover:opacity-90"
              >
                用途別おすすめを見る
              </a>
              <a
                href="/cost"
                className="flex-1 text-center py-2 border border-[#1d1d1f] text-[#1d1d1f] rounded text-[11px] font-bold no-underline hover:bg-[#f5f5f7]"
              >
                コスト計算機
              </a>
            </div>
          </Block>
        </>
      )}

      <Footer />
    </div>
  );
}
