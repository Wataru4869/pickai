const fs = require('node:fs');
const assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const path = require('node:path').resolve(__dirname, '..') + '/';
const repoRequire = createRequire(path + 'package.json');
const ts = repoRequire('typescript');

const code = ts.transpileModule(
  fs.readFileSync(path + 'src/data/safety-cluster-articles.ts', 'utf8'),
  {compilerOptions: {module: ts.ModuleKind.CommonJS, esModuleInterop: true}}
).outputText;
const mod = {exports: {}};
new Function('require', 'module', 'exports', code)(repoRequire, mod, mod.exports);
const {safetyClusterTopics: topics, safetyClusterArticles: articles, safetyClusterSlugs: slugs} = mod.exports;

assert.equal(topics.length, 24);
assert.equal(articles.length, 24);
assert.equal(new Set(slugs).size, 24);
assert.equal(new Set(topics.map(topic => topic.title)).size, 24);
assert.equal(new Set(topics.map(topic => topic.description)).size, 24);
assert.deepEqual(new Set(topics.map(topic => topic.group)), new Set(['入力・ファイル', '会社・仕事', '製品・設定', '攻撃・事故対応']));

for (const article of articles) {
  assert.match(article.slug, /^[a-z0-9-]+$/);
  assert.equal(article.category, 'guide');
  assert.equal(article.updatedAt, '2026-10-14');
  assert.ok(article.description.length >= 50, article.slug + ' needs a useful search description');
  assert.ok(article.sections.length >= 6, article.slug + ' needs complete decision content');
  assert.ok(article.sections.some(section => section.content.includes('| 場面 |')), article.slug + ' needs a risk table');
  assert.ok(article.sections.some(section => section.content.includes('1. ')), article.slug + ' needs ordered actions');
  assert.ok(article.sections.some(section => section.heading.includes('一次情報')), article.slug + ' needs source scope');
  assert.equal(article.cta.type, 'internal');
  assert.equal(article.cta.links.length, 2);
  for (const link of article.cta.links) assert.match(link.url, /^\/[a-z0-9/-]+$/);
  const fullText = article.sections.map(section => section.content).join('\n');
  for (const unsafe of ['絶対安全', '漏洩しない', '法的に問題ありません']) assert.equal(fullText.includes(unsafe), false, article.slug);
}

const topicPage = fs.readFileSync(path + 'src/app/safety/topics/page.tsx', 'utf8');
assert.ok(topicPage.includes('numberOfItems: safetyClusterTopics.length'));
assert.ok(topicPage.includes('ItemList'));
assert.ok(topicPage.includes('全24テーマ'));
const safetyPage = fs.readFileSync(path + 'src/app/safety/page.tsx', 'utf8');
assert.ok(safetyPage.includes('href="/safety/topics"'));
const parent = JSON.parse(fs.readFileSync(path + 'src/data/blog/ai-personal-data-leak-cases-2026.json', 'utf8'));
assert.ok(parent.sections.some(section => section.content.includes('/safety/topics')));

console.log('Passed: 24 distinct safety topics have decision tables, action steps, source scope, internal CTAs, and a grouped hub.');
