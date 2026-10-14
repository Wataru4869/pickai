import { FactsLayout, NextActions } from "@/components/PublicFactsPage";
import { safetyClusterTopics } from "@/data/safety-cluster-articles";

export const metadata = {
  title: "生成AIの安全性を悩み別に調べる｜個人情報・会社利用・事故対応 | AIえらびマップ",
  description: "写真、PDF、履歴書、議事録、会社情報、共有リンク、AIエージェントなど、生成AIの個人情報と情報漏洩の悩みを場面別に探せます。",
  alternates: { canonical: "/safety/topics" },
};

const groupNotes = {
  "入力・ファイル": "何を消し、どこまで加工してからAIへ渡すか",
  "会社・仕事": "契約・社内ルール・顧客情報をどう扱うか",
  "製品・設定": "学習、保存、削除、個人版と法人版をどう比べるか",
  "攻撃・事故対応": "共有ミス、なりすまし、権限過多へどう備えるか",
};

export default function Page() {
  const groups = Object.keys(groupNotes) as (keyof typeof groupNotes)[];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "生成AIの安全性・個人情報ガイド",
    numberOfItems: safetyClusterTopics.length,
    itemListElement: safetyClusterTopics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.title,
      url: `https://www.aierabi.jp/blog/${topic.slug}`,
    })),
  };

  return <FactsLayout
    title="生成AIの安全性を、今の悩みから調べる"
    intro="『AIは危険？』だけでは、取るべき行動が決まりません。入力するもの、仕事での立場、使う機能、すでに起きたことから近いテーマを選んでください。"
    breadcrumbs={[{ label: "トップ", href: "/" }, { label: "安全に使う", href: "/safety" }, { label: "悩み別の記事" }]}
  >
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }} />
    <section className="rounded-2xl border border-[#cbdad2] bg-[#eef4f0] p-5 sm:p-7 mb-8">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">全24テーマ・2026年10月14日確認</p>
      <h2 className="text-[23px] leading-[1.55] font-bold mb-3">まず、いちばん近い場面を1つ選ぶ</h2>
      <p className="text-[15px] leading-[1.85] text-[var(--text-sub)] mb-0">各記事は結論、危険が生まれる場面、5つの手順、判断表、FAQ、一次情報の順で読めます。法的な安全認定ではなく、具体的な確認を始めるためのガイドです。</p>
    </section>
    <nav aria-label="安全性記事の分野" className="grid gap-3 sm:grid-cols-2 mb-10">
      {groups.map(group => <a key={group} href={`#${group}`} className="rounded-xl border border-[var(--border)] bg-white p-4 no-underline text-inherit hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><strong className="block mb-1">{group}</strong><span className="text-[13px] text-[var(--text-sub)]">{groupNotes[group]} →</span></a>)}
    </nav>
    {groups.map(group => <section key={group} id={group} className="mt-10 scroll-mt-24" aria-labelledby={`${group}-title`}>
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">{groupNotes[group]}</p>
      <h2 id={`${group}-title`}>{group}</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-5">
        {safetyClusterTopics.filter(topic => topic.group === group).map((topic, index) => <a key={topic.slug} href={`/blog/${topic.slug}`} className="rounded-xl border border-[var(--border)] bg-white p-5 no-underline text-inherit shadow-[0_8px_24px_rgba(18,55,45,0.06)] hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition" data-analytics-event="internal_cta_click" data-source-page="/safety/topics" data-cta-type="safety_topic" data-cta-position={`${group}_${index + 1}`} data-destination-id={`/blog/${topic.slug}`}>
          <span className="text-[11px] font-bold text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 mb-2 text-[18px] leading-[1.6]">{topic.title}</h3>
          <p className="mb-0 text-[14px] leading-[1.75] text-[var(--text-sub)]">{topic.description}<span className="block mt-3 font-bold text-[var(--accent)]">判断表と手順を見る →</span></p>
        </a>)}
      </div>
    </section>)}
    <NextActions sourcePage="/safety/topics" title="全体像または緊急時の手順へ" intro="迷った場合は全体像から。すでに入力・共有した場合は、追加送信を止めて対処手順へ進んでください。" links={[
      { href: "/blog/ai-personal-data-leak-cases-2026", label: "AIと個人情報漏洩の全体像", detail: "5つの漏洩経路と対策を整理" },
      { href: "/blog/ai-data-entered-response-2026", label: "すでに入力した時の対処", detail: "削除・共有解除・秘密の失効" },
      { href: "/blog/ai-what-not-to-enter-2026", label: "入力前の判断表", detail: "そのまま・加工・入力しない" },
      { href: "/safety", label: "安全性の入口へ戻る", detail: "正確性・入力・公開を分けて確認" },
    ]} />
  </FactsLayout>;
}
