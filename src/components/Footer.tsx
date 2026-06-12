import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui";
import { ShareButtons } from "@/components/ShareButtons";

const navItems = [
  { href: "/", key: "inicio" },
  { href: "/acerca", key: "servidor" },
  { href: "/donaciones", key: "donaciones" },
  { href: "/reglas", key: "reglas" },
  { href: "/wiki", key: "wiki" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ash-700/70 bg-ash-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-ember/10 blur-3xl"
      />
      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/0logosoloBlackLegendNuevo2.png"
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 drop-glow"
              />
              <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight">
                Black <span className="text-fire">Legend</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-smoke">
              {t("tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={site.social.discord} label="Discord">
                <Icon.discord className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <Icon.youtube className="h-5 w-5" />
              </SocialLink>
            </div>

            <div className="mt-7">
              <p className="eyebrow mb-3">{t("shareTitle")}</p>
              <ShareButtons />
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="eyebrow mb-5">{t("navTitle")}</h3>
            <ul className="space-y-3">
              {navItems.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-display text-sm uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                  >
                    {tn(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="eyebrow mb-5">{t("communityTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={site.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  {t("discordOfficial")}
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  {t("youtubeChannel")}
                </a>
              </li>
              <li>
                <a
                  href={site.social.vote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  {t("voteServer")}
                </a>
              </li>
              <li>
                <Link
                  href="/donaciones"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  {t("supportServer")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ash-700/70 pt-6 text-xs text-smoke sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. {t("rights")}
          </p>
          <p className="text-ash-400">{t("disclaimer")}</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-ash-600 bg-ash-800/60 text-bone/70 transition-all duration-300 hover:border-ember/70 hover:text-ember hover:shadow-[0_0_20px_-4px_rgba(255,106,26,0.6)]"
    >
      {children}
    </a>
  );
}
