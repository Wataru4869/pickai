import modelsData from "@/data/models.json";
import testsData from "@/data/tests.json";
import safetyData from "@/data/safety.json";
import categoriesData from "@/data/categories.json";
import modelDetailsData from "@/data/model-details.json";

export type Model = (typeof modelsData.models)[number];
export type Test = (typeof testsData.tests)[number];
export type SafetyTest = (typeof safetyData.safetyTests)[number];

export function getModels() {
  return modelsData.models.filter((m) => m.scores.overall !== null);
}

export function getAllModels() {
  return modelsData.models;
}

export function getModelById(id: string) {
  return modelsData.models.find((m) => m.id === id);
}

export function getTests() {
  return testsData.tests;
}

export function getTestsByCategory(category: string) {
  return testsData.tests.filter((t) => t.category === category);
}

export function getCategorySummary() {
  return testsData.categorySummary;
}

export function getOverallRanking() {
  return testsData.overallRanking;
}

export function getSafetyTests() {
  return safetyData.safetyTests;
}

export function getSafetyRanking() {
  return safetyData.finalRanking;
}

export function getSafetyCertifications() {
  return safetyData.certifications;
}

export function scoreColor(score: number): string {
  if (score >= 90) return "text-green-700";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-600";
}

export function scoreColorHex(score: number): string {
  if (score >= 90) return "#1d7d3f";
  if (score >= 70) return "#0066cc";
  if (score >= 50) return "#a0820a";
  return "#c4314b";
}

export function scoreBg(score: number): string {
  if (score >= 90) return "bg-[#ecf7ef]";
  if (score >= 70) return "bg-[#eef4fc]";
  if (score >= 50) return "bg-[#fdf6e3]";
  return "bg-[#fef1f2]";
}

export function rankBadgeColor(rank: number): string {
  if (rank === 1) return "#c8860a";
  if (rank === 2) return "#888888";
  if (rank === 3) return "#b87333";
  return "#DDDDDD";
}

export const MODEL_COLORS: Record<string, string> = {
  claude: "#6B46C1",
  chatgpt: "#10A37F",
  gemini: "#4285F4",
  grok: "#1DA1F2",
  perplexity: "#20B2AA",
  copilot: "#0078D4",
};

export function getCategories() {
  return categoriesData.categories;
}

export function getCategoryById(id: string) {
  return categoriesData.categories.find((c) => c.id === id);
}

export function getModelDetails(id: string) {
  return (modelDetailsData.models as any)[id] || null;
}

export const CATEGORY_LABELS: Record<string, string> = {
  writing: "文章生成",
  coding: "コーディング",
  image: "画像生成",
  safety: "安全性",
};
