import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface EtiquetasResult {
  screenshotCardInicial: string;
  screenshotPopupAberto: string;
  screenshotEtiquetaAdicionada: string;
  screenshotPopupRemover: string;
  screenshotEtiquetaRemovida: string;
  requestsNavegacao: CapturedRequest[];
  requestsAdicionarEtiqueta: CapturedRequest[];
  requestsRemoverEtiqueta: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitEtiquetas(
  context: BrowserContext,
  cardUrl: string,
): Promise<EtiquetasResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const ssNavegacao    = path.join('vault', 'screenshots', 'etiquetas', 'navegacao');
  const ssAdicionar    = path.join('vault', 'screenshots', 'etiquetas', 'adicionar-etiqueta');
  const ssRemover      = path.join('vault', 'screenshots', 'etiquetas', 'remover-etiqueta');

  try {
    await fs.mkdir(ssNavegacao, { recursive: true });
    await fs.mkdir(ssAdicionar, { recursive: true });
    await fs.mkdir(ssRemover,   { recursive: true });

    // ====== Navegação até o card ======
    await page.goto(cardUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(cardUrl);

    await expect(page.getByText('Resumo geral')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const requestsNavegacao = getRequests();
    console.log(`    ${requestsNavegacao.length} request(s) na navegação`);

    const screenshotCardInicial = '01-card-inicial.png';
    await page.screenshot({ path: path.join(ssNavegacao, screenshotCardInicial) });
    console.log('    Screenshot card inicial capturada');

    // ====== Abrir popup de etiquetas ======
    // aria-label="Etiquetas" confirmado via inspeção do DOM
    const labelBtn = page.locator('button[aria-label="Etiquetas"]');
    await expect(labelBtn).toBeVisible({ timeout: 5000 });
    await labelBtn.click();
    await expect(page.getByText('Selecione uma etiqueta')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(500);
    console.log('    Popup "Selecione uma etiqueta" aberto');

    // ====== Adicionar etiqueta ======
    // data-testid="addButton" + data-is-current="false" = etiqueta ainda não aplicada
    const snapshotBeforeAdicionar = getRequests();

    const screenshotPopupAberto = '01-popup-selecionar.png';
    await page.screenshot({ path: path.join(ssAdicionar, screenshotPopupAberto) });

    const chipDisponivel = page.locator('[data-testid="addButton"][data-is-current="false"]').first();
    await expect(chipDisponivel).toBeVisible({ timeout: 5000 });
    const etiquetaNome = (await chipDisponivel.locator('.MuiChip-label').textContent() ?? 'etiqueta').trim();
    await chipDisponivel.click();
    await page.waitForTimeout(2000);
    console.log(`    Etiqueta "${etiquetaNome}" adicionada`);

    const requestsAdicionarEtiqueta = getRequests().slice(snapshotBeforeAdicionar.length);
    console.log(`    ${requestsAdicionarEtiqueta.length} request(s) ao adicionar etiqueta`);

    const screenshotEtiquetaAdicionada = '02-etiqueta-adicionada.png';
    await page.screenshot({ path: path.join(ssAdicionar, screenshotEtiquetaAdicionada) });
    console.log('    Screenshots adicionar-etiqueta capturadas');

    // Fechar popup se ainda estiver aberto
    if (await page.getByText('Selecione uma etiqueta').isVisible({ timeout: 500 }).catch(() => false)) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }

    // ====== Reabrir popup para remover etiqueta ======
    await labelBtn.click();
    await expect(page.getByText('Selecione uma etiqueta')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(1500);
    console.log('    Popup reaberto para remover etiqueta');

    // ====== Remover etiqueta ======
    // data-testid="addButton" + data-is-current="true" = etiqueta aplicada (tem lixeira)
    const snapshotBeforeRemover = getRequests();

    const screenshotPopupRemover = '01-popup-remover.png';
    await page.screenshot({ path: path.join(ssRemover, screenshotPopupRemover) });

    // Aguarda o chip aplicado aparecer (estado React pode demorar a atualizar)
    const chipAplicado = page.locator('[data-testid="addButton"][data-is-current="true"]').first();
    await expect(chipAplicado).toBeVisible({ timeout: 5000 });
    const trashBtn = chipAplicado.locator('button').first();
    await expect(trashBtn).toBeVisible({ timeout: 5000 });
    await trashBtn.click();
    await page.waitForTimeout(1000);
    console.log('    Etiqueta removida');

    const requestsRemoverEtiqueta = getRequests().slice(snapshotBeforeRemover.length);
    console.log(`    ${requestsRemoverEtiqueta.length} request(s) ao remover etiqueta`);

    const screenshotEtiquetaRemovida = '02-etiqueta-removida.png';
    await page.screenshot({ path: path.join(ssRemover, screenshotEtiquetaRemovida) });
    console.log('    Screenshots remover-etiqueta capturadas');

    return {
      screenshotCardInicial,
      screenshotPopupAberto,
      screenshotEtiquetaAdicionada,
      screenshotPopupRemover,
      screenshotEtiquetaRemovida,
      requestsNavegacao,
      requestsAdicionarEtiqueta,
      requestsRemoverEtiqueta,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
