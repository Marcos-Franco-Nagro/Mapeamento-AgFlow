import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

// Grupo 1 — condição 1
const G1_COND1_TYPE = 'Limite aprovado pelo analista';
const G1_COND1_OPERATOR = 'Igual a';
const G1_COND1_VALUE_CENTS = '15000000'; // R$ 150.000,00

// Grupo 1 — condição 2
const G1_COND2_TYPE = 'Título do card';
const G1_COND2_OPERATOR = 'Contém';
const G1_COND2_VALUE = 'teste';

// Grupo 2 — condição 1 (operador entre grupos: OU)
const G2_COND1_TYPE = 'Valor final';
const G2_COND1_OPERATOR = 'Maior ou igual a';
const G2_COND1_VALUE_CENTS = '14900000'; // R$ 149.000,00

export interface FiltroMultiGrupoResult {
  screenshotCond1Preenchida: string;
  screenshotGrupo1Preenchido: string;
  screenshotFiltroPreenchido: string;
  screenshotBoard: string;
  screenshotTabela: string;
  requestsNavegacao: CapturedRequest[];
  requestsAplicarFiltro: CapturedRequest[];
  requestsVisaoTabela: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitFiltroMultiGrupo(
  context: BrowserContext,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<FiltroMultiGrupoResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'filtros', 'filtro-multi-grupo');
  const boardUrl = `${baseUrl}/${locale}/flow/${flowId}/board`;

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });

    // ====== Navegação até o board ======
    await page.goto(boardUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(boardUrl);

    await expect(page.getByText('Solicitações recebidas')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const requestsNavegacao = getRequests();
    console.log(`    ${requestsNavegacao.length} request(s) na navegação`);

    // ====== Abrir painel de filtros ======
    await page.getByRole('button').filter({ hasText: 'Filtrar' }).click();
    await expect(page.getByText('Filtros customizados')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(500);
    console.log('    Painel de filtros aberto');

    // Limpar condições existentes (evita "Aplicar filtro" disabled em re-execuções)
    const deleteConditionBtns = page.locator('button').filter({
      has: page.locator('svg[data-testid*="Delete"], svg[data-testid*="Close"], svg[data-testid*="Cancel"], svg[data-testid*="Remove"]'),
    });
    const existingCount = await deleteConditionBtns.count();
    if (existingCount > 0) {
      console.log(`    ${existingCount} condição(ões) existente(s) — removendo...`);
      for (let i = 0; i < existingCount; i++) {
        await deleteConditionBtns.first().click();
        await page.waitForTimeout(400);
      }
    }

    // ====== GRUPO 1 — CONDIÇÃO 1: Limite aprovado pelo analista = Igual a = R$ 150.000,00 ======
    const filterTypeInput1 = page.locator('input[aria-autocomplete="list"]').first();
    await filterTypeInput1.click();
    await filterTypeInput1.pressSequentially(G1_COND1_TYPE, { delay: 30 });
    await page.waitForTimeout(600);

    const filterListbox1 = page.getByRole('listbox');
    await filterListbox1.waitFor({ state: 'visible', timeout: 8000 });
    await filterTypeInput1.press('ArrowDown');
    await page.waitForTimeout(200);
    await filterTypeInput1.press('Enter');
    await page.waitForTimeout(600);
    console.log(`    G1 Cond1 — tipo: "${G1_COND1_TYPE}"`);

    const opInput1 = page.locator('input[placeholder="Operador"]').first();
    await opInput1.waitFor({ state: 'visible', timeout: 8000 });
    await opInput1.click();
    await page.waitForTimeout(200);
    await opInput1.press('ArrowDown');
    await page.waitForTimeout(400);

    const firstOpOption = page.locator('.MuiPopover-root [role="option"]').first();
    await firstOpOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstOpOption.click();
    await page.waitForTimeout(500);
    console.log(`    G1 Cond1 — operador: "${G1_COND1_OPERATOR}"`);

    let valueInput1 = page.locator('input[inputmode="decimal"]').first();
    if (!(await valueInput1.isVisible({ timeout: 1500 }).catch(() => false))) {
      valueInput1 = page.locator('input[inputmode="numeric"]').first();
    }
    if (!(await valueInput1.isVisible({ timeout: 1500 }).catch(() => false))) {
      valueInput1 = page.locator('input[type="text"]:not([aria-autocomplete]):not([readonly])').first();
    }
    await valueInput1.click();
    await page.waitForTimeout(100);
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(50);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(100);
    await valueInput1.pressSequentially(G1_COND1_VALUE_CENTS);
    await page.waitForTimeout(300);
    console.log('    G1 Cond1 — valor: R$ 150.000,00');

    // Screenshot após condição 1 do Grupo 1 preenchida
    const screenshotCond1Preenchida = 'cond1-preenchida.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotCond1Preenchida) });
    console.log('    Screenshot condição 1 preenchida capturada');

    // ====== GRUPO 1 — + Adicionar condição ======
    const addCondBtn = page.getByText('Adicionar condição').first();
    await addCondBtn.scrollIntoViewIfNeeded();
    await addCondBtn.click();
    await page.waitForTimeout(500);
    console.log('    G1 — Clicou em "+ Adicionar condição"');

    // ====== GRUPO 1 — CONDIÇÃO 2: Título do card - Contém - teste ======
    const filterTypeInput2 = page.locator('input[aria-autocomplete="list"]').last();
    await filterTypeInput2.click();
    await filterTypeInput2.pressSequentially(G1_COND2_TYPE, { delay: 30 });
    await page.waitForTimeout(600);

    const filterListbox2 = page.getByRole('listbox');
    await filterListbox2.waitFor({ state: 'visible', timeout: 8000 });
    await filterTypeInput2.press('ArrowDown');
    await page.waitForTimeout(200);
    await filterTypeInput2.press('Enter');
    await page.waitForTimeout(600);
    console.log(`    G1 Cond2 — tipo: "${G1_COND2_TYPE}"`);

    const opInput2 = page.locator('input[placeholder="Operador"]').last();
    await opInput2.waitFor({ state: 'visible', timeout: 8000 });
    await opInput2.click();
    await page.waitForTimeout(200);
    await opInput2.press('ArrowDown');
    await page.waitForTimeout(400);

    const contemOption = page.locator('.MuiPopover-root [role="option"]').filter({ hasText: /^Contém$/ });
    await contemOption.waitFor({ state: 'visible', timeout: 5000 });
    await contemOption.click();
    await page.waitForTimeout(500);
    console.log(`    G1 Cond2 — operador: "${G1_COND2_OPERATOR}"`);

    const valueInput2 = page.locator('input[type="text"]:not([aria-autocomplete]):not([readonly])').last();
    await valueInput2.click();
    await page.waitForTimeout(100);
    await valueInput2.pressSequentially(G1_COND2_VALUE);
    await page.waitForTimeout(300);
    console.log(`    G1 Cond2 — valor: "${G1_COND2_VALUE}"`);

    // Screenshot Grupo 1 completo
    const screenshotGrupo1Preenchido = 'grupo1-preenchido.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotGrupo1Preenchido) });
    console.log('    Screenshot Grupo 1 preenchido capturada');

    // ====== + Adicionar grupo de condições ======
    const addGroupBtn = page.getByText('Adicionar grupo de condições');
    await addGroupBtn.scrollIntoViewIfNeeded();
    await addGroupBtn.click();
    await page.waitForTimeout(600);
    console.log('    Clicou em "+ Adicionar grupo de condições"');

    // ====== GRUPO 2 — CONDIÇÃO 1: Valor final - Maior ou igual a - R$ 149.000,00 ======
    const filterTypeInput3 = page.locator('input[aria-autocomplete="list"]').last();
    await filterTypeInput3.click();
    await filterTypeInput3.pressSequentially(G2_COND1_TYPE, { delay: 30 });
    await page.waitForTimeout(600);

    const filterListbox3 = page.getByRole('listbox');
    await filterListbox3.waitFor({ state: 'visible', timeout: 8000 });
    await filterTypeInput3.press('ArrowDown');
    await page.waitForTimeout(200);
    await filterTypeInput3.press('Enter');
    await page.waitForTimeout(600);
    console.log(`    G2 Cond1 — tipo: "${G2_COND1_TYPE}"`);

    const opInput3 = page.locator('input[placeholder="Operador"]').last();
    await opInput3.waitFor({ state: 'visible', timeout: 8000 });
    await opInput3.click();
    await page.waitForTimeout(200);
    await opInput3.press('ArrowDown');
    await page.waitForTimeout(400);

    // "Maior ou igual a" não é o primeiro operador — selecionar pelo texto
    const maiorIgualOption = page.locator('.MuiPopover-root [role="option"]').filter({ hasText: /^Maior ou igual a$/ });
    await maiorIgualOption.waitFor({ state: 'visible', timeout: 5000 });
    await maiorIgualOption.click();
    await page.waitForTimeout(500);
    console.log(`    G2 Cond1 — operador: "${G2_COND1_OPERATOR}"`);

    let valueInput3 = page.locator('input[inputmode="decimal"]').last();
    if (!(await valueInput3.isVisible({ timeout: 1500 }).catch(() => false))) {
      valueInput3 = page.locator('input[inputmode="numeric"]').last();
    }
    if (!(await valueInput3.isVisible({ timeout: 1500 }).catch(() => false))) {
      valueInput3 = page.locator('input[type="text"]:not([aria-autocomplete]):not([readonly])').last();
    }
    await valueInput3.click();
    await page.waitForTimeout(100);
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(50);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(100);
    await valueInput3.pressSequentially(G2_COND1_VALUE_CENTS);
    await page.waitForTimeout(300);
    console.log('    G2 Cond1 — valor: R$ 149.000,00');

    // Screenshot com ambos os grupos preenchidos (antes de aplicar)
    const screenshotFiltroPreenchido = 'filtro-preenchido.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotFiltroPreenchido) });
    console.log('    Screenshot filtro multi-grupo preenchido capturada');

    // ====== Aplicar filtro ======
    const snapshotBeforeApply = getRequests();
    await page.getByRole('button', { name: /Aplicar filtro/i }).click();
    await page.waitForTimeout(2500);

    const requestsAplicarFiltro = getRequests().slice(snapshotBeforeApply.length);
    console.log(`    ${requestsAplicarFiltro.length} request(s) ao aplicar filtro`);

    // ====== Screenshot do board filtrado ======
    const screenshotBoard = 'board-filtro-multi-grupo.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBoard), fullPage: true });
    console.log('    Screenshot do board capturada');

    // ====== Visão Tabela ======
    const snapshotBeforeTabela = getRequests();
    await page.getByText('Tabela', { exact: true }).click();
    await page.waitForTimeout(2000);

    const screenshotTabela = 'tabela-filtro-multi-grupo.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotTabela), fullPage: true });
    console.log('    Screenshot da tabela capturada');

    const requestsVisaoTabela = getRequests().slice(snapshotBeforeTabela.length);
    console.log(`    ${requestsVisaoTabela.length} request(s) na visão tabela`);

    return {
      screenshotCond1Preenchida,
      screenshotGrupo1Preenchido,
      screenshotFiltroPreenchido,
      screenshotBoard,
      screenshotTabela,
      requestsNavegacao,
      requestsAplicarFiltro,
      requestsVisaoTabela,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
