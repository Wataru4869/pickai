import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI選び - AIツール比較おすすめランキング";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#0066cc",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em" }}>AI</span>
          <span style={{ fontSize: "56px", fontWeight: 300, color: "#d2d2d7" }}>|</span>
          <span style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em" }}>選び</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>
          AIツール比較おすすめランキング
        </div>
        <div style={{ fontSize: "18px", color: "#6e6e73", marginBottom: "32px" }}>
          独自30テスト + 安全性14項目で徹底比較
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { name: "ChatGPT", color: "#10A37F", score: "86.5" },
            { name: "Claude", color: "#6B46C1", score: "73.9" },
            { name: "Grok", color: "#1DA1F2", score: "72.1" },
            { name: "Perplexity", color: "#20B2AA", score: "66.8" },
            { name: "Gemini", color: "#4285F4", score: "60.3" },
          ].map((m) => (
            <div
              key={m.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px 20px",
                border: "1px solid #e8e8ed",
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600, color: m.color, marginBottom: "4px" }}>{m.name}</span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "#1d1d1f" }}>{m.score}</span>
              <span style={{ fontSize: "11px", color: "#86868b" }}>点</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "20px", fontSize: "14px", color: "#86868b" }}>
          aierabi.jp | 2026年最新版
        </div>
      </div>
    ),
    { ...size }
  );
}
