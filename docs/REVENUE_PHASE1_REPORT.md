# Revenue Phase 1 Report（2026-09-10）


> Managerレビュー（2026-09-10）で訂正。実装履歴・仮定シナリオを保持する文書です。現在地は [PROJECT_STATE](PROJECT_STATE.md)、実行順は [NEXT_TASKS](NEXT_TASKS.md)、選定基準は [判断OS](REVENUE_DECISION_FRAMEWORK.md) が正本です。

## 1. 最有力収益化候補

**SynthesiaのStarter / Creatorは制度確認の第1候補（販売優勝は未確定）**です。理由は、(1) aierabiに動画生成カテゴリと動画比較記事がある、(2)無料Basicから試せる、(3)公式affiliateが25%、60日Cookie、最大US$267/customerを公開、(4)研修・営業・説明動画という購入意図の強い用途がある、の4点です。

以下はフェーズ1時点の調査順位です。現在はSynthesia/Adobe/Canvaの適格性を短く並行確認し、条件がそろう1案件を検証します。

1. Synthesia Starter / Creator
2. Adobe Creative Cloud / Adobe Express（Firefly文脈。Firefly単体の対象可否は要確認）
3. Canva Pro
4. HeyGen Creator / Pro（報酬条件確認後）
5. Leonardo.Ai（Creator Program受付再開後）

詳細な20候補は `docs/MONETIZATION_PRIORITY.md` に記載しました。制度のない／未確認サービスは集客対象にできても、収益対象として断定しません。

## 2. 対象ページ

以下は未実装の導線案です。動画記事の本文にSynthesiaの説明がないため、そのまま接続しません。

`X → /blog/ai-video-generation-2026 → Synthesia比較CTA → /go/synthesia → 公式サイト`

補助導線は `/categories/video-generation` のSynthesia行、HeyGen行です。画像系は `/blog/ai-image-generation-2026` と `/categories/image-generation`、coding系は `/blog/ai-coding-tools-2026` を使います。

19件の提案マッピングを `data/monetization/content-targets.json` に保存しました。1ページ最大1CTAブロック、関連必須、人間承認必須という提案ルールです。rendererとマッピングは未連動で、承認はコード強制されていません。現時点ではすべて `proposed` で、外部affiliate URLは有効化していません。

## 3. Xからの集客戦略

24件の投稿草案をReach / Authority / Conversion / Retention各6件で生成しました。全件に目的、誘導ページ、想定ユーザー、CTA、monetization target、根拠、fact-check要否を含めています。

- Reach: 公式に確認できた無料枠・アップデートからカテゴリページへ。
- Authority: 既存草案は得点を訴求しているがraw評価記録がなく、実測としての投稿は保留。対象記事・カテゴリ間の根拠説明も再確認する。
- Conversion: 無料プランが確認できた製品だけを、関連する比較記事へ。
- Retention: 比較方法、安全利用、料金確認の実用Tipsへ。

実投稿処理はありません。`npm run generate:x-queue` はローカルJSONを再生成しますが、人間の編集も上書きするため再実行前に差分を確認します。

## 4. CTA設計

CTAは記事末尾または該当ツール行に限定します。推奨ラベルは「無料で試す」ではなく、最初は「比較してから無料で試す」とし、読者が比較結果を理解した後に遷移できる形にします。

CTA typeは `free_plan`、`free_trial`、`compare`、`official`、`diagnosis`。現コードの表示分岐は台帳の `active` とURLの存在を確認し、go側でHTTPSを確認します。人間承認は運用上必要ですがコード検証は未実装です。直接外部URLへのfallbackはありません。広告表記と `sponsored nofollow noopener` を必要としますが、serviceIdからactiveを解決する経路では開示漏れの可能性があり、有効化前の修正対象です。

## 5. 計測設計

`affiliate_click` イベントに以下を記録します。

- `source_page`
- `service_id`
- `cta_type`
- `cta_position`
- `event_timestamp`

query値は文字種と長さを制限し、自前項目にはメール/IP等を追加していません。ただし固定IDの許可リストでなく、GA標準送信もあるため「個人情報を一切取得しない」とは保証できません。GA側のページセッションと組み合わせ、手動で取得したaffiliate networkの集計データからCV・売上を分析する設計です。

ダッシュボードの目標指標はページ別流入、CTAクリック、サービス別click、affiliate click、CV、売上、EPC、コンテンツ別収益。現集計のby_page/by_serviceは常に空で、投稿別帰属も未実装です。片側入力時の欠損0化を直すまで実績評価に使いません。定義は `data/revenue/README.md`、取込先は空の `data/revenue/imports.json` です。実績がないためCV・売上データは作っていません。

## 6. 実装したもの

- 23件の公式一次情報ソース台帳（料金16、収益制度7）
- 16サービスの料金、無料枠、主要機能、提供状況のfactデータ
- 19件のページ→サービス→CTA提案マッピング
- CTA typeと匿名分析項目を追加した `/go/[service]`
- 24件のX投稿draftと再生成スクリプト
- 収益分析データ契約と空のimport台帳
- 公式情報と独自評価を分離するvalidator

## 7. 未実装

- affiliate ID / URLの登録とCTA有効化
- 実際のX投稿
- affiliate networkからのCV・売上取込
- GA管理画面でのcustom dimension登録とdashboard表示
- 更新候補の自動Web取得
- Synthesia単独レビュー／用途別比較記事
- CTA A/Bテスト

## 8. BLOCKED

- Synthesia、Adobe、Canva、HeyGen等への申請・審査・規約同意は外部アカウント操作のため未実施。
- 報酬受領設定、税務情報、銀行情報はcredential・個人情報を伴うため未実施。
- Adobe一般affiliateでFirefly単体プランが対象か、日本向けCanva programが現在受付中か、HeyGenの現行報酬条件は人間による申請前確認が必要。
- 本番GAでイベントを確認するには本番公開とAnalytics権限が必要。

## 9. 収益発生までに人間が必要な操作

1. T1で選定した案件の現行規約・媒体条件を読み、必要な場合だけ申請するか判断。Synthesiaへの申請を既定路線にしない。
2. 承認後に発行されたURLを秘密情報として扱う必要があるか確認し、台帳へ登録。
3. 対象サービスを `active` にする変更をレビュー。
4. 作業ブランチのPRをレビューし、別途main merge / deployを承認。
5. GA custom dimensionsを設定し、実イベントを検証。
6. X草案をfact-checkし、人が投稿する。

## 10. 1日5,000円への最短ルート

以下は実績ではなく、必要条件を見るための**仮定シナリオ**です。

| 仮定報酬/1CV | 仮定CVR | 必要CV/日 | 必要affiliate click/日 | 計算 |
| ---: | ---: | ---: | ---: | --- |
| ¥1,000 | 5% | 5 | 100 | 5件×¥1,000 |
| ¥2,500 | 3% | 2 | 67 | 2件×¥2,500（¥5,000） |
| ¥5,000 | 2% | 1 | 50 | 1件×¥5,000 |

この表は条件式であり最短達成の証拠ではありません。1日50〜100 affiliate clickを得られる流量/読者需要は未確認です。最初は適格性・既存読者・最小計測を確認した1案件で実CVを検証します。実際の円換算報酬、承認率、返金、地域条件はaffiliate管理画面の実績で置き換えます。

## 11. 1日10,000円へのルート

| 仮定報酬/1CV | 仮定CVR | 必要CV/日 | 必要affiliate click/日 | 計算 |
| ---: | ---: | ---: | ---: | --- |
| ¥1,000 | 5% | 10 | 200 | 10件×¥1,000 |
| ¥2,500 | 4% | 4 | 100 | 4件×¥2,500 |
| ¥5,000 | 2% | 2 | 100 | 2件×¥5,000 |

案件分散は、選定案件で成熟した確定CVと反復性を確認してから判断します。初CVだけでAdobe/Canvaへの拡張を決めません。クリックを増やす前に、ページ別CTR、サービス別CVR、EPCを観測可能にし、2〜4週間を初期レビューの目安に（CV確定期間は別途待って）、低意図トラフィックを増やさないことが重要です。

## 12. 次の作業

旧3タスクは [NEXT_TASKS](NEXT_TASKS.md) の最大5件に統合しました。申請・本番公開・SNS投稿を自動実行する指示ではありません。

## UI収益レビュー

- CTAは現状、記事末尾まで到達しないと見つからない。高意図記事では結論直後に比較用の内部CTAを1つ置く余地がある。
- 比較ページはスコア説明が中心で、次の行動が「公式で無料確認」「診断」「コスト比較」のどれか明確でない。
- スマホではテーブルと長いスコア説明が続くため、上部に「用途別結論→詳細」の短い要約が有効。
- 診断は独立ページにはあるが、比較記事終端以外の文脈導線が弱い。
- affiliateが未承認の現在は外部CTAを増やさず、内部の比較・診断CTAで意図を検証する案です。ただし現状は内部CTA計測がないため、そのままでは意図データは蓄積できません。

大規模なデザイン変更は行っていません。
