# Local experiment inputs

会員限定ASP情報とXの既存資産データは、公開データ・Git履歴・クライアントbundleから分離する。

1. `templates/local-inputs/a8-candidates.example.json` または `x-account.example.json` を `data/private/` にコピーする。
2. コピー先だけに人間が許可した情報を入力する。`data/private/` は `.gitignore` 対象。
3. password、Cookie、token、credential、メール、銀行/税務、注文/顧客IDは入力しない。スクリーンショットや会員ページHTMLも置かない。
4. 不明は `null` / `unknown`。セルフバックと紹介成果を分ける。ASPの再配布条件に反する値は入力しない。
5. 分析結果をGitへ移す場合も、公開可能な判断と根拠だけをDECISIONSへ記載し、限定報酬や生の実績は転記しない。

テンプレート自体は項目定義だけを含みGit管理する。実入力ファイルは自動読込・自動送信されず、現時点では人間確認用である。

ASPが成果レポートへ返すsubID等を許可する場合だけ、そのパラメータ名を確認票へ記録する。affiliate台帳の `attribution_query_parameter` には人間が規約確認した名前だけを設定する。対応しない案件では `null` のままとし、ページ/投稿別CV・EPCを推定しない。
