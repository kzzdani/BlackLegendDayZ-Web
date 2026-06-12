"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui";
import { useLiveStatus } from "@/components/LiveStatus";
import { cn } from "@/lib/utils";

export function ConnectBar() {
  const t = useTranslations("connect");
  const { ip, port } = site.server;
  const address = `${ip}:${port}`;
  const live = useLiveStatus();

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible */
    }
  };

  const online = !live.loading && live.serverOnline;
  const players =
    live.players != null ? `${live.players}/${live.maxPlayers}` : `–/${live.maxPlayers}`;
  const community =
    live.online != null ? `${live.online} ${t("onlineSuffix")}` : "—";

  return (
    <section id="conectar" className="relative -mt-px scroll-mt-24 py-6">
      <Container>
        <div className="relative overflow-hidden border border-ash-600 bg-ash-900/80 backdrop-blur-sm frame-mil">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />

          <div className="grid divide-ash-700/70 md:grid-cols-[auto_1fr_auto] md:divide-x">
            {/* Estado en vivo */}
            <div className="flex items-center gap-4 px-6 py-5">
              <span className="relative flex h-3 w-3">
                {online && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 [animation:pulse-ring_2s_ease-out_infinite]" />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-3 w-3 rounded-full",
                    live.loading
                      ? "bg-ash-400"
                      : online
                        ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                        : "bg-blood shadow-[0_0_10px_#b81e0a]",
                  )}
                />
              </span>
              <div>
                <p className="font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
                  {t("status")}
                </p>
                <p className="font-display text-lg font-bold uppercase leading-none text-bone">
                  {live.loading ? t("connecting") : online ? t("online") : t("offline")}
                </p>
              </div>
            </div>

            {/* Métricas en vivo */}
            <div className="grid grid-cols-2 sm:grid-cols-3">
              <Metric label={t("players")} value={players} live accent />
              <Metric label={t("map")} value={site.server.currentMap} />
              <Metric
                label={t("community")}
                value={community}
                live={live.online != null}
                className="hidden sm:flex"
              />
            </div>

            {/* Conectar */}
            <div className="flex items-center gap-3 px-6 py-5">
              <button
                onClick={copy}
                className="group flex items-center gap-3 border border-ash-500 bg-ash-800/80 px-4 py-2.5 transition-colors hover:border-ember/70 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)]"
              >
                <span className="text-left">
                  <span className="block font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
                    {t("ipLabel")}
                  </span>
                  <span className="font-mono text-sm font-semibold text-ember">
                    {address}
                  </span>
                </span>
                {copied ? (
                  <Icon.check className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Icon.copy className="h-5 w-5 text-smoke transition-colors group-hover:text-ember" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Metric({
  label,
  value,
  live = false,
  accent = false,
  className = "",
}: {
  label: string;
  value: string;
  live?: boolean;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-center px-6 py-5 ${className}`}>
      <p className="flex items-center gap-1.5 font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
        {label}
        {live && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [animation:flicker_2s_ease-in-out_infinite]" />
        )}
      </p>
      <p
        className={cn(
          "font-display text-lg font-bold uppercase leading-none",
          accent ? "text-fire" : "text-bone",
        )}
      >
        {value}
      </p>
    </div>
  );
}
