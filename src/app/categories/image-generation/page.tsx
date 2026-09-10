import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_image_generation.json";

export const metadata = {
  title: "画像生成AI 7ツールの保存済み比較（2026年3月時点）| AI選び",
  description: "画像生成AI 7ツールの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
  alternates: { canonical: "/categories/image-generation" },
  openGraph: {
    title: "画像生成AI 7ツールの保存済み比較（2026年3月時点）| AI選び",
    description: "画像生成AI 7ツールの2026年3月時点の保存済み参考評価。現在の料金・機能は公式サイトで確認してください。",
    url: "/categories/image-generation",
  },
};

export default function ImageGenerationPage() {
  return <CategoryToolPage data={data as any} />;
}
