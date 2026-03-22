import { getCategories } from "@/lib/data";
import { Header, Footer, Block, SectionHeader, TrustBadges } from "@/components/ui";

export const metadata = {
  title: "カテゴリ別AI比較｜動画・翻訳・デザイン・コーディング｜Pick AI",
  description: "動画生成・翻訳・デザイン・コーディング・リサーチ・文章生成の各カテゴリで、AIモデルと専門ツールを外部ベンチマークデータで比較。",
};

export default function CategoryListPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold mb-1">カテゴリ別AI比較</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            用途別に最適なAIツールを見つけよう。外部ベンチマークデータと独自テスト結果を掲載。
          </p>
          <TrustBadges />
        </div>
      </div>

      <Block>
        <SectionHeader title="カテゴリ一覧" />
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/category/${cat.id}`}
              className="border border-[#d2d2d7] rounded p-3 hover:bg-[#f5f5f7] hover:border-[#1d1d1f] transition-colors no-underline text-inherit cursor-pointer"
            >
              <div className="text-[24px] mb-1">{cat.icon}</div>
              <div className="text-[14px] font-semibold mb-0.5">{cat.nameJapanese}</div>
              <div className="text-[11px] text-[#6e6e73] leading-relaxed line-clamp-2">
                {cat.description}
              </div>
              <div className="text-[11px] text-[#0066cc] mt-1.5 font-semibold">
                ベンチマーク {cat.externalBenchmarks.length}件 →
              </div>
            </a>
          ))}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
