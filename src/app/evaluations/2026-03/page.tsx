import type { Metadata } from "next";
import { getModels, getOverallRanking, getChanges } from "@/lib/data";
import { Header, Footer, HistoricalScoreNotice } from "@/components/ui";
import styles from "@/components/Discovery.module.css";
export const metadata: Metadata = {
  title: "2026年3月の保存評価・スコア履歴 | AI選び",
  description: "再現用raw dataが不足する過去の保存評価。現在のモデル性能・購入推奨とは区別します。",
  alternates: { canonical: "/evaluations/2026-03" },
  robots: { index: false, follow: true },
  openGraph: { title: "2026年3月の保存評価 | AI選び", description: "現在の性能順位ではない保存記録。", url: "/evaluations/2026-03" },
  twitter: { title: "2026年3月の保存評価 | AI選び", description: "現在の性能順位ではない保存記録。" },
};
export default function EvaluationArchive() {
  const models = getModels();
  const ranking = getOverallRanking().map(row => ({ ...row, scores: models.find(model => model.id === row.model)?.scores }));
  const changes = getChanges();
  return <div className={styles.page}><Header /><main className={styles.container}>
    <p className={styles.note}><a href="/#current-comparison">← 現行のツール・モデル比較へ</a></p>
        <section className={styles.section} aria-labelledby="archive-title">
          <p className={styles.eyebrow}>EVALUATION ARCHIVE</p><h1 id="archive-title" style={{fontSize:32,fontWeight:700}}>2026年3月の保存評価</h1>
          <HistoricalScoreNotice />
          <p className={styles.note}>以下は当時の記録です。現在の性能順位・購入推奨ではありません。新しいモデル世代は再評価していません。</p>
          <details className={styles.archive} open><summary>保存スコアと履歴を開く</summary>
            <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="2026年3月の保存評価表（横スクロール可能）">
              <table><caption>総合の保存済み評価（2026年3月）。再現用raw dataは不足しています。</caption><thead><tr>{["保存順位", "サービス", "総合", "文章", "コード", "画像", "安全性"].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{ranking.map((r: any, i: number) => <tr key={r.model}><td>{i + 1}</td><th scope="row"><a href={`/model/${r.model}`}>{models.find(m => m.id === r.model)?.name ?? r.model}</a></th><td>{r.score ?? "未確認"}</td>{["writing","coding","image","safety"].map(key => <td key={key}>{r.scores?.[key] ?? "未確認"}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <h3>保存済みの変化記録：{changes.period}</h3><p className={styles.note}>記録日 {changes.lastUpdated}。現在のアップデートニュースではありません。</p>
            <ul>{changes.changes.map((c: any) => <li key={c.model}>{c.modelName}：{c.newScore}（保存上の差分 {c.change > 0 ? "+" : ""}{c.change}）</li>)}</ul>
            <a href="/safety">安全性の保存評価を見る →</a>
          </details>
        </section>
  </main><Footer /></div>;
}
