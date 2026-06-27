"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { Banner } from "@/lib/config";

const styles: Record<Banner["variant"], string> = {
  info: "bg-ember text-[#160600]",
  event: "bg-gold text-[#160600]",
  warning: "bg-blood text-bone",
};

export function AnnouncementBanner() {
  const locale = useLocale();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((c: { banner: Banner }) => {
        if (c.banner?.enabled && (c.banner.text || c.banner.textEn)) setBanner(c.banner);
      })
      .catch(() => {});
  }, []);

  if (!banner || closed) return null;

  const text = locale === "en" ? banner.textEn || banner.text : banner.text;
  if (!text) return null;

  const inner = (
    <span className="font-display text-sm font-bold uppercase tracking-wide">{text}</span>
  );

  return (
    <div className={`relative z-40 ${styles[banner.variant]}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center">
        {banner.link ? (
          <a href={banner.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {inner}
          </a>
        ) : (
          inner
        )}
        <button
          onClick={() => setClosed(true)}
          aria-label="Cerrar aviso"
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
