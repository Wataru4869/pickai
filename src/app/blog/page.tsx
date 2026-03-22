"use client";

import { useState } from "react";
import { Header, Footer, Block, SectionHeader } from "@/components/ui";

// Import articles statically for client component
import article1 from "@/data/blog/chatgpt-vs-claude-2026.json";
import article2 from "@/data/blog/ai-tools-how-to-choose-2026.json";
import article3 from "@/data/blog/gemini-vs-chatgpt-2026.json";

const articles = [article1, article2, article3].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "比較",
  guide: "選び方",
  news: "ニュース",
};

const FILTERS = ["全て", "comparison", "guide", "news"] as const;

export default function BlogIndexPage() {
  const [filter, setFilter] = useState("全て");

  const filtered =
    filter === "全て"
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">AI比較コラム</h1>
          <p className="text-[13px] text-[#6e6e73]">
            ChatGPT・Claude・Geminiの比較、AIの選び方、最新トレンドなど。データに基づいた記事を掲載。
          </p>
        </div>
      </div>

      <Block>
        <div className="flex gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                filter === f
                  ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                  : "bg-white text-[#6e6e73] border-[#d2d2d7] hover:border-[#1d1d1f]"
              }`}
            >
              {f === "全て" ? "全て" : CATEGORY_LABELS[f] || f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-[13px] text-[#86868b] py-8 text-center">
              該当する記事はまだありません。
            </div>
          )}
          {filtered.map((article) => (
            <a
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-4 border border-[#e8e8ed] rounded-lg hover:bg-[#f5f5f7] transition-colors no-underline text-inherit"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">
                      {CATEGORY_LABELS[article.category] || article.category}
                    </span>
                    <span className="text-[10px] text-[#86868b]">{article.readingTime}</span>
                  </div>
                  <div className="text-[14px] font-semibold text-[#1d1d1f] leading-snug">
                    {article.title}
                  </div>
                  <div className="text-[11px] text-[#86868b] mt-1 line-clamp-2">
                    {article.description}
                  </div>
                </div>
                <div className="text-[10px] text-[#86868b] shrink-0 pt-1">
                  {article.publishedAt}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Block>

      <Footer />
    </div>
  );
}
