"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui";

type Step = "env" | "data" | "priority" | "result";

const ENVIRONMENTS = [
  { id: "personal", label: "個人利用（趣味・学習・副業）" },
  { id: "company", label: "会社の業務利用" },
  { id: "freelance", label: "フリーランス・個人事業主" },
  { id: "engineer", label: "エンジニア・開発者" },
];

const DATA_TYPES = [
  { id: "general", label: "一般的なテキスト（メール、文章校正、アイデア出し）" },
  { id: "customer", label: "顧客情報（氏名、連絡先、購買履歴）" },
  { id: "finance", label: "財務データ（売上、予算、契約金額）" },
  { id: "code", label: "ソースコード（プロプライエタリ）" },
  { id: "strategy", label: "社内戦略・未公開情報" },
  { id: "nda", label: "NDA対象の情報" },
];

const PRIORITIES = [
  { id: "cost", label: "コストを抑えたい" },
  { id: "safety", label: "安全性を最優先にしたい" },
  { id: "balance", label: "使いやすさと安全性のバランス" },
  { id: "certification", label: "社内導入の実績・認証が欲しい" },
];

type Result = {
  risk: "低" | "中" | "中〜高" | "高";
  model: string;
  detail: string;
  cost: string;
  measures: string[];
  articleLink?: string;
  articleLabel?: string;
};

function getResult(env: string, dataTypes: string[], priority: string): Result {
  const hasSensitive = dataTypes.some((d) => ["customer", "finance", "strategy", "nda"].includes(d));
  const hasCode = dataTypes.includes("code");
  const hasNda = dataTypes.includes("nda");
  const hasStrategy = dataTypes.includes("strategy");
  const hasCustomer = dataTypes.includes("customer");

  // Personal
  if (env === "personal") {
    if (!hasSensitive && !hasCode) {
      if (priority === "safety") {
        return {
          risk: "低",
          model: "Claude 無料版",
          detail: "安全性93.7点 | 全モデル1位",
          cost: "0円",
          measures: ["個人情報は入力しない", "学習オプトアウトはデフォルト（商用利用時）"],
          articleLink: "/blog/ai-free-tier-comparison-2026",
          articleLabel: "無料AI比較ガイドを読む →",
        };
      }
      return {
        risk: "低",
        model: "ChatGPT 無料版 または Claude 無料版",
        detail: "ChatGPT総合86.5点 | Claude安全性93.7点",
        cost: "0円",
        measures: [
          "ChatGPT: 設定→データコントロール→「モデルの改善」をオフ",
          "本名・住所・カード番号は入力しない",
        ],
        articleLink: "/blog/ai-free-tier-comparison-2026",
        articleLabel: "無料AI比較ガイドを読む →",
      };
    }
    return {
      risk: "中",
      model: "Claude Pro",
      detail: "安全性93.7点 | SOC 2 Type II",
      cost: "約3,000円/月",
      measures: ["有料プラン推奨", "個人情報・財務情報は匿名化してから入力"],
      articleLink: "/blog/ai-privacy-by-usecase-2026",
      articleLabel: "ユースケース別対策ガイドを読む →",
    };
  }

  // Company
  if (env === "company") {
    if (hasCustomer && (priority === "safety" || priority === "certification")) {
      return {
        risk: "高",
        model: "Claude Team / Enterprise",
        detail: "安全性93.7点 | SOC 2, ISO 42001, HIPAA BAA対応",
        cost: "約3,750円/人/月（Team）",
        measures: [
          "法人プラン必須（デフォルトで学習不使用）",
          "社内AI利用ガイドライン策定",
          "入力禁止情報の定義と全社員への周知",
          "顧客の個人情報は匿名化してから入力",
        ],
        articleLink: "/blog/ai-company-guidelines-template-2026",
        articleLabel: "社内ガイドラインテンプレートを見る →",
      };
    }
    if (hasCode && priority === "balance") {
      return {
        risk: "中〜高",
        model: "ChatGPT Team",
        detail: "総合86.5点 | SOC 2, ISO 27001",
        cost: "約3,750円/人/月",
        measures: [
          "法人プラン必須",
          "APIキー・認証情報は絶対に入力しない",
          ".envファイルの内容は入力禁止",
        ],
        articleLink: "/blog/ai-data-policy-comparison-2026",
        articleLabel: "データポリシー比較を読む →",
      };
    }
    if (hasStrategy && (priority === "certification" || priority === "safety")) {
      return {
        risk: "高",
        model: "Claude Enterprise",
        detail: "安全性93.7点 | SOC 2, ISO 27001, ISO 42001, ZDR対応",
        cost: "要問合せ",
        measures: [
          "ゼロデータリテンション（ZDR）契約必須",
          "社内AI利用ガイドライン策定",
          "管理者によるアカウント一元管理",
        ],
        articleLink: "/blog/ai-company-guidelines-template-2026",
        articleLabel: "社内ガイドラインテンプレートを見る →",
      };
    }
    // Default company
    return {
      risk: hasSensitive ? "高" : "中",
      model: "ChatGPT Team または Claude Team",
      detail: "ChatGPT総合86.5点 | Claude安全性93.7点",
      cost: "約3,750円/人/月",
      measures: [
        "法人プラン必須（無料版の業務利用は禁止）",
        "社内ガイドラインの策定",
        "機密情報の入力基準を全社員に周知",
      ],
      articleLink: "/blog/ai-company-guidelines-template-2026",
      articleLabel: "社内ガイドラインテンプレートを見る →",
    };
  }

  // Freelance
  if (env === "freelance") {
    if (hasNda && (priority === "safety" || priority === "certification")) {
      return {
        risk: "高",
        model: "Claude Pro + API（ZDR対応）",
        detail: "安全性93.7点 | ゼロデータリテンション",
        cost: "約3,000円 + API従量課金",
        measures: [
          "クライアント名の仮名化（株式会社A等）",
          "NDA案件ではAPI経由（ZDR）必須",
          "クライアントへのAI利用の事前告知",
          "金額・数値は概数化してから入力",
        ],
        articleLink: "/blog/ai-privacy-by-usecase-2026",
        articleLabel: "フリーランス向け対策ガイドを読む →",
      };
    }
    if (!hasSensitive && priority === "cost") {
      return {
        risk: "低〜中" as "中",
        model: "ChatGPT Plus",
        detail: "総合86.5点 | 安全性90.5点",
        cost: "約3,000円/月",
        measures: [
          "学習オプトアウト設定",
          "クライアント名は必ず仮名化",
        ],
        articleLink: "/blog/ai-privacy-by-usecase-2026",
        articleLabel: "フリーランス向け対策ガイドを読む →",
      };
    }
    return {
      risk: hasSensitive ? "高" : "中",
      model: "Claude Pro",
      detail: "安全性93.7点 | SOC 2 Type II",
      cost: "約3,000円/月",
      measures: [
        "クライアント名の仮名化",
        "金額・数値は概数化",
        hasSensitive ? "機密情報はAPI経由（ZDR）で処理" : "学習オプトアウト確認",
      ],
      articleLink: "/blog/ai-privacy-by-usecase-2026",
      articleLabel: "フリーランス向け対策ガイドを読む →",
    };
  }

  // Engineer
  if (env === "engineer") {
    if (hasCode && (priority === "safety" || priority === "certification")) {
      return {
        risk: "高",
        model: "Claude Code（ZDR対応）",
        detail: "コーディング94.3点 | 安全性93.7点 | ZDR対応",
        cost: "API従量課金（またはMax Plan約3,000円〜）",
        measures: [
          ".envや認証情報は絶対に入力しない",
          "法人APIキーでZDR契約",
          "プロプライエタリコードとOSSで対策を使い分け",
          "変数名・クラス名の抽象化を検討",
        ],
        articleLink: "/blog/ai-coding-tools-2026",
        articleLabel: "AIコーディングツール比較を読む →",
      };
    }
    if (hasCode && priority === "balance") {
      return {
        risk: "中",
        model: "GitHub Copilot Business + Claude Pro",
        detail: "Copilot: テレメトリ不使用 | Claude: 安全性93.7点",
        cost: "約5,850円/月（Copilot ¥2,850 + Claude ¥3,000）",
        measures: [
          "法人プランでテレメトリ不使用を確認",
          "APIキー・認証情報は絶対に入力しない",
          "プロプライエタリコードとOSSで対策を使い分け",
        ],
        articleLink: "/blog/ai-coding-tools-2026",
        articleLabel: "AIコーディングツール比較を読む →",
      };
    }
    if (priority === "cost") {
      return {
        risk: "中",
        model: "GitHub Copilot Individual",
        detail: "月額約1,500円 | モデル学習不使用",
        cost: "約1,500円/月",
        measures: [
          "APIキー・認証情報は入力しない",
          "公開リポジトリのみAIに提供",
        ],
        articleLink: "/blog/ai-coding-tools-2026",
        articleLabel: "AIコーディングツール比較を読む →",
      };
    }
    return {
      risk: hasCode ? "中〜高" as "高" : "中",
      model: "Claude Code",
      detail: "コーディング94.3点 | 安全性93.7点",
      cost: "API従量課金",
      measures: [
        ".envや認証情報は入力しない",
        "法人APIキー利用推奨",
      ],
      articleLink: "/blog/ai-coding-tools-2026",
      articleLabel: "AIコーディングツール比較を読む →",
    };
  }

  // Fallback
  return {
    risk: "中",
    model: "ChatGPT Plus",
    detail: "総合86.5点 | 安全性90.5点",
    cost: "約3,000円/月",
    measures: ["学習オプトアウト設定", "個人情報は入力しない"],
    articleLink: "/blog/ai-privacy-by-usecase-2026",
    articleLabel: "詳しい対策ガイドを読む →",
  };
}

const RISK_COLORS: Record<string, { bg: string; text: string }> = {
  "低": { bg: "#ecf7ef", text: "#1d7d3f" },
  "中": { bg: "#fef9ec", text: "#a0820a" },
  "中〜高": { bg: "#fef3e0", text: "#c67b00" },
  "高": { bg: "#fdf0f0", text: "#c4314b" },
};

export function SafetyAssessment() {
  const [step, setStep] = useState<Step>("env");
  const [env, setEnv] = useState<string | null>(null);
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [priority, setPriority] = useState<string | null>(null);

  const steps = [
    { key: "env", label: "利用環境", num: 1 },
    { key: "data", label: "データ種類", num: 2 },
    { key: "priority", label: "重視点", num: 3 },
    { key: "result", label: "結果", num: 4 },
  ];

  const toggleData = (id: string) => {
    setDataTypes((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setStep("env");
    setEnv(null);
    setDataTypes([]);
    setPriority(null);
  };

  const result = env && priority ? getResult(env, dataTypes, priority) : null;
  const riskStyle = result ? RISK_COLORS[result.risk] || RISK_COLORS["中"] : null;

  return (
    <div>
      <SectionHeader title="安全性診断" />
      <p className="text-[11px] text-[#86868b] mb-3">
        利用環境・データ・重視点の3ステップで、推奨モデルと対策を提案します。
      </p>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-4">
        {steps.map((s, i) => {
          const isActive = s.key === step;
          const isPast = steps.findIndex((x) => x.key === step) > steps.findIndex((x) => x.key === s.key);
          return (
            <div key={s.key} className="flex items-center gap-1 flex-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive ? "bg-[#1d1d1f] text-white" : isPast ? "bg-green-600 text-white" : "bg-[#e8e8ed] text-[#86868b]"
                }`}
              >
                {isPast ? "✓" : s.num}
              </div>
              <span className={`text-[10px] ${isActive ? "font-bold text-[#1d1d1f]" : "text-[#86868b]"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-[#e8e8ed] mx-1" />}
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === "env" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ENVIRONMENTS.map((e) => (
            <button
              key={e.id}
              onClick={() => { setEnv(e.id); setStep("data"); }}
              className="p-3 border border-[#e8e8ed] rounded-lg hover:border-[#86868b] hover:bg-[#f5f5f7] transition-all duration-200 text-left cursor-pointer bg-white text-[12px] font-medium text-[#1d1d1f]"
            >
              {e.label}
            </button>
          ))}
        </div>
      )}

      {/* Step 2 */}
      {step === "data" && (
        <div>
          <div className="text-[10px] text-[#86868b] mb-2">
            利用環境: {ENVIRONMENTS.find((e) => e.id === env)?.label}
            <button onClick={() => setStep("env")} className="text-[#0066cc] ml-2 hover:underline cursor-pointer bg-transparent border-none text-[10px]">変更</button>
          </div>
          <p className="text-[11px] text-[#86868b] mb-2">複数選択可</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DATA_TYPES.map((d) => (
              <button
                key={d.id}
                onClick={() => toggleData(d.id)}
                className={`p-3 border rounded-lg transition-all duration-200 text-left cursor-pointer text-[12px] font-medium ${
                  dataTypes.includes(d.id)
                    ? "border-[#0066cc] bg-[#eef4fc] text-[#0066cc]"
                    : "border-[#e8e8ed] bg-white text-[#1d1d1f] hover:border-[#86868b] hover:bg-[#f5f5f7]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { if (dataTypes.length === 0) setDataTypes(["general"]); setStep("priority"); }}
            className="mt-3 px-4 py-2 bg-[#1d1d1f] text-white rounded-lg text-[12px] font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
          >
            次へ
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step === "priority" && (
        <div>
          <div className="text-[10px] text-[#86868b] mb-2">
            データ: {dataTypes.map((d) => DATA_TYPES.find((dt) => dt.id === d)?.label?.split("（")[0]).join("、")}
            <button onClick={() => setStep("data")} className="text-[#0066cc] ml-2 hover:underline cursor-pointer bg-transparent border-none text-[10px]">変更</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPriority(p.id); setStep("result"); }}
                className="p-3 border border-[#e8e8ed] rounded-lg hover:border-[#86868b] hover:bg-[#f5f5f7] transition-all duration-200 text-left cursor-pointer bg-white text-[12px] font-medium text-[#1d1d1f]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {step === "result" && result && riskStyle && (
        <div className="border border-[#e8e8ed] rounded-lg p-5 mt-2">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-semibold px-2 py-1 rounded"
              style={{ backgroundColor: riskStyle.bg, color: riskStyle.text }}
            >
              リスクレベル: {result.risk}
            </span>
          </div>

          <div className="text-[11px] text-[#86868b] mb-1">推奨モデル</div>
          <div className="text-[18px] font-bold text-[#1d1d1f] mb-1">{result.model}</div>
          <div className="text-[13px] text-[#6e6e73] mb-3">{result.detail}</div>

          <div className="text-[14px] font-semibold text-[#1d1d1f] mb-3">
            月額 {result.cost}
          </div>

          <div className="text-[12px] font-semibold text-[#1d1d1f] mb-2">必須対策</div>
          <ul className="space-y-1.5 mb-4">
            {result.measures.map((m, i) => (
              <li key={i} className="text-[13px] text-[#1d1d1f] pl-3 border-l-2 border-[#0066cc]">
                {m}
              </li>
            ))}
          </ul>

          {result.articleLink && (
            <div className="pt-3 border-t border-[#e8e8ed]">
              <a href={result.articleLink} className="text-[12px] text-[#0066cc] no-underline hover:underline">
                {result.articleLabel}
              </a>
            </div>
          )}

          <button
            onClick={reset}
            className="mt-4 w-full py-2.5 border-2 border-[#1d1d1f] text-[#1d1d1f] bg-white rounded-lg text-[12px] font-semibold cursor-pointer hover:bg-[#f5f5f7] transition-colors"
          >
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
}
