import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { Button, Container } from "@/components/ui";
import { Embers } from "@/components/Embers";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { CommunityCount } from "@/components/CommunityCount";

export async function JoinCTA() {
  const t = await getTranslations("join");
  return (
    <section className="relative overflow-hidden border-t border-ash-800 py-28 sm:py-36">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-ash-950 to-void" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/15 blur-[110px]"
      />
      <div className="absolute inset-0">
        <Embers density={0.0001} />
      </div>

      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow justify-center">{t("eyebrow")}</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-black uppercase leading-[0.88] text-bone sm:text-7xl md:text-8xl">
            {t("title1")}
            <br />
            <span className="text-fire">{t("title2")}</span>
          </h2>
          <div className="mx-auto mt-7 max-w-xl">
            <CommunityCount />
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={site.social.discord} external size="lg">
              <Icon.discord className="h-5 w-5" />
              {t("ctaDiscord")}
            </Button>
            <Button href="/donaciones" variant="steel" size="lg">
              {t("ctaSupport")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
