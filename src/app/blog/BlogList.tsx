"use client";
import { useState } from "react";
import type { BlogArticle } from "@/lib/blog";
import { reviewedGuideSet } from "@/lib/reviewed-guides";
import styles from "@/components/Discovery.module.css";
const labels: Record<string, string> = { all: "全て", comparison: "比較", guide: "選び方", analysis: "分析", news: "ニュース" };
export default function BlogList({ articles }: { articles: BlogArticle[] }) {
  const [filter, setFilter] = useState("all");
  const [scope, setScope] = useState("reviewed");
  const [query, setQuery] = useState("");
  const term = query.trim().toLocaleLowerCase("ja");
  const filtered = articles.filter(a => (filter === "all" || a.category === filter)
    && (scope === "all" || reviewedGuideSet.has(a.slug) === (scope === "reviewed"))
    && (!term || [a.title, a.description, ...a.tags].join(" ").toLocaleLowerCase("ja").includes(term)));
  return <section className={styles.container} aria-label="記事一覧">
    <div className={styles.section}>
      <nav className={styles.guideRoutes} aria-labelledby="guide-routes-title">
        <div><p className={styles.japaneseEyebrow}>記事の前に候補を見たい方へ</p><h2 id="guide-routes-title">作りたいものから、AIを探す</h2><p>解説を読むだけでなく、用途ごとの候補・料金・比較へ進めます。</p></div>
        <div>{[
          ["調査・検索", "/categories/ai-search"],
          ["コーディング", "/categories/coding-tools"],
          ["画像生成", "/categories/image-generation"],
          ["動画生成", "/categories/video-generation"],
        ].map(([label, href], index) => <a key={href} href={href} data-analytics-event="internal_cta_click" data-source-page="/blog" data-cta-type="purpose" data-cta-position={`blog_route_${index + 1}`} data-destination-id={href}>{label}<span aria-hidden="true">→</span></a>)}</div>
      </nav>
      <label className={styles.articleSearch}>サービス名・用途で探す
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例：ChatGPT、料金、安全性" maxLength={100} />
      </label>
      <div className={styles.filters} role="group" aria-label="記事の確認状態">
        {[["reviewed", "現在の選び方"], ["all", "全ての記事"], ["archive", "過去・未再確認"]].map(([id, label]) => <button type="button" key={id} aria-pressed={scope === id} onClick={() => setScope(id)}>{label}</button>)}
      </div>
      <p className={styles.note}>「再確認」は本文に明記した範囲です。掲載された全サービスの現行性や、独自スコアの再測定を保証するものではありません。</p>
      <div className={styles.filters} role="group" aria-label="記事の種類">
        {Object.entries(labels).map(([id, label]) => <button type="button" key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}
      </div>
      <p className={styles.count} role="status">{filtered.length}件の記事</p>
      {filtered.length === 0 && <p className={styles.note}>該当する記事はありません。別の言葉や種類で探してください。<button type="button" onClick={() => {setQuery("");setScope("all");setFilter("all");}}>条件をリセット</button></p>}
      <div className={styles.articleGrid}>{filtered.map(article =>
        <a className={styles.articleCard} key={article.slug} href={`/blog/${article.slug}`}>
          <div className={styles.cardMeta}><span>{labels[article.category] || article.category}</span><span>{article.readingTime}</span><span>内容更新 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span></div>
          <span className={styles.articleScope}>{reviewedGuideSet.has(article.slug) ? "内容を再確認 · 対象範囲は本文へ" : "過去の記録 · 内容の現行性は未再確認"}</span>
          <h2 className="!text-[19px] !mb-0">{article.title}</h2><p>{article.description}</p>
          <span className={styles.read}>記事を読む →</span>
        </a>)}</div>
    </div>
  </section>;
}
