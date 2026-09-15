# Current Data 鮮度監査（2026-09-15）

## 監査範囲と判定

- 公開Current Facts: 25サービス × 各10項目 = 245項目
- 公開記事: 37件
- 合計監査単位: 282件
- 判定窓: 30日。一次情報の再確認は直近7日を優先
- `CURRENT`: 値・公式source・確認日があり、確認日が判定窓内
- `STALE`: 値と根拠はあるが再確認期限超過
- `UNVERIFIED`: 値または現在の公式根拠を確認できない
- `HISTORICAL`: 過去記事・過去テストとして日付を明示して保持
- `CONFLICT`: 未来日、または同じ現在事実の不整合

日付の新しさだけで真偽を保証しません。`CURRENT` は台帳上の確認状態です。未確認は0・無料・非対応を意味しません。

| Status | 件数 |
|---|---:|
| CURRENT | 211 |
| STALE | 0 |
| UNVERIFIED | 47 |
| HISTORICAL | 24 |
| CONFLICT | 0 |
| 合計 | 282 |

内訳はCurrent Factsが `CURRENT 198 / UNVERIFIED 47`、記事が `CURRENT 13 / HISTORICAL 24` です。

## Current Factsと修正対象

Current Factsの正本は `data/service-facts/*.json`、出典台帳は `data/official-sources.json` です。トップ、モデル詳細、比較、用途カテゴリ、料金ページは `src/lib/public-catalog.ts` を介して同じ値を参照します。2026-09-01より前の事実は現在判断ページへ表示しません。

今回、Grok公式料金ページ（2026-09-15確認）から、個人向けプラン、確認できた料金、無料プラン、掲載モデルを更新しました。日本の税込最終価格、SuperGrok Lite / Heavy、法人プランの金額、無料体験は未確認のままです。

主要サービスの既存Current Factsは2026-09-10〜15の公式Pricing / Help / Docs / Product / Release Notesを参照しています。今回の再照合では、ChatGPT、Claude、Gemini、Grok、Perplexity、Cursor、GitHub Copilot、Devin Desktop（旧Windsurf）、Runway、HeyGen、Synthesia、Adobe Fireflyの台帳と現在表示の間に新たな矛盾は確認されませんでした。

## UNVERIFIED一覧（47項目）

- Canva: `current_price`
- ChatGPT / Claude / Cursor / ElevenLabs / Gemini / GitHub Copilot / Grok / Leonardo.Ai / Perplexity / Pika / Synthesia / Devin Desktop（旧Windsurf）: `free_trial`
- DeepSeek / Kimi / Qwen: `current_plan`, `current_price`, `free_plan`, `free_trial`
- Genspark: `provider`, `current_plan`, `current_price`, `free_plan`, `free_trial`
- Ideogram: `provider`, `current_plan`, `current_price`, `free_trial`, `current_product`
- Manus: `provider`, `current_price`, `free_trial`
- Midjourney: `provider`, `free_plan`, `free_trial`, `availability`
- OpenAI Agents API: `free_plan`, `free_trial`
- Runway: `current_price`, `free_trial`
- Writesonic: `free_plan`

日本語対応、usage limit、画像・動画・音声、Web検索、Deep Research、coding、API、team/business、外部連携、ファイル、context/token、地域は現在の10項目スキーマでは独立列ではありません。公式に確認できた範囲だけ `major_features` / `availability` / `current_plan` に含みます。記載がないものを非対応と判定せず、比較時の追加確認項目とします。

## HISTORICAL一覧（24記事）

以下は大量削除せず、メタデータと記事冒頭で過去記事・最終更新日・現在判断に使わないことを明示して保持します。

- `ai-agents-vs-claude-code-2026`
- `ai-company-guidelines-template-2026`
- `ai-cost-saving-guide-2026`
- `ai-data-policy-comparison-2026`
- `ai-for-business-writing-2026`
- `ai-for-non-engineers-2026`
- `ai-models-spring-2026`
- `ai-privacy-by-usecase-2026`
- `ai-prompt-templates-2026`
- `ai-safety-mythos-2026`
- `ai-search-ranking-2026q2`
- `ai-tools-how-to-choose-2026`
- `chatgpt-review-2026`
- `chatgpt-vs-claude-2026`
- `chatgpt-vs-grok-2026`
- `claude-models-comparison-2026`
- `claude-mythos-guide-2026`
- `claude-review-2026`
- `claude-vs-gemini-2026`
- `gemini-review-2026`
- `gemini-vs-chatgpt-2026`
- `openclaw-guide-2026`
- `perplexity-review-2026`
- `pikastream-guide-2026`

## STALE / CONFLICT

- STALE: 0件
- CONFLICT: 0件
- Synthesiaの年契約表示は公式ページ内の表とFAQに不一致があったため、既存方針どおりCurrent Factsへ採用せず、月払いだけを表示しています。

## 表示と運用

- `/compare` の用途カード・代表比較カードは優劣や未検証性能を断定せず、Current Factsで確認する観点だけを案内します。
- 料金、モデル、無料条件をページへ重複直書きせず、Current Factsから表示します。
- 過去スコアは `/evaluations/2026-03` と日付付き記事に限定し、Current Factsへ移しません。
- 再監査は `npm run audit:freshness -- 2026-09-15 30`。出力は公開JSONだけを読み、外部通信・書込・公開を行いません。
