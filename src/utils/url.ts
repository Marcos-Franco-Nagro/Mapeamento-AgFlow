// Substitui segmentos numéricos e UUIDs por placeholders para dedup de rotas
export function normalizeUrl(url: string): string {
  return url
    .replace(/\/\d+(?=\/|$)/g, '/:id')
    .replace(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?=\/|$)/gi, '/:uuid');
}

export function isSameDomain(url: string, baseUrl: string): boolean {
  try {
    return new URL(url).hostname === new URL(baseUrl).hostname;
  } catch {
    return false;
  }
}

export function toAbsoluteUrl(href: string, baseUrl: string): string {
  if (href.startsWith('/')) return new URL(href, baseUrl).href;
  return href;
}
