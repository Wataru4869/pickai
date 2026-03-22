import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_video_generation.json";

export const metadata = {
  title: "動画生成AI 7ツール比較｜Pick AI",
  description: "Sora・Runway・Kling AI・Pika・Veo 3・HeyGen・Synthesiaを5軸で比較。",
};

export default function VideoGenerationPage() {
  return <CategoryToolPage data={data as any} />;
}
