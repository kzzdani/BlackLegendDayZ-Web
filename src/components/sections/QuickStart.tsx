import { quickStart, site } from "@/lib/site";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";

export function QuickStart() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>Cómo empezar</SectionLabel>
            <Heading className="mt-5">
              De cero a <span className="text-fire">superviviente</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              Empezar ahora
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-ash-700 bg-ash-700 md:grid-cols-2 lg:grid-cols-4">
          {quickStart.map((s, i) => (
            <StaggerItem key={s.title}>
              <article className="group relative h-full bg-ash-900 p-8 transition-colors hover:bg-ash-850">
                <span className="font-display text-6xl font-black leading-none text-ash-800 transition-colors group-hover:text-ember/30">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight text-bone">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{s.text}</p>
                {i < quickStart.length - 1 && (
                  <Icon.arrow className="absolute right-6 top-8 hidden h-5 w-5 text-ash-600 lg:block" />
                )}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
