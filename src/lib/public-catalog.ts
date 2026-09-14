import fs from "node:fs";
import path from "node:path";
import { displayFact, type DisplayFact } from "./current-comparison";

// Server-only reader of the existing PUBLIC facts directory. Never read private data or scores.
type Fact = { value: unknown; source_id: string | null; verified_at: string | null };
type Facts = { service_id: string; facts: Record<string, Fact> };
const directory = path.join(process.cwd(), "data/service-facts");
const records: Facts[] = fs.readdirSync(directory).filter(f => f.endsWith(".json")).map(f => JSON.parse(fs.readFileSync(path.join(directory, f), "utf8")));
export const modelNames: Record<string, string> = { claude: "Claude", chatgpt: "ChatGPT", grok: "Grok", perplexity: "Perplexity", gemini: "Gemini", copilot: "Copilot（旧掲載名）" };
export const pairIds = ["claude", "chatgpt", "grok", "perplexity", "gemini"];
export const fields = [["current_product", "製品・モデル"], ["provider", "提供元"], ["major_features", "機能"], ["current_plan", "プラン"], ["current_price", "料金・条件"], ["free_plan", "無料プラン"], ["free_trial", "無料体験"], ["availability", "提供状況"]] as const;
function readable(value: unknown): string {
  if (value == null) return "未確認";
  if (Array.isArray(value)) return value.map(readable).join(" / ");
  if (typeof value === "object") return Object.entries(value).map(([k,v]) => `${k}: ${readable(v)}`).join(" / ");
  if (value === true) return "あり（対象範囲・上限は公式確認）";
  if (value === false) return "なし（確認時点）";
  return String(value);
}
export function catalogProduct(id: string) {
  const r = records.find(r => r.service_id === id);
  const name = r ? displayFact(r.facts.service_name).text : (modelNames[id] || id);
  const facts = Object.fromEntries(fields.map(([key]) => {
    const fact = r?.facts[key];
    // Do not reuse March/April facts on present-day decision pages.
    const displayed = fact?.verified_at && fact.verified_at >= "2026-09-01" ? displayFact(fact) : displayFact();
    return [key, { ...displayed, text: displayed.source ? readable(fact?.value) : "未確認" }];
  })) as Record<(typeof fields)[number][0], DisplayFact>;
  return { id, name, facts };
}
export const purposes = {
  "image-generation": { title: "画像生成AI", ids: ["adobe-firefly", "canva-ai", "leonardo-ai"], guide: "ai-image-generation-2026", checks: ["素材と出力の利用条件", "文字・構図の修正方法", "生成枠と上限到達後の扱い"] },
  "video-generation": { title: "動画生成AI", ids: ["runway", "pika", "heygen", "synthesia"], guide: "ai-video-generation-2026", checks: ["素材・人物の利用許諾", "必要な尺と編集方法", "クレジット消費と書き出し条件"] },
  "coding-tools": { title: "AI開発ツール", ids: ["cursor", "github-copilot", "windsurf"], guide: "ai-coding-tools-2026", checks: ["対応する開発環境", "編集・コマンド実行の許可", "差分レビューとテスト"] },
  "ai-search": { title: "AI検索", ids: ["chatgpt", "claude", "gemini", "grok", "perplexity"], guide: "ai-search-engines-comparison-2026", checks: ["出典と原文の一致", "質問の期間と情報の日付", "確認にかかる手間"] },
  "ai-agents": { title: "AIエージェント", ids: ["openai-agents-api", "deepseek", "qwen", "kimi"], guide: "ai-agents-comparison-2026", checks: ["完成した製品か開発用APIか", "外部操作と費用の承認境界", "実行記録と成果物の確認"] },
};
export type Purpose = keyof typeof purposes;
