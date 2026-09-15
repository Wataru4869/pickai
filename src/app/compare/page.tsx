import { ComparePicker } from "@/components/ComparePicker";
import { FactsLayout, FactCards } from "@/components/PublicFactsPage";
import { pairIds, modelNames } from "@/lib/public-catalog";
import styles from "./page.module.css";

export const metadata = { title: "AI比較｜用途から2つを選び、料金・機能を確認 | AI選び", description: "やりたいことから比較候補を選び、主要AIの料金・無料条件・機能を公式情報で確認。過去の点数や順位とは分けて掲載します。", alternates: { canonical: "/compare" } };
const purposeLinks = [
  { label: "文章・資料", detail: "文章作成や資料整理の候補を比べる", href: "/compare/claude-vs-chatgpt" },
  { label: "調査・検索", detail: "出典確認を含む調べ方を比べる", href: "/compare/chatgpt-vs-perplexity" },
  { label: "コーディング", detail: "コード作成と確認手順を比べる", href: "/compare/claude-vs-chatgpt" },
  { label: "画像生成", detail: "画像AIの候補と利用条件を見る", href: "/categories/image-generation" },
  { label: "無料条件", detail: "無料枠と上限の違いを確認する", href: "/cost" },
  { label: "Googleサービス", detail: "Google連携を含む提供条件を確認する", href: "/compare/chatgpt-vs-gemini" },
  { label: "まだ用途が曖昧", detail: "3つの質問から入口を絞る", href: "/recommend" },
  { label: "その他の用途", detail: "用途一覧から近いカテゴリを探す", href: "/categories" },
];
const popular = [
  { ids: ["claude", "chatgpt"], theme: "文章・資料と幅広い仕事", first: "文章や資料を中心に試したい", second: "複数用途をまとめて試したい", difference: "必要な機能、無料条件、利用上限を同じ順序で確認" },
  { ids: ["chatgpt", "gemini"], theme: "複数形式の情報を扱う", first: "幅広い作業を1つで試したい", second: "画像やファイルを含む条件を確認したい", difference: "地域・アカウント・プランごとの提供条件を確認" },
  { ids: ["chatgpt", "perplexity"], theme: "調査・検索と出典確認", first: "会話から複数の作業を進めたい", second: "情報源をたどる調査を中心にしたい", difference: "回答だけでなく、出典確認にかかる手間を比較" },
];

export default function Page() { return <FactsLayout title="何に使うか決めてから、AIを2つ比べる" intro="比較するAIが決まっていなくても大丈夫です。まず用途を選び、候補を2つに絞って、料金・機能・利用条件を確認できます。" eyebrow="AIを比較する">
  <section className={styles.start} aria-labelledby="compare-purpose-title"><div className={styles.sectionHeading}><p>最初の入口</p><h2 id="compare-purpose-title">何に使いたいですか？</h2><span>近い目的を選ぶと、確認すべき比較へ進めます。</span></div><div className={styles.purposeGrid}>{purposeLinks.map(item => <a key={item.label} href={item.href}><strong>{item.label}</strong><span>{item.detail}</span><b aria-hidden="true">比較を見る →</b></a>)}</div></section>
  <section className={styles.popular} aria-labelledby="popular-comparisons-title"><div className={styles.sectionHeading}><p>代表的な比較</p><h2 id="popular-comparisons-title">迷ったときに確認しやすい3組</h2><span>勝敗や人気順位ではなく、用途と確認条件で整理しています。</span></div><div className={styles.popularGrid}>{popular.map(item => { const [a,b]=item.ids; return <article key={`${a}-${b}`}><p>{item.theme}</p><h3>{modelNames[a]} と {modelNames[b]}</h3><dl><div><dt>{modelNames[a]}</dt><dd>{item.first}</dd></div><div><dt>{modelNames[b]}</dt><dd>{item.second}</dd></div></dl><div className={styles.difference}><strong>見る違い</strong><span>{item.difference}</span></div><a href={`/compare/${a}-vs-${b}`}>この2つを比較する</a></article>; })}</div></section>
  <ComparePicker ids={pairIds} names={modelNames} />
  <details className={styles.allPairs}><summary>すべての比較組み合わせを見る</summary><p>主要5サービスの全組み合わせです。掲載順は人気順・性能順ではありません。</p><div>{pairIds.flatMap((a,i)=>pairIds.slice(i+1).map(b=><a key={a+b} href={`/compare/${a}-vs-${b}`}><span>{modelNames[a]} と {modelNames[b]}</span><b aria-hidden="true">›</b></a>))}</div></details>
  <FactCards ids={pairIds} compact />
</FactsLayout>; }
