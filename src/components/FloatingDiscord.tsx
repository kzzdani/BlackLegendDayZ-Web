"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { useLiveStatus } from "@/components/LiveStatus";

/** Botón flotante del Discord, siempre visible, con online en vivo. */
export function FloatingDiscord() {
  const { online } = useLiveStatus();

  return (
    <Link
      href={site.social.discord}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Únete al Discord"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 border border-ash-600 bg-ash-900/90 py-3 pl-3 pr-4 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-ember/60 hover:shadow-[0_0_30px_-6px_rgba(255,106,26,0.6)] sm:bottom-6 sm:right-6 [clip-path:polygon(9px_0,100%_0,100%_calc(100%-9px),calc(100%-9px)_100%,0_100%,0_9px)]"
    >
      <span className="relative flex h-10 w-10 items-center justify-center bg-ember text-[#160600] transition-transform duration-300 group-hover:scale-105">
        <Icon.discord className="h-6 w-6" />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-bone">
          Discord
        </span>
        {online != null ? (
          <span className="mt-1 inline-flex items-center gap-1.5 font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [animation:flicker_2s_ease-in-out_infinite]" />
            {online} en línea
          </span>
        ) : (
          <span className="mt-1 font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-smoke">
            Únete ya
          </span>
        )}
      </span>
    </Link>
  );
}
