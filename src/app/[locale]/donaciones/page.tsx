import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/icons";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "donations" });
  return { title: tn("donaciones"), description: t("subtitle") };
}

const cardIcons: IconName[] = ["shield", "flame", "users", "bolt"];

export default async function DonacionesPage() {
  const t = await getTranslations("donations");
  const cards = t.raw("cards") as { t: string; d: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title1")}
        highlight={t("title2")}
        subtitle={t("subtitle")}
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
                {t("cardTitle1")}
                <br />
                <span className="text-fire">{t("cardTitle2")}</span>
              </Heading>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-smoke">
                {t("cardText")}
              </p>
              <div className="mt-9">
                <Button href={site.social.discord} external size="lg">
                  <Icon.discord className="h-5 w-5" />
                  {t("donateBtn")}
                </Button>
              </div>
              <p className="mt-5 font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-ash-500">
                {t("donateNote")}
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
              <SectionLabel>{t("transpEyebrow")}</SectionLabel>
              <Heading className="mt-5">
                {t("transpTitle1")}{" "}
                <span className="text-fire">{t("transpTitle2")}</span>.
              </Heading>
              <p className="mt-6 text-base leading-relaxed text-smoke">
                {t("transpText")}
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {cards.map((b, i) => {
                const IconCmp = Icon[cardIcons[i]];
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
              {t("voteTitle")}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              {t("voteText")}
            </p>
            <Button href={site.social.vote} external variant="steel">
              <Icon.flame className="h-5 w-5" />
              {t("voteBtn")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
