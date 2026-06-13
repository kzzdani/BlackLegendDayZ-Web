"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { site } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";

type Item = { id: string; content: string; author: string; timestamp: string };

export function AnnouncementsSection() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    let on = true;
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((d: { items: Item[] }) => on && setItems(d.items ?? []))
      .catch(() => on && setItems([]));
    return () => {
      on = false;
    };
  }, []);

  // Invisible hasta que el bot esté configurado y haya comunicados.
  if (!items || items.length === 0) return null;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="relative border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("title1")} <span className="text-fire">{t("title2")}</span>
            </Heading>
            <p className="mt-4 max-w-md text-base text-smoke">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={site.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ash-500 bg-ash-800/60 px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-bone transition-colors hover:border-ember/70 hover:text-ember [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)]"
            >
              <Icon.discord className="h-4 w-4" />
              {t("viewAll")}
            </a>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((m) => (
            <StaggerItem key={m.id}>
              <article className="flex h-full flex-col border border-ash-700 bg-ash-900 p-7 transition-colors hover:border-ember/40">
                <Icon.flame className="h-6 w-6 text-ember" />
                <p className="mt-4 line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-bone/90">
                  {m.content}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-ash-700 pt-4 font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-smoke">
                  <span className="text-ember">{m.author}</span>
                  <span>{fmt(m.timestamp)}</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
