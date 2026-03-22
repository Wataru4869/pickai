import {
  getModels,
  getTests,
  getOverallRanking,
  getCategorySummary,
  getSafetyRanking,
  CATEGORY_LABELS,
  scoreColorHex,
} from "@/lib/data";
import {
  Header,
  Footer,
  Block,
  SectionHeader,
  RankBadge,
  ScoreDisplay,
  CategoryScoreBar,
  TrustBadges,
  ShareButton,
} from "@/components/ui";
import { CategoryTabs } from "@/components/CategoryTabs";
import { UseCaseRecommendations } from "@/components/UseCaseRecommendations";

export default function HomePage() {
  const models = getModels();
  const ranking = getOverallRanking();
  const catSummary = getCategorySummary() as Record<string, any>;
  const safetyRanking = getSafetyRanking();

  // Build ranking with model details
  const rankedModels = ranking.map((r: any, i: number) => {
    const model = models.find((m) => m.id === r.model);
    return { ...r, ...model, rank: i + 1 };
  });

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Pick AI",
          "url": "https://pickai.jp",
          "description": "AIツール比較ガイド。6カテゴリ38ツールを独自テストで徹底比較。"
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "AIツール総合ランキング 2026",
          "itemListOrder": "https://schema.org/ItemListOrderDescending",
          "numberOfItems": 5,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ChatGPT", "url": "https://pickai.jp/model/chatgpt" },
            { "@type": "ListItem", "position": 2, "name": "Claude", "url": "https://pickai.jp/model/claude" },
            { "@type": "ListItem", "position": 3, "name": "Grok", "url": "https://pickai.jp/model/grok" },
            { "@type": "ListItem", "position": 4, "name": "Perplexity", "url": "https://pickai.jp/model/perplexity" },
            { "@type": "ListItem", "position": 5, "name": "Gemini", "url": "https://pickai.jp/model/gemini" }
          ]
        }) }} />

      {/* Hero */}
      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[22px] font-bold text-[#1d1d1f] mb-2">
            あなたに最適なAIが、すぐ見つかる。
          </h1>
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            ChatGPT・Claude・Gemini・Grok・Perplexityを独自30テスト（文章8＋コード4＋画像4＋安全性14）で徹底比較。
            用途別のおすすめを提案します。
          </p>
          <TrustBadges />
        </div>
      </div>

      {/* Overall Ranking */}
      <Block>
        <SectionHeader title="総合ランキング（全16テスト）" />

        {/* 1st Place Card */}
        {rankedModels[0] && (
          <a href={`/model/${rankedModels[0].id}`} className="block bg-[#f5f5f7] rounded-lg p-5 mb-4 no-underline text-inherit hover:bg-[#efefef] transition-colors">
            <div className="text-[11px] font-semibold text-[#a0820a] mb-1">総合1位</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[20px] font-bold text-[#1d1d1f]">{rankedModels[0].name}</span>
                <span className="text-[13px] font-normal text-[#86868b] ml-2">{rankedModels[0].provider}</span>
              </div>
              <div className="text-[36px] font-bold" style={{ color: scoreColorHex(rankedModels[0].score) }}>
                {rankedModels[0].score}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[
                { label: "文章生成", score: rankedModels[0].scores?.writing },
                { label: "コーディング", score: rankedModels[0].scores?.coding },
                { label: "画像生成", score: rankedModels[0].scores?.image },
                { label: "安全性", score: rankedModels[0].scores?.safety },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="text-[10px] text-[#86868b]">{cat.label}</div>
                  <div className="text-[14px] font-semibold" style={{ color: scoreColorHex(cat.score || 0) }}>
                    {cat.score}
                  </div>
                  <div className="w-full h-1.5 bg-[#e8e8ed] rounded-full mt-1">
                    <div className="h-full rounded-full" style={{ width: `${cat.score}%`, backgroundColor: scoreColorHex(cat.score || 0) }} />
                  </div>
                </div>
              ))}
            </div>
          </a>
        )}

        {/* 2nd-5th Place */}
        <div className="space-y-0">
          {rankedModels.slice(1).map((m: any, i: number) => (
            <a
              key={m.id}
              href={`/model/${m.id}`}
              className="flex items-center gap-3 py-3 border-t border-[#e8e8ed] first:border-t-0 hover:bg-[#f5f5f7] transition-colors cursor-pointer no-underline text-inherit"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                style={{
                  backgroundColor: i === 0 ? "#888" : i === 1 ? "#b87333" : "#DDD",
                }}
              >
                {i + 2}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] font-semibold">{m.name}</span>
                  <span className="text-[11px] text-[#86868b]">{m.provider}</span>
                </div>
                <div className="flex gap-3 mt-1 text-[11px] text-[#86868b]">
                  {[
                    { label: "文", score: m.scores?.writing },
                    { label: "コ", score: m.scores?.coding },
                    { label: "画", score: m.scores?.image },
                    { label: "安", score: m.scores?.safety },
                  ].map((cat) => (
                    <span key={cat.label} className="inline-flex flex-col items-start">
                      <span>
                        {cat.label}{" "}
                        <strong style={{ color: scoreColorHex(cat.score || 0) }}>
                          {cat.score}
                        </strong>
                      </span>
                      <span className="w-10 h-0.5 bg-[#e8e8ed] rounded-full mt-0.5 inline-block">
                        <span className="block h-full rounded-full" style={{ width: `${cat.score}%`, backgroundColor: scoreColorHex(cat.score || 0) }} />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <ScoreDisplay score={m.score} size="lg" />
                <div className="w-20 h-1 bg-[#e8e8ed] rounded-full mt-1">
                  <div className="h-full rounded-full" style={{ width: `${m.score}%`, backgroundColor: scoreColorHex(m.score) }} />
                </div>
              </div>
              <span className="text-[11px] text-gray-300 ml-1">＞</span>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[#86868b] mt-2">
          ※ 総合スコア = 全16テスト（文章8＋コード4＋画像4）の平均点。安全性は別軸で評価。
        </p>
      </Block>

      {/* Category Tabs */}
      <Block alt>
        <SectionHeader title="カテゴリ別ランキング" />
        <CategoryTabs />
      </Block>

      {/* Use Case Recommendations */}
      <Block>
        <SectionHeader title="用途別おすすめ" />
        <UseCaseRecommendations />
      </Block>

      {/* Category Links */}
      <Block alt>
        <SectionHeader title="カテゴリ別AI比較" />
        <p className="text-[11px] text-[#86868b] mb-3">
          汎用AI以外の専門ツールも網羅。外部レビュー・ベンチマーク基準。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { href: "/categories/image-generation", label: "画像生成", count: 7, color: "#6B46C1" },
            { href: "/categories/video-generation", label: "動画生成", count: 7, color: "#D85A30" },
            { href: "/categories/coding-tools", label: "コーディング", count: 7, color: "#0066cc" },
            { href: "/categories/ai-agents", label: "AIエージェント", count: 5, color: "#D4537E" },
            { href: "/categories/ai-search", label: "AI検索", count: 5, color: "#a0820a" },
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="flex items-center gap-2 p-3 border border-[#e8e8ed] rounded-lg hover:border-[#86868b] hover:-translate-y-0.5 transition-all duration-200 no-underline text-inherit bg-white"
              style={{ borderLeft: `3px solid ${cat.color}` }}
            >
              <div>
                <div className="text-[12px] font-semibold text-[#1d1d1f]">{cat.label}</div>
                <div className="text-[13px] font-semibold text-[#86868b]">{cat.count}ツール</div>
              </div>
            </a>
          ))}
        </div>
      </Block>

      {/* Safety Summary */}
      <Block>
        <SectionHeader title="安全性ランキング" />
        <p className="text-[11px] text-[#6e6e73] mb-3">
          14テスト（ハルシネーション・著作権・プライバシー等）＋セキュリティ認証の加重スコア
        </p>
        {safetyRanking.map((r: any, i: number) => {
          const model = models.find((m) => m.id === r.model);
          return (
            <div
              key={r.model}
              className="flex items-center justify-between py-2 border-t border-[#e8e8ed] first:border-t-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#86868b] w-5">
                  {i + 1}
                </span>
                <span className="text-[13px] font-bold">{model?.name}</span>
              </div>
              <span
                className="text-[15px] font-bold"
                style={{ color: scoreColorHex(r.score) }}
              >
                {r.score}
              </span>
            </div>
          );
        })}
        <a
          href="/safety"
          className="block text-center text-[11px] text-[#0066cc] mt-3 hover:underline"
        >
          安全性の詳細比較を見る →
        </a>
      </Block>

      {/* Quick Price Comparison */}
      <Block alt>
        <SectionHeader title="料金比較" />
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#f5f5f7]">
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">
                  モデル
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  無料
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  スタンダード
                </th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">
                  総合点
                </th>
              </tr>
            </thead>
            <tbody className="table-striped">
              {rankedModels.map((m: any) => (
                <tr key={m.id}>
                  <td className="p-1.5 font-semibold border-b border-[#e8e8ed]">
                    {m.name}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] text-green-700 font-semibold">
                    {m.pricing?.free?.available ? "✓" : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed]">
                    {m.pricing?.standard?.priceJPY
                      ? `¥${m.pricing.standard.priceJPY.toLocaleString()}/月`
                      : "—"}
                  </td>
                  <td
                    className="p-1.5 text-center border-b border-[#e8e8ed] font-semibold"
                    style={{ color: scoreColorHex(m.score) }}
                  >
                    {m.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href="/cost"
          className="block text-center text-[11px] text-[#0066cc] mt-3 hover:underline"
        >
          コスト計算機で最適プランを見つける →
        </a>
      </Block>

      {/* Latest Articles */}
      <Block>
        <SectionHeader title="最新コラム" />
        <div className="space-y-2">
          {[
            { slug: "chatgpt-vs-claude-2026", title: "ChatGPT vs Claude 徹底比較【2026年最新】どっちを選ぶべき？", date: "2026-03-22" },
            { slug: "ai-tools-how-to-choose-2026", title: "【2026年版】AIツールの選び方完全ガイド｜初心者向け", date: "2026-03-22" },
            { slug: "gemini-vs-chatgpt-2026", title: "Gemini vs ChatGPT 比較【2026年版】Google派 vs OpenAI派", date: "2026-03-22" },
          ].map((a) => (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex items-center justify-between p-3 border border-[#e8e8ed] rounded hover:bg-[#f5f5f7] transition-colors no-underline text-inherit"
            >
              <span className="text-[12px] font-medium text-[#1d1d1f]">{a.title}</span>
              <span className="text-[10px] text-[#86868b] shrink-0 ml-2">{a.date}</span>
            </a>
          ))}
        </div>
        <a
          href="/blog"
          className="block text-center text-[11px] text-[#0066cc] mt-3 hover:underline no-underline"
        >
          全てのコラムを見る →
        </a>
      </Block>

      {/* Share */}
      <Block alt>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded p-3">
          <div>
            <div className="text-[12px] font-bold">この比較結果をシェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5">
              「2026年AI比較：総合1位ChatGPT、コード最強Claude、安全性もClaude #PickAI」
            </div>
          </div>
          <ShareButton text="2026年AI比較：総合1位ChatGPT（86.5）コード最強Claude（94.3）安全性もClaude（93.7）#PickAI https://pickai.jp" />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
