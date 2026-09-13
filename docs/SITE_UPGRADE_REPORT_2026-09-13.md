# Site Upgrade — 2026-09-13

作業ブランチのみ。production/main/SNS/affiliate/課金/credentialは変更していない。成果は信頼性と送客入口の改善であり、検索順位・売上の改善実績ではない。

## 1. 古い情報を直した箇所

旧10記事のtitle/descriptionで「最新」「最強」等を保存時点の表現へ訂正。本文と記事日付を偽更新しない。9月以前の記事には過去記事注意書き。全主要routeとブログの日付分類はDATE_UX_AUDIT_2026-09-13.md参照。旧本文の全面的事実監査は未完了。

## 2. Current Facts更新

既存12件更新、Manus/Genspark/Midjourney/Ideogramの4件新設。71公式sources/24facts。ChatGPT価格、Cursor Projects、Copilotモデル終了、Gemini Windows、Runway API等を項目別に反映。Canva価格とCursor Teamsなど再確認不能値はnull。全サービスの日本税込価格/地域提供/全モデルは未確認。新規4factsは台帳準備であり現行比較UIへ新カード追加はしていない。根拠と範囲はFACTS_AUDIT_2026-09-13.md。

## 3. 追加した旬コンテンツ

- /blog/cursor-projects-2026 — 9/10公式更新を長期作業/単発作業の判断へ接続。
- /blog/copilot-model-retirement-2026-09 — 9/10公式モデル終了と組織の確認手順。

2記事のみ。性能順位・流行・需要急増は断定しない。想定query/意図/公式URL/収益導線候補はFRESH_CONTENT_PLAN_2026-09-13.md。

## 4. SEO改善

旧10記事metadataとh1に反映されるtitleを訂正。新2記事は既存blog一覧、Article schema、canonical、内部CTA、sitemapへ接続。sitemapは66→68 URL、ブログ34→36件。生成順序だけの差分を除去し、build時刻lastmodは追加なし。独自Comparison schemaや架空FAQは追加しない。

## 5. UI改善

トップの全体一律確認日を項目別確認日の案内へ変更。新記事は既存の要点/目次/節リンク/出典リンクを再利用し、更新記事用の要約・リンクラベルに調整。旧記事注意書きを追加。全面デザイン変更や装飾機能は不要と判断。

## 6. Current / Historicalの分離

歴史スコア・ランキングデータは不変。過去記事の記述を現行購入判断に使わない旨を表示。未確認値は0/無料/低評価にしない回帰テストを維持。/recommend、UTM、CTAロジック、計測、X queueに今回差分なし。shared記事rendererの変更は新記事と9月以前の記事の表示に限定。

## 7. Search Console機会

8/14–9/10の既存データを読み取り。安全性入口、ChatGPTモデル比較、Grok評価/評判、AI agentsが候補。query/pageは別集計で対応未検証。9月13日の改修効果や新記事の検索需要証拠には使わない。数値はGit対象外data/privateのみ。GSC_UPGRADE_OPPORTUNITIES_2026-09-13.md参照。

## 8. 今後自動化可能な更新

公式changelog確認→価格別確認→項目別候補→レビュー→check→人間公開承認の手順を整理。既存validator/候補構造を利用。収集・差分検知・定期実行は未実装で、自動更新できたとは扱わない。まず反復工数を測り、更新の多い公式URLだけ候補生成へ移す。CONTINUOUS_UPDATE_PLAN.md更新。

## 9. 残課題・検証

- Kling取得制限、Canva地域価格、Synthesia年契約表/FAQ不一致、日本条件、旧記事本文は残る。推測で埋めない。
- npm run check成功（validate/revenue/guides/lint/build）。既存font warningとedge runtime案内のみ。
- ローカル16routes×1440/390/320の48画面: 横あふれ/h1/canonical/HTTP/広告リンク確認成功。新記事320px画像も目視確認。
- 抽出内部リンク64件エラーなし、新記事anchor、unknown route404、noindex/sitemap除外を確認。sitemap68/ブログ36、重複・lastmodなし。
- 外部送信を遮断したローカル検証。affiliate active0/URL0は回帰成功、data/private追跡0。今回秘密情報・外部送信・課金処理の追加なし。
- git diff --check成功。Vercel Previewの実表示は別確認。本番検証は未実施（未deploy）。

## 10. commit一覧

- 3dda3da — facts/2新記事/旧記事表示/監査・継続更新文書/回帰テスト/sitemap。
- 本レポートは後続のdocs commitへ収録。既存未コミットの管理文書差分と第2ルート文書は勝手に同梱しない。

## 11. Preview確認対象

トップ、2新記事、ChatGPTモデル比較、/compare、/cost、/safety、/switch、/model/chatgpt。390/320幅で要約・出典・料金周期・unknownと過去記事表示を確認。/recommend・画像/動画のX送客先も凍結確認。公開は人間のcommit指定承認後のみ。

## 12. Revenue目標への寄与

更新に伴う契約判断の誤認を減らし、検索入口から比較・料金・乗換へ自然に送る。既存需要を優先し、記事数・UI新しさ自体を成果にしない。CV/売上効果は未測定。既存実験と承認待ち案件を壊さず将来のCV入口を整える。

## 13. 次の優先5タスク

1. このcommitのPreviewを人間確認、公開可否を判断。
2. 既存実験の実績補足・新通知時の3案件状態確認（追加探索なし）。
3. 需要のあるChatGPTモデル比較1本を公式根拠で改稿。
4. 契約判断に必要な地域価格/公式矛盾/取得不能だけ再確認。
5. 公式更新の次回手動実行と工数記録。自動公開なし。
