import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

const DEFAULTS = {
  outroValor: '100000000', // centavos → R$ 1.000.000,00
  parecer: 'Aprovação de QA - pelo framework',
};

export interface AlcadaResult {
  cardId: string;
  phaseSlug: string;
  screenshotBefore: string;
  screenshotFilled: string;
  screenshotConcluded: string;
  requestsAlcada: CapturedRequest[];
  crawledAt: string;
  concludedOk: boolean;
}

export async function visitAlcada(
  context: BrowserContext,
  card: CardFixture,
  clientId: string,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<AlcadaResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'aprovacao-de-alcada');
  const outputDir = path.join('crawl-output', 'alcada', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/approves?clientId=${clientId}`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    // Abrir painel de aprovação
    await page.getByRole('button', { name: 'Realizar aprovação', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Aprovação' })).toBeVisible({ timeout: 8000 });

    // Selecionar "Aprovar com ressalvas"
    await page.getByRole('button').filter({ hasText: 'Aprovar com ressalvas' }).click();
    await expect(page.getByText('Qual valor deseja aprovar?')).toBeVisible({ timeout: 5000 });

    // Selecionar "Outro valor"
    await page.getByRole('radio', { name: 'Outro valor' }).click();
    await expect(page.getByText('Informe outro valor')).toBeVisible({ timeout: 3000 });

    // Preencher valor (máscara de centavos: '100000000' → R$ 1.000.000,00)
    const valorInput = page.locator('input[placeholder="0,00"][inputmode="numeric"]');
    await valorInput.click({ clickCount: 3 });
    await valorInput.pressSequentially(DEFAULTS.outroValor);
    await valorInput.blur();

    // Preencher parecer
    const parecerTextarea = page.getByPlaceholder('Informe aqui');
    await parecerTextarea.click();
    await parecerTextarea.pressSequentially(DEFAULTS.parecer);

    const screenshotFilled = `${card.cardId}-preenchido.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotFilled), fullPage: true });

    // Concluir aprovação
    const concluir = page.getByRole('button', { name: 'Concluir aprovação', exact: true });
    await expect(concluir).toBeEnabled({ timeout: 5000 });
    await concluir.click();
    await page.waitForTimeout(2000);

    // Verificar que o painel fechou
    let concludedOk = false;
    try {
      await expect(page.getByRole('heading', { name: 'Aprovação' })).not.toBeVisible({ timeout: 5000 });
      concludedOk = true;
    } catch {
      concludedOk = false;
    }

    const screenshotConcluded = `${card.cardId}-concluido.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConcluded), fullPage: true });

    const result: AlcadaResult = {
      cardId: card.cardId,
      phaseSlug,
      screenshotBefore,
      screenshotFilled,
      screenshotConcluded,
      requestsAlcada: getRequests(),
      crawledAt: new Date().toISOString(),
      concludedOk,
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
