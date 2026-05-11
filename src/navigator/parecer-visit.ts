import type { BrowserContext, Page } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

// Dados padrão do parecer (happy path para automação de QA)
const DEFAULTS = {
  limiteCredito: '100000',   // → R$ 1.000,00 (máscara de centavos)
  garantias: ['CPR'],
  vencimentoDia: '31',
  vencimentoMes: '12',
  vencimentoAno: '2026',
  parecerTexto: 'Parecer automatizado - QA test',
};

export interface ParecerResult {
  cardId: string;
  phaseSlug: string;
  screenshotBefore: string;
  screenshotFilled: string;
  screenshotConcluded: string;
  requestsParecer: CapturedRequest[];
  crawledAt: string;
  concludedOk: boolean;
}

async function fillParecer(
  page: Page,
  phaseSlug: string,
  cardId: string,
): Promise<void> {
  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'parecer-de-credito');

  // Screenshot antes de preencher (painel aberto)
  await page.screenshot({
    path: path.join(screenshotsDir, `${cardId}-painel-aberto.png`),
    fullPage: true,
  });

  // 1. Aprovar
  const aprovar = page.locator('button[status="success"]');
  await expect(aprovar).toBeVisible({ timeout: 8000 });
  await aprovar.click();
  await expect(aprovar).toHaveAttribute('data-is-selected', 'true');

  // 2. Limite de crédito aprovado
  const limiteInput = page.locator('input[placeholder="0,00"][inputmode="numeric"]');
  await limiteInput.fill(DEFAULTS.limiteCredito);
  await limiteInput.blur();

  // 3. Garantias (checkboxes)
  for (const garantia of DEFAULTS.garantias) {
    const cb = page.getByRole('checkbox', { name: garantia });
    await cb.check();
    await expect(cb).toBeChecked();
  }

  // 4. Vencimento da garantia — DatePicker segmentado (spinbuttons MUI)
  // Escopar ao painel para evitar colisão com outros DatePickers na página
  const panel = page.locator('div').filter({ hasText: 'Nova análise de crédito' }).last();
  await panel.getByRole('spinbutton', { name: 'Day' }).fill(DEFAULTS.vencimentoDia);
  await panel.getByRole('spinbutton', { name: 'Month' }).fill(DEFAULTS.vencimentoMes);
  await panel.getByRole('spinbutton', { name: 'Year' }).fill(DEFAULTS.vencimentoAno);

  // 5. Parecer do analista — editor TipTap (não é textarea, usar pressSequentially)
  const editor = page.locator('.tiptap.ProseMirror[contenteditable="true"]');
  await editor.click();
  await editor.pressSequentially(DEFAULTS.parecerTexto);
  await expect(editor.locator('p.is-empty')).toHaveCount(0);
}

export async function visitParecer(
  context: BrowserContext,
  card: CardFixture,
  clientId: string,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<ParecerResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const parecerDir = path.join('vault', 'screenshots', phaseSlug, 'parecer-de-credito');
  const outputDir = path.join('crawl-output', 'parecer', phaseSlug);

  try {
    await fs.mkdir(parecerDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    // Navegar direto para credit-analysis/credit-opinion
    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/credit-opinion?clientId=${clientId}`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    // Clicar no subheader "Parecer de crédito" para garantir que está ativo
    const tab = page.getByRole('button', { name: 'Parecer de crédito' });
    await expect(tab).toBeVisible({ timeout: 8000 });
    await tab.click();

    // Screenshot antes de abrir o painel
    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(parecerDir, screenshotBefore), fullPage: true });

    // Abrir painel de parecer
    await page.getByRole('button', { name: 'Realizar parecer', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Nova análise de crédito' }))
      .toBeVisible({ timeout: 8000 });

    // Preencher todos os campos
    await fillParecer(page, phaseSlug, card.cardId);

    const screenshotFilled = `${card.cardId}-preenchido.png`;
    await page.screenshot({ path: path.join(parecerDir, screenshotFilled), fullPage: true });

    // Concluir análise
    const concluir = page.getByRole('button', { name: 'Concluir análise', exact: true });
    await expect(concluir).toBeEnabled({ timeout: 5000 });
    await concluir.click();
    await page.waitForTimeout(2000);

    const screenshotConcluded = `${card.cardId}-concluido.png`;
    await page.screenshot({ path: path.join(parecerDir, screenshotConcluded), fullPage: true });

    const result: ParecerResult = {
      cardId: card.cardId,
      phaseSlug,
      screenshotBefore,
      screenshotFilled,
      screenshotConcluded,
      requestsParecer: getRequests(),
      crawledAt: new Date().toISOString(),
      concludedOk: true,
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
