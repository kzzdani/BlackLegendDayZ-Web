import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { donationTiers, PLACEHOLDER, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Donaciones",
  description:
    "Apoya a Black Legend DayZ y mantén el servidor vivo. Packs de donación con recompensas cosméticas. Nunca pay-to-win.",
};

export default function DonacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Donaciones"
        title="Mantén viva"
        highlight="la llama."
        subtitle="El servidor se sostiene gracias a su comunidad. Cada aportación va directa a hosting, mejoras y eventos. A cambio, recibes recompensas — siempre cosméticas, nunca ventaja injusta."
      />

      {/* Packs */}
      <section className="relative py-24 sm:py-28">
        <Container>
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {donationTiers.map((tier) => (
              <StaggerItem key={tier.id} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden border bg-ash-900 p-8 transition-all duration-300",
                    tier.highlight
                      ? "border-ember/60 bg-ash-850 shadow-[0_0_50px_-20px_rgba(255,106,26,0.6)] lg:-mt-4 lg:mb-4"
                      : "border-ash-700 hover:border-ash-500",
                  )}
                >
                  {tier.highlight && (
                    <>
                      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blood via-ember to-gold" />
                      <span className="absolute right-6 top-6 border border-ember/50 bg-ember/10 px-3 py-1 font-stencil text-[0.5rem] uppercase tracking-[0.25em] text-ember">
                        Popular
                      </span>
                    </>
                  )}

                  <h3 className="font-display text-3xl font-black uppercase text-bone">
                    {tier.name}
                  </h3>

                  <div className="mt-5 flex items-end gap-2">
                    {tier.price !== PLACEHOLDER ? (
                      <span className="font-display text-6xl font-black text-fire">
                        {tier.price}
                      </span>
                    ) : (
                      <span className="font-display text-5xl font-black text-ash-500">
                        ··€
                      </span>
                    )}
                    <span className="mb-2 font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
                      pago {tier.period}
                    </span>
                  </div>

                  <ul className="mt-8 flex-1 space-y-4">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-bone/90">
                        <Icon.check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tier.highlight ? "text-ember" : "text-smoke",
                          )}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9">
                    <Button
                      href={site.social.discord}
                      external
                      variant={tier.highlight ? "fire" : "steel"}
                      className="w-full"
                    >
                      Donar
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-6 text-center font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-ash-500">
            Precios y contenido de los packs pendientes de confirmar con el equipo
          </p>
        </Container>
      </section>

      {/* Transparencia */}
      <section className="relative border-t border-ash-800 bg-ash-950 py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionLabel>Juego limpio</SectionLabel>
              <Heading className="mt-5">
                Nunca <span className="text-fire">pay-to-win</span>.
              </Heading>
              <p className="mt-6 text-base leading-relaxed text-smoke">
                Lo prometemos y lo cumplimos: ninguna donación te dará ventaja en
                combate. Las recompensas son cosméticas, de comodidad o de
                reconocimiento. El que gana, gana por habilidad.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: "shield" as const, t: "100% transparente", d: "Sabes a dónde va cada euro: hosting, mods y eventos." },
                { icon: "flame" as const, t: "Solo cosmético", d: "Skins, roles y prioridad de cola. Cero ventaja de combate." },
                { icon: "users" as const, t: "Por la comunidad", d: "Donar es opcional. El servidor es gratis para todos, siempre." },
                { icon: "bolt" as const, t: "Pago seguro", d: "Gestionado por pasarelas externas seguras vía Discord." },
              ].map((b) => {
                const IconCmp = Icon[b.icon];
                return (
                  <StaggerItem key={b.t}>
                    <div className="flex h-full gap-4 border border-ash-700 bg-ash-900 p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-ash-600 bg-ash-800 text-ember">
                        <IconCmp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold uppercase text-bone">
                          {b.t}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-smoke">
                          {b.d}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </section>
    </>
  );
}
