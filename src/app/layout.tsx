import type { ReactNode } from "react";

// Layout raíz mínimo. El <html>/<body> y todo lo demás vive en
// [locale]/layout.tsx (necesario para el enrutado i18n de next-intl).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
