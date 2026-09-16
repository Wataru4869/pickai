# MORNING HANDOFF

最終同期: 2026-09-16 JST

## 現在地

- Phase: Indexability / Public Facts Production公開後のSearch Console観測待ち
- Production deployment: `EhXsKbnA4iTzdHZrqJAY9ke6NUyN`（source `ead215d`、15:44 JST Ready）
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

## 次の1手

1. Search ConsoleでURL別未登録理由と最終クロール日を実測
2. 必要な代表URLだけsitemap再読込・inspectionを行い、結果を時点付きで保存
3. A8は最初に承認された1案件だけ条件確認へ進める

## 参照

- `docs/INDEXABILITY_AND_PUBLIC_FACTS_RC_2026-09-16.md`
- `docs/PROJECT_STATE.md`
- `docs/NEXT_TASKS.md`
- `docs/DECISIONS.md` D50
