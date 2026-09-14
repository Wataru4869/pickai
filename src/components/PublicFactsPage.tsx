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
    const visibleFields = fields.filter(([key]) => !compact || ["major_features", "free_plan", "current_price"].includes(key));
    const verified = visibleFields.filter(([key]) => Boolean(product.facts[key].source));
    const latestVerifiedAt = verified.map(([key]) => product.facts[key].date).filter(Boolean).sort().at(-1);
    return <section key={id} className={styles.card}><h2>{product.name}</h2>
      <p className={styles.verification}>公式根拠 {verified.length}/{visibleFields.length}{latestVerifiedAt && <> · 確認 <time dateTime={latestVerifiedAt}>{latestVerifiedAt}</time></>}</p>
      <p className={styles.note}>出典の確認時点の情報。現在の契約条件はリンク先で再確認してください。</p>
      <dl>{visibleFields.map(([key, label]) => {
        const fact = product.facts[key];
        return <div key={key}><dt>{label}</dt><dd><p>{fact.text}</p>{fact.source && <a href={fact.source} rel="noopener noreferrer">公式根拠 <time dateTime={fact.date!}>{fact.date}</time>確認 ↗</a>}</dd></div>;
      })}</dl>
      {id === "copilot" && <p className={styles.note}>旧掲載名の対象製品を確定できていません。GitHub Copilotの情報を自動で当てはめていません。</p>}
    </section>;
  })}</div>;
}
export function NextActions({ title, intro, links }: { title: string; intro: string; links: { href: string; label: string; detail: string }[] }) {
  return <section className={styles.next} aria-labelledby="next-actions-title">
    <div><p className={styles.label}>NEXT STEP</p><h2 id="next-actions-title">{title}</h2><p>{intro}</p></div>
    <div className={styles.actionGrid}>{links.map(link => <a key={link.href} href={link.href}><strong>{link.label}</strong><span>{link.detail} →</span></a>)}</div>
  </section>;
}
export function PurposePage({ purpose }: { purpose: Purpose }) {
  const p = purposes[purpose];
  return <FactsLayout title={`${p.title}の選び方と公式情報`} intro="まず必要な作業と条件をそろえます。以下は確認済み項目がある候補で、網羅一覧や性能順位ではありません。">
    {purpose === "ai-agents" && <section className={styles.summary} aria-labelledby="agent-summary-title">
      <p className={styles.label}>先に分けること</p>
      <h2 id="agent-summary-title">完成した製品と、開発用モデルAPIは別に選ぶ</h2>
      <p>AIエージェントという名前だけでは、チャットで相談する製品、外部サービスを操作する製品、開発者が組み込むモデルAPIを区別できません。最初に「誰が設定するか」「どこまで操作を許可するか」「実行前に人が承認するか」を決めます。</p>
      <ul>
        <li><strong>完成した製品を使う：</strong>対応サービス、保存される情報、停止方法、月額と追加利用を確認する。</li>
        <li><strong>APIで作る：</strong>モデル料金だけでなく、実行環境、外部ツール、監視と保守の費用を分ける。</li>
        <li><strong>比較する：</strong>同じ小さな作業で、完了率だけでなく確認・手直し・失敗時の復旧を記録する。</li>
      </ul>
      <div className={styles.nextLinks} aria-label="AIエージェントの次の確認">
        <a href="/blog/openai-agents-api-guide-2026">Agents APIの変更点を読む →</a>
        <a href="/blog/ai-agents-comparison-2026">用途別の選び方を読む →</a>
        <a href="/cost">料金と追加利用の見方 →</a>
        <a href="/safety">外部操作とデータを確認 →</a>
      </div>
    </section>}
    <section className={styles.checks}><h2>比較前に決めること</h2><ul>{p.checks.map(c=><li key={c}>{c}</li>)}</ul>
      {purpose === "ai-agents" && <p>下の4候補は開発者が組み込むAPIです。OpenAI Agents APIはエージェント実行基盤、ほか3候補はモデルAPIとして確認しており、完成したエージェント製品の代替とは限りません。</p>}
      <a href={`/blog/${p.guide}`}>詳しい選び方を読む →</a>
    </section><FactCards ids={p.ids} compact />
  </FactsLayout>;
}
