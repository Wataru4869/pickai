# MORNING HANDOFF

最終同期: 2026-09-28 JST

## 現在地

- Phase: Winスクール最小収益テスト公開 / 初回実クリック・CV観測
- Production deployment: `9PZSSPfV5CFbgUZCeqrYNdmp32y3`（source `d8e480e`、2026-09-28 00:02 JST Ready）
- 正式名: `AIえらびマップ` / Domain: `aierabi.jp`を維持

## 完了

- `/models`から公開中25サービスへ用途別に内部リンクし、navigation・footer・トップ・用途一覧へ接続
- 公開UI/HTMLの「未確認」「未検証」「再現未確認」を除去。出典なしfactは非表示、内部unknownは保持
- Current比較は候補間で共通sourceがある行だけ表示。料金・性能・順位は補完していない
- `npm run check`成功（79 sources / 123 pages）、`git diff --check`成功
- 本番sitemap 101 URL／ブログ47件／model 25件／`/models` 1件／lastmod 0
- 本番巡回: 101 URLすべて200、canonical欠損0、sitemap内noindex 0、対象語0、内部リンク115件の400以上0
- 裸ドメイン→www 308、UTM付きrecommend・favicon 200、未承認`/go`は外部redirectなし
- affiliate active 0 / URL 0。main・SNS・環境変数・DNS・計測・X queueは不変
- Search Console実測: 親sitemap最終読込2026-09-10、子sitemap2026-09-15、検出70 URL。101 URL版Production公開前の値
- `/models`公開URLテスト: 2026-09-21 00:31 JSTに「URLはGoogleに登録できます」。Googleインデックス上は未登録・URL未認識
- 正規sitemapを2026-09-21に再送信し、「サイトマップを送信しました」を確認。処理直後は検出70 URL、現行101 URLへの更新待ち
- 代表URL: ChatGPT・Claude・`/safety`は登録済み。`/models`は優先クロールキュー追加済み
- `/compare`は旧クロールで外部canonical誤認を確認。該当reasonは1 URLのみ。現行ライブテストでは自己canonical・取得・index許可が正常で、優先クロールキュー追加とGSC修正検証開始まで完了
- GSCの2026-09-18集計は登録58 / 未登録92 / 理由7。101 URL版の完全再処理前の値で、現行sitemap件数とは単純比較しない
- 旧redirect errorは裸ドメイン`/blog` 1件。現行ライブテストは取得・www canonicalとも正常で、修正検証開始済み
- クロール済み未登録28件は代表2安全性記事が既に登録済みへ変化しており、グループ検証開始済み
- 検出済み未登録18件から、安全性・動画・ChatGPT対Claudeの代表3記事をライブテスト。3件とも登録可能で、優先クロール追加とグループ検証開始まで完了
- 意図的noindex 1件（非正規順比較URL）と正しい404 1件（`/月`）は修正対象外
- GSC最新表示（レポート更新2026-09-21）は登録67 / 未登録93 / 理由6。前回58 / 92 / 7から登録`+9`、未登録`+1`、理由`-1`
- 正規sitemapは検出101件へ更新し、現行Production URL数に追随。クロール済み未登録28→26、検出済み未登録18→17、重複canonical 1→0・合格
- `/models`、`/compare`、安全性記事、ChatGPT対Claude記事は登録済み。動画AI記事のみ検出済み未登録のまま
- noindex 4件は非正規比較3件＋Historical評価1件で意図どおり。404 3件は旧Copilot比較2件＋`/月`で、現行repo/sitemap/内部リンクに参照なし
- GA4過去28日（2026-08-30〜09-26）: 262 sessions / 137 engaged / engagement rate 52.29% / 平均50秒 / 1,312 events / key events 0 / revenue ¥0
- channel: Organic Search 156、Direct 72、AI Assistant 12、Unassigned 10、Referral 7、Organic Social 5。AI Assistantは平均5分04秒だが少数母数
- landing: `/` 66、`/safety` 49、安全性ランキング記事16、無料枠比較12。安全性clusterは主要入口を維持
- 過去7日（2026-09-20〜26）は23 sessions、active users 22、views 41、events 131。前期間比で減少しており、次の7日で継続性を確認
- 同期間のPage and screenは408 views / 200 active users。`/safety`は61 views / 52 active / 1.17 views per active user / 35秒
- `internal_cta_click`は全サイト14件。トップ6、`/safety` 4、`/compare` 2、Claude詳細1、Microsoft Copilot詳細1。安全性CTAの実受信を確認した
- `/safety`の4 clicks / 61 viewsは約6.6%の参考比率だが、CTA impressionやunique clickではないためCTRではない。小標本のためCTA改修は保留し、収益接続確認を優先
- 会員画面で確認した審査状態・成果条件・運用条件は`data/private/`のignored local recordだけに保存し、Git管理文書へ具体値を複製していない
- Winスクール専用の`/blog/ai-python-learning-path-2026`をbranch上に作成。公式4 source、目的別比較表、独学・教材・スクール比較、相談前チェックを掲載し、無関係な既存ページへCTAを追加していない
- 人間承認後、公式無料相談ページ向けに発行された未改変商品リンクを専用記事だけでactive化。`/go`、UTM、subIDは不使用
- branch・本番ともWinスクール専用記事だけaffiliate active 1 / URL 1。ファーストビューPRと記事末sponsored CTA、`affiliate_click`を実装し、発行URLはテストクリックしていない
- desktop / 390px / 320pxで専用記事を確認。全幅で横あふれ0、affiliate link 1件、`/go` 0件、PR・CTA・計測属性を確認
- `npm run check`成功（83 sources / 124 static pages）、`git diff --check`成功。sitemapは102 URL／lastmod 0
- 人間承認によりPreview `rt6RkJcC7U2hCtxYQJFwCdjr3Kmw`をProductionへ昇格。専用記事・主要ページ・favicon・sitemapは200、裸ドメイン→wwwは308、自己canonical正常、ホームに広告表示なし

## BLOCKED

- Winスクールの初回`affiliate_click`、成果発生、成果確定は未取得。テストアクセスで補完しない
- 他候補の状態と条件はlocal-only記録を正本とし、状態変化時だけ再確認する
- `/compare`の旧外部canonical誤認原因は未断定。現行本番は正常で、GSC修正検証後も誤認が残る場合だけ追加調査
- 動画AI記事1件と旧裸ドメイン`/blog`のリダイレクトエラー検証はGoogle再処理待ち。登録リクエストは登録成功の保証ではない

## 次の1手

1. Winスクール専用記事の実流入と`affiliate_click`を観測し、A8側の成果発生・確定と分けて記録する
2. 新名義`@AI_erabi`での案件固有X掲載可否を確認し、不明ならサイト内SEO導線のみを候補にする
3. 次の7日を同一定義で再取得し、安全性CTAは変更せず観測する

## 参照

- `docs/INDEXABILITY_AND_PUBLIC_FACTS_RC_2026-09-16.md`
- `docs/PROJECT_STATE.md`
- `docs/NEXT_TASKS.md`
- `docs/DECISIONS.md` D49
