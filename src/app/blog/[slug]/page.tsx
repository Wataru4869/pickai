import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getArticleSlugs, CATEGORY_LABELS } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import { scoreColorHex, MODEL_COLORS } from "@/lib/data";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const title = `${article.title} | AI選び`;
  return {
    title,
    description: article.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title,
      description: article.description,
      url: `/blog/${params.slug}`,
      type: "article",
    },
  };
}

/* ── helpers for rich content rendering ── */

const MODEL_NAME_MAP: Record<string, string> = {
  chatgpt: "chatgpt",
  claude: "claude",
  gemini: "gemini",
  grok: "grok",
  perplexity: "perplexity",
};

function resolveModelKey(name: string): string | null {
  const lower = name.toLowerCase().trim();
  for (const [key, _] of Object.entries(MODEL_COLORS)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

type RichNode =
  | { type: "text"; text: string }
  | { type: "score"; text: string }
  | { type: "vs"; modelA: string; scoreA: number; modelB: string; scoreB: number; raw: string }
  | { type: "bar"; label: string; modelA: string; scoreA: number; modelB: string; scoreB: number }
  | { type: "listItem"; text: string }
  | { type: "break" };

function parseParagraph(text: string): RichNode[] {
  const nodes: RichNode[] = [];

  // Score pattern: XX.X点 or XX点
  const parts = text.split(/(\d+\.?\d*点)/g);
  for (const part of parts) {
    if (/^\d+\.?\d*点$/.test(part)) {
      nodes.push({ type: "score", text: part });
    } else if (part) {
      nodes.push({ type: "text", text: part });
    }
  }
  return nodes;
}

function parseContent(content: string): (RichNode | RichNode[])[] {
  const paragraphs = content.split(/\n\n/);
  const result: (RichNode | RichNode[])[] = [];

  for (const para of paragraphs) {
    const lines = para.split("\n");

    // Check if all lines are list items
    const allList = lines.every((l) => l.startsWith("- ") || l.trim() === "");
    if (allList && lines.some((l) => l.startsWith("- "))) {
      for (const line of lines) {
        if (line.startsWith("- ")) {
          result.push({ type: "listItem", text: line.slice(2) });
        }
      }
      result.push({ type: "break" });
      continue;
    }

    // Check for "vs" comparison pattern in any line
    const vsMatch = para.match(/^(.+?)\s+(\d+\.?\d*)\s+vs\s+(.+?)\s+(\d+\.?\d*)/m);
    if (vsMatch) {
      // Check if multiple vs lines (category comparison block)
      const vsLines = lines.filter((l) => /\S+\s+\d+\.?\d*\s+vs\s+\S+\s+\d+\.?\d*/.test(l));
      if (vsLines.length >= 2) {
        // Multiple comparison lines → render as bar chart block
        for (const line of lines) {
          const m = line.match(/^(.+?)\s+(\d+\.?\d*)\s+vs\s+(.+?)\s+(\d+\.?\d*)$/);
          if (m) {
            result.push({
              type: "vs",
              modelA: m[1].trim().replace(/^-\s*/, ""),
              scoreA: parseFloat(m[2]),
              modelB: m[3].trim(),
              scoreB: parseFloat(m[4]),
              raw: line,
            });
          } else {
            result.push(parseParagraph(line));
          }
        }
        result.push({ type: "break" });
        continue;
      }
    }

    // Check for "label: ModelA XX / ModelB YY" bar pattern
    const barMatch = para.match(/^(.+?):\s*(.+?)\s+(\d+\.?\d*)\s*\/\s*(.+?)\s+(\d+\.?\d*)$/m);
    if (barMatch) {
      const barLines = lines.filter((l) =>
        /^.+?:\s*.+?\s+\d+\.?\d*\s*\/\s*.+?\s+\d+\.?\d*$/.test(l)
      );
      if (barLines.length >= 2) {
        for (const line of lines) {
          const m = line.match(/^(.+?):\s*(.+?)\s+(\d+\.?\d*)\s*\/\s*(.+?)\s+(\d+\.?\d*)$/);
          if (m) {
            result.push({
              type: "bar",
              label: m[1].trim(),
              modelA: m[2].trim(),
              scoreA: parseFloat(m[3]),
              modelB: m[4].trim(),
              scoreB: parseFloat(m[5]),
            });
          } else if (line.trim()) {
            result.push(parseParagraph(line));
          }
        }
        result.push({ type: "break" });
        continue;
      }
    }

    // Regular paragraph with possible inline line breaks
    const lineNodes: RichNode[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("- ")) {
        lineNodes.push({ type: "listItem", text: lines[i].slice(2) });
      } else {
        lineNodes.push(...parseParagraph(lines[i]));
        if (i < lines.length - 1) {
          lineNodes.push({ type: "break" });
        }
      }
    }
    result.push(lineNodes);
    result.push({ type: "break" });
  }

  return result;
}

function RichContent({ content }: { content: string }) {
  const parsed = parseContent(content);

  return (
    <div>
      {parsed.map((item, i) => {
        // Single node
        if (!Array.isArray(item)) {
          const node = item as RichNode;

          if (node.type === "break") return <div key={i} className="h-6" />;

          if (node.type === "listItem") {
            const inner = parseParagraph(node.text);
            return (
              <div key={i} className="pl-4 py-1 text-[15px] leading-[2] text-[#1d1d1f]">
                <span className="text-[#86868b] mr-2">-</span>
                {inner.map((n, j) =>
                  n.type === "score" ? (
                    <span key={j} className="font-semibold">{(n as any).text}</span>
                  ) : "text" in n ? (
                    <span key={j}>{(n as any).text}</span>
                  ) : null
                )}
              </div>
            );
          }

          if (node.type === "vs") {
            const keyA = resolveModelKey(node.modelA);
            const keyB = resolveModelKey(node.modelB);
            return (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#e8e8ed] last:border-b-0">
                <span className="text-[13px] text-[#6e6e73] w-24 shrink-0 text-right">{node.modelA}</span>
                <div className="flex-1 h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${node.scoreA}%`,
                      backgroundColor: keyA ? MODEL_COLORS[keyA] : "#86868b",
                    }}
                  />
                </div>
                <span
                  className="text-[14px] font-semibold w-12 text-right"
                  style={{ color: scoreColorHex(node.scoreA) }}
                >
                  {node.scoreA}
                </span>
                <span className="text-[11px] text-[#86868b] w-6 text-center">vs</span>
                <span
                  className="text-[14px] font-semibold w-12"
                  style={{ color: scoreColorHex(node.scoreB) }}
                >
                  {node.scoreB}
                </span>
                <div className="flex-1 h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${node.scoreB}%`,
                      backgroundColor: keyB ? MODEL_COLORS[keyB] : "#86868b",
                    }}
                  />
                </div>
                <span className="text-[13px] text-[#6e6e73] w-24 shrink-0">{node.modelB}</span>
              </div>
            );
          }

          if (node.type === "bar") {
            const keyA = resolveModelKey(node.modelA);
            const keyB = resolveModelKey(node.modelB);
            return (
              <div key={i} className="py-2 border-b border-[#e8e8ed] last:border-b-0">
                <div className="text-[12px] font-semibold text-[#1d1d1f] mb-1.5">{node.label}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6e6e73] w-20 shrink-0">{node.modelA}</span>
                    <div className="flex-1 h-2.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${node.scoreA}%`,
                          backgroundColor: keyA ? MODEL_COLORS[keyA] : "#86868b",
                        }}
                      />
                    </div>
                    <span
                      className="text-[13px] font-semibold w-10 text-right"
                      style={{ color: scoreColorHex(node.scoreA) }}
                    >
                      {node.scoreA}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6e6e73] w-20 shrink-0">{node.modelB}</span>
                    <div className="flex-1 h-2.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${node.scoreB}%`,
                          backgroundColor: keyB ? MODEL_COLORS[keyB] : "#86868b",
                        }}
                      />
                    </div>
                    <span
                      className="text-[13px] font-semibold w-10 text-right"
                      style={{ color: scoreColorHex(node.scoreB) }}
                    >
                      {node.scoreB}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        }

        // Array of nodes = paragraph
        if (Array.isArray(item)) {
          const nodes = item as RichNode[];
          // Check if it contains list items
          const hasListItems = nodes.some((n) => n.type === "listItem");
          if (hasListItems) {
            return (
              <div key={i}>
                {nodes.map((n, j) => {
                  if (n.type === "listItem") {
                    const inner = parseParagraph(n.text);
                    return (
                      <div key={j} className="pl-4 py-1 text-[15px] leading-[2] text-[#1d1d1f]">
                        <span className="text-[#86868b] mr-2">-</span>
                        {inner.map((nn, k) =>
                          nn.type === "score" ? (
                            <span key={k} className="font-semibold">{(nn as any).text}</span>
                          ) : (
                            <span key={k}>{(nn as any).text}</span>
                          )
                        )}
                      </div>
                    );
                  }
                  if (n.type === "break") return <br key={j} />;
                  if (n.type === "score") return <span key={j} className="font-semibold">{(n as any).text}</span>;
                  return <span key={j}>{(n as any).text}</span>;
                })}
              </div>
            );
          }

          return (
            <p key={i} className="text-[15px] leading-[2] text-[#1d1d1f] mb-6">
              {nodes.map((n, j) => {
                if (n.type === "break") return <br key={j} />;
                if (n.type === "score") return <span key={j} className="font-semibold">{(n as any).text}</span>;
                return <span key={j}>{(n as any).text}</span>;
              })}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

/* ── page component ── */

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  // Derive compare page link from slug if it's a comparison
  const compareSlug = article.slug.match(/^(\w+)-vs-(\w+)/);
  const compareLink = compareSlug
    ? `/compare/${compareSlug[1]}-vs-${compareSlug[2]}`
    : null;

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      {/* Article Header */}
      <div className="bg-white py-8">
        <div className="max-w-full sm:max-w-[680px] mx-auto px-3 sm:px-4">
          <div className="text-[12px] text-[#86868b] mb-3">
            <a href="/blog" className="text-[#0066cc] hover:underline no-underline">コラム</a>
            {" > "}
            <span>{CATEGORY_LABELS[article.category] || article.category}</span>
          </div>
          <h1 className="text-[22px] font-bold text-[#1d1d1f] leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-[12px] text-[#86868b]">
            <span>{article.publishedAt} 公開</span>
            {article.updatedAt !== article.publishedAt && (
              <span>{article.updatedAt} 更新</span>
            )}
            <span>{article.readingTime}</span>
            <span className="px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium text-[11px]">
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article Sections */}
      {article.sections.map((section, i) => (
        <div key={i} className="bg-white">
          <div className="max-w-full sm:max-w-[680px] mx-auto px-3 sm:px-4">
            {i > 0 && (
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] mt-10 mb-4 pb-2 border-b border-[#e8e8ed]">
                {section.heading}
              </h2>
            )}
            {i === 0 && (
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-4 pb-2 border-b border-[#e8e8ed]">
                {section.heading}
              </h2>
            )}
            <RichContent content={section.content} />
          </div>
        </div>
      ))}

      {/* Article Footer */}
      <div className="bg-white py-8">
        <div className="max-w-full sm:max-w-[680px] mx-auto px-3 sm:px-4">
          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6 pt-6 border-t border-[#e8e8ed]">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1 rounded bg-[#f5f5f7] text-[#6e6e73]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Compare page link */}
          {compareLink && (
            <a
              href={compareLink}
              className="block p-4 border border-[#e8e8ed] rounded-lg hover:bg-[#f5f5f7] transition-colors no-underline text-inherit mb-4"
            >
              <div className="text-[12px] text-[#86868b] mb-0.5">関連する比較ページ</div>
              <div className="text-[14px] font-semibold text-[#1d1d1f]">
                テストごとの詳細スコアを見る
              </div>
              <div className="text-[11px] text-[#0066cc] mt-1">比較ページを開く →</div>
            </a>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-6">
              <div className="text-[14px] font-semibold text-[#1d1d1f] mb-3">関連記事</div>
              <div className="space-y-2">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="flex items-center justify-between p-3 border border-[#e8e8ed] rounded hover:bg-[#f5f5f7] transition-colors no-underline text-inherit"
                  >
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-[#1d1d1f]">{r.title}</div>
                      <div className="text-[11px] text-[#86868b] mt-0.5">{r.readingTime}</div>
                    </div>
                    <span className="text-[11px] text-[#0066cc] shrink-0 ml-3">読む</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-6 pt-4 border-t border-[#e8e8ed]">
            <a
              href="/blog"
              className="text-[13px] text-[#0066cc] hover:underline no-underline"
            >
              コラム一覧に戻る →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
