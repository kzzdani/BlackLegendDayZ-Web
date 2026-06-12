import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Todo menos api, archivos internos, metadatos y estáticos
  matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
