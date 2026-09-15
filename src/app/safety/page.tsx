import { FactsLayout, NextActions } from "@/components/PublicFactsPage";

export const metadata = {
  title: "AIの正確性・安全性を比較｜ハルシネーションを減らす選び方 | AI選び",
  description: "安全なAIを選ぶために、回答の正確性・ハルシネーション、入力データ、公開条件を分けて比較。順位だけに頼らず同じ資料で確かめる手順を解説します。",
  alternates: { canonical: "/safety" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "最も正確で安全なAIはどれですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "用途、モデル、プラン、入力資料によって結果が変わるため、一律の順位では決められません。同じ公開資料と質問を使い、根拠の一致、分からないことの扱い、入力データの条件を分けて確認します。",
      },
    },
    {
      "@type": "Question",
      name: "AIのハルシネーションを減らすにはどうしますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "答えが確認できる公開資料を指定し、根拠箇所を示すよう求め、重要な主張を原文と照合します。出典リンクの有無だけで正確とは判断しません。",
      },
    },
  ],
};

export default function Page() {
  return <FactsLayout title="AIの正確性・安全性は、3つに分けて比較する" intro="回答の間違いを減らしたいのか、社内資料を守りたいのか、成果物を安心して公開したいのか。同じ「安全性」でも確認先は違います。現在の全サービスを同条件で再測定していないため、一律の安全性順位は掲載しません。">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <section className="rounded-2xl border border-[#cbdad2] bg-[#eef4f0] p-5 sm:p-7 mb-8">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">まず結論</p>
      <h2 className="text-[23px] leading-[1.55] font-bold mb-3">「最も安全なAI」を1つの順位だけで決めない</h2>
      <p className="text-[15px] leading-[1.85] text-[var(--text-sub)] mb-0">正確性、入力データの扱い、公開条件は別の問題です。用途を1つ決め、候補を同じ資料・同じ質問で試し、契約プランごとの公式条件を確認します。</p>
    </section>
    <div className="grid gap-5 md:grid-cols-3">{[["回答の正確性","重要な主張の原文・日付・対象範囲を確認する。"],["入力データ","プランごとの学習利用・保存・共有範囲・社内ルールを確認する。"],["成果物の公開","素材の権利・引用・公開先の条件を確認する。"]].map(([title,text])=><section className="rounded-xl border bg-white p-6" key={title}><h2>{title}</h2><p>{text}</p></section>)}</div>
    <section className="mt-8"><h2>ハルシネーションが心配なら、同じ資料で確かめる</h2><p>以下は実測済みの順位ではなく、比較手順の提案です。公開資料を使い、正解を確認できる小さな質問から始めます。</p><ol className="list-decimal pl-6 space-y-3"><li>公開資料を1つ決め、答えが本文にある質問と、本文だけでは答えられない質問を用意する。</li><li>同じ資料・質問を各候補へ渡し、回答の根拠となる箇所を示してもらう。</li><li>原文との一致と、不明なことを不明と扱えるかを確認する。1回の結果を全用途の順位にしない。</li></ol><p>出典リンクがあるだけでは、主張が原文と一致しているとは限りません。重要な判断に使う箇所は原文まで戻って確認します。</p></section>
    <section className="mt-8"><h2>社内資料を使う前に確認すること</h2><p>モデル名だけでなく、契約プラン・保存・学習利用・共有範囲を確認してください。確認できない条件は「安全」とも「危険」とも断定せず、入力する範囲を保留します。まず機密情報を含まない検証用資料で作業を試します。</p></section>
    <section className="mt-8"><h2>確認の根拠</h2><p>以下は確認方法の参考資料です。特定製品の認証や安全性の優劣を示すものではありません。</p><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" rel="noopener noreferrer">NIST生成AIリスク管理資料（台帳確認 2026-09-11）↗</a></section>
    <NextActions sourcePage="/safety" title="守りたいものを決めたら、候補を比較" intro="安全性だけで契約を決めず、用途・料金・公式の利用条件を同じ順序で確認してください。" links={[
      { href: "/blog/ai-safety-ranking-2026", label: "詳しい確認手順", detail: "入力情報・出典・公開条件を整理" },
      { href: "/compare", label: "主要AIを比較", detail: "機能・料金・提供条件を見る" },
      { href: "/recommend", label: "用途から候補を絞る", detail: "3つの質問で入口を確認" },
      { href: "/methodology", label: "評価方法を見る", detail: "過去スコアの範囲と限界" },
    ]} />
  </FactsLayout>;
}
