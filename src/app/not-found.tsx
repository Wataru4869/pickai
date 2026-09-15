import { Header, Footer } from "@/components/ui";

export const metadata = {
  title: "ページが見つかりません | AI選び",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/categories", label: "用途からAIを探す", detail: "文章・調査・画像・動画・開発から選ぶ" },
  { href: "/compare", label: "AIを比較する", detail: "機能・料金・提供条件を同じ順序で確認" },
  { href: "/recommend", label: "候補を絞る", detail: "3つの質問から確認の入口へ" },
];

export default function NotFound() {
  return <div className="min-h-screen bg-[var(--bg)]">
    <Header />
    <main className="max-w-[760px] mx-auto px-4 sm:px-7 py-14 sm:py-20">
      <p className="text-[12px] font-bold text-[var(--accent)] mb-2">404</p>
      <h1 className="text-[30px] sm:text-[38px] leading-[1.45] font-bold mb-4">ページが見つかりません</h1>
      <p className="text-[15px] leading-[1.85] text-[var(--text-sub)] mb-8">URLが変更されたか、入力したURLが正しくない可能性があります。目的に近い入口から探し直せます。</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {destinations.map((destination, index) => <a key={destination.href} href={destination.href} className="block rounded-xl border border-[var(--border)] bg-white p-5 text-inherit no-underline hover:border-[var(--accent)]" data-analytics-event="internal_cta_click" data-source-page="/404" data-cta-type="recovery" data-cta-position={`not_found_${index + 1}`} data-destination-id={destination.href}>
          <strong className="block text-[15px] mb-2">{destination.label}</strong>
          <span className="text-[12px] leading-[1.7] text-[var(--text-sub)]">{destination.detail}</span>
        </a>)}
      </div>
    </main>
    <Footer />
  </div>;
}
