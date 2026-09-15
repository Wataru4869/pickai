# Safety Content Upgrade — 2026-09-16

## 根拠と目的

- GSC実測（2026-08-16〜09-12）では `/safety` が42 clicks / 702 impressions / CTR 6.0% / 平均8.0位、安全性記事が19 / 178 / 10.7% / 5.3位。2入口で全clickの約80%。
- 検索者の不安を煽るのではなく、入力前の判断、誤入力後の初動、データ設定、会社利用、回答検証へ分ける。
- Revenue Impact 1（流入・信頼・将来の安全な比較導線） / Time to Revenue unknown / Cost 0円・作業時間 / Evidence GSC E2・公式E1・収益E0 / Risk 中（YMYLに近い表現） / Learning 2。

## 実装

- `/safety` を6つの悩み別入口へ変更し、FAQを入力前・誤入力後まで拡張。
- 新規4記事:
  - `ai-what-not-to-enter-2026`
  - `ai-data-entered-response-2026`
  - `ai-training-retention-review-2026`
  - `ai-business-security-checklist-2026`
- 既存 `ai-privacy-by-usecase-2026` を全面再確認。古い固定料金、現在推奨、再現不能スコア、リスクゼロ表現を除去。
- 既存 `ai-safety-mythos-2026` をAnthropic公式時系列に基づき訂正。限定評価と一般利用を分離。
- 安全性記事を共通の再確認済みrendererへ移し、公式host allowlist、Article schema、判断導線を適用。
- 既存比較記事の404 `/model/cursor` を `/categories/coding-tools` へ訂正。

## 公式確認先

- OpenAI Data Controls / Temporary Chat / Chat deletion / Shared links / Business data handling
- Anthropic Privacy Center: model training / consumer deletion
- Google Gemini Apps Privacy Hub / Activity management
- 個人情報保護委員会: 生成AIサービス利用の注意喚起
- 経済産業省: AIの利用・開発に関する契約チェックリスト
- Anthropic: Mythos system cards / cybersecurity evaluation incidents

各記事に直接URLと確認日を掲載。検索結果断片だけを本文根拠にしていない。

## 削除した危険な表現

- 仮名化だけで漏洩リスクをゼロにできる
- 個人は無料版で十分
- 特定の製品・契約を一律に最も安全とする表現
- 3月の独自スコアを現在の推奨理由にする記述
- 未確認の固定料金・認証・保持条件

## 検証

- `npm run check`: 成功（79 official sources / 102 static pages）
- sitemap期待値: 80 URL / ブログ47件 / 重複0 / lastmod 0
- desktop、390px、320pxで `/safety` と安全性6記事を実画面確認。ページ全体の横あふれ0。表は局所横スクロール。
- sitemap全80 URLと内部リンク85件を巡回。404 1件を修正後再確認する。
- affiliate active 0 / URL 0。新規記事CTAは内部リンクのみ。

## 公開後に見るもの

- `/safety` のquery / clicks / impressions / CTR / position
- 新4記事のlanding / engaged sessions / `internal_cta_click`
- `/safety` → 悩み別記事 → 比較・用途ページの遷移
- 法令・契約の個別判断を代行するqueryが流入した場合、断定を増やさず注意書きと専門窓口導線を確認

SEO・CV効果は未実測。公開だけで成功扱いしない。
