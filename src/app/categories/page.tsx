import { Header, Footer, Block, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "AIツールカテゴリ別比較【画像・動画・コーディング・エージェント・検索】| AI選び",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "AIツールカテゴリ別比較【画像・動画・コーディング・エージェント・検索】| AI選び",
    url: "/categories",
  },
};

const categories = [
  { id: "image-generation", label: "画像生成AI", tools: 7, description: "Midjourney、DALL-E 3、Stable Diffusionなど" },
  { id: "video-generation", label: "動画生成AI", tools: 7, description: "Sora、Runway、Kling AIなど" },
  { id: "coding-tools", label: "コーディングツール", tools: 7, description: "Claude Code、Cursor、Windsurfなど" },
  { id: "ai-agents", label: "AIエージェント", tools: 5, description: "Manus、Devin、Claude Computer Useなど" },
  { id: "ai-search", label: "AI検索", tools: 5, description: "Perplexity、Felo、Gensparkなど" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />
      <div className="bg-white py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">カテゴリ別AI比較</h1>
          <p className="text-[13px] text-[#6e6e73]">
            汎用AIチャットに加え、画像生成・動画生成・コーディング・エージェント・検索の5カテゴリを網羅。
          </p>
        </div>
      </div>

      <Block>
        <div className="space-y-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="flex items-center gap-4 p-4 border border-[#e8e8ed] rounded-md hover:border-[#86868b] transition-colors no-underline text-inherit bg-white"
            >
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-[#1d1d1f]">{cat.label}</div>
                <div className="text-[11px] text-[#86868b] mt-0.5">{cat.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[20px] font-bold text-[#1d1d1f] leading-none">{cat.tools}</div>
                <div className="text-[10px] text-[#86868b] mt-0.5">ツール比較</div>
              </div>
            </a>
          ))}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
