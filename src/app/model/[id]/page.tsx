import { notFound } from "next/navigation";
import { FactsLayout, FactCards, NextActions, ToolSummary } from "@/components/PublicFactsPage";
import { modelNames } from "@/lib/public-catalog";

export function generateStaticParams() {
  return Object.keys(modelNames).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!Object.hasOwn(modelNames, id)) return {};
  const title = id === "grok"
    ? "Grokの評判を確かめる｜機能・料金・注意点 | AI選び"
    : `${modelNames[id]}の機能・利用条件 | AI選び`;
  const description = id === "grok"
    ? "Grokの評判だけで決めず、X版・単体版の違い、公式の機能・料金・無料条件、注意点を確認日付きで整理。過去スコアとは分けて判断できます。"
    : "公式情報の確認日と出典を項目別に表示。未確認の情報と過去の独自スコアを分けて掲載。";
  const url = `/model/${id}`;
  return {
    title,
    description,
    robots: id === "copilot" ? { index: false, follow: true } : undefined,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!Object.hasOwn(modelNames, id)) notFound();
  const intro = id === "grok"
    ? "Grokの評判は利用場所や目的で変わります。口コミだけで決めず、X版・単体版の違い、現在の機能・料金・無料条件、入力情報の扱いを公式情報から確認します。"
    : "どんな作業の候補になるかを先に確認し、その後で機能・料金・提供条件を見ます。表示モデルや地域・契約による違いは公式情報をご確認ください。";

  return <FactsLayout title={id === "grok" ? "Grokの評判・機能・料金を確認" : modelNames[id]} intro={intro} eyebrow="AIの特徴と利用条件">
    <ToolSummary id={id} />
    <FactCards ids={[id]} />
    {id === "grok" && <section className="rounded-2xl border border-[#d7e1dc] bg-white p-5 sm:p-7 mb-8">
      <h2 className="text-[21px] font-bold mb-3">評判を見るときの3つの確認点</h2>
      <ol className="list-decimal pl-6 space-y-2 text-[14px] leading-[1.8] text-[var(--text-sub)]">
        <li>X内と単体サービスのどちらを使った評価か</li>
        <li>検索・文章・画像など、同じ用途を比べているか</li>
        <li>投稿時点のモデル・プラン・利用条件が分かるか</li>
      </ol>
      <p className="mt-4 mb-0 text-[14px] leading-[1.8] text-[var(--text-sub)]">現在の日本語品質や他AIとの優劣は、同条件で再測定していないため断定しません。</p>
      <a href="/blog/grok-review-2026" className="inline-flex min-h-11 items-center mt-3 text-[13px] font-bold text-[var(--link)]" data-analytics-event="internal_cta_click" data-source-page="/model/grok" data-cta-type="guide" data-cta-position="grok_reputation_checks" data-destination-id="/blog/grok-review-2026">Grokの確認手順を詳しく読む →</a>
    </section>}
    <NextActions sourcePage={`/model/${id}`} title="候補を決める前に、条件をそろえる" intro="このページだけで契約を決めず、ほかの候補・料金の数え方・用途を同じ順序で確認してください。" links={[
      { href: "/compare", label: "同じ項目で比較", detail: "主要5サービスの公式情報" },
      { href: "/recommend", label: "用途から候補を絞る", detail: "3つの質問で確認の入口へ" },
      { href: "/cost", label: "料金条件を確認", detail: "月額・従量課金・無料枠の見方" },
      { href: "/safety", label: "安全に使う", detail: "入力データと利用条件の見方" },
    ]} />
  </FactsLayout>;
}
