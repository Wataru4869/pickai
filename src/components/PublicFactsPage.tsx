import type { ReactNode } from "react";
import { Header, Footer } from "@/components/ui";
import { catalogProduct, fields, purposes, type Purpose } from "@/lib/public-catalog";
import styles from "./PublicFactsPage.module.css";

export function FactsLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className={styles.page}><Header /><div className={styles.main}>
    <nav aria-label="ページ案内"><a href="/">トップ</a><a href="/categories">用途から探す</a><a href="/compare">公式情報で比較</a></nav>
    <header><p className={styles.label}>条件と根拠から選ぶ</p><h1>{title}</h1><p>{intro}</p></header>
    {children}
    <aside className={styles.history}><h2>独自評価と公式情報は別です</h2><p>このページでは古い点数から順位・購入推奨を算出しません。未確認は低評価でもゼロでもありません。</p><a href="/evaluations/2026-03">2026年3月の保存評価を見る →</a><a href="/methodology">評価方法と限界 →</a></aside>
  </div><Footer /></div>;
}
export function FactCards({ ids, compact = false }: { ids: string[]; compact?: boolean }) {
  return <div className={styles.grid}>{ids.map(id => {
    const product = catalogProduct(id);
    return <section key={id} className={styles.card}><h2>{product.name}</h2><p className={styles.note}>出典の確認時点の情報。現在の契約条件はリンク先で再確認してください。</p>
      <dl>{fields.filter(([key]) => !compact || ["major_features", "free_plan", "current_price"].includes(key)).map(([key, label]) => {
        const fact = product.facts[key];
        return <div key={key}><dt>{label}</dt><dd><p>{fact.text}</p>{fact.source && <a href={fact.source} rel="noopener noreferrer">公式根拠 <time dateTime={fact.date!}>{fact.date}</time>確認 ↗</a>}</dd></div>;
      })}</dl>
      {id === "copilot" && <p className={styles.note}>旧掲載名の対象製品を確定できていません。GitHub Copilotの情報を自動で当てはめていません。</p>}
    </section>;
  })}</div>;
}
export function PurposePage({ purpose }: { purpose: Purpose }) {
  const p = purposes[purpose];
  return <FactsLayout title={`${p.title}の選び方と公式情報`} intro="まず必要な作業と条件をそろえます。以下は確認済み項目がある候補で、網羅一覧や性能順位ではありません。">
    <section className={styles.checks}><h2>比較前に決めること</h2><ul>{p.checks.map(c=><li key={c}>{c}</li>)}</ul>
      {purpose === "ai-agents" && <p>下の3候補は開発向けモデルAPIです。完成したエージェント製品の代替とは限りません。製品側の選び方はガイドで分けて確認できます。</p>}
      <a href={`/blog/${p.guide}`}>詳しい選び方を読む →</a>
    </section><FactCards ids={p.ids} compact />
  </FactsLayout>;
}
