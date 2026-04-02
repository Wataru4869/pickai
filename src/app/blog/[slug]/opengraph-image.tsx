import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI選び コラム";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ARTICLE_TITLES: Record<string, string> = {
  "ai-agents-comparison-2026": "AIエージェント比較 2026年版",
  "ai-coding-tools-2026": "AIコーディングツール比較 2026年版",
  "ai-company-guidelines-template-2026": "企業向けAI利用ガイドライン テンプレート",
  "ai-cost-saving-guide-2026": "AIツールのコスト削減ガイド",
  "ai-data-policy-comparison-2026": "AIデータポリシー比較",
  "ai-for-business-writing-2026": "ビジネス文書作成AI活用ガイド",
  "ai-for-non-engineers-2026": "非エンジニア向けAI活用ガイド",
  "ai-free-tier-comparison-2026": "AI無料プラン比較 2026年版",
  "ai-image-generation-2026": "AI画像生成ツール比較 2026年版",
  "ai-privacy-by-usecase-2026": "用途別AIプライバシー比較",
  "ai-prompt-templates-2026": "AIプロンプトテンプレート集",
  "ai-safety-ranking-2026": "AI安全性ランキング 2026年版",
  "ai-tools-2026-trends": "AIツール 2026年トレンド",
  "ai-tools-how-to-choose-2026": "AIツールの選び方 完全ガイド",
  "ai-video-generation-2026": "AI動画生成ツール比較 2026年版",
  "chatgpt-models-comparison-2026": "ChatGPTモデル比較 2026年版",
  "chatgpt-review-2026": "ChatGPTレビュー 2026年版",
  "chatgpt-vs-claude-2026": "ChatGPT vs Claude 徹底比較",
  "chatgpt-vs-grok-2026": "ChatGPT vs Grok 徹底比較",
  "claude-models-comparison-2026": "Claudeモデル比較 2026年版",
  "claude-review-2026": "Claudeレビュー 2026年版",
  "claude-vs-gemini-2026": "Claude vs Gemini 徹底比較",
  "gemini-review-2026": "Geminiレビュー 2026年版",
  "gemini-vs-chatgpt-2026": "Gemini vs ChatGPT 徹底比較",
  "grok-review-2026": "Grokレビュー 2026年版",
  "openclaw-guide-2026": "OpenClaw完全ガイド 2026年版",
  "perplexity-review-2026": "Perplexityレビュー 2026年版",
};

export default async function Image({ params }: { params: { slug: string } }) {
  const title = ARTICLE_TITLES[params.slug] || params.slug.replace(/-/g, " ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif', padding: "60px 80px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", backgroundColor: "#0066cc" }} />
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0066cc", backgroundColor: "#f0f3f7", padding: "4px 16px", borderRadius: "4px", marginBottom: "24px" }}>AI比較コラム</div>
        <div style={{ fontSize: title.length > 20 ? "36px" : "44px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", lineHeight: 1.4, maxWidth: "900px" }}>{title}</div>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#1d1d1f" }}>AI</span>
            <span style={{ fontSize: "20px", fontWeight: 300, color: "#d2d2d7" }}>|</span>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#1d1d1f" }}>選び</span>
          </div>
          <span style={{ fontSize: "14px", color: "#86868b", marginLeft: "8px" }}>aierabi.jp</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
