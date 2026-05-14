import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
// Extração via IA pode demorar bastante — 5 min de timeout
const AI_TIMEOUT = parseInt(process.env.AI_TIMEOUT ?? '300000');

const DEFAULT_PDF_PATH =
  'C:\\Users\\MarcosFrancoOliveira\\OneDrive - NAGRO CREDITO AGRO\\Documentos\\PDFs de Balanço e DRE\\DRE e Balanço 2023 1.pdf';
const PDF_PATH = process.env.BALANCO_PDF_PATH ?? DEFAULT_PDF_PATH;

export interface BalancoExtrairResult {
  cardId: string;
  phaseSlug: string;
  anoSelecionado: string;
  screenshotBefore: string;
  screenshotModal: string;
  screenshotUpload: string;
  screenshotExtraindo: string;
  screenshotDadosExtraidos: string;
  screenshotConfirmado: string;
  requestsExtrair: CapturedRequest[];
  crawledAt: string;
  extractedOk: boolean;
}

export async function visitBalancoExtrair(
  context: BrowserContext,
  card: CardFixture,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<BalancoExtrairResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'balanco', 'balanco-extrair');
  const outputDir = path.join('crawl-output', 'balanco', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/financial-report`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    const snapshotBefore = getRequests();

    // Clicar em "Extrair balanço e DRE"
    const extractButton = page.getByRole('button', { name: 'Extrair balanço e DRE', exact: true });
    await expect(extractButton).toBeVisible({ timeout: 8000 });
    await extractButton.click();

    // Passo 1 do wizard — selecionar o ano
    const proximoButton = page.getByRole('button', { name: 'Próximo', exact: true });
    await expect(proximoButton).toBeVisible({ timeout: 12000 });

    const screenshotModal = `${card.cardId}-modal-ano.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotModal), fullPage: true });

    await page.locator('[role="combobox"]').last().click();
    const firstOption = page.locator('[role="option"]').first();
    await firstOption.waitFor({ timeout: 5000 });
    const anoSelecionado = ((await firstOption.textContent()) ?? '?').trim();
    await firstOption.click();
    await proximoButton.click();

    // Passo 2 do wizard — upload do PDF de balanço
    // Aguarda o input de arquivo aparecer (pode ser hidden — setInputFiles funciona mesmo assim)
    console.log(`    Anexando PDF: ${path.basename(PDF_PATH)}`);
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached({ timeout: 10000 });
    await fileInput.setInputFiles(PDF_PATH);
    await page.waitForTimeout(1000);

    const screenshotUpload = `${card.cardId}-modal-upload.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotUpload), fullPage: true });

    // Após anexar o PDF o botão muda de "Próximo" para "Solicitar"
    const solicitarButton = page.getByRole('button', { name: 'Solicitar', exact: true });
    await expect(solicitarButton).toBeEnabled({ timeout: 8000 });
    await solicitarButton.click();

    // Aguardar o modal fechar — "Solicitar" pode demorar para processar o upload
    console.log('    Aguardando envio do arquivo (modal fechando)...');
    await expect(page.getByRole('heading', { name: 'Nova análise' }))
      .toBeHidden({ timeout: 60000 });
    await page.waitForTimeout(3000);

    // Página agora está em Visão Geral mostrando "O documento está sendo extraído"
    const screenshotExtraindo = `${card.cardId}-extraindo.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotExtraindo), fullPage: true });

    // Clicar no tab do ano selecionado para acompanhar a extração naquela view
    console.log(`    Clicando no tab do ano ${anoSelecionado}...`);
    const anoPattern = new RegExp(`^${anoSelecionado}`);
    const anoTab = page.locator(`button, [role="tab"]`).filter({ hasText: anoPattern }).first();
    await expect(anoTab).toBeVisible({ timeout: 15000 });
    await anoTab.click();
    await page.waitForTimeout(1000);

    // Aguardar IA concluir — botão "Salvar" só aparece dentro do popup "Dados extraídos"
    console.log(`    Aguardando extração (ano ${anoSelecionado}) — pode demorar até 5 min...`);
    const saveButton = page.getByRole('button', { name: 'Salvar', exact: true });
    await expect(saveButton).toBeVisible({ timeout: AI_TIMEOUT });

    const screenshotDadosExtraidos = `${card.cardId}-dados-extraidos.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotDadosExtraidos), fullPage: true });

    await expect(saveButton).toBeEnabled({ timeout: 5000 });
    await saveButton.click();

    // Aguardar o popup fechar
    await expect(saveButton).toBeHidden({ timeout: 30000 });

    // "Revisar os dados" aparece quando todos os indicadores foram calculados
    console.log('    Aguardando carregamento dos resultados...');
    await expect(page.getByRole('button', { name: 'Revisar os dados', exact: true }))
      .toBeVisible({ timeout: 60000 });

    const screenshotConfirmado = `${card.cardId}-confirmado.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotConfirmado), fullPage: true });

    const requestsExtrair = getRequests().slice(snapshotBefore.length);

    const result: BalancoExtrairResult = {
      cardId: card.cardId,
      phaseSlug,
      anoSelecionado,
      screenshotBefore,
      screenshotModal,
      screenshotUpload,
      screenshotExtraindo,
      screenshotDadosExtraidos,
      screenshotConfirmado,
      requestsExtrair,
      crawledAt: new Date().toISOString(),
      extractedOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-extrair.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
