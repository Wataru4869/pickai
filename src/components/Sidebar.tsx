"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isNavigationLinkActive, navigationGroups } from "@/lib/site-navigation";

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return <a href="/" className="site-brand" onClick={onNavigate} aria-label="AI選び トップページ">
    <span className="site-brand__mark" aria-hidden="true">選</span>
    <span><strong>AI選び</strong><small>用途から選べるAI比較</small></span>
  </a>;
}

function Navigation({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return <nav className="site-navigation" aria-label="サイト内メニュー">
    {navigationGroups.map(group => <section key={group.label} className="site-navigation__group" aria-labelledby={`nav-${group.label}`}>
      <h2 id={`nav-${group.label}`}>{group.label}</h2>
      <ul>{group.links.map(link => {
        const active = isNavigationLinkActive(pathname, link.href);
        return <li key={link.href}><a href={link.href} onClick={onNavigate} aria-current={active ? "page" : undefined}>
          <span>{link.label}</span>{link.description && <small>{link.description}</small>}
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
    <aside className="desktop-sidebar"><Brand /><Navigation pathname={pathname} /><div className="sidebar-foot">公式情報と過去の検証を分けて掲載</div></aside>
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
