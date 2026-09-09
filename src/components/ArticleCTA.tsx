import affiliateConfig from "@/data/affiliate-config.json";
import type { ArticleCTA as ArticleCTAType } from "@/lib/blog";

export default function ArticleCTA({ cta }: { cta?: ArticleCTAType }) {
  if (!cta || !cta.links || cta.links.length === 0) return null;

  const isAffiliate = cta.type === "affiliate";
  const hasAffiliateLink = cta.links.some((l) => l.isAffiliate);
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
          const useSponsoredRel = link.isAffiliate || isAffiliate;
          return (
            <a
              key={i}
              href={link.url}
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
