import { livonia, tiers } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
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

          {/* Tier-map */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden border border-ash-700 bg-ash-900 p-7 frame-mil">
              <p className="font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember">
                Tier-map · zonas de loot
              </p>
              <Stagger className="mt-5 space-y-3" gap={0.08}>
                {tiers.map((t) => (
                  <StaggerItem key={t.n}>
                    <div className="group flex gap-4 border border-ash-700 bg-ash-850 p-4 transition-colors hover:border-ash-500">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-2xl font-black text-void"
                        style={{ background: t.color }}
                      >
                        {t.n}
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold uppercase leading-none text-bone">
                          {t.name}{" "}
                          <span
                            className="text-sm font-semibold"
                            style={{ color: t.color }}
                          >
                            · {t.zone}
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-smoke">
                          {t.text}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-4 font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-ash-500">
                Mapa de tiers detallado · disponible en el Discord
              </p>
            </div>
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
