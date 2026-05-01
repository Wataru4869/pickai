"use client";

import { scoreColorHex } from "@/lib/data";

export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[17px] font-bold text-[#1d1d1f] pl-3 border-l-[3px] border-[#1d1d1f] mb-4">
      {title}
    </h2>
  );
}

export function Block({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <div className={`${alt ? "bg-[#fafafa]" : "bg-white"} py-4`}>
      <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">{children}</div>
    </div>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-full sm:max-w-[860px] mx-auto px-3 sm:px-4">{children}</div>;
}

export function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: "#a0820a",
    2: "#6e6e73",
    3: "#8b6c4f",
  };
  const bg = colors[rank] || "#d2d2d7";
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-semibold text-white"
      style={{ backgroundColor: bg }}
    >
      {rank}
    </span>
  );
}

export function ScoreDisplay({
  score,
  size = "lg",
}: {
  score: number | null;
  size?: "sm" | "md" | "lg";
}) {
  if (score === null) return <span className="text-[#86868b]">—</span>;
  const color = scoreColorHex(score);
  const fontSize =
    size === "lg" ? "text-[26px]" : size === "md" ? "text-[18px]" : "text-[14px]";
  return (
    <span className={`${fontSize} font-semibold`} style={{ color }}>
      {score}
    </span>
  );
}

export function CategoryScoreBar({
  label,
  score,
}: {
  label: string;
  score: number | null;
}) {
  if (score === null) return null;
  return (
    <div className="flex-1 text-center border border-[#e8e8ed] rounded p-1.5">
      <div className="text-[10px] text-[#86868b]">{label}</div>
      <div
        className="text-[16px] font-bold"
        style={{ color: scoreColorHex(score) }}
      >
        {score}
      </div>
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="flex items-center gap-2 mt-3 text-[10px]">
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">独自30テスト</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">採点基準公開</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">2026.04更新</span>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="text-[11px] text-[#86868b] mb-2">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && " ＞ "}
          {item.href ? (
            <a href={item.href} className="text-[#4a7ab5] hover:underline no-underline">{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function ShareButton({ text }: { text: string }) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1.5 border border-[#d2d2d7] text-[#1d1d1f] rounded text-[11px] font-medium hover:bg-[#f5f5f7] transition-colors no-underline"
    >
      𝕏 ポスト
    </a>
  );
}

export function Footer() {
  const groups: { heading: string; links: { href: string; label: string }[] }[] = [
    {
      heading: "比較・診断",
      links: [
        { href: "/", label: "総合ランキング" },
        { href: "/recommend", label: "おすすめ診断" },
        { href: "/switch", label: "乗り換えガイド" },
        { href: "/cost", label: "コスト計算" },
      ],
    },
    {
      heading: "カテゴリ",
      links: [
        { href: "/categories", label: "全カテゴリ" },
        { href: "/categories/coding-tools", label: "コーディング" },
        { href: "/categories/ai-search", label: "AI検索" },
        { href: "/categories/image-generation", label: "画像生成" },
      ],
    },
    {
      heading: "サイト情報",
      links: [
        { href: "/methodology", label: "評価方法論" },
        { href: "/safety", label: "安全性比較" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "コラム" },
      ],
    },
  ];
  return (
    <footer className="border-t border-[#f0f0f0] bg-[#fafafa] py-8 text-[11px] text-[#999999]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {groups.map((g) => (
            <div key={g.heading}>
              <div className="text-[11px] font-semibold text-[#666666] mb-2">{g.heading}</div>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[#999999] hover:text-[#333333] no-underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[#e8e8ed] flex items-center gap-4 flex-wrap text-[10px]">
          <span className="font-medium text-[12px] text-[#666666]">AI選び</span>
          <span>© 2026 AI選び</span>
          <a href="/privacy" className="text-[#999999] hover:text-[#666666] no-underline">プライバシーポリシー</a>
          <a href="/about" className="text-[#999999] hover:text-[#666666] no-underline">運営者情報</a>
          <span className="ml-auto text-[#999999]">2026.04 更新</span>
        </div>
      </Container>
    </footer>
  );
}

export function Header() {
  // Header is now handled by Sidebar component.
  // This is kept as a no-op for backward compatibility with pages that import it.
  return null;
}
