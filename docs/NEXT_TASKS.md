# NEXT TASKS

更新: 2026-09-11（全体鮮度監査後）。優先順位の正本。最大5件、同時着手は1件。判断は [REVENUE_DECISION_FRAMEWORK](REVENUE_DECISION_FRAMEWORK.md) に従う。

## 1. T1 — 初回X需要テスト3投稿を手動実施

- 状態: `x-exp-01`、`x-exp-03`、`x-exp-06` の文面・固定UTM・誘導先レビュー済み。affiliateリンクなし、自動投稿false。
- 作業: 人間が本番表示と絶対URLを最終確認し、48〜72時間間隔で手動投稿する。投稿別impressions、link clicks、UTM別site sessionsだけを匿名集計する。
- 完了条件: 3投稿すべてで同じ定義の分母・クリック・計測期間を記録。欠損はunknown、小標本は保留。実投稿とアカウント操作は人間承認。
- 収益寄与: 約6,400フォロワーが反応する用途を実測し、承認後の最初の案件訴求を絞る。Revenue Impact 2 / Time to Revenue 3 / Learning 3。

## 2. T2 — 最初に承認された1案件だけ収益導線を完成

- 状態: DMM生成AI CAMP、Winスクール、デジタルハリウッドSTUDIO by LIGは審査中。DMMはdraft、URL null、direct限定。広告表示なし。
- 作業: 最初に承認された1案件についてのみ、A8発行URL、許可host、媒体・SNS・PR条件、対象ページ、掲載URL提出方法を人間が確認。その後、専用記事とCTAの最小差分をレビューする。
- 完了条件: 承認証跡、改変していないURL、対象ページ、ファーストビューPR、human activation approvalが揃う。active化・公開・投稿は別々に人間承認。
- 収益寄与: 審査待ちを分散しつつ、最初の実CV経路を1案件へ集中。Revenue Impact 3 / Time to Revenue 3 / Learning 3。

## 3. T3 — Xまたはaffiliate対象記事だけ個別一次情報監査

- 状態: 全ブログへ履歴注意を追加。AI画像・動画・コーディングの優先記事は断定と古い料金を是正したが、残る本文の個別監査は未完了。
- 作業: 次に送客または広告掲載する記事だけ、公式価格・製品・helpを同日に確認し、`official-sources` / `service-facts` と本文を更新する。全記事一括更新はしない。
- 完了条件: 対象記事のモデル名、料金、無料条件、提供状況、公式URL、確認日が一次情報と一致。確認不能はunknown。独自スコアは変更しない。
- 収益寄与: 送客後の信頼毀損と離脱を減らし、CTAクリック・CVの改善につなげる。Revenue Impact 2 / Time to Revenue 2 / Risk reduction 3。

## 4. T4 — 公式情報が不足する優先サービスを必要時だけ補完

- 状態: official sources 24件、service facts 16サービス。Grok、Kling、Manus、Genspark、Midjourney、Ideogram等は完全な現行factsが不足。
- 作業: T1の需要またはT2の承認案件に関係するサービスから、公式料金・製品・docsだけでfactsを追加する。調査対象外を推測で埋めない。
- 完了条件: service_name、provider、official_url、plan/price/free条件、current product、features、availability、verified_at、source URLが根拠付き。unknown許容。
- 収益寄与: 使われない台帳整備を避け、反応があるテーマの信頼性だけを短時間で上げる。Revenue Impact 1 / Time to Revenue 1 / Evidence 3。

## 5. T5 — 成熟した実績から継続・修正・停止を1つ決定

- 状態: 収益入力は空。実CV、売上、EPCはunknown。
- 作業: 売上→CV→EPC→affiliate click→CTA CTR→流入の順で評価。流入は7〜14日、CVは案件の確定期間後に分けて判定する。
- 完了条件: 同期間・通貨・帰属群の実数、欠損、件数、確定率を記録し、1つの次行動と撤回条件をDECISIONSへ追記。架空の按分や0補完なし。
- 収益寄与: 実績のある導線へ集中し、見た目や流入だけの改善を止める。Revenue Impactは実績次第 / Learning 3。
