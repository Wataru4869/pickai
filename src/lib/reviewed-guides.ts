import { safetyClusterSlugs } from "@/data/safety-cluster-articles";

export const reviewedGuideSlugs = [
  "ai-search-engines-comparison-2026", "ai-safety-ranking-2026", "ai-agents-comparison-2026",
  "ai-tools-2026-trends", "ai-coding-tools-2026", "grok-review-2026",
  "cursor-projects-2026", "copilot-model-retirement-2026-09", "chatgpt-models-comparison-2026",
  "ai-image-generation-2026", "ai-video-generation-2026", "ai-free-tier-comparison-2026",
  "openai-agents-api-guide-2026", "chatgpt-vs-perplexity-2026", "cursor-vs-github-copilot-2026",
  "cursor-vs-windsurf-2026", "heygen-vs-synthesia-2026", "runway-vs-pika-2026",
  "midjourney-vs-adobe-firefly-2026", "ai-privacy-by-usecase-2026", "ai-what-not-to-enter-2026",
  "ai-data-entered-response-2026", "ai-training-retention-review-2026", "ai-business-security-checklist-2026",
  "ai-safety-mythos-2026", "ai-personal-data-leak-cases-2026", "ai-python-learning-path-2026",
  ...safetyClusterSlugs,
] as const;

export const reviewedGuideSet = new Set<string>(reviewedGuideSlugs);
