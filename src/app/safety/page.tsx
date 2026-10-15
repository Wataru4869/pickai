import { FactsLayout, NextActions } from "@/components/PublicFactsPage";

export const metadata = {
  title: "安全なAIの選び方｜ハルシネーション・個人情報・情報漏洩を比較 | AIえらびマップ",
  description: "安全性の高いAIを選ぶために、ハルシネーション、個人情報・社内資料の扱い、成果物の権利を分けて比較。入力前・入力後の対処と公式条件の確認手順も解説します。",
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
      name: "生成AIに入力してはいけない情報は何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "パスワードやAPIキー、個人を特定できる情報、顧客名簿、未公開の契約・売上・ソースコード、権利や同意を確認していない他人の写真や音声は入力しません。",
      },
    },
    {
      "@type": "Question",
      name: "生成AIに個人情報を入力してしまったらどうしますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "追加送信を止め、入力内容と共有範囲を確認します。秘密情報は失効し、会話と共有リンクを削除します。会社や顧客の情報なら組織の事故対応手順へ報告します。",
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
  const title = "安全なAIは、守りたいものから選ぶ";
  return <FactsLayout title={title} intro="安全性の高いAIは、1つの総合順位だけでは決まりません。回答の誤り、個人情報・社内資料、公開する成果物の3つに分け、用途に合う候補と公式条件を確認します。" breadcrumbs={[{label:"トップ",href:"/"},{label:"安全なAIの選び方"}]}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <section className="rounded-2xl border border-[#cbdad2] bg-[#eef4f0] p-5 sm:p-7 mb-8">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">まず結論</p>
      <h2 className="text-[23px] leading-[1.55] font-bold mb-3">「安全性の高いAI」は、用途ごとに確認先が違う</h2>
      <p className="text-[15px] leading-[1.85] text-[var(--text-sub)] mb-0">ハルシネーションが少ないことと、入力データが適切に扱われることは別です。用途を1つ決め、候補を同じ資料・同じ質問で試し、使うプランの保存・学習・共有条件を公式情報で確認します。</p>
    </section>
    <section className="mt-8" aria-labelledby="safety-three-axes">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">最初に見る3項目</p>
      <h2 id="safety-three-axes">安全性を3つに分ける</h2>
      <p>「安全なAIを知りたい」ときは、次の表で自分の心配に近い行から確認してください。</p>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white mt-5" tabIndex={0} role="region" aria-label="AIの安全性を確認する3項目（横スクロール可能）">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-[#eef4f0]"><tr><th className="p-4">心配なこと</th><th className="p-4">比べるもの</th><th className="p-4">次に見るページ</th></tr></thead>
          <tbody>
            <tr className="border-t border-[var(--border)]"><th scope="row" className="p-4">回答が間違う</th><td className="p-4">同じ資料・質問で、主張と原文の一致を確認</td><td className="p-4"><a href="/blog/ai-safety-ranking-2026">ハルシネーションの比べ方 →</a></td></tr>
            <tr className="border-t border-[var(--border)]"><th scope="row" className="p-4">個人情報・社内資料が心配</th><td className="p-4">プラン別の学習、保存、共有、管理者権限</td><td className="p-4"><a href="/blog/ai-what-not-to-enter-2026">入力前の判断表 →</a></td></tr>
            <tr className="border-t border-[var(--border)]"><th scope="row" className="p-4">成果物を公開したい</th><td className="p-4">引用元、素材の権利、公開先の利用条件</td><td className="p-4"><a href="/methodology">確認方法と限界 →</a></td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] text-[var(--text-sub)]">この表は確認順を示すもので、特定サービスの安全認定や現在の性能順位ではありません。</p>
    </section>
    <section className="mt-8" aria-labelledby="safety-concerns">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">何が心配ですか？</p>
      <h2 id="safety-concerns">悩みに合う確認手順を選ぶ</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-5">
        {[
          ["最近の漏洩事例と危険性を知りたい", "ChatGPT関連の公表事例と5つの漏洩経路を整理", "/blog/ai-personal-data-leak-cases-2026"],
          ["何を入力してはいけない？", "個人情報・社内資料・秘密情報を3段階で判断", "/blog/ai-what-not-to-enter-2026"],
          ["もう入力してしまった", "削除・共有解除・秘密情報の失効を順に確認", "/blog/ai-data-entered-response-2026"],
          ["学習オフなら安全？", "学習・保存・人の確認・共有の違いを整理", "/blog/ai-training-retention-review-2026"],
          ["会社で使ってよい？", "用途・データ・契約・権限のチェックリスト", "/blog/ai-business-security-checklist-2026"],
          ["立場によって何が違う？", "個人・会社・フリーランス・開発者で線引き", "/blog/ai-privacy-by-usecase-2026"],
          ["AIの回答を信じてよい？", "ハルシネーションと情報漏洩を分けて確認", "/blog/ai-safety-ranking-2026"],
        ].map(([label, detail, href], index) => <a key={href} href={href} className="rounded-xl border border-[var(--border)] bg-white p-5 no-underline text-inherit hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" data-analytics-event="internal_cta_click" data-source-page="/safety" data-cta-type="concern" data-cta-position={`safety_concern_${index + 1}`} data-destination-id={href}>
          <h3 className="mb-2">{label}</h3><p className="mb-0 text-[14px] leading-[1.75] text-[var(--text-sub)]">{detail}<span className="block mt-2 font-bold text-[var(--accent)]">確認する →</span></p>
        </a>)}
      </div>
    </section>
    <section className="mt-8 rounded-2xl border border-[#d9c79f] bg-[#fff9eb] p-5 sm:p-7" aria-labelledby="safety-topic-library">
      <p className="text-[12px] font-bold text-[#8a5b12] mb-2">写真・PDF・仕事・事故対応まで</p>
      <h2 id="safety-topic-library" className="mb-3">安全性の記事を24テーマから探す</h2>
      <p className="text-[15px] leading-[1.85] text-[var(--text-sub)]">履歴書、議事録、写真、Excel、共有リンク、ブラウザ拡張、AIエージェント、シャドーAIなど、具体的な場面ごとに判断表と手順を用意しました。</p>
      <a href="/safety/topics" className="inline-flex min-h-11 items-center rounded-lg bg-[var(--accent)] px-5 py-3 font-bold text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">悩み別の記事一覧を見る →</a>
    </section>
    <div className="grid gap-5 md:grid-cols-3">{[["回答の正確性","重要な主張の原文・日付・対象範囲を確認する。"],["入力データ","プランごとの学習利用・保存・共有範囲・社内ルールを確認する。"],["成果物の公開","素材の権利・引用・公開先の条件を確認する。"]].map(([title,text])=><section className="rounded-xl border bg-white p-6" key={title}><h2>{title}</h2><p>{text}</p></section>)}</div>
    <section className="mt-8"><h2>ハルシネーションが心配なら、同じ資料で確かめる</h2><p>以下は実測済みの順位ではなく、比較手順の提案です。公開資料を使い、正解を確認できる小さな質問から始めます。</p><ol className="list-decimal pl-6 space-y-3"><li>公開資料を1つ決め、答えが本文にある質問と、本文だけでは答えられない質問を用意する。</li><li>同じ資料・質問を各候補へ渡し、回答の根拠となる箇所を示してもらう。</li><li>原文との一致と、不明なことを不明と扱えるかを確認する。1回の結果を全用途の順位にしない。</li></ol><p>出典リンクがあるだけでは、主張が原文と一致しているとは限りません。重要な判断に使う箇所は原文まで戻って確認します。</p></section>
    <section className="mt-8"><h2>社内資料を使う前に確認すること</h2><p>モデル名だけでなく、契約プラン・保存・学習利用・人による確認・共有・接続アプリを確認してください。確認できない条件は「安全」とも「危険」とも断定せず、入力を保留します。まず機密情報を含まない検証用資料で作業を試します。</p></section>
    <section className="mt-8"><h2>確認の根拠</h2><p>以下は確認方法の参考資料です。特定製品の安全認定や順位を示すものではありません。</p><ul className="space-y-2"><li><a href="https://www.ppc.go.jp/news/careful_information/261007_alert/" rel="noopener noreferrer">個人情報保護委員会：大規模な漏えい等事案を踏まえた対応↗</a></li><li><a href="https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/" rel="noopener noreferrer">個人情報保護委員会：生成AIサービス利用の注意喚起↗</a></li><li><a href="https://www.meti.go.jp/press/2024/02/20250218003/20250218003.html" rel="noopener noreferrer">経済産業省：AIの利用・開発に関する契約チェックリスト↗</a></li><li><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" rel="noopener noreferrer">NIST生成AIリスク管理資料↗</a></li></ul><p className="mt-3 text-[13px] text-[var(--text-sub)]">最終確認：2026-10-14。製品ごとの保存・学習・共有条件は各記事から公式情報を確認してください。</p></section>
    <section className="mt-8">
      <h2>よくある質問</h2>
      <div className="space-y-5">
        <div><h3>最も正確で安全なAIはどれですか？</h3><p>用途、モデル、プラン、入力資料によって結果が変わるため、一律の順位では決められません。同じ公開資料と質問を使い、根拠の一致、分からないことの扱い、入力データの条件を分けて確認します。</p></div>
        <div><h3>AIのハルシネーションを減らすにはどうしますか？</h3><p>答えが確認できる公開資料を指定し、根拠箇所を示すよう求め、重要な主張を原文と照合します。出典リンクの有無だけで正確とは判断しません。</p></div>
        <div><h3>生成AIに入力してはいけない情報は何ですか？</h3><p>パスワードやAPIキー、個人を特定できる情報、顧客名簿、未公開の契約・売上・ソースコード、権利や同意を確認していない他人の写真や音声は入力しません。</p></div>
        <div><h3>生成AIに個人情報を入力してしまったらどうしますか？</h3><p>追加送信を止め、入力内容と共有範囲を確認します。秘密情報は失効し、会話と共有リンクを削除します。会社や顧客の情報なら組織の事故対応手順へ報告します。</p></div>
      </div>
    </section>
    <NextActions sourcePage="/safety" title="守りたいものを決めたら、候補を比較" intro="安全性だけで契約を決めず、用途・料金・公式の利用条件を同じ順序で確認してください。" links={[
      { href: "/blog/ai-what-not-to-enter-2026", label: "入力前の判断表", detail: "そのまま使う・加工する・入力しない" },
      { href: "/compare", label: "主要AIを比較", detail: "機能・料金・提供条件を見る" },
      { href: "/recommend", label: "用途から候補を絞る", detail: "3つの質問で入口を確認" },
      { href: "/methodology", label: "評価方法を見る", detail: "過去スコアの範囲と限界" },
    ]} />
  </FactsLayout>;
}
