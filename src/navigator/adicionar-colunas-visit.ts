import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

// Seção "Card"
const SECTION_CARD = 'Card';
const COL_VALOR_PROPOSTA = 'Valor da proposta';

// Seção "Parecer de crédito"
const SECTION_PARECER = 'Parecer de crédito';
const COL_STATUS_PARECER = 'Status do parecer';

export interface AdicionarColunasResult {
  screenshotTabelaInicial: string;
  screenshotPainelAberto: string;
  screenshotCardSelecionado: string;
  screenshotAmbosSelecionados: string;
  screenshotTabelaFinal: string;
  requestsNavegacao: CapturedRequest[];
  requestsVisaoTabela: CapturedRequest[];
  requestsAdicionarColunas: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitAdicionarColunas(
  context: BrowserContext,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<AdicionarColunasResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'board', 'adicionar-colunas');
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

    // ====== Mudar para visão Tabela ======
    const snapshotBeforeTabela = getRequests();
    await page.getByText('Tabela', { exact: true }).click();
    await page.waitForTimeout(2000);

    await expect(page.getByText('Código do card')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const requestsVisaoTabela = getRequests().slice(snapshotBeforeTabela.length);
    console.log(`    ${requestsVisaoTabela.length} request(s) na visão tabela`);

    // Screenshot da tabela inicial (antes de adicionar colunas)
    const screenshotTabelaInicial = '01-tabela-inicial.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotTabelaInicial), fullPage: true });
    console.log('    Screenshot tabela inicial capturada');

    // ====== Abrir painel "Configurar colunas" ======
    await page.getByRole('button').filter({ hasText: /Adicionar colunas/i }).click();
    await expect(page.getByText('Configurar colunas')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(600);
    console.log('    Painel "Configurar colunas" aberto');

    // Screenshot do painel com seções colapsadas
    const screenshotPainelAberto = '02-painel-configurar-colunas.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotPainelAberto) });
    console.log('    Screenshot painel aberto capturada');

    // ====== Expandir seção "Card" e marcar "Valor da proposta" ======
    const cardSectionBtn = page.getByRole('button', { name: new RegExp(`^${SECTION_CARD}$`) });
    await cardSectionBtn.scrollIntoViewIfNeeded();
    await cardSectionBtn.click();
    await page.waitForTimeout(800);
    console.log(`    Seção "${SECTION_CARD}" expandida`);

    // Tenta label primeiro (checkbox MUI), depois texto genérico
    let valorPropostaEl = page.getByLabel(COL_VALOR_PROPOSTA).first();
    if (!(await valorPropostaEl.isVisible({ timeout: 1500 }).catch(() => false))) {
      valorPropostaEl = page.locator('label', { hasText: COL_VALOR_PROPOSTA }).first();
    }
    if (!(await valorPropostaEl.isVisible({ timeout: 1500 }).catch(() => false))) {
      valorPropostaEl = page.getByText(new RegExp(COL_VALOR_PROPOSTA)).first();
    }
    await valorPropostaEl.waitFor({ state: 'visible', timeout: 8000 });
    await valorPropostaEl.click();
    await page.waitForTimeout(400);
    console.log(`    "${COL_VALOR_PROPOSTA}" marcado`);

    // Screenshot com Card expandido e checkbox marcado
    const screenshotCardSelecionado = '03-card-valor-proposta-selecionado.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotCardSelecionado) });
    console.log('    Screenshot Card selecionado capturada');

    // ====== Expandir seção "Parecer de crédito" e marcar "Status do parecer" ======
    // data-testid descoberto via erro de strict mode: section-accordion-opinion é o acordeão pai
    const parecerSectionBtn = page.getByTestId('section-accordion-opinion').getByRole('button', { name: SECTION_PARECER });
    await parecerSectionBtn.scrollIntoViewIfNeeded();
    await parecerSectionBtn.click();
    await page.waitForTimeout(800);
    console.log(`    Seção "${SECTION_PARECER}" expandida`);

    let statusParecerEl = page.getByLabel(new RegExp(COL_STATUS_PARECER)).first();
    if (!(await statusParecerEl.isVisible({ timeout: 1500 }).catch(() => false))) {
      statusParecerEl = page.locator('label', { hasText: new RegExp(COL_STATUS_PARECER) }).first();
    }
    if (!(await statusParecerEl.isVisible({ timeout: 1500 }).catch(() => false))) {
      statusParecerEl = page.getByText(new RegExp(COL_STATUS_PARECER)).first();
    }
    await statusParecerEl.waitFor({ state: 'visible', timeout: 8000 });
    await statusParecerEl.click();
    await page.waitForTimeout(400);
    console.log(`    "${COL_STATUS_PARECER}: Concluído | Pendente" marcado`);

    // Screenshot com ambos os checkboxes marcados
    const screenshotAmbosSelecionados = '04-ambos-selecionados.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotAmbosSelecionados) });
    console.log('    Screenshot ambos selecionados capturada');

    // ====== Clicar em "Adicionar" ======
    const snapshotBeforeAdicionar = getRequests();
    await page.getByRole('button', { name: /^Adicionar$/ }).click();
    await page.waitForTimeout(2500);

    // Aguarda painel fechar (botão "Adicionar colunas" volta a ser visível)
    await expect(page.getByText('Configurar colunas')).toBeHidden({ timeout: 8000 });
    await page.waitForTimeout(500);

    const requestsAdicionarColunas = getRequests().slice(snapshotBeforeAdicionar.length);
    console.log(`    ${requestsAdicionarColunas.length} request(s) ao adicionar colunas`);

    // ====== Scroll horizontal para ver colunas novas ======
    await page.evaluate(() => {
      const selectors = [
        '[class*="MuiTableContainer"]',
        '[class*="tableContainer"]',
        '[class*="table-container"]',
        'table',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.scrollWidth > el.clientWidth) {
          el.scrollLeft = el.scrollWidth;
          return;
        }
      }
      // fallback: scroll o corpo horizontalmente
      window.scrollTo(document.body.scrollWidth, 0);
    });
    await page.waitForTimeout(1000);
    console.log('    Tabela rolada para a direita');

    // Screenshot final com colunas novas visíveis
    const screenshotTabelaFinal = '05-tabela-colunas-adicionadas.png';
    await page.screenshot({ path: path.join(screenshotsDir, screenshotTabelaFinal), fullPage: true });
    console.log('    Screenshot tabela com colunas adicionadas capturada');

    return {
      screenshotTabelaInicial,
      screenshotPainelAberto,
      screenshotCardSelecionado,
      screenshotAmbosSelecionados,
      screenshotTabelaFinal,
      requestsNavegacao,
      requestsVisaoTabela,
      requestsAdicionarColunas,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
