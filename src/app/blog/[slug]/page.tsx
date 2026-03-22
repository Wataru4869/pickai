import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getArticleSlugs, CATEGORY_LABELS } from "@/lib/blog";
import { Header, Footer, Block, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Pick AI`,
    description: article.description,
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <div className="text-[11px] text-[#86868b] mb-2">
            <a href="/blog" className="text-[#0066cc] hover:underline no-underline">コラム</a>
            {" > "}
            <span>{CATEGORY_LABELS[article.category] || article.category}</span>
          </div>
          <h1 className="text-[20px] font-bold text-[#1d1d1f] leading-tight mb-2">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-[11px] text-[#86868b]">
            <span>{article.publishedAt} 公開</span>
            {article.updatedAt !== article.publishedAt && (
              <span>{article.updatedAt} 更新</span>
            )}
            <span>{article.readingTime}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
          </div>
        </div>
      </div>

      {article.sections.map((section, i) => (
        <Block key={i}>
          <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-3">
            {section.heading}
          </h2>
          <div className="text-[14px] leading-relaxed text-[#1d1d1f] whitespace-pre-line">
            {section.content}
          </div>
          {section.dataRef && (
            <div className="mt-3 p-3 bg-[#f5f5f7] rounded text-[11px] text-[#86868b]">
              データ参照: {section.dataRef} — 実データは後日統合予定
            </div>
          )}
        </Block>
      ))}

      {article.tags.length > 0 && (
        <Block>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#86868b]">タグ:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Block>
      )}

      {related.length > 0 && (
        <Block>
          <SectionHeader title="関連記事" />
          <div className="space-y-2">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="flex items-center justify-between p-3 border border-[#e8e8ed] rounded hover:bg-[#f5f5f7] transition-colors no-underline text-inherit"
              >
                <div>
                  <div className="text-[12px] font-semibold text-[#1d1d1f]">{r.title}</div>
                  <div className="text-[10px] text-[#86868b] mt-0.5">{r.readingTime}</div>
                </div>
                <span className="text-[11px] text-[#0066cc] shrink-0 ml-2">読む</span>
              </a>
            ))}
          </div>
        </Block>
      )}

      <Footer />
    </div>
  );
}
