import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { wikiSections, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wiki",
  description:
    "La guía de supervivencia de Black Legend DayZ: primeros pasos, mecánicas, loot, bases y todo lo que necesitas para no morir.",
};

export default function WikiPage() {
  return (
    <>
      <PageHero
        eyebrow="Wiki"
        title="Guía de"
        highlight="supervivencia."
        subtitle="Todo lo que necesitas saber para sobrevivir en Black Legend. Desde tus primeros minutos hasta dominar el mapa. Una base de conocimiento en constante crecimiento."
      />

      {/* Buscador (placeholder visual) */}
      <section className="relative -mt-4 pb-4">
        <Container className="max-w-3xl">
          <div className="flex items-center gap-4 border border-ash-700 bg-ash-900 px-5 py-4 opacity-90">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="h-5 w-5 text-smoke"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <span className="flex-1 font-body text-sm text-ash-400">
              Buscar en la wiki… (próximamente)
            </span>
            <span className="hidden border border-ash-600 px-2 py-1 font-stencil text-[0.5rem] uppercase tracking-[0.2em] text-ash-500 sm:block">
              Pronto
            </span>
          </div>
        </Container>
      </section>

      {/* Secciones */}
      <section className="relative py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionLabel>Categorías</SectionLabel>
            <Heading className="mt-5">
              Explora la <span className="text-fire">base de conocimiento</span>
            </Heading>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {wikiSections.map((section, i) => (
              <StaggerItem key={section.id}>
                <article className="group relative flex h-full flex-col overflow-hidden border border-ash-700 bg-ash-900 p-8 transition-colors hover:border-ember/40">
                  <div className="flex items-center justify-between">
                    <span className="font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember">
                      0{i + 1}
                    </span>
                    <Icon.arrow className="h-5 w-5 -translate-x-2 text-ash-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold uppercase text-bone">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {section.summary}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-ash-700 pt-5">
                    {section.articles.map((a) => (
                      <li
                        key={a}
                        className="flex items-center gap-3 text-sm text-bone/80 transition-colors hover:text-ember"
                      >
                        <span className="h-px w-4 bg-ash-500" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-8 text-center font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-ash-500">
            Contenido de los artículos en desarrollo · se ampliará con el equipo
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative pb-24">
        <Container>
          <div className="flex flex-col items-center gap-5 border border-ash-700 bg-ash-950 p-10 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-bone sm:text-4xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              La comunidad del Discord siempre echa una mano. Pregunta y alguien
              te guiará por el camino de la supervivencia.
            </p>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              Preguntar en Discord
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
