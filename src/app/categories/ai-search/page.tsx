import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_ai_search.json";

export const metadata = {
  title: "AI検索5サービスの保存済み比較（2026年3月時点）| AI選び",
  description: "AI検索5サービスの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
  alternates: { canonical: "/categories/ai-search" },
  openGraph: {
    title: "AI検索5サービスの保存済み比較（2026年3月時点）| AI選び",
    description: "AI検索5サービスの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
    url: "/categories/ai-search",
  },
};

export default function AISearchPage() {
  return <CategoryToolPage data={data as any} />;
}
