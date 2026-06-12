import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon } from "@/components/icons";

export async function QuickStart() {
  const t = await getTranslations("quickstart");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("title1")} <span className="text-fire">{t("title2")}</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              {t("button")}
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-ash-700 bg-ash-700 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <article className="group relative h-full bg-ash-900 p-8 transition-colors hover:bg-ash-850">
                <span className="font-display text-6xl font-black leading-none text-ash-800 transition-colors group-hover:text-ember/30">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight text-bone">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{s.text}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
