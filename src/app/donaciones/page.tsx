import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donaciones",
  description:
    "Apoya a Black Legend DayZ. Donaciones 100% voluntarias para mantener el servidor: sin ventajas, sin recompensas, sin pay-to-win.",
};

export default function DonacionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Donaciones"
        title="Apoya"
        highlight="el servidor."
        subtitle="Black Legend es y será siempre gratis. Si te apetece echar una mano para cubrir los gastos del servidor, cualquier aportación suma — de forma totalmente voluntaria y sin recibir nada a cambio."
      />

      {/* Donar */}
      <section className="relative py-20 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden border border-ember/40 bg-ash-900 p-10 text-center shadow-[0_0_60px_-25px_rgba(255,106,26,0.6)] sm:p-14">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blood via-ember to-gold" />
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-ember/50 bg-ember/10 text-ember">
                <Icon.flame className="h-8 w-8" />
              </div>
              <Heading className="mt-7 text-4xl sm:text-5xl">
                Una aportación,
                <br />
                <span className="text-fire">cero ventajas</span>
              </Heading>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-smoke">
                Las donaciones son 100% voluntarias y no otorgan ningún objeto,
                rol ni ventaja dentro del juego. Van íntegras a mantener el
                servidor vivo: hosting, mods y mejoras.
              </p>
              <div className="mt-9">
                <Button href={site.social.discord} external size="lg">
                  <Icon.discord className="h-5 w-5" />
                  Donar vía Discord
                </Button>
              </div>
              <p className="mt-5 font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-ash-500">
                Escríbenos en el Discord y te indicamos cómo hacerlo
              </p>
            </div>
          </Reveal>
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
                Lo prometemos y lo cumplimos: donar no te da absolutamente nada en
                el juego. El que gana, gana por habilidad. Donar es solo una forma
                de apoyar el proyecto si te apetece y puedes.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "shield" as const,
                  t: "Sin ventajas",
                  d: "Cero objetos, roles o ventaja de combate. Ninguna donación te beneficia en partida.",
                },
                {
                  icon: "flame" as const,
                  t: "100% al servidor",
                  d: "Cada aportación va a hosting, mods y mejoras. Nada más.",
                },
                {
                  icon: "users" as const,
                  t: "Siempre voluntario",
                  d: "El servidor es gratis para todos, siempre. Donar es totalmente opcional.",
                },
                {
                  icon: "bolt" as const,
                  t: "Con cabeza",
                  d: "Dona solo lo que te sobre. Lo primero es tu bienestar, esto es un juego.",
                },
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

      {/* Votar gratis */}
      <section className="relative py-20">
        <Container>
          <div className="flex flex-col items-center gap-4 border border-ash-700 bg-ash-900 p-10 text-center">
            <h3 className="font-display text-2xl font-bold uppercase text-bone sm:text-3xl">
              ¿No puedes donar? Apóyanos gratis
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              Vota por el servidor cada día en Top-Games. Es gratis, tarda 10
              segundos y nos ayuda a crecer y a llegar a más supervivientes.
            </p>
            <Button href={site.social.vote} external variant="steel">
              <Icon.flame className="h-5 w-5" />
              Vota el servidor
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
