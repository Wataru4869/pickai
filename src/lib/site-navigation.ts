export type NavigationLink = { href: string; label: string; description?: string };
export type NavigationGroup = { label: string; links: NavigationLink[] };

export const navigationGroups: NavigationGroup[] = [
  { label: "はじめる", links: [
    { href: "/categories", label: "用途からAIを探す", description: "やりたいことから候補を知る" },
    { href: "/recommend", label: "おすすめ候補を確認", description: "3つの質問で入口を絞る" },
  ]},
  { label: "比較する", links: [
    { href: "/compare", label: "AI同士を比較", description: "機能・条件・公式根拠を見る" },
    { href: "/cost", label: "料金・無料条件", description: "金額と契約条件を確認する" },
  ]},
  { label: "目的から探す", links: [
    { href: "/categories/writing", label: "文章・資料" },
    { href: "/categories/ai-search", label: "調査・検索" },
    { href: "/categories/image-generation", label: "画像生成" },
    { href: "/categories/video-generation", label: "動画生成" },
    { href: "/categories/coding-tools", label: "コーディング" },
    { href: "/categories/ai-agents", label: "自動化・AIエージェント" },
  ]},
  { label: "知る", links: [
    { href: "/blog", label: "比較・活用ガイド" },
    { href: "/switch", label: "乗り換えガイド" },
    { href: "/evaluations/2026-03", label: "過去の検証結果" },
  ]},
  { label: "信頼情報", links: [
    { href: "/methodology", label: "評価方法と更新方針" },
    { href: "/safety", label: "安全に使うための確認" },
    { href: "/faq", label: "よくある質問" },
  ]},
];

export function isNavigationLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
