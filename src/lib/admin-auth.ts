// =============================================================================
// Autenticación del panel de admin — contraseña única + cookie firmada (JWT).
// Compatible con Edge (se usa también en el middleware).
// =============================================================================

import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "bl_admin";
const ALG = "HS256";

function secretKey(): Uint8Array {
  const s = process.env.SESSION_SECRET || "";
  // En producción SESSION_SECRET es obligatorio; en dev permitimos un fallback
  // para poder probar la UI (las cookies de dev no valen en prod).
  return new TextEncoder().encode(s || "dev-only-insecure-secret-change-me");
}

/** Crea un token de sesión de admin válido 7 días. */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

/** Verifica un token de sesión. Devuelve true si es válido y no ha expirado. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/** Comprueba la contraseña de admin contra la variable de entorno. */
export function checkPassword(input: unknown): boolean {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass || typeof input !== "string") return false;
  // Comparación de longitud constante para evitar timing attacks básicos.
  if (input.length !== pass.length) return false;
  let diff = 0;
  for (let i = 0; i < pass.length; i++) diff |= input.charCodeAt(i) ^ pass.charCodeAt(i);
  return diff === 0;
}

/** ¿Está el panel listo para usarse? (variables de entorno mínimas) */
export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET;
}
