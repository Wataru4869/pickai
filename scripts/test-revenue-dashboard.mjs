import assert from "node:assert/strict";
import { buildDashboard } from "./generate-revenue-dashboard.mjs";

const at = "2026-09-10T00:00:00.000Z";
const empty = buildDashboard({ analytics_exports: [], affiliate_exports: [] }, at);
assert.equal(empty.totals, null);
assert.deepEqual(empty.by_page, []);

const analyticsRow = {
  date: "2026-09-10", source_page: "/blog/example", service_id: "example",
  post_id: "x-c-01", campaign_id: "rev-01", page_sessions: 10,
  cta_impressions: 8, cta_clicks: 2, affiliate_clicks: 1,
};
const analyticsOnly = buildDashboard({ analytics_exports: [analyticsRow], affiliate_exports: [] }, at);
assert.equal(analyticsOnly.totals.confirmed_revenue, null);
assert.equal(analyticsOnly.totals.epc, null);
assert.equal(analyticsOnly.by_page[0].confirmed_revenue, null);

const affiliateRow = {
  date: "2026-09-10", source_page: "/blog/example", service_id: "example",
  post_id: "x-c-01", campaign_id: "rev-01", network_clicks: 1,
  currency: "JPY",
  pending_conversions: 0, confirmed_conversions: 1, rejected_conversions: 0,
  pending_revenue: 0, confirmed_revenue: 2500,
};
const attributed = buildDashboard({ analytics_exports: [analyticsRow], affiliate_exports: [affiliateRow] }, at);
assert.equal(attributed.totals.epc, 2500);
assert.equal(attributed.by_page[0].epc, 2500);
assert.equal(attributed.by_post[0].confirmed_conversions, 1);
assert.equal(attributed.totals.cta_ctr, 0.25);

const unattributed = buildDashboard({
  analytics_exports: [analyticsRow],
  affiliate_exports: [{ ...affiliateRow, source_page: null, post_id: null, campaign_id: null }],
}, at);
assert.equal(unattributed.by_page[0].confirmed_revenue, null);
assert.equal(unattributed.by_page[0].epc, null);
assert.equal(unattributed.by_service[0].epc, 2500);

const mixedCurrencies = buildDashboard({
  analytics_exports: [analyticsRow],
  affiliate_exports: [affiliateRow, { ...affiliateRow, date: "2026-09-11", currency: "USD", confirmed_revenue: 25 }],
}, at);
assert.equal(mixedCurrencies.totals.confirmed_revenue, null);
assert.equal(mixedCurrencies.totals.epc, null);
assert.deepEqual(mixedCurrencies.totals.revenue_by_currency, {
  JPY: { pending: 0, confirmed: 2500 },
  USD: { pending: 0, confirmed: 25 },
});
console.log("Revenue dashboard tests passed.");
