import chatgpt from "../../data/service-facts/chatgpt.json";
import claude from "../../data/service-facts/claude.json";
import gemini from "../../data/service-facts/gemini.json";
import deepseek from "../../data/service-facts/deepseek.json";
import qwen from "../../data/service-facts/qwen.json";
import kimi from "../../data/service-facts/kimi.json";
import cursor from "../../data/service-facts/cursor.json";
import copilot from "../../data/service-facts/github-copilot.json";
import devin from "../../data/service-facts/windsurf.json";
import sources from "../../data/official-sources.json";

// Explicit public-facts allowlist. Never load private files or legacy scores here.
type Fact = { value: unknown; source_id: string | null; verified_at: string | null };
type Record = { service_id: string; last_verified_at: string; facts: { [key: string]: Fact } };
export type ComparisonGroup = "chat" | "api" | "coding";
export type DisplayFact = { text: string; date: string | null; source: string | null };
export type CurrentProduct = {
  id: string; name: string; group: ComparisonGroup; monogram: string; guide: string;
  question: string; provider: DisplayFact; product: DisplayFact; features: DisplayFact;
  price: DisplayFact; free: DisplayFact; availability: DisplayFact; date: string;
};
export const groupLabels = { chat: "文章・調査", api: "モデルAPI", coding: "開発ツール" };
export function displayFact(fact?: Fact): DisplayFact {
  if (fact?.value == null || !fact.source_id || !fact.verified_at) return { text: "未確認", date: null, source: null };
  const source = sources.sources.find(s => s.source_id === fact.source_id);
  if (!source) return { text: "未確認", date: null, source: null };
  const url = new URL(source.url);
  if (url.protocol !== "https:" || url.username || url.password || url.port) return { text: "未確認", date: null, source: null };
  const v = fact.value;
  const text = typeof v === "boolean" ? (v ? "無料プランあり（制限・対象条件は公式確認）" : "無料プランなし")
    : Array.isArray(v) ? v.join(" / ") : typeof v === "object" ? Object.entries(v).map(([k,v]) => `${k}: ${v}`).join(" / ") : String(v);
  return { text, date: fact.verified_at, source: source.url };
}
const definitions: { record: Record; name: string; group: ComparisonGroup; monogram: string; question: string }[] = [
  { record: chatgpt, name: "ChatGPT", group: "chat", monogram: "Ch", question: "調査やファイル作業を、会話から進めたい？" },
  { record: claude, name: "Claude", group: "chat", monogram: "Cl", question: "文章を練り直したり、成果物を作りたい？" },
  { record: gemini, name: "Gemini", group: "chat", monogram: "Ge", question: "ファイルや画像を含む内容を調べたい？" },
  { record: deepseek, name: "DeepSeek", group: "api", monogram: "Ds", question: "自分のアプリから画像対応モデルを呼び出したい？" },
  { record: qwen, name: "Qwen", group: "api", monogram: "Qw", question: "長い入力やツール利用をAPIで比較したい？" },
  { record: kimi, name: "Kimi", group: "api", monogram: "Ki", question: "長文・画像を扱うエージェントの候補を探したい？" },
  { record: cursor, name: "Cursor", group: "coding", monogram: "Cu", question: "エディタとCLIを行き来して開発したい？" },
  { record: copilot, name: "GitHub Copilot", group: "coding", monogram: "Gh", question: "IDEからGitHubの開発作業につなげたい？" },
  { record: devin, name: "Devin Desktop", group: "coding", monogram: "De", question: "旧WindsurfのIDEとエージェント管理を確認したい？" },
];
export const currentProducts: CurrentProduct[] = definitions.map(({record:r,...d}) => ({
  ...d, id:r.service_id, date:r.last_verified_at,
  guide: d.group === "api" ? "/blog/ai-tools-2026-trends" : d.group === "coding" ? "/blog/ai-coding-tools-2026" : "/blog/ai-search-engines-comparison-2026",
  provider:displayFact(r.facts.provider), product:displayFact(r.facts.current_product), features:displayFact(r.facts.major_features),
  price:displayFact(r.facts.current_price), free:displayFact(r.facts.free_plan), availability:displayFact(r.facts.availability),
}));
