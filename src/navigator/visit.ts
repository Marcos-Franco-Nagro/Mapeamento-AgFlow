import type { BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { extractElements, type InteractiveElement } from '../crawler/extractors/elements.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const RATE_LIMIT_MS = parseInt(process.env.RATE_LIMIT_MS ?? '500');

export type ScriptType = 'navegacao' | 'atividades-de-etapa' | 'parecer-de-credito' | 'avanco-de-etapa';

export interface FeatureMeta {
  phase: number;
  phaseName: string;
  phaseSlug: string;
  scriptType: ScriptType;
  moduleSlug: string;
  moduleName: string;
  topicSlug: string;
  topicName: string;
}

export interface FeatureData extends FeatureMeta {
  url: string;
  path: string;
  slug: string;
  title: string;
  screenshot: string;
  requests: CapturedRequest[];
  elements: InteractiveElement[];
  crawledAt: string;
}

function buildNoteSlug(meta: FeatureMeta): string {
  if (meta.phase === 0) return `flow-${meta.moduleSlug}`;
  const topicPart = meta.topicSlug.replace(/\//g, '-');
  const parts = ['fase' + meta.phase, meta.moduleSlug, topicPart].filter(Boolean);
  return parts.join('-');
}

// Descobre o clientId do primeiro cliente do card interceptando respostas de API.
// Navega para a URL de overview do card e lê o primeiro "clientId" ou "clients[0].id"
// que aparecer nos responses JSON. Retorna undefined se não encontrar.
export async function discoverClientId(
  context: BrowserContext,
  overviewUrl: string,
): Promise<string | undefined> {
  const page = await context.newPage();
  let clientId: string | undefined;

  page.on('response', async (response) => {
    if (clientId) return;
    if (response.status() !== 200) return;
    try {
      const text = await response.text();
      const direct = text.match(/"clientId"\s*:\s*"([a-f0-9]{24})"/);
      if (direct) { clientId = direct[1]; return; }
      const nested = text.match(/"clients"\s*:\s*\[[^\]]*?"id"\s*:\s*"([a-f0-9]{24})"/);
      if (nested) clientId = nested[1];
    } catch { /* resposta não-JSON — ignorar */ }
  });

  try {
    await page.goto(overviewUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(2000);
    const urlParams = new URL(page.url()).searchParams;
    if (urlParams.has('clientId')) clientId = urlParams.get('clientId') ?? undefined;
  } catch { /* ignorar erros de navegação */ }

  await page.close();
  return clientId;
}

// Extrai a URL de overview do card a partir de qualquer URL de card profunda.
// Preserva ?clientId se presente na URL original.
// Ex: .../card/abc123/agrisk/group/members?clientId=xxx → .../card/abc123/summary/overview?clientId=xxx
function cardOverviewUrl(url: string): string | undefined {
  const match = url.match(/^(.*\/card\/[a-f0-9]{24})\//);
  if (!match) return undefined;
  const clientId = new URL(url).searchParams.get('clientId');
  const base = `${match[1]}/summary/overview`;
  return clientId ? `${base}?clientId=${clientId}` : base;
}

export async function visitFeature(
  context: BrowserContext,
  url: string,
  _baseUrl: string,
  meta: FeatureMeta
): Promise<FeatureData> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  try {
    // Next.js mantém SSE aberto — usar load + pausa curta.
    // Algumas URLs profundas em abas novas entram em loop de redirect; nesses casos
    // fazemos um warm-up na overview do card e tentamos de novo.
    try {
      await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    } catch (err) {
      if (err instanceof Error && err.message.includes('ERR_TOO_MANY_REDIRECTS')) {
        const overviewUrl = cardOverviewUrl(url);
        if (overviewUrl && overviewUrl !== url) {
          await page.goto(overviewUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
          await page.waitForTimeout(800);
        }
        await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
      } else {
        throw err;
      }
    }
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) {
      throw new AuthExpiredError(url);
    }

    const slug = buildNoteSlug(meta);
    const screenshotFile = `${slug}.png`;

    const topicParts = meta.topicSlug ? meta.topicSlug.split('/') : [];
    const screenshotsDir = path.join('vault', 'screenshots', meta.phaseSlug, meta.scriptType, meta.moduleSlug, ...topicParts);
    const outputDir = path.join('crawl-output', 'features', meta.phaseSlug, meta.scriptType);
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    await page.screenshot({ path: path.join(screenshotsDir, screenshotFile), fullPage: true });

    const [elements, title] = await Promise.all([
      extractElements(page),
      page.title(),
    ]);

    const data: FeatureData = {
      ...meta,
      url,
      path: new URL(url).pathname,
      slug,
      title,
      screenshot: screenshotFile,
      requests: getRequests(),
      elements,
      crawledAt: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(outputDir, `${slug}.json`),
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS));

    return data;
  } finally {
    await page.close();
  }
}
