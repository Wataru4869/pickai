# UI / SEO Upgrade — 2026-09-15

## 目的と範囲

既存のCurrent Factsを、検索・SNS流入者が誤認せず読め、比較後の行動へ進めるようにしたbranch内RC。新しいランキング、記事量産、affiliate有効化、recommend実験変更は対象外。

## 変更

- `/model/*`、`/compare/*`: 表示対象の公式根拠数と最新確認日を表示。料金内訳を改行し、比較・診断・料金・安全性/方法論への次行動を追加。
- global/blog/model/compare metadata: Current Facts中心のtitle・description・OG/Twitterへ訂正。
- 2026年9月以前の未再確認記事: 検索スニペットでも過去記事と明示。本文の日付や保存値は更新していない。
- 旧記事: 現行factsページへのリンクを「詳細スコア」と誤案内していたCTAを訂正し、Article schemaを追加。
- performance: Google Fonts外部requestを削除。Search Console verification metaはNext.js metadataで維持。
- sitemap: 生成後のURLをloc順へ正規化し、ビルドごとの順序差分を防止。

## 検証

- `npm run check`: 成功。78 official sources、revenue/guides/freshness、lint警告0、91 static pages build。
- `git diff --check`: 成功。
- sitemap: 69 URL、ブログ37件、重複0、lastmodなし。
- local crawl: sitemap全件＋内部リンクの94 URL、400以上0件。
- 実画面: `/model/chatgpt` と `/compare/claude-vs-chatgpt` を390px/320pxで確認。横あふれなし。320pxで固有canonical/Twitter title、Google Fonts requestなし。
- affiliate active 0 / URL 0。private/credential差分なし。
- `/recommend`、UTM、CTA、計測、X queue、campaign/post IDのGit差分なし。

## Preview確認対象

- `/`
- `/model/chatgpt`
- `/compare/claude-vs-chatgpt`
- `/blog/chatgpt-review-2026`（過去記事の検索/本文表示）
- `/blog/ai-image-generation-2026`
- `/recommend`（変更していないことの回帰確認のみ）

## 残課題

- SEO/CTA/CV改善効果は未測定。公開後の同期間GSC/GA4で評価する。
- 未再確認の旧記事は内容更新ではなく履歴表示。次の改稿対象はGSC実測で1件ずつ選ぶ。
- A8 3案件は最終確認時点で申込中。承認案件0のため実affiliate URLは未設定。
