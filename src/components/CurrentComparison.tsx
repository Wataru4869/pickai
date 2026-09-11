"use client";

import { useState } from "react";
import type { CurrentProduct, ComparisonGroup, DisplayFact } from "@/lib/current-comparison";
import styles from "./CurrentComparison.module.css";

const labels = { chat: "文章・調査", api: "モデルAPI", coding: "開発ツール" };
function Fact({ fact }: { fact: DisplayFact }) {
  return <><span>{fact.text}</span>{fact.source && <a className={styles.source} href={fact.source} target="_blank" rel="noopener noreferrer">公式根拠 ↗ <time dateTime={fact.date!}>{fact.date}</time></a>}</>;
}
export default function CurrentComparison({ products }: { products: CurrentProduct[] }) {
  const [group, setGroup] = useState<ComparisonGroup | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = selected.flatMap(id => products.filter(p => p.id === id));
  const visible = products.filter(p => (group === "all" || p.group === group) && `${p.name} ${p.product.text} ${p.features.text} ${p.availability.text}`.toLowerCase().includes(query.trim().toLowerCase()));
  function toggle(p: CurrentProduct) {
    if (selected.includes(p.id)) setSelected(selected.filter(id => id !== p.id));
    else if (selected.length < 3 && (!chosen.length || chosen[0].group === p.group)) setSelected([...selected, p.id]);
  }
  return <section id="current-comparison" className={styles.section} aria-labelledby="current-title">
    <div className={styles.heading}><div><p className={styles.eyebrow}>CURRENT TOOL EXPLORER</p><h2 id="current-title">名前だけでなく、<br />使い方まで比べる。</h2></div><p>アプリ・API・開発ツールを分けて比較。<br />並び順は性能順位ではありません。</p></div>
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="比較対象の種類">
        {(["all", "chat", "api", "coding"] as const).map(g => <button key={g} type="button" aria-pressed={group === g} onClick={() => setGroup(g)}>{g === "all" ? "すべて" : labels[g]} <span>{products.filter(p => g === "all" || p.group === g).length}</span></button>)}
      </div>
      <label className={styles.search}>ツール・モデルを検索<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="例：Qwen、Windsurf" autoComplete="off" /></label>
    </div>
    <p className={styles.result} role="status">{visible.length}件表示 / {products.length}件掲載。比較には同じ種類を2〜3件選択してください。</p>
    <div className={`${styles.selection} ${chosen.length ? styles.floating : ""}`} data-testid="comparison-selection">
      <div><p role="status">比較候補 {chosen.length} / 3{chosen.length > 0 ? `：${chosen.map(p => p.name).join("・")}` : " — 気になる候補を選んでください"}</p><small>異なる種類を選ぶ場合は一度解除。比較操作はこの画面内だけで保持します。</small></div>
      <div>{chosen.length > 0 && <button type="button" onClick={() => setSelected([])}>選択を解除</button>}{chosen.length >= 2 && <a href="#selected-comparison">比較表へ ↓</a>}</div>
    </div>
    <div className={styles.grid}>
      {visible.map(p => {
        const active = selected.includes(p.id);
        const unavailable = !active && (selected.length >= 3 || (chosen.length > 0 && chosen[0].group !== p.group));
        return <article key={p.id} className={`${styles.card} ${active ? styles.selected : ""}`} data-group={p.group}>
          <div className={styles.cardTop}><span className={styles.monogram} aria-hidden="true">{p.monogram}</span><div><p className={styles.kind}>{labels[p.group]}</p><h3>{p.name}</h3></div></div>
          <p className={styles.provider}>{p.provider.text}</p>
          <p className={styles.product}>{p.product.text}</p>
          <p className={styles.question}>{p.question}</p>
          <dl className={styles.facts}><div><dt>公式の機能情報</dt><dd><Fact fact={p.features} /></dd></div><div><dt>無料プラン</dt><dd><Fact fact={p.free} /></dd></div></dl>
          <details className={styles.details}><summary>提供条件・確認範囲を見る</summary><p><Fact fact={p.availability} /></p><p><Fact fact={p.product} /></p><p>用途の問いかけは編集上の分類です。日本語品質・実作業の成功率・安全性の優劣は未評価です。</p></details>
          <div className={styles.cardBottom}><span className={styles.unrated}>独自スコア：未評価</span><button type="button" aria-label={`${p.name}を${active ? "比較から外す" : "比較に追加"}`} aria-pressed={active} disabled={unavailable} onClick={() => toggle(p)}>{active ? "✓ 比較中" : "＋ 比較に追加"}</button></div>
          <a className={styles.guide} href={p.guide}>選び方を読む →</a>
        </article>;
      })}
    </div>
    {!visible.length && <div className={styles.empty}><p>一致する候補がありません。未掲載は低評価を意味しません。</p><button type="button" onClick={() => { setQuery(""); setGroup("all"); }}>絞り込みを解除</button></div>}
    {chosen.length >= 2 && <section id="selected-comparison" className={styles.comparison} aria-labelledby="selected-title">
      <h3 id="selected-title">選んだ{labels[chosen[0].group]}を比較</h3>
      <p>機能の有無と性能の高さは別です。金額は出典の表記で、円換算・税・地域条件・追加従量費を統一した価格比較ではありません。</p>
      <div className={styles.scroll} tabIndex={0} role="region" aria-label="選択した候補の比較表。横スクロール可能">
        <table><caption>公式情報の比較。未確認は0円・利用不可・低得点を意味しません。</caption><thead><tr><th scope="col">確認すること</th>{chosen.map(p => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead><tbody>
          {([ ["product", "モデル / 製品"], ["features", "機能"], ["free", "無料プラン"], ["price", "掲載プラン料金"], ["availability", "提供条件"] ] as const).map(([field,label]) => <tr key={field}><th scope="row">{label}</th>{chosen.map(p => <td key={p.id}><Fact fact={p[field]} /></td>)}</tr>)}
          <tr><th scope="row">独自評価</th>{chosen.map(p => <td key={p.id}>未評価<br /><small>同条件のraw回答・採点根拠なし</small></td>)}</tr>
          <tr><th scope="row">次に確かめる</th>{chosen.map(p => <td key={p.id}><a href={p.guide}>選び方ガイド →</a></td>)}</tr>
        </tbody></table>
      </div>
    </section>}
    <div className={styles.evidence}><strong>点数がない理由も、隠しません。</strong><p>2026年3月の保存値は、新モデルの性能を測った結果ではありません。再テストの生の回答と採点根拠がそろうまでは、新しい点数を付けずに公式情報で比較します。</p><a href="/evaluations/2026-03">3月の保存スコアを見る →</a><a href="/methodology">評価の根拠と限界 →</a></div>
  </section>;
}
