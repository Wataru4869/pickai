import type { ReactNode } from "react";
import type { BlogArticle } from "@/lib/blog";
import { Header, Footer } from "@/components/ui";
import ArticleCTA from "@/components/ArticleCTA";
import styles from "./ReviewedGuideArticle.module.css";

// Only explicitly reviewed guides use this renderer; it never executes raw HTML.
const sourceHosts = new Set([
  "help.openai.com", "openai.com", "support.anthropic.com", "support.claude.com",
  "www.perplexity.ai", "support.google.com", "one.google.com", "help.x.com",
  "api-docs.deepseek.com", "deepseek.com", "www.deepseek.com",
  "www.nist.gov",
  "docs.qwencloud.com", "platform.kimi.ai", "docs.devin.ai", "code.claude.com", "manus.im", "docs.crewai.com",
  "devin.ai", "cursor.com", "github.com",
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
  const label = safety ? "AI安全性の確認ガイド" : search ? "AI検索の比較ガイド" : agents ? "AIエージェントの選び方" : coding ? "開発支援の選び方" : "AIモデルの更新を読む";
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
        author: { "@type": "Organization", name: "AI選び", url: "https://www.aierabi.jp/about" },
      }).replace(/</g, "\\u003c") }} />
      <header className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="パンくず"><a href="/blog">コラム</a><span> / {label}</span></nav>
          <p className={styles.eyebrow}>{safety ? "AI SAFETY · 判断の根拠を知る" : search ? "AI SEARCH · 選ぶための比較" : "AI GUIDE · 変化を、使い方につなぐ"}</p>
          <h1>{article.title}</h1>
          <p className={styles.lead}>{safety ? <>「何位か」の前に、<strong>何を守りたいか。</strong><br />回答の正確さ、入力データ、公開時の権利を分けて考えます。</> : search ? <>答えのうまさより、<strong>根拠まで戻れるか。</strong><br />調べる・確かめる・まとめる。あなたの作業に合う入口を選びます。</> : (agents || coding) ? <>どこまで任せて、どこで確かめるか。<br />作業環境と権限から、使うツールを選びます。</> : <>新しい名前を追うだけで終わらせない。<br />公式の更新内容と、自分の作業への影響を分けて読みます。</>}</p>
          <div className={styles.meta}><span>公開 <time dateTime={article.publishedAt}>{article.publishedAt}</time></span><span>内容確認 <time dateTime={article.updatedAt}>{article.updatedAt}</time></span><span>読了目安 {article.readingTime}</span></div>
          <div className={styles.scope}>{safety ? "掲載スコアは2026年3月の保存値で、再現未確認です。現在の安全性順位や企業利用の適合を保証するものではありません。" : "公式情報に基づく機能比較です。実測ランキングではありません。料金・利用上限は契約前に公式ページで確認してください。"}</div>
          <a className={styles.jump} href="#section-1">{safety ? "3つの確認軸へ" : search ? "5サービスの比較表へ" : "概要の比較表へ"} <span aria-hidden="true">↓</span></a>
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
          <aside className={styles.contents}><nav aria-label="この記事の目次"><p>この記事でわかること</p><ol>{article.sections.map((section, i) => <li key={section.heading}><a href={`#section-${i}`}>{section.heading}</a></li>)}</ol></nav></aside>
          <article className={styles.article} aria-label={article.title}>
            {article.sections.map((section, i) => <section id={`section-${i}`} key={section.heading}>
              <span className={styles.number} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2><Content text={section.content} heading={section.heading} />
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
