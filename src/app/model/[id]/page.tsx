import { notFound } from "next/navigation";
import { FactsLayout, FactCards, NextActions, ServiceExperience, ToolSummary } from "@/components/PublicFactsPage";
import { categoryForService, editorialProfiles, modelNames } from "@/lib/public-catalog";

const directGuide: Record<string, { href: string; label: string; detail: string }> = {
  chatgpt: { href: "/compare/claude-vs-chatgpt", label: "Claudeと比較", detail: "文章・資料・機能条件の違い" },
  claude: { href: "/compare/claude-vs-chatgpt", label: "ChatGPTと比較", detail: "複数用途と資料作業の違い" },
  gemini: { href: "/compare/chatgpt-vs-gemini", label: "ChatGPTと比較", detail: "機能・料金・提供条件の違い" },
  grok: { href: "/compare/chatgpt-vs-grok", label: "ChatGPTと比較", detail: "検索を含む使い方の違い" },
  perplexity: { href: "/compare/chatgpt-vs-perplexity", label: "ChatGPTと比較", detail: "対話と出典確認の違い" },
  cursor: { href: "/blog/cursor-vs-github-copilot-2026", label: "開発ツールを比較", detail: "CursorとGitHub Copilotの選び方" },
  "github-copilot": { href: "/blog/cursor-vs-github-copilot-2026", label: "Cursorと比較", detail: "開発フローと料金条件の違い" },
  windsurf: { href: "/blog/cursor-vs-windsurf-2026", label: "Cursorと比較", detail: "名称変更後の製品条件も確認" },
  "adobe-firefly": { href: "/blog/midjourney-vs-adobe-firefly-2026", label: "Midjourneyと比較", detail: "画像制作工程と利用条件の違い" },
  midjourney: { href: "/blog/midjourney-vs-adobe-firefly-2026", label: "Fireflyと比較", detail: "作り方と利用条件の違い" },
  runway: { href: "/blog/runway-vs-pika-2026", label: "Pikaと比較", detail: "動画の作り方と条件の違い" },
  pika: { href: "/blog/runway-vs-pika-2026", label: "Runwayと比較", detail: "動画の作り方と条件の違い" },
  heygen: { href: "/blog/heygen-vs-synthesia-2026", label: "Synthesiaと比較", detail: "アバター動画の用途別判断" },
  synthesia: { href: "/blog/heygen-vs-synthesia-2026", label: "HeyGenと比較", detail: "アバター動画の用途別判断" },
};

export function generateStaticParams() {
  return Object.keys(modelNames).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!Object.hasOwn(modelNames, id)) return {};
  const title = id === "grok"
    ? "Grokの評判を確かめる｜機能・料金・注意点 | AIえらびマップ"
    : `${modelNames[id]}とは？できること・使い方・料金を確認 | AIえらびマップ`;
  const description = id === "grok"
    ? "Grokの評判だけで決めず、X版・単体版の違い、公式の機能・料金・無料条件、注意点を確認日付きで整理。過去スコアとは分けて判断できます。"
    : `${modelNames[id]}でできること、使い方の例、比較ポイント、料金・無料条件を整理。出典を確認できた公式情報と、過去の評価を分けて掲載します。`;
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
  const profile = editorialProfiles[id];
  const intro = id === "grok"
    ? "Grokの評判は利用場所や目的で変わります。口コミだけで決めず、X版・単体版の違い、現在の機能・料金・無料条件、入力情報の扱いを公式情報から確認します。"
    : `${profile?.summary ?? "どんな作業の候補になるか"}。できること、具体的な試し方、比較ポイントを見てから、機能・料金・提供条件を確認します。`;

  const title = id === "grok" ? "Grokの評判・機能・料金を確認" : modelNames[id];
  const category = categoryForService[id];
  const guide = directGuide[id];
  const nextLinks = [
    ...(guide ? [guide] : []),
    ...(category ? [{ href: category.href, label: `${category.label}から探す`, detail: "同じ用途の候補と確認項目を見る" }] : [{ href: "/categories", label: "用途から候補を探す", detail: "作りたいものから入口を選ぶ" }]),
    { href: "/cost", label: "料金条件を確認", detail: "月額・従量課金・無料枠の見方" },
    { href: "/safety", label: "安全に使う", detail: "入力データと利用条件の見方" },
  ].slice(0, 4);
  return <FactsLayout title={title} intro={intro} eyebrow="AIの特徴と利用条件" breadcrumbs={[{label:"トップ",href:"/"},category ? {label:category.label,href:category.href} : {label:"AIを比較",href:"/compare"},{label:title}]}>
    <ToolSummary id={id} />
    <ServiceExperience id={id} />
    <FactCards ids={[id]} showActions={false} />
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
    <NextActions sourcePage={`/model/${id}`} title="候補を決める前に、条件をそろえる" intro="このページだけで契約を決めず、同じ用途の候補・料金の数え方・安全条件を同じ順序で確認してください。" links={nextLinks} />
  </FactsLayout>;
}
