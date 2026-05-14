import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface RadarResult {
  cardId: string;
  phaseSlug: string;
  screenshotBefore: string;
  screenshotAfter: string;
  requestsRadar: CapturedRequest[];
  crawledAt: string;
  processedOk: boolean;
}

export async function visitRadar(
  context: BrowserContext,
  card: CardFixture,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<RadarResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'painel-de-alertas');
  const outputDir = path.join('crawl-output', 'radar', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/radar`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    const snapshotBefore = getRequests();

    const processButton = page.getByRole('button', { name: 'Processar os dados', exact: true });
    await expect(processButton).toBeVisible({ timeout: 8000 });

    // Registrar interceptor antes de clicar — aguarda resposta do POST decision-engine
    const processingDone = page.waitForResponse(
      (resp) => resp.url().includes('decision-engine') && resp.request().method() === 'POST',
      { timeout: 30000 },
    );
    await processButton.click();
    await processingDone;

    // Breve pausa para a UI renderizar os resultados
    await page.waitForTimeout(1500);

    const screenshotAfter = `${card.cardId}-processado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotAfter), fullPage: true });

    const requestsRadar = getRequests().slice(snapshotBefore.length);

    const result: RadarResult = {
      cardId: card.cardId,
      phaseSlug,
      screenshotBefore,
      screenshotAfter,
      requestsRadar,
      crawledAt: new Date().toISOString(),
      processedOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
