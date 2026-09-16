"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isNavigationLinkActive, navigationGroups } from "@/lib/site-navigation";

const SITE_NAME = "AIえらびマップ";
const SITE_WORDMARK = "AI erabi map";
const SITE_TAGLINE = "用途から選ぶ、AI比較ガイド";

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return <a href="/" className="site-brand" onClick={onNavigate} aria-label={`${SITE_NAME}（${SITE_WORDMARK}）トップページ`}>
    <span className="site-brand__wordmark" aria-hidden="true"><b>AI</b><i>erabi</i><em>map</em></span>
    <small>{SITE_TAGLINE}</small>
  </a>;
}

function Navigation({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const marks: Record<string, string> = { "/categories":"目", "/recommend":"診", "/compare":"比", "/cost":"￥", "/categories/writing":"文", "/categories/ai-search":"調", "/categories/image-generation":"画", "/categories/video-generation":"動", "/categories/coding-tools":"開", "/categories/ai-agents":"自", "/blog":"読", "/switch":"替", "/evaluations/2026-03":"歴", "/methodology":"方", "/safety":"安", "/faq":"問" };
  return <nav className="site-navigation" aria-label="サイト内メニュー">
    {navigationGroups.map(group => <section key={group.label} className="site-navigation__group" aria-labelledby={`nav-${group.label}`}>
      <h2 id={`nav-${group.label}`}>{group.label}</h2>
      <ul>{group.links.map(link => {
        const active = isNavigationLinkActive(pathname, link.href);
        return <li key={link.href}><a href={link.href} onClick={onNavigate} aria-current={active ? "page" : undefined}>
          <b aria-hidden="true">{marks[link.href] ?? "・"}</b><span>{link.label}{link.description && <small>{link.description}</small>}</span>
        </a></li>;
      })}</ul>
    </section>)}
  </nav>;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  return <div className="site-shell">
    <aside className="desktop-sidebar"><Brand /><a className="sidebar-start" href="/recommend"><span>3つの質問で確認</span><strong>自分に合うAIを選ぶ</strong></a><Navigation pathname={pathname} /><div className="sidebar-foot"><span>情報の見方</span><strong>公式情報と過去の検証を分けて掲載</strong></div></aside>
    <header className="mobile-header">
      <button type="button" onClick={() => setOpen(true)} aria-label="メニューを開く" aria-expanded={open} aria-controls="mobile-navigation"><span aria-hidden="true">☰</span></button>
      <Brand />
      <a href="/recommend" className="mobile-header__quick">診断</a>
    </header>
    {open && <div className="mobile-overlay" role="presentation" onClick={() => setOpen(false)}>
      <aside id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="サイト内メニュー" onClick={event => event.stopPropagation()}>
        <div className="mobile-drawer__head"><Brand onNavigate={() => setOpen(false)} /><button type="button" onClick={() => setOpen(false)} aria-label="メニューを閉じる">×</button></div>
        <Navigation pathname={pathname} onNavigate={() => setOpen(false)} />
      </aside>
    </div>}
    <main className="site-main">{children}</main>
  </div>;
}
