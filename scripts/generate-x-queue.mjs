import fs from "node:fs";
import path from "node:path";

const outputPath = path.join(process.cwd(), "data/content-queue/x-revenue-phase1.json");
const createdAt = "2026-09-10";

function post(id, pillar, purpose, draft, targetPage, audience, cta, monetizationTarget, sourceRefs, needsFactCheck = true) {
  return {
    id,
    channel: "x",
    status: "draft",
    created_at: createdAt,
    pillar,
    purpose,
    draft,
    target_page: targetPage,
    audience,
    cta,
    monetization_target: monetizationTarget,
    source_refs: sourceRefs,
    needs_fact_check: needsFactCheck,
  };
}

const posts = [
  post("x-r-01", "Reach", "新しい無料導線の認知", "Adobe Fireflyは画像だけでなく、動画・音声・ベクターも扱う生成AIへ。2026年9月10日の公式プラン確認では無料枠あり。画像AIをまとめて比較したい人向けに整理しました。", "/categories/image-generation", "画像AIを初めて試す人", "画像生成AIの比較を見る", "adobe-firefly", ["adobe-firefly-plans"]),
  post("x-r-02", "Reach", "無料動画AIへの関心獲得", "AI動画を試すハードルが下がっています。HeyGenは公式料金ページで、カード不要・月3本までの無料プランを案内。ほかの動画AIと用途別に比べると選びやすいです。", "/categories/video-generation", "動画制作を試したい個人・担当者", "動画生成AIの比較を見る", "heygen", ["heygen-pricing"]),
  post("x-r-03", "Reach", "無料画像AIへの関心獲得", "Leonardo.Aiは公式料金ページで1日150 Fast Tokensの無料プランを案内。画像生成AIは『無料か』だけでなく、公開範囲や商用条件も一緒に確認したいところ。", "/categories/image-generation", "画像生成を試したいクリエイター", "画像生成AIの比較を見る", "leonardo-ai", ["leonardo-pricing"]),
  post("x-r-04", "Reach", "動画AI比較への送客", "Pikaの公式料金ページではBasicが無料、Pika 2.5へのアクセスを案内。短尺動画向けAIはモデル名だけでなく、解像度・credits・商用利用条件まで見るのがコツです。", "/categories/video-generation", "短尺動画クリエイター", "動画AIの違いを見る", "pika", ["pika-pricing"]),
  post("x-r-05", "Reach", "codingカテゴリへの送客", "Cursorは公式料金ページでカード不要のHobbyプラン、GitHub CopilotもFreeプランを提供。AIコーディングは無料枠で操作感を比較してから選ぶのが安全です。", "/categories/coding-tools", "AIコーディング初心者", "コーディングAIを比較する", "cursor", ["cursor-pricing", "github-copilot-pricing"]),
  post("x-r-06", "Reach", "AI検索カテゴリへの送客", "Perplexityの公式ヘルプではStandard（Free）とPro・Maxなどを案内。AI検索は回答の派手さより、出典確認とファイル対応を比べると選びやすいです。", "/categories/ai-search", "検索AIに関心がある人", "AI検索を比較する", "perplexity", ["perplexity-plans"]),

  post("x-a-01", "Authority", "独自比較の訴求", "【2026年3月実施の独自テスト】文章生成ではClaude 86.4、ChatGPT 86.3でほぼ同点。総合点だけでは見えない差を、用途別に比較しています。※再テスト前の履歴値です。", "/compare/claude-vs-chatgpt", "文章AIを比較中の人", "比較の内訳を見る", "none", ["src/data/tests.json", "src/data/models.json"]),
  post("x-a-02", "Authority", "coding評価への送客", "【2026年3月実施の独自テスト】コーディング平均はClaude 94.3、ChatGPT 81.3。4テストの内訳と採点方法を公開しています。※現在性能ではなく測定時点の結果です。", "/compare/claude-vs-chatgpt", "開発用途でAIを選ぶ人", "テスト別スコアを見る", "claude", ["src/data/tests.json", "src/app/methodology/page.tsx"]),
  post("x-a-03", "Authority", "安全性評価への送客", "AIは『賢さ』だけでなく、ハルシネーション・著作権・個人情報への対応も比較したい。AI選びでは安全性14項目の評価結果と重みを公開しています。", "/safety", "業務でAIを使う人", "安全性14項目を見る", "none", ["src/data/safety.json", "src/app/methodology/page.tsx"], false),
  post("x-a-04", "Authority", "方法論の信頼形成", "ランキングを見る前に、採点方法を見てください。AI選びはテスト項目、採点軸、限界を公開しています。再現記録のない数字は今後の更新で勝手に変更しません。", "/methodology", "比較サイトの根拠を重視する人", "評価方法を確認する", "none", ["src/app/methodology/page.tsx"], false),
  post("x-a-05", "Authority", "画像比較への送客", "画像AIは『きれい』だけでは比較できません。商品写真、日本語バナー、ロゴなど、用途ごとの結果を見ると選び方が変わります。AI選びの測定結果をカテゴリ別に公開中。", "/categories/image-generation", "画像制作担当者", "画像生成ランキングを見る", "adobe-firefly", ["src/data/tests.json"], false),
  post("x-a-06", "Authority", "診断利用の促進", "AI選びで迷う原因は、用途が曖昧なまま総合順位を見ること。文章・コード・画像・安全性のどれを優先するか決めると候補は絞れます。", "/recommend", "AI選びに迷う一般ユーザー", "おすすめ診断を試す", "none", ["src/data/recommendations.json"], false),

  post("x-c-01", "Conversion", "Firefly候補への送客", "画像・動画・音声を1つの制作環境で試したい人へ。Adobe Fireflyには無料プランと有料プランのfree trialがあります。契約前に他の画像AIとの違いを比較できます。", "/blog/ai-image-generation-2026", "制作ツールの購入検討者", "比較してから無料で試す", "adobe-firefly", ["adobe-firefly-plans"]),
  post("x-c-02", "Conversion", "Canva候補への送客", "非デザイナーが最初に試す画像AIなら、テンプレートと編集を一緒に使えるかが重要。CanvaはFreeとProのtrialを公式案内しています。まず用途との相性を比較。", "/categories/image-generation", "SNS・資料を作る非デザイナー", "比較結果を見る", "canva-ai", ["canva-pricing"]),
  post("x-c-03", "Conversion", "Synthesia候補への送客", "顔出し撮影なしで説明動画を作りたい場合、AIアバター型が候補。Synthesiaは無料Basic、HeyGenは無料3動画を公式案内。業務用途を基準に比較しました。", "/blog/ai-video-generation-2026", "研修・営業動画の担当者", "動画AIを比較する", "synthesia", ["synthesia-pricing", "heygen-pricing"]),
  post("x-c-04", "Conversion", "HeyGen候補への送客", "AI動画をいきなり契約する必要はありません。HeyGenはカード不要の無料プランで月3動画まで。画質・言語・透かしなどを比較してから判断できます。", "/categories/video-generation", "動画AIの購入検討者", "無料候補を比較する", "heygen", ["heygen-pricing"]),
  post("x-c-05", "Conversion", "Cursor候補への送客", "Cursor、Windsurf、GitHub Copilot。料金だけで選ぶ前に、エディタ型か、エージェント中心かを確認。無料プランのある候補を比較記事にまとめています。", "/blog/ai-coding-tools-2026", "個人開発者・エンジニア", "coding AI比較を見る", "cursor", ["cursor-pricing", "windsurf-pricing", "github-copilot-pricing"]),
  post("x-c-06", "Conversion", "診断から商用ページへ送客", "『一番強いAI』より『自分の仕事に合うAI』を選ぶ方が失敗しにくい。3分診断で用途を整理して、無料プランのある候補まで確認できます。", "/recommend", "初めて有料AIを検討する人", "おすすめ診断を試す", "multi-service", ["src/data/recommendations.json"], false),

  post("x-t-01", "Retention", "比較の使い方教育", "AI比較のコツ① 総合点ではなく、自分が週3回以上使う用途の点数を見る。文章中心なら文章、開発ならcoding、社内利用なら安全性も確認。", "/compare", "AI比較を始めた人", "用途別に比較する", "none", ["src/data/models.json"], false),
  post("x-t-02", "Retention", "無料枠からの利用促進", "AI比較のコツ② 無料プランがあるなら、同じ作業を2サービスで試す。使いやすさ、修正回数、出力までの時間をメモすると自分向けの答えが見えます。", "/recommend", "無料AI利用者", "比較条件を診断する", "multi-service", ["data/service-facts"], false),
  post("x-t-03", "Retention", "料金ページへの送客", "AI比較のコツ③ 月額だけでなく、利用上限・追加課金・解約後のcreditsを確認。『安いプラン』より『予算を超えないプラン』を選ぶのが大事です。", "/cost", "有料AIを検討する人", "コストを計算する", "multi-service", ["data/service-facts"], false),
  post("x-t-04", "Retention", "安全利用教育", "業務AIの基本: 機密情報は入力前に削る。回答は一次情報で確認する。外部送信や購入を伴う操作は人が承認する。この3つだけでも事故を減らせます。", "/safety", "業務利用者", "安全性比較を見る", "none", ["src/data/safety.json"], false),
  post("x-t-05", "Retention", "動画AI選定教育", "動画AIを比べるときのチェック項目: ①無料枠 ②透かし ③解像度 ④商用条件 ⑤日本語音声 ⑥月の生成量。デモ映像だけで決めないのがコツ。", "/categories/video-generation", "動画制作初心者", "動画AI比較を見る", "multi-service", ["data/service-facts"], false),
  post("x-t-06", "Retention", "画像AI選定教育", "画像AIを比べるときは、同じプロンプトで①文字の正確さ ②人物の破綻 ③修正機能 ④商用条件を確認。用途別の比較結果も合わせて見ると選びやすいです。", "/categories/image-generation", "画像生成初心者", "画像AI比較を見る", "adobe-firefly", ["src/data/tests.json"], false)
];

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify({ schema_version: 1, generated_at: createdAt, publish_automatically: false, posts }, null, 2)}\n`);
console.log(`Generated ${posts.length} draft X posts at ${path.relative(process.cwd(), outputPath)}.`);
