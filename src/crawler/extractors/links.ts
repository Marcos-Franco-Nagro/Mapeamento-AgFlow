import type { Page } from 'playwright';
import { isSameDomain, toAbsoluteUrl } from '../../utils/url.js';

export async function extractLinks(page: Page, baseUrl: string): Promise<string[]> {
  const hrefs: string[] = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
      .map((a) => a.href)
      .filter(Boolean)
  );

  const seen = new Set<string>();
  const result: string[] = [];

  for (const href of hrefs) {
    if (href.includes('#')) continue;

    const absolute = toAbsoluteUrl(href, baseUrl);

    if (!isSameDomain(absolute, baseUrl)) continue;
    if (seen.has(absolute)) continue;

    seen.add(absolute);
    result.push(absolute);
  }

  return result;
}
