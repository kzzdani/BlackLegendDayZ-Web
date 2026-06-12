"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Clip = { id: string; title: string };

export function ClipsSection() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [active, setActive] = useState<string | null>(site.media.trailerId || null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let on = true;
    fetch("/api/clips")
      .then((r) => r.json())
      .then((d: { clips: Clip[] }) => {
        if (!on) return;
        setClips(d.clips ?? []);
        setActive((a) => a ?? d.clips?.[0]?.id ?? null);
        setLoaded(true);
      })
      .catch(() => on && setLoaded(true));
    return () => {
      on = false;
    };
  }, []);

  if (loaded && clips.length === 0 && !site.media.trailerId) return null;

  const select = (id: string) => {
    setActive(id);
    setPlaying(true);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>
            <span className="mx-auto">En acción</span>
          </SectionLabel>
          <Heading className="mt-5">
            El servidor <span className="text-fire">en movimiento</span>
          </Heading>
          <p className="mx-auto mt-4 max-w-lg text-base text-smoke">
            Trailers y momentos del servidor, directos desde nuestro YouTube.
          </p>
        </Reveal>

        {/* Reproductor destacado */}
        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto aspect-video max-w-4xl overflow-hidden border border-ash-700 bg-ash-950 frame-mil">
            {!loaded ? (
              <div className="h-full w-full animate-pulse bg-ash-800" />
            ) : active && playing ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1&rel=0`}
                title="Vídeo de Black Legend DayZ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : active ? (
              <button
                onClick={() => setPlaying(true)}
                className="group relative h-full w-full"
                aria-label="Reproducir vídeo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${active}/maxresdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover brightness-[0.6] transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-ember text-void shadow-[0_0_30px_-4px_rgba(255,106,26,0.9)] transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            ) : null}
          </div>
        </Reveal>

        {/* Rejilla de clips */}
        {clips.length > 1 && (
          <Reveal delay={0.15} className="mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {clips.map((c) => (
              <button
                key={c.id}
                onClick={() => select(c.id)}
                className={cn(
                  "group relative aspect-video overflow-hidden border text-left transition-colors",
                  c.id === active ? "border-ember/60" : "border-ash-700 hover:border-ash-500",
                )}
                title={c.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${c.id}/hqdefault.jpg`}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover brightness-75 transition-all duration-300 group-hover:scale-105 group-hover:brightness-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-void/90 to-transparent" />
                {c.id === active && (
                  <span className="absolute inset-0 ring-2 ring-inset ring-ember/60" />
                )}
                <span className="absolute inset-x-0 bottom-0 line-clamp-2 p-2.5 font-display text-[0.7rem] font-bold uppercase leading-tight text-bone">
                  {c.title}
                </span>
              </button>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
