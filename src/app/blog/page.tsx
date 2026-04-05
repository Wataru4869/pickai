"use client";

import { useState } from "react";
import { Header, Footer, Block } from "@/components/ui";

// Import all articles
import a1 from "@/data/blog/chatgpt-vs-claude-2026.json";
import a2 from "@/data/blog/ai-tools-how-to-choose-2026.json";
import a3 from "@/data/blog/gemini-vs-chatgpt-2026.json";
import a4 from "@/data/blog/claude-vs-gemini-2026.json";
import a5 from "@/data/blog/ai-coding-tools-2026.json";
import a6 from "@/data/blog/ai-image-generation-2026.json";
import a7 from "@/data/blog/ai-free-tier-comparison-2026.json";
import a8 from "@/data/blog/ai-safety-ranking-2026.json";
import a9 from "@/data/blog/chatgpt-vs-grok-2026.json";
import a10 from "@/data/blog/ai-for-business-writing-2026.json";
import a11 from "@/data/blog/ai-video-generation-2026.json";
import a12 from "@/data/blog/chatgpt-review-2026.json";
import a13 from "@/data/blog/claude-review-2026.json";
import a14 from "@/data/blog/gemini-review-2026.json";
import a15 from "@/data/blog/grok-review-2026.json";
import a16 from "@/data/blog/perplexity-review-2026.json";
import a17 from "@/data/blog/ai-privacy-by-usecase-2026.json";
import a18 from "@/data/blog/ai-company-guidelines-template-2026.json";
import a19 from "@/data/blog/ai-data-policy-comparison-2026.json";

const articles = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "比較",
  guide: "選び方",
  analysis: "分析",
  news: "ニュース",
};

const FILTERS = ["全て", "comparison", "guide", "analysis"] as const;

export default function BlogIndexPage() {
  const [filter, setFilter] = useState("全て");

  const filtered =
    filter === "全て"
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white py-6">
        <div className="max-w-[860px] mx-auto px-4">
          <h1 className="text-[20px] font-bold text-[#1d1d1f] mb-1">AI比較コラム</h1>
          <p className="text-[13px] text-[#6e6e73]">
            ChatGPT・Claude・Geminiの比較、AIの選び方、最新トレンドなど。データに基づいた記事を掲載。
          </p>
          <div className="text-[11px] text-[#86868b] mt-1">{articles.length}記事</div>
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
              className="block p-4 border border-[#e8e8ed] rounded-md hover:border-[#86868b] transition-colors no-underline text-inherit bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium text-[#6e6e73] border border-[#d2d2d7]">
                      {CATEGORY_LABELS[article.category] || article.category}
                    </span>
                    <span className="text-[10px] text-[#86868b]">{article.readingTime}</span>
                  </div>
                  <div className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">
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
