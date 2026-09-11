# PROJECT STATE

更新: 2026-09-11 / RC `2a283ef` を本番反映済み。初回X需要テスト `x-exp-01` は人間が投稿し評価待ち。計測期間中の本番導線を凍結する。DMM・Winスクール・デジタルハリウッドSTUDIO by LIGは提携審査待ち。現在地の正本。作業順は [NEXT_TASKS](NEXT_TASKS.md)、判断方法は [REVENUE_DECISION_FRAMEWORK](REVENUE_DECISION_FRAMEWORK.md)。

## 現在地

収益化フェーズ1・継続更新基盤フェーズ1のローカル実装は存在する。収益運用・計測の端から端までの検証は未完了。「公開可能」「収益化済み」を意味しない。
収益実験前の技術BLOCKERを局所修正済み。人間の明示承認に基づき2026-09-11にDMM 生成AI CAMP 学び放題、Winスクール、デジタルハリウッドSTUDIO by LIGへ提携申請し、3件とも人間確認で「申請中」。提携有効化、実URL投入は行っていない。RC `2a283ef` は人間承認後に本番へ反映され、対象URLの表示・canonical・favicon・sitemap・affiliate active 0を確認済み。続いて `x-exp-01` を人間が実投稿し、実績値待ち。

全主要ページを鮮度監査し、再現用raw dataがない2026年3月の独自スコア・順位を削除せず「保存済み履歴値」として明示した。トップ、カテゴリ、モデル、比較、安全性、ブログに共通注意を追加し、metadata/schema/共有文面の「最新」表現も是正。高変動な保存済み料金はカテゴリ・モデル・比較・料金・FAQの現在価格表示から外し、公式確認へ誘導した。現在の作業ブランチでは、次回候補のAI検索記事から個別監査を継続。本番へは未反映。

## 今回のサイト鮮度・UX対応

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
| 公式ソース | `data/official-sources.json`: 29件 | URL台帳。うちAI検索機能5件を2026-09-11確認。全文・地域・現行性を全件再検証した状態ではない |
| 客観情報 | `data/service-facts/`: 16サービス | 公開表示データとは別。料金の課金周期/地域、free_trialの根拠を選定案件から再確認 |
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
- 今回の未コミット差分はAI検索記事、公式ソース台帳、管理文書だけ。`/recommend`、X queue、計測実装、affiliate設定は変更していない。本番deploy・SNS投稿・affiliate有効化なし。
- `npm run check`: 成功（29 source validation、収益集計テスト、lint、87ページbuild）。既存のfont、Google Fonts取得、edge runtime、caniuse-lite警告のみ。`git diff --check`も成功。buildが生成したsitemap差分はHEADと同一へ戻した。check成功と収益運用の完成は別。
