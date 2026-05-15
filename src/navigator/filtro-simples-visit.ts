import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

const FILTER_TYPE = 'Limite aprovado pelo analista';
const FILTER_OPERATOR = 'Igual a';
// R$ 150.000,00 — máscara de centavos: os dois últimos dígitos são decimais
const FILTER_VALUE_CENTS = '15000000';

export interface FiltroSimplesResult {
  screenshotFiltroPreenchido: string;
  screenshotBoard: string;
  screenshotTabela: string;
  requestsNavegacao: CapturedRequest[];
  requestsAplicarFiltro: CapturedRequest[];
  requestsVisaoTabela: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitFiltroSimples(
  context: BrowserContext,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<FiltroSimplesResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'filtros', 'filtro-simples');
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

    // Limpar condições existentes (evita "Aplicar filtro" disabled quando filtro já está salvo)
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

    // ====== Tipo de filtro (MUI Autocomplete pesquisável) ======
    // pressSequentially dispara eventos React incrementais — fill() pode não acionar onChange em alguns builds
    const filterTypeInput = page.locator('input[aria-autocomplete="list"]').first();
    await filterTypeInput.click();
    await filterTypeInput.pressSequentially(FILTER_TYPE, { delay: 30 });
    await page.waitForTimeout(600);

    const filterListbox = page.getByRole('listbox');
    await filterListbox.waitFor({ state: 'visible', timeout: 8000 });

    // ArrowDown + Enter fecha o dropdown do MUI Autocomplete sem precisar de Escape
    await filterTypeInput.press('ArrowDown');
    await page.waitForTimeout(200);
    await filterTypeInput.press('Enter');
    await page.waitForTimeout(600);
    console.log(`    Tipo de filtro: "${FILTER_TYPE}"`);

    // ====== Operador ======
    await page.waitForTimeout(500);

    // ArrowDown abre o dropdown; clicar na opção é mais confiável que Enter para fechar o Popover
    const opInput = page.locator('input[placeholder="Operador"]');
    await opInput.waitFor({ state: 'visible', timeout: 8000 });
    await opInput.click();
    await page.waitForTimeout(200);
    await opInput.press('ArrowDown');
    await page.waitForTimeout(400);

    // Escopo .MuiPopover-root evita conflito com o Popper do Autocomplete de tipo
    const firstOpOption = page.locator('.MuiPopover-root [role="option"]').first();
    await firstOpOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstOpOption.click();
    await page.waitForTimeout(500);
    console.log(`    Operador: "${FILTER_OPERATOR}"`);

    // ====== Valor (campo moeda com máscara de centavos) ======
    // Tenta inputmode="decimal/numeric"; fallback para input de texto não-autocomplete e não-readonly
    let valueInput = page.locator('input[inputmode="decimal"]').first();
    if (!(await valueInput.isVisible({ timeout: 1500 }).catch(() => false))) {
      valueInput = page.locator('input[inputmode="numeric"]').first();
    }
    if (!(await valueInput.isVisible({ timeout: 1500 }).catch(() => false))) {
      // Exclui [aria-autocomplete] (tipo de filtro) e [readonly] (operador após seleção)
      valueInput = page.locator('input[type="text"]:not([aria-autocomplete]):not([readonly])').last();
    }
    // Ctrl+A + Backspace garante que o estado interno da máscara de moeda seja zerado
    await valueInput.click();
    await page.waitForTimeout(100);
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(50);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(100);
    await valueInput.pressSequentially(FILTER_VALUE_CENTS);
    await page.waitForTimeout(300);
    console.log('    Valor: R$ 150.000,00');

    // Verificar se aparece seletor de múltiplos clientes — usar padrão "Qualquer cliente do grupo"
    const multiClientText = page.getByText('Quando houver múltiplos clientes');
    if (await multiClientText.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('    Seletor de múltiplos clientes visível — mantendo "Qualquer cliente do grupo" (padrão)');
    }

    // Screenshot do painel com filtro preenchido (antes de aplicar)
    const screenshotFiltroPreenchido = 'filtro-preenchido.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotFiltroPreenchido) });
    console.log('    Screenshot do painel preenchido capturada');

    // ====== Aplicar filtro ======
    const snapshotBeforeApply = getRequests();
    await page.getByRole('button', { name: /Aplicar filtro/i }).click();
    await page.waitForTimeout(2500);

    const requestsAplicarFiltro = getRequests().slice(snapshotBeforeApply.length);
    console.log(`    ${requestsAplicarFiltro.length} request(s) ao aplicar filtro`);

    // ====== Screenshot do board filtrado ======
    const screenshotBoard = 'board-filtro-simples.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBoard), fullPage: true });
    console.log('    Screenshot do board capturada');

    // ====== Visão Tabela ======
    const snapshotBeforeTabela = getRequests();
    // "Tabela" é link de navegação no board (não role="tab")
    await page.getByText('Tabela', { exact: true }).click();
    await page.waitForTimeout(2000);

    const screenshotTabela = 'tabela-filtro-simples.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotTabela), fullPage: true });
    console.log('    Screenshot da tabela capturada');

    const requestsVisaoTabela = getRequests().slice(snapshotBeforeTabela.length);
    console.log(`    ${requestsVisaoTabela.length} request(s) na visão tabela`);

    return {
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
