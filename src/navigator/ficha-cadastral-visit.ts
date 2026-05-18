import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface FichaCadastralResult {
  screenshotFichaInicial: string;
  screenshotFormularioAberto: string;
  screenshotFilialSelecionada: string;
  screenshotAposSalvar: string;
  requestsNavegacao: CapturedRequest[];
  requestsSalvar: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitFichaCadastral(
  context: BrowserContext,
  fichaUrl: string,
): Promise<FichaCadastralResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const ssNavegacao = path.join('vault', 'screenshots', 'ficha-cadastral', 'navegacao');
  const ssSalvar    = path.join('vault', 'screenshots', 'ficha-cadastral', 'editar');

  try {
    await fs.mkdir(ssNavegacao, { recursive: true });
    await fs.mkdir(ssSalvar,    { recursive: true });

    // ====== Navegação até a ficha cadastral ======
    await page.goto(fichaUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(fichaUrl);

    await expect(page.getByText('Ficha cadastral').first()).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const requestsNavegacao = getRequests();
    console.log(`    ${requestsNavegacao.length} request(s) na navegação`);

    const screenshotFichaInicial = '01-ficha-cadastral.png';
    await page.screenshot({ path: path.join(ssNavegacao, screenshotFichaInicial), fullPage: true });
    console.log('    Screenshot ficha cadastral capturada');

    // ====== Clicar em "Editar" ======
    const snapshotBeforeSalvar = getRequests();

    const editarBtn = page.getByRole('button', { name: 'Editar' });
    await expect(editarBtn).toBeVisible({ timeout: 5000 });
    await editarBtn.click();

    // Aguarda o formulário de edição aparecer (botão "Salvar" fica visível)
    await expect(page.getByRole('button', { name: 'Salvar' })).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(600);
    console.log('    Formulário de edição aberto');

    const screenshotFormularioAberto = '01-formulario-editar.png';
    await page.screenshot({ path: path.join(ssSalvar, screenshotFormularioAberto), fullPage: true });

    // ====== Abrir dropdown "Filial" e selecionar primeira opção ======
    // MUI Select: role="combobox" — Filial é o primeiro select do form
    const filialSelect = page.locator('[role="combobox"]').first();
    await filialSelect.scrollIntoViewIfNeeded();
    await filialSelect.click();

    const listbox = page.locator('ul[role="listbox"]');
    await expect(listbox).toBeVisible({ timeout: 5000 });

    // Pega a primeira opção que não seja placeholder vazio
    const firstOption = listbox.locator('li[role="option"]').first();
    await expect(firstOption).toBeVisible({ timeout: 3000 });
    const optionText = (await firstOption.textContent() ?? 'opção').trim();
    await firstOption.click();
    await page.waitForTimeout(400);
    console.log(`    Filial "${optionText}" selecionada`);

    const screenshotFilialSelecionada = '02-filial-selecionada.png';
    await page.screenshot({ path: path.join(ssSalvar, screenshotFilialSelecionada), fullPage: true });

    // ====== Clicar em "Salvar" ======
    await page.getByRole('button', { name: 'Salvar' }).click();

    // Aguarda o formulário fechar (botão "Editar" volta a ser visível)
    await expect(editarBtn).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(1000);
    console.log('    Ficha cadastral salva');

    const requestsSalvar = getRequests().slice(snapshotBeforeSalvar.length);
    console.log(`    ${requestsSalvar.length} request(s) ao salvar`);

    const screenshotAposSalvar = '03-apos-salvar.png';
    await page.screenshot({ path: path.join(ssSalvar, screenshotAposSalvar), fullPage: true });
    console.log('    Screenshots ficha-cadastral capturadas');

    return {
      screenshotFichaInicial,
      screenshotFormularioAberto,
      screenshotFilialSelecionada,
      screenshotAposSalvar,
      requestsNavegacao,
      requestsSalvar,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
