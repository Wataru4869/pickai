import { FactsLayout, FactCards, ComparisonSummary } from "@/components/PublicFactsPage";
import { pairIds, modelNames } from "@/lib/public-catalog";
export const metadata = { title: "AI比較｜機能・料金の根拠から選ぶ | AI選び", description: "確認日付きの公式情報でAIサービスを比較。過去の点数による順位や勝敗とは分けて掲載。", alternates: { canonical: "/compare" } };
export default function Page() { return <FactsLayout title="AI同士を、判断する順番で比べる" intro="まず候補を2つ選び、用途、無料条件、必要な機能を確認します。メーカーの機能説明は同条件の性能評価ではありません。" eyebrow="AIを比較する">
<ComparisonSummary ids={["chatgpt","claude"]}/>
<section className="rounded-2xl border border-[#d7e1dc] bg-white p-5 sm:p-7 mb-8"><h2 className="text-[22px] font-bold mb-2">比較する2つを選ぶ</h2><p className="text-[14px] text-[var(--text-sub)] mb-4">主要5サービスの組み合わせです。掲載順は人気順・性能順ではありません。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{pairIds.flatMap((a,i)=>pairIds.slice(i+1).map(b=><a className="min-h-14 flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3 text-[13px] font-semibold text-[var(--link)] no-underline hover:bg-[var(--accent-pale)]" key={a+b} href={`/compare/${a}-vs-${b}`}><span>{modelNames[a]} と {modelNames[b]}</span><span aria-hidden="true">›</span></a>))}</div></section>
<FactCards ids={pairIds} compact /></FactsLayout>; }
