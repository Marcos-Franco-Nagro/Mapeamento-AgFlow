import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const COMMENT_TEXT = 'Testando comentario automatico - marcos';

export interface ComentarioResult {
  screenshotCardInicial: string;
  screenshotAbaComentarios: string;
  screenshotComentarioPublicado: string;
  requestsNavegacao: CapturedRequest[];
  requestsAdicionarComentario: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitComentario(
  context: BrowserContext,
  cardUrl: string,
): Promise<ComentarioResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const ssNavegacao  = path.join('vault', 'screenshots', 'comentario', 'navegacao');
  const ssAdicionar  = path.join('vault', 'screenshots', 'comentario', 'adicionar-comentario');

  try {
    await fs.mkdir(ssNavegacao, { recursive: true });
    await fs.mkdir(ssAdicionar, { recursive: true });

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

    // ====== Abrir aba "Comentários" ======
    const snapshotBeforeComentario = getRequests();

    const abaComentarios = page.getByRole('tab', { name: 'Comentários' });
    await expect(abaComentarios).toBeVisible({ timeout: 5000 });
    await abaComentarios.click();
    await expect(page.getByPlaceholder('Escreva aqui...')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(500);
    console.log('    Aba "Comentários" aberta');

    const screenshotAbaComentarios = '01-aba-comentarios.png';
    await page.screenshot({ path: path.join(ssAdicionar, screenshotAbaComentarios) });

    // ====== Escrever e publicar comentário ======
    const textarea = page.getByPlaceholder('Escreva aqui...');
    await textarea.click();
    await textarea.fill(COMMENT_TEXT);
    await page.waitForTimeout(300);
    console.log(`    Comentário preenchido: "${COMMENT_TEXT}"`);

    await page.getByRole('button', { name: 'Publicar' }).click();
    await page.waitForTimeout(2000);
    console.log('    Comentário publicado');

    const requestsAdicionarComentario = getRequests().slice(snapshotBeforeComentario.length);
    console.log(`    ${requestsAdicionarComentario.length} request(s) ao adicionar comentário`);

    const screenshotComentarioPublicado = '02-comentario-publicado.png';
    await page.screenshot({ path: path.join(ssAdicionar, screenshotComentarioPublicado) });
    console.log('    Screenshots comentario capturadas');

    return {
      screenshotCardInicial,
      screenshotAbaComentarios,
      screenshotComentarioPublicado,
      requestsNavegacao,
      requestsAdicionarComentario,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
