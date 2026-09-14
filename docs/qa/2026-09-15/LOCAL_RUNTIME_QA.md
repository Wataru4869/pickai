# RE-01 ローカル実動QA — 2026-09-15

## 対象と結果

- branch: `work/aierabi-revenue-engine`
- 基準commit: `15e6205`
- 実操作: `/` でChatGPTとClaudeを選択して比較表を表示。
- 実操作: UTM付き `/recommend` で「マーケター・広報」→「リサーチ・情報収集」→「無料で使いたい」を選択し、Perplexity結果、Gemini比較、model/compare/costへのUTM維持を確認。
- 巡回: 主要9画面から得た内部リンク96件。400以上0件。
- 未承認導線: `/go/dmm-generative-ai-camp` は200の保留表示、外部redirectなし、不要なPR表示なし。

## 修正した2件

1. `src/app/layout.tsx`: GA4を `VERCEL_ENV=production` のときだけ読み込む。localhost/PreviewのQAアクセスを本番実績へ混ぜない。
2. `src/components/Sidebar.tsx` / `src/components/ui.tsx`: `/` の名称を実態に合わせて「ツール・モデル比較」へ訂正。歴史評価ページへの誤認を防ぐ。

## 実行した検証

- `npm run check`: 成功。data 78 sources、revenue、guides、freshness、lint、91ページbuild、sitemap生成まで完了。
- 回帰テスト追加: production-only analyticsとroot navigation名称。
- 通常local HTML: GAタグなし。
- `VERCEL_ENV=production` のlocal HTML: GAタグあり。
- affiliate: active 0、URL 0。
- `git diff --check`: 成功。
- 既存警告: Google Fontsの `@next/next/no-page-custom-font`。今回のblockerではない。

## 画面証跡

- [recommend結果 desktop](recommend-result-desktop.jpg)
- [recommend結果 390px](recommend-result-390.jpg)
- [recommend結果 320px](recommend-result-320.jpg)
- [トップ比較 390px](home-comparison-390.jpg)
- [トップ比較 320px](home-comparison-320.jpg)

390px・320pxの両方で診断を最後まで操作し、トップでChatGPTとClaudeを比較に追加した。両幅とも `document.documentElement.scrollWidth === clientWidth`、`document.body.scrollWidth === clientWidth` を確認し、ページ全体の横あふれは0。viewport overrideは確認後に解除した。

## 再現可能な起動手順

```bash
cd '/Users/wataru/Downloads/Codex/pickai'
npm run dev -- -H 127.0.0.1 -p 3000
```

開くURL:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/recommend?utm_source=x&utm_medium=social&utm_campaign=local-qa&utm_content=local-qa
```

## 本番反映前に残る問題

- push/Preview/deployは未実施。production GA維持はlocal production-mode HTMLで確認したが、Vercel Preview/Productionのnetwork確認は未実施。
- recommend開始・完了・結果イベントは未実装でunknown。今回のlive experimentを変えないため追加していない。

## 人間判断（1件）

このローカルRCを作業branchへpushしてPreview確認へ進めるか。
