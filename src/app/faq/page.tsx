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
        a: "AI選びは、AIツールの保存済み評価と、公式情報から確認した料金・機能などの客観情報を分けて掲載する比較サイトです。現在公開中の独自スコアは2026年3月時点の履歴値です。",
      },
      {
        q: "評価方法はどのようなものですか？",
        a: "保存資料では30テストの構成と採点方針を確認できます。ただしraw回答・採点ログが揃っていないため、再現済みの現在評価とは区別しています。詳しくは「評価方法論」をご覧ください。",
      },
      {
        q: "どのくらいの頻度で更新されますか？",
        a: "客観情報は公式ソースと確認日を記録して更新します。独自評価はモデル識別子、プロンプト、raw回答、採点根拠が揃った場合だけ更新します。現在のバッジは2026年3月の測定時点を示します。",
      },
      {
        q: "特定の企業と提携していますか？",
        a: "アフィリエイトリンクを掲載する場合があります。掲載時はPR表示を行い、報酬条件を評価点や順位に反映しません。",
      },
    ],
  },
  {
    category: "AIの選び方",
    questions: [
      {
        q: "初めてAIを使うならどれがおすすめですか？",
        a: "用途、予算、必要なデータ保護条件から候補を絞り、公式サイトで現在の無料条件を確認して短い実作業で試してください。「おすすめ診断」は2026年3月時点の保存済みルールによる候補整理に使えます。",
      },
      {
        q: "無料で使えるAIはありますか？",
        a: "無料プランや無料体験の有無・制限は頻繁に変わります。「料金・無料条件の確認ガイド」から各社公式サイトを開き、現在の対象地域と条件を確認してください。",
      },
      {
        q: "ビジネスで使うならどのAIが安全ですか？",
        a: "安全性ページの点数は2026年3月時点の14テストの履歴値で、現在の安全性を保証しません。業務利用では各社の現行規約、データ利用、保持、管理機能を公式資料で確認してください。",
      },
      {
        q: "プログラミングに最適なAIはどれですか？",
        a: "コーディングの点数・順位は2026年3月時点の保存済み履歴です。現在のモデルを同じリポジトリと課題で試し、正確さ、修正時間、レビューしやすさで判断してください。",
      },
      {
        q: "画像生成に強いAIはどれですか？",
        a: "画像生成の点数・順位は2026年3月時点の保存済み履歴です。現在のモデル、商用利用条件、生成回数、文字描画などを公式情報と自分の用途で確認してください。",
      },
    ],
  },
  {
    category: "料金について",
    questions: [
      {
        q: "各AIの有料プランはいくらですか？",
        a: "料金、プラン名、為替換算、税、無料枠は頻繁に変わるため、固定額を現在価格として掲載していません。「料金・無料条件の確認ガイド」から各社公式サイトをご確認ください。",
      },
      {
        q: "コスパが良いAIはどれですか？",
        a: "同じ実作業を無料条件内で試し、必要な機能、利用上限、追加課金、解約条件を比較してください。複数契約を前提にせず、作業時間の短縮が月額を上回るかで判断します。",
      },
    ],
  },
  {
    category: "安全性・プライバシー",
    questions: [
      {
        q: "AIに入力したデータは学習に使われますか？",
        a: "サービス、プラン、設定、地域により異なり、条件は変更されます。機密情報を入力せず、利用前に各社の現行プライバシーポリシーとデータコントロールを確認してください。",
      },
      {
        q: "会社で使う場合、情報漏洩のリスクはありますか？",
        a: "プランごとにデータ利用、保持、管理機能が異なります。機密情報は入力せず、導入前に現行の公式規約と組織向け管理設定を確認し、社内ルールに従ってください。",
      },
      {
        q: "著作権侵害のリスクが高いAIはどれですか？",
        a: "2026年3月の保存済みテストではモデル間に挙動差がありましたが、現在の挙動を保証しません。生成物を公開・商用利用する前に、利用規約、権利帰属、類似性を個別に確認してください。",
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
        a: "現在の主要比較セットは、2026年3月に保存された5モデルに限定されています。未掲載サービスを否定するものではなく、評価対象・手順・raw dataが揃った段階で追加を判断します。",
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
