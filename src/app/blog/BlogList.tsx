"use client";

import { useState } from "react";
import { Block } from "@/components/ui";
import type { BlogArticle } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "比較",
  guide: "選び方",
  analysis: "分析",
  news: "ニュース",
};

const FILTERS = ["全て", "comparison", "guide", "analysis", "news"];

type Props = {
  articles: BlogArticle[];
};

export default function BlogList({ articles }: Props) {
  const [filter, setFilter] = useState("全て");

  const filtered =
    filter === "全て"
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <Block>
      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-[12px] ${
              filter === f
                ? "bg-[#1d1d1f] text-white"
                : "bg-white text-[#6e6e73] border border-[#d2d2d7]"
            }`}
          >
            {f === "全て" ? "全て" : CATEGORY_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-[13px] text-[#6e6e73]">
            該当する記事はまだありません。
          </div>
        )}
        {filtered.map((article) => (
          <a
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block p-4 border border-[#d2d2d7] hover:bg-[#f5f5f7]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-[#1a6dcc]">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                  <span className="text-[10px] text-[#6e6e73]">
                    {article.readingTime}
                  </span>
                </div>
                <div className="text-[14px] font-medium text-[#1d1d1f] mb-1">
                  {article.title}
                </div>
                <div className="text-[12px] text-[#6e6e73]">
                  {article.description}
                </div>
              </div>
              <div className="text-[10px] text-[#6e6e73] whitespace-nowrap">
                {article.publishedAt}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Block>
  );
}
