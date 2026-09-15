"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "internal_cta_click"
  | "recommend_start"
  | "recommend_complete"
  | "recommend_result_view";

const SAFE_VALUE = /^(?:\/[a-z0-9][a-z0-9_\/-]{0,126}|[a-z0-9][a-z0-9_\/-]{0,127})$/;

export function safeAnalyticsValue(value: string | null | undefined) {
  return value && SAFE_VALUE.test(value) ? value : undefined;
}

export function sendAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: Record<string, string | undefined>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, safeAnalyticsValue(value)] as const)
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
  );

  window.gtag("event", eventName, safeParameters);
}
