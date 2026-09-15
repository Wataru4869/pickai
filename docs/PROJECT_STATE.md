# PROJECT STATE

## 現行サマリー — 2026-09-16 SEO流入→判断導線 Production

- 人間の明示承認により、Preview `AecwyZeBcP1fkAc4G3NM1NTXrYiB`（source commit `6f5b450`）を既存VercelプロジェクトでPromote to Productionした。Production deploymentは `9EyjyEj2AV1DpgmE5nnHM4obuiSn`、2026-09-16 01:07:29 JST開始、43秒でReady。
- 本番の `/`、`/blog`、比較記事、比較詳細、`/model/grok`、`/recommend` はすべて200。`aierabi.jp` は `www.aierabi.jp` へ308。主要canonical、favicon、production-only GA tagを確認した。
- sitemapは76 URL／ブログ43件／重複0／lastmod 0。build時刻だけで全ページを更新扱いにする処理はない。
- affiliate active 0 / URL 0を維持。`/go/dmm-generative-ai-camp` は200の保留画面で外部redirectなし。SNS投稿、affiliate有効化、追加申請、main merge、環境変数・DNS変更は行っていない。
- 公開した内部CTA/recommend eventのGA4受信とSEO/CV効果は未確認で、実績扱いしない。通常AI Distributionは `@AI_erabi`。旧Xの数値・UTM・承認を流用しない。
- 最大Revenueボトルネックは承認済みaffiliate案件0件。次は実CVを生成せずGA4の新event受信を確認し、A8 3案件は状態変化時だけ最初の1件を収益テストへ進める。

## 現行サマリー — 2026-09-15 SEO流入→判断導線RC（branchのみ）

- GSCで既存上位候補を追加確認した。`/blog/chatgpt-models-comparison-2026` は直近28日で 4 clicks / 62 impressions / CTR 6.5% / 平均7.2位、`/categories/ai-agents` は 1 / 23 / 4.3% / 8.7位。表示されたquery内訳は匿名化・少数で、本文を特定queryへ書き換える根拠には不足していた。
- 新記事は増やさず、検索・AI Assistant流入を用途・比較・料金へ接続する既存画面を改善した。再確認済み記事の冒頭にテーマ別の次行動、ブログ一覧に用途入口、トップの各AIに具体的な比較相手を表示し、既存 `internal_cta_click` で遷移を識別できる。
- ブログ一覧の初期表示を「現在の選び方」に変更し、再確認済みのOpenAI Agents API記事が誤って対象外だった分類不具合を修正した。過去・未再確認記事は削除せず明示的な絞り込み内に保持する。
- model / compare / safety / 用途ページに可視パンくずと `BreadcrumbList` schemaを追加。比較詳細の最初の次行動は、無関係な検索AI記事ではなく比較選択画面へ戻すよう訂正した。
- 主要modelページの上部CTAを汎用 `/compare` だけにせず、ChatGPT↔Claude、ChatGPT↔Gemini、ChatGPT↔Grok、ChatGPT↔Perplexityの既存比較へ直接進めるようにした。別候補を選ぶ入口も残し、人気・勝敗の主張は追加していない。
- `npm run check` 成功（79 sources / 98 pages）、sitemap 76 URL・lastmod 0。ローカルproduction buildの全76 URLは200。`git diff --check` 成功。affiliate active 0 / URL 0、ランキング・Current Facts・`/recommend`・UTM・X queueは変更していない。
- SEO/CV効果は未計測。model直通比較を含むcommit `eb3ed21` まで `work/aierabi-revenue-engine` へpush済み。Vercel Previewの生成・表示状態はブラウザ権限で確認できずunknown。本番未deploy。最大Revenueボトルネックは承認済みaffiliate案件0件のまま。

## 現行サマリー — 2026-09-15 Analytics改善RC（branchのみ）

- GSCで `ai 正確性 ランキング` → `/safety`（54 impressions / 0 clicks / 9.6位）、`grok 評判` → `/model/grok`（13 / 0 / 13.3位）を直接確認し、該当2ページのtitle・導入・判断導線だけを改善した。数値は8/16〜9/12の実測で、改善効果ではない。
- 個人情報を扱わない固定eventとして `internal_cta_click`、`recommend_start`、`recommend_complete`、`recommend_result_view` を追加。既存UTM/post/campaign伝播、affiliate設定、ランキングは変更していない。未deployのためevent実績はunknown。
- 404復帰画面を追加。現在のsitemap 76 URLはローカル巡回で400以上0件。GA4で観測された過去404の正確なpathはunknownで、推測redirectは追加していない。
- プライバシーポリシーを計測内容と同期。独自イベントは固定ID/pathだけを許可し、氏名・メール・自由入力・個人識別子を送らない。
- `npm run check` 成功（79 sources / 98 pages）、sitemap 76 URL／ブログ43件／lastmod 0、`git diff --check`成功。localではGA tag 0を実画面確認。affiliate active 0 / URL 0。
- 本番、main、SNS、affiliate、Google設定は変更なし。最大ボトルネックは承認済みaffiliate案件0件。次はPreview確認と、本番反映を行う場合のGA受信確認を別承認で行う。

## 現行サマリー — 2026-09-15 Analytics Review

- GSC実測（8/16〜9/12）: 76 clicks / 1,610 impressions / CTR 4.7% / 平均17.2位。`/safety` 42/702/8.0、安全性過去記事19/178/5.3で、両入口が全clickの約80%。
- GA4実測（8/18〜9/14）: 295 sessions / 148 engaged / engagement rate 50.17% / 平均41秒。Organic Search 175 sessions、AI Assistant 15 sessions。AI Assistantは11 engaged・73.33%・平均4分17秒だが小標本。
- key events 0、GA revenue ¥0。affiliate active 0のため収益導線の失敗率ではない。affiliate click・内部CTA・recommend開始/結果は未取得。
- Direct 86 sessionsのengagement rate 15.12%、landing `(not set)` 14、Unassigned 11、過去7日404 title 6 views。原因は未確認。9/15 production-only GA化より前のQA混入可能性も残る。
- query→page対応と404 pathを確定後、既存1ページ目のCTR、Grok既存ページ、最小ファネル計測を優先する。新UI・新6記事の効果は観測期間外でunknown。
- Google設定、コード、本番、SNS、affiliateを変更していない。詳細: [ANALYTICS_REVIEW_2026-09-15.md](ANALYTICS_REVIEW_2026-09-15.md)。

## 現行サマリー — 2026-09-15 SEO比較コラム batch（branchのみ）

- 高意図の比較クラスターを6本追加: ChatGPT/Perplexity、Cursor/GitHub Copilot、Cursor/Windsurf（現Devin Desktop）、HeyGen/Synthesia、Runway/Pika、Midjourney/Adobe Firefly。
- 各記事は結論→早見表→用途別判断→同条件の試し方→公式情報の順。性能順位・人気・体験談・CVを作らず、日本税込額や未確認料金はunknownとして本文に明記した。
- CTAは既存の比較・カテゴリ・ガイドへの内部リンクだけ。affiliate active 0 / URL 0。`/recommend`、UTM、計測、X queue、既存実験には差分なし。
- exact queryのGSC需要は未確認。既存カテゴリ需要と購入前比較意図に基づくE0仮説であり、公開後28日を暫定枠にpage/query単位で評価する。
- `npm run check`成功（79 sources / 98 pages）、`git diff --check`成功。sitemap期待値76 URL／ブログ43件／lastmod 0。local 76 URLは400以上0件。6記事を320px、代表記事を390pxで確認し全体横あふれ0。
- 変更はbranch commit `7b294c9` に整理済み。未push・未deploy。通常AI Distributionは `@AI_erabi`、旧 `@tetoteto_ai` の実績・UTMは流用しない。
- 詳細: [SEO_CONTENT_BATCH_2026-09-15.md](SEO_CONTENT_BATCH_2026-09-15.md)。最大のRevenueボトルネックは承認済みaffiliate案件0件で変わらない。

## 現行サマリー — 2026-09-15 Compare UX / Current Data 本番反映

- 人間の明示承認により、Preview `DvVsAdYfojrcXus1ydFroNm4SWxh`（commit `de2e3fe`）をVercelのPromote to Productionで昇格。Production deploymentは `9uptEPBk8aUtdSgzzjQfM39fc1Lp`、2026-09-15 21:10:56 JST、Ready。
- `/compare` は用途→代表3比較→2候補選択→全一覧の順で本番表示。Grokは9月15日確認の公式料金ページに基づくモデル・個人プラン・明示価格・無料枠へ更新し、未確認値は補完していない。
- 本番の主要7ページは200、`aierabi.jp`→`www.aierabi.jp`は308。canonical正常。sitemapは70 URL／ブログ37件／重複0／lastmod 0。
- affiliate active 0 / URL 0を維持。`/go/dmm-generative-ai-camp` は広告遷移を行わない保留状態。環境変数、DNS、main、SNS投稿、affiliate申請・有効化は変更していない。
- 25サービス245 facts＋37記事＝282単位の監査値は CURRENT 211 / STALE 0 / UNVERIFIED 47 / HISTORICAL 24 / CONFLICT 0。CURRENTは確認記録であり、性能や将来の正確性の保証ではない。
- 通常AIのDistributionは新方針により `@AI_erabi`。旧 `@tetoteto_ai` のx-exp-01はHistoricalとして保持し、新baseline・UTM・実績へ流用しない。今回のreleaseでrecommend、UTM、CTA、計測、X queueは変更していない。
- 詳細: [DATA_FRESHNESS_AUDIT_2026-09-15.md](DATA_FRESHNESS_AUDIT_2026-09-15.md)。最大ボトルネックは承認済みaffiliate案件0件。

## 現行サマリー — 2026-09-15 Compare UX / Current Data RC（branchのみ）

- `/compare` を「用途から比較 → 代表3比較 → 2サービス選択 → 全組み合わせ」の判断順へ再設計。総合点・順位は使わず、クリック前に比較理由、各候補に向く使い方、確認する違いを表示する。
- 公開Current Facts 25サービス245項目と記事37件を統一監査。合計282単位は CURRENT 211 / STALE 0 / UNVERIFIED 47 / HISTORICAL 24 / CONFLICT 0。CURRENTは30日内の公式source記録であり、内容の永続的正確性を保証しない。
- 直近7日の公式情報を起点に主要サービスを再照合し、今回更新が必要だったGrokだけを公式料金ページのモデル・プラン・確認できた料金・無料枠へ更新。日本税込額、未掲載プラン額、無料体験はunknownを維持。
- Current Factsの正本 `data/service-facts/*.json` → `src/lib/public-catalog.ts` → top/model/compare/category/cost の流れを維持。旧記事24件は日付を偽更新せず、検索metadataと本文冒頭でHistoricalと明示する。
- 実ブラウザでdesktop/390px/320pxのcompare上部・カード・セレクタ・詳細遷移を確認。主要7画面は320pxで横あふれなし。sitemap 70 URLをlocal巡回し全件200。
- `npm run check` 成功（79 official sources、92 static pages）、`git diff --check`成功。affiliate active 0 / URL 0。recommend、UTM、CTA、計測、X queue、campaign/post IDは差分なし。
- 現在の変更は未commit・未push・未deploy。本番はcommit `399de3c`。未追跡 `docs/REVENUE_ENGINE_2_OPPORTUNITY.md` は別作業として保持し、今回差分へ含めない。
- 詳細: [DATA_FRESHNESS_AUDIT_2026-09-15.md](DATA_FRESHNESS_AUDIT_2026-09-15.md)。最大ボトルネックは引き続き承認済みaffiliate案件0件。

## 現行サマリー — 2026-09-15 全面UX/UI RC本番反映

- 人間の明示承認により、Preview `BBwNktAaXncBcCB1NkJdJtwcE9Hu`（commit `399de3c`）をVercelのPromote to Productionで昇格。Production deploymentは `FDMbSRzaPmG143qBHp3i93NrksXS`、2026-09-15 14:18:32 JST、Ready。
- 既存のProduction環境・ドメイン・環境変数・DNSは変更していない。main merge、SNS投稿、affiliate有効化、追加申請、課金、credential操作なし。
- 本番sitemap 70 URLを巡回し全件200。ブログ37件、重複0、lastmod 0。`aierabi.jp` → `www.aierabi.jp` は308。主要10ページのcanonical、新トップ文言、favicon、`/categories/writing`を確認。
- affiliate active 0 / URL 0。本番HTMLのaffiliate系外部URL 0。`/go/dmm-generative-ai-camp`は200の保留画面でLocationなし。
- x-exp-01のUTM付き `/recommend` は200でqueryを保持。投稿・UTM・CTA・計測コードは不変だが、14:18:32 JST以降はサイトUIが変わったため、前後データを同一条件として混ぜない。
- 現在の最大ボトルネックは承認済みaffiliate案件0件。UX改善によるCTR/CV効果は未計測で、売上実績とは扱わない。

## 現行サマリー — 2026-09-15 全面UX/UI・情報設計RC

- branch上で、初訪問者が `用途 → 候補 → 比較 → 料金・注意点 → 試す` の順で進める日本語AI選択サービスへ改修。ナビを「はじめる / 比較する / 目的から探す / 知る / 信頼情報」に再編した。
- トップ、用途一覧、個別AI、比較、料金、記事の共通表示を結論先行へ変更。文章・資料の正規用途 `/categories/writing` を追加。英語装飾ラベルを日本語化し、日本語font stack、本文16px/1.75、共通カード/CTA/focusを整備。
- public factsは25サービス、公式根拠付き196項目、unknown 49項目、確認済みで30日超0。記事37件中13件は9月再確認済み、24件はHistorical表示を維持。新しいスコア・順位・料金の推測更新なし。
- 実ブラウザでdesktop/tablet/390px/320pxを確認。主要8画面に全体横あふれなし。モバイルメニュー、Esc、トップ比較選択、UTM付きrecommend完了と下流3リンクへの伝播を確認。
- sitemap期待値70 URL／ブログ37件／lastmodなし。最終production buildは92ページを生成し、sitemap 70 URLとそこから抽出した内部リンク83件で400以上0件。affiliate active 0 / URL 0。
- `npm run check`、競合停止後の再`npm run build`、`git diff --check`は成功。canonical、正規ページのindex可否、x-exp-01 UTM付きURLの200応答をproduction-modeのlocal serverで確認した。
- x-exp-01の投稿・UTM名・計測実装・CTAリンク・queueは無変更。recommendの可視スタイル変更はbranchのみ。本番条件を維持するため、公開する場合は現行実験の区切り後に別コホートとして扱う。
- 本番deploy、main merge、push、SNS投稿、affiliate有効化、課金、credential操作なし。未追跡 `docs/REVENUE_ENGINE_2_OPPORTUNITY.md` は別作業として保持。
- 実装と管理文書はローカル作業branchへ2つの論理commitとして整理済み。remote push・Preview作成は未実施。
- 詳細: [UX_UI_REDESIGN_2026-09-15.md](UX_UI_REDESIGN_2026-09-15.md)。最大ボトルネックは承認済みaffiliate案件0件で、UX改善の売上効果も未実測。

## 現行サマリー — 2026-09-15 UI / SEO Upgrade RC

- 作業branchだけで、検索・SNSから入った利用者が現行factsを確認し、比較・診断・料金・安全性へ進める導線を改善。`/model/*` と `/compare/*` は、表示項目の公式根拠数・最新確認日と、判断を続ける4つの内部導線を表示する。順位・推奨・新スコアは追加していない。
- 複数料金を1行へ詰めていた表示を改行し、390px/320pxでも横あふれなしを実画面確認。compare固有canonical・title・Twitter metadataも確認済み。
- 全体metadataをCurrent Facts中心へ訂正。未再確認の旧記事は検索結果用title/descriptionでも過去記事と明示し、記事CTAの誤った「詳細スコアを見る」を現行の機能・料金・提供条件比較へ訂正。一般記事にも可視本文と一致するArticle schemaを追加。
- Google Fontsへの外部読込を削除し、OS標準日本語フォントを使用。Search Console確認metaはNext.js metadataへ移行。lint警告は0になった。
- sitemap生成後のURL順を決定的に整列する処理を追加。現行期待値は69 URL／ブログ37件、重複0、lastmodなし。全69 URLと内部リンクを含む94 URLをクリーンなlocal serverで巡回し、400以上0件。
- sitemap除外済みの旧 `/category/*` はnoindex/followへ統一し、比較ペアの逆順URLも正規順canonical＋noindex/followにした。正規カテゴリ・正規比較URLはindex対象のまま。
- `npm run check` 成功（78 official sources、91 static pages）。`git diff --check` 成功。affiliate active 0 / URL 0。`/recommend`、UTM、CTA、計測、X queue、campaign/post IDは差分なし。x-exp-01本番条件は維持。
- 本番deploy、main merge、push、SNS投稿、affiliate有効化、課金、credential操作なし。未追跡 `docs/REVENUE_ENGINE_2_OPPORTUNITY.md` は別作業として保持し、今回差分へ含めない。

## 現行サマリー — 2026-09-15 ローカル実動QA

- `work/aierabi-revenue-engine` の既存ローカル環境を起動し、過去のPreview記録ではなく実画面でトップの2候補比較と、UTM付き `/recommend` の職種→用途→予算→結果→model/compare/cost導線を確認した。実装されていないrecommend内イベントは引き続きunknown。
- 利用・収益判断を妨げる再現可能な問題を2件だけ局所修正した。(1) localhost/Previewでも本番GAを読み込む状態を、`VERCEL_ENV=production` の場合だけ読み込むよう変更。(2) 現行比較トップ `/` を「総合の保存評価」と案内していたsidebar/footerを「ツール・モデル比較」に訂正。ランキング、CTA、UTM、affiliate設定は変更していない。
- 主要9画面から抽出した内部リンク96件はローカルで全件400未満。未承認DMMの `/go/dmm-generative-ai-camp` は200の保留画面で、redirect/PR表示なし。affiliate active 0 / URL 0を既存テストで確認。
- `npm run check` 成功: 78 sources、収益集計、ガイド/履歴/facts回帰、鮮度、lint、91 static pages build。既存のGoogle Fonts lint警告のみ。production-modeではGAあり、通常localではGAなしをHTMLで確認。`git diff --check` は終了時に再確認する。
- 実画面証跡は `docs/qa/2026-09-15/`。desktopに加え390px・320pxでrecommendを完了し、トップでChatGPT/Claudeの比較を選択。両幅ともdocument/bodyのscrollWidthがclientWidthと一致し、ページ全体の横あふれなし。viewport設定は確認後に解除した。
- 変更はローカルRC `6c18bb9` にcommit済み。push、Preview/本番deploy、SNS投稿、affiliate有効化、提携申請、課金、credential操作は行っていない。x-exp-01の本番条件は不変。

## 現行サマリー — 2026-09-14 AIエージェントCurrent Update RC

- GSC実測（8/15〜9/11）の `/categories/ai-agents` 23 impressions・平均8.7位と、OpenAIの9/10公式Agents API発表が交差するため、需要未確認の記事量産ではなく1テーマだけbranchで更新。
- `OpenAI Agents API` のpublic factsを新設。全開発者向けpublic beta、harness、実行環境、長時間session、tool、subagent、API自体の追加料金なし・token/tool別課金を9/14確認として登録。無料枠、日本固有料金、GA時期、SLAはunknown。
- `/categories/ai-agents` にAgents APIを追加し、完成品／エージェント基盤／モデルAPIを分離。新記事 `/blog/openai-agents-api-guide-2026` は何が変わったか、対象者、構成の選び分け、権限・費用・復旧の検証手順を掲載。性能順位・トレンド・収益効果は断定しない。
- `npm run check` 成功（78 sources、91 static pages）。69 sitemap URL／ブログ37件、重複・lastmod 0。全69 URLと新規内部リンクはローカル200。desktop・390px・320pxで横あふれなし、表は局所横スクロール。canonical正常、PR表示なし、affiliate active0/URL0。
- x-exp-01の `/recommend`、UTM、CTA、計測、queueは無変更。本番a363a09を維持し、main merge、production deploy、SNS投稿、affiliate有効化、課金、credential操作なし。

## 現行サマリー — 2026-09-14 収益優先確認

- 追加確認: A8を再読み込みすると再認証画面へ遷移したため、この操作時点の審査状態はunknown。credentialは扱わず、同日07:38 JSTに直接確認した3件「申込中」を最終確認値として保持する。承認済みとは解釈しない。
- Search Consoleの直近28日（8/15〜9/11）を再確認。78 clicks / 1,607 impressions / CTR 4.9% / 平均17.2位。`/safety` 43/711/8.0、ChatGPTモデル比較4/59/7.4、AI agentsカテゴリ1/23/8.7。前2件は既存branch改善を維持し、AI agentsカテゴリだけ製品/APIの区別と内部リンクを局所改善。小標本のためSEO効果・CV寄与は未実証。
- ChromeのA8「申込中プログラム」で、DMM生成AI CAMP、Winスクール、デジタルハリウッドSTUDIO by LIGの3件がすべて申込中であることを再確認。承認・否認・追加対応の表示はなく、広告URL発行や掲載条件確認へは進んでいない。会員画面の観測原本はGit対象外 `data/private/a8-status-2026-09-14.local.json`。
- 初CVの最大ボトルネックは提携承認済み案件が0件であること。DMMの非公開draft、directリンク、PR表示、対象ページ、人間有効化のゲートは既に準備済みで、追加実装は承認後の案件固有条件確認まで行わない。
- GSCの前回実測は2026-08-14〜09-10。今回の8/15〜9/11再確認で `/categories/ai-agents` は23 impressions・平均8.7位。query/page対応は未確認で、affiliate承認待ちを上回る収益優先度とは判断しない。
- 2026-09-14基準の30日鮮度監査ではpublic factsの確認済み日付は期間内。料金・提供範囲などの未確認項目はunknownのまま。旧記事にはreview_dueが残るが、検索需要・収益導線の根拠なしに一括改稿しない。
- 直近7日の公式発表候補にはOpenAIのAgents API等があるが、aierabi上の検索需要・CVとの接続は未実証。今回は新記事化せず、既存流入と最初の承認案件へ集中する。
- 本番、`/recommend`、x-exp-01のUTM/CTA/計測、X投稿キュー、affiliate active 0を変更していない。AI agentsカテゴリの局所差分はbranchのみ。本番deploy、SNS投稿、広告有効化、追加申請なし。

## 現行サマリー — 2026-09-14検証（9月13日調査の継続）

本番はa363a09、今回変更はbranchのみ。前段27d7a6dを維持し、ChatGPTモデル比較/無料AI比較を本文まで改稿、/safetyの検索意図を具体化、/blogの検索・確認状態フィルタを追加。公式77sources/24facts。ローカル鮮度監査コマンドを追加（ネットワーク/書込なし）。歴史スコアとrecommend/UTM/計測/queue/affiliate無効を維持。SITE_UPGRADE_REPORT_2026-09-13.md冒頭が今回の成果・検証・残課題の正本。

他の「最新」「未公開」「第2商品試用優先」は各時点の履歴。第2商品はRevenue OSのHOLDを優先。今回公開/SNS/課金/認証操作なし。全24factsの完全な現行性や全記事の改稿完了を意味しない。

更新: 2026-09-11 / `d812a09` を明示承認により本番反映済み（18:36:48 JST Ready）。初回X需要テスト `x-exp-01` は人間が投稿し評価待ち。recommend・UTM・CTA・計測コードは維持。DMM・Winスクール・デジタルハリウッドSTUDIO by LIGは提携審査待ち。現在地の正本。作業順は [NEXT_TASKS](NEXT_TASKS.md)、判断方法は [REVENUE_DECISION_FRAMEWORK](REVENUE_DECISION_FRAMEWORK.md)。

## 現在地

### 第2収益ルートのローカル準備（2026-09-13）

- ユーザーのOpportunity Scanner指示で9案を比較し、ひとり広報向け業務棚卸し＋文章テンプレートの買切り商品1つだけを選定。価格2,980円は仮説、需要/購入/CVRは未実証。比較・日次モデル・撤退条件はREVENUE_ENGINE_2_OPPORTUNITY.md。
- 無料sample、有料キット3業務、販売文案/公開ゲートをGit対象外 `data/private/revenue-engine-2/` に準備。公開ルート・API・決済・新基盤は追加なし。人間の試用/販売手段/法定表示/公開承認が残る。
- Revenue Engine #1の実験条件/キュー/本番は無変更。A8は前ターンの人間再認証後に3案件「申込中」を確認済み。以下の再認証待ちは以前の状態。今回、新規探索/申請/広告有効化/外部アカウント操作はなし。
- 当面は第2ルートも1商品だけ。複数SKUや月10万円柱の量産は、実売上と反復性を確認するまで開始しない。

### 本番反映後の実績再確認（2026-09-13）

- ChromeでXの48時間超アクティビティとGA4の9月11〜13日（当日途中）のcampaign・参照元/メディア・入口を再確認。匿名集計と判断をGit対象外 `data/private/x-exp-01-review-2026-09-13-afternoon.local.json` へ追加保存し、前回値は維持。
- GA4のmanual ad content別は未確認。campaign集計を投稿別実績に転用しない。recommend開始/完了/結果はunknown。D22のx-exp-03修正案を維持し、SNS投稿は人間確認待ち。
- A8は再読み込み後も再認証画面。現在の審査結果はunknown、最後に確認した3案件「申請中」を維持。人間の再認証後、当該3件だけ確認する。新規探索・申請・広告発行/有効化・本番/計測変更なし。

### a363a09本番反映完了（2026-09-13・正本）

- 人間がPreviewを確認し本番deployを明示承認。a363a09のPreview `2xoyqZx2Y5wTeErvKjmSUp5VRxQw` を既存Production環境へ昇格。`C1uSeLErMoQLH6MVDJpGx8MtBYKV` が13:46:25 JST Ready。本番 https://www.aierabi.jp/ 。ドメイン/環境変数/設定/mainは変更なし。
- 13:47:34 JSTに公開HTTP検証完了。sitemap66件＋例外/UTM5件の計71 URLが200、canonical整合。非www→www308、favicon/robots/sitemap200、旧Copilotと履歴noindex/sitemap除外、ブログ34、lastmodなし。未知モデル/同一ペア404。
- 承認RCのaffiliate active0/URL0、確認した全71ページに外部affiliateリンク/sponsoredリンクなし。recommend・関連データ・UTM・CTA・計測・Xキューは旧本番d812a09と差分なし。固定UTM URL200。検証はJSを実行しないHTTP取得でGAイベント送信なし。
- 判定READY_FOR_DATA_COLLECTION。GAの実データ受信/診断開始・完了の計測を新しく実証した意味ではない。未取得指標はunknown。model/compare/cost等の下流画面は13:46:25を境に区別して評価する。
- npm run check / git diff --check成功（既存font警告あり）。生成sitemapの並び順だけのローカル差分は除去。deploy起因の修正なし、SNS投稿/広告有効化/追加申請/課金なし。以下の「未公開」「d812a09本番」は過去時点の記録。

### Release Candidate最終レビュー（2026-09-13）

- 追跡済み31変更＋未追跡5ファイルを全体として監査。大幅削除は旧得点からの勝敗・推奨・認証表示で、評価JSONや元データの削除ではない。前段の記事可読性改善とGrok訂正も意図的なRC変更として保持。詳細はRELEASE_CANDIDATE_REVIEW.md。
- 新機能・追加サイト改善なし。現行比較、履歴分離、source参照/日付、価格の単位、広告無効、秘密情報、実験凍結を確認。Preview確認と本番承認は別段階。
- 本番はd812a09のまま。recommend本体/関連データ・UTM・CTA・計測・Xキューは無変更。ただし次回本番反映時に診断結果の遷移先model/compare/costは変わるため、実験期間を分ける。

### 非コラムの旧評価依存を解消（D24・2026-09-13、未公開）

- ユーザーの全体改善指示を優先。比較20URL、モデル詳細6URL、用途5URL/旧カテゴリ6URL、比較一覧・料金・安全性・乗り換えを公式factsと確認項目へ置換。旧数値から勝敗・認証・購入推奨を表示しない。URLは維持し、/categoryだけ既存/categoriesへ転送。
- 比較ペアの逆順canonicalを正順に統一。比較OG画像の固定点数も除去。旧Copilotは製品同定不足を明示しnoindex、GitHub Copilotと混同しない。
- 既存公開factsの9月確認分だけを項目別出典/日付付きで表示。古い/根拠なし/nullは未確認。全件を13日再確認したとは扱わない。Grokの公式確認分を追加しfacts20件、ソース53件。料金・無料体験の推測なし。
- 運営説明・FAQ・方法論の再現済みと誤認される記述を是正。コラムと評価JSONは今回維持。前ターンのGrok記事差分は保持。実験固定のrecommend・UTM・CTA/計測・affiliate設定も維持。
- sitemapはnoindexのCopilotを除外し、ビルド時刻をlastmodに自動投入する処理を停止。本文確認日と混同しない。URL網羅性を生成物で確認する。
- 例外: recommendの旧診断ルールは実験凍結のため未変更。履歴/方法論の測定日と、内容を変更していないプライバシーポリシーの改定日は日付だけ更新しない。本番はd812a09のまま。
- 検証完了: check成功、47URL×3幅・内部35リンク・404/比較OG・canonicalをローカルで確認。JS例外0、広告active0/URL0、sitemap66/ブログ34・重複なし・再生成一致。既存font警告と実機/本番未検証は残る。詳細はCURRENT_DATA_REFRESH_REPORT。

### Grok記事の内容更新（2026-09-13、未公開）

- Grok記事をX版/単体版の違い・料金確認・出典確認・入力情報の扱いを説明するガイドへ改稿。再現不能な実測体験・現行1位の断定・古い固定料金を是正。Grokの保存数値は履歴表で維持。評価JSON無変更。
- 公式4ソースを9月13日確認分として追加し台帳53件。日本の最終価格・無料回数・現行品質はunknown。既存5記事のrendererを6記事へ限定拡張。本文近くの公式リンク、要約、目次、比較表、内部CTA2件で根拠へ戻れる構成。
- 本番/実験/UTM/計測/affiliate active0は維持。Grok単体の検索需要とAI引用実績は未取得。古い料金・誤認リスクを理由に選定。詳細判断はD23。
- 検証: check成功（53ソース、回帰試験、lint/build88ページ。既存font警告のみ）、6記事×3幅の横あふれなし・目次/節リンク正常。Grokスマホ画像を目視、テスト時の外部通信を遮断。sitemap自動生成差分は除去。本番と実機での確認は未実施。

### 記事の読みやすさ・引用時の文脈改善（2026-09-13、未公開）

- ユーザーの追加指示で、既存の確認済み5ガイドに本文から要約した要点、本文/比較/出典への移動、折りたたみ目次、節リンク、編集者表示を追加。スマホ目次の高さを制限。記事本文の事実・料金・確認日・保存スコアは変更なし。
- Articleの言語とページ内識別子を追加し、表示内容と整合。AIへの引用・検索順位改善は未実証。robots/CDN/学習許可の設定は変更していない。
- 対象は検索・安全性・エージェント・コーディング・モデル動向の5記事。recommend、X直接送客ページ、UTM、CTA実装、計測、広告設定は無変更。本番反映は別承認。
- 検証: npm run check成功（既存font警告あり）、5記事×1440/390/320pxの横あふれ・目次開閉・節リンク・JS例外を検証。検索記事のPC/スマホ画像を目視。外部通信遮断、広告active0/URL0、無意味なsitemap生成差分は除去。実機・本番・実AI引用は未検証。

### 初回X実験の48〜72時間評価（2026-09-13）

- Xの投稿日時と投稿分析、GA4の実験campaign・流入先別実績を読み取り確認。少数標本のため成否やサイト品質への因果判断は保留。生の数値と次投稿の修正文案はGit対象外 `data/private/x-exp-01-review.local.json` に保存。
- 24時間速報は未取得。約8時間の画像や今回の累計で代用しない。GA4のcampaign全体と投稿別帰属は別扱い。recommend開始・完了・結果は未計測でunknown。
- x-exp-03は「修正」案まで準備。投稿許可ではなく、人間の文面確認・実投稿待ち。x-exp-01本文、本番recommend、UTM、CTA、計測は変更なし。
- A8は再読み込みで再認証が必要になり、当日の状態はunknown。キャッシュ表示を新しい審査結果とせず、3案件の最終確認状態「申請中」を維持。新規探索・申請・広告有効化なし。
- 以下は過去時点の記録。「実績待ち」は本節の限定的な初回評価で更新し、CV・収益は引き続きunknown。

### 本番反映完了（2026-09-11）

- ユーザーが現在の改善を本番へ反映することを明示承認。対象はD18/D19の既存差分。recommend・UTM・計測・affiliate無効状態は維持し、main mergeや設定変更は行わない。
- 再実行した `npm run check` は成功（49ソース、回帰試験、88ページbuild）。対象外の計測/評価JSON/affiliate設定に差分なし。privateはGit対象外。
- Macロックは人間が解除済み。既存VercelプロジェクトとGitHub接続を利用。認証・設定は変更していない。
- セキュリティ対応は人間承認後に解消。Next15.5.25、sharp0.35.4、PostCSS8.5.28。audit本番/全依存とも0件、check成功。18ページ×3幅・65内部URL・UTM伝播・比較操作を外部通信遮断で確認。詳細は `RELEASE_SECURITY_REVIEW.md`。
- `d812a09` を作業ブランチへcommit/push済み。Vercel Preview `HCLDkQbPmPHkNmBZp7jpv7zmcpZW` はReady、Chromeで新トップの表示確認済み。
- 昇格ゲートはd812a09を指定した人間の再承認で解消。PreviewのPromote to Productionから既存Production環境で再ビルドし、`9bgWfTL3rWssnVNEmCuFMMMAL8FX` がReady。本番 https://www.aierabi.jp/ は新しい比較トップへ切替済み。
- 本番HTTP確認: 主要5ページ・履歴ページ・x-exp-01固定UTM URLは200。canonical整合、favicon200、非www→www308、sitemap67 URL/ブログ34件・履歴ページ除外、affiliate active0/URL0。新スコアは未評価のまま、旧数値は専用履歴へ保持。詳細はSITE_REFRESH_REPORT。
- 以下のD19以前の「未公開」は実装当時の記録。本番反映の正本は本節。main merge・課金・SNS投稿・広告有効化・環境変数/DNS変更なし。

### D19 — 現行9候補の選択比較（2026-09-11、未公開）

- D18の入口改善を拡張。トップは9候補の検索・種類別フィルタ・同種2〜3件比較を主機能にした。中国系モデルも初期表示し、アプリとAPIを同一商品として扱わない。
- 比較値はpublic service factsだけ。製品・機能・無料条件・価格・提供範囲を項目別source/確認日で表示。台帳49件、facts19件。9月11日に再確認していない旧項目の日付は維持。
- 独自採点は全9候補で未評価。3月の総合保存表は `/evaluations/2026-03`（noindex/sitemap除外）へ移動し、数値は保持。従来model/compare等の履歴ページは既存URLのまま。
- raw/manifest/採点ログがないため新得点は未算出。具体的な3問の再評価案と外部実行ゲートは `EVALUATION_RESTART.md`。未実行を明記。
- 本番、recommend、UTM、CTA、GA、X queue、affiliate設定は変更なし。採点・公開・収益実績の完成ではない。D18以下は前段の記録。

### 2026-09-11 入口・主要ガイド改善（D18、作業ブランチのみ）

- 2記事で確認待ちにする制限はユーザーが解除。トップ/コラム一覧/カテゴリ入口を用途中心に整理し、保存スコアはトップ下段で開いて読める形へ変更。カテゴリ5ページは当時の説明・日本語対応・FAQも履歴と明示し、選び方記事へ接続。
- 個別ガイドは計5本（検索・安全性・エージェント・トレンド・コーディング）で限定rendererを使用。エージェント/トレンド/コーディングを追加改稿し、未確認の価格・最上級・実測の断定を取り下げた。残りの画像/動画2記事は既存修正を維持。ほか27記事の詳細監査は未完了。
- 公式台帳45件、service facts19件。DeepSeek/Qwen/KimiのAPI側の製品情報を追加。Windsurfの公式転送先/FAQからDevin Desktopへの名称変更を確認し、factsを訂正。未再確認の料金/無料条件はnull。既存の独自スコア・順位JSONは変更なし。
- /blogのcanonicalを専用URLへ訂正。5記事にArticle schema、OG画像の見出し訂正。新規ページ0、実行時依存追加0。npm run checkへ公式リンク/HTML/履歴保持等のローカル回帰テストを追加。
- 本番deploy、main merge、push、課金、SNS、affiliate有効化なし。x-exp-01対象ページ/UTM/CTA/計測仕様は無変更。最終検証と限界はSITE_REFRESH_REPORTのD18追記が正本。以下のD17節は前段の記録。

### 2026-09-11 記事品質改善2本（未公開・確認待ち）

- ユーザーの追加承認（D17）に基づき、AI検索比較と安全性記事の2本を内容・表示両面で改善。用途別カード、目次、意味的な比較表、公式出典、関連する内部CTA。6投稿の直接誘導先、recommend、計測、採点ロジック、affiliate設定は無変更。
- 安全性記事はSearch Consoleの検索需要から選定。旧5スコアは値を維持し、再現未確認の2026年3月記事記録と明示。企業利用保証・危険度の断定を取り下げ、確認手順に変更。GSCの実表示期間は3か月、集計原本はGit対象外のdata/privateのみ。
- 公式台帳は34件。DeepSeek公式ニュース/APIモデル指定の2件に加え、NIST・Claude一般消費者向けデータ説明・Gemini Privacy Hubの3件を追加。Geminiの現行ヘルプに記載のないダブルチェックの断定を除去。新モデルの公式発表を独自スコアと混同しない。
- 1440/390/320pxローカルブラウザ検証で横あふれなし、比較表5行、目次リンク、canonical、CTAのpost/campaign維持、画像/動画記事の既存renderer維持を確認。外部通信（GA・Google Fonts）を遮断。実機・本番は未検証。
- 過去節の「今回の未コミット差分」は当時の記録。現在のpilot差分・検証限界は `docs/SEARCH_ARTICLE_PILOT_REPORT.md` を参照。公開・pushはしていない。
- x-exp-01は約8時間時点のスクリーンショット提供あり。24時間/48〜72時間評価とは分離し、次投稿は引き続き保留。詳細実績は公開コード/台帳へ入れない。
- 2記事のローカル表示・内部リンク・URL/HTML境界・保存スコア保持・広告active 0/広告URL 0を確認。npm run check成功、最終記録はSEARCH_ARTICLE_PILOT_REPORT。未コミット・未push・未deploy。新ページ/依存パッケージ追加なし。全サイトや全service factsの更新完了ではない。

収益化フェーズ1・継続更新基盤フェーズ1のローカル実装は存在する。収益運用・計測の端から端までの検証は未完了。「公開可能」「収益化済み」を意味しない。
収益実験前の技術BLOCKERを局所修正済み。人間の明示承認に基づき2026-09-11にDMM 生成AI CAMP 学び放題、Winスクール、デジタルハリウッドSTUDIO by LIGへ提携申請し、3件とも人間確認で「申請中」。提携有効化、実URL投入は行っていない。RC `2a283ef` は人間承認後に本番へ反映され、対象URLの表示・canonical・favicon・sitemap・affiliate active 0を確認済み。続いて `x-exp-01` を人間が実投稿し、実績値待ち。

全主要ページを鮮度監査し、再現用raw dataがない2026年3月の独自スコア・順位を削除せず「保存済み履歴値」として明示した。トップ、カテゴリ、モデル、比較、安全性、ブログに共通注意を追加し、metadata/schema/共有文面の「最新」表現も是正。高変動な保存済み料金はカテゴリ・モデル・比較・料金・FAQの現在価格表示から外し、公式確認へ誘導した。現在の作業ブランチでは、次回候補のAI検索記事から個別監査を継続。本番へは未反映。

## 前回までのサイト鮮度・UX対応（件数は当時。現数は上記）

- `data/official-sources.json` は29件、`data/service-facts/` は16サービス。AI検索記事の個別監査でChatGPT、Claude、Perplexity、Gemini、Grokの公式ヘルプ5件を2026-09-11確認分として追加。既存factsは推測で更新せず、validatorで参照整合性を確認する。
- ChatGPT、Claude、Gemini、Perplexity、Cursor、GitHub Copilot、Windsurf、Runway、Pika、HeyGen、Synthesia、Adobe Firefly、Canva、Leonardo.Aiほか、登録済み客観情報と画面上の保存評価を分離した。
- Grok、Kling、Manus、Genspark、Midjourney、Ideogramは、現行プラン・価格・モデル等の完全なservice-factsが未登録または不足。推測で補わずunknown/残課題とした。
- 優先5カテゴリは共通UIで測定時点を明示し、古い料金・無料条件を非表示化。AIコーディング記事は現在順位・旧価格の断定を履歴説明と公式確認手順へ修正した。
- 全ブログ記事に最終更新日時点の記録である注意を追加。作業ブランチではAI検索比較記事から、再現不能な5段階評価、固定価格、優位性の断定を除去し、公式機能と同条件の比較手順へ変更。個別監査済みの画像・動画・コーディング・AI検索を除く30記事は未完了で、タイトルや本文に古いモデル名・価格・断定が残る可能性がある。
- `/cost` の未検証円換算と断定的な自動推奨は表示から外し、契約前の確認項目と各公式サイトへの導線に変更。未使用の旧 `CostCalculatorFlow` 実装は削除せず残っている。
- スマホ向けに既存の1列化・横スクロールを維持し、注意表示をファーストビュー内へ追加。実機/本番URLでの表示・クリック計測は未実施。

## 完成済みと実データ

| 項目 | 確認した実装/件数 | 意味・限界 |
| --- | --- | --- |
| 公式ソース | `data/official-sources.json`: 49件 | URL台帳。現行性を全件再検証した状態ではない。各記録の確認日・対象範囲を参照 |
| 客観情報 | `data/service-facts/`: 19サービス | 公開表示データとは別。新規3件はAPI製品情報中心。価格/地域/無料条件はunknownを保持 |
| 提携台帳 | 6件、active 0、URL全件null | DMM・Winスクール・デジタルハリウッドSTUDIO by LIGはA8審査中。activeには明示承認日・許可ホスト・対象ページが必須。実URL/参加承認は未入力 |
| DMM記事 | 非公開queue draft 1件、CTA/広告URL/PR表示なし | 公開一次情報だけを記載。提携承認・公式再確認・人間承認までページ化/公開しない |
| CTA案 | `data/monetization/content-targets.json`: 19件、全件proposed | rendererはこのマッピングを参照しない。上限・承認は宣言であり汎用強制ではない |
| 記事CTA | ArticleCTAを記事ページへ接続済み | 現存は内部リンク。内部CTAクリック/表示回数イベントなし |
| `/go/[service]` | active＋承認＋HTTPS＋host/source allowlist | 投稿/campaign固定IDをイベントへ渡す。ASPが許可したquery parameter設定時のみ成果URLへ匿名aliasを付与。実送信未検証 |
| Xキュー | 旧24 draft＋初回実験6 draft | primary X（約6.4k、AI発信、ユーザー提供値）向けに再評価。6件の直接誘導先4ページを局所レビュー済み。自動投稿false。過去反応データは未入力 |
| 収益入力 | `data/revenue/imports.json`: 両配列空 | 実流入・クリック・CV・売上・承認率・EPCすべて未取得/unknown |
| dashboard | schema v2、no_data | 欠損をnull保持。page/post/service/campaign別集計とテストを実装。入力は空で実績なし |
| 独自評価 | 既存JSONの点数を保持 | raw runなし。現行性能/再現済み測定としての訴求は禁止 |
| validator/check | 収益行/重複/有効化ゲート検証＋dashboardテスト＋lint/build | 事実性、契約上の許可、実CV帰属は人間確認が必要 |

ローカル入力雛形を `templates/local-inputs/` に追加。実入力先 `data/private/` はGit除外。A8会員限定情報/X集計は自動読込せず、credential用フィールドも設けていない。

primary Xはユーザー入力で約6,400フォロワーのAI発信アカウントと確認。handle等のローカル原本はGit除外のまま。過去投稿imp/リンククリック、フォロワー属性、aierabi流入は未入力のため、フォロワー数から売上を推計しない。

## 設計レビュー・公開前に残る問題

1. **収益判断の不足**: Synthesiaの制度の明確さと、日本の既存読者が買う確率を混同していた。Synthesia/Adobe/Canvaは短い並行適格性調査、実CV検証は選んだ1案件に絞る。Canvaの日本向け現行受付はunknown。現行の勝者は未決定。
2. **コンテンツの不整合**: 初回6投稿の直接誘導先に加え、主要ページと優先5カテゴリの表示を是正。古い料金・無料条件、raw根拠なしスコア、最上級断定を現在情報として表示しない。全ブログへ日付注意を加えたが、34記事本文の個別一次情報監査は未完了。
3. **計測の残課題**: post/campaign IDの伝播は実装。ASP側帰属は案件が許可するparameterとexportに依存し、非対応ならページ/投稿CVはunknown。gtagブロック、再訪重複、リダイレクトイベントとnetwork clickの差は残る。
4. **集計**: 欠損0化と固定空配列を修正し、片側入力/帰属あり/なし/異通貨をテスト。日次行で通貨を明示し、異通貨は合算しない。実ASP export形式との変換・成熟期間の運用検証は未実施。
5. **有効化ゲート**: active時の承認日、URL、host、対象ページをvalidator/renderer/goで確認。serviceId経由の広告開示も修正。契約上の媒体/subID許可自体はコードで判断できず人間確認が必要。
6. **プライバシーの説明不足**: 自前イベントにIP/emailを追加していないが、root layoutは既存GAをロードする。GA標準のURL/referrer/識別子等まで「個人情報を一切取得しない」と保証できない。計測同意・送信項目の監査をT3の前提にする。localhostから本番GAへテストを送らない。
7. **過剰設計の兆候**: 現在のJSON中心構成は小さいが、収集基盤・評価再現基盤・パッチCLI・CI・大量記事の先行開発は初収益を遅らせる。対象1案件の検証を妨げる欠陥だけを先に直す。文書数/機能数を完了指標にしない。
8. **運用上の注意**: X generatorは既存草案を上書きする。buildは全sitemap lastmodを変更するが事実確認日ではない。過去npm ciで脆弱性14件（critical 1）報告あり、今回最新audit/修正確認は未実施。本番承認前に該当依存・到達可能性を確認する。
9. **DMM審査待ち導線**: DMMはA8発行URLの改変禁止を前提に `link_mode: direct`、URL null、draft、承認falseで追加。専用レビュー記事は非公開queue draftとして最小作成済みで、CTA/広告URL/PR表示はない。承認・発行URL/host・記事内容・PR表示・掲載URL提出を人間が再確認するまでページ化・表示・遷移は発生しない。direct案件は `/go` と追加query parameterを使用しない。

## 初回X実験の実施状況

- `x-initial-revenue-experiment.json` に初回6案を分離。旧24案は無変更で履歴として保持し、無加工採用0件、書き直し候補11件、保留13件と評価した。
- 6案は用途診断2、比較方法1、画像2、動画1。個別価格・無料回数・未再現スコア・利用体験を断定しない。全リンクは固定campaign/post UTMを持つ。
- 最初の3件は `x-exp-01`（Reach）、`x-exp-03`（Authority）、`x-exp-06`（Demand Test）の順。affiliate未承認のため外部広告リンクなし、PR表記なしの情報導線として最終文面・絶対URL・KPIをqueueへ記録した。
- `x-exp-01` は人間が実投稿済み。24時間時点は速報値の保存だけを行い、48〜72時間で impressions、link clicks、X上のlink CTR、UTM別site sessions、recommend内で取得可能な行動を評価する。欠損はunknownのまま扱う。
- 評価完了まで本番の `/recommend` 主要構造、誘導導線、UTM/計測仕様、CTA位置・主要文言、投稿本文を凍結する。`x-exp-03` は自動的に進めず、実測後に維持・修正・延期を決める。作業ブランチの別記事変更も、この計測期間中はdeployしない。
- 画像/動画のどちらを収益対象にするかは未決定。過去指標がないため、初回反応またはASP条件を見ずにSynthesia/Adobe/Canvaを勝者にしない。

### 初回6投稿の公開可否

| 投稿 | 誘導先 | 公開前確認・修正 | 状態 |
| --- | --- | --- | --- |
| `x-exp-01`, `x-exp-02` | `/recommend` | 「最適」保証、保存済み得点、古い料金表示を外し、用途別候補と未検証事項を明示。遷移先へpost/campaignを伝播 | 今すぐ公開可能（人間の投稿承認は必要） |
| `x-exp-03` | `/methodology` | 全結果公開・完全再現可能・同条件保証等の断定を、保存済み件数とraw不在の限界に訂正 | 今すぐ公開可能（人間の投稿承認は必要） |
| `x-exp-04`, `x-exp-05` | `/blog/ai-image-generation-2026` | 古い料金/無料回数、未再現スコア、順位・最上級表現を除去。用途/編集/公式確認ポイントへ限定 | 今すぐ公開可能（人間の投稿承認は必要） |
| `x-exp-06` | `/blog/ai-video-generation-2026` | 古い料金/無料条件、未再現スコア、順位・最上級表現を除去。動画用途別の選定ポイントへ限定 | 今すぐ公開可能（人間の投稿承認は必要） |

誘導先修正待ちは0件。記事内CTAは対象内容に関係する内部導線のみで、初回6件にaffiliate URLはないため現時点でPR/広告表示は出ない。affiliate有効化時は投稿文・誘導先・CTAの開示を再レビューする。UTMのpost/campaignは記事内CTAと用途診断後の内部遷移へ保持するが、実GA/ASP受信は本番送信をしていないため未検証。

## BLOCKEDと安全に進められる範囲

| BLOCKED | 必要な人間の入力/判断 | 待たずに可能な作業 |
| --- | --- | --- |
| 案件の採用・有効化 | 既存ASPの契約状況、対象地域/商品/媒体/確定条件、明示承認 | 公開情報の比較、A8探索票、unknown整理 |
| `x-exp-01` の初回評価 | 投稿後48〜72時間のX実績値と許可された匿名サイト集計 | 24時間速報の保存、対象外記事の局所監査。計測導線は変更しない |
| 実CV/EPC評価 | 人間が許可して共有する匿名集計、ASPの帰属対応可否 | v2集計へ変換するローカル手順の確認 |
| 既存得点の実測訴求 | raw出力・採点根拠、変更時は人間判断 | 対象記事の根拠不足を明示する編集案 |
| 最初の承認案件の有効化 | 3案件のA8審査承認、発行広告URL、許可host、対象記事、PR/掲載URLの人間確認 | 初回X需要テスト、inactive設定・directリンク/PRゲートのローカル検証 |

ASPの認証情報をエージェントへ渡す必要はない。会員限定の原本はリポジトリ外で人間が保持する。

## Git・検証

- ブランチ: `work/aierabi-revenue-engine`。RCは `c31783e` と `2a283ef` に整理・push済みで、後者を本番反映済み。main mergeは行っていない。
- 現在の未コミット差分はD18の入口/5ガイド改善とD19の現行比較・履歴移設、公式facts/台帳、テスト、管理文書。`/recommend`、X queue、計測実装、affiliate設定は変更していない。本番deploy・SNS投稿・affiliate有効化なし。
- `npm run check`: 成功（49 source validation、収益集計・ガイド/現行比較回帰テスト、lint、88ページbuild）。既存のfont、Google Fonts取得、edge runtime、caniuse-lite警告は残る。生成sitemapの無意味な差分は残さない。check成功と収益運用の完成は別。詳細は `SITE_REFRESH_REPORT.md` のD19記録を参照。
# 2026-09-13 Current Data Upgrade（作業ブランチのみ）

公式facts既存12件更新・4件新設、台帳71sources/24facts。新記事2本、旧10記事のtitle/description訂正と過去記事注意書き。全項目最新・日本提供確認済みとはしない。詳細はSITE_UPGRADE_REPORT_2026-09-13.md。
本番はa363a09のまま。今回deploy/main merge/投稿/affiliate有効化なし。recommend・計測・UTM・queueは差分なし。第2商品はRevenue OS側HOLDを優先し、以下の旧試用優先指示では再開しない。
