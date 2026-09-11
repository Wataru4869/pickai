# SITE REFRESH REPORT

## 本番反映完了 — 2026-09-11 18:36:48 JST

- 公開commit: `d812a09`。作業ブランチ `work/aierabi-revenue-engine` へpushし、ユーザーのコミット指定承認後にVercel PreviewをPromote to Production。
- Production: `9bgWfTL3rWssnVNEmCuFMMMAL8FX` / https://www.aierabi.jp/ 。既存Production環境で再ビルドしReady。main merge、環境変数・DNS・ドメイン・プラン変更なし。
- 本番HTTP: `/`、`/recommend`、`/methodology`、画像AI記事、動画AI記事、履歴評価ページ、x-exp-01の既存UTM URLは200。canonical整合、favicon200、非www→www308、sitemap67 URL/ブログ34件。履歴評価はnoindex/follow・sitemap除外。
- 本番Chromium: 18ページ×1440/390/320px、内部リンク65件、検索/選択比較/解除、記事CTAのpost/campaign伝播、保存点数一致、横あふれなし・pageerror0。GTMとGoogle Fontsへの通信を遮断し、QAのGA送信なし。実機・実GA受信やCV発生は検証していない。
- affiliate設定active0・URL0、対象ページに外部広告リンク/不要なPR表示なし。recommend/共通CTA/GA/X queue/評価JSONに変更なし。
- 安全更新: Next15.5.25、sharp0.35.4、PostCSS8.5.28。audit全依存/本番依存0件。公開後の再checkも成功（49ソース・88ページ）。font/edge runtime・next lint廃止予定の非致命的警告は継続。
- 意味のない生成sitemap差分は復元。本番のsitemapはビルド時生成の67件を確認。次の管理文書commitは公開コードを変更しない。
- 限界: 現行モデルの独自採点は未評価。保存スコアの日付だけを更新していない。未監査記事と共通ナビの旧「総合の保存評価」ラベルは残課題（実験対象の共通UIを変えず今回は維持）。収益・検索順位の改善は未実証。
- 次の優先3件: x-exp-01の時点付き実数保存、48〜72時間データによる次投稿判断、既存3案件の審査結果確認。追加投稿/広告有効化は自動実行しない。
- 判定: READY_FOR_X_TEST（次投稿の採用・実行を意味しない。x-exp-01は評価待ち）。以下の未公開表記は各実装時点の記録。

## D19追加 — 現行候補の選択比較（2026-09-11、未公開）

### 今回の変更

- トップを9候補の比較画面へ変更。大きな導入、確認した中国系モデルの更新欄、種類別フィルタ、モデル/旧名称検索、同種2〜3件の選択比較を実装。固定の選択バーから比較表へ移動・解除できる。画像素材・新依存・新計測基盤なし。
- 文章/調査: ChatGPT、Claude、Gemini。API: DeepSeek、Qwen、Kimi。開発: Cursor、GitHub Copilot、Devin Desktop。API単体とアプリ契約を同一として選ばせない。用途の問いかけは編集上の分類で、性能推奨ではない。
- public factsの製品名、機能、無料条件、価格、提供条件にsourceと項目別確認日を付けて表示。未確認はnullのまま「未確認」。価格の税・地域・追加課金を横並びで同一条件と扱わない。
- ソース49件、facts19件。今回9候補の製品/機能を確認。価格等の再確認していない9月10日項目は日付を維持。Devin DesktopページのFree/Pro/Max等の価格欄は9月11日に確認して反映した。
- 3月の総合表は `/evaluations/2026-03` へ移設。noindex/follow、sitemap除外。トップでは旧点数を一切表示しない。旧model/compare等は既存URLで履歴を保持。共有ナビは実験保護のため無変更で、左メニューの旧トップ名「総合の保存評価」は公開前に整合を取る残件。
- 現行9候補すべて「独自スコア：未評価」。新順位・得点・ベンチマーク・安全性評価は作成していない。

### 一次情報

[ChatGPTモデル](https://learn.chatgpt.com/docs/models)、[ChatGPT機能](https://learn.chatgpt.com/docs/features)、[Claude製品](https://claude.com/product/overview)、[Gemini利用範囲](https://support.google.com/gemini/answer/16275805)、[DeepSeek発表](https://www.deepseek.com/en/news/deepseek-v4-1-flash/)、[Qwenモデル履歴](https://docs.qwencloud.com/changelog/models)、[Kimi API](https://platform.kimi.ai/docs/overview)、[Cursor](https://cursor.com/en-US)、[Copilot](https://github.com/features/copilot)、[Devin Desktop](https://devin.ai/desktop)。OpenAI Docsの手順で公式資料を確認し、API/アプリ/プランの対象範囲を分離した。

### 採点調査の結果

evaluation-runsはREADMEだけでraw/manifest/採点ログ0。保存点から現行点を再計算できない。APIや外部アプリの同条件実行は、許可された利用経路・費用/枠・設定の確認が必要。今回は実行なし。`EVALUATION_RESTART.md` に3問の具体案・事前正解・実行ゲートを記録。テスト案は実績でも新しいランキング規則でもない。

### 検証と限界

- `npm run check` 成功: 49ソース、収益集計、ガイドと現行比較の回帰試験、lint、88ページbuild。既存font/caniuse/edge警告は残る。
- ローカル18ページ×1440/390/320px、内部リンク65種の200応答、横あふれ0、page error 0。検索/該当なし解除、同種選択と異種抑止、比較表、未知値、履歴値の一致、canonical、noindexを確認。5記事の既存CTA post/campaign継承も維持。
- ブラウザの外部通信を全遮断。実GA送信や外部サービスへの操作はなし。実機Safariは未検証。比較選択イベントは追加しておらず、選択率はunknown。
- sitemapは生成67 URL/ブログ34件のまま。新規の履歴URLは除外し、生成lastmod等の差分は残さない。新規の組合せSEOページなし。
- 本番、recommend、UTM、共通CTA、GA、X queue、affiliate設定、採点JSONを変更していない。広告active 0、広告URL 0。commit/push/deployなし。

### 収益への寄与と次の3タスク

候補の絞り込みから関連ガイドへ進む理由を具体化した。SEO/CTR/CVの改善は仮説で、成果とは呼ばない。

1. x-exp-01の成熟した匿名集計を評価し、次投稿を決める。凍結中は今回のトップも公開しない。
2. 今回の比較画面を人間確認。凍結解除後に共有ナビの名称整合、公開承認・本番検証。既存の承認を自動流用しない。
3. 採点再開はモデル/経路/無料枠/実行条件の確認とraw取得から。3案件の審査確認以外のASP探索・申請はしない。

## D18追加 — 2026-09-11 主要入口・公式情報・ガイド改善

本節が現在の作業ブランチの追加実装記録。下の旧レポートの件数・範囲は当時のもの。

### 実装したもの

- トップ `/`：スコア/1位/点差中心の導入を、用途別6入口・内容更新記事4件・契約/評価方法/カテゴリ導線へ置換。旧総合スコアは下段の開閉式履歴表で保持。保存評価の優劣を購入推奨に使わず、現在のニュース風の旧変化欄を撤去。WebSite schemaは維持し、順位のItemListは外した。
- `/blog`：内容更新日順、2列カード/mobile1列、44px以上のフィルタ、選択状態と件数、更新日/公開記録の注意。トップを継承していたcanonicalを `/blog` へ訂正。
- `/categories`：用途別ガイドと2026年3月の保存評価を別リンクにした。カテゴリ詳細5ページも、冒頭から対応ガイドへ接続。当時の製品説明・日本語対応・FAQ/FAQ schemaを明示し、履歴データ自体は変更しない。
- 個別ガイド5本：検索・安全性（前段）に、エージェント・トレンド・コーディングを追加。用途の概要表、公式リンク、目次、Article schema、関連する内部CTA2件。OG画像の見出しも本文と整合。画像/動画の既存記事rendererと内容は無変更。
- DeepSeek/Qwen/KimiのAPI情報をservice factsへ3件追加（計19）。公式ソースは計45。現在の利用プラン・日本向け条件・価格・無料体験等の未確認はnull。モデル公表の優劣を独自スコアに混ぜない。
- Windsurfの公式ページがDevin Desktopへ転送され、公式FAQが名称変更を案内していることを確認。factsの現行名/URL/機能を訂正し、未再確認価格はnull。旧スコアのWindsurf表記は当時のまま保持。
- 実行時依存追加0、新規ページ0。通常のローカル回帰試験 `npm run test:guides` をcheckへ追加した。新しい管理・集計・自動生成基盤なし。

### 主な一次情報と範囲

- [DeepSeek V4.1-Flash公式発表](https://www.deepseek.com/en/news/deepseek-v4-1-flash/)：9月10日発表とAPI指定/旧指定名。9月14日の変更は確認時点では予定と明示。
- [QwenCloudモデル更新](https://docs.qwencloud.com/changelog/models)：9月2日のMax-0902/API側の記録。消費者向けアプリの全プラン保証ではない。
- [Kimi API概要](https://platform.kimi.ai/docs/overview)：K3等の提供案内。発表日・日本向け契約条件は未確認。
- [Devin Desktop](https://devin.ai/desktop)：旧Windsurfとの関係と製品機能。個別契約の変更有無を推測しない。
- [Claude Code概要](https://code.claude.com/docs/en/overview)、[Devin概要](https://docs.devin.ai/get-started/devin-intro)、[Manus](https://manus.im/docs/introduction/welcome)、[CrewAI](https://docs.crewai.com/en/introduction)、[Cursor](https://cursor.com/en-US)、[Copilot](https://github.com/features/copilot)：入口・機能だけを対象とし、実績値・安全認定・導入効果は転載しない。

### 信頼性・収益への寄与

「過去の1位を買う」導線から、「用途の確認→選定ガイド→条件確認」へ整理。既存XとSEO流入から、関連する記事へ進みやすくする仮説。売上・CTR・順位の改善はまだ未実証。スコアJSON・採点ロジック・報酬による順位変更なし。

### 検証・公開境界

- `npm run check`：最終再実行成功。45ソース、収益テスト、新ガイド試験、lint/build（87ページ）を検証。既存font/Google Fonts取得/edge/caniuse警告は残る。新規依存インストールなし。
- ローカルブラウザで17ページ×1440/390/320pxが成功。HTTP 200、h1/canonical正常、横あふれ0、page error 0、UTM付き内部リンク63種の200応答、履歴開閉・記事フィルタ・Article schemaを確認。5記事のCTA2件ずつにpost/campaign保持を確認。実機Safari・本番は未検証。
- 自己レビューでトップ履歴表のカテゴリ値の参照漏れを発見・修正。元のmodelsデータとの値一致を永続ローカル回帰試験へ追加し、空表示の見逃しを防ぐ。
- localhostからGAへ送信しないよう、使い捨てブラウザの全外部リクエストを遮断。UTM回帰試験も同条件。
- x-exp-01の `/recommend`、UTM、CTA共通実装、計測、X queueは変更なし。affiliate active 0、設定広告URL 0。広告・SNS・deploy・main mergeなし。
- sitemap生成結果67 URL/ブログ34件。今回新規URLはなく、自動生成による開始時ファイルとの差分を除去。Git上の既存64 URLとの差は前段レポート記載の既存状態であり、次回公開時は生成67件を確認。
- 未コミット・未push。依存の包括的脆弱性監査や全記事の事実監査は完了と扱わない。privateデータはGit対象外、今回追加の調査は公開公式情報だけ。

### 未完了と次の3件

1. x-exp-01の24時間速報・48〜72時間の成熟した集計を受け取り、次投稿を判断。取得できないrecommend内行動はunknown。
2. 本番反映前はトップ/コラム/トレンド/エージェント/コーディングの人間レビューと計測凍結解除、別途deploy承認。実績前にデザインを勝者扱いしない。
3. 3案件の審査状態のみ確認。待機中に改修するなら残り27記事から検索需要のあるモデル解説等を1本ずつ。新モデルの独自評価は再現可能なraw/条件がないため未実施。

以下、前回の鮮度監査レポートを履歴として保持。

作成日: 2026-09-11  
対象: `work/aierabi-revenue-engine`  
目的: Xから安心して送客できる情報鮮度・信頼性・行動導線を整え、最初の実CVまでの不要な離脱と誤認を減らす。

## 1. 更新したサービス

今回、料金・モデル名・提供条件を推測で上書きしたサービスは0件。前日（2026-09-10）に公式一次情報を記録済みの14優先サービス、ChatGPT、Claude、Gemini、Perplexity、Cursor、GitHub Copilot、Windsurf、Runway、Pika、HeyGen、Synthesia、Adobe Firefly、Canva、Leonardo.Aiについて、service factsと画面上の保存済み評価を分離した。

`data/official-sources.json` はDMMを含む24件、`data/service-facts/` は補助サービスを含む16件。validatorでsource参照を確認済み。確認から1日しか経過していない既存factsの日付・値は、再取得を装って変更していない。

## 2. 更新したページ

- トップ: schema、バッジ、総合・カテゴリ・安全性・変動表示を2026年3月の保存済み評価として明示。
- カテゴリ一覧・カテゴリ詳細・優先5カテゴリ（画像、動画、コーディング、検索、エージェント）: 共通注意、測定時点、metadataを是正。古い料金・無料条件を非表示化。
- model 6ページ: 「最新」を削除し、スコア、モデル情報、総評、共有文を履歴表示へ変更。料金は公式確認へ誘導。
- compare 20ページと一覧: metadata、OG画像、スコア、結論を履歴表示へ変更。保存済み料金表を廃止し両社公式サイトへ誘導。
- safety: 2026年3月の安全性テスト履歴であることを明示し、共有文も修正。
- cost: 未検証の円換算・無料条件・断定的な自動推奨を表示から外し、契約前チェック項目と公式リンクへ変更。
- FAQ: 更新頻度、提携関係、現在順位、料金、無料枠、学習利用等の断定を、履歴・公式確認・unknownを前提とする回答へ修正。
- ブログ全記事: 最終更新日時点の記録である注意を記事冒頭へ追加。
- AIコーディング記事: 現在順位、根拠を再現できない優劣、旧価格、職種別断定を、保存履歴と選定手順へ修正。
- recommend / methodology / 画像記事 / 動画記事: 初回Xキュー向けの既存局所修正を維持。

## 3. 古かった主な情報

- 「2026年最新」「総合ランキング」「最強」等が、2026年3月の未再現スコアを現在評価に見せていた。
- カテゴリ、モデル、比較、cost、FAQが保存JSONのUSD/JPY価格や無料枠を現在条件として表示していた。
- AIコーディング記事が当時の点数を現在順位として断定し、旧価格から購入推奨していた。
- FAQが「随時再テスト」「特定企業との利害関係なし」「全サービスに無料プラン」「特定サービスはデフォルトで学習」等を現在事実として断定していた。
- metadata、JSON-LD、OG共有文にも現在ランキングと誤認しうる表現があった。

## 4. 変更したUI

- ファーストビューに共通の「2026年3月時点の保存済み履歴値」注意を追加。
- バッジを「更新」から「測定」へ変更。
- 順位・スコアの数値は消さず、セクション名と説明で履歴に限定。
- 高変動な料金表を公式サイト確認カードへ置換。
- costは派手な改修をせず、契約前の確認5項目と公式リンクをモバイル1列/デスクトップ2列で表示。
- 既存の内部導線、1列化、横スクロール、CTA制限は維持。

## 5. UI変更理由

X流入ユーザーが最初に見る範囲で「いつの評価か」「現在価格ではない」「次にどこで確認するか」を理解できるようにした。古い価格でCTAを押させる設計は短期CTRが出ても信頼・CV・継続収益を損なうため停止。全面リニューアル、アニメーション、新管理画面は追加していない。

## 6. 独自評価で変更しなかったもの

既存のランキング、総合・カテゴリ・安全性スコア、テスト結果、順位計算は変更していない。raw回答・採点ログ・対象モデル識別子が揃わないため、現在性能を想像して再採点していない。affiliate報酬や審査状況も評価へ反映していない。

## 7. source確認できなかった項目

- 優先20サービスのうちGrok、Kling、Manus、Genspark、Midjourney、Ideogramは、現行plan/price/free trial/current productを揃えたservice factsが未完成。
- 登録済みfactsでもfree trial、地域別価格、税、課金周期、提供上限の一部はnull/unknown。
- 外部URL全件の同時疎通、地域・ログイン状態で変わる価格表示は未確認。
- A8会員限定条件は公開台帳へ転記していない。DMM、Winスクール、デジLIGはいずれも審査中。

## 8. 残っている古い情報

- 34件のブログ記事は共通注意を表示するが、本文を1件ずつ公式一次情報で再検証した状態ではない。特にAIエージェント、無料枠、個別レビュー、春モデル、コスト削減記事には古いモデル名・価格・最上級表現が残る可能性が高い。
- `src/data/models.json`、`src/data/model-details.json`、カテゴリJSONには履歴として旧モデル・価格が残る。現在表示からは料金を外したが、将来別コンポーネントが再利用する場合は注意が必要。
- 未使用の `CostCalculatorFlow` には旧推奨ルールが残る。現在の `/cost` からは呼ばれない。
- 実機スマホ、Safari/Chrome、本番URLでの目視・リンククリックは未実施。

## 9. build / check結果

- `npm run check`: 成功。official source 24件のvalidation、revenue dashboard test、lint、TypeScript/build、87ページ生成が完了。
- `git diff --check`: 成功。
- 警告: 既存Google Fonts配置、sandboxからのGoogle Fonts取得失敗、edge runtimeによる静的生成制限、caniuse-lite旧版。今回の収益実験を止めるbuild errorではない。
- `next-sitemap` が生成した時刻・件数差分は意味ある鮮度更新ではないため、`public/sitemap-0.xml` を作業前の状態へ戻した。

## 10. commit一覧

- `12db917 docs: prioritize DMM review draft during approval`（作業開始時点の直近コミット）
- `site refresh: label historical evaluations and remove stale pricing`（本レポートを含む今回の論理コミット。正確なhashは `git log` を正本とする）

main merge・本番deployは行わない。現在ブランチへのpushは、remoteと権限を確認できる場合だけ実施する。

## 11. 本番反映前に人間が確認すべきこと

1. トップ、カテゴリ、モデル、compare、safety、cost、FAQ、優先3記事を実機スマホで目視する。
2. 「保存済み評価」の表現が読みやすく、現在ランキングと誤認しないことを確認する。
3. 公式サイトリンクの遷移先、地域表示、料金条件を確認する。
4. 初回3投稿の絶対URLとUTMを開き、GAへ意図しないlocalhostイベントを送らず本番計測計画を確認する。
5. 最初のaffiliate承認案件で、発行URL非改変、対象ページ、PR位置、媒体条件、human activation approvalを再確認する。

## 12. 収益目標への寄与

- 古い料金・現在順位の誤認を減らし、X流入時の信頼毀損と早期離脱を抑える。
- compare/model/costで次行動を「公式確認」に統一し、高意図ユーザーの行動を明確化。
- affiliate報酬と評価を分離したまま、承認後に対象記事へだけCTAを載せられる状態を維持。
- 全記事を均等に作り直さず、初回X需要と最初の承認案件から監査順を決めるため、1CVまでの時間を延ばす過剰整備を避ける。
- 現時点の実売上・CV・EPCは0ではなく未取得（unknown）。今回の変更による増収はまだ実測されていない。

## 13. 次の優先3タスク

1. 人間が `x-exp-01` → `x-exp-03` → `x-exp-06` を手動投稿し、同じ定義で48〜72時間の反応を記録する。
2. 3案件のうち最初に承認された1件だけ、発行URL・掲載条件・PR・対象記事を確認してhuman approval付きで導線を完成する。
3. 実際に次に送客する1記事だけ、公式一次情報で本文を個別監査し、unknownを維持したまま公開判断する。
