# AI選び 現状監査（2026-09-10）


> 初期監査の履歴。現状・未解決は [PROJECT_STATE](PROJECT_STATE.md) が正本です。

## 結論

サイトは Next.js 14 / React 18 / TypeScript / Tailwind の静的データ中心の構成です。ランキングの保存値（raw実測記録は未確認）、説明文、料金情報、更新履歴はすべてリポジトリ内 JSON に手入力されており、外部 API・DB・定期実行による更新機構は確認できませんでした。

## データと表示の対応

| 対象 | 保存場所 | 利用箇所・備考 |
| --- | --- | --- |
| トップランキング・モデル情報・料金 | `src/data/models.json` | `src/lib/data.ts` → `src/app/page.tsx`、`model/[id]`、`compare` |
| 非安全性16テスト | `src/data/tests.json` | 文章8・コード4・画像4。モデル別の得点が保存済み |
| 安全性14項目 | `src/data/safety.json` | 25点満点の個別点、重み、最終順位を保存 |
| カテゴリランキング | `src/data/category_*.json` と `categories.json` | カテゴリ専用ページと旧カテゴリページで別系統が存在 |
| 更新履歴 | `src/data/changes.json` | `lastUpdated: 2026-03-31`。自動生成の痕跡なし |
| 記事 | `src/data/blog/*.json` | `src/lib/blog.ts` がビルド時にファイルを読み込む |
| 比較・モデル | `src/app/compare/[slug]`、`src/app/model/[id]` | `models.json`・tests・safetyを表示用に集約 |
| おすすめ診断 | `src/app/recommend/page.tsx` と `recommendations.json` | クライアント側の選択ロジック。外部送信なし |
| コスト計算 | `src/app/cost/page.tsx`、`CostCalculatorFlow.tsx` | `models.json` の料金を入力値と合わせて表示 |

## スコアの信頼性

- `methodology` はクロス採点/安全性の採点者を説明していますが、保存データは非安全性16件＋安全性14件です。サイト内の「30テスト」「30＋14」の説明整合性とraw採点根拠は別途確認が必要です。
- 個別テスト、カテゴリ平均、モデル総合点の計算コードはありません。`models.json` のカテゴリ・総合点、`safety.json` の `finalRanking` は保存済みの出力値です。
- よってランキング値は再現不能な編集済みデータとして扱い、今回変更していません。料金・提供状況などの客観情報を更新する場合も、公式一次情報と確認日を添えた候補として扱うべきです。

## 収益化・外部リンク

- `affiliate-config.json` は従来、未設定の識別子用プレースホルダーと開示文だけでした。
- `ArticleCTA.tsx` は広告表記と `rel="sponsored nofollow noopener"` を実装していましたが、記事詳細ページから未使用で、CTA は表示されませんでした。
- Google Analytics のページビュータグは `src/app/layout.tsx` に固定 Measurement ID で置かれています。外部リンク／CTAクリックイベントは未実装でした。
- 当初、空の台帳と、許可リスト方式の `/go/[service]` を追加しました。`status: active` かつ有効な HTTPS `affiliate_url` のあるサービスだけが中間URLを使用し、GA の `affiliate_click` を送信します。その後台帳5件が登録されましたが、有効なサービスは0件です。

## SEO・運用・セキュリティ

- 基本メタデータ、canonical、robots、`next-sitemap`、OGP は実装済みです。比較URLは sitemap で正方向だけを残す処理があります。
- `/category/*` と `/categories/*` が併存し、前者は sitemap 除外です。前者を削除・大規模統合するのは影響調査が必要なため未実施です。
- API 呼び出し、環境変数、定期実行、Vercel Cron、DB は確認できませんでした。`vercel.json` は www へのリダイレクトのみです。
- `next.config.js` と `vercel.json` に同じホストリダイレクトがあり、重複設定です。挙動を変えないため未修正です。
- 不要コード候補: `src/app/compare/[slug]/opengraph-image.tsx` はモデル得点をハードコードしており、`models.json` と更新乖離する恐れがあります。
