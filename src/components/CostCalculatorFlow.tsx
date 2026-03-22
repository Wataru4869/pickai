"use client";

import { useState } from "react";
import { scoreColorHex } from "@/lib/data";

const PURPOSES = ["文章作成", "画像生成", "コーディング", "リサーチ", "翻訳", "SNS制作"];
const USAGE = ["たまに（週数回）", "毎日数回", "頻繁に（10〜30回/日）", "ほぼ常時（30回以上/日）"];
const BUDGET = ["無料で使いたい", "月1,000円まで", "月3,000円まで", "月5,000円まで", "月10,000円以上OK"];

interface Rec {
  label: string;
  service: string;
  plan: string;
  price: number;
  reason: string;
}

function recommend(purposes: string[], usage: number, budget: number): Rec[] {
  const bMap = [0, 1000, 3000, 5000, 10000];
  const maxBudget = bMap[budget] ?? 999999;
  const needsImage = purposes.includes("画像生成");
  const needsCode = purposes.includes("コーディング");
  const recs: Rec[] = [];

  if (needsCode && maxBudget >= 3000)
    recs.push({ label: "コーディング最強", service: "Claude", plan: "Pro", price: 3000, reason: "コーディング99.0点（3テスト満点）。コード重視なら一択。" });
  if (needsImage && maxBudget >= 3000)
    recs.push({ label: "画像生成最強", service: "ChatGPT", plan: "Plus", price: 3000, reason: "画像98.0点（3テスト満点）。画像が必要ならChatGPT。" });
  if (!needsCode && !needsImage && maxBudget <= 1000)
    recs.push({ label: "無料で始める", service: "Gemini", plan: "無料", price: 0, reason: "Google連携が便利。まずは無料で試すなら。" });
  if (needsCode && needsImage && maxBudget >= 6000)
    recs.push({ label: "最強の併用", service: "Claude Pro + ChatGPT Plus", plan: "併用", price: 6000, reason: "月¥6,000でコード99.0＋画像98.0。全用途カバー。" });
  if (usage <= 1 && maxBudget === 0)
    recs.push({ label: "無料で十分", service: "ChatGPT", plan: "無料", price: 0, reason: "週数回の利用なら無料版で十分対応可能。" });

  // Deduplicate and limit to 3
  const seen = new Set<string>();
  return recs.filter((r) => {
    if (seen.has(r.service)) return false;
    seen.add(r.service);
    return true;
  }).slice(0, 3);
}

export function CostCalculatorFlow() {
  const [purposes, setPurposes] = useState<string[]>([]);
  const [usage, setUsage] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const toggle = (p: string) =>
    setPurposes((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const ok = purposes.length > 0 && usage !== null && budget !== null;
  const recs = ok ? recommend(purposes, usage!, budget!) : [];

  return (
    <div>
      {/* Q1 */}
      <div className="bg-white border-b-[6px] border-[#F5F5F5] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <div className="text-[13px] font-semibold mb-2.5">
            <span className="text-[#0066cc] mr-1.5">Q1</span>主な利用用途は？（複数OK）
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PURPOSES.map((p) => (
              <button key={p} onClick={() => toggle(p)} className={`px-3.5 py-2 rounded cursor-pointer text-[12px] border transition-colors ${purposes.includes(p) ? "border-[#1d1d1f] border-2 bg-[#f5f5f7] text-[#0066cc] font-bold" : "border-[#d2d2d7] bg-white text-[#6e6e73]"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Q2 */}
      <div className="bg-white border-b-[6px] border-[#F5F5F5] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <div className="text-[13px] font-semibold mb-2.5">
            <span className="text-[#0066cc] mr-1.5">Q2</span>1日にどれくらい使う？
          </div>
          <div className="flex flex-col gap-1">
            {USAGE.map((u, i) => (
              <button key={u} onClick={() => setUsage(i)} className={`p-2.5 rounded cursor-pointer text-left text-[12px] border transition-colors ${usage === i ? "border-[#1d1d1f] border-2 bg-[#f5f5f7] text-[#0066cc] font-bold" : "border-[#d2d2d7] bg-white text-[#6e6e73]"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Q3 */}
      <div className="bg-white border-b-[6px] border-[#F5F5F5] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <div className="text-[13px] font-semibold mb-2.5">
            <span className="text-[#0066cc] mr-1.5">Q3</span>予算の上限は？
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BUDGET.map((b, i) => (
              <button key={b} onClick={() => setBudget(i)} className={`px-3.5 py-2 rounded cursor-pointer text-[12px] border transition-colors ${budget === i ? "border-[#1d1d1f] border-2 bg-[#f5f5f7] text-[#0066cc] font-bold" : "border-[#d2d2d7] bg-white text-[#6e6e73]"}`}>
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculate button */}
      <div className="bg-white border-b-[6px] border-[#F5F5F5] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <button onClick={() => setShowResult(ok)} className={`w-full py-3 rounded text-[14px] font-semibold border-none cursor-pointer transition-colors ${ok ? "bg-[#1d1d1f] text-white hover:bg-blue-700" : "bg-[#e8e8ed] text-[#86868b] cursor-default"}`}>
            コストを計算する
          </button>
        </div>
      </div>

      {/* Results */}
      {showResult && ok && (
        <div className="bg-white border-b-[6px] border-[#F5F5F5] py-4">
          <div className="max-w-[860px] mx-auto px-4">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-1 h-[18px] bg-[#1d1d1f] rounded-sm" />
              <h2 className="text-[15px] font-semibold">おすすめプラン</h2>
            </div>
            {recs.length === 0 ? (
              <p className="text-[12px] text-[#6e6e73]">条件に合うプランが見つかりませんでした。予算を上げるか、用途を絞ってみてください。</p>
            ) : (
              recs.map((r, i) => (
                <div key={i} className={`border rounded p-3 mb-2 ${i === 0 ? "border-[#1d1d1f] bg-[#f5f5f7]" : "border-[#d2d2d7]"}`}>
                  <div className="mb-1">
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded mr-1.5 ${i === 0 ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>
                      {r.label}
                    </span>
                    <span className="text-[15px] font-semibold">{r.service}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-[22px] font-bold text-[#0066cc]">¥{r.price.toLocaleString()}</span>
                    <span className="text-[11px] text-[#6e6e73]">/月</span>
                    <span className="text-[11px] text-[#86868b] ml-2">年間 ¥{(r.price * 12).toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-[#6e6e73]">{r.reason}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
