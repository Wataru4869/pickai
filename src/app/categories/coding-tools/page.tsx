import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_coding_tools.json";

export const metadata = {
  title: "AIコーディングツール おすすめ7選比較【2026年最新】| AI選び",
  description: "Claude Code・Cursor・Windsurf・GitHub Copilot・Codex・Antigravity・Kiroを5軸で比較。",
};

export default function CodingToolsPage() {
  return <CategoryToolPage data={data as any} />;
}
