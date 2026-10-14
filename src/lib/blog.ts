import fs from "fs";
import path from "path";
import { safetyClusterArticles } from "@/data/safety-cluster-articles";
import type { BlogArticle } from "@/lib/blog-types";

export type { AffiliateLink, ArticleCTA, BlogArticle } from "@/lib/blog-types";

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

export function getAllArticles(): BlogArticle[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  const fileArticles = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    return JSON.parse(raw) as BlogArticle;
  });
  return [...safetyClusterArticles, ...fileArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  const clusterArticle = safetyClusterArticles.find((article) => article.slug === slug);
  if (clusterArticle) return clusterArticle;
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogArticle;
}

export function getArticleSlugs(): string[] {
  const fileSlugs = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
  return [...safetyClusterArticles.map((article) => article.slug), ...fileSlugs];
}

export const CATEGORY_LABELS: Record<string, string> = {
  comparison: "比較",
  guide: "選び方",
  analysis: "分析",
  news: "ニュース",
};
