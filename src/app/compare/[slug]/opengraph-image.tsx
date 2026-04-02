import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI比較 | AI選び";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MODEL_INFO: Record<string, { name: string; color: string; scores: Record<string, number> }> = {
  claude: { name: "Claude", color: "#6B46C1", scores: { overall: 73.9, writing: 86.4, coding: 94.3, image: 41.0, safety: 93.7 } },
  chatgpt: { name: "ChatGPT", color: "#10A37F", scores: { overall: 86.5, writing: 86.3, coding: 81.3, image: 92.0, safety: 90.5 } },
  grok: { name: "Grok", color: "#1DA1F2", scores: { overall: 72.1, writing: 86.8, coding: 86.3, image: 43.3, safety: 69.3 } },
  perplexity: { name: "Perplexity", color: "#20B2AA", scores: { overall: 66.8, writing: 80.6, coding: 53.3, image: 66.5, safety: 69.1 } },
  gemini: { name: "Gemini", color: "#4285F4", scores: { overall: 60.3, writing: 75.1, coding: 43.3, image: 62.5, safety: 78.4 } },
};

function scoreColor(score: number): string {
  if (score >= 85) return "#3d7a5f";
  if (score >= 70) return "#4a6a8a";
  if (score >= 50) return "#b08d57";
  return "#a05454";
}

export default async function Image({ params }: { params: { slug: string } }) {
  const match = params.slug.match(/^(.+)-vs-(.+)$/);
  if (!match) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", fontSize: "32px", color: "#1d1d1f" }}>AI選び | 比較</div>,
      { ...size }
    );
  }
  const a = MODEL_INFO[match[1]];
  const b = MODEL_INFO[match[2]];
  if (!a || !b) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", fontSize: "32px", color: "#1d1d1f" }}>AI選び | 比較</div>,
      { ...size }
    );
  }
  const categories = [
    { key: "writing", label: "文章" },
    { key: "coding", label: "コード" },
    { key: "image", label: "画像" },
    { key: "safety", label: "安全性" },
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff", fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif', padding: "40px 60px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", backgroundColor: "#0066cc" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f" }}>AI</span>
            <span style={{ fontSize: "24px", fontWeight: 300, color: "#d2d2d7" }}>|</span>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f" }}>選び</span>
          </div>
          <span style={{ fontSize: "14px", color: "#86868b" }}>aierabi.jp</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "40px", fontWeight: 700, color: a.color }}>{a.name}</span>
            <span style={{ fontSize: "48px", fontWeight: 800, color: scoreColor(a.scores.overall) }}>{a.scores.overall}</span>
            <span style={{ fontSize: "14px", color: "#86868b" }}>総合スコア</span>
          </div>
          <span style={{ fontSize: "36px", fontWeight: 300, color: "#d2d2d7" }}>vs</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "40px", fontWeight: 700, color: b.color }}>{b.name}</span>
            <span style={{ fontSize: "48px", fontWeight: 800, color: scoreColor(b.scores.overall) }}>{b.scores.overall}</span>
            <span style={{ fontSize: "14px", color: "#86868b" }}>総合スコア</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          {categories.map((cat) => {
            const sa = a.scores[cat.key];
            const sb = b.scores[cat.key];
            const aWins = sa > sb;
            return (
              <div key={cat.key} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#6e6e73", width: "80px", textAlign: "right" }}>{cat.label}</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: aWins ? a.color : "#86868b", width: "50px", textAlign: "right" }}>{sa}</span>
                <div style={{ display: "flex", flex: 1, height: "24px", gap: "2px" }}>
                  <div style={{ width: `${(sa / (sa + sb)) * 100}%`, backgroundColor: a.color, borderRadius: "4px 0 0 4px", opacity: aWins ? 1 : 0.4 }} />
                  <div style={{ width: `${(sb / (sa + sb)) * 100}%`, backgroundColor: b.color, borderRadius: "0 4px 4px 0", opacity: aWins ? 0.4 : 1 }} />
                </div>
                <span style={{ fontSize: "18px", fontWeight: 700, color: !aWins ? b.color : "#86868b", width: "50px" }}>{sb}</span>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: "13px", color: "#86868b", textAlign: "center", marginTop: "16px" }}>
          独自30テスト + 安全性14項目で徹底比較 | 2026年最新版
        </div>
      </div>
    ),
    { ...size }
  );
}
