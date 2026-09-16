"use client";

import { scoreColorHex } from "@/lib/data";

const SITE_NAME = "AIえらびマップ";

export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[22px] sm:text-[24px] leading-[1.55] font-bold text-[var(--text)] pl-4 border-l-4 border-[var(--accent)] mb-5">
      {title}
    </h2>
  );
}

export function Block({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <section className={`${alt ? "bg-[var(--bg-section)]" : "bg-white"} py-7 sm:py-10 border-b border-[var(--border-light)]`}>
      <div className="max-w-[960px] mx-auto px-4 sm:px-7">{children}</div>
    </section>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1120px] mx-auto px-4 sm:px-8">{children}</div>;
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
    <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px]">
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--accent-pale)] text-[var(--accent)] border border-[var(--border)] font-medium">過去の独自30テスト</span>
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white text-[var(--text-sub)] border border-[var(--border)] font-medium">採点基準を公開</span>
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--warm)] text-[var(--text-sub)] border border-[#e3d9c7] font-medium">2026年3月時点の履歴</span>
    </div>
  );
}

export function HistoricalScoreNotice() {
  return (
    <div className="my-3 rounded border border-[#d2d2d7] bg-[#fafafa] px-3 py-2 text-[11px] leading-relaxed text-[#6e6e73]">
      <span className="font-semibold text-[#1d1d1f]">評価・順位は2026年3月時点の保存済み履歴値です。 </span>
      現在のモデル性能、提供状況、料金、無料条件を示すものではありません。最新の契約・機能は各社公式サイトで確認してください。
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
      heading: "AIを選ぶ",
      links: [
        { href: "/categories", label: "用途から探す" },
        { href: "/recommend", label: "おすすめ候補を確認" },
        { href: "/compare", label: "AI同士を比較" },
        { href: "/switch", label: "乗り換えガイド" },
        { href: "/cost", label: "料金確認ガイド" },
      ],
    },
    {
      heading: "目的から探す",
      links: [
        { href: "/categories/writing", label: "文章・資料" },
        { href: "/categories/ai-search", label: "調査・検索" },
        { href: "/categories/coding-tools", label: "コーディング" },
        { href: "/categories/image-generation", label: "画像生成" },
        { href: "/categories/video-generation", label: "動画生成" },
      ],
    },
    {
      heading: "信頼情報",
      links: [
        { href: "/methodology", label: "評価方法と更新方針" },
        { href: "/safety", label: "安全に使うための確認" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "コラム" },
      ],
    },
  ];
  return (
    <footer className="border-t border-[var(--border-light)] bg-[#f2f5f2] py-10 text-[12px] text-[var(--text-light)]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {groups.map((g) => (
            <div key={g.heading}>
              <div className="text-[13px] font-bold text-[var(--text)] mb-3">{g.heading}</div>
              <ul className="space-y-1 list-none p-0 m-0">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex items-center min-h-10 text-[var(--text-sub)] hover:text-[var(--accent)] no-underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-5 border-t border-[var(--border)] flex items-center gap-4 flex-wrap text-[11px]">
          <span className="font-bold text-[14px] text-[var(--text)]">{SITE_NAME}</span>
          <span>© 2026 {SITE_NAME}</span>
          <a href="/privacy" className="text-[var(--text-sub)] hover:text-[var(--accent)] no-underline">プライバシーポリシー</a>
          <a href="/about" className="text-[var(--text-sub)] hover:text-[var(--accent)] no-underline">運営者情報</a>
          <span className="ml-auto">過去の評価：2026年3月時点</span>
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
