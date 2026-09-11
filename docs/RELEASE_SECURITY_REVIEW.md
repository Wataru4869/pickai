# 公開前依存レビュー（2026-09-11）

## 判定

ユーザーがNextメジャー更新を含む安全対策・再検証・本番反映を承認。修正後の `npm audit` と `npm audit --omit=dev` はともに0件、`npm run check` 成功（49ソース・88ページ）。公開操作の結果はPROJECT_STATEへ記録する。

## 承認後の修正

- Nextを15.5.25、eslint-config-nextを同版へ固定。React 18は維持。sharp 0.35.4へ更新し、Next配下PostCSSは同じ8系の修正版へoverride（解決版8.5.28）。その他は互換範囲のaudit fixのみ、forceなし。
- 動的ページ/OGのparamsと記事searchParamsをPromiseとしてawait。/goはuseParamsで同じservice値を取得。イベントの項目・送信条件・遷移先ゲートは無変更。
- Next 15で追加検出されたno-html-link-for-pagesのみ無効化。既存のフルページ遷移と計測条件を保ち、Link化によるprefetch/SPA遷移変更を避ける。他のlint/type検査は維持。
- 診断・共通CTA・GA・X queue・affiliate設定・評価JSONは無変更。画像/動画記事も内容は無変更。
- 0件は実行時点の既知advisory照合であり、将来の脆弱性がない保証ではない。以下は更新前の調査記録。

## 確認したこと

- 既存Next.jsは14.2.35。`npm audit --omit=dev --json` は脆弱パッケージ5件（Critical 1 / High 4）を報告。Next、lodash、nanoid、picomatch、Next配下postcssが対象。件数は脆弱性の悪用成功や本番での到達可能性を意味しない。
- `npm run check` は直前の実装検証で成功。セキュリティ監査は別の確認であり、check成功で代替しない。
- Windows固有RCEはWindowsホストが条件。画像最適化RCEはAVIF処理が条件。コードではnext/image、remotePatterns、AVIFファイル、Server Actions定義を確認できなかった。ただし、未使用機能があることだけでApp Router全体の安全を断定しない。
- VercelはRSC DoSにWAF緩和を提供するが、完全保護を依存せず修正版への更新を要求する。修正版がNext 15/16系にあり、現在の14系からはメジャー移行を含む。
- 自動の `npm audit fix --force` は実行しない。重大セキュリティ変更はAGENTSに従い実装前の人間承認が必要。

## 一次情報

- [Vercel CVE-2026-23869](https://vercel.com/changelog/summary-of-cve-2026-23869)
- [AVIF image optimization advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4)
- [Windows hosting advisory](https://github.com/advisories/GHSA-p293-qw3h-jr36)

## 承認後の限定範囲

修正版の互換性を確認して依存と必要な互換コードだけを更新。新機能、評価ロジック変更、GA/UTM/CTA変更、課金、環境変数変更はしない。auditとcheck、desktop/mobile、診断と投稿ID伝播の回帰を確認してから、既存作業ブランチのPreviewを検証しProductionへ昇格する。
