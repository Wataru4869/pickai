# AI検索・安全性記事の品質改善 — 最終確認版

2026-09-11 / 作業ブランチのみ。本番deploy・main merge・push・SNS投稿・課金なし。

## 追加実施と最終確認（D17）

- 中間承認を挟まず仕上げる指示に従い、Search Consoleの3か月表示（2026-06-09〜09-08）から需要のある `/blog/ai-safety-ranking-2026` を選定。生の非公開集計はGit対象外の `data/private/seo-content-baseline.local.json` にのみ記録。28日データと呼ばない。
- 安全性記事のタイトル・description・本文から現行1位や企業利用保証等の裏付け不能な断定を除去。旧5スコアを変えず履歴表へ移し、ハルシネーション、入力データ、公開時の権利を分けて確認する実用ガイドにした。テスト結果や体験談を捏造していない。
- NIST/Claude/Geminiの公式ソース3件を追加し、台帳は34件。個人向け規定を法人/APIへ一般化しない。法的適合や漏洩しないことを保証しない。
- `ReviewedGuideArticle` は2つのslugだけに適用。他32記事・全体デザインは変えない。ファーストビューから比較表/確認軸へのジャンプを置き、長いmobileページで本文まで辿りやすくした。安全性記事末尾は検索比較・methodologyの2リンクのみ。PRゲートと既存CTA実装を維持。
- 2記事×320/390/1440pxでHTTP 200、横あふれなし、h1が1つ、表/目次/公式リンク/canonical正常、page error 0。各記事の内部リンク16種（共通ナビ含む）の200応答を確認。実機・本番表示は未確認。
- HTMLのescape、公式hostのみ許可、userinfo/非標準port/類似host/危険schemeをリンク化しないことをローカルrender試験で確認。affiliate active 0、広告URL設定0。外部広告リンクなし。
- ブラウザ試験は使い捨てcontextで外部通信を遮断。GAとGoogle Fontsは送信せず、x-exp-01の実データに試験流入を混ぜない。recommend・UTM/CTA/計測実装・X queue・評価データの変更なし。
- `npm run check` 成功（34ソース、収益テスト、lint、87ページbuild）。既存font/caniuse/edge警告のみ。生成sitemapは67 URL・ブログ34件、開始時ファイルへ戻して今回の生成差分を残さない。`git diff --check` 成功。依存追加0、公開ページ追加0。
- 未コミット・未push。レビュー対象は2記事と限定renderer/台帳/管理文書。検索順位やCV向上は未実証。全サイトや全service factsを最新化したとは扱わない。残り29記事の個別監査は次の需要に応じて行う。

### 人間に確認してほしいこと

1. AI検索記事の用途別要約と比較表が読みやすいか。
2. 安全性記事の履歴と現在の確認手順の区別が伝わるか。

確認用画像は `/tmp/aierabi-search-fold-1440.png`、`/tmp/aierabi-safety-fold-390.png`。全ページ画像は `/tmp/aierabi-search-390.png`、`/tmp/aierabi-safety-390.png`。ローカル試験コードは `/tmp/aierabi-search-pilot-qa.cjs` と `/tmp/aierabi-guide-renderer-test.cjs`。画像・試験コードは一時ファイルで公開資産ではない。

### 次の優先3タスク

1. x-exp-01の24時間速報/48〜72時間評価を受け取り、欠損を補わず次投稿を判断する。
2. 2記事の人間レビュー後、計測凍結解除と別途公開承認が揃ってから本番候補にする。公開後はGSCの同期間・同page/queryで観測する。
3. 既存3案件の審査状態のみ確認し、最初の承認案件だけ収益テストを準備する。

以下は最初の1記事pilot完了時の記録。件数・範囲・次タスクは上記で更新済み。

## 更新内容

- 対象: `/blog/ai-search-engines-comparison-2026` の1ページ。追加ページ数0。
- 淡いグリーンの導入、用途別3カード、desktop目次、番号付き本文、モバイル横スクロール比較表、出典リンク、記事末尾の用途診断/評価方法CTA。
- 従来はMarkdownの表とURLが文字列表示だった。対象だけで安全なReact要素に変換し、公式ドメイン許可リスト、HTTPS、userinfo/port拒否を使用。HTMLの実行・新パッケージ追加なし。
- 出典まで辿る手間を減らし、用途と判断方法が一読で分かる見本にする。外部affiliateリンク・不要なPRなし。将来active広告を持つ場合は既存の開示rendererへ戻る。
- Geminiの現行公式ヘルプで確認できないダブルチェックの断定を除去。DeepSeek-V4.1-Flashの公式発表/API指定を新設節で紹介。基盤モデルの性能と検索機能は分離。Qwen/Kimi等は検索条件未確認とし、点数を追加しない。
- 比較用質問3つは「未実行の質問例」と明記。実体験・結果・ランキングを生成していない。

## 一次情報

機能はChatGPT Search、Claude Web search、Perplexity How it works、Gemini Sources、X Grokの既存登録URLを2026-09-11再確認。価格は現行額を保証せず、公式の契約条件確認先として掲載。

- https://support.google.com/gemini/answer/14143489
- https://deepseek.com/en/news/
- https://api-docs.deepseek.com/

追加の2ソースは `data/official-sources.json` に登録（計31件）。同じ確認日を現在価格の保証や独自評価の実行日として扱わない。

## 検証

- `npm run check`: 成功（31公式source、収益集計テスト、lint、87ページbuild）。既存font/caniuse/edge警告あり。
- Playwrightで1440/390/320pxの横あふれなし、HTTP 200、h1が1つ、比較表5サービス、目次anchor、公式出典リンク、canonical、CTAのpost/campaign維持、sponsoredリンク0、page error 0を確認。
- 画像/動画記事は既存rendererのままHTTP 200。recommend・GAタグ・UTM仕様・スコアJSON・affiliate設定はdiffなし。
- ローカル試験では外部リクエストをすべて遮断。GA・Google Fontsの遮断を確認。実アカウントや認証済みブラウザを使わず使い捨てブラウザで検証。
- sitemapは今回の差分から除外し、開始時の内容へ戻した。生成結果は67 URL・ブログ34件だが、Git上の開始時ファイルは64 URLで、既存3記事（AIエージェントvs Claude Code、AI検索比較、AI検索ランキング）が欠けていた。今回新規記事はなく、既存の生成設定は3件を補完する。次回公開時には生成された67 URLを確認する。最終 `git diff --check` も確認する。

## 限界と公開前確認

- 検索順位・CTR・CVの改善は未実証。Search Consoleの検索語別実数によるページ選定は次に行う。AI検索記事をSEO最優先と断定しない。
- 新モデルの性能再評価、全service facts、他33記事の本文/Markdown表示改善は今回の対象外。
- 長文のためmobileの読了負担は残る。見本の文字サイズ・余白・目次・比較表を人間レビュー後に横展開する。
- 現在のx-exp-01評価完了までは本番へ反映しない。公開は別途人間承認。リポジトリ全体の依存脆弱性監査は未実施で、安全性全般を保証する検証ではない。

## 次の3タスク

1. x-exp-01の24時間速報と48〜72時間評価を、欠損を埋めずに実施。
2. Search Consoleのquery/page実数とこの見本を確認して次の改善記事1本を選ぶ。
3. 最初に承認された案件だけ、条件確認後に非公開draftと収益導線を具体化。
