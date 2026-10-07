"use client";

import { useEffect, useState } from "react";
import { VkLink } from "@/components/vk-link";
import { Logo } from "@/components/logo";

const links = [
  { href: "#features", label: "Возможности" },
  { href: "#how", label: "Как работает" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "О сервисе" },
];

export function Header() {
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
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <VkLink className="btn btn-lime header-cta">Начать</VkLink>
      </header>
    </div>
  );
}
