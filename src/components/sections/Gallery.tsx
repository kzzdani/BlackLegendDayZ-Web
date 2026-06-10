import Image from "next/image";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

// Mezcla de capturas REALES del servidor (real-*) y ejemplos de DayZ (dayz-*).
const shots = [
  { src: "/gallery/real-1.webp", caption: "Patrulla en Livonia", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/gallery/real-2.webp", caption: "Caída la noche", span: "" },
  { src: "/gallery/real-3.webp", caption: "Camino a la mina", span: "" },
  { src: "/gallery/dayz-05.jpg", caption: "Ciudad en ruinas", span: "" },
  { src: "/gallery/dayz-04.jpg", caption: "Reconocimiento", span: "" },
  { src: "/gallery/dayz-07.jpg", caption: "Emboscada", span: "" },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden border-y border-ash-800 bg-ash-950 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>Galería</SectionLabel>
            <Heading className="mt-5">
              El campo de <span className="text-fire">batalla</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-stencil text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-ash-400">
              Capturas reales del servidor en Livonia
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <StaggerItem key={shot.src} className={shot.span}>
              <figure className="group relative h-full w-full overflow-hidden border border-ash-700 scanlines">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover brightness-[0.78] grayscale-[0.45] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
                <span className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-ember/0 transition-all duration-500 group-hover:ring-ember/40" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span className="translate-y-1 font-display text-base font-bold uppercase leading-tight tracking-wide text-bone opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {shot.caption}
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
