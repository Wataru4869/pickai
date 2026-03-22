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

  const rankedModels = ranking.map((r: any, i: number) => {
    const model = models.find((m) => m.id === r.model);
    return { ...r, ...model, rank: i + 1 };
  });

  const top = rankedModels[0];
  const codeBest = [...rankedModels].sort((a, b) => (b.scores?.coding || 0) - (a.scores?.coding || 0))[0];
  const safetyBest = safetyRanking[0] as any;
  const safetyBestModel = models.find((m) => m.id === safetyBest?.model);

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
        "itemListElement": rankedModels.map((m: any) => ({
          "@type": "ListItem", "position": m.rank, "name": m.name, "url": `https://pickai.jp/model/${m.id}`
        }))
      }) }} />

      {/* Hero Dashboard */}
      <div className="bg-white py-5">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">あなたに最適なAIが、すぐ見つかる。</h1>
          <p className="text-[13px] text-[#6e6e73] mb-3">独自30テスト × 6カテゴリ × 38ツール</p>

          <div className="grid grid-cols-3 gap-3">
            <a href={`/model/${top?.id}`} className="bg-[#f5f5f7] rounded-lg p-3 no-underline text-inherit hover:bg-[#efefef] transition-colors">
              <div className="text-[10px] text-[#86868b]">総合1位</div>
              <div className="text-[16px] font-bold text-[#1d1d1f]">{top?.name}</div>
              <div className="text-[20px] font-bold" style={{ color: scoreColorHex(top?.score || 0) }}>{top?.score}</div>
            </a>
            <a href={`/model/${codeBest?.id}`} className="bg-[#f5f5f7] rounded-lg p-3 no-underline text-inherit hover:bg-[#efefef] transition-colors">
              <div className="text-[10px] text-[#86868b]">コード最強</div>
              <div className="text-[16px] font-bold text-[#1d1d1f]">{codeBest?.name}</div>
              <div className="text-[20px] font-bold" style={{ color: scoreColorHex(codeBest?.scores?.coding || 0) }}>{codeBest?.scores?.coding}</div>
            </a>
            <a href={`/model/${safetyBestModel?.id}`} className="bg-[#f5f5f7] rounded-lg p-3 no-underline text-inherit hover:bg-[#efefef] transition-colors">
              <div className="text-[10px] text-[#86868b]">安全性1位</div>
              <div className="text-[16px] font-bold text-[#1d1d1f]">{safetyBestModel?.name}</div>
              <div className="text-[20px] font-bold" style={{ color: scoreColorHex(safetyBest?.score || 0) }}>{safetyBest?.score}</div>
            </a>
          </div>
        </div>
      </div>

      {/* Overall Ranking */}
      <Block>
        <SectionHeader title="総合ランキング（全16テスト）" />

        {/* 1st Place Card */}
        {top && (
          <a href={`/model/${top.id}`} className="block bg-[#f5f5f7] rounded-lg p-5 mb-4 no-underline text-inherit hover:bg-[#efefef] transition-colors">
            <div className="text-[11px] font-semibold text-[#a0820a] mb-1">総合1位</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[20px] font-bold text-[#1d1d1f]">{top.name}</span>
                <span className="text-[13px] font-normal text-[#86868b] ml-2">{top.provider}</span>
              </div>
              <div className="text-[36px] font-bold" style={{ color: scoreColorHex(top.score) }}>
                {top.score}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[
                { label: "文章生成", score: top.scores?.writing },
                { label: "コーディング", score: top.scores?.coding },
                { label: "画像生成", score: top.scores?.image },
                { label: "安全性", score: top.scores?.safety },
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

        {/* 2nd-5th Place: 2-column grid cards */}
        <div className="grid grid-cols-2 gap-3">
          {rankedModels.slice(1).map((m: any, i: number) => (
            <a
              key={m.id}
              href={`/model/${m.id}`}
              className="border border-[#e8e8ed] rounded-lg p-4 hover:border-[#86868b] transition-all duration-200 cursor-pointer no-underline text-inherit"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded text-white text-[9px] flex items-center justify-center font-semibold"
                    style={{ backgroundColor: i === 0 ? "#6e6e73" : i === 1 ? "#8b6c4f" : "#d2d2d7" }}
                  >
                    {i + 2}
                  </span>
                  <span className="text-[14px] font-semibold">{m.name}</span>
                  <span className="text-[10px] text-[#86868b]">{m.provider}</span>
                </div>
                <span className="text-[22px] font-bold" style={{ color: scoreColorHex(m.score) }}>
                  {m.score}
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "文章", score: m.scores?.writing },
                  { label: "コード", score: m.scores?.coding },
                  { label: "画像", score: m.scores?.image },
                  { label: "安全性", score: m.scores?.safety },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center gap-2 text-[10px]">
                    <span className="w-8 text-[#86868b] shrink-0">{cat.label}</span>
                    <div className="flex-1 h-1 bg-[#e8e8ed] rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${cat.score}%`, backgroundColor: scoreColorHex(cat.score || 0) }} />
                    </div>
                    <span className="w-8 text-right font-semibold" style={{ color: scoreColorHex(cat.score || 0) }}>
                      {cat.score}
                    </span>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>
        <p className="text-[10px] text-[#86868b] mt-3">
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

      {/* Category Links - horizontal scroll */}
      <Block alt>
        <SectionHeader title="カテゴリ別AI比較" />
        <p className="text-[10px] text-[#86868b] mb-2">汎用AI以外の専門ツールも網羅。外部レビュー・ベンチマーク基準。</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
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
              className="min-w-[150px] flex-shrink-0 p-3 border border-[#e8e8ed] rounded-lg hover:border-[#86868b] hover:-translate-y-0.5 transition-all duration-200 no-underline text-inherit bg-white"
              style={{ borderLeft: `3px solid ${cat.color}` }}
            >
              <div className="text-[12px] font-semibold text-[#1d1d1f]">{cat.label}</div>
              <div className="text-[13px] font-semibold text-[#86868b] mt-0.5">{cat.count}ツール</div>
              <div className="text-[10px] text-[#0066cc] mt-1">比較する →</div>
            </a>
          ))}
        </div>
      </Block>

      {/* Safety Summary */}
      <Block>
        <SectionHeader title="安全性ランキング" />
        <p className="text-[10px] text-[#6e6e73] mb-2">14テスト＋セキュリティ認証の加重スコア</p>
        {safetyRanking.map((r: any, i: number) => {
          const model = models.find((m) => m.id === r.model);
          return (
            <div
              key={r.model}
              className="flex items-center gap-2 py-2 border-t border-[#e8e8ed] first:border-t-0"
            >
              <span className="text-[11px] font-bold text-[#86868b] w-4">{i + 1}</span>
              <span className="text-[13px] font-semibold w-24">{model?.name}</span>
              <div className="flex-1 h-1.5 bg-[#e8e8ed] rounded-full">
                <div className="h-full rounded-full" style={{ width: `${r.score}%`, backgroundColor: scoreColorHex(r.score) }} />
              </div>
              <span className="text-[14px] font-bold w-12 text-right" style={{ color: scoreColorHex(r.score) }}>
                {r.score}
              </span>
            </div>
          );
        })}
        <a href="/safety" className="block text-center text-[10px] text-[#0066cc] mt-3 hover:underline no-underline">
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
                <th className="p-1.5 text-left font-bold border-b-2 border-[#d2d2d7]">モデル</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">無料</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">スタンダード</th>
                <th className="p-1.5 text-center font-bold border-b-2 border-[#d2d2d7]">総合点</th>
              </tr>
            </thead>
            <tbody>
              {rankedModels.map((m: any, i: number) => (
                <tr key={m.id} className={i % 2 === 1 ? "bg-[#f9f9fb]" : ""}>
                  <td className="p-1.5 font-semibold border-b border-[#e8e8ed]">{m.name}</td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] text-green-700 font-semibold">
                    {m.pricing?.free?.available ? "✓" : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed]">
                    {m.pricing?.standard?.priceJPY ? `¥${m.pricing.standard.priceJPY.toLocaleString()}/月` : "—"}
                  </td>
                  <td className="p-1.5 text-center border-b border-[#e8e8ed] font-semibold" style={{ color: scoreColorHex(m.score) }}>
                    {m.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="/cost" className="block text-center text-[10px] text-[#0066cc] mt-3 hover:underline no-underline">
          コスト計算機で最適プランを見つける →
        </a>
      </Block>

      {/* Latest Articles */}
      <Block>
        <SectionHeader title="最新コラム" />
        <div className="space-y-2">
          {[
            { slug: "chatgpt-vs-claude-2026", title: "ChatGPT vs Claude 徹底比較【2026年最新】", date: "2026-03-22" },
            { slug: "ai-tools-how-to-choose-2026", title: "【2026年版】AIツールの選び方完全ガイド", date: "2026-03-22" },
            { slug: "gemini-vs-chatgpt-2026", title: "Gemini vs ChatGPT 比較【2026年版】", date: "2026-03-22" },
          ].map((a) => (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex items-center justify-between p-3 border border-[#e8e8ed] rounded-lg hover:border-[#86868b] transition-colors no-underline text-inherit"
            >
              <span className="text-[12px] font-medium text-[#1d1d1f]">{a.title}</span>
              <span className="text-[10px] text-[#86868b] shrink-0 ml-3">{a.date}</span>
            </a>
          ))}
        </div>
        <a href="/blog" className="block text-center text-[10px] text-[#0066cc] mt-3 hover:underline no-underline">
          全てのコラムを見る →
        </a>
      </Block>

      {/* Share + Badges */}
      <Block alt>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded-lg p-3 bg-white">
          <div>
            <div className="text-[12px] font-bold">この比較結果をシェア</div>
            <div className="text-[10px] text-[#6e6e73] mt-0.5">
              「2026年AI比較：総合1位ChatGPT、コード最強Claude #PickAI」
            </div>
          </div>
          <ShareButton text="2026年AI比較：総合1位ChatGPT（86.5）コード最強Claude（94.3）安全性もClaude（93.7）#PickAI https://pickai.jp" />
        </div>
        <div className="mt-3">
          <TrustBadges />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
