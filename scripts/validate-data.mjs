import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];
const sourceIds = new Set();
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const OBJECTIVE_FIELDS = new Set([
  "service_name",
  "provider",
  "current_plan",
  "current_price",
  "free_plan",
  "free_trial",
  "pricing",
  "latest_model",
  "current_product",
  "features",
  "major_features",
  "availability",
  "official_url",
]);
const FORBIDDEN_KEYS = /^(api[_-]?key|secret|password|credential|access[_-]?token|refresh[_-]?token)$/i;
const ATTRIBUTION_ID = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const SOURCE_PAGE = /^\/[a-z0-9/_-]+$/;

function fail(location, message) {
  errors.push(`${location}: ${message}`);
}

function readJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  } catch (error) {
    fail(relativePath, `invalid JSON (${error.message})`);
    return null;
  }
}

function jsonFiles(relativeDir) {
  const absolute = path.join(root, relativeDir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(relativeDir, name));
}

function isHttps(value) {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function scanSecrets(value, location) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanSecrets(item, `${location}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.test(key)) fail(`${location}.${key}`, "credential-like keys are forbidden");
    scanSecrets(child, `${location}.${key}`);
  }
}

const sources = readJson("data/official-sources.json");
if (sources) {
  scanSecrets(sources, "data/official-sources.json");
  if (sources.schema_version !== 1 || !Array.isArray(sources.sources)) {
    fail("data/official-sources.json", "expected schema_version 1 and a sources array");
  } else {
    for (const [index, source] of sources.sources.entries()) {
      const at = `data/official-sources.json sources[${index}]`;
      if (!SAFE_ID.test(source.source_id || "")) fail(at, "source_id must be a stable kebab-case ID");
      if (sourceIds.has(source.source_id)) fail(at, "source_id must be unique");
      sourceIds.add(source.source_id);
      if (!isHttps(source.url)) fail(at, "official source URL must be HTTPS");
      if (!ISO_DATE.test(source.verified_at || "")) fail(at, "verified_at must be YYYY-MM-DD");
      if (source.source_type !== "official") fail(at, "source_type must be official");
    }
  }
}

for (const file of jsonFiles("data/service-facts")) {
  const record = readJson(file);
  if (!record) continue;
  scanSecrets(record, file);
  if (record.schema_version !== 1 || !SAFE_ID.test(record.service_id || "")) {
    fail(file, "expected schema_version 1 and a kebab-case service_id");
  }
  if (!record.facts || typeof record.facts !== "object" || Array.isArray(record.facts)) {
    fail(file, "facts must be an object");
    continue;
  }
  for (const [field, fact] of Object.entries(record.facts)) {
    if (!OBJECTIVE_FIELDS.has(field)) fail(file, `${field} is not an allowed objective field`);
    if (!fact || typeof fact !== "object") {
      fail(file, `${field} must contain value, source_id, and verified_at`);
      continue;
    }
    if (fact.value === null) {
      if (fact.source_id !== null || fact.verified_at !== null) {
        fail(file, `${field} must use null source/date when value is unknown`);
      }
      continue;
    }
    if (!sourceIds.has(fact.source_id)) fail(file, `${field} references an unknown source_id`);
    if (!ISO_DATE.test(fact.verified_at || "")) fail(file, `${field}.verified_at must be YYYY-MM-DD`);
    if (field === "official_url" && !isHttps(fact.value)) fail(file, "official_url must be HTTPS");
  }
}

for (const file of jsonFiles("data/update-candidates")) {
  const record = readJson(file);
  if (!record) continue;
  scanSecrets(record, file);
  if (!["draft", "blocked", "approved", "rejected"].includes(record.status)) {
    fail(file, "candidate status is invalid");
  }
  if (!OBJECTIVE_FIELDS.has(record.field)) {
    fail(file, "candidate field must be objective; scores and rankings are forbidden");
  }
  if (record.status !== "blocked" && !sourceIds.has(record.source_id)) {
    fail(file, "non-blocked candidate requires a registered official source_id");
  }
  if (record.proposed_value !== null && !ISO_DATE.test(record.observed_at || "")) {
    fail(file, "a populated proposal requires observed_at in YYYY-MM-DD format");
  }
}

const affiliate = readJson("src/data/affiliate-config.json");
if (affiliate) {
  scanSecrets(affiliate, "src/data/affiliate-config.json");
  if (!Array.isArray(affiliate.services)) fail("src/data/affiliate-config.json", "services must be an array");
  for (const [index, service] of (affiliate.services || []).entries()) {
    const at = `src/data/affiliate-config.json services[${index}]`;
    if (!SAFE_ID.test(service.service_id || "")) fail(at, "service_id must be kebab-case");
    if (service.official_url !== null && !isHttps(service.official_url)) fail(at, "official_url must be HTTPS or null");
    if (service.affiliate_url !== null && !isHttps(service.affiliate_url)) fail(at, "affiliate_url must be HTTPS or null");
    if (!Array.isArray(service.allowed_destination_hosts)) fail(at, "allowed_destination_hosts must be an array");
    if ((service.allowed_destination_hosts || []).some((host) => typeof host !== "string" || !/^[a-z0-9.-]+$/.test(host))) {
      fail(at, "allowed_destination_hosts must contain hostnames only");
    }
    if (service.attribution_query_parameter !== null && !/^[a-zA-Z0-9_-]{1,40}$/.test(service.attribution_query_parameter || "")) {
      fail(at, "attribution_query_parameter must be a safe query key or null");
    }
    if (service.link_mode !== undefined && !["redirect", "direct"].includes(service.link_mode)) {
      fail(at, "link_mode must be redirect or direct");
    }
    if (service.link_mode === "direct" && service.attribution_query_parameter !== null) {
      fail(at, "direct links cannot append attribution query parameters");
    }
    if (service.status === "active") {
      if (!service.affiliate_url) fail(at, "active service requires affiliate_url");
      if (service.activation_approved !== true || !ISO_DATE.test(service.approved_at || "")) {
        fail(at, "active service requires explicit approval and approved_at");
      }
      if (!Array.isArray(service.target_content) || service.target_content.length === 0) {
        fail(at, "active service requires target_content");
      }
      try {
        const host = new URL(service.affiliate_url).hostname;
        if (!service.allowed_destination_hosts.includes(host)) fail(at, "affiliate URL host must be allowlisted");
      } catch {}
    } else if (service.activation_approved === true || service.approved_at !== null) {
      fail(at, "inactive service cannot carry activation approval");
    }
    if (service.reward_amount !== null && typeof service.reward_amount !== "number") fail(at, "reward_amount must be a number or null");
  }
}

const targets = readJson("data/monetization/content-targets.json");
if (targets) {
  scanSecrets(targets, "data/monetization/content-targets.json");
  const seenMappings = new Set();
  if (!Array.isArray(targets.mappings)) fail("data/monetization/content-targets.json", "mappings must be an array");
  if (targets.rules?.max_cta_blocks_per_page !== 1) fail("data/monetization/content-targets.json", "phase 1 permits one CTA block per page");
  for (const [index, mapping] of (targets.mappings || []).entries()) {
    const at = `data/monetization/content-targets.json mappings[${index}]`;
    if (!/^\/[a-z0-9/_-]+$/.test(mapping.source_page || "")) fail(at, "source_page must be a local path");
    if (!SAFE_ID.test(mapping.service_id || "")) fail(at, "service_id must be kebab-case");
    if (!["official", "free_plan", "free_trial", "compare", "diagnosis"].includes(mapping.cta_type)) fail(at, "cta_type is invalid");
    if (!["proposed", "approved", "rejected", "blocked"].includes(mapping.status)) fail(at, "status is invalid");
    const key = `${mapping.source_page}|${mapping.service_id}|${mapping.position}`;
    if (seenMappings.has(key)) fail(at, "duplicate page/service/position mapping");
    seenMappings.add(key);
  }
}

const revenueImports = readJson("data/revenue/imports.json");
if (revenueImports) {
  scanSecrets(revenueImports, "data/revenue/imports.json");
  if (revenueImports.schema_version !== 2) fail("data/revenue/imports.json", "schema_version must be 2");
  if (!Array.isArray(revenueImports.analytics_exports) || !Array.isArray(revenueImports.affiliate_exports)) {
    fail("data/revenue/imports.json", "analytics_exports and affiliate_exports must be arrays");
  }
  const analyticsMetrics = ["page_sessions", "cta_impressions", "cta_clicks", "affiliate_clicks"];
  const affiliateMetrics = ["network_clicks", "pending_conversions", "confirmed_conversions", "rejected_conversions", "pending_revenue", "confirmed_revenue"];
  const seenRows = new Set();
  for (const [kind, rows, metrics] of [
    ["analytics_exports", revenueImports.analytics_exports || [], analyticsMetrics],
    ["affiliate_exports", revenueImports.affiliate_exports || [], affiliateMetrics],
  ]) {
    for (const [index, row] of rows.entries()) {
      const at = `data/revenue/imports.json ${kind}[${index}]`;
      if (!ISO_DATE.test(row.date || "")) fail(at, "date must be YYYY-MM-DD");
      if (row.source_page !== null && !SOURCE_PAGE.test(row.source_page || "")) fail(at, "source_page must be a local path or null");
      if (!ATTRIBUTION_ID.test(row.service_id || "")) fail(at, "service_id is required");
      for (const field of ["post_id", "campaign_id"]) {
        if (row[field] !== null && !ATTRIBUTION_ID.test(row[field] || "")) fail(at, `${field} must be a fixed ID or null`);
      }
      for (const metric of metrics) {
        if (!Object.hasOwn(row, metric)) fail(at, `${metric} is required; use null for missing`);
        else if (row[metric] !== null && (!Number.isFinite(row[metric]) || row[metric] < 0)) fail(at, `${metric} must be a non-negative number or null`);
      }
      if (kind === "affiliate_exports" && !/^[A-Z]{3}$/.test(row.currency || "")) {
        fail(at, "currency must be a three-letter uppercase code");
      }
      const key = [kind, row.date, row.source_page, row.service_id, row.post_id, row.campaign_id].join("|");
      if (seenRows.has(key)) fail(at, "duplicate attribution row");
      seenRows.add(key);
    }
  }
}

for (const file of jsonFiles("data/content-queue")) {
  const queue = readJson(file);
  if (!queue) continue;
  scanSecrets(queue, file);
  if (queue.publish_automatically === true) fail(file, "automatic publishing is forbidden");
  if (!Array.isArray(queue.posts)) continue;
  for (const [index, item] of queue.posts.entries()) {
    const at = `${file} posts[${index}]`;
    if (item.status !== "draft") fail(at, "generated social posts must remain draft");
    if (!["Reach", "Authority", "Conversion", "Retention"].includes(item.pillar)) fail(at, "pillar is invalid");
    for (const field of ["purpose", "draft", "target_page", "audience", "cta", "monetization_target"]) {
      if (typeof item[field] !== "string" || !item[field]) fail(at, `${field} is required`);
    }
    if (!/^\/[a-z0-9/_-]+$/.test(item.target_page || "")) fail(at, "target_page must be a local path");
  }
}

if (errors.length) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Data validation passed (${sourceIds.size} official sources registered).`);
