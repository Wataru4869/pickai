# Current Facts audit — 2026-09-13

調査対象期間はまず2026-09-07〜13。公式の更新一覧・製品・料金・help本文を開いて確認した。7日内の発表が確認できないものは過去1年の背景・現在の料金ページへ移った。「発表なし」ではなく「今回7日内発表を確認できず」。検索結果のcrawl日を発表日に転用しない。独自スコア・ランキング・実験条件は変更しない。

## 確認範囲と採用判断

| サービス | 起点/一次情報と今回の確認 | factsへの反映 / unknown |
| --- | --- | --- |
| ChatGPT / OpenAI | [公式モデル一覧](https://learn.chatgpt.com/docs/models)、[料金](https://learn.chatgpt.com/docs/pricing)本文。7日内のモデル発表日は未確定 | Go、Proのfrom US$100、Business年契約20/月契約25ドルへ訂正。ChatGPT契約に含まれるWork/Codexの説明範囲。日本税込額はunknown。旧モデル項目の日付は維持 |
| Claude / Anthropic | [News](https://www.anthropic.com/news)→9/1 Fable/Mythos5.1、[個人プラン](https://support.claude.com/en/articles/11049762-choose-a-claude-plan) | Pro年200ドルを補足。文書日5/19と今回確認日9/13を明示。7日内新モデル・日本最終価格はunknown |
| Gemini / Google | [9/10 release notes](https://gemini.google/release-notes/) | Windows10以降アプリを機能に追加。既存モデル・料金を一括再確認扱いにしない。Windows版の日本地域別提供条件はunknown |
| Grok | [公式news](https://x.ai/news)の9/4・9/3項目を確認 | 直近7日新発表は未確認。既存9/13 facts維持。無料回数・地域価格・利用経路別モデルはunknownのまま |
| Perplexity | [changelog](https://www.perplexity.ai/changelog)、[プランhelp](https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you) | Standard/Pro/Max等を確認。Educationの本人確認条件あり。既存値維持、全有料料金/モデル網羅/日本条件は未確認。changelogの発表日を確定できず |
| Cursor | [9/10 Projects](https://cursor.com/changelog)、[料金](https://cursor.com/pricing) | Projects機能と個人月20/60/200ドル・税別を反映。Teams値は今回の取得表示で確認できずnull。プロジェクト機能の全プラン利用保証はしない |
| GitHub Copilot | [9/10 MAI終了](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated/)、[プラン](https://github.com/features/copilot/plans) | MAI-Code-1-Flash終了と公式推奨代替をavailabilityへ。独自性能順位なし。個人プラン価格表示を確認、既存料金日付は維持 |
| Windsurf / Devin Desktop | [公式Desktop](https://devin.ai/desktop)の価格・名称変更FAQ | 既存factsと名称・20/200ドル等整合。日付だけは変更せず。7日内発表・日本最終価格はunknown |
| Runway | [API changelog 9/8](https://docs.dev.runwayml.com/api-details/api_changelog/) | APIにGPT Image2.5 Flare/Sunburst追加を反映。Web無料プランで同機能が使えるとはしない。Web料金と日本利用条件はunknown |
| Kling | [公式入口](https://klingai.com/)は取得エラー/robots制限。Kuaishou IR入口も取得不可 | 推測でfactsを新設しない。現行モデル・価格・無料枠・日本提供すべてunknown。Adobe等の搭載情報をKling直契約の仕様へ転用しない |
| Pika | [料金](https://pika.art/pricing)、公式更新の検索 | 取得できた年払い表示Standard8ドル/月相当を契約周期付きで反映。Basicの480p制限を補足。月払いタブ/Pro/Fancyの今回確定額はnull。7日内発表未確認 |
| HeyGen | [Product updates](https://www.heygen.com/blog/category/product-updates)、[料金FAQ](https://www.heygen.com/pricing) | Free月3動画と一部premium機能の限定trialを区別。有料プラン全体無料という意味にしない。7日内発表・日本条件は未確認 |
| Synthesia | [updates](https://www.synthesia.io/updates)、[料金](https://www.synthesia.io/pricing) | 月契約29/89ドル確認。無料Basicを有料trialと同一視しない（free_trial=null）。年払い表とFAQの金額不一致→年料金未確認。7日内発表未確認 |
| Adobe Firefly | [公式プラン](https://www.adobe.com/products/firefly/plans.html) | US個人/月契約/通常料金の範囲へ限定。期間限定割引を基準額に混ぜない。外部モデル利用はプラン別。日本税込価格unknown |
| Canva | [newsroom](https://www.canva.com/newsroom/news/)、[料金](https://www.canva.com/pricing/) | 料金がen_inへ転送され旧US年額を再現できずcurrent_price=null。プラン/無料とtrialの旧確認値維持。7日内のAI2.0発表とは断定しない |
| Leonardo.Ai | [公式料金](https://www.leonardo.ai/pricing)、公式news検索 | Freeの150日次tokensと公開生成を反映。個人価格税別表示を確認。搭載モデル全件の現行性・日本提供は未確認。過去の比較記事の更新日を製品発表日にしない |
| Manus | [updates](https://manus.im/updates)は本文不十分、[製品docs](https://manus.im/docs/introduction/welcome)、[料金docs](https://manus.im/docs/introduction/plans) | facts新設、タスク実行/Free・Pro・Teamを根拠付き登録。価格・無料数・モデル世代・日本条件はnull/未確認。数値なしのdocsから補完しない |
| Genspark | [9/10 Gen-1 Slides](https://www.genspark.ai/blog/gen-1-slides) | facts新設。AI Slides Standard既定化、Enterprise既存制限を反映。自社benchmark順位は採用せず。プラン価格・無料枠・日本条件はunknown |
| Midjourney | [9/3 alpha更新](https://updates.midjourney.com/alpha-changelog-9-2-26/)、[Version](https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version)、[plans](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans) | facts新設。7/24既定V8.2、月契約と年一括を分けて登録。7日内新発表・無料提供・日本最終価格はunknown |
| Ideogram | [プランdocs](https://docs.ideogram.ai/plans-and-pricing/available-plans)、[live pricing](https://ideogram.ai/pricing/) | facts新設、無料/有料とクレジットの区別。文書の基準日8/21を表示。live価格は周期確定不足でnull。7日内モデル発表・日本条件unknown |
| ElevenLabs | [料金](https://elevenlabs.io/pricing) | 既存金額と一致。Creator初月11ドルと通常22ドルを分離して扱う。既存facts変更なし、全モデル/日本条件の確認完了とはしない |
| Writesonic | [現行料金](https://writesonic.com/pricing) | 取得本文では既存99ドルを確定できず。既存値は今回再確認済みにしない。公開現行比較で利用する前に追加確認が必要 |
| DeepSeek / Qwen / Kimi | 既存9月factsを保持。本担当の公式再取得は未実施 | 親担当の別確認結果と分ける。今回全項目verified_atを更新しない |

## データの境界

- `last_verified_at`は少なくとも1項目を確認した日で、全項目確認済みという意味ではない。表示は項目別source_id/verified_atを優先。
- 公式文書の発表日/改定日と、こちらの閲覧確認日を分ける。Claude5月文書とIdeogram8月文書を9月新発表に見せない。
- 日本語ページ/日本語生成/世界向け価格だけでは「日本で全機能購入可能」の根拠にしない。日本税込決済額の網羅確認は未実施。
- APIへのモデル追加を消費者Webプランの無料枠に転記しない。比較性能・最高/1位の自社マーケティング表現はfactsに採用しない。
- 新規4レコードは根拠の揃った項目だけで、providerの法人名などを想像しない。未確認はnull。

## 次の確認

1. Klingの閲覧可能な公式製品/料金資料で現行仕様を確認（制限回避・ログインなし）。
2. Canva日本料金、Pika月払い、Synthesia年契約の矛盾を公式表示で解消。
3. 公開導線へ新規factsを接続する際は、source日付/未知項目/地域/周期を保持。未完了factsの穴埋めを目的化しない。

検証: `node scripts/validate-data.mjs`成功。全体check/build/responsiveは統合担当で実施。本担当はスコア、recommend、UTM、計測、affiliate、投稿キュー、公開設定を変更していない。
