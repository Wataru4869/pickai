# UI Visual Refresh — 2026-09-16

## 目的

サイトの情報量は維持しながら、初見で「用途からAIを選ぶサービス」と認識できる視覚的な焦点をつくる。装飾だけではなく、用途選択、候補確認、比較、料金確認の順序を画面構成で伝える。

## 変更

- ブランドマークを2色の「AI / 選」へ変更し、深緑と朱色を識別色として全体へ展開。
- desktop sidebarへ文字アイコン、現在地、診断の主導線、情報方針を追加。モバイルの既存drawer構造は維持。
- トップheroを大きく再構成。選び方の具体例、比較候補、確認項目を見えるUIとして配置。
- 「用途 → 候補 → 比較 → 料金」の4段階ナビを追加し、ファーストビュー直後の判断順を明示。
- 用途カードを目的別の3色、主要AIカードをサービス別の識別色で整理。掲載順が順位に見えない説明は維持。
- compare、model、category、cost、安全性、記事で使う共通header/card/CTAを、余白・色面・境界・影の統一で強化。
- 記事heroと要点、比較候補カードを編集コンテンツとして識別しやすくした。

## 変更していないもの

- URL、canonical、metadata、schema、sitemap対象
- Current Facts、料金、モデル名、独自スコア、ランキング
- recommendの質問・結果ロジック
- UTM、event名、campaign/post ID、GA Measurement ID
- affiliate設定、`/go`、広告・PR表示

## QA

- `npm run check`: 成功（79 official sources、102 static pages、lint警告・エラー0）
- sitemap: 80 URL、ブログ47件
- local全80 URL: 400以上0、canonical欠損0、GA tag 0
- affiliate active 0 / URL 0
- desktop実画面: `/`、`/compare`、`/model/chatgpt`、安全性記事を確認
- 390px / 320px: breakpoint、1列化、横スクロール分離、44px以上の操作対象をコード確認。今回環境では独立したmobile viewport撮影を実行できず、Preview実機確認を残す。

## Preview確認対象

1. `/` — hero、4段階ナビ、用途カード、主要AIカード
2. `/compare` — page header、用途カード、代表比較、select
3. `/model/chatgpt` — page header、要約、CTA、facts card
4. `/categories` と `/cost` — 共通カードと料金案内
5. `/safety` と `/blog/ai-what-not-to-enter-2026` — 長文ページの可読性
6. mobile 390px / 320px — header、drawer、hero、横あふれ、CTA

## 判定

`READY_FOR_PREVIEW`。Productionは未変更。見た目の改善効果、CTR、CV、売上は未実測。
