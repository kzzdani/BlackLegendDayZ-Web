"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui";

export function ConnectBar() {
  const { ip, port, slots, currentMap } = site.server;
  const address = `${ip}:${port}`;

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

  return (
    <section id="conectar" className="relative -mt-px scroll-mt-24 py-6">
      <Container>
        <div className="relative overflow-hidden border border-ash-600 bg-ash-900/80 backdrop-blur-sm frame-mil">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />

          <div className="grid divide-ash-700/70 md:grid-cols-[auto_1fr_auto] md:divide-x">
            {/* Estado */}
            <div className="flex items-center gap-4 px-6 py-5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 [animation:pulse-ring_2s_ease-out_infinite]" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              <div>
                <p className="font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
                  Estado
                </p>
                <p className="font-display text-lg font-bold uppercase leading-none text-bone">
                  Servidor online
                </p>
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 sm:grid-cols-3">
              <Metric label="Slots" value={slots} />
              <Metric label="Mapa actual" value={currentMap} />
              <Metric label="Modo" value="Vanilla+ 1PP" className="hidden sm:flex" />
            </div>

            {/* Conectar */}
            <div className="flex items-center gap-3 px-6 py-5">
              <button
                onClick={copy}
                className="group flex items-center gap-3 border border-ash-500 bg-ash-800/80 px-4 py-2.5 transition-colors hover:border-ember/70 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)]"
              >
                <span className="text-left">
                  <span className="block font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
                    IP del servidor
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
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-center px-6 py-5 ${className}`}>
      <p className="font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
        {label}
      </p>
      <p className="font-display text-lg font-bold uppercase leading-none text-bone">
        {value}
      </p>
    </div>
  );
}
