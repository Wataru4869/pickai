"use client";

import { useState, useMemo, useEffect } from "react";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";
import { getModels, MODEL_COLORS } from "@/lib/data";
import recommendData from "@/data/recommendations.json";

type Step = "role" | "useCase" | "budget" | "result";

export default function RecommendPage() {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [attributionQuery, setAttributionQuery] = useState("");

  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const outgoing = new URLSearchParams();
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const value = incoming.get(key);
      if (value && /^[a-z0-9][a-z0-9_-]{0,63}$/.test(value)) outgoing.set(key, value);
    }
    setAttributionQuery(outgoing.toString());
  }, []);

  const withAttribution = (path: string) => attributionQuery ? `${path}?${attributionQuery}` : path;

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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white border-b border-[#e8e8ed] py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold mb-1">
            用途に合うAI候補を絞る
          </h1>
          <p className="text-[12px] text-[#6e6e73]">
            3つの質問から、保存済みの選定ルールに沿って候補とプロンプト例を表示します。現在の性能や料金を保証する診断ではありません。
          </p>
          <TrustBadges />
        </div>
      </div>

      <div className="bg-white border-b border-[#d2d2d7]">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4 py-2">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => {
              const isActive = s.key === step;
              const isPast =
                steps.findIndex((x) => x.key === step) >
                steps.findIndex((x) => x.key === s.key);
              return (
                <div key={s.key} className="flex items-center gap-1 flex-1">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? "bg-[#1d1d1f] text-white"
                        : isPast
                          ? "bg-[#3d7a5f] text-white"
                          : "bg-[#e8e8ed] text-[#86868b]"
                    }`}
                  >
                    {isPast ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-[11px] ${
                      isActive ? "font-bold text-[#4a7ab5]" : "text-[#86868b]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendData.roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setStep("useCase");
                }}
                className="flex items-center gap-2 p-3 border border-[#d2d2d7] rounded hover:border-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-left cursor-pointer bg-white"
              >
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
              className="text-[#4a7ab5] ml-2 hover:underline cursor-pointer bg-transparent border-none"
            >
              変更
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredUseCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => {
                  setSelectedUseCase(uc.id);
                  setStep("budget");
                }}
                className="flex items-center gap-2 p-3 border border-[#d2d2d7] rounded hover:border-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-left cursor-pointer bg-white"
              >
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
              className="text-[#4a7ab5] ml-2 hover:underline cursor-pointer bg-transparent border-none"
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
                <span className="badge badge-test">候補</span>
                <span className="text-[18px] font-bold">{primaryModel.name}</span>
                <span className="text-[11px] text-[#86868b]">{primaryModel.provider}</span>
              </div>
              <div className="text-[11px] text-[#6e6e73] bg-[#f5f5f7] rounded p-2.5 leading-relaxed">
                選択した職種・用途・予算に対応する候補です。保存済みルールは現行モデルの実測比較ではないため、契約前に公式の機能・料金・利用条件を確認してください。
              </div>
              <a
                href={withAttribution(`/model/${primaryModel.id}`)}
                className="block text-center text-[11px] text-[#4a7ab5] mt-2 hover:underline"
              >
                {primaryModel.name}の詳細を見る →
              </a>
            </div>

            {secondaryModel && (
              <div className="border border-[#d2d2d7] rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-[#86868b] font-bold">比較候補</span>
                  <span className="text-[14px] font-bold">{secondaryModel.name}</span>
                </div>
                <div className="text-[11px] text-[#6e6e73]">
                  {primaryModel.name}と{secondaryModel.name}の違いも確認できます。併用や契約を推奨する判定ではありません。
                </div>
                <a
                  href={withAttribution(`/compare/${primaryModel.id}-vs-${secondaryModel.id}`)}
                  className="block text-[11px] text-[#4a7ab5] mt-1.5 hover:underline"
                >
                  {primaryModel.name} vs {secondaryModel.name}の比較を見る →
                </a>
              </div>
            )}
          </Block>

          <Block>
            <SectionHeader title="プロンプトテンプレート" />
            <p className="text-[11px] text-[#86868b] mb-2">
              {primaryModel.name}で試せるプロンプト例です。
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
            <SectionHeader title="料金を確認する前に" />
            <p className="text-[11px] text-[#6e6e73] leading-relaxed">
              選択した予算は候補を絞るための入力です。表示モデルの現行価格、無料枠、対象地域、課金周期は契約直前に公式サイトで確認してください。
            </p>
            <a
              href={withAttribution("/cost")}
              className="block text-center text-[11px] text-[#4a7ab5] mt-2 hover:underline"
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
