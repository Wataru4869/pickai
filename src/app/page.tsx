import type { Metadata } from "next";
import CurrentComparison from "@/components/CurrentComparison";
import { currentProducts } from "@/lib/current-comparison";
import { catalogProduct, editorialProfiles } from "@/lib/public-catalog";
import { getAllArticles } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import styles from "@/components/Discovery.module.css";

const SITE_NAME = "AIえらびマップ";
const SITE_WORDMARK = "AI erabi map";
const SITE_URL = "https://www.aierabi.jp";

export const metadata: Metadata = {
  title: `${SITE_NAME}｜用途から探して、料金・機能を比較できるAI選択サービス`,
  description: "文章、調査、画像、動画、開発など、やりたいことからAI候補を探せます。ChatGPT・Claude・Gemini等の機能・料金・無料条件を公式情報と確認日付きで比較。",
  alternates: { canonical: "/" },
  openGraph: { title: `${SITE_NAME}｜用途から自分に合うAIを探す`, description: "目的から候補を知り、違いと料金を確認できる日本語AI選択サービス。", url: "/" },
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
      "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, alternateName: SITE_WORDMARK, url: SITE_URL,
      description: "AIツールを用途から探し、機能・料金・提供条件を公式情報と確認日付きで比較できるサービス。",
    }) }} />
    <header className={styles.choiceHero}><div className={styles.container}><div className={styles.choiceHeroGrid}><div>
      <p className={styles.japaneseEyebrow}><span>{SITE_NAME}</span> AIに詳しくなくても、用途から選べます</p>
      <h1>やりたいことから、<br /><em>使うAIが見えてくる。</em></h1>
      <p className={styles.choiceLead}>仕事、文章、調査、画像、動画、開発。名前や話題性ではなく、<strong>あなたの目的に合う候補</strong>を見つけ、料金と注意点まで確認できます。</p>
      <div className={styles.heroActions}><a className={styles.heroPrimary} href="#purpose-choice" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="purpose" data-cta-position="hero_primary" data-destination-id="purpose_choice">用途からAIを選ぶ</a><a className={styles.heroSecondary} href="/recommend" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="diagnosis" data-cta-position="hero_secondary" data-destination-id="/recommend">3つの質問で候補を確認</a></div>
      <div className={styles.heroTrust}><span>公式情報に出典</span><span>確認日を表示</span><span>確認できた項目だけ掲載</span></div>
      <p className={styles.heroFootnote}>順位だけで決めず、現在の公式情報と過去の検証結果を分けて掲載しています。</p>
    </div><aside className={styles.choiceBoard} aria-label={`${SITE_NAME}の利用イメージ`}><div className={styles.boardHead}><span>選び方の例</span><small>文章・資料を作りたい</small></div><div className={styles.boardQuestion}><span aria-hidden="true">01</span><div><small>やりたいこと</small><strong>長い資料を読み、要点を整える</strong></div></div><div className={styles.boardCandidates}><p>比較候補</p><div><span>ChatGPT</span><span>Claude</span></div></div><div className={styles.boardChecks}><span>機能</span><span>料金</span><span>入力データ</span></div><a href="/compare/claude-vs-chatgpt">この2つの違いを見る <b aria-hidden="true">→</b></a></aside></div></div></header>
    <nav className={styles.journeyNav} aria-label="AIを選ぶ流れ"><div className={styles.container}><a href="#purpose-choice"><b>1</b><span><small>まずは</small>用途を選ぶ</span></a><a href="/recommend"><b>2</b><span><small>迷ったら</small>候補を絞る</span></a><a href="/compare"><b>3</b><span><small>2つに絞って</small>違いを比べる</span></a><a href="/cost"><b>4</b><span><small>最後に</small>料金を確認</span></a></div></nav>
    <div className={styles.container}>
      <section id="purpose-choice" className={styles.section} aria-labelledby="purpose-title"><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>最初の入口</p><h2 id="purpose-title">何に使いますか？</h2><p>サービス名を知らなくても大丈夫です。作りたいもの、進めたい仕事から選んでください。</p></div>
        <div className={styles.choiceGrid}>{purposeEntries.map((item,index) => <a key={item.href} href={item.href} className={styles.choiceCard} data-index={index + 1} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="purpose" data-cta-position={`home_purpose_${index + 1}`} data-destination-id={item.href}><span className={styles.choiceMark} aria-hidden="true">{item.mark}</span><div><small>目的 {String(index + 1).padStart(2,"0")}</small><h3>{item.name}</h3><p>{item.detail}</p></div><span aria-hidden="true">→</span></a>)}</div>
      </section>
      <section className={styles.section} aria-labelledby="tools-title"><div className={styles.sectionHeading}><div><p className={styles.japaneseEyebrow}>主要な候補</p><h2 id="tools-title">よく名前を聞くAIから確認する</h2><p>掲載順は性能順位ではありません。用途と、確認済みの公式情報から候補を見てください。</p></div><a href="/models">AIツール一覧を見る</a></div>
        <div className={styles.toolGrid}>{toolIds.map((id,index) => { const product = catalogProduct(id); const profile = editorialProfiles[id]; const free = product.facts.free_plan; const compare = comparisonTarget[id]; const latest = Object.values(product.facts).map(fact=>fact.date).filter((date):date is string=>Boolean(date)).sort().at(-1); return <article className={styles.toolCard} data-tool={id} key={id}><span className={styles.toolNumber}>0{index + 1}</span><div className={styles.toolTop}><div><p>{profile.type}</p><h3>{product.name}</h3></div></div><p className={styles.toolSummary}>{profile.summary}</p><div className={styles.toolTags}>{profile.uses.slice(0,3).map(use => <span key={use}>{use}</span>)}</div><p className={styles.forWhom}><strong>向いている人</strong>{profile.suited}</p>{free.source && <p className={styles.confirmed}>{free.text}{latest && <small>公式情報確認 <time dateTime={latest}>{latest}</time></small>}</p>}<div className={styles.toolActions}><a href={`/model/${id}`} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="model_detail" data-cta-position={`home_tool_${id}`} data-destination-id={`/model/${id}`}>詳しく見る</a><a href={compare.href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="compare" data-cta-position={`home_tool_${id}`} data-destination-id={compare.href}>{compare.label}</a></div></article>; })}</div>
      </section>
      <section className={styles.section} aria-labelledby="pairs-title"><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>2つに絞って比較</p><h2 id="pairs-title">候補が決まったら、違いを見る</h2><p>勝敗ではなく、どの作業と条件に合うかを同じ項目で確かめます。</p></div><div className={styles.pairGrid}>{comparisonPairs.map((pair,index) => <a key={pair.href} href={pair.href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="compare" data-cta-position={`home_pair_${index + 1}`} data-destination-id={pair.href}><strong>{pair.left}</strong><span>と</span><strong>{pair.right}</strong><small>機能・料金・無料条件を比較</small></a>)}</div></section>
      <section className={styles.decisionBand} aria-label="料金と診断への案内"><div><p className={styles.japaneseEyebrow}>契約する前に</p><h2>料金と無料条件を、同じ見方で確認</h2><p>税、地域、契約周期、利用上限が違うため、表示額だけで比べません。</p></div><div><a href="/cost" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="cost" data-cta-position="home_decision_band" data-destination-id="/cost">料金・無料条件を見る</a><a href="/recommend" data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="diagnosis" data-cta-position="home_decision_band" data-destination-id="/recommend">候補を確認する</a></div></section>
      <section className={styles.section} aria-labelledby="guides-title"><div className={styles.sectionHeading}><div><p className={styles.japaneseEyebrow}>選び方と実務ガイド</p><h2 id="guides-title">使う場面まで理解して選ぶ</h2><p>単なるニュースではなく、何が変わり、選び方にどう影響するかを整理します。</p></div><a href="/blog">ガイド一覧</a></div><div className={styles.articleGrid}>{featured.map((article,index) => { const href=`/blog/${article.slug}`; return <a className={styles.articleCard} key={article.slug} href={href} data-analytics-event="internal_cta_click" data-source-page="/" data-cta-type="guide" data-cta-position={`home_guide_${index + 1}`} data-destination-id={href}><div className={styles.cardMeta}><span>内容更新 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className={styles.read}>記事を読む →</span></a>; })}</div></section>
      <details className={styles.fullExplorer}><summary>掲載中のツール・モデルを詳しく絞り込む</summary><p>アプリ、API、開発ツールを分け、公式情報のある項目だけを表示します。</p><CurrentComparison products={currentProducts} /></details>
    </div>
  </main><Footer /></div>;
}
