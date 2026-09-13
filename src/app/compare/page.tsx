import { FactsLayout, FactCards } from "@/components/PublicFactsPage";
import { pairIds, modelNames } from "@/lib/public-catalog";
export const metadata = { title: "AI比較｜機能・料金の根拠から選ぶ | AI選び", description: "確認日付きの公式情報でAIサービスを比較。過去の点数による順位や勝敗とは分けて掲載。", alternates: { canonical: "/compare" } };
export default function Page() { return <FactsLayout title="AIを、同じ確認項目で比べる" intro="機能・利用条件・出典を比較します。メーカーの機能説明は、同条件の性能評価ではありません。">
<section><h2 className="text-xl font-bold">2サービスの詳細比較</h2><div className="flex flex-wrap gap-x-6">{pairIds.flatMap((a,i)=>pairIds.slice(i+1).map(b=><a key={a+b} href={`/compare/${a}-vs-${b}`}>{modelNames[a]} / {modelNames[b]} →</a>))}</div></section>
<FactCards ids={pairIds} compact /></FactsLayout>; }
