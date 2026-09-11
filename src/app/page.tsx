import type { Metadata } from "next";
import CurrentComparison from "@/components/CurrentComparison";
import { currentProducts } from "@/lib/current-comparison";
import { getAllArticles } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import styles from "@/components/Discovery.module.css";

export const metadata: Metadata = {
  title: "AI選び｜AIツール・モデルを機能と公式情報で比較",
  description: "ChatGPT・Claude・Gemini・DeepSeek・Qwen・Kimiなど9候補を、用途・機能・料金の公式情報で比較。出典と確認日を明示し、過去の独自スコアとは分けて掲載します。",
  alternates: { canonical: "/" },
  openGraph: { title: "AI選び｜いまのAIを、自分の選択肢に", description: "9候補を用途・機能・提供条件と公式根拠で比較。", url: "/" },
  twitter: { title: "AI選び｜いまのAIを、自分の選択肢に", description: "9候補を用途・機能・提供条件と公式根拠で比較。" },
};
const purposes = [
  { mark: "01", name: "画像をつくる", detail: "作風・編集・利用条件から", slug: "ai-image-generation-2026" },
  { mark: "02", name: "動画をつくる", detail: "素材・尺・制作の目的から", slug: "ai-video-generation-2026" },
  { mark: "03", name: "調べて、確かめる", detail: "出典・検索・文章化から", slug: "ai-search-engines-comparison-2026" },
  { mark: "04", name: "開発を手伝ってもらう", detail: "作業環境・レビュー方法から", slug: "ai-coding-tools-2026" },
  { mark: "05", name: "作業を任せる", detail: "エージェントの役割と権限から", slug: "ai-agents-comparison-2026" },
  { mark: "06", name: "安全に使う", detail: "入力データ・根拠・公開条件から", slug: "ai-safety-ranking-2026" },
];
export default function HomePage() {
  const articles = getAllArticles();
  const featured = ["ai-tools-2026-trends", "ai-search-engines-comparison-2026", "ai-safety-ranking-2026", "ai-agents-comparison-2026"]
    .flatMap(slug => articles.filter(article => article.slug === slug));
  return <div className={styles.page}>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "AI選び", url: "https://www.aierabi.jp",
        description: "公式情報と過去の保存評価を分けて確認するAIツール比較ガイド。",
      }) }} />
      <header className={styles.explorerHero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.edition}>AI選び / TOOL & MODEL GUIDE</p>
              <h1>いまのAIを、<br /><em>自分の選択肢に。</em></h1>
              <p className={styles.explorerLead}>モデルの名前は変わる。選ぶ理由は、自分の仕事から。<br />9つの候補を、機能・利用条件・公式根拠で比較できます。</p>
              <div className={styles.heroActions}><a href="#current-comparison">ツール・モデルを比較する ↓</a><a href="#purposes">用途から選び方を読む ↗</a></div>
              <div className={styles.heroMeta}><span>公式情報を項目別に確認</span><span>独自採点と分離</span><span>最終確認 2026.09.11</span></div>
            </div>
            <aside className={styles.modelBrief} aria-label="確認したモデル更新">
              <p className={styles.briefLabel}>MODEL WATCH <span>2026 / 09</span></p>
              <h2>比較候補は、<br />定番だけではありません。</h2>
              <a href="#current-comparison"><span>DeepSeek</span><strong>V4.1-Flash</strong><small>9月10日 API提供の発表</small></a>
              <a href="#current-comparison"><span>Qwen</span><strong>3.8-Max-0902</strong><small>9月2日 APIスナップショット</small></a>
              <a href="#current-comparison"><span>Kimi</span><strong>K3</strong><small>公式APIの提供案内を確認</small></a>
              <p>性能順位ではなく、公式発表の確認記録です。</p>
              <a className={styles.briefRead} href="/blog/ai-tools-2026-trends">更新の意味と確認ポイントを読む →</a>
            </aside>
          </div>
        </div>
      </header>
      <nav className={styles.localNav} aria-label="トップページ内の案内"><div className={styles.container}><a href="#current-comparison">ツール比較</a><a href="#purposes">用途別ガイド</a><a href="#guides-title">コラム</a><a href="/evaluations/2026-03">過去の評価</a></div></nav>
      <div className={styles.container}>
        <CurrentComparison products={currentProducts} />
        <section id="purposes" className={styles.section} aria-labelledby="purpose-title">
          <p className={styles.eyebrow}>START WITH YOUR TASK</p><h2 id="purpose-title">今日は、何を進めたい？</h2>
          <div className={styles.purposeGrid}>{purposes.map(p => <a key={p.slug} href={`/blog/${p.slug}`} className={styles.purpose}>
            <span className={styles.number}>{p.mark}</span><div><h3>{p.name}</h3><p>{p.detail}</p></div><span aria-hidden="true">↗</span>
          </a>)}</div>
        </section>
        <section className={styles.section} aria-labelledby="guides-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>READ & DECIDE</p><h2 id="guides-title">選ぶ前に、読んでおきたい</h2></div><a href="/blog">コラム一覧 →</a></div>
          <div className={styles.articleGrid}>{featured.map(article => <a className={styles.articleCard} key={article.slug} href={`/blog/${article.slug}`}>
            <div className={styles.cardMeta}><span>内容更新 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span><span>{article.readingTime}</span></div>
            <h3>{article.title}</h3><p>{article.description}</p><span className={styles.read}>ガイドを読む →</span>
          </a>)}</div>
        </section>
        <section className={styles.section} aria-labelledby="before-title">
          <div className={styles.helpPanel}><div><p className={styles.eyebrow}>BEFORE YOU CHOOSE</p><h2 id="before-title">「使えそう」を、<br />「自分に合う」に近づける。</h2></div>
            <div className={styles.helpLinks}>
              <a href="/cost"><h3>契約する前に</h3><p>料金・無料条件・追加課金の確認ポイント →</p></a>
              <a href="/methodology"><h3>点数を見る前に</h3><p>保存評価の根拠と、未検証の範囲 →</p></a>
              <a href="/categories"><h3>比較対象を広げたいときに</h3><p>5カテゴリのガイドと保存済み比較 →</p></a>
            </div>
          </div>
        </section>

      </div>
    </main><Footer />
  </div>;
}
