import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // ES en la raíz (/, /acerca…), EN bajo /en
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
