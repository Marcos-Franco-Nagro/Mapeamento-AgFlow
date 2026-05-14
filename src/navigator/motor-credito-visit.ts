import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const ANALYSIS_TIMEOUT = parseInt(process.env.AI_TIMEOUT ?? '60000');

export interface MotorCreditoResult {
  cardId: string;
  phaseSlug: string;
  screenshotBefore: string;
  screenshotPopup: string;
  screenshotAfter: string;
  requestsMotor: CapturedRequest[];
  crawledAt: string;
  analyzedOk: boolean;
}

export async function visitMotorCredito(
  context: BrowserContext,
  card: CardFixture,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<MotorCreditoResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'motor-credito');
  const outputDir = path.join('crawl-output', 'motor-credito', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/credit-engine`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    const snapshotBefore = getRequests();

    // Clicar no botão "Analisar cliente" da página
    const analisarButton = page.getByRole('button', { name: 'Analisar cliente', exact: true }).first();
    await expect(analisarButton).toBeVisible({ timeout: 8000 });
    await analisarButton.click();

    // Aguardar popup de confirmação abrir ("Analisar cliente novamente")
    await expect(page.getByText('Analisar cliente novamente')).toBeVisible({ timeout: 10000 });

    const screenshotPopup = `${card.cardId}-popup.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotPopup), fullPage: true });

    // Preparar captura da resposta da análise antes de clicar
    const analysisResponse = page.waitForResponse(
      (resp) =>
        (resp.url().includes('credit-engine') || resp.url().includes('decision-engine')) &&
        resp.request().method() === 'POST',
      { timeout: ANALYSIS_TIMEOUT },
    );

    // Clicar em "Analisar cliente" no popup (último botão com esse nome)
    const confirmarButton = page.getByRole('button', { name: 'Analisar cliente', exact: true }).last();
    await confirmarButton.click();

    // Aguardar resposta da API e popup fechar
    console.log('    Aguardando análise do motor de crédito...');
    await analysisResponse;
    await expect(page.getByText('Analisar cliente novamente')).toBeHidden({ timeout: 15000 });
    await page.waitForTimeout(2000);

    const screenshotAfter = `${card.cardId}-resultado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotAfter), fullPage: true });

    const requestsMotor = getRequests().slice(snapshotBefore.length);

    const result: MotorCreditoResult = {
      cardId: card.cardId,
      phaseSlug,
      screenshotBefore,
      screenshotPopup,
      screenshotAfter,
      requestsMotor,
      crawledAt: new Date().toISOString(),
      analyzedOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-motor-credito.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
