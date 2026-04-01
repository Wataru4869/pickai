import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_ai_search.json";

export const metadata = {
  title: "AI検索エンジン おすすめ5選比較【2026年最新】| AI選び",
  description: "Perplexity・Genspark・Felo・Google AI Overview・Arc Searchを5軸で比較。",
  alternates: { canonical: "/categories/ai-search" },
  openGraph: {
    title: "AI検索エンジン おすすめ5選比較【2026年最新】| AI選び",
    description: "Perplexity・Genspark・Felo・Google AI Overview・Arc Searchを5軸で比較。",
    url: "/categories/ai-search",
  },
};

export default function AISearchPage() {
  return <CategoryToolPage data={data as any} />;
}
