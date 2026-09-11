# PROJECT STATE

更新: 2026-09-11 / `d812a09` を明示承認により本番反映済み（18:36:48 JST Ready）。初回X需要テスト `x-exp-01` は人間が投稿し評価待ち。recommend・UTM・CTA・計測コードは維持。DMM・Winスクール・デジタルハリウッドSTUDIO by LIGは提携審査待ち。現在地の正本。作業順は [NEXT_TASKS](NEXT_TASKS.md)、判断方法は [REVENUE_DECISION_FRAMEWORK](REVENUE_DECISION_FRAMEWORK.md)。

## 現在地

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
