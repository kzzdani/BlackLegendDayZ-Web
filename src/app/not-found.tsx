import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { Embers } from "@/components/Embers";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Perdido en Livonia",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-ash-950 via-void to-void" />
      <div className="absolute inset-0 -z-20 bg-grid opacity-50 vignette" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/15 blur-[90px]"
      />
      <div className="absolute inset-0 -z-10">
        <Embers density={0.0001} />
      </div>

      <div className="relative">
        <Image
          src="/brand/0logosoloBlackLegend.png"
          alt=""
          width={180}
          height={180}
          className="mx-auto h-28 w-28 animate-flicker drop-glow sm:h-32 sm:w-32"
        />
        <p
          className="mt-6 font-display font-black leading-none text-fire"
          style={{ fontSize: "clamp(5rem, 18vw, 11rem)" }}
        >
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-bone sm:text-4xl">
          Te has perdido en Livonia
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-smoke">
          Esta zona no existe en el mapa… o ya la han raideado. Vuelve a terreno
          conocido antes de que caiga la noche.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            <Icon.arrow className="h-4 w-4 rotate-180" />
            Volver al inicio
          </Button>
          <Button href={site.social.discord} external variant="steel" size="lg">
            <Icon.discord className="h-5 w-5" />
            Pedir ayuda en Discord
          </Button>
        </div>
      </div>
    </section>
  );
}
