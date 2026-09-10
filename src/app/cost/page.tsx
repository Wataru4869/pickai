import { Header, Footer, Block, SectionHeader } from "@/components/ui";
import { getModels } from "@/lib/data";

export const metadata = {
  title: "AI料金・無料条件の確認ガイド | AI選び",
  description: "ChatGPT・Claude・Gemini・Grok・Perplexityの料金確認時に見るべき項目と、各公式サイトへのリンクを掲載。",
  alternates: { canonical: "/cost" },
  openGraph: {
    title: "AI料金・無料条件の確認ガイド | AI選び",
    description: "ChatGPT・Claude・Gemini・Grok・Perplexityの料金確認時に見るべき項目と、各公式サイトへのリンクを掲載。",
    url: "/cost",
  },
};

export default function CostPage() {
  const models = getModels();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white border-b border-[#e8e8ed] py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold mb-1">料金・無料条件の確認ガイド</h1>
          <p className="text-[12px] text-[#6e6e73] leading-relaxed">
            料金は変更頻度が高いため、保存済みの円換算額ではなく公式サイトの現在条件を確認してください。
          </p>
        </div>
      </div>

      <Block alt>
        <SectionHeader title="契約前に確認する5項目" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {["請求通貨・税・為替", "無料枠の回数・機能制限", "月額・年額と解約条件", "上限超過時の従量課金", "個人用・チーム用のデータ条件"].map((item) => (
            <div key={item} className="rounded border border-[#e8e8ed] bg-white p-3 text-[12px] text-[#1d1d1f]">{item}</div>
          ))}
        </div>
      </Block>

      <Block>
        <SectionHeader title="公式サイトで現在条件を確認" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {models.map((model) => (
            <a key={model.id} href={model.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded border border-[#d2d2d7] p-3 text-[12px] font-semibold text-[#1d1d1f] no-underline hover:border-[#0066cc] hover:text-[#0066cc]">
              <span>{model.name}</span><span>公式サイト →</span>
            </a>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[#86868b]">リンク先の地域・契約画面によって表示条件が異なる場合があります。保存済み評価スコアは料金判断とは分離しています。</p>
      </Block>

      <Footer />
    </div>
  );
}
