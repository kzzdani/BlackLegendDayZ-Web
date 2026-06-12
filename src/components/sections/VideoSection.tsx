"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const id = site.media.trailerId;

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
            Esto es lo que te espera en Livonia. Dale al play.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="group relative mx-auto aspect-video max-w-4xl overflow-hidden border border-ash-700 bg-ash-950 frame-mil">
            {playing && id ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title="Trailer Black Legend DayZ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src="/gallery/real-1.webp"
                  alt="Trailer del servidor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  className="object-cover brightness-[0.55] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/40" />

                {/* Botón play */}
                {id ? (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Reproducir trailer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <PlayButton />
                  </button>
                ) : (
                  <Link
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver en YouTube"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    <PlayButton />
                    <span className="border border-bone/20 bg-void/60 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-bone backdrop-blur-sm">
                      Ver en YouTube
                    </span>
                  </Link>
                )}
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PlayButton() {
  return (
    <span className="relative flex h-20 w-20 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-ember/30 blur-xl transition-all duration-500 group-hover:bg-ember/50" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-ember text-void shadow-[0_0_30px_-4px_rgba(255,106,26,0.9)] transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}
