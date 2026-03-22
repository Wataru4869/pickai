"use client";

import { useState } from "react";
import { scoreColorHex } from "@/lib/data";

interface TestScore {
  testId: string;
  nameJapanese: string;
  category: string;
  score: number | null;
}

export function ModelScoreChart({ tests }: { tests: TestScore[] }) {
  const [filter, setFilter] = useState("全て");
  const categories = ["全て", ...Array.from(new Set(tests.map((t) => t.category)))];
  const filtered = filter === "全て" ? tests : tests.filter((t) => t.category === filter);

  return (
    <div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-2.5 py-1 rounded text-[11px] border cursor-pointer transition-colors ${
              filter === c
                ? "border-[#1d1d1f] border-2 bg-[#f5f5f7] text-[#0066cc] font-bold"
                : "border-[#d2d2d7] bg-white text-[#6e6e73]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {filtered.map((t) => {
          const score = t.score ?? 0;
          const width = Math.max(score, 2);
          return (
            <div key={t.testId} className="flex items-center gap-2">
              <div className="w-[72px] text-[11px] text-[#6e6e73] text-right shrink-0 truncate">
                {t.nameJapanese}
              </div>
              <div className="flex-1 h-5 bg-[#f5f5f7] rounded-sm relative overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-300"
                  style={{
                    width: `${width}%`,
                    backgroundColor:
                      score === 100
                        ? "#c8860a"
                        : score >= 90
                        ? "#1a854a"
                        : score >= 70
                        ? "#1a6dcc"
                        : score >= 50
                        ? "#e67700"
                        : "#cc3333",
                  }}
                />
                <span
                  className="absolute right-1.5 top-0 h-full flex items-center text-[11px] font-bold"
                  style={{ color: score > 60 ? "white" : scoreColorHex(score) }}
                >
                  {score}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2.5 mt-2 text-[10px] text-[#86868b]">
        <span>
          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: "#c8860a" }} />
          100点
        </span>
        <span>
          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: "#1a854a" }} />
          90+
        </span>
        <span>
          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: "#1a6dcc" }} />
          70+
        </span>
        <span>
          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: "#e67700" }} />
          50+
        </span>
        <span>
          <span className="inline-block w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: "#cc3333" }} />
          50未満
        </span>
      </div>
    </div>
  );
}
