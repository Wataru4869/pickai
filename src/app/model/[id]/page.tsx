import { notFound } from "next/navigation";
import { FactsLayout, FactCards } from "@/components/PublicFactsPage";
import { modelNames } from "@/lib/public-catalog";
export function generateStaticParams(){return Object.keys(modelNames).map(id=>({id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!Object.hasOwn(modelNames,id))return {};return {title:`${modelNames[id]}の機能・利用条件 | AI選び`,description:"公式情報の確認日と出典を項目別に表示。未確認の情報と過去の独自スコアを分けて掲載。",robots:id==="copilot"?{index:false,follow:true}:undefined,alternates:{canonical:`/model/${id}`}};}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!Object.hasOwn(modelNames,id))notFound();return <FactsLayout title={`${modelNames[id]}の機能と利用条件`} intro="何に使えるか、どの条件で使えるかを分けて確認します。表示モデルや地域・契約による違いは公式情報をご確認ください。"><FactCards ids={[id]}/><a href="/compare">ほかのAIと同じ項目で比較 →</a></FactsLayout>;}
