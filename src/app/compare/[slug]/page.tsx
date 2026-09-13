import { notFound } from "next/navigation";
import { FactsLayout, FactCards } from "@/components/PublicFactsPage";
import { pairIds, modelNames } from "@/lib/public-catalog";
export function generateStaticParams(){ return pairIds.flatMap(a=>pairIds.filter(b=>a!==b).map(b=>({slug:`${a}-vs-${b}`}))); }
function pair(slug:string){ const p=slug.split("-vs-"); return p.length===2 && p[0]!==p[1] && p.every(id=>pairIds.includes(id)) ? p : null; }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=pair(slug);if(!p)return {};const canonical=[...p].sort((a,b)=>pairIds.indexOf(a)-pairIds.indexOf(b)).join("-vs-");return {title:`${modelNames[p[0]]} vs ${modelNames[p[1]]}｜公式情報で比較 | AI選び`,description:"機能・プラン・利用条件を、項目ごとの出典と確認日で比較。現行モデルの独自採点は未実施です。",alternates:{canonical:`/compare/${canonical}`}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const p=pair((await params).slug);if(!p)notFound();return <FactsLayout title={`${modelNames[p[0]]}と${modelNames[p[1]]}を比較`} intro="結論は用途と契約条件で変わります。まず必要な機能を確認し、同じ公開資料や課題で試してください。旧スコアから優勢・勝敗を決めません。"><FactCards ids={p}/><a href="/blog/ai-search-engines-comparison-2026">出典を確認する比較手順 →</a></FactsLayout>;}
