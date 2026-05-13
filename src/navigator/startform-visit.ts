import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface StartformResult {
  screenshotBoard: string;
  screenshotForm: string;
  screenshotPreenchido: string;
  screenshotConfirmado: string;
  requestsStartform: CapturedRequest[];
  crawledAt: string;
  submittedOk: boolean;
}

export async function visitStartform(
  context: BrowserContext,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<StartformResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'startform');
  const outputDir = path.join('crawl-output', 'startform');

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/board`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBoard = 'board-antes.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBoard), fullPage: true });

    // Clicar na aba "Formulário" no topo do board
    const formularioTab = page.locator('button, a, [role="tab"]').filter({ hasText: /^Formulário$/i }).first();
    await expect(formularioTab).toBeVisible({ timeout: 8000 });
    await formularioTab.click();
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotForm = 'startform-vazio.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotForm), fullPage: true });

    const snapshotBefore = getRequests();

    // Preencher Nome Completo do Cliente (primeiro input "Digite aqui" do formulário)
    const nomeInput = page.getByPlaceholder('Digite aqui').first();
    await expect(nomeInput).toBeVisible({ timeout: 8000 });
    await nomeInput.fill('marcos - mapeando startform');

    // Preencher CPF (chip input — confirmar com Enter)
    const cpfInput = page.getByPlaceholder(/CPF ou CNPJ/i);
    await expect(cpfInput).toBeVisible({ timeout: 5000 });
    await cpfInput.fill('700.420.646-78');
    await cpfInput.press('Enter');
    await page.waitForTimeout(300);

    // Preencher Valor de crédito solicitado
    const valorInput = page.locator('div').filter({ hasText: /Valor de crédito solicitado/i }).last().locator('input').first();
    await expect(valorInput).toBeVisible({ timeout: 5000 });
    await valorInput.fill('1000000');
    await page.waitForTimeout(300);

    const screenshotPreenchido = 'startform-preenchido.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotPreenchido), fullPage: true });

    // Preparar captura da resposta antes de submeter
    const submitResponse = page.waitForResponse(
      (resp) => resp.request().method() === 'POST',
      { timeout: 30000 },
    );

    // Clicar em "Solicitar Análise" (pode estar fora da viewport — Playwright auto-scrolla)
    const solicitarButton = page.getByRole('button', { name: /Solicitar Análise/i });
    await expect(solicitarButton).toBeVisible({ timeout: 8000 });
    await solicitarButton.click();

    console.log('    Aguardando submissão do formulário...');
    await submitResponse;
    await page.waitForTimeout(2000);

    const screenshotConfirmado = 'startform-confirmado.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConfirmado), fullPage: true });

    const requestsStartform = getRequests().slice(snapshotBefore.length);

    const result: StartformResult = {
      screenshotBoard,
      screenshotForm,
      screenshotPreenchido,
      screenshotConfirmado,
      requestsStartform,
      crawledAt: new Date().toISOString(),
      submittedOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, 'startform.json'),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
