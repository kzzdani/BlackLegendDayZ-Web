import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ash-700/70 bg-ash-950">
      {/* Resplandor inferior */}
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
              {site.tagline}. Un proyecto de la comunidad hispana de DayZ.
              Sobrevive, conquista y renace de las cenizas.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={site.social.discord} label="Discord">
                <Icon.discord className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <Icon.youtube className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="eyebrow mb-5">Navegación</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-display text-sm uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="eyebrow mb-5">Comunidad</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={site.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  Discord oficial
                </Link>
              </li>
              <li>
                <Link
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  Canal de YouTube
                </Link>
              </li>
              <li>
                <Link
                  href={site.social.vote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  Vota el servidor
                </Link>
              </li>
              <li>
                <Link
                  href="/donaciones"
                  className="font-display uppercase tracking-wide text-bone/70 transition-colors hover:text-ember"
                >
                  Apoya el servidor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ash-700/70 pt-6 text-xs text-smoke sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. Todos los derechos
            reservados.
          </p>
          <p className="text-ash-400">
            No afiliado con Bohemia Interactive. DayZ es marca de sus respectivos
            propietarios.
          </p>
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
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-ash-600 bg-ash-800/60 text-bone/70 transition-all duration-300 hover:border-ember/70 hover:text-ember hover:shadow-[0_0_20px_-4px_rgba(255,106,26,0.6)]"
    >
      {children}
    </Link>
  );
}
