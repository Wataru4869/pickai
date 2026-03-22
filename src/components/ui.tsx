"use client";

import { scoreColorHex } from "@/lib/data";

export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[15px] font-semibold text-[#1d1d1f] pl-3 border-l-2 border-[#1d1d1f] mb-2">
      {title}
    </h2>
  );
}

export function Block({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <div className={`${alt ? "bg-[#f9f9fb]" : "bg-white"} py-4`}>
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
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#f5f5f7] text-[#6e6e73] border border-[#e8e8ed] font-medium">2026.03更新</span>
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
            <a href={item.href} className="text-[#0066cc] hover:underline no-underline">{item.label}</a>
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
  return (
    <footer className="border-t border-[#e8e8ed] bg-[#f5f5f7] py-8 text-[11px] text-[#86868b]">
      <Container>
        <div className="flex items-center gap-6 flex-wrap">
          <a href="/" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">トップ</a>
          <a href="/categories" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">カテゴリ</a>
          <a href="/recommend" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">おすすめ</a>
          <a href="/switch" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">乗り換え</a>
          <a href="/safety" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">安全性</a>
          <a href="/methodology" className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline">方法論</a>
          <span className="ml-auto font-medium text-[13px] text-[#6e6e73]">Pick AI</span>
        </div>
        <div className="mt-2 text-[10px]">© 2026 Pick AI</div>
      </Container>
    </footer>
  );
}

export function Header() {
  // Header is now handled by Sidebar component.
  // This is kept as a no-op for backward compatibility with pages that import it.
  return null;
}
