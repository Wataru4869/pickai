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

for (const slug of ['ai-search-engines-comparison-2026','ai-safety-ranking-2026','ai-agents-comparison-2026','ai-tools-2026-trends','ai-coding-tools-2026']) {
  const guide=JSON.parse(fs.readFileSync(path+'src/data/blog/'+slug+'.json'));
  assert.equal(guide.cta.type,'internal');
  assert.equal(guide.cta.links.length,2);
  for (const link of guide.cta.links) assert.ok(/^\/[a-z0-9/-]+$/.test(link.url),slug);
  const rendered=renderToStaticMarkup(React.createElement(result.exports.default,{article:guide,attribution:{}}));
  assert.ok(rendered.includes('type="application/ld+json"'));
  const external=guide.sections.flatMap(s=>[...s.content.matchAll(/\[[^\]]+\]\((https:\/\/[^\s)]+)\)/g)]).map(m=>m[1]);
  for(const url of external) assert.ok(rendered.includes('href="'+new URL(url).href+'"'),slug+' source not linked: '+url);
}
console.log('Passed: five reviewed guides, internal-only CTA pairs, official links render, Article schema present.');

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
  assert.ok(p.product.source && p.features.source);
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
const currentHome=loadTs('src/app/page.tsx',{
  '@/components/ui':{Header:()=>null,Footer:()=>null},
  '@/components/CurrentComparison':comp.default,
  '@/lib/current-comparison':current,
  '@/lib/blog':{getAllArticles:()=>[]}
});
const currentHomeHtml=renderToStaticMarkup(React.createElement(currentHome.default));
assert.equal(currentHomeHtml.includes('保存順位'),false);
assert.equal(currentHomeHtml.includes('<tbody>'),false);
assert.ok(currentHomeHtml.includes('V4.1-Flash'));
assert.ok(currentHomeHtml.includes('href="/evaluations/2026-03"'));
console.log('Passed: nine public-fact candidates, unknown preserved, official source links, no score inheritance on home.');
