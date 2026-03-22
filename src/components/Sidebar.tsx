"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  // ランキング系
  { href: "/", label: "総合ランキング" },
  { href: "/categories", label: "カテゴリ別", children: [
    { href: "/categories/image-generation", label: "画像生成" },
    { href: "/categories/video-generation", label: "動画生成" },
    { href: "/categories/coding-tools", label: "コーディング" },
    { href: "/categories/ai-agents", label: "AIエージェント" },
    { href: "/categories/ai-search", label: "AI検索" },
  ]},
  { type: "separator" as const },
  // ツール系
  { href: "/recommend", label: "おすすめ診断" },
  { href: "/switch", label: "乗り換えガイド" },
  { type: "separator" as const },
  // データ系
  { href: "/safety", label: "安全性比較" },
  { href: "/cost", label: "コスト計算" },
  { href: "/methodology", label: "評価方法論" },
] as const;

type MenuItem = {
  href?: string;
  label?: string;
  type?: "separator";
  children?: readonly { href: string; label: string }[];
};

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#e8e8ed]">
        <a href="/" className="flex items-baseline gap-0.5 no-underline" onClick={onNavigate}>
          <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">Pick</span>
          <span className="text-[18px] font-light text-[#d2d2d7]">|</span>
          <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">AI</span>
        </a>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        {(MENU_ITEMS as readonly MenuItem[]).map((item, i) => {
          if (item.type === "separator") {
            return <div key={`sep-${i}`} className="my-2 mx-3 border-t border-[#e8e8ed]" />;
          }

          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href!);

          return (
            <div key={item.href}>
              <a
                href={item.href}
                onClick={onNavigate}
                className={`block px-4 py-2 text-[12px] no-underline transition-colors ${
                  isActive
                    ? "bg-[#f5f5f7] text-[#1d1d1f] font-medium"
                    : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                }`}
              >
                {item.label}
              </a>
              {item.children && isActive && (
                <div className="ml-4">
                  {item.children.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={`block pl-8 pr-4 py-1.5 text-[11px] no-underline transition-colors ${
                          childActive
                            ? "bg-[#f5f5f7] text-[#1d1d1f] font-medium"
                            : "text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                        }`}
                      >
                        {child.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#e8e8ed] text-[10px] text-[#86868b]">
        © 2026 Pick AI
      </div>
    </div>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden sm:flex fixed top-0 left-0 w-[200px] h-screen bg-white border-r border-[#e8e8ed] z-40 flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile header */}
      <header className="sm:hidden sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#e8e8ed]">
        <div className="flex items-center justify-between h-11 px-4">
          <button
            onClick={() => setOpen(true)}
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1d1d1f]"
            aria-label="メニューを開く"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>
          <a href="/" className="flex items-baseline gap-0.5 no-underline">
            <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">Pick</span>
            <span className="text-[18px] font-light text-[#d2d2d7]">|</span>
            <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">AI</span>
          </a>
          <div className="w-8" /> {/* spacer for centering */}
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute top-0 left-0 w-[260px] h-full bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8ed]">
              <a href="/" className="flex items-baseline gap-0.5 no-underline">
                <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">Pick</span>
                <span className="text-[18px] font-light text-[#d2d2d7]">|</span>
                <span className="text-[18px] font-medium tracking-tight text-[#1d1d1f]">AI</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#6e6e73] hover:text-[#1d1d1f]"
                aria-label="メニューを閉じる"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100%-56px)] overflow-y-auto">
              <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="sm:ml-[200px]">
        {children}
      </main>
    </div>
  );
}
