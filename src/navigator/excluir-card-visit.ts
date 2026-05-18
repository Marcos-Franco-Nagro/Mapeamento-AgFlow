import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface ExcluirCardResult {
  screenshotCardInicial: string;
  screenshotPopupConfirmacao: string;
  screenshotPosExclusao: string;
  requestsNavegacao: CapturedRequest[];
  requestsExcluir: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitExcluirCard(
  context: BrowserContext,
  cardUrl: string,
): Promise<ExcluirCardResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const ssNavegacao = path.join('vault', 'screenshots', 'excluir-card', 'navegacao');
  const ssExcluir   = path.join('vault', 'screenshots', 'excluir-card', 'excluir');

  try {
    await fs.mkdir(ssNavegacao, { recursive: true });
    await fs.mkdir(ssExcluir,   { recursive: true });

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

    // ====== Abrir popup de confirmação de exclusão ======
    const snapshotBeforeExcluir = getRequests();

    // aria-label="Excluir card" confirmado via inspeção do DOM
    const deleteBtn = page.locator('button[aria-label="Excluir card"]');
    await expect(deleteBtn).toBeVisible({ timeout: 5000 });
    await deleteBtn.click();

    await expect(page.getByText('Confirmar exclusão')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(500);
    console.log('    Popup "Confirmar exclusão" aberto');

    const screenshotPopupConfirmacao = '01-popup-confirmacao.png';
    await page.screenshot({ path: path.join(ssExcluir, screenshotPopupConfirmacao) });

    // ====== Confirmar exclusão ======
    const confirmBtn = page.getByRole('button', { name: /Sim, excluir/i });
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await confirmBtn.click();

    // Aguarda popup fechar e redirect pós-exclusão (volta ao board)
    await expect(page.getByText('Confirmar exclusão')).toBeHidden({ timeout: 8000 });
    await page.waitForTimeout(2000);
    console.log('    Card excluído');

    const requestsExcluir = getRequests().slice(snapshotBeforeExcluir.length);
    console.log(`    ${requestsExcluir.length} request(s) ao excluir card`);

    const screenshotPosExclusao = '02-pos-exclusao.png';
    await page.screenshot({ path: path.join(ssExcluir, screenshotPosExclusao) });
    console.log('    Screenshots excluir-card capturadas');

    return {
      screenshotCardInicial,
      screenshotPopupConfirmacao,
      screenshotPosExclusao,
      requestsNavegacao,
      requestsExcluir,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
