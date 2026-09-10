import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_coding_tools.json";

export const metadata = {
  title: "AIコーディング7ツールの保存済み比較（2026年3月時点）| AI選び",
  description: "AIコーディング7ツールの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
  alternates: { canonical: "/categories/coding-tools" },
  openGraph: {
    title: "AIコーディング7ツールの保存済み比較（2026年3月時点）| AI選び",
    description: "AIコーディング7ツールの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
    url: "/categories/coding-tools",
  },
};

export default function CodingToolsPage() {
  return <CategoryToolPage data={data as any} />;
}
