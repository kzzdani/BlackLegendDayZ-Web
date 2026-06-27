import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE, verifySessionToken } from "./lib/admin-auth";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ADMIN = new Set(["/admin/login", "/api/admin/login"]);

async function adminGuard(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_ADMIN.has(pathname)) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  // API: 401. Páginas: redirige al login.
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return adminGuard(req);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Páginas públicas localizadas (todo menos api, admin, internos y estáticos)
    "/((?!api|admin|_next|_vercel|opengraph-image|.*\\..*).*)",
    // Panel de admin y su API (protegidos por adminGuard)
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
