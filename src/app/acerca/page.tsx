import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { Icon } from "@/components/icons";
import { site, mods } from "@/lib/site";

export const metadata: Metadata = {
  title: "El servidor",
  description:
    "Conoce Black Legend DayZ: nuestra filosofía, las cifras del servidor, los mods y el equipo que mantiene viva la leyenda.",
};

const stats = [
  { label: "Slots", value: site.server.slots, pending: false },
  { label: "Perspectiva", value: "1PP", pending: false },
  { label: "Mods", value: String(mods.length), pending: false },
];

const pillars = [
  {
    icon: "skull" as const,
    title: "Inmersión real",
    text: "Nada de atajos arcade. Aquí el realismo manda: gestión de temperatura, enfermedades, hambre y la amenaza constante de otros jugadores.",
  },
  {
    icon: "shield" as const,
    title: "Comunidad por encima de todo",
    text: "Un staff cercano, decisiones transparentes y una comunidad hispana que lleva años forjándose. Tu voz cuenta.",
  },
  {
    icon: "flame" as const,
    title: "Contenido constante",
    text: "Eventos semanales, mapas rotativos y mejoras continuas. El servidor evoluciona contigo, nunca se queda quieto.",
  },
];

export default function AcercaPage() {
  return (
    <>
      <PageHero
        eyebrow="El servidor"
        title="Más que un servidor."
        highlight="Una leyenda."
        subtitle="Black Legend nació de la idea de que DayZ podía ser más justo, más intenso y más humano. Esta es nuestra historia y lo que nos mueve."
      />

      {/* Manifiesto */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <SectionLabel>Nuestra filosofía</SectionLabel>
              <Heading className="mt-5">
                Forjados en el <span className="text-fire">fuego</span>.
              </Heading>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-smoke">
                <p>
                  Empezamos como un puñado de supervivientes cansados de
                  servidores pay-to-win, llenos de cheaters y sin alma. Queríamos
                  algo distinto: un lugar donde sobrevivir significara algo, donde
                  cada bala contara y cada alianza pesara.
                </p>
                <p>
                  Hoy Black Legend vive en{" "}
                  <span className="text-bone">Livonia</span>: un mapa compacto y
                  100% PvP donde cada partida es una guerra. Vanilla+ en primera
                  persona, con una{" "}
                  <span className="text-bone">Run end-game</span> que se ha vuelto
                  legendaria. Pero el espíritu sigue siendo el mismo del primer
                  día.
                </p>
                <p className="border-l-2 border-ember/60 pl-5 font-display text-xl uppercase tracking-wide text-bone">
                  &ldquo;No importa cuántas veces caigas. Importa cuántas veces
                  renazcas.&rdquo;
                </p>
              </div>
              <div className="mt-9">
                <Button href={site.social.discord} external>
                  <Icon.discord className="h-5 w-5" />
                  Conoce a la comunidad
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative">
              <div className="relative mx-auto aspect-square max-w-md">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-ember/15 blur-3xl"
                />
                <Image
                  src="/brand/0logosoloBlackLegend.png"
                  alt="Fénix de Black Legend"
                  width={520}
                  height={520}
                  className="relative h-full w-full animate-flicker object-contain drop-glow"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cifras */}
      <section className="relative border-y border-ash-800 bg-ash-950 py-20">
        <Container>
          <Stagger className="grid grid-cols-3 gap-px overflow-hidden border border-ash-700 bg-ash-700">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex flex-col items-center justify-center gap-2 bg-ash-900 px-4 py-10 text-center">
                  <span className="font-display text-5xl font-black uppercase text-fire sm:text-6xl">
                    {/^\d+$/.test(s.value) ? (
                      <CountUp value={Number(s.value)} />
                    ) : (
                      s.value
                    )}
                  </span>
                  <span className="font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-smoke">
                    {s.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Pilares */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>
              <span className="mx-auto">Lo que nos define</span>
            </SectionLabel>
            <Heading className="mt-5">Tres pilares</Heading>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => {
              const IconCmp = Icon[p.icon];
              return (
                <StaggerItem key={p.title}>
                  <article className="group h-full border border-ash-700 bg-ash-900 p-8 transition-colors hover:border-ember/40">
                    <div className="flex h-12 w-12 items-center justify-center border border-ash-600 bg-ash-800 text-ember transition-all group-hover:shadow-[0_0_22px_-6px_rgba(255,106,26,0.8)]">
                      <IconCmp className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold uppercase text-bone">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-smoke">
                      {p.text}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Mods + Staff (placeholders) */}
      <section className="relative pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal className="relative overflow-hidden border border-ash-700 bg-ash-900 p-9">
              <SectionLabel>Mods & configuración</SectionLabel>
              <h3 className="mt-4 font-display text-3xl font-bold uppercase text-bone">
                Equipado para la guerra
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-smoke">
                Una selección cuidada de mods que enriquece la experiencia sin
                romper el equilibrio vanilla. Se descargan solos al conectar.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {mods.map((m) => (
                  <a
                    key={m}
                    href={`https://steamcommunity.com/workshop/browse/?appid=221100&searchtext=${encodeURIComponent(m)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 border border-ash-600 bg-ash-800 px-3 py-1.5 font-mono text-xs text-ember transition-colors hover:border-ember/60 hover:bg-ash-700"
                  >
                    {m}
                    <Icon.arrow className="h-3 w-3 -rotate-45 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
              <p className="mt-3 font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-ash-500">
                Clic en un mod para verlo en el Steam Workshop
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <JoinCTA />
    </>
  );
}
