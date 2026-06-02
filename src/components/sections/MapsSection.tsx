"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { maps } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function MapsSection() {
  const [active, setActive] = useState(0);
  const map = maps[active];

  return (
    <section className="relative overflow-hidden border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      {/* Patrón de fondo tenue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/brand/bl_01sin_logo_01.png)",
          backgroundSize: "520px",
        }}
      />
      <Container className="relative">
        <Reveal>
          <SectionLabel>Mapas en rotación</SectionLabel>
          <Heading className="mt-5">
            Tres mundos. <span className="text-fire">Una sola regla.</span>
          </Heading>
          <p className="mt-4 max-w-xl text-base text-smoke">
            Sobrevivir. Rotamos entre mapas para que la experiencia nunca se
            estanque.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {/* Selector */}
          <div className="flex flex-col gap-3">
            {maps.map((m, i) => {
              const isActive = i === active;
              return (
                <button
                  key={m.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-ember/50 bg-ash-800"
                      : "border-ash-700 bg-ash-900/60 hover:border-ash-500"
                  }`}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-300"
                    style={{
                      background: m.accent,
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p
                        className="font-stencil text-[0.6rem] uppercase tracking-[0.3em]"
                        style={{ color: m.accent }}
                      >
                        {m.flavor} · {m.climate}
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase leading-none text-bone">
                        {m.name}
                      </h3>
                    </div>
                    <span
                      className={`font-display text-2xl transition-transform duration-300 ${
                        isActive ? "translate-x-0 text-ember" : "-translate-x-2 text-ash-500"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detalle */}
          <div className="relative min-h-[22rem] overflow-hidden border border-ash-700 bg-ash-900 frame-mil">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 transition-colors duration-500"
              style={{
                background: `radial-gradient(circle at 70% 20%, ${map.accent}55, transparent 60%)`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <span
                    className="font-stencil text-xs uppercase tracking-[0.35em]"
                    style={{ color: map.accent }}
                  >
                    {map.flavor}
                  </span>
                  <h3 className="mt-3 font-display text-6xl font-black uppercase leading-[0.85] text-bone sm:text-7xl">
                    {map.name}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-smoke">
                    {map.description}
                  </p>
                </div>
                <div className="mt-8 flex gap-8 border-t border-ash-700 pt-6">
                  <Stat label="Clima" value={map.climate} accent={map.accent} />
                  <Stat label="Estilo" value={map.flavor} accent={map.accent} />
                  <Stat label="Dificultad" value="Alta" accent={map.accent} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div>
      <p className="font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
        {label}
      </p>
      <p
        className="mt-1 font-display text-xl font-bold uppercase leading-none"
        style={{ color: accent }}
      >
        {value}
      </p>
    </div>
  );
}
