import { notFound } from "next/navigation";
import { PurposePage, FactsLayout, FactCards } from "@/components/PublicFactsPage";
import type { Purpose } from "@/lib/public-catalog";
const map:Record<string,Purpose>={video:"video-generation",translation:"ai-search",design:"image-generation",coding:"coding-tools",research:"ai-search",writing:"ai-search"};
export function generateStaticParams(){return Object.keys(map).map(id=>({id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;return Object.hasOwn(map,id)?{title:"用途別AIの選び方 | AI選び",alternates:{canonical:["translation","writing"].includes(id)?`/category/${id}`:`/categories/${map[id]}`}}:{};}
export default async function Page({params}:{params:Promise<{id:string}>}){
  const {id}=await params;if(!Object.hasOwn(map,id))notFound();
  if(id==="translation"||id==="writing")return <FactsLayout title={id==="translation"?"翻訳に使うAIの選び方":"文章作成に使うAIの選び方"} intro={id==="translation"?"同じ原文で意味・固有名詞・用語の一貫性を確認します。旧ベンチマークの順位から、いまの翻訳品質は判断しません。":"要約・書き直し・構成づくりのどれが必要かを決め、同じ文章と条件で比較します。旧スコアの順位を現在の品質として扱いません。"}><FactCards ids={["chatgpt","claude","gemini"]} compact/><a href="/compare">機能・利用条件を詳しく比較 →</a></FactsLayout>;
  return <PurposePage purpose={map[id]}/>;
}
