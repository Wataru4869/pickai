import {
  getModels,
  getTests,
  getOverallRanking,
  getCategorySummary,
  getSafetyRanking,
  getChanges,
  CATEGORY_LABELS,
  MODEL_COLORS,
  scoreColorHex,
  scoreLabel,
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
  const changes = getChanges();

  const rankedModels = ranking.map((r: any, i: number) => {
    const model = models.find((m) => m.id === r.model);
    return { ...r, ...model, rank: i + 1 };
  });

  const top = rankedModels[0];
  const codeBest = [...rankedModels].sort((a, b) => (b.scores?.coding || 0) - (a.scores?.coding || 0))[0];
  const safetyBest = safetyRanking[0] as any;
  const safetyBestModel = models.find((m) => m.id === safetyBest?.model);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI選び",
        "url": "https://aierabi.jp",
        "description": "AIツール比較ガイド。6カテゴリ38ツールを独自テストで徹底比較。"
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "AIツール総合ランキング 2026",
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "numberOfItems": 5,
        "itemListElement": rankedModels.map((m: any) => ({
          "@type": "ListItem", "position": m.rank, "name": m.name, "url": `https://aierabi.jp/model/${m.id}`
        }))
      }) }} />

      {/* Hero Dashboard */}
      <div className="bg-white py-6 border-b border-[#e8e8ed]">
        <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            {["独自30テスト", "安全性14項目", "6モデル比較", "2026.04更新"].map((b) => (
              <span key={b} className="text-[11px] font-medium text-[#6e6e73] px-2 py-0.5 border border-[#d2d2d7] rounded">
                {b}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                label: "総合1位",
                sub: "全16テスト平均",
                name: top?.name,
                score: top?.score,
                diff: rankedModels[1] ? `2位に +${(top.score - rankedModels[1].score).toFixed(1)}点差` : "",
                href: `/model/${top?.id}`,
              },
              {
                label: "コーディング1位",
                sub: "4テスト平均",
                name: codeBest?.name,
                score: codeBest?.scores?.coding,
                diff: (() => {
                  const sorted = [...rankedModels].sort((a, b) => (b.scores?.coding || 0) - (a.scores?.coding || 0));
                  return sorted[1] ? `2位に +${((sorted[0].scores?.coding || 0) - (sorted[1].scores?.coding || 0)).toFixed(1)}点差` : "";
                })(),
                href: `/model/${codeBest?.id}`,
              },
              {
                label: "安全性1位",
                sub: "14テスト評価",
                name: safetyBestModel?.name,
                score: safetyBest?.score,
                diff: safetyRanking[1] ? `2位に +${(safetyBest.score - (safetyRanking[1] as any).score).toFixed(1)}点差` : "",
                href: `/model/${safetyBestModel?.id}`,
              },
            ].map((card) => (
              <a
                key={card.label}
                href={card.href}
                className="border border-[#d2d2d7] rounded-md overflow-hidden no-underline text-inherit hover:border-[#86868b] transition-colors"
              >
                <div className="bg-[#f5f5f7] px-3 py-2 border-b border-[#e8e8ed]">
                  <div className="text-[13px] font-semibold text-[#1d1d1f]">{card.label}</div>
                  <div className="text-[10px] font-medium text-[#86868b]">{card.sub}</div>
                </div>
                <div className="px-3 py-3">
                  <div className="text-[13px] font-medium text-[#6e6e73] mb-0.5">{card.name}</div>
                  <div className="text-[34px] sm:text-[36px] font-bold text-[#1d1d1f] leading-none tracking-tight">{card.score}</div>
                  <div className="text-[10px] text-[#86868b] mt-1.5">{card.diff}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4">
            <div className="text-[11px] text-[#86868b] mb-1.5">用途から探す</div>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: "文章作成", href: "/recommend?use=writing" },
                { label: "プログラミング", href: "/recommend?use=coding" },
                { label: "画像生成", href: "/recommend?use=image" },
                { label: "調べもの", href: "/recommend?use=search" },
                { label: "おすすめ診断 →", href: "/recommend" },
              ].map((u) => (
                <a
                  key={u.label}
                  href={u.href}
                  className="px-3 py-2 sm:py-1.5 border border-[#d2d2d7] rounded text-[12px] font-medium text-[#1d1d1f] no-underline hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
                >
                  {u.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Changes */}
      <Block alt>
        <div className="flex items-baseline justify-between gap-3 mb-4">
          <h2 className="text-[17px] font-bold text-[#1d1d1f] pl-3 border-l-[3px] border-[#1d1d1f]">
            {`スコア変動（${changes.period}）`}
          </h2>
          <span className="text-[10px] font-medium text-[#6e6e73] shrink-0">
            最終更新: {changes.lastUpdated}
          </span>
        </div>
        <div className="space-y-0">
          {changes.changes.map((c: any) => (
            <div key={c.model} className="flex items-center gap-2 sm:gap-3 py-2.5 border-b border-[#f0f0f0] last:border-b-0">
              <span className="text-[13px] font-semibold text-[#1d1d1f] w-[80px] sm:w-[90px]">{c.modelName}</span>
              <span className="text-[15px] font-bold text-[#1d1d1f] w-[44px] text-right">{c.newScore}</span>
              <span className={`inline-flex items-center justify-end gap-0.5 text-[12px] font-semibold w-14 text-right ${
                c.change > 0 ? "text-[#3d7a5f]" : c.change < 0 ? "text-[#a05454]" : "text-[#86868b]"
              }`}>
                <span className="text-[11px] leading-none">
                  {c.change > 0 ? "↑" : c.change < 0 ? "↓" : "—"}
                </span>
                <span>
                  {c.change > 0 ? `+${c.change}` : c.change < 0 ? `${c.change}` : "±0"}
                </span>
              </span>
              <span className="text-[11px] text-[#86868b] flex-1">{c.note}</span>
            </div>
          ))}
        </div>
        {changes.news.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
            <div className="text-[11px] font-semibold text-[#6e6e73] mb-1">更新情報</div>
            {changes.news.slice(0, 3).map((n: any, i: number) => (
              <div key={i} className="flex gap-2 text-[11px] text-[#6e6e73] py-0.5">
                <span className="text-[#86868b] shrink-0">{n.date}</span>
                <span>{n.text}</span>
              </div>
            ))}
          </div>
        )}
      </Block>

      {/* Overall Ranking */}
      <Block>
        <SectionHeader title="総合ランキング" />
        <p className="scroll-hint">→ 横スクロールできます</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] w-6 uppercase tracking-wider"></th>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">モデル</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">総合</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">文章</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">コード</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">画像</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">安全性</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const writingBest = [...rankedModels].sort((a, b) => (b.scores?.writing || 0) - (a.scores?.writing || 0))[0];
                const codingBest2 = [...rankedModels].sort((a, b) => (b.scores?.coding || 0) - (a.scores?.coding || 0))[0];
                const imageBest = [...rankedModels].sort((a, b) => (b.scores?.image || 0) - (a.scores?.image || 0))[0];
                const safetyBestId = (safetyRanking[0] as any)?.model;

                return rankedModels.map((m: any) => {
                  const cats = [
                    { key: "writing", score: m.scores?.writing, isBest: m.id === writingBest.id },
                    { key: "coding", score: m.scores?.coding, isBest: m.id === codingBest2.id },
                    { key: "image", score: m.scores?.image, isBest: m.id === imageBest.id },
                    { key: "safety", score: m.scores?.safety, isBest: m.id === safetyBestId },
                  ];

                  return (
                    <tr key={m.id} className="hover:bg-[#f9f9fb]">
                      <td className="p-2 border-b border-[#f0f0f0]">
                        <span className={`text-[14px] font-bold ${
                          m.rank === 1 ? "text-[#a0820a]" : m.rank === 2 ? "text-[#86868b]" : m.rank === 3 ? "text-[#8b6c4f]" : "text-[#d2d2d7]"
                        }`}>
                          {m.rank}
                        </span>
                      </td>
                      <td className="p-2 border-b border-[#f0f0f0]">
                        <a href={`/model/${m.id}`} className="no-underline text-inherit">
                          <span className="text-[14px] font-semibold text-[#1d1d1f]">{m.name}</span>
                          <span className="text-[11px] text-[#86868b] ml-1.5">{m.provider}</span>
                        </a>
                      </td>
                      <td className="p-2 border-b border-[#f0f0f0] text-center">
                        <span className="text-[17px] font-bold text-[#1d1d1f]">{m.score}</span>
                        <span className="block text-[9px] font-medium mt-0.5" style={{ color: scoreColorHex(m.score) }}>
                          {scoreLabel(m.score)}
                        </span>
                      </td>
                      {cats.map((cat) => (
                        <td
                          key={cat.key}
                          className="p-2 border-b border-[#f0f0f0] text-center"
                          style={cat.isBest ? { backgroundColor: "#f5f8fc" } : undefined}
                        >
                          <span className="text-[13px] font-semibold text-[#1d1d1f]">{cat.score}</span>
                          {cat.isBest && (
                            <span className="block text-[9px] font-semibold text-[#4a7ab5]">1位</span>
                          )}
                          <div className="w-full h-[3px] bg-[#f0f0f0] rounded-sm mt-1">
                            <div
                              className="h-full rounded-sm"
                              style={{
                                width: `${cat.score}%`,
                                backgroundColor: scoreColorHex(cat.score || 0),
                              }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>

        {/* Score Legend */}
        <div className="flex gap-3 mt-3 pt-3 border-t border-[#f0f0f0] flex-wrap items-center">
          {[
            { color: "#3d7a5f", label: "85+ トップクラス" },
            { color: "#4a6a8a", label: "70-84 実用十分" },
            { color: "#b08d57", label: "50-69 制約あり" },
            { color: "#a05454", label: "50未満 非推奨" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1 text-[10px] text-[#86868b]">
              <div className="w-2 h-[3px] rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
          <div className="flex items-center gap-1 text-[10px] text-[#86868b]">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#f5f8fc" }} />
            <span>各カテゴリの最高得点項目</span>
          </div>
        </div>
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
        <p className="text-[10px] text-[#86868b] mb-3">汎用AI以外の専門ツールも網羅。外部レビュー・ベンチマーク基準。</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { href: "/categories/image-generation", label: "画像生成", count: 7 },
            { href: "/categories/video-generation", label: "動画生成", count: 7 },
            { href: "/categories/coding-tools", label: "コーディング", count: 7 },
            { href: "/categories/ai-agents", label: "AIエージェント", count: 5 },
            { href: "/categories/ai-search", label: "AI検索", count: 5 },
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="min-w-[140px] flex-shrink-0 border border-[#d2d2d7] rounded-md overflow-hidden no-underline text-inherit bg-white hover:border-[#86868b] transition-colors"
            >
              <div className="bg-[#f5f5f7] px-3 py-2 border-b border-[#e8e8ed]">
                <div className="text-[13px] font-semibold text-[#1d1d1f]">{cat.label}</div>
              </div>
              <div className="px-3 py-2">
                <div className="text-[20px] font-bold text-[#1d1d1f] leading-none">{cat.count}</div>
                <div className="text-[10px] text-[#86868b] mt-1">ツール比較</div>
              </div>
            </a>
          ))}
        </div>
      </Block>

      {/* Safety Summary */}
      <Block>
        <SectionHeader title="安全性ランキング" />
        <p className="text-[10px] text-[#86868b] mb-3">14テスト＋セキュリティ認証の加重スコア</p>
        {safetyRanking.map((r: any, i: number) => {
          const model = models.find((m) => m.id === r.model);
          const rankColor = i === 0 ? "text-[#a0820a]" : i === 1 ? "text-[#86868b]" : i === 2 ? "text-[#8b6c4f]" : "text-[#d2d2d7]";
          return (
            <div
              key={r.model}
              className="flex items-center gap-2 sm:gap-3 py-2.5 border-b border-[#f0f0f0] last:border-b-0"
            >
              <span className={`text-[13px] font-bold w-5 text-center ${rankColor}`}>{i + 1}</span>
              <span className="text-[13px] font-semibold text-[#1d1d1f] w-[80px] sm:w-[90px]">{model?.name}</span>
              <div className="flex-1 h-1 bg-[#f0f0f0] rounded-sm">
                <div className="h-full rounded-sm" style={{ width: `${r.score}%`, backgroundColor: scoreColorHex(r.score) }} />
              </div>
              <span className="text-[14px] font-bold text-[#1d1d1f] w-[44px] text-right">{r.score}</span>
            </div>
          );
        })}
        <a href="/safety" className="block text-center text-[11px] text-[#6e6e73] mt-3 hover:text-[#0066cc] no-underline py-1">
          安全性の詳細比較を見る →
        </a>
      </Block>

      {/* Quick Price Comparison */}
      <Block alt>
        <SectionHeader title="料金比較" />
        <p className="scroll-hint">→ 横スクロールできます</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr>
                <th className="text-left p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">モデル</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">無料</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">月額</th>
                <th className="text-center p-2 text-[10px] font-medium text-[#86868b] border-b-2 border-[#d2d2d7] uppercase tracking-wider">総合</th>
              </tr>
            </thead>
            <tbody>
              {rankedModels.map((m: any) => (
                <tr key={m.id}>
                  <td className="p-2 border-b border-[#f0f0f0]">
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">{m.name}</span>
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center">
                    {m.pricing?.free?.available
                      ? <span className="text-[13px] font-semibold text-[#3d7a5f]">◯</span>
                      : <span className="text-[13px] text-[#86868b]">—</span>}
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center text-[13px] text-[#1d1d1f]">
                    {m.pricing?.standard?.priceJPY ? `¥${m.pricing.standard.priceJPY.toLocaleString()}` : "—"}
                  </td>
                  <td className="p-2 border-b border-[#f0f0f0] text-center text-[13px] font-bold text-[#1d1d1f]">
                    {m.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="/cost" className="block text-center text-[11px] text-[#6e6e73] mt-3 hover:text-[#0066cc] no-underline py-1">
          コスト計算機で最適プランを見つける →
        </a>
      </Block>

      {/* Latest Articles */}
      <Block>
        <SectionHeader title="最新コラム" />
        <div className="space-y-1.5">
          {[
            { slug: "chatgpt-vs-claude-2026", title: "ChatGPT vs Claude 徹底比較【2026年最新】", date: "2026-03-22" },
            { slug: "ai-tools-how-to-choose-2026", title: "【2026年版】AIツールの選び方完全ガイド", date: "2026-03-22" },
            { slug: "gemini-vs-chatgpt-2026", title: "Gemini vs ChatGPT 比較【2026年版】", date: "2026-03-22" },
          ].map((a) => (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex items-center justify-between p-3 border border-[#e8e8ed] rounded hover:border-[#86868b] transition-colors no-underline text-inherit bg-white"
            >
              <span className="text-[13px] font-medium text-[#1d1d1f]">{a.title}</span>
              <span className="text-[10px] text-[#86868b] shrink-0 ml-3">{a.date}</span>
            </a>
          ))}
        </div>
        <a href="/blog" className="block text-center text-[11px] text-[#6e6e73] mt-3 hover:text-[#0066cc] no-underline py-1">
          全てのコラムを見る →
        </a>
      </Block>

      {/* Share + Badges */}
      <Block alt>
        <div className="flex items-center justify-between border border-[#d2d2d7] rounded-md p-3 bg-white">
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold text-[#1d1d1f]">この比較結果をシェア</div>
            <div className="text-[11px] text-[#6e6e73] mt-0.5 truncate">
              2026年AI比較：総合1位ChatGPT、コード最強Claude
            </div>
          </div>
          <ShareButton text="2026年AI比較：総合1位ChatGPT（86.5）コード最強Claude（94.3）安全性もClaude（93.7）#AI選び https://aierabi.jp" />
        </div>
        <div className="mt-3">
          <TrustBadges />
        </div>
      </Block>

      <Footer />
    </div>
  );
}
