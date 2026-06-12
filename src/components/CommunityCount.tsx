"use client";

import { useLiveStatus } from "@/components/LiveStatus";

/** Línea de prueba social con datos del Discord en vivo. */
export function CommunityCount() {
  const { members, online } = useLiveStatus();

  if (members == null) {
    return (
      <p className="text-base leading-relaxed text-smoke sm:text-lg">
        Únete a cientos de supervivientes. El mapa no espera a nadie.
      </p>
    );
  }

  return (
    <p className="text-base leading-relaxed text-smoke sm:text-lg">
      Únete a{" "}
      <span className="font-semibold text-bone">
        {members.toLocaleString("es-ES")}
      </span>{" "}
      supervivientes
      {online != null && (
        <>
          {" · "}
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 [animation:flicker_2s_ease-in-out_infinite]" />
            {online} en línea ahora
          </span>
        </>
      )}
    </p>
  );
}
