import type { Metadata } from "next";
import CurrentComparison from "@/components/CurrentComparison";
import { currentProducts } from "@/lib/current-comparison";
import { catalogProduct, editorialProfiles } from "@/lib/public-catalog";
import { getAllArticles } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import styles from "@/components/Discovery.module.css";

export const metadata: Metadata = {
  title: "AI選び｜用途から探して、料金・機能を比較できるAI選択サービス",
  description: "文章、調査、画像、動画、開発など、やりたいことからAI候補を探せます。ChatGPT・Claude・Gemini等の機能・料金・無料条件を公式情報と確認日付きで比較。",
  alternates: { canonical: "/" },
  openGraph: { title: "AI選び｜用途から自分に合うAIを探す", description: "目的から候補を知り、違いと料金を確認できる日本語AI選択サービス。", url: "/" },
};

const purposeEntries = [
  { mark: "文", name: "文章・資料作成", detail: "要約、構成、書き直し", href: "/categories/writing" },
  { mark: "調", name: "調査・検索", detail: "出典を確認してまとめる", href: "/categories/ai-search" },
  { mark: "画", name: "画像生成", detail: "素材、編集、利用条件", href: "/categories/image-generation" },
  { mark: "動", name: "動画生成", detail: "素材、尺、人物表現", href: "/categories/video-generation" },
  { mark: "開", name: "コーディング", detail: "作成、修正、レビュー", href: "/categories/coding-tools" },
  { mark: "自", name: "自動化・AIエージェント", detail: "任せる範囲と承認条件", href: "/categories/ai-agents" },
];
const toolIds = ["chatgpt", "claude", "gemini", "perplexity", "grok"];
const comparisonTarget: Record<string, { href: string; label: string }> = {
  chatgpt: { href: "/compare/claude-vs-chatgpt", label: "Claudeと比較" },
  claude: { href: "/compare/claude-vs-chatgpt", label: "ChatGPTと比較" },
  gemini: { href: "/compare/chatgpt-vs-gemini", label: "ChatGPTと比較" },
  perplexity: { href: "/compare/chatgpt-vs-perplexity", label: "ChatGPTと比較" },
  grok: { href: "/compare/chatgpt-vs-grok", label: "ChatGPTと比較" },
};
const comparisonPairs = [
  { left: "ChatGPT", right: "Claude", href: "/compare/claude-vs-chatgpt" },
  { left: "ChatGPT", right: "Gemini", href: "/compare/chatgpt-vs-gemini" },
  { left: "ChatGPT", right: "Perplexity", href: "/compare/chatgpt-vs-perplexity" },
] as const;

export default function HomePage() {
  const articles = getAllArticles();
  const featured = ["ai-search-engines-comparison-2026", "ai-coding-tools-2026", "ai-image-generation-2026"]
    .flatMap(slug => articles.filter(article => article.slug === slug));
  return <div className={styles.page}><Header /><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebSite", name: "AI選び", url: "https://www.aierabi.jp",
      description: "AIツールを用途から探し、機能・料金・提供条件を公式情報と確認日付きで比較できるサービス。",
    }) }} />
    <header className={styles.choiceHero}><div className={styles.container}><div className={styles.choiceHeroGrid}><div>
      <p className={styles.japaneseEyebrow}>AIに詳しくなくても、用途から選べます</p>
      <h1>あなたに合うAIを、<br /><em>やりたいことから。</em></h1>
      <p className={styles.choiceLead}>仕事、文章、調査、画像、動画、開発。目的から候補を知り、違い・料金・注意点まで順番に確認できます。</p>
      <div className={styles.heroActions}><a className={styles.heroPrimary} href="#purpose-choice" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="purpose" data-cta-position="hero_primary" data-destination-id="purpose_choice">用途からAIを選ぶ</a><a className={styles.heroSecondary} href="/recommend" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="diagnosis" data-cta-position="hero_secondary" data-destination-id="/recommend">3つの質問で候補を確認</a></div>
      <p className={styles.heroFootnote}>順位だけで決めず、公式情報と過去の検証結果を分けて掲載しています。</p>
    </div><aside className={styles.howToChoose} aria-label="AI選びの使い方"><h2>AI選びでできること</h2><ol><li><span>1</span><div><strong>目的を選ぶ</strong><small>まず、やりたい作業を1つ決める</small></div></li><li><span>2</span><div><strong>候補を知る</strong><small>特徴と利用条件から2つに絞る</small></div></li><li><span>3</span><div><strong>違いを比べる</strong><small>料金・機能・注意点を同じ順で見る</small></div></li><li><span>4</span><div><strong>自分で確かめる</strong><small>同じ小さな作業で試して判断する</small></div></li></ol></aside></div></div></header>
    <div className={styles.container}>
      <section id="purpose-choice" className={styles.section} aria-labelledby="purpose-title"><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>最初の入口</p><h2 id="purpose-title">何に使いますか？</h2><p>サービス名を知らなくても大丈夫です。作りたいもの、進めたい仕事から選んでください。</p></div>
        <div className={styles.choiceGrid}>{purposeEntries.map((item,index) => <a key={item.href} href={item.href} className={styles.choiceCard} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="purpose" data-cta-position={`home_purpose_${index + 1}`} data-destination-id={item.href}><span className={styles.choiceMark} aria-hidden="true">{item.mark}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><span aria-hidden="true">›</span></a>)}</div>
      </section>
      <section className={styles.section} aria-labelledby="tools-title"><div className={styles.sectionHeading}><div><p className={styles.japaneseEyebrow}>主要な候補</p><h2 id="tools-title">よく名前を聞くAIから確認する</h2><p>掲載順は性能順位ではありません。用途と、確認済みの公式情報から候補を見てください。</p></div><a href="/compare">一覧で比較する</a></div>
        <div className={styles.toolGrid}>{toolIds.map(id => { const product = catalogProduct(id); const profile = editorialProfiles[id]; const free = product.facts.free_plan; const compare = comparisonTarget[id]; const latest = Object.values(product.facts).map(fact=>fact.date).filter((date):date is string=>Boolean(date)).sort().at(-1); return <article className={styles.toolCard} key={id}><div className={styles.toolTop}><span className={styles.toolMark} aria-hidden="true">{product.name.slice(0,2)}</span><div><p>{profile.type}</p><h3>{product.name}</h3></div></div><p className={styles.toolSummary}>{profile.summary}</p><div className={styles.toolTags}>{profile.uses.slice(0,3).map(use => <span key={use}>{use}</span>)}</div><p className={styles.forWhom}><strong>こんな人に：</strong>{profile.suited}</p><p className={free.source ? styles.confirmed : styles.unconfirmed}>{free.source ? free.text : "無料条件は未確認"}{latest && <small>公式情報確認 <time dateTime={latest}>{latest}</time></small>}</p><div className={styles.toolActions}><a href={`/model/${id}`} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="model_detail" data-cta-position={`home_tool_${id}`} data-destination-id={`/model/${id}`}>詳しく見る</a><a href={compare.href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="compare" data-cta-position={`home_tool_${id}`} data-destination-id={compare.href}>{compare.label}</a></div></article>; })}</div>
      </section>
      <section className={styles.section} aria-labelledby="pairs-title"><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>2つに絞って比較</p><h2 id="pairs-title">候補が決まったら、違いを見る</h2><p>勝敗ではなく、どの作業と条件に合うかを同じ項目で確かめます。</p></div><div className={styles.pairGrid}>{comparisonPairs.map((pair,index) => <a key={pair.href} href={pair.href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="compare" data-cta-position={`home_pair_${index + 1}`} data-destination-id={pair.href}><strong>{pair.left}</strong><span>と</span><strong>{pair.right}</strong><small>機能・料金・無料条件を比較</small></a>)}</div></section>
      <section className={styles.decisionBand} aria-label="料金と診断への案内"><div><p className={styles.japaneseEyebrow}>契約する前に</p><h2>料金と無料条件を、同じ見方で確認</h2><p>税、地域、契約周期、利用上限が違うため、表示額だけで比べません。</p></div><div><a href="/cost" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="cost" data-cta-position="home_decision_band" data-destination-id="/cost">料金・無料条件を見る</a><a href="/recommend" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="diagnosis" data-cta-position="home_decision_band" data-destination-id="/recommend">候補を確認する</a></div></section>
      <section className={styles.section} aria-labelledby="guides-title"><div className={styles.sectionHeading}><div><p className={styles.japaneseEyebrow}>選び方と実務ガイド</p><h2 id="guides-title">使う場面まで理解して選ぶ</h2><p>単なるニュースではなく、何が変わり、選び方にどう影響するかを整理します。</p></div><a href="/blog">ガイド一覧</a></div><div className={styles.articleGrid}>{featured.map((article,index) => { const href=`/blog/${article.slug}`; return <a className={styles.articleCard} key={article.slug} href={href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="guide" data-cta-position={`home_guide_${index + 1}`} data-destination-id={href}><div className={styles.cardMeta}><span>内容更新 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className={styles.read}>記事を読む →</span></a>; })}</div></section>
      <details className={styles.fullExplorer}><summary>掲載中のツール・モデルを詳しく絞り込む</summary><p>アプリ、API、開発ツールを分け、公式情報のある項目だけを表示します。</p><CurrentComparison products={currentProducts} /></details>
    </div>
  </main><Footer /></div>;
}
