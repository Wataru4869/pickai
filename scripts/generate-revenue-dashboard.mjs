import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIMENSIONS = ["source_page", "service_id", "post_id", "campaign_id"];
const ANALYTICS_METRICS = ["page_sessions", "cta_impressions", "cta_clicks", "affiliate_clicks"];
const AFFILIATE_METRICS = ["network_clicks", "pending_conversions", "confirmed_conversions", "rejected_conversions"];

function observedNumber(row, key) {
  return Object.hasOwn(row, key) && row[key] !== null ? row[key] : null;
}

function completeSum(rows, key) {
  if (rows.length === 0 || rows.some((row) => observedNumber(row, key) === null)) return null;
  return rows.reduce((sum, row) => sum + row[key], 0);
}

function safeRate(numerator, denominator) {
  return numerator !== null && denominator !== null && denominator > 0 ? numerator / denominator : null;
}

function metricsFor(analytics, affiliates) {
  const metrics = Object.fromEntries([
    ...ANALYTICS_METRICS.map((key) => [key, completeSum(analytics, key)]),
    ...AFFILIATE_METRICS.map((key) => [key, completeSum(affiliates, key)]),
  ]);
  const currencies = [...new Set(affiliates.map((row) => row.currency).filter(Boolean))];
  const currency = currencies.length === 1 ? currencies[0] : null;
  const pendingRevenue = currency ? completeSum(affiliates, "pending_revenue") : null;
  const confirmedRevenue = currency ? completeSum(affiliates, "confirmed_revenue") : null;
  const revenueByCurrency = Object.fromEntries(currencies.sort().map((code) => {
    const rows = affiliates.filter((row) => row.currency === code);
    return [code, {
      pending: completeSum(rows, "pending_revenue"),
      confirmed: completeSum(rows, "confirmed_revenue"),
    }];
  }));
  return {
    ...metrics,
    currency,
    pending_revenue: pendingRevenue,
    confirmed_revenue: confirmedRevenue,
    revenue_by_currency: revenueByCurrency,
    cta_ctr: safeRate(metrics.cta_clicks, metrics.cta_impressions),
    session_cta_rate: safeRate(metrics.cta_clicks, metrics.page_sessions),
    confirmed_cvr: safeRate(metrics.confirmed_conversions, metrics.network_clicks),
    epc: safeRate(confirmedRevenue, metrics.network_clicks),
  };
}

function groupRows(analytics, affiliates, dimension) {
  const values = new Set([
    ...analytics.map((row) => row[dimension]),
    ...affiliates.map((row) => row[dimension]),
  ].filter((value) => typeof value === "string" && value.length > 0));
  return [...values].sort().map((value) => ({
    [dimension]: value,
    ...metricsFor(
      analytics.filter((row) => row[dimension] === value),
      affiliates.filter((row) => row[dimension] === value)
    ),
  }));
}

export function buildDashboard(input, generatedAt = new Date().toISOString()) {
  const analytics = input.analytics_exports;
  const affiliates = input.affiliate_exports;
  const hasData = analytics.length > 0 || affiliates.length > 0;
  return {
    schema_version: 2,
    status: hasData ? "data_loaded" : "no_data",
    generated_at: generatedAt,
    totals: hasData ? metricsFor(analytics, affiliates) : null,
    by_page: groupRows(analytics, affiliates, DIMENSIONS[0]),
    by_post: groupRows(analytics, affiliates, DIMENSIONS[2]),
    by_service: groupRows(analytics, affiliates, DIMENSIONS[1]),
    by_campaign: groupRows(analytics, affiliates, DIMENSIONS[3]),
    notes: [
      "Missing observations remain null and are never converted to zero.",
      "Page/post EPC is null unless the affiliate export contains that exact attribution dimension.",
      "EPC uses confirmed commission divided by network-reported clicks in the same attribution group and currency.",
      "Mixed currencies are never summed; combined EPC stays null and revenue_by_currency remains available."
    ]
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const inputPath = path.join(process.cwd(), "data/revenue/imports.json");
  const outputPath = path.join(process.cwd(), "data/revenue/dashboard.json");
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  if (!Array.isArray(input.analytics_exports) || !Array.isArray(input.affiliate_exports)) {
    throw new Error("Revenue imports must contain analytics_exports and affiliate_exports arrays.");
  }
  const dashboard = buildDashboard(input);
  fs.writeFileSync(outputPath, `${JSON.stringify(dashboard, null, 2)}\n`);
  console.log(`Revenue dashboard generated with status: ${dashboard.status}.`);
}
