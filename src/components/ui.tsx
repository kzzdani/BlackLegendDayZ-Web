import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------- Layout primitives ---------------- */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="eyebrow inline-flex items-center">{children}</span>;
}

/** Título de sección grande con palabra destacada en fuego. */
export function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-4xl font-extrabold uppercase tracking-tight text-bone sm:text-5xl md:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* ---------------- Button ---------------- */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "fire" | "ghost" | "steel";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
} & Partial<ComponentProps<"button">>;

const variants = {
  fire: "group relative overflow-hidden bg-ember text-[#160600] hover:text-[#160600] shadow-[0_0_30px_-6px_rgba(255,106,26,0.7)]",
  steel:
    "border border-ash-500 bg-ash-800/70 text-bone hover:border-ember/70 hover:bg-ash-700",
  ghost: "text-bone/80 hover:text-ember",
};

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button({
  children,
  href,
  variant = "fire",
  size = "md",
  external,
  className,
  ...rest
}: ButtonProps) {
  const cls = cn(
    "relative inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]",
    variants[variant],
    sizes[size],
    className,
  );

  const inner =
    variant === "fire" ? (
      <>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-core/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </>
    ) : (
      children
    );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
