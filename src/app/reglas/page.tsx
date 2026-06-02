import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { RulesAccordion } from "@/components/RulesAccordion";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reglas",
  description:
    "Las normas de Black Legend DayZ. Convivencia, juego limpio, bases y sanciones. Léelas antes de entrar al servidor.",
};

export default function ReglasPage() {
  return (
    <>
      <PageHero
        eyebrow="Reglas"
        title="El código"
        highlight="del superviviente."
        subtitle="Unas pocas normas claras mantienen el servidor justo y divertido para todos. Conectarte implica conocerlas y aceptarlas."
      />

      <section className="relative py-20 sm:py-24">
        <Container className="max-w-4xl">
          <Reveal className="mb-10 flex items-start gap-4 border-l-2 border-ember/60 bg-ash-900/60 p-6">
            <Icon.shield className="mt-0.5 h-6 w-6 shrink-0 text-ember" />
            <p className="text-sm leading-relaxed text-smoke">
              Estas reglas son una base y pueden ampliarse o ajustarse. La versión
              vigente y definitiva siempre es la publicada en el{" "}
              <a
                href={site.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember underline-offset-2 hover:underline"
              >
                Discord oficial
              </a>
              . Ante cualquier duda, abre un ticket.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <RulesAccordion />
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-5 border border-ash-700 bg-ash-900 p-9 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-bone">
              ¿Has visto a un infractor?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              Reporta cheaters, comportamientos tóxicos o bugs abriendo un ticket
              en nuestro Discord. El staff actúa rápido.
            </p>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              Abrir un ticket
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
