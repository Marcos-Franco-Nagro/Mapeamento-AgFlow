import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

const NOME_IMOVEL = 'teste - preenchimento automatico';
const AREA_HA = '50';
const UF = 'MG';
const MUNICIPIO = 'Uberlândia';
const TIPO = 'Própria';
const PROPRIETARIO = 'NICODEMOS FERREIRA GUIMARAES';

export interface CashFlowNovaAreaResult {
  cardId: string;
  screenshotConsolidado: string;
  screenshotPopupPreenchido: string;
  screenshotImoveisRuraisTop: string;
  screenshotImoveisRuraisBottom: string;
  requestsNovaArea: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitCashFlowNovaArea(
  context: BrowserContext,
  card: CardFixture,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<CashFlowNovaAreaResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'modulo-cash-flow', 'nova-area');
  const outputDir = path.join('crawl-output', 'modulo-cash-flow');
  const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/cash-flow/consolidated`;

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    await expect(page.getByRole('heading', { name: 'Fluxo de caixa' })).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const snapshotAntes = getRequests();

    // Screenshot da tela de consolidado
    const screenshotConsolidado = `${card.cardId}-consolidado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConsolidado), fullPage: true });

    // Clicar em "Nova área"
    await page.getByRole('button', { name: /Nova área/i }).click();
    await expect(page.getByText('Adicionar nova área')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    // Nome do imóvel — input[name="propertyName"]
    await page.locator('input[name="propertyName"]').fill(NOME_IMOVEL);
    await page.waitForTimeout(200);

    // Área (ha) — input[name="area"]
    await page.locator('input[name="area"]').fill(AREA_HA);
    await page.waitForTimeout(200);

    // UF — MUI Autocomplete: digitar e clicar opção
    await page.getByPlaceholder('UF').fill(UF);
    await page.waitForTimeout(600);
    await page.getByRole('option', { name: UF, exact: true }).click();
    await page.waitForTimeout(400);

    // Município — MUI Autocomplete: digitar e clicar opção (habilitado após UF)
    await page.getByPlaceholder('Selecione').fill(MUNICIPIO);
    await page.waitForTimeout(800);
    await page.getByRole('option', { name: MUNICIPIO, exact: true }).click();
    await page.waitForTimeout(400);

    // Tipo — MUI Select (aria-haspopup="listbox"): único Select no popup
    await page.locator('[aria-haspopup="listbox"]').click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: TIPO, exact: true }).click();
    await page.waitForTimeout(300);

    // Proprietário — MUI Autocomplete: digitar e clicar opção
    await page.getByPlaceholder('Proprietário').fill(PROPRIETARIO);
    await page.waitForTimeout(600);
    await page.getByRole('option', { name: PROPRIETARIO }).click();
    await page.waitForTimeout(300);

    // Screenshot do popup com todos os campos preenchidos
    const screenshotPopupPreenchido = `${card.cardId}-nova-area-popup-preenchido.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotPopupPreenchido), fullPage: true });

    // Clicar em "Adicionar área"
    await page.locator('[data-testid="save-button"]').click();
    console.log('    Clicou em "Adicionar área" — aguardando redirect para Imóveis Rurais...');

    // Aguardar redirect para /rural-properties
    await page.waitForURL('**/rural-properties**', { timeout: 30000 });
    await page.waitForTimeout(1500);

    // Screenshot do topo da lista de Imóveis Rurais
    const screenshotImoveisRuraisTop = `${card.cardId}-imoveis-rurais-top.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotImoveisRuraisTop), fullPage: false });
    console.log('    Screenshot do topo tirada');

    // Rolar até o final — o imóvel cadastrado aparece na última posição
    await page.keyboard.press('End');
    await page.waitForTimeout(800);

    const screenshotImoveisRuraisBottom = `${card.cardId}-imoveis-rurais-bottom.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotImoveisRuraisBottom), fullPage: false });
    console.log('    Screenshot do rodapé tirada (imóvel cadastrado na última posição)');

    const requestsNovaArea = getRequests().slice(snapshotAntes.length);
    console.log(`    ${requestsNovaArea.length} request(s) capturado(s)`);

    const result: CashFlowNovaAreaResult = {
      cardId: card.cardId,
      screenshotConsolidado,
      screenshotPopupPreenchido,
      screenshotImoveisRuraisTop,
      screenshotImoveisRuraisBottom,
      requestsNovaArea,
      crawledAt: new Date().toISOString(),
      ok: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-cash-flow-nova-area.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );
    return result;
  } finally {
    await page.close();
  }
}
