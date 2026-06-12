import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const shots = [
  { src: "/gallery/real-1.webp", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/gallery/real-2.webp", span: "" },
  { src: "/gallery/real-3.webp", span: "" },
  { src: "/wiki/run-8.webp", span: "" },
  { src: "/wiki/run-1.webp", span: "" },
  { src: "/wiki/llave-azul.webp", span: "" },
];

export async function Gallery() {
  const t = await getTranslations("gallery");
  const captions = t.raw("captions") as string[];

  return (
    <section className="relative overflow-hidden border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
            <Heading className="mt-5">
              {t("title1")} <span className="text-fire">{t("title2")}</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-stencil text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-ash-400">
              {t("note")}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <StaggerItem key={shot.src} className={shot.span}>
              <figure
                data-lightbox="gallery"
                data-full={shot.src}
                className="group relative h-full w-full cursor-zoom-in overflow-hidden border border-ash-700 scanlines"
              >
                <Image
                  src={shot.src}
                  alt={captions[i] ?? ""}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover brightness-[0.78] grayscale-[0.45] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
                <span className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-ember/0 transition-all duration-500 group-hover:ring-ember/40" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span className="translate-y-1 font-display text-base font-bold uppercase leading-tight tracking-wide text-bone opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {captions[i]}
                  </span>
                  <span className="font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-ember/80">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
