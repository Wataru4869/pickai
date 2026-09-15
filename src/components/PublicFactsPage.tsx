import type { ReactNode } from "react";
import { Header, Footer } from "@/components/ui";
import { catalogProduct, editorialProfiles, fields, modelNames, purposes, type Purpose } from "@/lib/public-catalog";
import styles from "./PublicFactsPage.module.css";

type BreadcrumbItem = { label: string; href?: string };

export function FactsLayout({ title, intro, children, eyebrow = "選ぶための確認ガイド", breadcrumbs }: { title: string; intro: string; children: ReactNode; eyebrow?: string; breadcrumbs?: BreadcrumbItem[] }) {
  const items = breadcrumbs ?? [{ label: "トップ", href: "/" }, { label: title }];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.aierabi.jp${item.href}` } : {}),
    })),
  };
  return <div className={styles.page}><Header /><div className={styles.main}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    <nav className={styles.breadcrumbs} aria-label="パンくず">{items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <b aria-hidden="true">›</b>}{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</span>)}</nav>
    <header className={styles.pageHeader}><p className={styles.label}>{eyebrow}</p><h1>{title}</h1><p>{intro}</p>
      <div className={styles.headerTrust}><span>公式情報は出典付き</span><span>未確認は未確認と表示</span><span>過去の採点と分離</span></div>
    </header>
    {children}
    <aside className={styles.history}><div><span className={styles.historyMark} aria-hidden="true">履歴</span></div><div><h2>過去の評価と、現在の公式情報は別です</h2><p>このページでは古い点数から順位や契約推奨を算出しません。未確認は低評価でも0でもありません。</p><div className={styles.inlineLinks}><a href="/evaluations/2026-03">2026年3月の検証結果</a><a href="/methodology">評価方法と限界</a></div></div></aside>
  </div><Footer /></div>;
}

export function ToolSummary({ id }: { id: string }) {
  const product = catalogProduct(id);
  const profile = editorialProfiles[id];
  if (!profile) return null;
  const confirmed = ["major_features", "current_price", "free_plan", "availability"].filter(key => product.facts[key as keyof typeof product.facts].source).length;
  return <section className={styles.toolSummary} aria-labelledby="tool-summary-title">
    <div className={styles.toolIdentity}><span className={styles.toolMark} aria-hidden="true">{product.name.slice(0, 2)}</span><div><p>{profile.type}</p><h2 id="tool-summary-title">{profile.summary}</h2></div></div>
    <div className={styles.badges}>{profile.uses.map(use => <span key={use}>{use}</span>)}<span>{confirmed}/4項目に公式根拠</span></div>
    <div className={styles.fitGrid}><div><h3>候補にしやすい人</h3><p>{profile.suited}</p></div><div><h3>先に確認すること</h3><p>{profile.check}</p></div></div>
    <div className={styles.summaryActions}><a className={styles.primaryAction} href="#current-facts" data-analytics-event="internal_cta_click" data-source-page={`/model/${id}`} data-cta-type="facts" data-cta-position="tool_summary" data-destination-id="current_facts">料金・条件を見る</a><a href="/compare" data-analytics-event="internal_cta_click" data-source-page={`/model/${id}`} data-cta-type="compare" data-cta-position="tool_summary" data-destination-id="/compare">ほかのAIと比較する</a></div>
  </section>;
}

export function ComparisonSummary({ ids }: { ids: string[] }) {
  const profiles = ids.map(id => ({ id, name: modelNames[id], profile: editorialProfiles[id] }));
  return <section className={styles.decisionSummary} aria-labelledby="comparison-conclusion">
    <p className={styles.label}>まず結論</p><h2 id="comparison-conclusion">使いたい作業から候補を分ける</h2>
    <div className={styles.choiceGrid}>{profiles.map(({id,name,profile}) => <div key={id}><h3>{name}を確認するなら</h3><p>{profile?.suited ?? "公式情報と自分の作業条件を確認したい場合"}</p><span>確認点：{profile?.check ?? "提供条件"}</span></div>)}</div>
    <div className={styles.threeChecks}><strong>迷ったら、この3項目だけ先に比較</strong><ol><li>実際に使いたい作業</li><li>無料条件と必要な機能</li><li>出典確認と手直しの時間</li></ol></div>
  </section>;
}

export function FactCards({ ids, compact = false }: { ids: string[]; compact?: boolean }) {
  return <section id="current-facts" aria-labelledby="facts-title"><div className={styles.sectionHeading}><p className={styles.label}>現在の公式情報</p><h2 id="facts-title">契約前に確認する項目</h2><p>項目ごとに出典と確認日を表示しています。公式根拠がない値は補完しません。</p></div>
    <div className={styles.grid}>{ids.map(id => {
      const product = catalogProduct(id);
      const profile = editorialProfiles[id];
      const visibleFields = fields.filter(([key]) => !compact || ["major_features", "free_plan", "current_price"].includes(key));
      const verified = visibleFields.filter(([key]) => Boolean(product.facts[key].source));
      const latestVerifiedAt = verified.map(([key]) => product.facts[key].date).filter(Boolean).sort().at(-1);
      return <article key={id} className={styles.card}>
        <div className={styles.cardHeader}><span className={styles.cardMark} aria-hidden="true">{product.name.slice(0,2)}</span><div><p>{profile?.type ?? "AIサービス"}</p><h3>{product.name}</h3></div></div>
        {profile && <p className={styles.cardSummary}>{profile.summary}</p>}
        <p className={styles.verification}>公式根拠 {verified.length}/{visibleFields.length}{latestVerifiedAt && <> · <time dateTime={latestVerifiedAt}>{latestVerifiedAt}</time>確認</>}</p>
        <dl>{visibleFields.map(([key, label]) => {
          const fact = product.facts[key];
          return <div key={key}><dt>{label}</dt><dd><p>{fact.text}</p>{fact.source ? <a href={fact.source} target="_blank" rel="noopener noreferrer">公式情報を確認 <time dateTime={fact.date!}>（{fact.date}確認）</time><span aria-hidden="true"> ↗</span></a> : <span className={styles.unknown}>公式根拠を未確認</span>}</dd></div>;
        })}</dl>
        {Object.hasOwn(modelNames, id) && id !== "copilot" && <div className={styles.cardActions}><a href={`/model/${id}`}>詳しい条件を見る</a><a href="/compare">比較候補にする</a></div>}
        {id === "copilot" && <p className={styles.note}>旧掲載名の対象製品を確定できていません。GitHub Copilotの情報を自動で当てはめていません。</p>}
      </article>;
    })}</div>
  </section>;
}

export function NextActions({ title, intro, links, sourcePage }: { title: string; intro: string; links: { href: string; label: string; detail: string }[]; sourcePage?: string }) {
  return <section className={styles.next} aria-labelledby="next-actions-title"><div><p className={styles.label}>次にすること</p><h2 id="next-actions-title">{title}</h2><p>{intro}</p></div><div className={styles.actionGrid}>{links.map((link, index) => <a key={link.href} href={link.href} data-analytics-event={sourcePage ? "internal_cta_click" : undefined} data-source-page={sourcePage} data-cta-type={sourcePage ? "next_action" : undefined} data-cta-position={sourcePage ? `next_action_${index + 1}` : undefined} data-destination-id={sourcePage ? link.href : undefined}><strong>{link.label}</strong><span>{link.detail}<b aria-hidden="true"> →</b></span></a>)}</div></section>;
}

export function PurposePage({ purpose }: { purpose: Purpose }) {
  const p = purposes[purpose];
  const title = `${p.title}を用途から選ぶ`;
  return <FactsLayout title={title} intro="最初に必要な作業を決め、候補と利用条件を同じ順序で確認します。掲載順は性能順位ではありません。" eyebrow="用途からAIを探す" breadcrumbs={[{label:"トップ",href:"/"},{label:"用途からAIを探す",href:"/categories"},{label:title}]}>
    <section className={styles.decisionSummary} aria-labelledby="purpose-start"><p className={styles.label}>最初の3ステップ</p><h2 id="purpose-start">選ぶ前に、条件をそろえる</h2><ol className={styles.steps}><li><span>1</span><div><strong>成果物を決める</strong><p>何を作り、誰が使うかを1つに絞る</p></div></li><li><span>2</span><div><strong>候補を2つに絞る</strong><p>必要な機能と無料条件を公式情報で確認</p></div></li><li><span>3</span><div><strong>同じ作業で試す</strong><p>出力だけでなく手直し時間まで比べる</p></div></li></ol></section>
    <section className={styles.checks}><h2>この用途で確認すること</h2><ul>{p.checks.map(c => <li key={c}>{c}</li>)}</ul>{purpose !== "writing" && <a href={`/blog/${p.guide}`}>詳しい選び方と注意点を読む</a>}</section>
    {purpose === "ai-agents" && <section className={styles.summary}><h2>完成した製品と開発用APIは分けて選ぶ</h2><p>AIエージェントという名前だけでは、相談する製品、外部サービスを操作する製品、開発者が組み込むAPIを区別できません。誰が設定し、どこまで操作を許可し、実行前に人が承認するかを先に決めてください。</p></section>}
    <FactCards ids={p.ids} compact />
    <NextActions sourcePage={`/categories/${purpose}`} title="候補を絞ったら、次の確認へ" intro="料金、入力情報、ほかの候補を確認してから、小さな作業で試してください。" links={[{href:"/compare",label:"主要AIを比較",detail:"同じ項目で違いを見る"},{href:"/cost",label:"料金条件を確認",detail:"無料枠・税・契約周期を見る"},{href:"/safety",label:"安全に使う",detail:"入力と公開の条件を見る"},{href:"/recommend",label:"候補を確認",detail:"3つの質問から入口を絞る"}]} />
  </FactsLayout>;
}
