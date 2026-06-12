"use client";

import { useTranslations } from "next-intl";
import { useLiveStatus } from "@/components/LiveStatus";

/** Línea de prueba social con datos del Discord en vivo. */
export function CommunityCount() {
  const t = useTranslations("join");
  const { members, online } = useLiveStatus();

  if (members == null) {
    return (
      <p className="text-base leading-relaxed text-smoke sm:text-lg">
        {t("fallback")}
      </p>
    );
  }

  return (
    <p className="text-base leading-relaxed text-smoke sm:text-lg">
      {t("joinPre")}{" "}
      <span className="font-semibold text-bone">
        {members.toLocaleString("es-ES")}
      </span>{" "}
      {t("survivors")}
      {online != null && (
        <>
          {" · "}
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 [animation:flicker_2s_ease-in-out_infinite]" />
            {online} {t("onlineNow")}
          </span>
        </>
      )}
    </p>
  );
}
