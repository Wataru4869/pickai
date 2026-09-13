import { Header, Footer, Block, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "運営者情報 | AI選び",
  alternates: { canonical: "/about" },
  openGraph: { title: "運営者情報 | AI選び", url: "/about" },
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
              AI選びは、AIツールの用途・機能・利用条件を公式情報から整理する比較サイトです。確認した項目には出典と確認日を付け、過去の独自評価とは分けて掲載します。
            </p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">評価方針</h2>
            <ul className="space-y-1 text-[#6e6e73]">
              <li className="pl-3 border-l-2 border-[#0066cc]">保存資料の評価構成と限界を公開しています。全回答・採点ログは揃っていません</li>
              <li className="pl-3 border-l-2 border-[#0066cc]">広告リンクを掲載する場合は開示し、報酬条件を評価点や順位へ反映しません</li>
              <li className="pl-3 border-l-2 border-[#0066cc]">未確認の性能・料金を推測で補わず、読者が根拠を確認できる情報を提供します</li>
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
