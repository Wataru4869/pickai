import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_ai_agents.json";

export const metadata = {
  title: "AIエージェント 5ツール比較｜Pick AI",
  description: "Manus・Genspark Claw・Devin・Claude Computer Use・OpenAI Operatorを5軸で比較。",
};

export default function AIAgentsPage() {
  return <CategoryToolPage data={data as any} />;
}
