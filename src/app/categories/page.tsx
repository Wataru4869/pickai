import { Header, Footer } from "@/components/ui";
import styles from "@/components/Discovery.module.css";

export const metadata = {
  title: "用途からAIを探す｜文章・検索・画像・動画・開発 | AIえらびマップ",
  description: "文章、調査、画像、動画、コーディング、自動化。やりたいことからAI候補を探し、機能・料金・注意点を確認できます。",
  alternates: { canonical: "/categories" },
  openGraph: { title: "用途からAIを探す | AIえらびマップ", url: "/categories" },
};
const categories = [
  { mark:"文", id:"writing", name:"文章・資料作成", result:"要約、構成、書き直し、資料の下書き", check:"読み手・参照資料・手直し時間", candidates:"ChatGPT / Claude / Gemini" },
  { mark:"調", id:"ai-search", name:"調査・検索", result:"出典を確認しながら情報を集める", check:"原文との一致・情報の日付・引用", candidates:"ChatGPT / Claude / Gemini / Grok / Perplexity" },
  { mark:"画", id:"image-generation", name:"画像生成", result:"素材、図、イメージをつくる", check:"編集方法・生成枠・利用条件", candidates:"Adobe Firefly / Canva / Leonardo.Ai" },
  { mark:"動", id:"video-generation", name:"動画生成", result:"短い映像、人物動画、説明素材をつくる", check:"尺・人物の許諾・書き出し条件", candidates:"Runway / Pika / HeyGen / Synthesia" },
  { mark:"開", id:"coding-tools", name:"コーディング", result:"コードの作成、修正、レビューを進める", check:"対応環境・実行権限・差分確認", candidates:"Cursor / GitHub Copilot / Devin Desktop" },
  { mark:"自", id:"ai-agents", name:"自動化・AIエージェント", result:"複数手順の作業をAIに任せる", check:"操作範囲・承認・停止と復旧", candidates:"製品と開発用APIを分けて掲載" },
];
export default function CategoriesPage(){return <div className={styles.page}><Header/><main>
  <header className={styles.choiceHero}><div className={styles.container}><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>用途からAIを探す</p><h1>サービス名より先に、<br/><em>やりたいことを選ぶ。</em></h1><p className={styles.choiceLead}>目的を1つ選ぶと、候補、比較ポイント、料金・注意点を確認できます。掲載順は性能順位ではありません。</p></div></div></header>
  <div className={styles.container}><section className={styles.section} aria-labelledby="category-list"><div className={styles.sectionIntro}><p className={styles.japaneseEyebrow}>6つの入口</p><h2 id="category-list">何を作り、何を進めたいですか？</h2><p>今必要な成果物に最も近いものを選んでください。複数用途は、まず頻度が高い作業から比べます。</p></div>
    <div className={styles.categoryGrid}>{categories.map(cat=><article key={cat.id} className={styles.categoryCard}><div className={styles.categoryHead}><span aria-hidden="true">{cat.mark}</span><div><h2>{cat.name}</h2><p>{cat.result}</p></div></div><dl><div><dt>先に見ること</dt><dd>{cat.check}</dd></div><div><dt>掲載候補</dt><dd>{cat.candidates}</dd></div></dl><a href={`/categories/${cat.id}`}>この用途からAIを選ぶ</a></article>)}</div>
  </section><section className={styles.decisionBand}><div><p className={styles.japaneseEyebrow}>まだ用途が決まらないとき</p><h2>3つの質問から候補の入口を確認</h2><p>保存済みの選定ルールで候補を整理します。現在性能を保証するランキングではありません。</p></div><div><a href="/recommend">おすすめ候補を確認</a><a href="/compare">主要AIを比較する</a></div></section></div>
  </main><Footer/></div>}
