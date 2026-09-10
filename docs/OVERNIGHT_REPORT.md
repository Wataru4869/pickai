# Overnight report — 2026-09-10（Managerレビュー反映）

現在地の正本は [PROJECT_STATE](PROJECT_STATE.md)、実行順は [NEXT_TASKS](NEXT_TASKS.md)。この文書は作業履歴と検証結果を記録する。

## これまでの実装（保持）

- 記事CTA接続、許可リスト型 `/go/[service]`、affiliate台帳、GAイベント呼出し。
- 公式ソース23件、サービスfact 16件、CTA提案19件、X草案24件と旧サンプル。
- 客観情報/独自評価/更新候補の分離、ローカルvalidator、lint/buildをまとめたcheck。
- 空の収益imports/dashboard、ローカルキュー生成/集計スクリプト。
- 画像・動画比較記事の内部CTA。activeサービス0件、affiliate URL全件null。
- 自動投稿・課金・登録・本番公開は未実施。

## 今回追加・整理した判断OS

- AGENTS.mdを新設。恒久目標、安全境界、根拠・実績・承認の扱いに限定。
- PROJECT_STATE / NEXT_TASKS / DECISIONS / REVENUE_DECISION_FRAMEWORKを新設。
- 7軸の優先判断、A8探索票と非公開情報の境界、モデル分担、承認条件、自律改善ループを定義。
- Synthesia単独の販売優勝という断定を撤回。3候補の条件調査→1案件の小規模検証に変更。
- 旧レポート/計画の重複と実装済み表現を訂正。旧仮定の収益シナリオは実績と明確に分離して保持。
- 今回は実装コード/データの変更なし。既存差分を保持した。

## 再レビューで分かった限界

- 台帳は空ではない。有効affiliate URLが0件。公式情報は登録済みだが全件の現在性/日本条件を保証しない。
- `/go` のクエリは遷移先にならない。一方、HTTPS検査だけで完全なURL安全性を保証せず、人間承認・媒体条件・広告開示の強制も未完了。
- CTAマッピングは提案データ。記事描画との連動、内部CTA計測、投稿別帰属は未実装。
- 集計は空データ時nullだが、片側の実績だけ入力すると他方を0化する問題がある。実績利用前に修正必須。
- 自前イベントに個人情報項目を追加していないことと、GA標準送信を含めて個人情報を取得しないことは別。後者は未検証。
- 既存点数のraw評価根拠がない。動画記事とカテゴリの評価説明も不整合。対象ページから監査する。
- キューのfact-checkフラグは承認証跡ではない。generatorは既存草案を上書きする。
- buildのsitemap日時更新は内容更新の証拠ではない。
- 過去の `npm ci --ignore-scripts` は14 vulnerabilities（critical 1）を報告。今回の最新audit/解消確認は未実施。公開前の安全レビューに残す。
- 完成度40%等の根拠なき割合は廃止。完成物と未検証を列挙する。

## BLOCKED・人間操作

提携可否/非公開条件、匿名のX/GA/ASP集計、公開/投稿承認が不足。credentialをエージェントに渡さず、人間が共有可能な情報のみ渡す。申請・規約同意・銀行/税務・課金・外部アカウント・SNS・main merge・本番deploy・DNSは人間の個別判断/操作。

次の5件はNEXT_TASKSのみで管理し、ここで重複した実行順は定義しない。

## Git

`work/aierabi-revenue-engine` の既存未コミット差分を保持。今回commit/push/mergeなし。過去のcommitはauthor未設定で拒否された記録があるが、今回は再試行/設定変更なし。文書差分は `docs: define revenue operating OS and reconcile project reports` の単位で切り出せる。既存機能差分は別レビュー対象。

## 検証結果

- 今回 `npm run check`: exit 0。validate:data（公式ソース23件）→ lint → production build / sitemap生成が成功。87ページ生成。
- 警告: 既存のcustom font配置、ネットワーク制限によるGoogle Fonts取得失敗、edge runtimeの静的生成制限。今回のログにBrowserslist警告はなし。
- `git diff --check`: 成功。active 0、設定済みaffiliate URL 0、19 mappingすべてproposed、24 X投稿すべてdraft・自動投稿false、収益入力両配列空を再確認。
- buildで生じたsitemapの今回分の変更だけを作業前の内容に戻した。以前からの未コミットsitemap差分は保持。
- 本番Analytics/ASPへのイベント送信テストは未実施。最新依存audit、URL/承認/計測の包括的セキュリティ検証、実績分析は未完了。これらはcheck成功で代替しない。
