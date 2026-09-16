import type { Metadata } from "next";
import { Header, Footer } from "@/components/ui";
import { catalogProduct, categoryForService, editorialProfiles, modelNames } from "@/lib/public-catalog";
import styles from "./ModelDirectory.module.css";

export const metadata: Metadata = {
  title: "AIツール一覧｜用途・機能・料金から探す | AIえらびマップ",
  description: "ChatGPT、Claude、Gemini、画像・動画・開発・AIエージェントなど、掲載中のAIツールを用途別に一覧化。各詳細ページで出典付きの機能・料金・提供条件を確認できます。",
  alternates: { canonical: "/models" },
  openGraph: { title: "AIツール一覧 | AIえらびマップ", description: "掲載中のAIツールを用途別に探し、公式情報と使い方を確認できます。", url: "/models" },
};

const groupOrder = [
  "/categories/writing",
  "/categories/ai-search",
  "/categories/coding-tools",
  "/categories/image-generation",
  "/categories/video-generation",
  "/categories/ai-agents",
];

const groupNames: Record<string, string> = {
  "/categories/writing": "文章・資料作成",
  "/categories/ai-search": "調査・検索",
  "/categories/coding-tools": "コーディング",
  "/categories/image-generation": "画像・デザイン",
  "/categories/video-generation": "動画・音声",
  "/categories/ai-agents": "自動化・AIエージェント",
};

const entries = Object.keys(editorialProfiles)
  .filter(id => id !== "copilot" && Object.hasOwn(modelNames, id))
  .map(id => {
    const product = catalogProduct(id);
    const profile = editorialProfiles[id];
    const category = categoryForService[id] ?? { href: "/categories", label: "その他" };
    const confirmed = Object.values(product.facts).filter(fact => fact.source);
    const latest = confirmed.map(fact => fact.date).filter((date): date is string => Boolean(date)).sort().at(-1);
    return { id, name: product.name, profile, category, confirmed: confirmed.length, latest };
  });

export default function ModelsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIえらびマップ 掲載AIツール一覧",
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: `https://www.aierabi.jp/model/${entry.id}`,
    })),
  };
  return <div className={styles.page}><Header /><main className={styles.main}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
    <nav className={styles.breadcrumbs} aria-label="パンくず"><a href="/">トップ</a><span aria-hidden="true">›</span><span aria-current="page">AIツール一覧</span></nav>
    <header className={styles.hero}><p>掲載ツール一覧</p><h1>用途ごとに、AIを探す。</h1><span>名前だけで選ばず、できること・向いている人・公式情報の確認日から詳細へ進めます。</span><div><a href="/categories">用途から絞る</a><a href="/compare">2つを比較する</a></div></header>
    <nav className={styles.jump} aria-label="用途別一覧へのページ内リンク">{groupOrder.map(href => <a key={href} href={`#${href.split("/").at(-1)}`}>{groupNames[href]}</a>)}</nav>
    {groupOrder.map(href => {
      const items = entries.filter(entry => entry.category.href === href);
      if (!items.length) return null;
      const anchor = href.split("/").at(-1);
      return <section id={anchor} key={href} className={styles.group} aria-labelledby={`${anchor}-title`}>
        <div className={styles.groupHead}><div><p>用途別</p><h2 id={`${anchor}-title`}>{groupNames[href]}</h2></div><a href={href}>この用途の選び方を見る →</a></div>
        <div className={styles.grid}>{items.map(entry => <article key={entry.id} className={styles.card}>
          <div className={styles.cardTop}><span>{entry.profile.type}</span>{entry.latest && <time dateTime={entry.latest}>公式情報確認 {entry.latest}</time>}</div>
          <h3>{entry.name}</h3><p>{entry.profile.summary}</p>
          <ul>{entry.profile.uses.slice(0, 4).map(use => <li key={use}>{use}</li>)}</ul>
          <dl><dt>向いている人</dt><dd>{entry.profile.suited}</dd></dl>
          <a href={`/model/${entry.id}`}>{entry.name}を詳しく見る <span aria-hidden="true">→</span></a>
        </article>)}</div>
      </section>;
    })}
  </main><Footer /></div>;
}
