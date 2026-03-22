"use client";

import { useState, useMemo } from "react";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { getModels, scoreColorHex, MODEL_COLORS } from "@/lib/data";
import recommendData from "@/data/recommendations.json";

type Step = "role" | "useCase" | "budget" | "result";

export default function RecommendPage() {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const models = getModels();

  const filteredUseCases = useMemo(() => {
    if (!selectedRole) return recommendData.useCases;
    return recommendData.useCases.filter((uc) =>
      uc.roles.includes(selectedRole)
    );
  }, [selectedRole]);

  const recommendation = useMemo(() => {
    if (!selectedUseCase || !selectedBudget) return null;
    const ucRecs = (recommendData.recommendations as any)[selectedUseCase];
    if (!ucRecs) return null;
    return ucRecs[selectedBudget] || null;
  }, [selectedUseCase, selectedBudget]);

  const primaryModel = recommendation
    ? models.find((m) => m.id === recommendation.primary)
    : null;
  const secondaryModel = recommendation
    ? models.find((m) => m.id === recommendation.secondary)
    : null;

  const steps = [
    { key: "role", label: "職種", num: 1 },
    { key: "useCase", label: "用途", num: 2 },
    { key: "budget", label: "予算", num: 3 },
    { key: "result", label: "結果", num: 4 },
  ];

  const reset = () => {
    setStep("role");
    setSelectedRole(null);
    setSelectedUseCase(null);
    setSelectedBudget(null);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">
            あなたに最適なAIを見つける
          </h1>
          <p className="text-[12px] text-[#6e6e73]">
            3つの質問に答えるだけで、職種・用途・予算にぴったりのAIとプロンプトテンプレートを提案します。
          </p>
          <TrustBadges />
        </div>
      </div>

      <div className="bg-white border-b border-[#d2d2d7]">
        <div className="max-w-[860px] mx-auto px-4 py-2">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => {
              const isActive = s.key === step;
              const isPast =
                steps.findIndex((x) => x.key === step) >
                steps.findIndex((x) => x.key === s.key);
              return (
                <div key={s.key} className="flex items-center gap-1 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? "bg-[#1d1d1f] text-white"
                        : isPast
                          ? "bg-green-600 text-white"
                          : "bg-[#e8e8ed] text-[#86868b]"
                    }`}
                  >
                    {isPast ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-[11px] ${
                      isActive ? "font-bold text-[#0066cc]" : "text-[#86868b]"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-[#e8e8ed] mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {step === "role" && (
        <Block>
          <SectionHeader title="Q1. あなたの職種は？" />
          <div className="grid grid-cols-2 gap-2">
            {recommendData.roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setStep("useCase");
                }}
                className="flex items-center gap-2 p-3 border border-[#d2d2d7] rounded hover:border-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-left cursor-pointer bg-white"
              >
                <span className="text-[18px]">{role.icon}</span>
                <span className="text-[12px] font-bold">{role.label}</span>
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === "useCase" && (
        <Block>
          <SectionHeader title="Q2. 何に使いたい？" />
          <div className="text-[11px] text-[#86868b] mb-2">
            職種：{recommendData.roles.find((r) => r.id === selectedRole)?.label}
            <button
              onClick={() => setStep("role")}
              className="text-[#0066cc] ml-2 hover:underline cursor-pointer bg-transparent border-none"
            >
              変更
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {filteredUseCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => {
                  setSelectedUseCase(uc.id);
                  setStep("budget");
                }}
                className="flex items-center gap-2 p-3 border border-[#d2d2d7] rounded hover:border-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-left cursor-pointer bg-white"
              >
                <span className="text-[18px]">{uc.icon}</span>
                <span className="text-[12px] font-bold">{uc.label}</span>
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === "budget" && (
        <Block>
          <SectionHeader title="Q3. 月額予算は？" />
          <div className="text-[11px] text-[#86868b] mb-2">
            用途：{recommendData.useCases.find((u) => u.id === selectedUseCase)?.label}
            <button
              onClick={() => setStep("useCase")}
              className="text-[#0066cc] ml-2 hover:underline cursor-pointer bg-transparent border-none"
            >
              変更
            </button>
          </div>
          <div className="space-y-2">
            {recommendData.budgets.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBudget(b.id);
                  setStep("result");
                }}
                className="w-full flex items-center justify-between p-3 border border-[#d2d2d7] rounded hover:border-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-left cursor-pointer bg-white"
              >
                <span className="text-[13px] font-bold">{b.label}</span>
                <span className="text-[11px] text-[#86868b]">
                  {b.priceMax === 0
                    ? "¥0"
                    : b.priceMax === 3000
                      ? "〜¥3,000/月"
                      : "¥5,000+/月"}
                </span>
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === "result" && recommendation && primaryModel && (
        <>
          <Block>
            <SectionHeader title="おすすめ結果" />
            <div className="text-[11px] text-[#86868b] mb-3">
              {recommendData.roles.find((r) => r.id === selectedRole)?.label} ×{" "}
              {recommendData.useCases.find((u) => u.id === selectedUseCase)?.label} ×{" "}
              {recommendData.budgets.find((b) => b.id === selectedBudget)?.label}
            </div>

            <div
              className="border-2 rounded-lg p-4 mb-3"
              style={{ borderColor: MODEL_COLORS[primaryModel.id] || "#333" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-test">最適</span>
                <span className="text-[18px] font-bold">{primaryModel.name}</span>
                <span className="text-[11px] text-[#86868b]">{primaryModel.provider}</span>
              </div>
              <div className="flex gap-2 mb-2">
                {(["writing", "coding", "image", "safety"] as const).map((cat) => (
                  <div key={cat} className="text-center">
                    <div className="text-[10px] text-[#86868b]">
                      {cat === "writing" ? "文" : cat === "coding" ? "コ" : cat === "image" ? "画" : "安"}
                    </div>
                    <div
                      className="text-[13px] font-bold"
                      style={{ color: scoreColorHex(primaryModel.scores[cat] || 0) }}
                    >
                      {primaryModel.scores[cat] ?? "—"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#6e6e73] bg-[#f5f5f7] rounded p-2.5 leading-relaxed">
                {recommendation.reason}
              </div>
              <a
                href={`/model/${primaryModel.id}`}
                className="block text-center text-[11px] text-[#0066cc] mt-2 hover:underline"
              >
                {primaryModel.name}の詳細を見る →
              </a>
            </div>

            {secondaryModel && (
              <div className="border border-[#d2d2d7] rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-[#86868b] font-bold">併用推奨</span>
                  <span className="text-[14px] font-bold">{secondaryModel.name}</span>
                </div>
                <div className="text-[11px] text-[#6e6e73]">
                  {primaryModel.name}と{secondaryModel.name}の併用が最も賢い選択。
                  それぞれの強みを活かせます。
                </div>
                <a
                  href={`/compare/${primaryModel.id}-vs-${secondaryModel.id}`}
                  className="block text-[11px] text-[#0066cc] mt-1.5 hover:underline"
                >
                  {primaryModel.name} vs {secondaryModel.name}の比較を見る →
                </a>
              </div>
            )}
          </Block>

          <Block>
            <SectionHeader title="プロンプトテンプレート" />
            <p className="text-[11px] text-[#86868b] mb-2">
              {primaryModel.name}で使える、この用途に最適化されたプロンプトです。
              {"{ }"}内を自分の状況に置き換えてください。
            </p>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] rounded p-3 text-[11px] leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
              {recommendation.prompt}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(recommendation.prompt);
              }}
              className="mt-2 px-3 py-1.5 bg-[#1d1d1f] text-white border-none rounded text-[11px] font-bold cursor-pointer hover:opacity-90 transition-opacity"
            >
              コピー
            </button>
          </Block>

          <Block>
            <SectionHeader title="料金の目安" />
            <div className="flex gap-2">
              <div className="flex-1 border border-[#d2d2d7] rounded p-3 text-center">
                <div className="text-[11px] font-bold mb-1">{primaryModel.name}</div>
                <div className="text-[18px] font-bold text-[#0066cc]">
                  {selectedBudget === "free"
                    ? "¥0"
                    : `¥${(primaryModel.pricing as any)[selectedBudget === "standard" ? "standard" : "premium"]?.priceJPY?.toLocaleString() || "—"}`}
                </div>
                <div className="text-[10px] text-[#86868b]">/月</div>
              </div>
              {secondaryModel && (
                <div className="flex-1 border border-[#d2d2d7] rounded p-3 text-center">
                  <div className="text-[11px] font-bold mb-1">{secondaryModel.name}</div>
                  <div className="text-[18px] font-bold text-[#0066cc]">
                    {selectedBudget === "free"
                      ? "¥0"
                      : `¥${(secondaryModel.pricing as any)[selectedBudget === "standard" ? "standard" : "premium"]?.priceJPY?.toLocaleString() || "—"}`}
                  </div>
                  <div className="text-[10px] text-[#86868b]">/月</div>
                </div>
              )}
            </div>
            <a
              href="/cost"
              className="block text-center text-[11px] text-[#0066cc] mt-2 hover:underline"
            >
              コスト計算機で年間費用を比較する →
            </a>
          </Block>

          <Block>
            <button
              onClick={reset}
              className="w-full py-3 border-2 border-[#1d1d1f] text-[#1d1d1f] bg-white rounded text-[13px] font-bold cursor-pointer hover:bg-[#f5f5f7] transition-colors"
            >
              もう一度診断する
            </button>
          </Block>
        </>
      )}

      <Footer />
    </div>
  );
}
