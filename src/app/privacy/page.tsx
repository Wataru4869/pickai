import { Header, Footer, Block, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "プライバシーポリシー | Pick AI",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">プライバシーポリシー</h1>
          <p className="text-[11px] text-[#86868b]">最終更新日: 2026年3月23日</p>
        </div>
      </div>

      <Block>
        <div className="max-w-full sm:max-w-[680px] space-y-6 text-[13px] text-[#1d1d1f] leading-relaxed">

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">運営者</h2>
            <p className="text-[#6e6e73]">Pick AI編集部</p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">アクセス解析ツールの利用について</h2>
            <p className="text-[#6e6e73]">
              本サイトでは、Googleが提供するアクセス解析ツール「Google Analytics 4」を利用しています。Google Analytics 4はCookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。収集されたデータはGoogle社のプライバシーポリシーに基づいて管理されます。詳細は
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] hover:underline no-underline">Google社のプライバシーポリシー</a>
              をご確認ください。
            </p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">収集する情報</h2>
            <p className="text-[#6e6e73] mb-1.5">本サイトでは以下の情報を自動的に収集します。</p>
            <ul className="space-y-1 text-[#6e6e73]">
              <li className="pl-3 border-l-2 border-[#e8e8ed]">アクセス元のIPアドレス（匿名化処理済み）</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">ブラウザの種類、言語設定</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">閲覧したページのURL、滞在時間</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">アクセス日時</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">リファラー情報</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">情報の利用目的</h2>
            <p className="text-[#6e6e73] mb-1.5">収集した情報は以下の目的で利用します。</p>
            <ul className="space-y-1 text-[#6e6e73]">
              <li className="pl-3 border-l-2 border-[#e8e8ed]">サイトの利用状況の把握と改善</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">コンテンツの品質向上</li>
              <li className="pl-3 border-l-2 border-[#e8e8ed]">ユーザー体験の最適化</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">第三者への提供</h2>
            <p className="text-[#6e6e73]">収集した情報は、法令に基づく場合を除き、第三者に提供することはありません。</p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">お問い合わせ</h2>
            <p className="text-[#6e6e73]">本ポリシーに関するお問い合わせは、X（Twitter）のDMよりご連絡ください。</p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold mb-1.5">改定について</h2>
            <p className="text-[#6e6e73]">本ポリシーは、必要に応じて改定することがあります。改定後のポリシーは本ページに掲載した時点で効力を生じます。</p>
          </div>

        </div>
      </Block>

      <Footer />
    </div>
  );
}
