# Indexability / Public Facts RC — 2026-09-16

## 目的

検索エンジンが主要AI詳細を発見できる構造を整え、利用者へ欠損状態を大量表示せず、確認できた公式情報だけで判断できる公開面にする。

## 実装

- canonicalなAIツール一覧 `/models` を追加
- 公開中25サービスを6用途へ分類し、すべての `/model/[id]` へ内部リンク
- sidebar、footer、トップ、用途一覧から `/models` へ接続
- `ItemList` JSON-LDを追加
- 出典のないfact行を公開カード・比較表から省略
- 「未確認」「未検証」「再現未確認」を、公式の記載範囲や契約画面で確認する具体的な案内へ変更
- Current比較は選択候補すべてでsourceがある項目だけ表示

## 事実を変更しなかったもの

- 料金、無料条件、モデル名、提供状況を推測で追加していない
- 2026年3月の独自評価・順位を現在評価へ変更していない
- affiliate設定、広告URL、recommend、UTM、analytics、X queueを変更していない

## QA

- `npm run check`: success（79 official sources / 123 static pages）
- `git diff --check`: success
- sitemap: 101 URL、ブログ47、model 25、`/models` 1、重複0、lastmod 0
- sitemap全URL: HTTP 200、canonical欠損0、noindex 0
- 公開HTML: 「未確認」「未検証」「再現未確認」0
- 内部リンク: 115件、HTTP 400以上0

## Production / 残確認

- commit `ead215d` をProduction deployment `EhXsKbnA4iTzdHZrqJAY9ke6NUyN` として公開。既存ドメイン・環境変数・DNSは変更していない。
- 本番でもsitemap 101 URL、全URL 200、canonical欠損0、noindex 0、対象語0、内部リンク115件の400以上0を確認した。
- Search ConsoleのPage indexing / URL inspectionは未確認。未登録URLと理由は推測せず、次回Google画面で実測する。
