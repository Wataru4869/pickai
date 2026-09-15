# aierabi Analytics Review — 2026-09-15

## 結論

aierabiには検索流入があるが、安全性テーマへの依存が大きく、収益行動はまだ測れていない。直近28日のGA4は295 sessions、検索経由175 sessions。GSCは76 clicks / 1,610 impressions。GA4のkey eventと売上は実測0だが、affiliateが無効なので収益導線の失敗率とは解釈できない。

一方、AI Assistant経由は15 sessionsと小さいものの、11 engaged sessions、engagement rate 73.33%、平均4分17秒だった。AI引用・回答経由を狙う「結論先行・比較条件・一次情報」の構造は継続価値がある。ただし小標本で、将来の再現性は未確認。

## 実測サマリー

### Search Console

期間: 2026-08-16〜09-12（28日）。76 clicks、1,610 impressions、CTR 4.7%、平均掲載順位17.2。

| ページ | clicks | impressions | 平均順位 | 読み取り |
| --- | ---: | ---: | ---: | --- |
| `/safety` | 42 | 702 | 8.0 | 最大の検索入口 |
| 安全性の過去検証記事 | 19 | 178 | 5.3 | 流入あり。Historical表示の保護が必要 |
| ChatGPTモデル比較 | 4 | 62 | 7.2 | 1ページ目。CTR改善候補 |
| `/model/grok` | 2 | 238 | 21.4 | 表示は多いが2ページ目付近 |
| AIエージェントカテゴリ | 1 | 23 | 8.7 | 少数だが1ページ目 |
| `/cost` | 0 | 87 | 42.1 | 現状は検索成果に遠い |

安全性関連2ページで61 clicks、全体76 clicksの約80%を占める。これは強みであると同時に、単一テーマ依存である。`ai 正確性 ランキング` は54 impressions・9.5位・0 clicks、`grok 評判` は13・13.3位・0、`grok 評価` は11・10.3位・0。queryとpageの対応は未確認のため、編集前にページfilterで帰属を確定する。

### GA4

期間: 2026-08-18〜09-14（28日）。295 sessions、148 engaged sessions、engagement rate 50.17%、平均41秒、1,307 events。key events 0、売上 ¥0。

| チャネル | sessions | engaged | engagement rate | 平均engagement |
| --- | ---: | ---: | ---: | ---: |
| Organic Search | 175 | 115 | 65.71% | 37秒 |
| Direct | 86 | 13 | 15.12% | 14秒 |
| AI Assistant | 15 | 11 | 73.33% | 4分17秒 |
| Organic Social | 3 | 2 | 66.67% | 29秒 |

Google organicは89 sessions、Bing organicは65、Yahoo organicは16。ChatGPT経由8 sessionsは平均6分21秒、Copilotのai-assistant経由6 sessionsは平均1分58秒。AI経由は少数なので「成功」とは断定しないが、検索以外の有望な配信面として別コホートで継続観測する。

上位landingは `/safety` 72 sessions、トップ45、無料AI比較42、安全性過去記事24。無料AI比較はGSC上位表には現れない一方でGA landing 42 sessionsがあり、Google以外の検索や直接流入を含む可能性がある。source別に分けて確認する価値が高い。

## 改善優先順位

1. **収益行動を測れるようにする** — 次の `@AI_erabi` traffic/affiliate実験前に、内部CTA、診断開始・結果表示、affiliate clickを固定event名で計測する。現状はpage view後の行動を判別できず、key events 0をCVRとして評価できない。
2. **安全性流入を判断導線へ接続する** — `/safety` とHistorical記事から、現行facts、比較、用途診断へ進む内部遷移を観測する。過去スコアを現行順位へ戻さず、検索意図へ直接答える。
3. **既存1ページ目を優先してCTR改善する** — ChatGPTモデル比較、AIエージェント、安全性関連queryをquery→pageで確定後、title・description・冒頭回答を1ページずつ改善する。新記事量産より早く学べる。
4. **Grokは新記事を増やす前に既存ページを統合改善する** — 238 impressions・21.4位の `/model/grok` と「評判」「評価」queryを、最新facts、料金確認範囲、注意点、関連比較へ接続する。query帰属未確認のため先にfilter確認する。
5. **404と計測欠損を解消する** — 過去7日に404 titleが6 views。正確なpathを特定して、内部リンクなら修正、旧URLなら関連ページへ恒久redirectを検討する。landing `(not set)` 14 sessions、Unassigned 11 sessionsも原因を分ける。
6. **AI引用向け構造を横展開する** — 高意図ページに短い結論、比較条件、公式source、確認日、Current/Historical区分を置く。AI Assistant流入の高engagementは仮説支持だが、15 sessionsなので本数目標にはしない。
7. **Directの低engagementを分解する** — Directは86 sessionsに対してengagement rate 15.12%。bot、旧QA、ブックマーク、実離脱のどれかは未確認。9月15日のproduction-only GA化後の期間を分離し、landing/device別に見てからUIを変える。

## 判断上の制約

- GSC/GA4期間の大半は9月15日の本番UX・Current Facts更新より前。今回の新UIや比較コラムの成果ではない。
- 旧 `@tetoteto_ai` のx-exp-01（205 impressions、1 link click、CTR 0.49%、7 engagements）はHistorical。`@AI_erabi` のbaselineへ流用しない。
- `affiliate_click`、recommend開始/完了/結果表示は未取得。未取得を0にしない。
- 9月15日以前はPreview/local QAが本番GAへ混ざった可能性を排除できない。公開後コホートを別期間で観測する。
- 収益改善の最大ボトルネックは、承認済みaffiliate経路と測定可能なCV導線がまだないこと。
