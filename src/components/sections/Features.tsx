import { getTranslations } from "next-intl/server";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/icons";

export async function Features() {
  const t = await getTranslations("features");
  const items = t.raw("items") as {
    icon: string;
    title: string;
    text: string;
  }[];

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionLabel>{t("eyebrow")}</SectionLabel>
          <Heading className="mt-5">
            {t("title1")}
            <br />
            <span className="text-fire">{t("title2")}</span>
          </Heading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke">
            {t("subtitle")}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-ash-700/70 bg-ash-700/70 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => {
            const IconCmp = Icon[f.icon as IconName];
            return (
              <StaggerItem key={f.title}>
                <article className="group relative h-full bg-ash-900 p-8 transition-colors duration-300 hover:bg-ash-850">
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ember to-gold transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex h-12 w-12 items-center justify-center border border-ash-600 bg-ash-800 text-ember transition-all duration-300 group-hover:border-ember/60 group-hover:shadow-[0_0_22px_-6px_rgba(255,106,26,0.8)]">
                    <IconCmp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-bone">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {f.text}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
