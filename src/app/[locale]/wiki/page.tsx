import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, SectionLabel, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CopyChip } from "@/components/CopyChip";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "wiki" });
  return { title: tn("wiki"), description: t("subtitle") };
}

const runShots = Array.from({ length: 8 }, (_, i) => `/wiki/run-${i + 1}.webp`);
const craftShots = Array.from({ length: 11 }, (_, i) => `/wiki/craft-${i + 1}.webp`);

export default async function WikiPage() {
  const t = await getTranslations("wiki");
  const index = [
    { href: "#conexion", label: t("idxConexion") },
    { href: "#tier-map", label: t("idxTier") },
    { href: "#llaves", label: t("idxLlaves") },
    { href: "#run", label: t("idxRun") },
    { href: "#crafteos", label: t("idxCrafteos") },
  ];
  const s1steps = t.raw("s1steps") as string[];
  const tiers = t.raw("tiers") as {
    label: string;
    name: string;
    color: string;
    text: string;
  }[];
  const keys = t.raw("keys") as {
    id: string;
    color: string;
    name: string;
    opens: string;
    loot: string;
    source: string;
  }[];
  const reward = t.raw("reward") as string[];
  const runSteps = t.raw("runSteps") as { title: string; text: string }[];
  const crafts = t.raw("crafts") as { name: string; text: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title1")}
        highlight={t("title2")}
        subtitle={t("subtitle")}
      />

      {/* Índice */}
      <section className="relative -mt-4 pb-6">
        <Container>
          <div className="flex flex-wrap gap-2">
            {index.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="border border-ash-600 bg-ash-900 px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-bone/80 transition-colors hover:border-ember/60 hover:text-ember"
              >
                {i.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Conexión */}
      <section id="conexion" className="relative scroll-mt-24 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionLabel>{t("s1eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("s1title1")} <span className="text-fire">{t("s1title2")}</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="border border-ash-700 bg-ash-900 p-8">
              <p className="font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
                {site.server.title}
              </p>
              <div className="mt-5">
                <CopyChip value={`${site.server.ip}:${site.server.port}`} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-smoke">
                {t("s1desc", { slots: site.server.slots })}
              </p>
            </div>
            <div className="border border-ash-700 bg-ash-900 p-8">
              <h3 className="font-display text-xl font-bold uppercase text-bone">
                {t("s1how")}
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-smoke">
                {s1steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display font-black text-ember">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tier-map */}
      <section
        id="tier-map"
        className="relative scroll-mt-24 border-t border-ash-800 bg-ash-950 py-16 sm:py-20"
      >
        <Container>
          <Reveal>
            <SectionLabel>{t("s2eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("s2title1")} <span className="text-fire">{t("s2title2")}</span>
            </Heading>
            <p className="mt-4 max-w-xl text-base text-smoke">{t("s2desc")}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal className="relative overflow-hidden border border-ash-700 bg-ash-900 p-3 frame-mil">
              <Image
                src="/wiki/tier-map.webp"
                alt={t("s2title1")}
                width={1100}
                height={1101}
                className="h-auto w-full"
              />
            </Reveal>

            <Stagger className="space-y-3" gap={0.07}>
              {tiers.map((tier) => (
                <StaggerItem key={tier.label}>
                  <article className="flex gap-4 border border-ash-700 bg-ash-900 p-5">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-2xl font-black text-void"
                      style={{ background: tier.color }}
                    >
                      {tier.label}
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold uppercase leading-none text-bone">
                        {tier.name}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-smoke">
                        {tier.text}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal
            delay={0.1}
            className="mt-6 flex flex-col items-center justify-between gap-4 border border-ash-700 bg-ash-900 p-6 sm:flex-row"
          >
            <div className="flex items-center gap-3">
              <Icon.map className="h-6 w-6 shrink-0 text-ember" />
              <p className="text-sm leading-relaxed text-smoke">{t("s2callout")}</p>
            </div>
            <Button
              href="https://www.izurvive.com/livonia/"
              external
              variant="steel"
              className="shrink-0"
            >
              <Icon.map className="h-4 w-4" />
              {t("s2btn")}
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Llaves */}
      <section id="llaves" className="relative scroll-mt-24 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionLabel>{t("s3eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("s3title1")} <span className="text-fire">{t("s3title2")}</span>
            </Heading>
            <p className="mt-4 max-w-2xl text-base text-smoke">{t("s3desc")}</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {keys.map((k) => (
              <StaggerItem key={k.id}>
                <article className="group relative flex h-full flex-col overflow-hidden border border-ash-700 bg-ash-900">
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-1"
                    style={{ background: k.color }}
                  />
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/wiki/llave-${k.id}.webp`}
                      alt={k.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ash-900 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-7 w-7 rounded-sm border border-white/20"
                        style={{ background: k.color }}
                      />
                      <h3 className="font-display text-2xl font-bold uppercase text-bone">
                        {k.name}
                      </h3>
                    </div>
                    <dl className="mt-5 space-y-4 text-sm">
                      <Row label={t("rowOpens")} value={k.opens} />
                      <Row label={t("rowLoot")} value={k.loot} />
                      <Row label={t("rowSource")} value={k.source} />
                    </dl>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Run de Livonia */}
      <section
        id="run"
        className="relative scroll-mt-24 overflow-hidden border-y border-ash-800 bg-ash-950 py-16 sm:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-ember/10 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <SectionLabel>{t("s4eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("s4title1")} <span className="text-fire">{t("s4title2")}</span>
            </Heading>
            <p className="mt-4 max-w-2xl text-base text-smoke">{t("s4desc")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {reward.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-2 border border-ember/40 bg-ember/10 px-3 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-ember"
                >
                  <Icon.bolt className="h-4 w-4" />
                  {r}
                </span>
              ))}
            </div>
          </Reveal>

          <Stagger className="mt-12 space-y-4" gap={0.06}>
            {runSteps.map((s, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-5 border border-ash-700 bg-ash-900 p-6 transition-colors hover:border-ember/40">
                  <span className="font-display text-4xl font-black leading-none text-ash-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-bone">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-smoke">
                      {s.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.05}>
            <p className="mb-4 mt-12 font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember">
              {t("runGalleryLabel")}
            </p>
            <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
              {runShots.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt={`${t("s4title1")} ${t("s4title2")} ${i + 1}`}
                  loading="lazy"
                  data-lightbox="run"
                  className="w-full cursor-zoom-in break-inside-avoid border border-ash-700 transition-opacity hover:opacity-90"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Crafteos */}
      <section id="crafteos" className="relative scroll-mt-24 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionLabel>{t("s5eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("s5title1")} <span className="text-fire">{t("s5title2")}</span>
            </Heading>
            <p className="mt-4 max-w-2xl text-base text-smoke">{t("s5desc")}</p>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {crafts.map((c) => (
              <StaggerItem key={c.name}>
                <article className="flex h-full gap-5 border border-ash-700 bg-ash-900 p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ash-600 bg-ash-800 text-ember">
                    <Icon.shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-bone">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-smoke">
                      {c.text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.05}>
            <p className="mb-4 mt-12 font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember">
              {t("guidesLabel")}
            </p>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {craftShots.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt={`${t("guidesLabel")} ${i + 1}`}
                  loading="lazy"
                  data-lightbox="craft"
                  className="w-full cursor-zoom-in break-inside-avoid border border-ash-700 transition-opacity hover:opacity-90"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative pb-24">
        <Container>
          <div className="flex flex-col items-center gap-5 border border-ash-700 bg-ash-950 p-10 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-bone sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              {t("ctaText")}
            </p>
            <Button href={site.social.discord} external>
              <Icon.discord className="h-5 w-5" />
              {t("ctaBtn")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
        {label}
      </dt>
      <dd className="mt-0.5 text-bone/90">{value}</dd>
    </div>
  );
}
