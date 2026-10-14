# Traffic Recovery Report — 2026-10-07

## 結論

アクセスは「直近も連続して急落」ではない。GA4の直近7日（2026-09-30〜10-06）は39 sessionsで前期間比+69.6%まで回復した。一方、直近28日のchannel合計は約216 sessionsで、前回記録（2026-08-30〜09-26）の262 sessionsより少ない。期間は18日重複するため厳密な前後比較ではないが、Organic Searchが156から115、AI Assistantが12から6へ減っており、中期では検索流入の回復余地が残る。

## 実測

### GA4 直近7日（2026-09-30〜10-06）

- sessions: 39（前期間比 +69.6%）
- events: 131（+45.6%）
- events / session: 3.4（-14.2%）
- key events: 0
- channel: Direct 20 / Organic Search 13 / Unassigned 5 / Cross-network 3

### GA4 直近28日（2026-09-09〜10-06）

- active users: 156
- new users: 152
- average engagement per active user: 48秒
- revenue: ¥0
- sessions（channel表示の合計）: 約216
- Organic Search 115 / Direct 72 / Unassigned 8 / Referral 7 / AI Assistant 6 / Organic Social 5 / Cross-network 3
- page_view 328 / internal_cta_click 15 / outbound click 4 / affiliate_click 0

### Search Console連携レポート（2026-09-09〜10-06）

- landing page集計: 45 clicks / 1,808 impressions / CTR 2.49% / average position 16.85
- query集計: 12 clicks / 813 impressions / CTR 1.48% / average position 26.34
- query集計は匿名化等によりlanding page集計と総数が一致しないため、補正せず別記録とする。

主なページ:

| ページ | Clicks | Impressions | CTR | 平均掲載順位 | 判断 |
| --- | ---: | ---: | ---: | ---: | --- |
| `/safety` | 15 | 310 | 4.84% | 8.71 | 維持。主要入口として機能 |
| `/blog/ai-safety-ranking-2026` | 9 | 139 | 6.47% | 5.11 | 維持。小標本で構造変更しない |
| `/blog/cursor-projects-2026` | 3 | 164 | 1.83% | 6.89 | CTR改善対象 |
| `/blog/ai-data-entered-response-2026` | 1 | 188 | 0.53% | 9.78 | 最優先のCTR・検索意図改善対象 |
| `/blog/chatgpt-models-comparison-2026` | 1 | 75 | 1.33% | 8.40 | 次回候補 |
| `/categories/ai-search` | 4 | 132 | 3.03% | 42.23 | 順位が低く、今回の即効対象外 |

主なquery:

- `cursor projects`: 3 clicks / 129 impressions / CTR 2.33% / position 6.65
- `チャットgpt 個人情報入力して しまっ た`: 1 / 133 / 0.75% / 10.37
- `生成ai 安全性 比較`: 2 / 16 / 12.5% / 7.88
- `安全性の高いai`: 2 / 11 / 18.18% / 3.73

## 実装した対策

1. 個人情報入力後の記事を検索語と行動意図に合わせて再構成した。
   - title / descriptionを「入力してしまった後の削除・変更・報告」へ具体化
   - ファーストビューを事故対応向けに変更し、無関係な過去スコア注意を除去
   - 情報別の最優先行動表とFAQを追加
   - 自分自身へ戻る内部リンクを除去し、安全性ハブ・入力前判断・会社利用へ接続
2. Cursor Projects記事のCTR改善を行った。
   - title / descriptionを「何か・できること・確認点」へ具体化
   - 単発修正との違いを表で追加
   - 公式確認日と記事構成更新日を分離
3. 収益までの適格導線を追加した。
   - Cursor Projects記事とAIコーディング選び記事から、Winスクール専用記事へ内部リンク
   - 広告URL、広告CTA、PR条件、`/go`、UTM、subIDは変更していない

## 判断

- 判定: **Modify / Continue**
- 直近7日は回復しているため、サイト全体の全面改修や記事量産は行わない。
- 公開後は28日を待たず、7日ごとに対象2ページのimpressions / clicks / CTR / positionを同一定義で観測する。
- 目標は順位の想像上の上昇ではなく、既に表示されている検索結果からのクリック回収と、コーディング流入から収益記事への適格遷移である。

## 公開前後の判定基準

- 個人情報記事: impressionsを維持したままCTRが0.53%を上回るか。7日単位では母数が小さいため、最低50 impressionsまでは断定しない。
- Cursor Projects記事: CTR 1.83%を基準とし、最低50 impressionsで比較する。
- Winスクール専用記事: views / active users / engagement / `affiliate_click`を分ける。A8の成果発生・成果確定とは混同しない。
- 公開そのもの、index登録、順位、CV、売上は別々に記録する。

## 安全境界

- Production deploy、SNS投稿、外部申請は実施していない。
- affiliateは既存のWinスクール専用記事1件だけ。URL・有効範囲を変更していない。
- 新しいランキング、推定料金、架空CV・売上は追加していない。

## 検証結果

- `npm run check`: 成功（data / revenue / analytics / guide / freshness tests、lint、124 static pages build）
- `git diff --check`: 成功
- sitemap: 102 URL / blog 48 / 重複0 / lastmod 0。build時刻だけの差分なし
- 390px / 320px: 対象記事の全体横あふれ0
- canonical: 対象記事で自己canonicalを確認
- 内部リンク: Cursor Projects、AIコーディング選びから収益記事へ各1件
- affiliate: 前段2記事0件、Winスクール専用記事1件。`px.a8.net`、`sponsored nofollow noopener`、PR表示を維持
- `data/private`: Git追跡0件。credential検出0件
