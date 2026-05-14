import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

const AREA_CONSOLIDADA = '100';
const REFERENCIAL = 'AgRisk';
const SAFRA = '25/25';
const CULTURA = 'Soja';
const TIPO = 'Irrigado';
const NIVEL_TECNOLOGICO = 'Alto';

export interface CashFlowCadastrarProducaoResult {
  cardId: string;
  screenshotConsolidado: string;
  screenshotStep1: string;
  screenshotStep2Preenchido: string;
  screenshotCalculoResultado: string;
  screenshotConsolidadoPos: string;
  screenshotProducoes: string;
  screenshotImoveisRurais: string;
  requestsCadastrarProducao: CapturedRequest[];
  requestsProducoes: CapturedRequest[];
  requestsImoveisRurais: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitCashFlowCadastrarProducao(
  context: BrowserContext,
  card: CardFixture,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<CashFlowCadastrarProducaoResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'submodulo-cash-flow', 'cadastrar-producao');
  const outputDir = path.join('crawl-output', 'submodulo-cash-flow');
  const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/cash-flow/consolidated`;

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    await expect(page.getByRole('heading', { name: 'Fluxo de caixa' })).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    // Screenshot do consolidado antes de cadastrar
    const screenshotConsolidado = `${card.cardId}-consolidado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConsolidado), fullPage: true });

    const snapshotAntes = getRequests();

    // ====== STEP 1 — Selecionar área ======
    await page.getByRole('button', { name: /Cadastrar produção/i }).click();
    await expect(page.getByText('Selecione a área')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotStep1 = `${card.cardId}-step1-selecionar-area.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep1), fullPage: true });

    // Clicar na primeira linha da tabela (tr[role="checkbox"])
    await page.locator('tr[role="checkbox"]').first().click();
    await page.waitForTimeout(300);
    console.log('    Primeira área selecionada');

    await page.getByRole('button', { name: 'Próximo', exact: true }).click();
    await page.waitForTimeout(500);

    // ====== STEP 2 — Informe a produção ======
    await expect(page.getByText('Informe a produção')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);
    console.log('    Step 2 carregado');

    // Área consolidada (ha) — único input[type="number"] visível no step 2
    await page.locator('input[type="number"]').fill(AREA_CONSOLIDADA);
    await page.waitForTimeout(200);

    // Referencial — Autocomplete: AgRisk é sempre o primeiro item da lista
    await page.locator('button[title="Open"]').first().click();
    await page.waitForTimeout(500);
    await page.getByRole('option').first().click();
    console.log(`    Referencial selecionado (${REFERENCIAL})`);
    await page.waitForTimeout(300);

    // Safra — Select (índice 0 de [aria-haspopup="listbox"])
    await page.locator('[aria-haspopup="listbox"]').nth(0).click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: SAFRA }).click();
    await page.waitForTimeout(300);

    // Cultura — Select (índice 1)
    await page.locator('[aria-haspopup="listbox"]').nth(1).click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: CULTURA, exact: true }).click();
    await page.waitForTimeout(300);

    // Tipo — Select (índice 2)
    await page.locator('[aria-haspopup="listbox"]').nth(2).click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: TIPO, exact: true }).click();
    await page.waitForTimeout(300);

    // Nível Tecnológico — Select (índice 3)
    await page.locator('[aria-haspopup="listbox"]').nth(3).click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: NIVEL_TECNOLOGICO, exact: true }).click();
    await page.waitForTimeout(300);

    const screenshotStep2Preenchido = `${card.cardId}-step2-preenchido.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep2Preenchido), fullPage: true });

    // Calcular produção
    await page.getByRole('button', { name: /Calcular produção/i }).last().click();
    console.log('    Calculando produção...');

    // Aguardar cálculo: "Nenhum cálculo realizado" some quando loading inicia,
    // depois aguardar mais para o resultado chegar de fato
    await expect(page.getByText('Nenhum cálculo realizado')).toBeHidden({ timeout: 30000 });
    await page.waitForTimeout(10000);
    console.log('    Cálculo concluído');

    const screenshotCalculoResultado = `${card.cardId}-step2-calculo-resultado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotCalculoResultado), fullPage: true });

    // Concluir
    await page.getByRole('button', { name: 'Concluir', exact: true }).click();
    console.log('    Clicou em "Concluir" — aguardando popup fechar...');

    // Aguardar popup fechar
    await expect(page.getByText('Informe a produção')).toBeHidden({ timeout: 30000 });
    await page.waitForTimeout(1500);

    const requestsCadastrarProducao = getRequests().slice(snapshotAntes.length);
    console.log(`    ${requestsCadastrarProducao.length} request(s) de cadastro capturado(s)`);

    // Screenshot do consolidado com produção cadastrada
    const screenshotConsolidadoPos = `${card.cardId}-consolidado-pos-cadastro.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConsolidadoPos), fullPage: true });

    // ====== Navegação: Produções ======
    const snapshotAntesProducoes = getRequests();
    await page.locator('a[href="./productions"]').click();
    await page.waitForTimeout(1000);

    const screenshotProducoes = `${card.cardId}-producoes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotProducoes), fullPage: true });

    const requestsProducoes = getRequests().slice(snapshotAntesProducoes.length);
    console.log(`    ${requestsProducoes.length} request(s) em Produções`);

    // ====== Navegação: Imóveis rurais ======
    const snapshotAntesImoveis = getRequests();
    await page.locator('a[href="./rural-properties"]').click();
    await page.waitForTimeout(1000);

    const screenshotImoveisRurais = `${card.cardId}-imoveis-rurais.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotImoveisRurais), fullPage: true });

    const requestsImoveisRurais = getRequests().slice(snapshotAntesImoveis.length);
    console.log(`    ${requestsImoveisRurais.length} request(s) em Imóveis rurais`);

    const result: CashFlowCadastrarProducaoResult = {
      cardId: card.cardId,
      screenshotConsolidado,
      screenshotStep1,
      screenshotStep2Preenchido,
      screenshotCalculoResultado,
      screenshotConsolidadoPos,
      screenshotProducoes,
      screenshotImoveisRurais,
      requestsCadastrarProducao,
      requestsProducoes,
      requestsImoveisRurais,
      crawledAt: new Date().toISOString(),
      ok: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-cash-flow-cadastrar-producao.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );
    return result;
  } finally {
    await page.close();
  }
}
