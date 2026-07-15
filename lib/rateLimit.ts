import { MAX_GENERACIONES_POR_SESION } from './options';

export const RATE_COOKIE = 'pz_gen_count';

/**
 * Rate limiting simple basado en cookie: "count:YYYY-MM-DD".
 * No es criptográficamente seguro (un usuario podría borrar la cookie),
 * pero sirve como freno razonable para controlar costos de API en una
 * app pequeña. Para producción a mayor escala, sustituir por un store
 * compartido (Upstash Redis, KV, etc.) indexado por IP/usuario.
 */
export function parseCount(cookieValue: string | undefined): number {
  if (!cookieValue) return 0;
  const [countStr, date] = cookieValue.split(':');
  const today = new Date().toISOString().slice(0, 10);
  if (date !== today) return 0;
  const n = parseInt(countStr, 10);
  return Number.isFinite(n) ? n : 0;
}

export function nextCookieValue(currentCount: number): string {
  const today = new Date().toISOString().slice(0, 10);
  return `${currentCount + 1}:${today}`;
}

export function isRateLimited(currentCount: number): boolean {
  return currentCount >= MAX_GENERACIONES_POR_SESION;
}
