# AI個人情報漏洩記事 公開記録 — 2026-10-14

## 公開URL

- https://www.aierabi.jp/blog/ai-personal-data-leak-cases-2026

## 狙い

- 「AI 個人情報 漏洩」「生成AI 危険性」「ChatGPT 個人情報」「情報漏洩 事例」「AI セキュリティ」の検索意図へ、一次情報と具体的な行動で回答する。
- 既存の「何を入力しないか」「入力後に何をするか」と重複させず、最近の公表事例、漏洩経路、個人・会社の予防、初動を担当する。

## 内容と根拠

- 5経路: 入力、共有、外部連携、サービス・委託先、AIアプリ設計。
- 公表例: 2023年ChatGPT障害、2025年Mixpanel事案、DeepSeekの保存場所・適用法注意。
- 参照: 個人情報保護委員会、IPA、OpenAI、NIST、OWASPの公式情報。確認日2026-10-14。
- 漏洩事例、委託先事案、漏洩発生ではない注意情報を区別し、全ての漏洩をAI原因とは扱わない。

## 導線

- `/safety`、`/blog`、`/blog/ai-data-entered-response-2026`から接続。
- 記事から入力前ガイドと入力後の対処ガイドへ接続。
- 新URLをsitemapへ追加。本番sitemapは103 URL。

## QA / 公開

- `npm run check`: 成功（90 official sources / 125 static pages）。
- `git diff --check`: 成功。
- desktop / 390px: 長い日本語見出し、表、目次、CTA、横幅を確認。blockerなし。
- commit: `093d05c`。
- Preview: `A5X8sCov6tGWK7m9HNehSeQ5jMMv`、Ready。
- Production: VercelのPromote to Production成功を確認。本番記事200、canonical、Article schema、内部リンク、sitemap、裸ドメイン308を確認。

## 次の判定

- 公開後7日または50 impressionsでindex、query、clicks、CTR、average positionを確認する。
- `internal_cta_click`はページ別に確認し、CTA impressionなしの比率をCTRとは呼ばない。
- 公開は流入・滞在・売上改善の実績ではない。
