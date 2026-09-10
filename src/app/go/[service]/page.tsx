"use client";

import affiliateConfig from "@/data/affiliate-config.json";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type AffiliateService = {
  service_id: string;
  affiliate_url: string | null;
  status: "draft" | "active" | "paused" | "unknown";
  activation_approved: boolean;
  approved_at: string | null;
  allowed_destination_hosts: string[];
  attribution_query_parameter: string | null;
  link_mode?: "redirect" | "direct";
  target_content: string[];
};

function getSafeAffiliateUrl(service?: AffiliateService): string | null {
  if (
    !service ||
    service.status !== "active" ||
    !service.activation_approved ||
    !service.approved_at ||
    !service.affiliate_url ||
    service.link_mode === "direct"
  ) return null;

  try {
    const url = new URL(service.affiliate_url);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      service.allowed_destination_hosts.includes(url.hostname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function safeDimension(value: string | null, fallback: string, pattern: RegExp, maxLength = 120) {
  if (!value || value.length > maxLength || !pattern.test(value)) return fallback;
  return value;
}

export default function AffiliateRedirectPage({ params }: { params: { service: string } }) {
  const [invalidSource, setInvalidSource] = useState(false);
  const service = (affiliateConfig.services as AffiliateService[]).find(
    (candidate) => candidate.service_id === params.service
  );
  const baseDestination = getSafeAffiliateUrl(service);

  useEffect(() => {
    // The destination is read only from the checked-in allowlist; query strings never control it.
    if (!service || !baseDestination) return;

    const query = new URLSearchParams(window.location.search);
    const sourcePage = safeDimension(query.get("source"), "unknown", /^\/[a-z0-9/_-]+$/);
    if (!service.target_content.includes(sourcePage)) {
      setInvalidSource(true);
      return;
    }
    const ctaType = safeDimension(query.get("type"), "unknown", /^[a-z_]+$/, 32);
    const ctaPosition = safeDimension(query.get("position"), "unknown", /^[a-z0-9][a-z0-9_-]*$/, 48);
    const postId = safeDimension(query.get("post_id"), "unknown", /^[a-z0-9][a-z0-9_-]*$/, 64);
    const campaignId = safeDimension(query.get("campaign_id"), "unknown", /^[a-z0-9][a-z0-9_-]*$/, 64);
    try {
      window.gtag?.("event", "affiliate_click", {
        service_id: service.service_id,
        source_page: sourcePage,
        cta_type: ctaType,
        cta_position: ctaPosition,
        post_id: postId,
        campaign_id: campaignId,
        event_timestamp: new Date().toISOString(),
        transport_type: "beacon",
      });
    } catch {
      // Measurement must never block an approved outbound link.
    }

    const destination = new URL(baseDestination);
    if (service.attribution_query_parameter) {
      const attribution = [campaignId, postId, sourcePage]
        .map((value) => value.replace(/^\//, "").replaceAll("/", "-"))
        .join("~")
        .slice(0, 180);
      destination.searchParams.set(service.attribution_query_parameter, attribution);
    }

    const timer = window.setTimeout(() => window.location.replace(destination.href), 150);
    return () => window.clearTimeout(timer);
  }, [baseDestination, service]);

  if (!service || !baseDestination || invalidSource) {
    return <main className="p-8 text-center text-sm text-[#6e6e73]">リンクを準備中です。</main>;
  }

  return <main className="p-8 text-center text-sm text-[#6e6e73]">公式サイトへ移動しています…</main>;
}
