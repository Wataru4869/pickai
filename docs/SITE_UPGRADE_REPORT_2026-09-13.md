# Site Upgrade — 2026-09-13

## 2026-09-14 Current Update RC 追記

1. **更新したデータ** — 9/10公式発表を根拠にOpenAI Agents APIのfacts/sourceを追加。public beta、全開発者向け、harness・実行環境・長時間session・tool・subagent、API自体の追加料金なし／tokenとtool別課金を登録。無料枠、日本固有料金、GA時期、SLAはunknown。合計78公式sources／25facts。
2. **SEO改善** — GSC 8/15〜9/11で23 impressions・平均8.7位の `/categories/ai-agents` を改善。完成製品、Agents API、モデルAPIを分け、解説・cost・safetyへの内部導線を追加。CTR・順位改善は未測定。
3. **旬コンテンツ** — `/blog/openai-agents-api-guide-2026` 1本だけ追加。9/10公式更新から「何が変わった／誰に関係する／構成の選び分け／導入前検証」まで解説し、ニュース転載や性能順位にしない。
4. **UI/UX** — AIエージェント入口に結論カードを追加。新記事は既存の要点、目次、比較表、公式情報rendererを再利用。全面リニューアルや新管理基盤なし。
5. **Current / Historical** — 現行factsに新スコアを付けず、3月保存評価を変更しない。OpenAIの発表内顧客事例の数値を一般性能として転用しない。
6. **検証** — `npm run check` 成功（78 sources、91 static pages、既存font warningのみ）、`git diff --check`成功。desktop/390/320で2ページの横あふれなし、表は局所横スクロール。sitemap69 URL／ブログ37／重複0／lastmod0、全69 URLと新規内部リンクはローカル200、canonical正常。生成順だけのsitemap差分は除去。
7. **安全性** — affiliate active0／URL0、PR表示なし。x-exp-01のrecommend・UTM・CTA・計測・queueに差分なし。private data、課金、credential、外部投稿、本番操作なし。
8. **Preview対象** — `/categories/ai-agents`、`/blog/openai-agents-api-guide-2026`、`/blog/ai-agents-comparison-2026`、`/blog`。情報の区別、公式根拠、unknown、表の横スクロール、内部CTAを確認。
9. **Revenue寄与** — 既存検索露出がある入口の判断精度と内部回遊を改善。affiliate承認やCVには直接到達しておらず、売上効果はunknown。初CVの最大ボトルネックは引き続き提携承認。
10. **次TOP5** — (1)Preview人間確認、(2)3案件の状態変化確認、(3)最初の承認案件だけ収益導線完成、(4)公開後28日GSC比較、(5)次のCurrent更新はGSC需要＋7日内公式更新が再び交差した1テーマだけ。

実装commit: `7e76f68`。管理文書commitとPreview URLはpush後に追記する。

## 朝用・継続作業サマリー（9月13日調査／14日検証）

以下が現行サマリー。下段は前段の記録。今回の開始HEADは27d7a6d。本番はa363a09のまま。9月13日のsource確認日を14日に偽更新しない。

1. **更新データ** — ChatGPTのWork/Codexモデル案内を通常チャット全プランへ適用しないようfacts訂正。HeyGenの9/9公開「8月更新まとめ」からEdit Look/Real Estateを登録し、White Glove米国限定・日本条件未確認を明示。公式ソース6追加、計77／facts24。Claude無料上限、Gemini個人上限、Perplexity Standard/体験条件も記事根拠として登録。その他主要サービスは同夜のFACTS_AUDITの範囲を継承し、今回全件再取得済みとはしない。
2. **SEO改善** — 既存ChatGPTモデル比較と無料AI比較を本文まで改稿。title/description/h1/導入、公式出典、比較表、内部CTA2件。旧掲載スコアは履歴として保持。/safetyの検索意図を正確性・社内資料・公開条件に分解し、確認手順を追加。新順位・未測定の課金効果を作らない。
3. **旬コンテンツ** — 新規記事0。前段のCursor Projects/Copilot終了2本を保持。9/9公式CLI更新はChatGPT記事で利用経路の区別に使用。HeyGen9/9記事は8月のまとめで、新発売日へ転用しない。需要未確認テーマの新記事は量産しない。
4. **UI/UX** — /blogにローカル検索、種類＋確認状態の絞り込み、0件時リセット、カードの確認範囲表示。明示的な再確認対象12本と過去/未再確認24本を区別。日付だけで「最新」と認定しない。検索語はURL/GA/外部へ送らない。2改稿記事は既存の要点・目次・表・出典rendererで表示。
5. **新規機能候補・更新運用** — `npm run audit:freshness -- 2026-09-13` を追加。公開JSONだけ読み、項目別日付/unknown/未来日/再確認候補をstdoutへ出す。ネットワーク・書込・公開操作なし。30日は編集上の目安で事実の正確性判定ではない。188項目が期間内、47項目unknown、24記事が再確認候補。暦日/nullと0/30日境界/決定性テスト追加。公式RSS差分や検索利用計測は候補に留め、現実験へ追加しない。
6. **Search Console機会** — 前段で直接取得した8/14–9/10データを再利用。今回新たなGoogle操作なし。page単位で/safetyとChatGPTモデル記事はposition6〜20に入る。query/page対応は未検証、Grok query順位を/model/grokへ転用しない。無料比較は誤認是正が理由で、需要上位実証なし。数値はprivateのみ。CTR/売上改善は未測定。
7. **残る古い情報** — Claude/Geminiレビュー、3月の費用節約/データポリシー等24記事は個別改稿未完了。Klingはrobots制限で現在情報取得不可、古いIRのモデルを現行としない。地域価格/Synthesia年額矛盾は未解消。歴史スコア/privacy改定日を保持。recommendは実験凍結。
8. **Preview対象・検証** — /blog検索・絞り込み、ChatGPTモデル比較、無料比較、/safety、/compare、/cost、/model/chatgpt。npm run check（build含む）成功、既存font警告/edge runtime案内のみ。ローカル17ページ×1440/390/320の51画面、絞り込み12/24件・検索・リセット、内部64リンク、節リンク、未知route404、canonical/noindex、sitemap68/ブログ36、JS例外0。外部通信遮断。生成順だけのsitemap差分除去。実機/Vercel今回Preview未検証。
9. **Revenue寄与・安全性** — 誤った課金推奨を減らし、検索入口→条件整理→比較/costへ接続。初CV/売上効果はunknown。affiliate active0/URL0は回帰成功。private追跡0、実験route/UTM/CTA実装/計測/X queue/得点JSONに今回差分なし。本番・投稿・課金・有効化なし。OpenAI Docsスキルに従い公式の利用環境別説明を優先し、通常チャットへの誤った一般化を訂正した。
10. **次TOP5** — (1)今回Previewレビュー・人間公開判断、(2)既存実験と審査通知確認のみ、(3)旧Claudeモデル比較等1本を需要/誤認リスクで選び直す、(4)契約判断に必要な地域条件/矛盾だけ再確認、(5)次回公式7日確認＋鮮度監査の工数記録。新管理画面・自動公開は不採用。

### この継続分の判断と境界

Revenue Impact 1／Time to Revenue unknown／追加支出0・作業時間あり／公式E1・既存GSC E2・改善効果E0／Automation低／Risk中（未公開内容）／Learning2。公開後28日を仮の評価枠に同page/queryを比較する。ランキングやCVRの架空更新なし。既存未コミット管理文書と第2商品文書は保持し、今回のコードcommitへ一括同梱しない。

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
