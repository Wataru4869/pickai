import affiliateConfig from "@/data/affiliate-config.json";
import type { ArticleCTA as ArticleCTAType } from "@/lib/blog";

type AffiliateService = {
  service_id: string;
  service_name: string;
  category: string;
  official_url: string;
  affiliate_url: string | null;
  affiliate_network: string;
  reward_type: string;
  reward_amount: number | null;
  cookie_days: number | null;
  status: "draft" | "active" | "paused" | "unknown";
  activation_approved: boolean;
  approved_at: string | null;
  allowed_destination_hosts: string[];
  attribution_query_parameter: string | null;
  link_mode?: "redirect" | "direct";
  priority_score: number | null;
  target_content: string[];
  notes: string;
};

function getService(serviceId?: string): AffiliateService | undefined {
  return (affiliateConfig.services as AffiliateService[]).find(
    (service) => service.service_id === serviceId
  );
}

function getDirectAffiliateUrl(service: AffiliateService | undefined): string | null {
  if (!service?.affiliate_url || service.link_mode !== "direct") return null;
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

function isActiveForContent(service: AffiliateService | undefined, contentId: string) {
  return service?.status === "active" &&
    service.activation_approved &&
    Boolean(service.approved_at) &&
    Boolean(service.affiliate_url) &&
    service.target_content.includes(contentId) &&
    (service.link_mode !== "direct" || Boolean(getDirectAffiliateUrl(service)));
}

export function hasActiveAffiliateLink(cta: ArticleCTAType | undefined, contentId: string) {
  return Boolean(cta?.links?.some((link) => {
    const service = getService(link.serviceId);
    return isActiveForContent(service, contentId);
  }));
}

function withAttribution(url: string | undefined, attribution?: { postId?: string; campaignId?: string }) {
  if (!url || !url.startsWith("/")) return url;
  const [path, existingQuery = ""] = url.split("?", 2);
  const params = new URLSearchParams(existingQuery);
  if (attribution?.postId) params.set("utm_content", attribution.postId);
  if (attribution?.campaignId) params.set("utm_campaign", attribution.campaignId);
  if (attribution?.postId || attribution?.campaignId) {
    params.set("utm_source", "x");
    params.set("utm_medium", "social");
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export default function ArticleCTA({
  cta,
  contentId,
  attribution,
}: {
  cta?: ArticleCTAType;
  contentId: string;
  attribution?: { postId?: string; campaignId?: string };
}) {
  if (!cta || !cta.links || cta.links.length === 0) return null;

  const isAffiliate = cta.type === "affiliate";
  const hasAffiliateLink = hasActiveAffiliateLink(cta, contentId);
  if (isAffiliate && !hasAffiliateLink) return null;
  const showDisclosure = isAffiliate || hasAffiliateLink;

  return (
    <div className="mt-6 p-4 border border-[#e5e5e5] rounded">
      <div className="text-[14px] font-semibold text-[#333333] mb-1">
        {cta.title}
      </div>
      {cta.description && (
        <div className="text-[12px] text-[#6e6e73] mb-3">
          {cta.description}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {cta.links.map((link, i) => {
          const service = getService(link.serviceId);
          const directAffiliateUrl = getDirectAffiliateUrl(service);
          const useAffiliateRedirect = Boolean(isActiveForContent(service, contentId));
          const params = new URLSearchParams({
            source: contentId,
            type: link.ctaType || cta.type,
            position: link.ctaPosition || `article-end-${i + 1}`,
          });
          if (attribution?.postId) params.set("post_id", attribution.postId);
          if (attribution?.campaignId) params.set("campaign_id", attribution.campaignId);
          const href = useAffiliateRedirect
            ? service!.link_mode === "direct"
              ? directAffiliateUrl!
              : `/go/${service!.service_id}?${params}`
            : withAttribution(link.url, attribution);
          const useSponsoredRel = Boolean(link.isAffiliate || isAffiliate || useAffiliateRedirect);
          // Affiliate links use /go, except explicitly-approved direct links with an allowlisted host.
          if (useSponsoredRel && !useAffiliateRedirect) return null;
          if (!href) return null;
          return (
            <a
              key={i}
              href={href}
              rel={useSponsoredRel ? "sponsored nofollow noopener" : undefined}
              target={useSponsoredRel ? "_blank" : undefined}
              className="block px-3 py-2 border border-[#e5e5e5] rounded text-[13px] text-[#4a7ab5] hover:border-[#4a7ab5] transition-colors no-underline"
            >
              {link.label}
              <span className="ml-1">→</span>
            </a>
          );
        })}
      </div>
      {showDisclosure && (
        <div className="mt-3 pt-3 border-t border-[#f0f0f0] text-[11px] text-[#86868b] leading-relaxed">
          {affiliateConfig.default_disclosure}
        </div>
      )}
    </div>
  );
}
