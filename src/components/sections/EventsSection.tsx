import { getTranslations } from "next-intl/server";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export async function EventsSection() {
  const t = await getTranslations("events");
  const items = t.raw("items") as {
    name: string;
    tag: string;
    description: string;
  }[];

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("title1")} <span className="text-fire">{t("title2")}</span>.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base text-smoke">{t("subtitle")}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((e, i) => (
            <StaggerItem key={e.name}>
              <article className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden border border-ash-700 bg-ash-900 p-7 transition-colors duration-300 hover:border-ember/40">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="border border-ember/40 bg-ember/10 px-3 py-1 font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-ember">
                    {e.tag}
                  </span>
                  <span className="font-display text-5xl font-black text-ash-800 transition-colors group-hover:text-ash-700">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase leading-none text-bone">
                    {e.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {e.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
