"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const TEXT = "🔥 Black Legend DayZ — servidor hispano de DayZ en Livonia. ¡Únete!";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const url = () =>
    typeof window !== "undefined" ? window.location.origin : "";

  const native = async () => {
    const u = url();
    if (navigator.share) {
      try {
        await navigator.share({ title: "Black Legend DayZ", text: TEXT, url: u });
      } catch {
        /* cancelado */
      }
    } else {
      copy();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no disponible */
    }
  };

  const wa = () =>
    `https://wa.me/?text=${encodeURIComponent(`${TEXT} ${url()}`)}`;
  const x = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(TEXT)}&url=${encodeURIComponent(url())}`;

  return (
    <div className="flex items-center gap-2">
      <Btn label="Compartir" onClick={native}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      </Btn>
      <LinkBtn href={wa()} label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.2.1.8-.1 1.2Z" />
        </svg>
      </LinkBtn>
      <LinkBtn href={x()} label="X / Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.6l8-9.2L1 2h7l4.8 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
        </svg>
      </LinkBtn>
      <Btn label={copied ? "¡Copiado!" : "Copiar enlace"} onClick={copy}>
        {copied ? <Icon.check className="h-4 w-4 text-emerald-400" /> : <Icon.copy className="h-4 w-4" />}
      </Btn>
    </div>
  );
}

function Btn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center border border-ash-600 bg-ash-800/60 text-bone/70 transition-all duration-300 hover:border-ember/70 hover:text-ember"
    >
      {children}
    </button>
  );
}

function LinkBtn({
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
      title={label}
      className="flex h-10 w-10 items-center justify-center border border-ash-600 bg-ash-800/60 text-bone/70 transition-all duration-300 hover:border-ember/70 hover:text-ember"
    >
      {children}
    </a>
  );
}
