"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const homeLinks = [
  { href: "/#features", label: "Возможности" },
  { href: "/#how", label: "Как работает" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#about", label: "О сервисе" },
  { href: "/chat/", label: "Чат" },
];

const chatLinks = [
  { href: "/", label: "На главную" },
  { href: "/chat/", label: "Чат" },
];

export function Header() {
  const pathname = usePathname();
  const onChat = pathname === "/chat" || pathname === "/chat/";
  const links = onChat ? chatLinks : homeLinks;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 56rem)");
    const closeIfWide = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", closeIfWide);
    return () => media.removeEventListener("change", closeIfWide);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="header-slot">
      <header className="header">
        <Logo />
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-lines" />
        </button>
        <nav className={open ? "nav is-open" : "nav"} id="nav" aria-label="Главная навигация">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-lime header-cta" href="/chat/">
          {onChat ? "В чат" : "Начать"}
        </Link>
      </header>
    </div>
  );
}
