import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";

export async function MapsSection() {
  const t = await getTranslations("maps");
  const highlights = t.raw("highlights") as string[];
  const tiers = t.raw("tiers") as {
    label: string;
    name: string;
    color: string;
    text: string;
  }[];

  return (
    <section className="relative overflow-hidden border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url(/brand/bl_01sin_logo_01.png)", backgroundSize: "520px" }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Texto */}
          <Reveal>
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("title1")} <span className="text-fire">{t("title2")}</span>
            </Heading>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke">
              {t("description")}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-bone/90">
                  <Icon.flame className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-8 border-t border-ash-700 pt-6">
              <Stat label={t("statClimate")} value={t("statClimateValue")} />
              <Stat label={t("statPerspective")} value={t("statPerspectiveValue")} />
              <Stat label={t("statStyle")} value={t("statStyleValue")} />
            </div>
          </Reveal>

          {/* Tier-map real */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden border border-ash-700 bg-ash-900 p-3 frame-mil">
              <span className="absolute left-5 top-5 z-10 bg-void/70 px-3 py-1 font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-ember backdrop-blur-sm">
                {t("tierMapLabel")}
              </span>
              <Image
                src="/wiki/tier-map.webp"
                alt={t("tierMapLabel")}
                width={1100}
                height={1101}
                className="h-auto w-full"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {tiers.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-center gap-2 border border-ash-700 bg-ash-900 px-3 py-2.5"
                >
                  <span className="h-4 w-4 shrink-0" style={{ background: tier.color }} />
                  <span className="font-display text-sm font-bold uppercase leading-none text-bone">
                    {tier.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-ash-500">
              {t("guidePre")}{" "}
              <Link href="/wiki#tier-map" className="text-ember">
                {t("guideLink")}
              </Link>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-bold uppercase leading-none text-ember">
        {value}
      </p>
    </div>
  );
}
