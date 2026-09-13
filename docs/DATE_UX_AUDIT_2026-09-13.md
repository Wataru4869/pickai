# Date / UX audit — 2026-09-13

目的: 日付による現在性の誤認を減らし、比較読者が契約前の根拠へ戻れるようにする。SEO順位・CV改善は未実証。公開・本番変更なし。

## 対象と分類

`src/app` / `src/components` / `src/data` の日付・最終更新・最新表現を走査。日付の一括置換なし。記事本文と公式factsの新事実調査は別作業。

| 分類 | 対象 | 判断 |
| --- | --- | --- |
| A 現在情報としては古い | 3〜4月更新の既存ブログ26本。無料枠比較、ChatGPT/Claudeモデル比較、コスト節約、OpenClawの安全なバージョン指示等 | 事実の再確認前に更新日を刷新しない。全て現在の推奨とは切り離す。個別本文の妥当性は未検証 |
| B 履歴として保存 | `models/tests/safety/categories/category_*`、`model-details`、`changes` の3月記録、`/evaluations/2026-03` | データは維持。履歴ページはnoindex、sitemap除外。methodology/FAQに過去の保存値であることを明示済み |
| C 文書改定日 | privacyの2026-03-23、各ブログのpublishedAt/updatedAt、管理文書 | 内容未変更の日付は維持。公開日、内容改定日、項目別公式確認日、測定日を混同しない |
| D 誤認を生む日付 | トップの一律「最終確認 2026.09.11」 | 「確認日は項目ごとに表示」へ変更。全サービス一括再確認という誤認を回避 |

9月更新以前の26記事には、今回の再確認前に「最新」「おすすめ」、料金・順位を現在の購入判断へ使わない旨を本文前に追加。本文・公開日・改定日は保存。共通rendererでも9月更新の画像/動画記事には追加されない。旧タイトルの最上級9記事とOpenClawの「最注目」は下記の個別metadata是正を実施。本文一次情報監査は未完了。

## Current / Historical / SEO

- `/`、`/compare`、`/model/*`、用途カテゴリ、cost/safety/switchは現行facts側の表示。旧得点の現行ランキングへの復帰はなし。
- `model-details.json`の旧モデル終了予定等は保存データ。ファイルの存在と現行画面への表示を区別する。
- root layoutは履歴を先頭にしたmetadataが残るが、実験共有範囲のため変更しない。
- sitemapはautoLastmod=false、履歴・旧Copilot・逆順比較を除外する既存条件を維持。既存66 URL/ブログ34件が追加前期待値。新記事2件が完成すれば68 URL/ブログ36件。生成結果の確認は統合checkで行う。
- 比較記事リンク、canonical、OG等の既存RC結果を今回実機検証済みと流用しない。

## 局所UI変更

- トップの確認日ラベルだけ訂正。CTA、順位、実験ページは変更しない。
- 新規2記事は既存ReviewedGuideArticleで表示するallowlist拡張のみ。ニュース要約は記事descriptionを使い、比較表へのリンク文言を「変更点と影響」へ。新しいデザイン/依存なし。
- github.blogを公式出典の厳密host許可リストへ追加。userinfo、port、不明host拒否を維持。
- recommend、UTM、計測、Xキュー、affiliate設定、採点JSONは変更しない。共有legacy rendererの追加注意は古い記事の条件付きのみ。

## 検証と残課題

### 個別metadata是正

次の10記事のtitle/descriptionだけを編集。共通理由は「最新」「最強」「最注目」や順位を現行判断と誤認させないこと。新しい事実を追加せず、元本文の対象月をタイトルに明示。descriptionも旧記録・未再確認と説明。本文の数値・公開日・updatedAtは変更しない。タイトル編集日と本文確認日を混同しないため、編集履歴は本監査の2026-09-13に記録する。

| 記事 | 原題 | 新題 |
| --- | --- | --- |
| ai-data-policy-comparison-2026 | 主要AI 5社のデータ利用ポリシー完全比較【2026年3月最新】 | 主要AI 5社のデータ利用ポリシー比較【2026年3月の記録】 |
| ai-models-spring-2026 | 2026年春・今すぐ使える主要AIモデル最新比較｜GPT-5.4・Gemini 3.1・Claude・Grok | 2026年春の主要AIモデル比較記録｜GPT-5.4・Gemini 3.1・Claude・Grok |
| chatgpt-models-comparison-2026 | ChatGPTのモデル全解説【2026年最新】GPT-5.4・GPT-4o・o1の違いと選び方 | ChatGPTモデルの比較記録【2026年3月】GPT-5.4・GPT-4o・o1 |
| chatgpt-review-2026 | ChatGPT完全レビュー【2026年最新】料金・性能・使い方を徹底解説 | ChatGPTレビューの保存記録【2026年3月】料金・性能・使い方 |
| chatgpt-vs-claude-2026 | ChatGPT vs Claude 徹底比較【2026年最新】どっちを選ぶべき？ | ChatGPT vs Claude 比較の保存記録【2026年3月】 |
| claude-models-comparison-2026 | Claude Opus 4.6 vs Sonnet 4.6 vs Haiku 4.5 完全比較【2026年最新】どのモデルを選ぶべき？ | Claude Opus 4.6・Sonnet 4.6・Haiku 4.5 比較記録【2026年3月】 |
| claude-mythos-guide-2026 | Claude Mythosとは？最強AIが一般公開されない本当の理由【2026年4月】 | Claude Mythos Previewの公開範囲を読む【2026年4月の記録】 |
| claude-review-2026 | Claude完全レビュー【2026年最新】コーディング最強AIの実力 | Claudeレビューの保存記録【2026年3月】コード・文章・安全性 |
| gemini-review-2026 | Gemini完全レビュー【2026年最新】Google統合AIの強みと弱み | Geminiレビューの保存記録【2026年3月】Google連携と用途 |
| openclaw-guide-2026 | OpenClawとは？2026年最注目の自律型AIエージェントを日本語で徹底解説 | OpenClawの仕組みとリスク【2026年3月の解説記録】 |

この是正で古い本文の信頼性が検証されたわけではない。残る比較記事の勝敗表現、費用対効果の断定等は引き続き個別本文監査が必要。

- `npm run test:revenue` と `git diff --check` 成功。
- 新規2記事を含む既存回帰testを拡張。test:guidesの8記事・公式リンク・HTML境界・履歴・広告ゼロ検証は成功。その後currentProducts全件のsource存在を要求する既存assertが失敗（公式facts更新と統合する親担当へ通知）。統合check/build/3幅表示の最終結果は全体レポートへ記載する。部分成功を全体合格と扱わない。
- 旧記事の免責表示は事実訂正の代わりではない。高変動・高リスクの本文から順に一次情報を確認する。
- 一律に最新化せず、読者が確認対象日付を判別できることが目的。収益/CTR改善の実データはunknown。
