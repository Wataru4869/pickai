import { Header, Footer } from "@/components/ui";
import { getAllArticles } from "@/lib/blog";
import BlogList from "./BlogList";
import styles from "@/components/Discovery.module.css";

export const metadata = {
  title: "AI比較・活用コラム｜用途から選ぶガイド | AI選び",
  description: "AI検索、画像・動画生成、エージェント、安全性。更新日を確認しながら、用途に合う比較記事を探せます。",
  alternates: { canonical: "/blog" },
  openGraph: { title: "AI比較・活用コラム | AI選び", url: "/blog" },
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <Header />
      <main>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>AIを、仕事と暮らしの言葉で。</p>
          <h1>選び方から、<em>使いどころまで。</em></h1>
          <p className={styles.lead}>機能の違いも、使う前の注意点も。<br />自分の用途に引き寄せて読めるAIコラム。</p>
          <p className={styles.note}>内容更新日が新しい順に掲載。日付は記事の編集日で、性能評価の実行日ではありません。過去の記録を含む記事は本文の対象時点も確認してください。</p>
        </div>
      </header>
      <BlogList articles={[...articles].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt))} />
      </main>
      <Footer />
    </div>
  );
}
