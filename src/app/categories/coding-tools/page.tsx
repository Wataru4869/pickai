import { CategoryToolPage } from "@/components/CategoryToolPage";
import data from "@/data/category_coding_tools.json";

export const metadata = {
  title: "コーディングツール 7ツール比較｜Pick AI",
  description: "Claude Code・Cursor・Windsurf・GitHub Copilot・Codex・Antigravity・Kiroを5軸で比較。",
};

export default function CodingToolsPage() {
  return <CategoryToolPage data={data as any} />;
}
