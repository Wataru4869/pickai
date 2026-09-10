# Service facts

Store one JSON file per service. This directory is only for facts that can be verified from official primary sources: names, provider, pricing, current model, features, availability, and official URLs.

Every populated fact must contain `value`, `source_id`, and `verified_at`. Unknown values use `null`; do not guess. Ranking, test scores, and safety assessments are forbidden here and belong under `data/evaluation-runs/`.

Example shape (documentation only):

```json
{
  "schema_version": 1,
  "service_id": "stable-internal-id",
  "facts": {
    "service_name": { "value": null, "source_id": null, "verified_at": null }
  }
}
```
