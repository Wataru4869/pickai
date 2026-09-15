const fs = require('node:fs');
const assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const path = require('node:path').resolve(__dirname, '..') + '/';
const repoRequire = createRequire(path+'package.json');
const ts = repoRequire('typescript');
const React = repoRequire('react');
const {renderToStaticMarkup} = repoRequire('react-dom/server');
const code = ts.transpileModule(fs.readFileSync(path+'src/components/ReviewedGuideArticle.tsx','utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const result={exports:{}};
new Function('require','module','exports',code)(name=>{
  if(name==='@/components/ui') return {Header:()=>null,Footer:()=>null};
  if(name==='@/components/ArticleCTA') return ()=>null;
  if(name.endsWith('.module.css')) return {};
  return repoRequire(name);
},result,result.exports);
const article=JSON.parse(fs.readFileSync(path+'src/data/blog/ai-safety-ranking-2026.json'));
for(const [name,score] of [['Claude','93.7'],['ChatGPT','90.5'],['Gemini','78.4'],['Grok','69.3'],['Perplexity','69.1']]) {
  assert.ok(article.sections[4].content.includes(`| ${name} | ${score} |`));
}
const html=renderToStaticMarkup(React.createElement(result.exports.default,{article:{...article,sections:[{heading:'URL boundary tests',content:'<script>alert(1)</script> [valid](https://www.nist.gov/test) [unknown](https://evil.example/path) [userinfo](https://user@www.nist.gov/path) [port](https://www.nist.gov:444/path) [lookalike](https://www.nist.gov.evil.example/path) [script](javascript:alert(1))'}]},attribution:{}}));
assert.ok(html.includes('href="https://www.nist.gov/test"'));
assert.ok(html.includes('&lt;script&gt;'));
assert.equal(html.includes('<script>'),false);
for(const bad of ['https://evil.example','https://user@','https://www.nist.gov:444','https://www.nist.gov.evil','javascript:']) assert.equal(html.includes('href="'+bad),false);
const config=JSON.parse(fs.readFileSync(path+'src/data/affiliate-config.json'));
assert.equal(config.services.filter(s=>s.status==='active').length,0);
assert.equal(config.services.filter(s=>s.affiliate_url).length,0);
console.log('Passed: HTML escaping, official-host boundary, scheme/userinfo/port rejection, historical scores unchanged, affiliate active 0 / URLs 0.');

for (const slug of ['ai-search-engines-comparison-2026','ai-safety-ranking-2026','ai-agents-comparison-2026','ai-tools-2026-trends','ai-coding-tools-2026','grok-review-2026','cursor-projects-2026','copilot-model-retirement-2026-09','chatgpt-models-comparison-2026','ai-free-tier-comparison-2026']) {
  const guide=JSON.parse(fs.readFileSync(path+'src/data/blog/'+slug+'.json'));
  assert.equal(guide.cta.type,'internal');
  assert.equal(guide.cta.links.length,2);
  for (const link of guide.cta.links) assert.ok(/^\/[a-z0-9/-]+$/.test(link.url),slug);
  const rendered=renderToStaticMarkup(React.createElement(result.exports.default,{article:guide,attribution:{}}));
  assert.ok(rendered.includes('type="application/ld+json"'));
  assert.ok(rendered.includes('id="article-summary"'));
  assert.ok(rendered.includes('id="article"'));
  assert.ok(rendered.includes('<details open=""'));
  const schema=JSON.parse(rendered.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  assert.equal(schema.inLanguage,'ja');
  assert.equal(schema.dateModified,guide.updatedAt);
  assert.equal(schema['@id'],`https://www.aierabi.jp/blog/${slug}#article`);
  for(const match of rendered.matchAll(/href="#([^"]+)"/g)) assert.ok(rendered.includes(`id="${match[1]}"`),slug+' missing anchor');
  const external=guide.sections.flatMap(s=>[...s.content.matchAll(/\[[^\]]+\]\((https:\/\/[^\s)]+)\)/g)]).map(m=>m[1]);
  for(const url of external) assert.ok(rendered.includes('href="'+new URL(url).href+'"'),slug+' source not linked: '+url);
}
const grok=JSON.parse(fs.readFileSync(path+'src/data/blog/grok-review-2026.json'));
assert.equal(grok.updatedAt,'2026-09-13');
assert.equal(/1位|独自テストで検証/.test(grok.title+grok.description),false);
for(const score of ['72.1','86.8','86.3','43.3','69.3','95 / 91 / 88','82 / 80 / 88','88 / 85 / 93 / 79','58 / 9 / 73'])assert.ok(grok.sections.find(s=>s.heading.includes('保存スコア')).content.includes(score));
const chatgptGuide=JSON.parse(fs.readFileSync(path+'src/data/blog/chatgpt-models-comparison-2026.json'));
assert.equal(chatgptGuide.publishedAt,'2026-03-26');
assert.equal(chatgptGuide.updatedAt,'2026-09-13');
const chatgptHistory=chatgptGuide.sections.find(s=>s.heading.includes('保存スコア'));
for(const score of ['86.5','86.3','81.3','92.0','90.5']) assert.ok(chatgptHistory.content.includes(score));
assert.ok(chatgptGuide.sections.some(s=>s.content.includes('通常チャットの全プラン共通カタログ')));
const freeGuide=JSON.parse(fs.readFileSync(path+'src/data/blog/ai-free-tier-comparison-2026.json'));
assert.equal(freeGuide.publishedAt,'2026-03-23');
const freeHistory=freeGuide.sections.find(s=>s.heading.includes('過去の掲載値'));
for(const score of ['86.5','92.0','86.3','81.3','90.5','94.3','93.7','86.4','86.8'])assert.ok(freeHistory.content.includes(score));
console.log('Passed: ten reviewed articles, internal-only CTA pairs, official links render, Article schema present, historical values preserved.');

// Rendering the archive must preserve the original model-category values.
const models=JSON.parse(fs.readFileSync(path+'src/data/models.json')).models;
const ranking=JSON.parse(fs.readFileSync(path+'src/data/tests.json')).overallRanking;
const homeCode=ts.transpileModule(fs.readFileSync(path+'src/app/evaluations/2026-03/page.tsx','utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const home={exports:{}};
new Function('require','module','exports',homeCode)(name=>{
  if(name==='@/components/ui')return {Header:()=>null,Footer:()=>null,HistoricalScoreNotice:()=>null};
  if(name==='@/lib/data')return {getModels:()=>models.filter(m=>m.scores.overall!==null),getOverallRanking:()=>ranking,getChanges:()=>JSON.parse(fs.readFileSync(path+'src/data/changes.json'))};
  if(name==='@/lib/blog')return {getAllArticles:()=>[]};
  if(name.endsWith('.module.css'))return {};
  return repoRequire(name);
},home,home.exports);
const homeHtml=renderToStaticMarkup(React.createElement(home.exports.default));
const body=homeHtml.match(/<tbody>([\s\S]*?)<\/tbody>/)[1];
const rows=[...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
assert.equal(rows.length,ranking.length);
for(let i=0;i<rows.length;i++){
  const model=models.find(m=>m.id===ranking[i].model);
  const cells=[...rows[i][1].matchAll(/<td>(.*?)<\/td>/g)].map(m=>m[1]);
  assert.deepEqual(cells.slice(1),[ranking[i].score,model.scores.writing,model.scores.coding,model.scores.image,model.scores.safety].map(String));
}
console.log('Passed: dedicated archive category scores match the unchanged source records.');

function loadTs(file, overrides={}) {
  const code=ts.transpileModule(fs.readFileSync(path+file,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
  const out={exports:{}};
  const localRequire=createRequire(path+file);
  new Function('require','module','exports',code)(name=>name in overrides ? overrides[name] : name.endsWith('.module.css') ? {} : localRequire(name),out,out.exports);
  return out.exports;
}
const current=loadTs('src/lib/current-comparison.ts');
assert.equal(current.currentProducts.length,9);
assert.equal(new Set(current.currentProducts.map(p=>p.id)).size,9);
assert.deepEqual(current.displayFact({value:null,source_id:null,verified_at:null}),{text:'未確認',date:null,source:null});
assert.equal(current.displayFact({value:'unverified',source_id:'missing-source',verified_at:'2026-09-11'}).text,'未確認');
for(const p of current.currentProducts) {
  assert.ok(['chat','api','coding'].includes(p.group));
  for (const key of ['product','features']) {
    if (!p[key].source) assert.deepEqual(p[key], {text:'未確認',date:null,source:null});
  }
  assert.equal('score' in p,false);
  assert.ok(p.guide.startsWith('/blog/'));
  for(const key of ['product','features','free','price','availability']) if(p[key].source) {
    const u=new URL(p[key].source); assert.equal(u.protocol,'https:');assert.equal(u.username,'');assert.equal(u.password,'');
  }
}
const comp=loadTs('src/components/CurrentComparison.tsx');
const currentHtml=renderToStaticMarkup(React.createElement(comp.default,{products:current.currentProducts}));
assert.equal((currentHtml.match(/独自スコア：未評価/g)||[]).length,9);
assert.equal((currentHtml.match(/<article /g)||[]).length,9);
assert.ok(currentHtml.includes('3月の保存スコアを見る'));
const catalog=loadTs('src/lib/public-catalog.ts',{'./current-comparison':current});
const currentHome=loadTs('src/app/page.tsx',{
  '@/components/ui':{Header:()=>null,Footer:()=>null},
  '@/components/CurrentComparison':comp.default,
  '@/lib/current-comparison':current,
  '@/lib/public-catalog':catalog,
  '@/lib/blog':{getAllArticles:()=>[]}
});
const currentHomeHtml=renderToStaticMarkup(React.createElement(currentHome.default));
assert.equal(currentHomeHtml.includes('保存順位'),false);
assert.equal(currentHomeHtml.includes('<tbody>'),false);
assert.ok(currentHomeHtml.includes('V4.1-Flash'));
assert.ok(currentHomeHtml.includes('href="/evaluations/2026-03"'));
console.log('Passed: nine public-fact candidates, unknown preserved, official source links, no score inheritance on home.');

assert.equal(catalog.catalogProduct('copilot').facts.provider.text,'未確認');
assert.ok(catalog.catalogProduct('grok').facts.current_price.text.includes('SuperGrok: US$30/month'));
assert.equal(catalog.catalogProduct('grok').facts.free_trial.text,'未確認');
assert.ok(catalog.catalogProduct('perplexity').facts.current_price.text.includes('未確認'));
assert.equal(catalog.catalogProduct('perplexity').facts.current_price.text.includes('null'),false);
assert.ok(catalog.catalogProduct('chatgpt').facts.current_price.text.includes('\nPlus: US$20/month'));
assert.ok(catalog.catalogProduct('chatgpt').facts.current_price.text.includes('\n地域・税:'));
const factsUi=loadTs('src/components/PublicFactsPage.tsx',{'@/components/ui':{Header:()=>null,Footer:()=>null},'@/lib/public-catalog':catalog});
for(const id of Object.keys(catalog.modelNames)) {
  const html=renderToStaticMarkup(React.createElement(factsUi.FactCards,{ids:[id]}));
  assert.equal(/総合スコア|[0-9]位|乗り換え推奨|\/ 100/.test(html),false);
  for(const fact of Object.values(catalog.catalogProduct(id).facts))if(fact.source){assert.ok(fact.date>='2026-09-01');assert.ok(html.includes(fact.source.replace(/&/g,'&amp;')));}
}
const compactFactsHtml=renderToStaticMarkup(React.createElement(factsUi.FactCards,{ids:['chatgpt'],compact:true}));
assert.ok(compactFactsHtml.includes('公式根拠 3/3'));
assert.ok(compactFactsHtml.includes('確認 <time'));
assert.ok(compactFactsHtml.includes('2026-09-13'));
const nextActionsHtml=renderToStaticMarkup(React.createElement(factsUi.NextActions,{title:'次の確認',intro:'説明',links:[{href:'/cost',label:'料金',detail:'条件'}]}));
assert.ok(nextActionsHtml.includes('href="/cost"'));
assert.ok(nextActionsHtml.includes('料金'));
for(const file of ['compare/page.tsx','compare/[slug]/page.tsx','model/[id]/page.tsx','category/[id]/page.tsx','safety/page.tsx','switch/page.tsx','cost/page.tsx','compare/[slug]/opengraph-image.tsx']) {
  const code=fs.readFileSync(path+'src/app/'+file,'utf8');
  assert.equal(/getTests|getSafetyRanking|scores\.|getOverallRanking/.test(code),false,file+' must not calculate from old scores');
}
for(const file of ['blog/[slug]/page.tsx','compare/[slug]/page.tsx','model/[id]/page.tsx']) {
  const code=fs.readFileSync(path+'src/app/'+file,'utf8');
  assert.ok(code.includes('twitter:'),file+' must override global social metadata');
}
const legacyCategorySource=fs.readFileSync(path+'src/app/category/[id]/page.tsx','utf8');
assert.ok(legacyCategorySource.includes('robots:{index:false,follow:true}'));
const pairPageSource=fs.readFileSync(path+'src/app/compare/[slug]/page.tsx','utf8');
assert.ok(pairPageSource.includes('robots:slug===canonical?undefined:{index:false,follow:true}'));
const compareLandingSource=fs.readFileSync(path+'src/app/compare/page.tsx','utf8');
for(const text of ['何に使いたいですか？','迷ったときに確認しやすい3組','ComparePicker','すべての比較組み合わせを見る']) assert.ok(compareLandingSource.includes(text));
const pickerSource=fs.readFileSync(path+'src/components/ComparePicker.tsx','utf8');
assert.ok(pickerSource.includes('異なるAIを2つ選んでください'));
assert.ok(pickerSource.includes('disabled={!destination}'));
console.log('Passed: legacy category and reverse-order comparison duplicates are noindex/follow.');
console.log('Passed: current decision pages exclude historical score calculations, unknown stays unknown, facts carry September sources.');

const layoutSource=fs.readFileSync(path+'src/app/layout.tsx','utf8');
assert.ok(layoutSource.includes('process.env.VERCEL_ENV === "production"'));
assert.ok(layoutSource.includes('{enableProductionAnalytics && ('));
const sidebarSource=fs.readFileSync(path+'src/components/Sidebar.tsx','utf8');
const sharedUiSource=fs.readFileSync(path+'src/components/ui.tsx','utf8');
const navigationSource=fs.readFileSync(path+'src/lib/site-navigation.ts','utf8');
assert.equal(sidebarSource.includes('label: "総合の保存評価"'),false);
assert.equal(sharedUiSource.includes('label: "総合の保存評価"'),false);
assert.equal(navigationSource.includes('label: "総合の保存評価"'),false);
assert.ok(navigationSource.includes('label: "AI同士を比較"'));
assert.ok(sharedUiSource.includes('label: "AI同士を比較"'));
assert.ok(layoutSource.includes('verification:'));
assert.equal(layoutSource.includes('fonts.googleapis.com'),false);
console.log('Passed: analytics is production-only and root navigation describes the current comparison page.');

assert.equal(layoutSource.includes('AIツールの2026年3月時点'),false);
assert.ok(layoutSource.includes('AIツール比較・選び方｜公式情報と用途で探す'));
const blogLayoutSource=fs.readFileSync(path+'src/app/blog/layout.tsx','utf8');
assert.equal(blogLayoutSource.includes('最新情報をお届けします'),false);
assert.ok(blogLayoutSource.includes('公式情報の確認範囲と過去記録を分けて掲載'));
assert.ok(fs.readFileSync(path+'src/app/page.tsx','utf8').includes('公式情報と確認日付きで比較'));
console.log('Passed: global and blog metadata describe current facts without promoting the March archive as current.');

const blogPageSource=fs.readFileSync(path+'src/app/blog/[slug]/page.tsx','utf8');
assert.ok(blogPageSource.includes('【過去記事】'));
assert.ok(blogPageSource.includes('現在の順位・購入判断には使用しません'));
assert.equal(blogPageSource.includes('テストごとの詳細スコアを見る'),false);
assert.ok(blogPageSource.includes('機能・料金・提供条件を比較する'));
assert.ok(blogPageSource.includes('"@type": "Article"'));
console.log('Passed: archive snippets are labeled historical and legacy article CTAs describe the current comparison destination.');

const packageJson=JSON.parse(fs.readFileSync(path+'package.json','utf8'));
assert.ok(packageJson.scripts.postbuild.includes('normalize-sitemap.mjs'));
const sitemap=fs.readFileSync(path+'public/sitemap-0.xml','utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
assert.deepEqual(sitemapUrls,[...sitemapUrls].sort());
assert.equal(new Set(sitemapUrls).size,sitemapUrls.length);
console.log('Passed: generated sitemap URLs are deterministic and unique.');
