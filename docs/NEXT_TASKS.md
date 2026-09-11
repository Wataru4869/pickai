# NEXT TASKS

更新: 2026-09-11（`x-exp-01` 投稿後・計測中）。優先順位の正本。最大5件、同時着手は1件。判断は [REVENUE_DECISION_FRAMEWORK](REVENUE_DECISION_FRAMEWORK.md) に従う。

## 1. T1 — `x-exp-01` の24時間速報値を保存

- 状態: 人間が実投稿済み。affiliateリンクなし。実績値は未入力。
- 作業: 投稿後24時間時点の取得日時、impressions、link clicks、X上のlink CTR、UTM別site sessionsを保存する。recommend内の診断開始・完了等、現在取得できない値はunknownとする。
- 完了条件: 実数・分母・取得時刻・欠損理由が記録され、評価や投稿変更はまだ行われていない。
- 収益寄与: 計測欠損と初動を把握しつつ、成熟前の誤判断を防ぐ。Revenue Impact 1 / Time to Learning 1日 / Learning 2。

## 2. T2 — `x-exp-01` を48〜72時間で初回評価

- 状態: `x-exp-03`、`x-exp-06` は未投稿。計測中は本番の `/recommend` 主要構造、誘導導線、UTM/計測仕様、CTA位置・主要文言、`x-exp-01` 投稿本文を凍結する。
- 作業: impressions、link clicks、X上のlink CTR、UTM別site sessions、取得可能なrecommend内行動を同一期間で確認する。
- 完了条件: 実数・分母・取得時刻・欠損を記録し、`x-exp-03` を「維持・修正・延期」のいずれかに決定。小標本や欠損はunknown/保留とし、推定で補わない。
- 収益寄与: 約6,400フォロワーの実反応を最初の案件訴求へ反映し、無反応な投稿の連投を避ける。Revenue Impact 2 / Time to Learning 2〜3日 / Learning 3。

## 3. T3 — 3案件の提携審査状態だけ確認

- 状態: DMM生成AI CAMP、Winスクール、デジタルハリウッドSTUDIO by LIGは人間確認で申請中。新規案件探索・追加申請は停止中。
- 作業: A8で3案件の申請中・承認・否認・追加対応必要だけを確認する。ログイン操作やcredential保存は人間が行う。新規探索、追加申請、広告リンク発行はしない。
- 完了条件: 確認日時と3案件の状態を非公開領域に記録。変化なしなら次の改修を開始せず待機する。
- 収益寄与: 承認案件が出た時だけ実CV経路へ進み、審査待ちの無駄な作り込みを防ぐ。Revenue Impact 2 / Time to Revenue unknown / Risk reduction 2。

## 4. T4 — 最初に承認された1案件だけ収益導線を完成

- 状態: 3案件とも申請中。DMMは非公開draft、URL null、direct限定。affiliate active 0、広告表示なし。
- 作業: 最初に承認された1案件についてのみ、A8発行URL、許可host、媒体・SNS・PR条件、対象ページ、掲載URL提出方法を人間が確認。その後、専用記事とCTAの最小差分をレビューする。
- 完了条件: 承認証跡、改変していないURL、対象ページ、ファーストビューPR、human activation approvalが揃う。active化・公開・投稿は別々に人間承認。
- 収益寄与: 最初の実CV経路を1案件へ集中する。Revenue Impact 3 / Time to Revenue 7日以内を目標・審査次第 / Learning 3。

## 5. T5 — 次回recommend実験前に最小ファネル計測を追加

- 状態: 現在の実験では投稿リンク反応とUTM別sessionは評価できるが、recommend内の診断開始・完了・結果表示は取得できずunknown。x-exp-01計測中は仕様を変更しない。
- 作業: x-exp-01の48〜72時間評価終了後、次回recommend系実験の前に、個人情報を含まない固定イベント名で「診断開始」「診断完了」「結果表示」を最小追加する。既存UTM/post IDを維持し、CTA表示計測や新基盤まで広げない。
- 完了条件: 開始→完了→結果表示の件数を同一post/campaignで区別でき、欠損・分母0をnull扱いするテストが成功。localhostから本番Analyticsへ送信せず、`npm run check`が成功する。
- 収益寄与: Xクリック後の離脱箇所を判別し、次回の診断導線改善を推測で行わない。Revenue Impact 2 / Time to Learning 1実験 / Learning 3。
