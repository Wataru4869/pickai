"use client";

import { useState } from "react";
import { getModels, getTestsByCategory, scoreColorHex, CATEGORY_LABELS } from "@/lib/data";

const CATEGORIES = ["writing", "coding", "image"];

export function CategoryTabs() {
  const [active, setActive] = useState("writing");
  const models = getModels();
  const tests = getTestsByCategory(active);

  // Calculate averages for this category
  const modelScores = models
    .map((m) => {
      const scores = tests.map((t: any) => t.results[m.id] ?? 0);
      const avg = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0;
      return { ...m, categoryAvg: Math.round(avg * 100) / 100 };
    })
    .sort((a, b) => b.categoryAvg - a.categoryAvg);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-1 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
              active === cat
                ? "bg-[#333333] text-white border-[#333333]"
                : "bg-white border-[#e5e5e5] text-[#666666] hover:bg-[#fafafa]"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Rankings for selected category */}
      <div className="space-y-0">
        {modelScores.map((m, i) => (
          <div
            key={m.id}
            className="flex items-center justify-between py-2.5 border-t border-[#f0f0f0] first:border-t-0"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-semibold text-white"
                style={{
                  backgroundColor: i === 0 ? "#b08d57" : i === 1 ? "#888" : i === 2 ? "#999" : "#ccc",
                }}
              >
                {i + 1}
              </span>
              <span className="text-[13px] font-bold">{m.name}</span>
            </div>
            <span
              className="text-[18px] font-bold"
              style={{ color: scoreColorHex(m.categoryAvg) }}
            >
              {m.categoryAvg}
            </span>
          </div>
        ))}
      </div>

      {/* Individual test scores */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[400px]">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="p-1 text-left font-semibold border-b-2 border-[#e5e5e5] text-[#333333]">
                テスト
              </th>
              {modelScores.map((m) => (
                <th
                  key={m.id}
                  className="p-1 text-center font-semibold border-b-2 border-[#e5e5e5] text-[#333333]"
                >
                  {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map((t: any, ti: number) => (
              <tr
                key={t.testId}
                className={ti % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}
              >
                <td className="p-1 border-b border-[#f0f0f0] font-medium">
                  {t.nameJapanese}
                </td>
                {modelScores.map((m) => {
                  const score = t.results[m.id] ?? 0;
                  const isBest = score === Math.max(...Object.values(t.results as Record<string, number>));
                  return (
                    <td
                      key={m.id}
                      className="p-1 text-center border-b border-[#f0f0f0]"
                      style={{
                        fontWeight: isBest ? 600 : 400,
                        color: scoreColorHex(score),
                        backgroundColor: isBest ? "#f0f5f0" : "transparent",
                      }}
                    >
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
