import fs from "node:fs";
import path from "node:path";
import { displayFact, type DisplayFact } from "./current-comparison";

// Server-only reader of the existing PUBLIC facts directory. Never read private data or scores.
type Fact = { value: unknown; source_id: string | null; verified_at: string | null };
type Facts = { service_id: string; facts: Record<string, Fact> };
const directory = path.join(process.cwd(), "data/service-facts");
const records: Facts[] = fs.readdirSync(directory).filter(f => f.endsWith(".json")).map(f => JSON.parse(fs.readFileSync(path.join(directory, f), "utf8")));
export const modelNames: Record<string, string> = Object.fromEntries(records.map(record => [record.service_id, displayFact(record.facts.service_name).text]));
modelNames.copilot = "Copilot（旧掲載名）";
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
  cursor: { type: "AI開発ツール", summary: "エディタ・CLI・クラウドエージェントを使い分けて開発を進める候補", uses: ["実装", "修正", "レビュー", "委任"], suited: "コードベースを見ながら複数工程を進めたい人", check: "実行権限、利用モデル、プランごとの上限" },
  "github-copilot": { type: "AI開発ツール", summary: "IDEやGitHub上で補完・チャット・レビューを使う候補", uses: ["補完", "チャット", "レビュー", "CLI"], suited: "既存のGitHub開発フローへAI支援を加えたい人", check: "IDE・組織設定・プランごとの利用機能" },
  windsurf: { type: "AI開発ツール", summary: "旧WindsurfのIDE体験とエージェント管理を引き継ぐ開発環境", uses: ["実装", "計画", "委任", "管理"], suited: "複数作業をエージェントへ分けて管理したい人", check: "名称変更後のプランと既存契約の引継ぎ" },
  "adobe-firefly": { type: "画像・動画生成", summary: "Adobe環境で画像・動画・音声・ベクター生成を検討する候補", uses: ["画像", "動画", "音声", "ベクター"], suited: "制作物をAdobeの編集工程へつなげたい人", check: "モデル別の利用条件と生成クレジット" },
  "canva-ai": { type: "デザイン制作", summary: "テンプレートとAI機能を組み合わせてデザインを仕上げる候補", uses: ["デザイン", "テンプレート", "素材", "SNS"], suited: "生成からレイアウト調整まで同じ画面で進めたい人", check: "AI機能・素材・公開方法のプラン差" },
  "leonardo-ai": { type: "画像・動画生成", summary: "画像生成と編集、モデル学習、動画生成を試す候補", uses: ["画像", "編集", "動画", "モデル学習"], suited: "作風や生成工程を細かく調整したい人", check: "無料生成物の公開範囲とトークン消費" },
  midjourney: { type: "画像生成", summary: "画像の生成・編集とパーソナライズを使う候補", uses: ["画像", "編集", "作風", "構図"], suited: "複数案から視覚表現を詰めたい人", check: "ライブ料金、生成物の公開範囲、利用条件" },
  ideogram: { type: "画像生成", summary: "参照画像と編集機能を使いながら画像を作る候補", uses: ["画像", "参照", "編集", "文字"], suited: "参照素材を使って修正を重ねたい人", check: "ライブ料金とクレジットの消費条件" },
  runway: { type: "動画・画像生成", summary: "AI画像・動画モデルと素材管理を組み合わせる候補", uses: ["動画", "画像", "素材", "編集"], suited: "生成素材を動画制作の工程へつなげたい人", check: "Web製品とAPI、モデルごとの料金差" },
  pika: { type: "動画生成", summary: "テキストや画像から短い動画を作り、要素を差し替える候補", uses: ["動画", "画像から動画", "差し替え", "合成"], suited: "短い映像案を複数試して比較したい人", check: "解像度、機能別クレジット、書き出し条件" },
  heygen: { type: "アバター動画", summary: "アバター動画・翻訳・音声を使った説明動画を作る候補", uses: ["アバター", "翻訳", "音声", "説明動画"], suited: "人物撮影を減らして説明動画を作りたい人", check: "人物・音声の同意とプラン別利用範囲" },
  synthesia: { type: "アバター動画", summary: "テンプレートとAIアバターで業務向け動画を作る候補", uses: ["アバター", "研修", "翻訳", "テンプレート"], suited: "研修や手順説明を一定形式で作りたい人", check: "動画時間、アバター、書き出しのプラン条件" },
  elevenlabs: { type: "音声AI", summary: "音声生成・文字起こし・効果音・吹き替えを扱う候補", uses: ["音声", "文字起こし", "吹き替え", "効果音"], suited: "音声制作を複数工程まとめて試したい人", check: "声の権利、同意、利用範囲、生成上限" },
  manus: { type: "AIエージェント", summary: "タスクを計画し、サンドボックス内で実行して成果物を作る候補", uses: ["計画", "実行", "成果物", "自動化"], suited: "成果物までの複数工程をまとめて任せたい人", check: "操作範囲、承認境界、クレジット消費" },
  "openai-agents-api": { type: "開発用エージェントAPI", summary: "実行環境とツールを選び、長時間タスクを組み込む開発者向けAPI", uses: ["API", "ツール", "長時間処理", "サブエージェント"], suited: "自社サービスへエージェント実行を組み込む開発者", check: "sandbox、外部操作、token・tool費用の承認" },
  deepseek: { type: "開発用モデルAPI", summary: "画像理解を含むモデルをAPIから利用する候補", uses: ["API", "画像理解", "対話", "開発"], suited: "API前提で入力形式と出力を検証したい開発者", check: "日本向け契約、データ取扱い、アプリとの違い" },
  qwen: { type: "開発用モデルAPI", summary: "長い文脈・画像理解・ツール利用をAPIで検討する候補", uses: ["API", "長文", "画像理解", "ツール"], suited: "長い入力やツール連携を検証したい開発者", check: "API snapshotと一般アプリの提供条件を分ける" },
  kimi: { type: "開発用モデルAPI", summary: "長い文脈と画像理解を会話・エージェントへ組み込む候補", uses: ["API", "長文", "画像理解", "エージェント"], suited: "APIで長い資料や画像入力を試したい開発者", check: "日本向け条件と消費者向けアプリとの差" },
  genspark: { type: "プレゼン作成AI", summary: "プレゼンテーションの生成と編集を進める候補", uses: ["資料", "スライド", "編集", "構成"], suited: "たたき台からスライドの構成を整えたい人", check: "モデル・プラン・企業設定による違い" },
  writesonic: { type: "AI検索可視性", summary: "AI検索でのブランド表示状況を追跡する候補", uses: ["可視性", "検索", "計測", "改善"], suited: "AI回答内での自社の見え方を継続確認したい人", check: "取得範囲、計測定義、対象検索サービス" },
  copilot: { type: "旧掲載名", summary: "対象製品を確定できていないため、現在の候補選びには使用しません", uses: ["掲載停止"], suited: "過去の掲載対象を確認する人", check: "対象製品の正式名称" },
};

export type ExperiencePreset = "chat" | "search" | "coding" | "image" | "video" | "audio" | "agent" | "presentation" | "visibility" | "unknown";
const presetById: Record<string, ExperiencePreset> = {
  chatgpt: "chat", claude: "chat", gemini: "chat", grok: "search", perplexity: "search",
  cursor: "coding", "github-copilot": "coding", windsurf: "coding",
  "adobe-firefly": "image", "canva-ai": "image", "leonardo-ai": "image", midjourney: "image", ideogram: "image",
  runway: "video", pika: "video", heygen: "video", synthesia: "video", elevenlabs: "audio",
  manus: "agent", "openai-agents-api": "agent", deepseek: "agent", qwen: "agent", kimi: "agent",
  genspark: "presentation", writesonic: "visibility", copilot: "unknown",
};
export function experiencePreset(id: string): ExperiencePreset { return presetById[id] ?? "unknown"; }

export const categoryForService: Record<string, { href: string; label: string }> = {
  chatgpt: { href: "/categories/writing", label: "文章・資料作成AI" }, claude: { href: "/categories/writing", label: "文章・資料作成AI" }, gemini: { href: "/categories/writing", label: "文章・資料作成AI" },
  grok: { href: "/categories/ai-search", label: "AI検索" }, perplexity: { href: "/categories/ai-search", label: "AI検索" },
  cursor: { href: "/categories/coding-tools", label: "AI開発ツール" }, "github-copilot": { href: "/categories/coding-tools", label: "AI開発ツール" }, windsurf: { href: "/categories/coding-tools", label: "AI開発ツール" },
  "adobe-firefly": { href: "/categories/image-generation", label: "画像生成AI" }, "canva-ai": { href: "/categories/image-generation", label: "画像生成AI" }, "leonardo-ai": { href: "/categories/image-generation", label: "画像生成AI" }, midjourney: { href: "/categories/image-generation", label: "画像生成AI" }, ideogram: { href: "/categories/image-generation", label: "画像生成AI" },
  runway: { href: "/categories/video-generation", label: "動画生成AI" }, pika: { href: "/categories/video-generation", label: "動画生成AI" }, heygen: { href: "/categories/video-generation", label: "動画生成AI" }, synthesia: { href: "/categories/video-generation", label: "動画生成AI" }, elevenlabs: { href: "/categories/video-generation", label: "動画・音声AI" },
  manus: { href: "/categories/ai-agents", label: "AIエージェント" }, "openai-agents-api": { href: "/categories/ai-agents", label: "AIエージェント" }, deepseek: { href: "/categories/ai-agents", label: "AIエージェント・API" }, qwen: { href: "/categories/ai-agents", label: "AIエージェント・API" }, kimi: { href: "/categories/ai-agents", label: "AIエージェント・API" },
  genspark: { href: "/categories/writing", label: "文章・資料作成AI" }, writesonic: { href: "/categories/ai-search", label: "AI検索" },
};
export const fields = [["current_product", "製品・モデル"], ["provider", "提供元"], ["major_features", "機能"], ["current_plan", "プラン"], ["current_price", "料金・条件"], ["free_plan", "無料プラン"], ["free_trial", "無料体験"], ["availability", "提供状況"]] as const;
function readable(value: unknown): string {
  if (value == null) return "—";
  if (Array.isArray(value)) return value.map(readable).join(" / ");
  if (typeof value === "object") return Object.entries(value).filter(([,v]) => v != null).map(([k,v]) => `${k === "region_note" ? "地域・税" : k}: ${readable(v)}`).join("\n");
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
    return [key, { ...displayed, text: displayed.source ? readable(fact?.value) : "—" }];
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
