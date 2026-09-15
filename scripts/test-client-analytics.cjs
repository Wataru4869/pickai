const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const path = require("node:path").resolve(__dirname, "..") + "/";
const repoRequire = createRequire(path + "package.json");
const ts = repoRequire("typescript");

const source = fs.readFileSync(path + "src/lib/client-analytics.ts", "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const result = { exports: {} };
new Function("require", "module", "exports", code)(repoRequire, result, result.exports);

assert.equal(result.exports.safeAnalyticsValue("/blog/grok-review-2026"), "/blog/grok-review-2026");
assert.equal(result.exports.safeAnalyticsValue("xae-fit-20260915-01"), "xae-fit-20260915-01");
assert.equal(result.exports.safeAnalyticsValue("email@example.com"), undefined);
assert.equal(result.exports.safeAnalyticsValue("unsafe value"), undefined);
assert.equal(result.exports.safeAnalyticsValue("a".repeat(129)), undefined);

const calls = [];
global.window = { gtag: (...args) => calls.push(args) };
result.exports.sendAnalyticsEvent("internal_cta_click", {
  source_page: "/safety",
  destination_id: "/compare",
  unsafe: "email@example.com",
});
assert.deepEqual(calls, [["event", "internal_cta_click", {
  source_page: "/safety",
  destination_id: "/compare",
}]]);
delete global.window;

const recommend = fs.readFileSync(path + "src/app/recommend/page.tsx", "utf8");
for (const event of ["recommend_start", "recommend_complete", "recommend_result_view"]) {
  assert.ok(recommend.includes(`sendAnalyticsEvent(\"${event}\"`), `${event} is not emitted`);
}
const articleCta = fs.readFileSync(path + "src/components/ArticleCTA.tsx", "utf8");
assert.ok(articleCta.includes('data-analytics-event={!useSponsoredRel ? "internal_cta_click"'));

const home = fs.readFileSync(path + "src/app/page.tsx", "utf8");
assert.ok(home.includes('data-cta-position="hero_primary"'));
assert.ok(home.includes('comparisonTarget'));
const reviewedGuide = fs.readFileSync(path + "src/components/ReviewedGuideArticle.tsx", "utf8");
assert.ok(reviewedGuide.includes('data-cta-type="decision_route"'));
const blogList = fs.readFileSync(path + "src/app/blog/BlogList.tsx", "utf8");
assert.ok(blogList.includes('useState("reviewed")'));
assert.ok(blogList.includes('"openai-agents-api-guide-2026"'));
const factsPage = fs.readFileSync(path + "src/components/PublicFactsPage.tsx", "utf8");
assert.ok(factsPage.includes('"@type": "BreadcrumbList"'));

console.log("Passed: analytics values are allowlisted, unsafe values are omitted, and decision-funnel links and events are wired.");
