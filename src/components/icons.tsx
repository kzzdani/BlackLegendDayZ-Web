import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Icon = {
  skull: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 2a9 9 0 0 0-9 9c0 3 1.5 4.8 3 6v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3c1.5-1.2 3-3 3-6a9 9 0 0 0-9-9Z" />
      <circle cx="9" cy="11" r="1.6" />
      <circle cx="15" cy="11" r="1.6" />
      <path d="M10 19v2M14 19v2M12 15v3" />
    </svg>
  ),
  flame: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 2c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1 .4-2 1-2.5C8.5 9 8 11 8 12a4 4 0 1 0 8 0c0-4.5-3-7-4-10Z" />
    </svg>
  ),
  map: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  ),
  shield: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  users: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3.2 3.2 0 0 1 0 6.4M21 20c0-2.5-1.5-4.7-3.7-5.6" />
    </svg>
  ),
  bolt: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  ),
  discord: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5a14.6 14.6 0 0 1 4.3 2.1 13.6 13.6 0 0 0-11.7 0A14.6 14.6 0 0 1 12 3.5L11.7 3A19.8 19.8 0 0 0 6.8 4.4 20.7 20.7 0 0 0 3.2 18a19.9 19.9 0 0 0 6 3l.8-1.3a13 13 0 0 1-1.9-.9l.5-.4a14.2 14.2 0 0 0 12.1 0l.5.4c-.6.4-1.2.7-1.9.9l.8 1.3a19.9 19.9 0 0 0 6-3 20.7 20.7 0 0 0-3.6-13.6ZM9.3 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm5.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  ),
  youtube: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12ZM9.7 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  ),
  arrow: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  copy: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  check: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
