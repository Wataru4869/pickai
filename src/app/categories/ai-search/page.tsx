import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_ai_search.json";

export const metadata = {
  title: "AI検索 5ツール比較｜Pick AI",
  description: "Perplexity・Genspark・Felo・Google AI Overview・Arc Searchを5軸で比較。",
};

export default function AISearchPage() {
  return <CategoryToolPage data={data as any} />;
}
