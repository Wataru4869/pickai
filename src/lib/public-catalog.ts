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
export type EditorialProfile = {
  type: string;
  summary: string;
  uses: string[];
  suited: string;
  check: string;
};
export const editorialProfiles: Record<string, EditorialProfile> = {
  chatgpt: { type: "対話型AI", summary: "文章、調査、画像など複数の作業を会話から進める候補", uses: ["文章", "調査", "画像", "コード"], suited: "複数の用途を1つのサービスで試したい人", check: "使う機能が選ぶプランで利用できるか" },
  claude: { type: "対話型AI", summary: "文章や資料を読みながら、整理と成果物づくりを進める候補", uses: ["文章", "資料", "調査", "コード"], suited: "長い資料や文章を扱う作業から試したい人", check: "ファイル・機能・利用上限のプラン差" },
  gemini: { type: "対話型AI", summary: "文章、画像、ファイルを含む内容を対話で扱う候補", uses: ["文章", "画像", "調査", "コード"], suited: "複数形式の情報をまとめて確認したい人", check: "地域・アカウント・プランごとの提供条件" },
  grok: { type: "対話型AI", summary: "対話と検索関連の機能を確認できる候補", uses: ["文章", "調査", "検索"], suited: "検索を含む調査手順を比較したい人", check: "利用地域、プラン、出典の確認方法" },
  perplexity: { type: "AI検索", summary: "出典へ戻りながら調べる作業を検討するときの候補", uses: ["検索", "調査", "出典確認"], suited: "情報源をたどる調査を中心に試したい人", check: "引用先と回答内容が一致しているか" },
  copilot: { type: "旧掲載名", summary: "対象製品を確定できていないため、現在の候補選びには使用しません", uses: ["未確認"], suited: "過去の掲載対象を確認する人", check: "対象製品の正式名称" },
};
export const fields = [["current_product", "製品・モデル"], ["provider", "提供元"], ["major_features", "機能"], ["current_plan", "プラン"], ["current_price", "料金・条件"], ["free_plan", "無料プラン"], ["free_trial", "無料体験"], ["availability", "提供状況"]] as const;
function readable(value: unknown): string {
  if (value == null) return "未確認";
  if (Array.isArray(value)) return value.map(readable).join(" / ");
  if (typeof value === "object") return Object.entries(value).map(([k,v]) => `${k === "region_note" ? "地域・税" : k}: ${readable(v)}`).join("\n");
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
  "writing": { title: "文章・資料作成AI", ids: ["chatgpt", "claude", "gemini"], guide: "ai-prompt-templates-2026", checks: ["作りたい成果物と読み手", "参照資料と確認方法", "文章の手直しにかかる時間"] },
  "image-generation": { title: "画像生成AI", ids: ["adobe-firefly", "canva-ai", "leonardo-ai"], guide: "ai-image-generation-2026", checks: ["素材と出力の利用条件", "文字・構図の修正方法", "生成枠と上限到達後の扱い"] },
  "video-generation": { title: "動画生成AI", ids: ["runway", "pika", "heygen", "synthesia"], guide: "ai-video-generation-2026", checks: ["素材・人物の利用許諾", "必要な尺と編集方法", "クレジット消費と書き出し条件"] },
  "coding-tools": { title: "AI開発ツール", ids: ["cursor", "github-copilot", "windsurf"], guide: "ai-coding-tools-2026", checks: ["対応する開発環境", "編集・コマンド実行の許可", "差分レビューとテスト"] },
  "ai-search": { title: "AI検索", ids: ["chatgpt", "claude", "gemini", "grok", "perplexity"], guide: "ai-search-engines-comparison-2026", checks: ["出典と原文の一致", "質問の期間と情報の日付", "確認にかかる手間"] },
  "ai-agents": { title: "AIエージェント", ids: ["openai-agents-api", "deepseek", "qwen", "kimi"], guide: "ai-agents-comparison-2026", checks: ["完成した製品か開発用APIか", "外部操作と費用の承認境界", "実行記録と成果物の確認"] },
};
export type Purpose = keyof typeof purposes;
