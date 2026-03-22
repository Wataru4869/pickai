"use client";

import { useState } from "react";

interface TestScore {
  testId: string;
  nameJapanese: string;
  category: string;
  score: number | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  writing: "文章生成",
  coding: "コーディング",
  image: "画像生成",
};

function scoreColor(score: number): string {
  if (score >= 90) return "#1d7d3f";
  if (score >= 70) return "#0066cc";
  if (score >= 50) return "#a0820a";
  return "#c4314b";
}

export function ModelScoreChart({ tests }: { tests: TestScore[] }) {
  const [filter, setFilter] = useState("全て");
  const categories = ["全て", ...Array.from(new Set(tests.map((t) => t.category)))];
  const filtered = filter === "全て" ? tests : tests.filter((t) => t.category === filter);

  // Group by category
  const grouped: Record<string, TestScore[]> = {};
  filtered.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  return (
    <div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 cursor-pointer ${
              filter === c
                ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                : "bg-white border-[#e8e8ed] text-[#6e6e73] hover:bg-[#f5f5f7]"
            }`}
          >
            {c === "全て" ? "全て" : CATEGORY_LABELS[c] || c}
          </button>
        ))}
      </div>

      <div className="space-y-0">
        {Object.entries(grouped).map(([cat, catTests], catIdx) => (
          <div key={cat}>
            {(filter === "全て") && (
              <div className={`text-[12px] font-semibold text-[#86868b] mt-4 mb-2 ${catIdx > 0 ? "pt-3 border-t border-[#e8e8ed]" : ""}`}>
                {CATEGORY_LABELS[cat] || cat}
              </div>
            )}
            {catTests.map((t) => {
              const score = t.score ?? 0;
              const color = scoreColor(score);
              return (
                <div key={t.testId} className="flex items-center gap-3 py-1.5">
                  <span className="w-20 text-[13px] text-[#1d1d1f] shrink-0">{t.nameJapanese}</span>
                  <div className="flex-1 h-2 bg-[#e8e8ed] rounded-full">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(score, 2)}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="w-8 text-right text-[14px] font-semibold" style={{ color }}>
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
