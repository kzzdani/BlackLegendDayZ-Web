"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "inicio" },
  { href: "/acerca", key: "servidor" },
  { href: "/donaciones", key: "donaciones" },
  { href: "/reglas", key: "reglas" },
  { href: "/wiki", key: "wiki" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const other = locale === "es" ? "en" : "es";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ash-700/80 bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-void/80 to-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" aria-label={site.fullName}>
          <Image
            src="/brand/0logosoloBlackLegend.png"
            alt=""
            width={56}
            height={56}
            priority
            className="h-11 w-11 drop-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 md:h-12 md:w-12"
          />
          <span className="font-display text-lg font-extrabold uppercase leading-none tracking-tight md:text-xl">
            Black <span className="text-fire">Legend</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative px-4 py-2 font-display text-sm font-semibold uppercase tracking-widest transition-colors",
                    active ? "text-ember" : "text-bone/70 hover:text-bone",
                  )}
                >
                  {t(l.key)}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-ember shadow-[0_0_8px_var(--color-ember)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + lang + burger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={pathname}
            locale={other}
            className="flex h-9 items-center justify-center border border-ash-500 bg-ash-800/60 px-3 font-display text-sm font-bold uppercase tracking-widest text-bone transition-colors hover:border-ember/70 hover:text-ember"
            aria-label={`Idioma: ${other.toUpperCase()}`}
          >
            {t("switchTo")}
          </Link>

          <Link
            href={site.social.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border border-ash-500 bg-ash-800/60 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-bone transition-colors hover:border-ember/70 hover:text-ember sm:inline-flex [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)]"
          >
            <Icon.discord className="h-4 w-4" />
            {t("discord")}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 lg:hidden"
            aria-label="Menú"
            aria-expanded={open}
          >
            <span
              className={cn(
                "absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-bone transition-all duration-300",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-bone transition-all duration-300",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-bone transition-all duration-300",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-ash-700/60 bg-void/95 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "flex items-center justify-between border-l-2 px-4 py-3 font-display text-lg font-semibold uppercase tracking-wide transition-colors",
                    active
                      ? "border-ember text-ember"
                      : "border-transparent text-bone/80 hover:border-ash-500 hover:text-bone",
                  )}
                >
                  {t(l.key)}
                  <Icon.arrow className="h-4 w-4 opacity-50" />
                </Link>
              </li>
            );
          })}
          <li className="mt-2">
            <Link
              href={site.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-ember px-4 py-3 font-display font-bold uppercase tracking-widest text-[#160600]"
            >
              <Icon.discord className="h-5 w-5" />
              {t("joinDiscord")}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
