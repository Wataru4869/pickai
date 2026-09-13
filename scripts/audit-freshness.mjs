import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const day = 86400000;
export function dateValue(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const time = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : null;
}
export function classifyFact(fact, asOf, days = 30) {
  const now = dateValue(asOf);
  if (now === null || !Number.isInteger(days) || days < 1) throw new Error('Use a valid YYYY-MM-DD and positive integer days');
  if (fact?.value === null || fact?.value === undefined) return 'unknown';
  const verified = dateValue(fact.verified_at);
  if (verified === null || !fact.source_id) return 'missing_evidence';
  if (verified > now) return 'future_date';
  return (now - verified) / day > days ? 'review_due' : 'within_review_window';
}
export function audit(asOf, days = 30) {
  classifyFact(null, asOf, days);
  const rows = [];
  for (const file of fs.readdirSync(path.join(root, 'data/service-facts')).filter(f => f.endsWith('.json')).sort()) {
    const record = JSON.parse(fs.readFileSync(path.join(root, 'data/service-facts', file), 'utf8'));
    for (const [field, fact] of Object.entries(record.facts)) rows.push({ service: record.service_id, field, verified_at: fact.verified_at, status: classifyFact(fact, asOf, days) });
  }
  const articles = fs.readdirSync(path.join(root, 'src/data/blog')).filter(f => f.endsWith('.json')).sort().map(file => {
    const a = JSON.parse(fs.readFileSync(path.join(root, 'src/data/blog', file), 'utf8'));
    const updated = dateValue(a.updatedAt);
    return { slug: a.slug, updated_at: a.updatedAt, status: updated === null ? 'invalid_date' : updated > dateValue(asOf) ? 'future_date' : (dateValue(asOf) - updated) / day > days ? 'review_due' : 'within_review_window' };
  });
  return { as_of: asOf, review_window_days: days, warning: 'Age is a review signal, not proof of truth or freshness. Unknown is not zero. This reads public JSON only; no network, writes, publishing, or account access.', facts: rows, articles };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Usage: npm run audit:freshness -- YYYY-MM-DD [days]');
    console.log(JSON.stringify(audit(process.argv[2], process.argv[3] === undefined ? 30 : Number(process.argv[3])), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
