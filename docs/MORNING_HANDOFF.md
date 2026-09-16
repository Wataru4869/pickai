# MORNING HANDOFF

最終同期: 2026-09-16 JST

## 現在地

- Phase: Indexability / Public Facts RC（branchのみ、未push・未deploy）
- Production: `AIえらびマップ`。現行本番構成は変更していない
- 最大の未確認事項: Search ConsoleのURL別「未登録理由」はMacロックにより未取得

## 今回完了

- 25件のAI詳細を用途別に束ねる `/models`、navigation・footer・トップ・用途一覧からの内部リンク、`ItemList` schemaを追加
- 公開UIと公開HTMLから「未確認」「未検証」「再現未確認」を除去。出典のないfactは表示せず、内部unknownは保持
- Current比較は候補間で共通sourceがある行だけ表示。料金・性能・順位は補完していない
- `npm run check`成功（79 sources / 123 pages）、`git diff --check`成功
- sitemap 101 URL／ブログ47件／model 25件／`/models` 1件／lastmod 0
- local production巡回: 101 URLすべて200、canonical欠損0、sitemap内noindex 0、対象語0、内部リンク115件の400以上0
- affiliate active 0 / URL 0、recommend・UTM・計測・X queueは不変

## 次の1手

1. Previewで `/models` と代表model/compare/cost/FAQを人間確認
2. 端末利用可能時にSearch ConsoleでURL別除外理由を実測
3. Production反映と再クロール依頼は別承認

## 参照

- `docs/INDEXABILITY_AND_PUBLIC_FACTS_RC_2026-09-16.md`
- `docs/PROJECT_STATE.md`
- `docs/NEXT_TASKS.md`
- `docs/DECISIONS.md` D49
