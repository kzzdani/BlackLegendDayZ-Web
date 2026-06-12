import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { WipeDays } from "@/components/WipeDays";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { Icon, type IconName } from "@/components/icons";
import { site, mods } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: tn("servidor"), description: t("subtitle") };
}

const pillarIcons: IconName[] = ["skull", "shield", "flame"];

export default async function AcercaPage() {
  const t = await getTranslations("about");
  const pillars = t.raw("pillars") as { title: string; text: string }[];
  const stats = [
    { label: t("statSlots"), value: site.server.slots },
    { label: t("statPerspective"), value: "1PP" },
    { label: t("statMods"), value: String(mods.length) },
    { label: t("statWipe"), value: "__wipe__" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title1")}
        highlight={t("title2")}
        subtitle={t("subtitle")}
      />

      {/* Manifiesto */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <SectionLabel>{t("philEyebrow")}</SectionLabel>
              <Heading className="mt-5">
                {t("philTitle1")} <span className="text-fire">{t("philTitle2")}</span>.
              </Heading>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-smoke">
                <p>{t("p1")}</p>
                <p>
                  {t("p2pre")} <span className="text-bone">Livonia</span>
                  {t("p2mid")} <span className="text-bone">{t("p2run")}</span>{" "}
                  {t("p2post")}
                </p>
                <p className="border-l-2 border-ember/60 pl-5 font-display text-xl uppercase tracking-wide text-bone">
                  {t("quote")}
                </p>
              </div>
              <div className="mt-9">
                <Button href={site.social.discord} external>
                  <Icon.discord className="h-5 w-5" />
                  {t("philButton")}
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
                  alt="Black Legend"
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
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden border border-ash-700 bg-ash-700 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex flex-col items-center justify-center gap-2 bg-ash-900 px-4 py-10 text-center">
                  <span className="font-display text-5xl font-black uppercase text-fire sm:text-6xl">
                    {s.value === "__wipe__" ? (
                      <WipeDays />
                    ) : /^\d+$/.test(s.value) ? (
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
              <span className="mx-auto">{t("pillarsEyebrow")}</span>
            </SectionLabel>
            <Heading className="mt-5">{t("pillarsTitle")}</Heading>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => {
              const IconCmp = Icon[pillarIcons[i]];
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

      {/* Mods */}
      <section className="relative pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal className="relative overflow-hidden border border-ash-700 bg-ash-900 p-9">
              <SectionLabel>{t("modsEyebrow")}</SectionLabel>
              <h3 className="mt-4 font-display text-3xl font-bold uppercase text-bone">
                {t("modsTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-smoke">
                {t("modsText")}
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
                {t("modsNote")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <JoinCTA />
    </>
  );
}
