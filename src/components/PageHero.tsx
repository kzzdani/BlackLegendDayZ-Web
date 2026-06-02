import Link from "next/link";
import { Container } from "@/components/ui";
import { Embers } from "@/components/Embers";

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-20">
      {/* Fondo */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-ash-950 via-void to-void" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.12] vignette"
        style={{
          backgroundImage: "url(/brand/BIG_FONDO.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-20 bg-grid opacity-50 vignette" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[40vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-ember/12 blur-[90px]"
      />
      <div className="absolute inset-0 -z-10">
        <Embers density={0.00006} />
      </div>

      <Container className="relative pb-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 font-stencil text-[0.6rem] uppercase tracking-[0.25em] text-smoke">
          <Link href="/" className="transition-colors hover:text-ember">
            Inicio
          </Link>
          <span className="text-ash-500">/</span>
          <span className="text-ember">{eyebrow}</span>
        </nav>

        <h1 className="font-display text-6xl font-black uppercase leading-[0.85] text-bone sm:text-7xl md:text-8xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-fire">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
