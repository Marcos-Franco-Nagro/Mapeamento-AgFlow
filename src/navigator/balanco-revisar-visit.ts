import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
// Recálculo pela IA leva alguns segundos
const AI_TIMEOUT = parseInt(process.env.AI_TIMEOUT ?? '60000');

export interface BalancoRevisarResult {
  cardId: string;
  phaseSlug: string;
  screenshotBefore: string;
  screenshotRevisao: string;
  screenshotSalvo: string;
  screenshotVisaoGeral: string;
  screenshotGerarAnalise: string;
  screenshotVisaoGeralFinal: string;
  requestsRevisar: CapturedRequest[];
  requestsVisaoGeral: CapturedRequest[];
  crawledAt: string;
  revisedOk: boolean;
}

export async function visitBalancoRevisar(
  context: BrowserContext,
  card: CardFixture,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
  anoSelecionado?: string,
): Promise<BalancoRevisarResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'balanco', 'balanco-revisar');
  const outputDir = path.join('crawl-output', 'balanco', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/credit-analysis/financial-report`;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    // A página abre em "Visão Geral" por padrão — clicar no tab do ano para ver os resultados
    // Usa o ano da extração se disponível, senão clica no primeiro tab de ano encontrado
    const anoPattern = anoSelecionado ? new RegExp(`^${anoSelecionado}`) : /^20\d{2}/;
    const anoTab = page.locator(`button, [role="tab"]`).filter({ hasText: anoPattern }).first();
    await expect(anoTab).toBeVisible({ timeout: 8000 });
    await anoTab.click();
    await page.waitForTimeout(1000);

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    const snapshotBefore = getRequests();

    // Clicar em "Revisar os dados"
    const revisarButton = page.getByRole('button', { name: 'Revisar os dados', exact: true });
    await expect(revisarButton).toBeVisible({ timeout: 8000 });
    await revisarButton.click();

    // Aguardar popup abrir — "Salvar e Recalcular" só existe dentro do popup
    const saveButton = page.getByRole('button', { name: 'Salvar e Recalcular', exact: true });
    await expect(saveButton).toBeVisible({ timeout: 30000 });

    const screenshotRevisao = `${card.cardId}-revisao.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotRevisao), fullPage: true });

    await expect(saveButton).toBeEnabled({ timeout: 5000 });
    await saveButton.click();

    // Após "Salvar e Recalcular" aparece popup de escolha — clicar em "Nova análise com IA"
    console.log('    Aguardando popup de escolha...');
    const novaAnaliseButton = page.getByRole('button', { name: 'Nova análise com IA', exact: true });
    await expect(novaAnaliseButton).toBeVisible({ timeout: 30000 });
    await novaAnaliseButton.click();

    // Aguardar popup de escolha fechar e novo loading dos dados completar
    console.log('    Aguardando nova análise com IA...');
    await expect(novaAnaliseButton).toBeHidden({ timeout: AI_TIMEOUT });

    // "Revisar os dados" reaparecer confirma que o recálculo terminou
    await expect(page.getByRole('button', { name: 'Revisar os dados', exact: true }))
      .toBeVisible({ timeout: 60000 });
    await page.waitForTimeout(3000);

    const screenshotSalvo = `${card.cardId}-salvo.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotSalvo), fullPage: true });

    // Navegar para Visão Geral
    const visaoGeralTab = page.locator(`button, [role="tab"]`).filter({ hasText: /^visão geral$/i }).first();
    await expect(visaoGeralTab).toBeVisible({ timeout: 8000 });
    await visaoGeralTab.click();
    await page.waitForTimeout(1500);

    const screenshotVisaoGeral = `${card.cardId}-visao-geral.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotVisaoGeral), fullPage: true });

    const requestsRevisar = getRequests().slice(snapshotBefore.length);
    const snapshotVisaoGeral = getRequests();

    // Clicar em "Gerar análise com IA" (painel direito da Visão Geral)
    const gerarAnaliseIaButton = page.getByRole('button', { name: 'Gerar análise com IA', exact: true });
    await expect(gerarAnaliseIaButton).toBeVisible({ timeout: 10000 });
    await gerarAnaliseIaButton.click();

    // Popup "Gerar análise com IA" — clicar em "Gerar análise"
    const gerarAnaliseButton = page.getByRole('button', { name: 'Gerar análise', exact: true });
    await expect(gerarAnaliseButton).toBeVisible({ timeout: 15000 });

    const screenshotGerarAnalise = `${card.cardId}-gerar-analise-popup.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotGerarAnalise), fullPage: true });

    await gerarAnaliseButton.click();

    // Aguardar popup fechar
    console.log('    Aguardando geração da análise com IA...');
    await expect(gerarAnaliseButton).toBeHidden({ timeout: 30000 });

    // "Atualizar análise" aparece no início do processamento (ainda em loading)
    await expect(page.getByRole('button', { name: 'Atualizar análise', exact: true }))
      .toBeVisible({ timeout: AI_TIMEOUT });
    // Aguardar o processamento terminar — texto de loading some quando os resultados aparecem
    console.log('    Aguardando conteúdo da análise carregar...');
    await expect(page.getByText('A análise da IA está sendo processada'))
      .toBeHidden({ timeout: AI_TIMEOUT });
    await page.waitForTimeout(1500);

    const screenshotVisaoGeralFinal = `${card.cardId}-visao-geral-final.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotVisaoGeralFinal), fullPage: true });

    const requestsVisaoGeral = getRequests().slice(snapshotVisaoGeral.length);

    const result: BalancoRevisarResult = {
      cardId: card.cardId,
      phaseSlug,
      screenshotBefore,
      screenshotRevisao,
      screenshotSalvo,
      screenshotVisaoGeral,
      screenshotGerarAnalise,
      screenshotVisaoGeralFinal,
      requestsRevisar,
      requestsVisaoGeral,
      crawledAt: new Date().toISOString(),
      revisedOk: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-revisar.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
