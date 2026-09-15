import type { ReactNode } from "react";
import type { BlogArticle } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import ArticleCTA from "@/components/ArticleCTA";
import styles from "./ReviewedGuideArticle.module.css";

// Only explicitly reviewed guides use this renderer; it never executes raw HTML.
const sourceHosts = new Set([
  "x.ai",
  "help.openai.com", "openai.com", "support.anthropic.com", "support.claude.com",
  "www.perplexity.ai", "support.google.com", "one.google.com", "help.x.com",
  "api-docs.deepseek.com", "deepseek.com", "www.deepseek.com",
  "www.nist.gov",
  "docs.qwencloud.com", "platform.kimi.ai", "docs.devin.ai", "code.claude.com", "manus.im", "docs.crewai.com",
  "devin.ai", "cursor.com", "github.com", "github.blog", "learn.chatgpt.com",
  "www.heygen.com", "www.synthesia.io", "help.runwayml.com", "docs.dev.runwayml.com",
  "pika.art", "docs.midjourney.com", "www.adobe.com",
]);

function inline(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^\s)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/);
    if (!match) return part;
    try {
      const url = new URL(match[2]);
      if (!sourceHosts.has(url.hostname) || url.username || url.password || url.port) return part;
      return <a key={i} href={url.href} rel="noopener noreferrer">{match[1]}</a>;
    } catch { return part; }
  });
}

function Content({ text, heading }: { text: string; heading: string }) {
  return <>{text.split(/\n\n/).map((block, index) => {
    const lines = block.split("\n");
    if (lines[0].startsWith("|") && /^\|[\s:|-]+\|$/.test(lines[1] || "")) {
      const cells = (line: string) => line.slice(1, -1).split("|").map(cell => cell.trim());
      const headers = cells(lines[0]);
      return <div key={index} className={styles.tableWrap} tabIndex={0} role="region" aria-label={`${heading}（横スクロール可能）`}>
        <table><caption>{heading}<span className={styles.tableHint}>表は横にスクロールして読めます</span></caption><thead><tr>{headers.map((cell, i) => <th scope="col" key={i}>{cell}</th>)}</tr></thead>
          <tbody>{lines.slice(2).map((line, i) => <tr key={i}>{cells(line).map((cell, j) => j === 0
            ? <th scope="row" key={j}>{inline(cell)}</th> : <td key={j}>{inline(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>;
    }
    if (lines.every(line => /^- /.test(line))) return <ul key={index}>{lines.map((line, i) => <li key={i}>{inline(line.slice(2))}</li>)}</ul>;
    if (lines.every(line => /^\d+\. /.test(line))) return <ol key={index}>{lines.map((line, i) => <li key={i}>{inline(line.replace(/^\d+\. /, ""))}</li>)}</ol>;
    return <p key={index}>{inline(block)}</p>;
  })}</>;
}

export default function ReviewedGuideArticle({ article, attribution }: {
  article: BlogArticle;
  attribution: { postId?: string; campaignId?: string };
}) {
  const safety = article.slug === "ai-safety-ranking-2026";
  const search = article.slug === "ai-search-engines-comparison-2026";
  const agents = article.slug === "ai-agents-comparison-2026";
  const coding = article.slug === "ai-coding-tools-2026";
  const grok = article.slug === "grok-review-2026";
  const news = article.category === "news";
  const chatgpt = article.slug === "chatgpt-models-comparison-2026";
  const freeGuide = article.slug === "ai-free-tier-comparison-2026";
  const comparison = article.category === "comparison";
  const takeaway = grok ? "Grokは、X内と単体版で利用条件の確認先が異なります。使いたい作業を決め、プラン・出典・入力データの扱いを確認してください。旧スコアから現在の性能は判断できません。" : safety
    ? "AIの安全性は、回答の正確さ・入力データの扱い・成果物の権利を分けて確認します。保存スコアだけでは、現在の業務への適合は判断できません。"
    : search ? "AI検索は、答えだけでなく出典まで確認して選びます。同じ質問で、原文との一致・情報の日付・確認にかかる手間を比較してください。"
    : agents ? "AIエージェントは、任せる作業・操作の権限・成果物の確認方法で選びます。完成した製品を使う場合と、自分で仕組みを組む場合は分けて比較します。"
    : coding ? "開発支援AIは、コード補完・修正・別環境での作業のどれが必要かを先に決めます。対応環境だけでなく、差分とテストを確認できるかも選定条件です。"
    : comparison ? article.description
    : "モデルの更新は、公式発表の内容と自分の作業への影響を分けて確認します。APIと個人向けアプリの提供条件、メーカーの説明と独自の実測評価を混同しないことが大切です。";
  const sourceIndex = article.sections.findLastIndex(section => /公式情報|出典/.test(section.heading));
  const label = freeGuide ? "無料AIの選び方" : chatgpt ? "ChatGPTのモデル・プラン" : grok ? "Grokの利用ガイド" : safety ? "AI安全性の確認ガイド" : search ? "AI検索の比較ガイド" : agents ? "AIエージェントの選び方" : coding ? "開発支援の選び方" : comparison ? "AIツール比較" : "AIモデルの更新を読む";
  const choices = safety ? [
    { label: "回答の誤りが心配", name: "原文で確かめる", text: "出典の有無だけでなく、主張と原文が一致しているか。同じ質問で比較する手順を整理します。" },
    { label: "社内資料を扱いたい", name: "入力先を確かめる", text: "モデル名ではなく、プラン・保存・学習利用・共有範囲を確認します。" },
    { label: "文章や画像を公開したい", name: "権利を確かめる", text: "生成できることと、公開できることは別。出典や利用条件の確認を残します。" },
  ] : [
    { label: "出典をたどって調べたい", name: "Perplexity", text: "検索回答から原文を確認する使い方を比較。引用の数より、主張と原文の一致を見る。" },
    { label: "調べた内容を文章にしたい", name: "ChatGPT / Claude / Gemini", text: "普段使う対話AIを候補に。検索から要約・文章化までの手間を確認する。" },
    { label: "X上の話題を確認したい", name: "Grok", text: "公開投稿を調べる入口に。投稿の拡散と、事実の裏付けは分けて確認する。" },
  ];
  return <div className={styles.page}>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article", headline: article.title,
        description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt,
        mainEntityOfPage: `https://www.aierabi.jp/blog/${article.slug}`,
        "@id": `https://www.aierabi.jp/blog/${article.slug}#article`, inLanguage: "ja",
        author: { "@type": "Organization", name: "AI選び", url: "https://www.aierabi.jp/about" },
      }).replace(/</g, "\\u003c") }} />
      <header className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="パンくず"><a href="/blog">コラム</a><span> / {label}</span></nav>
          <p className={styles.eyebrow}>{safety ? "安全性を判断するための根拠" : search ? "調査・検索AIを選ぶための比較" : comparison ? "用途と契約条件から選ぶ比較" : "AIの変化を、実際の使い方につなぐ"}</p>
          <h1>{article.title}</h1>
          <p className={styles.lead}>{freeGuide ? <>まずは、ひとつの作業が終わるか。<br />無料枠と期間限定体験を分け、足りない条件を確かめます。</> : chatgpt ? <>モデル名と、契約プランは別のもの。<br />使う画面と任せたい作業から、確認する順番を整理します。</> : safety ? <>「何位か」の前に、<strong>何を守りたいか。</strong><br />回答の正確さ、入力データ、公開時の権利を分けて考えます。</> : search ? <>答えのうまさより、<strong>根拠まで戻れるか。</strong><br />調べる・確かめる・まとめる。あなたの作業に合う入口を選びます。</> : (agents || coding) ? <>どこまで任せて、どこで確かめるか。<br />作業環境と権限から、使うツールを選びます。</> : comparison ? article.description : <>新しい名前を追うだけで終わらせない。<br />公式の更新内容と、自分の作業への影響を分けて読みます。</>}</p>
          <div className={styles.meta}><span>公開 <time dateTime={article.publishedAt}>{article.publishedAt}</time></span><span>内容確認 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span><span>読了目安 {article.readingTime}</span></div>
          <div className={styles.scope}>{safety ? "掲載スコアは2026年3月の保存値で、再現未確認です。現在の安全性順位や企業利用の適合を保証するものではありません。" : "公式情報に基づく機能比較です。実測ランキングではありません。料金・利用上限は契約前に公式ページで確認してください。"}</div>
          <section className={styles.summary} aria-labelledby="article-summary">
            <h2 id="article-summary">この記事の要点</h2>
            <p>{news || chatgpt || freeGuide || comparison ? article.description : takeaway}</p>
            <div className={styles.summaryLinks}>
              <a href="#section-0">本文を読む ↓</a>
              <a href="#section-1">{news ? "変更点と影響を見る ↓" : "比較表を見る ↓"}</a>
              {sourceIndex >= 0 && <a href={`#section-${sourceIndex}`}>公式情報を確認 ↓</a>}
            </div>
          </section>
        </div>
      </header>
      <div className={styles.container}>
        {(safety || search) && <section className={styles.choices} aria-labelledby="quick-choice">
          <p className={styles.eyebrow}>{safety ? "まず、どこが心配？" : "まず、何を調べたい？"}</p>
          <h2 id="quick-choice">{safety ? "不安を分けると、確認先が見えてくる" : "用途から、比較の入口を絞る"}</h2>
          <p>{safety ? "以下は確認手順の整理です。個別サービスの安全認定や順位ではありません。" : "以下は機能に基づく編集上の選び方です。性能順位や、特定サービスの優位性を示すものではありません。"}</p>
          <div className={styles.cards}>{choices.map(choice => <div className={styles.card} key={choice.name}>
            <p className={styles.label}>{choice.label}</p><h3>{choice.name}</h3><p>{choice.text}</p>
          </div>)}</div>
        </section>}
        <div className={styles.layout}>
          <aside className={styles.contents}><nav aria-label="この記事の目次"><details open><summary>この記事でわかること</summary><ol>{article.sections.map((section, i) => <li key={section.heading}><a href={`#section-${i}`}>{section.heading}</a></li>)}</ol></details></nav></aside>
          <article id="article" className={styles.article} aria-label={article.title}>
            <p className={styles.byline}>編集：<a href="/about">AI選び</a> · 事実の確認時点・対象範囲は本文の記載を参照してください。</p>
            {article.sections.map((section, i) => <section id={`section-${i}`} key={section.heading}>
              <span className={styles.number} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h2>{section.heading}<a className={styles.sectionLink} href={`#section-${i}`} aria-label={`「${section.heading}」へのリンク`}>#</a></h2><Content text={section.content} heading={section.heading} />
            </section>)}
            <div className={styles.next}><p className={styles.eyebrow}>次は、選び方を整理する</p>
              <ArticleCTA cta={article.cta} contentId={`/blog/${article.slug}`} attribution={attribution} />
            </div>
            <a className={styles.back} href="/blog">← コラム一覧へ</a>
          </article>
        </div>
      </div>
    </main><Footer />
  </div>;
}
