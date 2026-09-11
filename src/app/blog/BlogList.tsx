"use client";
import { useState } from "react";
import type { BlogArticle } from "@/lib/blog";
import styles from "@/components/Discovery.module.css";
const labels: Record<string, string> = { all: "全て", comparison: "比較", guide: "選び方", analysis: "分析", news: "ニュース" };
export default function BlogList({ articles }: { articles: BlogArticle[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? articles : articles.filter(a => a.category === filter);
  return <section className={styles.container} aria-label="記事一覧">
    <div className={styles.section}>
      <div className={styles.filters} role="group" aria-label="記事の種類">
        {Object.entries(labels).map(([id, label]) => <button type="button" key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}
      </div>
      <p className={styles.count} role="status">{filtered.length}件の記事</p>
      {filtered.length === 0 && <p className={styles.note}>該当する記事はまだありません。別の種類を選んでください。</p>}
      <div className={styles.articleGrid}>{filtered.map(article =>
        <a className={styles.articleCard} key={article.slug} href={`/blog/${article.slug}`}>
          <div className={styles.cardMeta}><span>{labels[article.category] || article.category}</span><span>{article.readingTime}</span><span>内容更新 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span></div>
          <h2 className="!text-[19px] !mb-0">{article.title}</h2><p>{article.description}</p>
          <span className={styles.read}>記事を読む →</span>
        </a>)}</div>
    </div>
  </section>;
}
