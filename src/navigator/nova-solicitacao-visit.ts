import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface NovaSolicitacaoResult {
  screenshotBoard: string;
  screenshotPopup: string;
  screenshotConfirmado: string;
  requestsNovaSolicitacao: CapturedRequest[];
  crawledAt: string;
  createdOk: boolean;
}

export async function visitNovaSolicitacao(
  context: BrowserContext,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<NovaSolicitacaoResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'nova-solicitacao');
  const outputDir = path.join('crawl-output', 'nova-solicitacao');

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/board`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBoard = 'board-antes.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBoard), fullPage: true });

    const snapshotBefore = getRequests();

    // Clicar em "+ Nova solicitação" (botão no canto inferior esquerdo do board)
    const novaButton = page.getByRole('button', { name: /nova solicitação/i }).first();
    await expect(novaButton).toBeVisible({ timeout: 8000 });
    await novaButton.click();

    // Aguardar popup abrir — "Cancelar" só existe dentro do popup
    await expect(page.getByRole('button', { name: 'Cancelar', exact: true })).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    // Preencher Nome Completo do Cliente (primeiro input com placeholder "Digite aqui" no popup)
    const nomeInput = page.getByPlaceholder('Digite aqui').first();
    await expect(nomeInput).toBeVisible({ timeout: 5000 });
    await nomeInput.fill('marcos - mapeando agflow');

    // Preencher CPF (chip input — confirmar com Enter)
    const cpfInput = page.getByPlaceholder(/CPF ou CNPJ/i);
    await expect(cpfInput).toBeVisible({ timeout: 5000 });
    await cpfInput.fill('700.420.646-78');
    await cpfInput.press('Enter');
    await page.waitForTimeout(300);

    // Preencher Valor de crédito solicitado (campo com adornment "R$" — busca via container)
    const valorInput = page.locator('div').filter({ hasText: /Valor de crédito solicitado/i }).last().locator('input').first();
    await expect(valorInput).toBeVisible({ timeout: 5000 });
    await valorInput.fill('1000000');
    await page.waitForTimeout(300);

    const screenshotPopup = 'popup-preenchido.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotPopup), fullPage: true });

    // Preparar captura da resposta de criação antes de clicar
    const createResponse = page.waitForResponse(
      (resp) => resp.request().method() === 'POST' && resp.url().includes('/cards'),
      { timeout: 30000 },
    );

    // Clicar em "Criar"
    await page.getByRole('button', { name: 'Criar', exact: true }).click();

    // Aguardar resposta da API e popup fechar
    console.log('    Aguardando criação do card...');
    await createResponse;
    await expect(page.getByRole('button', { name: 'Cancelar', exact: true })).toBeHidden({ timeout: 15000 });
    await page.waitForTimeout(2000);

    const screenshotConfirmado = 'board-confirmado.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConfirmado), fullPage: true });

    const requestsNovaSolicitacao = getRequests().slice(snapshotBefore.length);

    const result: NovaSolicitacaoResult = {
      screenshotBoard,
      screenshotPopup,
      screenshotConfirmado,
      requestsNovaSolicitacao,
      crawledAt: new Date().toISOString(),
      createdOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, 'nova-solicitacao.json'),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
