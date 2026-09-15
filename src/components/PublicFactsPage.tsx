import type { ReactNode } from "react";
import { Header, Footer } from "@/components/ui";
import { catalogProduct, categoryForService, editorialProfiles, experiencePreset, fields, modelNames, purposes, type ExperiencePreset, type Purpose } from "@/lib/public-catalog";
import styles from "./PublicFactsPage.module.css";

type BreadcrumbItem = { label: string; href?: string };

export function FactsLayout({ title, intro, children, eyebrow = "選ぶための確認ガイド", breadcrumbs }: { title: string; intro: string; children: ReactNode; eyebrow?: string; breadcrumbs?: BreadcrumbItem[] }) {
  const items = breadcrumbs ?? [{ label: "トップ", href: "/" }, { label: title }];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.aierabi.jp${item.href}` } : {}),
    })),
  };
  return <div className={styles.page}><Header /><div className={styles.main}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    <nav className={styles.breadcrumbs} aria-label="パンくず">{items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <b aria-hidden="true">›</b>}{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</span>)}</nav>
    <header className={styles.pageHeader}><p className={styles.label}>{eyebrow}</p><h1>{title}</h1><p>{intro}</p>
      <div className={styles.headerTrust}><span>公式情報は出典付き</span><span>未確認は未確認と表示</span><span>過去の採点と分離</span></div>
    </header>
    {children}
    <aside className={styles.history}><div><span className={styles.historyMark} aria-hidden="true">履歴</span></div><div><h2>過去の評価と、現在の公式情報は別です</h2><p>このページでは古い点数から順位や契約推奨を算出しません。未確認は低評価でも0でもありません。</p><div className={styles.inlineLinks}><a href="/evaluations/2026-03">2026年3月の検証結果</a><a href="/methodology">評価方法と限界</a></div></div></aside>
  </div><Footer /></div>;
}

export function ToolSummary({ id }: { id: string }) {
  const product = catalogProduct(id);
  const profile = editorialProfiles[id];
  if (!profile) return null;
  const comparisonTargets: Record<string, { href: string; label: string }> = {
    chatgpt: { href: "/compare/claude-vs-chatgpt", label: "Claudeと比較する" },
    claude: { href: "/compare/claude-vs-chatgpt", label: "ChatGPTと比較する" },
    gemini: { href: "/compare/chatgpt-vs-gemini", label: "ChatGPTと比較する" },
    grok: { href: "/compare/chatgpt-vs-grok", label: "ChatGPTと比較する" },
    perplexity: { href: "/compare/chatgpt-vs-perplexity", label: "ChatGPTと比較する" },
  };
  const comparisonTarget = comparisonTargets[id];
  const category = categoryForService[id];
  const confirmed = ["major_features", "current_price", "free_plan", "availability"].filter(key => product.facts[key as keyof typeof product.facts].source).length;
  return <section className={styles.toolSummary} aria-labelledby="tool-summary-title">
    <div className={styles.toolIdentity}><div><p>{profile.type}</p><h2 id="tool-summary-title">{profile.summary}</h2></div></div>
    <div className={styles.badges}>{profile.uses.map(use => <span key={use}>{use}</span>)}<span>{confirmed}/4項目に公式根拠</span></div>
    <div className={styles.fitGrid}><div><h3>候補にしやすい人</h3><p>{profile.suited}</p></div><div><h3>先に確認すること</h3><p>{profile.check}</p></div></div>
    <div className={styles.summaryActions}>
      <a className={styles.primaryAction} href="#current-facts" data-analytics-event="internal_cta_click" data-source-page={`/model/${id}`} data-cta-type="facts" data-cta-position="tool_summary" data-destination-id="current_facts">料金・条件を見る</a>
      {comparisonTarget && <a href={comparisonTarget.href} data-analytics-event="internal_cta_click" data-source-page={`/model/${id}`} data-cta-type="compare" data-cta-position="tool_summary" data-destination-id={comparisonTarget.href}>{comparisonTarget.label}</a>}
      <a href={comparisonTarget ? "/compare" : (category?.href ?? "/categories")} data-analytics-event="internal_cta_click" data-source-page={`/model/${id}`} data-cta-type={comparisonTarget ? "compare_picker" : "category"} data-cta-position="tool_summary" data-destination-id={comparisonTarget ? "/compare" : (category?.href ?? "/categories")}>{comparisonTarget ? "別のAIと比較する" : `${category?.label ?? "用途"}の候補を見る`}</a>
    </div>
  </section>;
}

type Example = { title: string; input: string; work: string; output: string; review: string };
const examples: Record<ExperiencePreset, Example> = {
  chat: { title: "資料から説明文を作る", input: "元資料、読み手、文字数", work: "要点を整理し、構成と下書きを作る", output: "要約、メール、説明文のたたき台", review: "固有名詞・数字・引用を原文と照合" },
  search: { title: "調査の入口を短時間で作る", input: "知りたいこと、対象期間、条件", work: "関連情報と参照先を整理する", output: "論点、候補、参照URLの一覧", review: "引用元を開き、日付と本文の一致を確認" },
  coding: { title: "小さな修正を実装して確認する", input: "対象コード、要件、完了条件", work: "関連箇所を探し、差分を作る", output: "コード変更、説明、テスト結果", review: "差分・権限・テストを人が確認してから反映" },
  image: { title: "用途に合う画像案を作る", input: "用途、比率、構図、避けたい表現", work: "複数案を生成し、構図や文字を調整", output: "候補画像と編集用素材", review: "人物・商標・著作権・公開条件を確認" },
  video: { title: "短い説明動画の試作を作る", input: "台本、尺、素材、掲載先", work: "映像・音声・字幕を生成または編集", output: "比較用の短い動画案", review: "人物の同意、素材の権利、書き出し条件を確認" },
  audio: { title: "ナレーションを試作する", input: "台本、読み方、声の利用許諾", work: "音声を生成し、速度や発音を調整", output: "ナレーションや吹き替え音声", review: "本人同意、声の権利、公開範囲を確認" },
  agent: { title: "複数工程の作業を小さく試す", input: "目的、使える資料、操作禁止事項", work: "計画を分解し、許可範囲で実行", output: "調査結果、ファイル、実行記録", review: "外部操作・費用・公開は実行前に人が承認" },
  presentation: { title: "資料のたたき台を作る", input: "目的、対象者、元資料、枚数", work: "構成を組み、スライド案を編集", output: "見出しと内容を含む資料案", review: "数字、出典、ブランド表現を確認" },
  visibility: { title: "AI検索での見え方を確認する", input: "ブランド名、テーマ、確認対象", work: "回答内の言及と参照を整理", output: "可視性の観測結果と改善候補", review: "取得範囲と指標定義を確認" },
  unknown: { title: "対象製品を特定してから試す", input: "正式な製品名と用途", work: "公式ページで対象範囲を確認", output: "比較可能な確認項目", review: "別製品の情報を混同していないか確認" },
};
const exampleById: Record<string, Example> = {
  chatgpt: { title: "資料と画像を見ながら説明文を作る", input: "元資料、参考画像、読み手、文字数", work: "Web検索やファイルを使い、要点と構成を会話で整える", output: "要約、説明文、追加確認事項", review: "検索結果・数字・画像の読み取りを原文と照合" },
  claude: { title: "長い資料から判断メモを作る", input: "複数の資料、判断したい論点、出力形式", work: "文章を読み、論点を整理してArtifacts等で成果物を組む", output: "要約、比較軸、判断メモのたたき台", review: "重要な引用と結論が資料に沿っているか照合" },
  gemini: { title: "画像とGoogle上の情報から下書きを作る", input: "画像、調査テーマ、作りたいメッセージ", work: "複数形式の情報を確認し、草案と調査結果を整理する", output: "メッセージ案、画像案、調査メモ", review: "Google連携範囲、共有先、引用元を確認" },
};
const axes: Record<ExperiencePreset, { title: string; detail: string }[]> = {
  chat: [{title:"扱う情報",detail:"文章・画像・ファイルの対応範囲"},{title:"成果物",detail:"要約、構成、画像、コードなど必要な出力"},{title:"確認のしやすさ",detail:"出典や元資料へ戻れるか"},{title:"利用条件",detail:"モデル、回数、保存、学習設定の違い"}],
  search: [{title:"出典",detail:"引用先を開いて原文を確認できるか"},{title:"鮮度",detail:"対象期間と情報の日付が分かるか"},{title:"深さ",detail:"追加質問や資料読解を続けられるか"},{title:"手直し",detail:"誤りを見つけるまでの時間"}],
  coding: [{title:"作業範囲",detail:"補完、チャット、編集、実行のどこまでか"},{title:"文脈",detail:"複数ファイルやリポジトリをどう読むか"},{title:"安全",detail:"コマンド・外部操作の承認方法"},{title:"費用",detail:"モデルと利用量の数え方"}],
  image: [{title:"入力方法",detail:"文章、参照画像、編集領域の指定"},{title:"修正力",detail:"文字・構図・部分編集を直せるか"},{title:"利用条件",detail:"生成物、素材、人物、商用利用の扱い"},{title:"消費量",detail:"クレジットと生成回数の数え方"}],
  video: [{title:"動画の種類",detail:"生成映像、アバター、翻訳のどれか"},{title:"編集工程",detail:"素材、字幕、音声、尺を直せるか"},{title:"権利",detail:"人物・音声・アップロード素材の許諾"},{title:"書き出し",detail:"解像度、透かし、クレジット消費"}],
  audio: [{title:"音声の種類",detail:"読み上げ、吹き替え、文字起こし、効果音"},{title:"調整",detail:"発音、速度、感情を修正できるか"},{title:"権利",detail:"声の同意と公開・商用利用条件"},{title:"費用",detail:"文字数・時間・クレジットの数え方"}],
  agent: [{title:"製品形態",detail:"完成品、開発用API、実行環境を分ける"},{title:"操作権限",detail:"外部サービスやファイルへ何ができるか"},{title:"承認",detail:"実行前確認と停止方法があるか"},{title:"費用",detail:"モデル・ツール・実行環境を分けて見る"}],
  presentation: [{title:"構成",detail:"元資料から章立てを作れるか"},{title:"編集",detail:"生成後に文字と配置を直せるか"},{title:"出典",detail:"数字と引用を追跡できるか"},{title:"共有",detail:"書き出しと共同編集の条件"}],
  visibility: [{title:"対象",detail:"どのAI検索・地域・質問を測るか"},{title:"定義",detail:"言及、引用、順位を区別する"},{title:"再現性",detail:"同じ条件で継続観測できるか"},{title:"改善接続",detail:"観測から修正対象を特定できるか"}],
  unknown: [{title:"正式名称",detail:"どの製品を指すか"},{title:"用途",detail:"何を完成させるために使うか"},{title:"条件",detail:"プランと地域の提供範囲"},{title:"根拠",detail:"公式情報へ戻れるか"}],
};

export function ServiceExperience({ id }: { id: string }) {
  const product = catalogProduct(id);
  const profile = editorialProfiles[id];
  if (!profile) return null;
  const preset = experiencePreset(id);
  const example = exampleById[id] ?? examples[preset];
  const category = categoryForService[id];
  const featureFact = product.facts.major_features;
  const features = featureFact.source ? featureFact.text.split(" / ").filter(Boolean) : [];
  const faq = [
    { q: `${product.name}は何に使う候補ですか？`, a: `${profile.summary}です。実際に使える機能はプラン・地域・アカウントで異なるため、公式情報も確認してください。` },
    { q: `${product.name}は無料で使えますか？`, a: product.facts.free_plan.source ? product.facts.free_plan.text : "現在の公式根拠を確認できていません。無料プランと無料体験は別の条件として確認してください。" },
    { q: `${product.name}を他のAIと比べるポイントは？`, a: `${profile.check}を最初に確認し、同じ小さな作業で出力と手直し時間を比べてください。` },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  return <>
    <nav className={styles.pageGuide} aria-label="このページの内容"><strong>このページで分かること</strong><a href="#what-it-can-do">できること</a><a href="#usage-example">使い方の例</a><a href="#comparison-points">比較ポイント</a><a href="#current-facts">料金・条件</a></nav>
    <section id="what-it-can-do" className={styles.experienceSection} aria-labelledby="capability-title">
      <div className={styles.sectionHeading}><p className={styles.label}>できること</p><h2 id="capability-title">{product.name}で検討できる作業</h2><p>ここは公式の機能説明を、選ぶ人が理解しやすい単位に分けたものです。性能順位や利用保証ではありません。</p></div>
      {features.length ? <div className={styles.capabilityGrid}>{features.map((feature, index) => <article key={feature}><span aria-hidden="true">{String(index + 1).padStart(2,"0")}</span><h3>{feature}</h3><p>この機能が自分のプラン・地域・利用画面で使えるか、契約前に公式ページで確認してください。</p></article>)}</div> : <div className={styles.unverifiedPanel}><strong>機能の公式根拠を確認中です</strong><p>別製品の説明や過去情報で補完せず、確認できるまで未確認として扱います。</p></div>}
      {featureFact.source && <p className={styles.sourceLine}>機能の出典：<a href={featureFact.source} target="_blank" rel="noopener noreferrer">公式情報を確認</a> <time dateTime={featureFact.date!}>（{featureFact.date}確認）</time></p>}
    </section>
    <section id="usage-example" className={styles.exampleSection} aria-labelledby="example-title">
      <div className={styles.sectionHeading}><p className={styles.label}>使い方の例</p><h2 id="example-title">{example.title}</h2><p>下記は機能の優劣を示す実測ではなく、無料枠などで自分に合うかを確かめるための試し方です。</p></div>
      <div className={styles.workflow} aria-label="入力から確認までの流れ"><div><span>入力</span><strong>{example.input}</strong></div><b aria-hidden="true">→</b><div><span>AIで進める</span><strong>{example.work}</strong></div><b aria-hidden="true">→</b><div><span>得られるもの</span><strong>{example.output}</strong></div></div>
      <aside className={styles.humanCheck}><span aria-hidden="true">人</span><div><strong>最後は人が確認</strong><p>{example.review}</p></div></aside>
    </section>
    <section id="comparison-points" className={styles.experienceSection} aria-labelledby="axes-title">
      <div className={styles.sectionHeading}><p className={styles.label}>比較ポイント</p><h2 id="axes-title">名前や評判より、この4点をそろえる</h2><p>{product.name}だけを見て決めず、同じ入力・同じ完成条件で別候補と比べます。</p></div>
      <div className={styles.axisGrid}>{axes[preset].map((axis, index) => <article key={axis.title}><span>{index + 1}</span><div><h3>{axis.title}</h3><p>{axis.detail}</p></div></article>)}</div>
      <div className={styles.trySteps}><h3>10〜15分で確かめる手順</h3><ol><li>実際に使う小さな作業を1つ選ぶ</li><li>候補2つへ同じ入力と完成条件を渡す</li><li>出力だけでなく、確認・修正時間も記録する</li></ol>{category && <a href={category.href}>{category.label}の候補を見る →</a>}</div>
    </section>
    <section className={styles.faq} aria-labelledby="faq-title"><div className={styles.sectionHeading}><p className={styles.label}>よくある確認</p><h2 id="faq-title">{product.name}を選ぶ前の質問</h2></div>{faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
  </>;
}

export function ComparisonSummary({ ids }: { ids: string[] }) {
  const profiles = ids.map(id => ({ id, name: modelNames[id], profile: editorialProfiles[id] }));
  return <section className={styles.decisionSummary} aria-labelledby="comparison-conclusion">
    <p className={styles.label}>まず結論</p><h2 id="comparison-conclusion">使いたい作業から候補を分ける</h2>
    <div className={styles.choiceGrid}>{profiles.map(({id,name,profile}) => <div key={id}><h3>{name}を確認するなら</h3><p>{profile?.suited ?? "公式情報と自分の作業条件を確認したい場合"}</p><span>確認点：{profile?.check ?? "提供条件"}</span></div>)}</div>
    <div className={styles.threeChecks}><strong>迷ったら、この3項目だけ先に比較</strong><ol><li>実際に使いたい作業</li><li>無料条件と必要な機能</li><li>出典確認と手直しの時間</li></ol></div>
  </section>;
}

export function FactCards({ ids, compact = false, showActions = true }: { ids: string[]; compact?: boolean; showActions?: boolean }) {
  return <section id="current-facts" aria-labelledby="facts-title"><div className={styles.sectionHeading}><p className={styles.label}>現在の公式情報</p><h2 id="facts-title">契約前に確認する項目</h2><p>項目ごとに出典と確認日を表示しています。公式根拠がない値は補完しません。</p></div>
    <div className={styles.grid}>{ids.map(id => {
      const product = catalogProduct(id);
      const profile = editorialProfiles[id];
      const visibleFields = fields.filter(([key]) => !compact || ["major_features", "free_plan", "current_price"].includes(key));
      const verified = visibleFields.filter(([key]) => Boolean(product.facts[key].source));
      const latestVerifiedAt = verified.map(([key]) => product.facts[key].date).filter(Boolean).sort().at(-1);
      return <article key={id} className={styles.card}>
        <div className={styles.cardHeader}><div><p>{profile?.type ?? "AIサービス"}</p><h3>{product.name}</h3></div></div>
        {profile && <p className={styles.cardSummary}>{profile.summary}</p>}
        <p className={styles.verification}>公式根拠 {verified.length}/{visibleFields.length}{latestVerifiedAt && <> · <time dateTime={latestVerifiedAt}>{latestVerifiedAt}</time>確認</>}</p>
        <dl>{visibleFields.map(([key, label]) => {
          const fact = product.facts[key];
          return <div key={key}><dt>{label}</dt><dd><p>{fact.text}</p>{fact.source ? <a href={fact.source} target="_blank" rel="noopener noreferrer">公式情報を確認 <time dateTime={fact.date!}>（{fact.date}確認）</time><span aria-hidden="true"> ↗</span></a> : <span className={styles.unknown}>公式根拠を未確認</span>}</dd></div>;
        })}</dl>
        {showActions && Object.hasOwn(modelNames, id) && id !== "copilot" && <div className={styles.cardActions}><a href={`/model/${id}`}>詳しい条件を見る</a><a href="/compare">比較候補にする</a></div>}
        {id === "copilot" && <p className={styles.note}>旧掲載名の対象製品を確定できていません。GitHub Copilotの情報を自動で当てはめていません。</p>}
      </article>;
    })}</div>
  </section>;
}

export function NextActions({ title, intro, links, sourcePage }: { title: string; intro: string; links: { href: string; label: string; detail: string }[]; sourcePage?: string }) {
  return <section className={styles.next} aria-labelledby="next-actions-title"><div><p className={styles.label}>次にすること</p><h2 id="next-actions-title">{title}</h2><p>{intro}</p></div><div className={styles.actionGrid}>{links.map((link, index) => <a key={link.href} href={link.href} data-analytics-event={sourcePage ? "internal_cta_click" : undefined} data-source-page={sourcePage} data-cta-type={sourcePage ? "next_action" : undefined} data-cta-position={sourcePage ? `next_action_${index + 1}` : undefined} data-destination-id={sourcePage ? link.href : undefined}><strong>{link.label}</strong><span>{link.detail}<b aria-hidden="true"> →</b></span></a>)}</div></section>;
}

export function PurposePage({ purpose }: { purpose: Purpose }) {
  const p = purposes[purpose];
  const title = `${p.title}を用途から選ぶ`;
  return <FactsLayout title={title} intro="最初に必要な作業を決め、候補と利用条件を同じ順序で確認します。掲載順は性能順位ではありません。" eyebrow="用途からAIを探す" breadcrumbs={[{label:"トップ",href:"/"},{label:"用途からAIを探す",href:"/categories"},{label:title}]}>
    <section className={styles.decisionSummary} aria-labelledby="purpose-start"><p className={styles.label}>最初の3ステップ</p><h2 id="purpose-start">選ぶ前に、条件をそろえる</h2><ol className={styles.steps}><li><span>1</span><div><strong>成果物を決める</strong><p>何を作り、誰が使うかを1つに絞る</p></div></li><li><span>2</span><div><strong>候補を2つに絞る</strong><p>必要な機能と無料条件を公式情報で確認</p></div></li><li><span>3</span><div><strong>同じ作業で試す</strong><p>出力だけでなく手直し時間まで比べる</p></div></li></ol></section>
    <section className={styles.checks}><h2>この用途で確認すること</h2><ul>{p.checks.map(c => <li key={c}>{c}</li>)}</ul>{purpose !== "writing" && <a href={`/blog/${p.guide}`}>詳しい選び方と注意点を読む</a>}</section>
    {purpose === "ai-agents" && <section className={styles.summary}><h2>完成した製品と開発用APIは分けて選ぶ</h2><p>AIエージェントという名前だけでは、相談する製品、外部サービスを操作する製品、開発者が組み込むAPIを区別できません。誰が設定し、どこまで操作を許可し、実行前に人が承認するかを先に決めてください。</p></section>}
    <FactCards ids={p.ids} compact />
    <NextActions sourcePage={`/categories/${purpose}`} title="候補を絞ったら、次の確認へ" intro="料金、入力情報、ほかの候補を確認してから、小さな作業で試してください。" links={[{href:"/compare",label:"主要AIを比較",detail:"同じ項目で違いを見る"},{href:"/cost",label:"料金条件を確認",detail:"無料枠・税・契約周期を見る"},{href:"/safety",label:"安全に使う",detail:"入力と公開の条件を見る"},{href:"/recommend",label:"候補を確認",detail:"3つの質問から入口を絞る"}]} />
  </FactsLayout>;
}
