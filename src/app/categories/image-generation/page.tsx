import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_image_generation.json";

export const metadata = {
  title: "画像生成AI おすすめ7選比較【2026年最新】| Pick AI",
  description: "Midjourney・DALL-E 3・Stable Diffusion・Adobe Firefly・Canva AI・Ideogram・Leonardo AIを5軸で比較。",
};

export default function ImageGenerationPage() {
  return <CategoryToolPage data={data as any} />;
}
