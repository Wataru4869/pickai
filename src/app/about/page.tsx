import { Header, Footer, Block, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "運営者情報 | AI選び",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">AI選び について</h1>
        </div>
      </div>

      <Block>
        <div className="max-w-full sm:max-w-[680px] space-y-6 text-[13px] text-[#1d1d1f] leading-relaxed">

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">運営</h2>
            <p className="text-[#6e6e73]">AI選び編集部</p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">サイト概要</h2>
            <p className="text-[#6e6e73]">
              AI選びは、主要AIツールを独自テストで評価・比較する情報サイトです。ChatGPT、Claude、Gemini、Grok、Perplexityを含む6カテゴリ38ツールを、独自の30テスト＋安全性14テストで検証しています。
            </p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">評価方針</h2>
            <ul className="space-y-1 text-[#6e6e73]">
              <li className="pl-3 border-l-2 border-[#0066cc]">全テストの採点基準と方法論を公開しています</li>
              <li className="pl-3 border-l-2 border-[#0066cc]">特定の企業・製品との利害関係はありません</li>
              <li className="pl-3 border-l-2 border-[#0066cc]">テスト結果に基づく公平な比較情報の提供を目的としています</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">掲載情報について</h2>
            <p className="text-[#6e6e73]">
              本サイトの情報は定期的に更新していますが、各AIツールのアップデートにより、掲載内容と最新の仕様が異なる場合があります。最新情報は各社の公式サイトをご確認ください。
            </p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">お問い合わせ</h2>
            <p className="text-[#6e6e73]">
              内容の誤り、掲載に関するお問い合わせはX（Twitter）のDMよりご連絡ください。
            </p>
          </div>

        </div>
      </Block>

      <Footer />
    </div>
  );
}
