import Image from "next/image";
import { livonia, tiers } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";

export function MapsSection() {
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Texto */}
          <Reveal>
            <SectionLabel>El mapa</SectionLabel>
            <Heading className="mt-5">
              Bienvenido a <span className="text-fire">Livonia</span>
            </Heading>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke">
              {livonia.description}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {livonia.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-bone/90"
                >
                  <Icon.flame className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-8 border-t border-ash-700 pt-6">
              <Stat label="Clima" value={livonia.climate.split(" · ")[0]} />
              <Stat label="Perspectiva" value="1ª persona" />
              <Stat label="Estilo" value="100% PvP" />
            </div>
          </Reveal>

          {/* Tier-map real */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden border border-ash-700 bg-ash-900 p-3 frame-mil">
              <span className="absolute left-5 top-5 z-10 bg-void/70 px-3 py-1 font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember backdrop-blur-sm">
                Tier-map · Livonia
              </span>
              <Image
                src="/wiki/tier-map.webp"
                alt="Tier-map de Livonia con las zonas 1, 2 y 3"
                width={1080}
                height={976}
                className="h-auto w-full"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {tiers.map((t) => (
                <div
                  key={t.n}
                  className="flex items-center gap-2 border border-ash-700 bg-ash-900 px-3 py-2.5"
                >
                  <span
                    className="h-4 w-4 shrink-0"
                    style={{ background: t.color }}
                  />
                  <span className="font-display text-sm font-bold uppercase leading-none text-bone">
                    {t.n} · {t.zone}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-ash-500">
              Guía de tiers completa en la{" "}
              <a href="/wiki#tier-map" className="text-ember">
                Wiki
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-bold uppercase leading-none text-ember">
        {value}
      </p>
    </div>
  );
}
