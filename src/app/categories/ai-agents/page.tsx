import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_ai_agents.json";

export const metadata = {
  title: "AIエージェント おすすめ5選比較【2026年最新】| Pick AI",
  description: "Manus・Genspark Claw・Devin・Claude Computer Use・OpenAI Operatorを5軸で比較。",
};

export default function AIAgentsPage() {
  return <CategoryToolPage data={data as any} />;
}
