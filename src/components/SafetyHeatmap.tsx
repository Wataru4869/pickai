"use client";

import { useState } from "react";
import { getSafetyTests, scoreColorHex } from "@/lib/data";

const MODELS = ["claude", "chatgpt", "gemini", "grok", "perplexity"];
const NAMES: Record<string, string> = { claude: "Claude", chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", perplexity: "Perplexity" };

const CAT_MAP: Record<string, string> = {
  hallucination: "事実性", privacy: "プライバシー", legal: "著作権", other: "その他",
};

export function SafetyHeatmap() {
  const tests = getSafetyTests();
  const [filter, setFilter] = useState("全て");

  const cats = ["全て", ...Array.from(new Set(tests.map((t: any) => CAT_MAP[t.category] || t.category)))];
  const filtered = filter === "全て" ? tests : tests.filter((t: any) => (CAT_MAP[t.category] || t.category) === filter);

  const scoreBg = (v: number) =>
    v >= 90 ? "#edf7f0" : v >= 70 ? "#e8f0fa" : v >= 50 ? "#fff8ed" : "#fef2f2";

  return (
    <div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-2 py-1 rounded text-[11px] border cursor-pointer ${filter === c ? "border-[#1d1d1f] border-2 bg-[#f5f5f7] text-[#0066cc] font-bold" : "border-[#d2d2d7] bg-white text-[#6e6e73]"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-[#f5f5f7]">
              <th className="p-1 text-left font-bold border-b-2 border-[#d2d2d7]">テスト</th>
              {MODELS.map((m) => (
                <th key={m} className="p-1 text-center font-bold border-b-2 border-[#d2d2d7]">{NAMES[m]}</th>
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
                    <td key={m} className="p-1 text-center border-b border-[#e8e8ed] text-[11px]" style={{ fontWeight: score >= 90 ? 800 : 400, color: scoreColorHex(score), backgroundColor: scoreBg(score) }}>
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
