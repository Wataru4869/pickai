import { FactsLayout, FactCards } from "@/components/PublicFactsPage";
export const metadata={title:"AI料金・無料条件の比較 | AI選び",description:"確認日付き料金と無料条件。地域・税・契約周期を確認し、未確認の額を推測しません。",alternates:{canonical:"/cost"}};
export default function Page(){return <FactsLayout title="料金は、金額と条件をセットで比べる" intro="表示は各項目の確認時点の情報です。請求通貨・税・対象地域・月払い/年払い・上限超過料金・解約条件を揃えて確認してください。独自スコアからコストパフォーマンスを算出しません。"><FactCards ids={["chatgpt","claude","gemini","grok","perplexity"]} compact/><a href="/compare">機能とプランの詳細比較 →</a></FactsLayout>;}
