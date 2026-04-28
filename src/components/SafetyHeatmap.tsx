"use client";

import { useState } from "react";
import { getSafetyTests, scoreColorHex } from "@/lib/data";

const MODELS = ["claude", "chatgpt", "gemini", "grok", "perplexity", "microsoft_copilot"];
const NAMES: Record<string, string> = { claude: "Claude", chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", perplexity: "Perplexity", microsoft_copilot: "Microsoft Copilot" };

const CAT_MAP: Record<string, string> = {
  hallucination: "事実性", privacy: "プライバシー", legal: "著作権", other: "その他",
};

export function SafetyHeatmap() {
  const tests = getSafetyTests();
  const [filter, setFilter] = useState("全て");

  const cats = ["全て", ...Array.from(new Set(tests.map((t: any) => CAT_MAP[t.category] || t.category)))];
  const filtered = filter === "全て" ? tests : tests.filter((t: any) => (CAT_MAP[t.category] || t.category) === filter);

  const scoreBg = (v: number) =>
    v >= 85 ? "#f0f5f0" : v >= 70 ? "#f0f3f7" : v >= 50 ? "#f7f4ef" : "#f7f0f0";

  return (
    <div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-2 py-1 rounded text-[11px] border cursor-pointer ${filter === c ? "border-[#333333] border-2 bg-[#fafafa] text-[#333333] font-bold" : "border-[#e5e5e5] bg-white text-[#666666]"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="p-1 text-left font-semibold border-b-2 border-[#e5e5e5] text-[#333333]">テスト</th>
              {MODELS.map((m) => (
                <th key={m} className="p-1 text-center font-semibold border-b-2 border-[#e5e5e5] text-[#333333]">{NAMES[m]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t: any, i: number) => (
              <tr key={t.testId}>
                <td className="p-1 border-b border-[#e8e8ed] text-[11px]">
                  <span className="text-[#86868b] mr-1">{CAT_MAP[t.category] || t.category}</span>
                  {t.nameJapanese}
                </td>
                {MODELS.map((m) => {
                  const raw = t.scores[m] ?? 0;
                  const score = Math.round(raw / 25 * 100);
                  return (
                    <td key={m} className="p-1 text-center border-b border-[#f0f0f0] text-[11px]" style={{ fontWeight: score >= 85 ? 600 : 400, color: scoreColorHex(score), backgroundColor: scoreBg(score) }}>
                      {score}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
