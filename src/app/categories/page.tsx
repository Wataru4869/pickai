import { Header, Footer } from "@/components/ui";
import styles from "@/components/Discovery.module.css";

export const metadata = {
  title: "用途から探すAI比較ガイド｜画像・動画・開発・検索 | AI選び",
  description: "5カテゴリの選び方ガイドと、2026年3月の保存評価を分けて確認できます。",
  alternates: { canonical: "/categories" },
  openGraph: { title: "用途から探すAI比較ガイド | AI選び", url: "/categories" },
};
const categories = [
  { id: "image-generation", name: "画像をつくる", description: "作風だけでなく、編集のしやすさと利用条件を見る。", slug: "ai-image-generation-2026" },
  { id: "video-generation", name: "動画をつくる", description: "素材・尺・顔出しの有無から、制作の入口を選ぶ。", slug: "ai-video-generation-2026" },
  { id: "coding-tools", name: "コードを書く・直す", description: "作業環境、レビュー、追加利用の条件を比べる。", slug: "ai-coding-tools-2026" },
  { id: "ai-agents", name: "作業を任せる", description: "エージェントに任せる範囲と、人間の確認を決める。", slug: "ai-agents-comparison-2026" },
  { id: "ai-search", name: "調べて、まとめる", description: "出典に戻れるか、調べた内容を活用しやすいか。", slug: "ai-search-engines-comparison-2026" },
];
export default function CategoriesPage() {
  return <div className={styles.page}><Header /><main>
    <header className={styles.hero}><div className={styles.container}><p className={styles.eyebrow}>COMPARE BY PURPOSE</p><h1>やりたいことを、<br /><em>比較の出発点に。</em></h1><p className={styles.lead}>まずは用途のガイドへ。<br />過去の評価記録は、別の入口で確認できます。</p></div></header>
    <div className={styles.container}><section className={styles.section} aria-label="5つの用途">
      <div className={styles.articleGrid}>{categories.map(cat => <div className={styles.articleCard} key={cat.id}><h2>{cat.name}</h2><p>{cat.description}</p><a className={styles.primary} href={`/blog/${cat.slug}`}>選び方のガイドへ →</a><a className={styles.secondary} href={`/categories/${cat.id}`}>2026年3月の保存評価</a></div>)}</div>
      <p className={styles.note}>保存評価は現行モデルの順位ではありません。購入・契約前は各社の提供条件を確認してください。</p>
    </section></div>
  </main><Footer /></div>;
}
