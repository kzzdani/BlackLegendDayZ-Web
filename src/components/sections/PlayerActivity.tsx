"use client";

import { useEffect, useState } from "react";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { useLiveStatus } from "@/components/LiveStatus";
import { cn } from "@/lib/utils";

type Point = { t: string; v: number };

export function PlayerActivity() {
  const live = useLiveStatus();
  const [points, setPoints] = useState<Point[]>([]);
  const [peak, setPeak] = useState(0);
  const [avg, setAvg] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/history")
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setPoints(d.points ?? []);
        setPeak(d.peak ?? 0);
        setAvg(d.avg ?? 0);
        setLoaded(true);
      })
      .catch(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, []);

  const max = Math.max(peak, live.players ?? 0, 1);

  return (
    <section className="relative border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Actividad</SectionLabel>
            <Heading className="mt-5">
              ¿Cuándo hay <span className="text-fire">movida</span>?
            </Heading>
            <p className="mt-4 max-w-md text-base text-smoke">
              Jugadores conectados en las últimas 24 horas. Elige tu hora y entra
              cuando arde Livonia.
            </p>
          </div>
          <div className="flex gap-8">
            <Stat label="Ahora" value={live.players != null ? live.players : "–"} live />
            <Stat label="Pico 24h" value={peak || "–"} />
            <Stat label="Media" value={avg || "–"} />
          </div>
        </div>

        {/* Gráfica */}
        <div className="mt-12 border border-ash-700 bg-ash-900 p-6 sm:p-8 frame-mil">
          <div className="flex h-44 items-end gap-[3px] sm:h-56 sm:gap-1">
            {!loaded
              ? Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 animate-pulse rounded-t-sm bg-ash-800"
                    style={{ height: `${20 + ((i * 37) % 60)}%` }}
                  />
                ))
              : points.map((p) => {
                  const h = Math.max((p.v / max) * 100, 2);
                  const isPeak = p.v === peak && peak > 0;
                  const hour = new Date(p.t).getHours();
                  return (
                    <div
                      key={p.t}
                      className="group relative flex flex-1 items-end"
                      style={{ height: "100%" }}
                    >
                      <div
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-300",
                          isPeak
                            ? "bg-gradient-to-t from-blood via-ember to-gold"
                            : "bg-gradient-to-t from-ash-600 to-ash-500 group-hover:from-ember/70 group-hover:to-gold/70",
                        )}
                        style={{ height: `${h}%` }}
                      />
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-ash-600 bg-void px-2 py-1 font-mono text-[0.65rem] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                        {String(hour).padStart(2, "0")}:00 · {p.v}
                      </span>
                    </div>
                  );
                })}
          </div>
          {/* Eje horas */}
          {loaded && points.length > 0 && (
            <div className="mt-3 flex justify-between font-mono text-[0.6rem] text-ash-400">
              {[0, 6, 12, 18].map((i) => {
                const p = points[Math.min(Math.floor((i / 24) * points.length), points.length - 1)];
                return (
                  <span key={i}>
                    {p ? `${String(new Date(p.t).getHours()).padStart(2, "0")}:00` : ""}
                  </span>
                );
              })}
              <span>ahora</span>
            </div>
          )}
        </div>
        <p className="mt-3 font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-ash-500">
          Datos en directo vía BattleMetrics · hora local
        </p>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  live = false,
}: {
  label: string;
  value: number | string;
  live?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
        {label}
        {live && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [animation:flicker_2s_ease-in-out_infinite]" />
        )}
      </p>
      <p className="mt-1 font-display text-3xl font-black uppercase leading-none text-fire sm:text-4xl">
        {value}
      </p>
    </div>
  );
}
