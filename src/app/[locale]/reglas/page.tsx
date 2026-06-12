import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { RulesAccordion } from "@/components/RulesAccordion";
import { Icon } from "@/components/icons";
import { site, raidSchedule } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "rules" });
  return { title: tn("reglas"), description: t("subtitle") };
}

export default async function ReglasPage() {
  const t = await getTranslations("rules");
  const days = t.raw("days") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title1")}
        highlight={t("title2")}
        subtitle={t("subtitle")}
      />

      <section className="relative py-20 sm:py-24">
        <Container className="max-w-4xl">
          <Reveal className="mb-10 flex items-start gap-4 border-l-2 border-ember/60 bg-ash-900/60 p-6">
            <Icon.shield className="mt-0.5 h-6 w-6 shrink-0 text-ember" />
            <p className="text-sm leading-relaxed text-smoke">
              {t("noticePre")}{" "}
              <a
                href={site.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember underline-offset-2 hover:underline"
              >
                {t("noticeLink")}
              </a>
              {t("noticePost")}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <RulesAccordion />
          </Reveal>

          {/* Horario de raid */}
          <Reveal delay={0.05} className="mt-10 border border-ash-700 bg-ash-900 p-8">
            <div className="flex items-center gap-3">
              <Icon.bolt className="h-6 w-6 text-ember" />
              <h2 className="font-display text-2xl font-bold uppercase text-bone">
                {t("scheduleTitle")}
              </h2>
              <span className="ml-auto font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
                UTC+2
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              {t("scheduleNote")}
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {raidSchedule.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-ash-700 bg-ash-850 px-4 py-3"
                >
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-bone">
                    {days[i]}
                  </span>
                  <span className="font-mono text-sm text-ember">{r.hours}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-12 flex flex-col items-center gap-5 border border-ash-700 bg-ash-900 p-9 text-center"
          >
            <h2 className="font-display text-3xl font-bold uppercase text-bone">
              {t("reportTitle")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              {t("reportText")}
            </p>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              {t("reportBtn")}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
