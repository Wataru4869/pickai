"use client";

import { useEffect } from "react";
import { sendAnalyticsEvent, safeAnalyticsValue } from "@/lib/client-analytics";

export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event='internal_cta_click']")
        : null;
      if (!target) return;

      sendAnalyticsEvent("internal_cta_click", {
        source_page: safeAnalyticsValue(target.dataset.sourcePage),
        cta_type: safeAnalyticsValue(target.dataset.ctaType),
        cta_position: safeAnalyticsValue(target.dataset.ctaPosition),
        destination_id: safeAnalyticsValue(target.dataset.destinationId),
        post_id: safeAnalyticsValue(target.dataset.postId),
        campaign_id: safeAnalyticsValue(target.dataset.campaignId),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
