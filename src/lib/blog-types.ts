export type AffiliateLink = {
  label: string;
  url: string;
  provider: "amazon" | "rakuten" | "moshimo_direct";
  context?: string;
};

export type ArticleCTA = {
  type: "internal" | "affiliate";
  title: string;
  description?: string;
  links: {
    label: string;
    url?: string;
    serviceId?: string;
    isAffiliate?: boolean;
    ctaType?: "official" | "free_plan" | "free_trial" | "compare" | "diagnosis";
    ctaPosition?: string;
  }[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  sections: { heading: string; content: string; dataRef?: string }[];
  affiliateLinks?: AffiliateLink[];
  cta?: ArticleCTA;
};
