"use client";

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
  // Group by category
  const grouped: Record<string, TestScore[]> = {};
  tests.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  return (
    <div className="space-y-0">
      {Object.entries(grouped).map(([cat, catTests], catIdx) => (
        <div key={cat}>
          <div className={`text-[12px] font-semibold text-[#86868b] mt-4 mb-2 ${catIdx > 0 ? "pt-3 border-t border-[#e8e8ed]" : ""}`}>
            {CATEGORY_LABELS[cat] || cat}
          </div>
          {catTests.map((t) => {
            const score = t.score ?? 0;
            const color = scoreColor(score);
            return (
              <div key={t.testId} className="flex items-center gap-3 py-1.5">
                <span className="w-20 text-[12px] text-[#1d1d1f] shrink-0 leading-tight">{t.nameJapanese}</span>
                <div className="flex-1 h-1.5 bg-[#e8e8ed] rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(score, 2)}%`, backgroundColor: color }}
                  />
                </div>
                <span className="w-8 text-right text-[13px] font-semibold shrink-0" style={{ color }}>
                  {score}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
