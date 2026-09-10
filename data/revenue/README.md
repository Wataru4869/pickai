# Revenue analytics contract

Current status: both imports arrays are empty; no business metrics have been observed here. Missing is not zero. Forecasts belong in labelled reports, never actuals.

Canonical design: [Revenue Decision Framework](../../docs/REVENUE_DECISION_FRAMEWORK.md), section 4. Implementation gaps: [PROJECT_STATE](../../docs/PROJECT_STATE.md); remediation: T3 in NEXT_TASKS.

The v2 generator keeps incomplete metrics null and aggregates by page, post, service and campaign. Post/page conversion attribution requires a permitted key returned by the ASP; otherwise those metrics stay unknown. It never allocates unattributed revenue in proportion to site clicks.

Definitions: CTA CTR = clicks / CTA impressions; clicks / page sessions is a separate session CTA rate. EPC = confirmed commission / network-reported clicks in the same imported cohort and currency. Mixed currencies are not summed and combined EPC stays null. Pending, confirmed and rejected values are separate. Zero or missing denominators yield null.

Each analytics row requires `date`, `source_page`, `service_id`, nullable `post_id` / `campaign_id`, and the four metrics `page_sessions`, `cta_impressions`, `cta_clicks`, `affiliate_clicks`. Each affiliate row uses the same dimensions and requires `currency`, `network_clicks`, pending/confirmed/rejected conversions and pending/confirmed commission. Use explicit `null` for unavailable values; use zero only for a verified observed zero. Rows are daily and duplicate dimension rows are rejected.

Keep these repository imports empty as examples. Human-controlled private ASP records remain outside Git; only explicitly permitted, non-identifying aggregates may be analysed. Never store account/customer/order IDs, IP, email, credentials or unrestricted query strings. Non-public aggregate business data also requires an approved local-only destination, not this repository.
