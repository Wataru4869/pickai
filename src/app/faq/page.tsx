import { Header, Footer, Block, Breadcrumb } from "@/components/ui";

export const metadata = {
  title: "よくある質問（FAQ） | AI選び",
  description:
    "AI選びの評価方法、おすすめAIの選び方、料金比較、安全性などに関するよくある質問をまとめています。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問（FAQ） | AI選び",
    description:
      "AI選びの評価方法、おすすめAIの選び方、料金比較、安全性などに関するよくある質問をまとめています。",
    url: "/faq",
  },
};

const FAQ_ITEMS = [
  {
    category: "サイトについて",
    questions: [
      {
        q: "AI選びとは何ですか？",
        a: "AI選びは、主要AIツール（ChatGPT、Claude、Gemini、Grok、Perplexity）を独自の30テスト＋安全性14テストで評価・比較する情報サイトです。文章生成・コーディング・画像生成・安全性の4軸でスコアリングし、用途別のおすすめAIを提案しています。",
      },
      {
        q: "評価方法はどのようなものですか？",
        a: "全30テスト（文章生成8、コーディング4、画像生成4、安全性14）を同一条件で各AIに実施し、100点満点で採点しています。テストのプロンプト・採点基準はすべて「評価方法論」ページで公開しています。",
      },
      {
        q: "どのくらいの頻度で更新されますか？",
        a: "主要AIのアップデートに合わせて随時再テストを行い、スコアを更新しています。最終テスト実施日はサイト内のバッジに表示されています。",
      },
      {
        q: "特定の企業と提携していますか？",
        a: "いいえ。AI選びは特定のAI企業との利害関係はなく、独自テストの結果に基づいた公平な比較情報を提供しています。",
      },
    ],
  },
  {
    category: "AIの選び方",
    questions: [
      {
        q: "初めてAIを使うならどれがおすすめですか？",
        a: "汎用的に使いたいなら総合1位のChatGPTがおすすめです。無料プランでも基本機能が使えます。文章作成が中心ならGrok、プログラミング用途ならClaude、調べものが中心ならPerplexityが適しています。「おすすめ診断」ページで用途に合ったAIを提案しています。",
      },
      {
        q: "無料で使えるAIはありますか？",
        a: "ChatGPT、Claude、Gemini、Grok、Perplexityの5つすべてに無料プランがあります。ただし、メッセージ数制限やモデル制限など、各サービスで制約が異なります。詳細は「コスト計算」ページをご覧ください。",
      },
      {
        q: "ビジネスで使うならどのAIが安全ですか？",
        a: "安全性スコアではClaude（93.7点）が1位、ChatGPT（90.5点）が2位です。データの取り扱いポリシー、著作権配慮、個人情報保護など10軸48項目で評価しています。詳しくは「安全性比較」ページをご確認ください。",
      },
      {
        q: "プログラミングに最適なAIはどれですか？",
        a: "コーディングテストではClaude（94.3点）が圧倒的な1位で、Grok（86.3点）、ChatGPT（81.3点）と続きます。コード生成・デバッグ・レビュー・データ分析の4テストで評価しています。",
      },
      {
        q: "画像生成に強いAIはどれですか？",
        a: "画像生成テストではChatGPT（92.0点）が1位です。商品写真・SNSバナー・ロゴ・画風模倣の4テストで評価しており、DALL-E統合のChatGPTが総合的に最も高品質です。Perplexity（66.5点）、Gemini（62.5点）がそれに続きます。",
      },
    ],
  },
  {
    category: "料金について",
    questions: [
      {
        q: "各AIの有料プランはいくらですか？",
        a: "主要プランの月額料金は、ChatGPT Plus 月3,000円、Claude Pro 月3,000円、Gemini AI Pro 月3,000円、Grok SuperGrok 月4,500円、Perplexity Pro 月3,000円です。上位プランは各社で大きく異なり、ChatGPT Pro 月30,000円、Claude Max 月15,000円などがあります。",
      },
      {
        q: "コスパが良いAIはどれですか？",
        a: "無料プランの充実度ではChatGPTとGeminiが優れています。有料プラン同士の比較では、月3,000円帯でChatGPT PlusとClaude Proが最も機能バランスが良く、用途に応じた使い分けや併用がおすすめです。",
      },
    ],
  },
  {
    category: "安全性・プライバシー",
    questions: [
      {
        q: "AIに入力したデータは学習に使われますか？",
        a: "サービスにより異なります。ChatGPTとGeminiはデフォルトで学習に利用しますが、設定でオプトアウト可能です。Claudeはデフォルトで学習に使用しません。Grokは現時点でオプトアウト手段がなく、注意が必要です。",
      },
      {
        q: "会社で使う場合、情報漏洩のリスクはありますか？",
        a: "各社のビジネスプラン（API利用含む）では、入力データの学習利用を行わない契約が標準です。個人プランで業務利用する場合は、データ取扱いポリシーを確認し、機密情報の入力を避けることを推奨します。",
      },
      {
        q: "著作権侵害のリスクが高いAIはどれですか？",
        a: "安全性テストでは、Grokが歌詞の全文出力や画風模倣画像の生成を行うなど、著作権保護の面で課題があります。Claudeは著作権保護に最も厳格で、ChatGPTとGeminiも一定の制限を設けています。",
      },
    ],
  },
  {
    category: "テスト・スコアについて",
    questions: [
      {
        q: "総合スコアの算出方法は？",
        a: "文章生成（8テスト）・コーディング（4テスト）・画像生成（4テスト）の各カテゴリスコアに、安全性スコアを加えた4軸で総合スコアを算出しています。詳しい算出方法は「評価方法論」ページで公開しています。",
      },
      {
        q: "DeepSeekが掲載されていないのはなぜですか？",
        a: "DeepSeekは中国発のサービスであり、データの取り扱いに関する懸念（中国国内サーバーへのデータ送信等）から、日本のビジネスユーザー向けの推奨が困難と判断し、比較対象から除外しています。",
      },
      {
        q: "2モデル比較ページとは何ですか？",
        a: "任意の2つのAIモデルを、全テスト結果で直接比較できるページです。「ChatGPT vs Claude」のように、各テスト項目ごとの勝敗・スコア差・レーダーチャートで違いを視覚的に把握できます。比較ページ一覧からアクセスできます。",
      },
    ],
  },
];

const allQuestions = FAQ_ITEMS.flatMap((cat) => cat.questions);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <Breadcrumb
            items={[
              { label: "トップ", href: "/" },
              { label: "よくある質問" },
            ]}
          />
          <h1 className="text-[20px] font-bold text-[var(--text)] mb-1">
            よくある質問（FAQ）
          </h1>
          <p className="text-[12px] text-[var(--text-sub)] leading-relaxed">
            AI選びの使い方、AIツールの選び方、料金、安全性に関するよくある質問
          </p>
        </div>
      </div>

      {FAQ_ITEMS.map((category, catIdx) => (
        <Block key={catIdx} alt={catIdx % 2 === 1}>
          <h2 className="text-[15px] font-bold text-[var(--text)] pl-3 border-l-[3px] border-[var(--link)] mb-4">
            {category.category}
          </h2>
          <div className="space-y-0">
            {category.questions.map((item, qIdx) => (
              <div
                key={qIdx}
                className="py-3 border-b border-[var(--border-light)] last:border-b-0"
              >
                <h3 className="text-[14px] font-semibold text-[var(--text)] mb-1.5 leading-snug">
                  Q. {item.q}
                </h3>
                <p className="text-[13px] text-[var(--text-sub)] leading-relaxed pl-0.5">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Block>
      ))}

      <Block>
        <div className="border border-[var(--border)] rounded p-4 text-center">
          <p className="text-[14px] font-semibold text-[var(--text)] mb-1">
            自分に合ったAIを見つけたい方へ
          </p>
          <p className="text-[12px] text-[var(--text-sub)] mb-3">
            職種・用途・予算から最適なAIツールを提案します
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/recommend"
              className="px-4 py-2 bg-[var(--link)] text-white text-[12px] font-medium rounded no-underline hover:opacity-90 transition-opacity"
            >
              おすすめ診断を受ける
            </a>
            <a
              href="/compare"
              className="px-4 py-2 border border-[var(--border)] text-[var(--text)] text-[12px] font-medium rounded no-underline hover:bg-[var(--bg-section)] transition-colors"
            >
              2モデル比較を見る
            </a>
          </div>
        </div>
      </Block>

      <Footer />
    </div>
  );
}
