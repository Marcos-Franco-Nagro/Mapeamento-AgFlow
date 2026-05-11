import type { BrowserContext } from 'playwright';

export class AuthExpiredError extends Error {
  readonly url: string;
  constructor(url: string) {
    super(`Sessão expirada ao visitar: ${url}`);
    this.name = 'AuthExpiredError';
    this.url = url;
  }
}
import path from 'path';
import fs from 'fs/promises';
import { slugify } from '../utils/slug.js';
import { setupNetworkCapture, type CapturedRequest } from './extractors/network.js';
import { extractElements, type InteractiveElement } from './extractors/elements.js';
import { extractLinks } from './extractors/links.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const RATE_LIMIT_MS = parseInt(process.env.RATE_LIMIT_MS ?? '500');

const SCREENSHOTS_DIR = 'vault/screenshots';
const CRAWL_OUTPUT_DIR = 'crawl-output';

export interface RouteData {
  url: string;
  path: string;
  slug: string;
  title: string;
  screenshot: string;
  requests: CapturedRequest[];
  elements: InteractiveElement[];
  links: string[];
  crawledAt: string;
}

export async function visitRoute(
  context: BrowserContext,
  url: string,
  baseUrl: string
): Promise<RouteData> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  try {
    // Next.js mantém conexões SSE abertas (/events), então networkidle nunca dispara.
    // Usamos 'load' + pausa curta para a hidratação do React Server Components terminar.
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) {
      throw new AuthExpiredError(url);
    }

    const title = await page.title();
    const slug = slugify(url);
    const screenshotFile = `${slug}.png`;

    await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });
    await fs.mkdir(CRAWL_OUTPUT_DIR, { recursive: true });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, screenshotFile), fullPage: true });

    const [elements, links] = await Promise.all([
      extractElements(page),
      extractLinks(page, baseUrl),
    ]);

    const data: RouteData = {
      url,
      path: new URL(url).pathname,
      slug,
      title,
      screenshot: screenshotFile,
      requests: getRequests(),
      elements,
      links,
      crawledAt: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(CRAWL_OUTPUT_DIR, `${slug}.json`),
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    // Rate limiting — evita sobrecarregar o backend de dev
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS));

    return data;
  } finally {
    await page.close();
  }
}
