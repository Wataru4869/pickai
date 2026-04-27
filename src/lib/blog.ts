import fs from "fs";
import path from "path";

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
  links: { label: string; url: string; isAffiliate?: boolean }[];
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

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

export function getAllArticles(): BlogArticle[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    return JSON.parse(raw) as BlogArticle;
  });
  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogArticle;
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export const CATEGORY_LABELS: Record<string, string> = {
  comparison: "比較",
  guide: "選び方",
  analysis: "分析",
  news: "ニュース",
};
