# Release Candidate review — 2026-09-13

判定: READY_FOR_PREVIEW。ローカル最終確認でRelease blockerなし。本番公開の許可ではない。

対象: work/aierabi-revenue-engine。開始時の31追跡済み変更＋5未追跡ファイル。新しい機能・デザイン・SEO施策は追加しない。本番はd812a09のまま。

## 差分分類と削除監査

| 分類 | 対象 | 判断 |
| --- | --- | --- |
| 旧依存解消 | compare一覧/20ペア/OG、model6件、category一覧/6詳細、categories5詳細、cost/safety/switchとlayout | 旧勝敗、null→0、順位、チャート、認証チェック、旧強弱による購入/併用推奨を除去。現在のfactsと確認手順へ置換する目的に合致 |
| 旧依存解消 | about/faq/methodology、root layoutのOG alt、categories一覧 | 実測済みの断定や旧画面の説明を訂正。root layoutのGAコードは無変更 |
| 公式根拠 | official-sources、Grok facts、public-catalog | 公開情報のみ。既存台帳の確認日を一律更新しない。モデルID未確認、価格/無料体験nullを維持 |
| 意図したUI/UX | PublicFactsPage TSX/CSS、ReviewedGuideArticle TSX/CSS | 長い旧点数画面をカード化。6記事の要約/目次/節リンク/編集者表示。既承認の可読性改善として保持。全体CSSや実験UIの変更なし |
| 既存記事訂正 | grok-review JSON、blogルートの明示的renderer対象追加 | 古い価格・再現不能な実体験/現在1位を撤回。保存値保持、内部CTA2件のみ。旧依存解消に関係する変更 |
| 回帰 | test-reviewed-guides | 6ガイド、source境界、履歴数値、未確認、現行ルートの旧計算排除を確認 |
| 文書 | PROJECT_STATE/NEXT_TASKS/DECISIONS/CURRENT_DATA_REFRESH_REPORT、本レビュー | 現在地と判断記録。以前のX評価の非公開値は含めず、状態記録だけを文書コミットへ分離。過去記録を消して再実行させない |
| 生成物 | next-sitemap.config.js、sitemap-0.xml | noindex Copilot除外と偽lastmod撤去を反映。意味のある差分のみ。再生成で同一ハッシュ |
| 無関係 | なし | private・依存・計測・環境設定の変更なし。前段の承認済み記事改善は上のUI/記事群として明示 |

大量削除は表示とその計算であり、src/data/models/tests/safety/categories、その他の評価JSON、専用履歴ルートは無変更。旧チャート部品もソースに保持。旧詳細情報の全行を履歴画面へ移したという意味ではない。元JSON/Gitから追跡できる。現行画面で不要な再現不能の推薦ロジックを復活させない。

## 公式factsと安全境界

- 20公開factsの非null項目すべてでsource参照を検査。fact確認日がsource確認日より新しい不整合0件。表示側の9月基準と項目別日付を確認。9月10/11日の確認値を13日再確認済みとは表示しない。
- 差分で追加したGrokの製品/Consumer FAQs/X Premium/X Grokヘルプ4URLを再閲覧。記載範囲との整合を確認。Consumer FAQsの文書日付は2025年5月12日で、台帳の9月13日は閲覧確認日であり発表日ではない。
- 既存facts全20件を公式サイトで再調査した監査ではない。料金は通貨・月/年・席数等の文字列を保持し、換算・最安順位・税込額の推定なし。日本の契約画面は未確認。
- 未確認は未確認。GrokのモデルID/料金/無料体験、旧Copilotの同定を補完しない。API候補を完成したエージェント製品と表示しない。
- affiliate active 0 / URL 0。差分に課金・外部送信・credential操作・依存追加なし。private追跡0、ignore確認済み。変更/未追跡ファイルの秘密情報パターン検査で検出なし（秘密が絶対存在しない保証ではない）。

## 実験凍結と限界

- recommend本体と関連データ、CTA実装、go、UTM/計測、Sidebar/ui、XキューはHEADから差分なし。root layoutはOG altのみ。既存GA標準送信設定やConsentは変更しない。
- recommendの3問→結果→内部リンクのpost/campaign保持をローカル確認。未取得の開始/完了等の実績はunknown。
- 診断結果からのmodel/compare/costは今回のRC対象。公開後の下流行動は同一画面条件ではなくなる。本番反映は人間が実験の区切りを確認してから行い、変更時刻を記録する。

## SEO/technical期待値

- sitemap **66 unique URL、うちブログ34**。従来本番67から旧Copilotのnoindex1件を除外。HEADの古い生成物64との差はブログ補完等も含むため、単純な行数差をURL削除とみなさない。
- 逆順比較20URLは維持、canonicalは正方向10URLへ集約。単数カテゴリ4URLは対応する複数カテゴリcanonical、翻訳/文章は固有canonical。既存の単数カテゴリ全件sitemap除外方針は維持。
- /categoryは/categoriesへ307。旧Copilot/評価履歴はnoindex。未知モデル/同一ペア404。robots/favicon/sitemap配信と比較OG画像を確認。
- autoLastmod false、lastmodなし、繰り返し生成同一。metadataは未確認の現行順位を主張しない。一部共有OGは共通説明を継承するが、旧得点の現行評価表示はない。

## 検証・公開前の限界

- npm run check成功（53ソース・収益/ガイド回帰・lint/build88）。既存font lint警告とEdge静的生成警告は継続。
- 47主要URL×1440/390/320px、内部リンク35件、JS例外0。6ガイド×3幅、目次開閉/節アンカーを再確認。
- recommendと画像/動画記事の3幅、UTM、noindex、redirect、favicon/robots/sitemapを追加確認。ローカルブラウザの外部通信を遮断し、GA/ASP実績を汚染しない。
- デスクトップ/スマホのスクリーンショットも目視。実機Safari、Vercel Preview/本番での表示は人間確認が残る。コラム34本の全主張・全外部リンクを再監査した意味ではない。
- git diff --check成功。Preview準備まで。main merge・本番deploy・SNS・広告有効化は行わない。
