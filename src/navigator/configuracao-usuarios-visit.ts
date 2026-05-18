import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const FLOW_ID = '67bf0dccb38591aeceff8121';
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const BOARD_URL = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/board`;

const USER_NAME = 'Marcos Franco Oliveira Junior';

export interface ConfiguracaoUsuariosResult {
  screenshotBoardInicial: string;
  screenshotDialogAberto: string;
  screenshotUsuarioSelecionado: string;
  screenshotFuncaoSelecionada: string;
  screenshotAposSalvar: string;
  requestsNavegacao: CapturedRequest[];
  requestsAtribuirUsuario: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitConfiguracaoUsuarios(
  context: BrowserContext,
): Promise<ConfiguracaoUsuariosResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const ssNavegacao = path.join('vault', 'screenshots', 'configuracao-usuarios', 'navegacao');
  const ssAtribuir  = path.join('vault', 'screenshots', 'configuracao-usuarios', 'atribuir-usuario');

  try {
    await fs.mkdir(ssNavegacao, { recursive: true });
    await fs.mkdir(ssAtribuir,  { recursive: true });

    // ====== Navegação até o board ======
    await page.goto(BOARD_URL, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(BOARD_URL);

    // Aguarda o board carregar (alguma coluna de fase visível)
    await expect(page.getByText('Solicitações recebidas').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(500);

    const requestsNavegacao = getRequests();
    console.log(`    ${requestsNavegacao.length} request(s) na navegação`);

    const screenshotBoardInicial = '01-board-inicial.png';
    await page.screenshot({ path: path.join(ssNavegacao, screenshotBoardInicial), fullPage: false });
    console.log('    Screenshot board inicial capturada');

    // ====== Abrir popup de Configuração dos usuários ======
    const snapshotBeforeAtribuir = getRequests();

    const configBtn = page.locator('[data-testid="setting-button"]');
    await expect(configBtn).toBeVisible({ timeout: 8000 });
    await configBtn.click();

    // Aguarda o dialog abrir (MUI pode usar aria-modal ou role diferente)
    await expect(page.getByText('Configuração dos usuários').first()).toBeVisible({ timeout: 8000 });
    const dialog = page.locator('[aria-modal="true"]').first();
    await page.waitForTimeout(600);
    console.log('    Dialog de configuração aberto');

    const screenshotDialogAberto = '01-dialog-aberto.png';
    await page.screenshot({ path: path.join(ssAtribuir, screenshotDialogAberto), fullPage: false });

    // ====== Preencher "Atribuir novo usuário" (Autocomplete pesquisável) ======
    const userCombobox = page.locator('input[role="combobox"]').first();
    await userCombobox.click();
    await userCombobox.fill(USER_NAME);
    await page.waitForTimeout(600);

    const userOption = page.locator('[role="option"]', { hasText: USER_NAME });
    await expect(userOption.first()).toBeVisible({ timeout: 8000 });
    await userOption.first().click();
    await page.waitForTimeout(400);
    console.log(`    Usuário "${USER_NAME}" selecionado`);

    const screenshotUsuarioSelecionado = '02-usuario-selecionado.png';
    await page.screenshot({ path: path.join(ssAtribuir, screenshotUsuarioSelecionado), fullPage: false });

    // ====== Selecionar "Função" ======
    // index 0 = "Atribuir novo usuário", index 1 = "Função" do cabeçalho (antes da lista de usuários)
    const funcaoSelect = page.locator('[role="combobox"]').nth(1);
    await funcaoSelect.click();

    const listbox = page.locator('ul[role="listbox"]');
    await expect(listbox).toBeVisible({ timeout: 5000 });
    const firstFuncao = listbox.locator('li[role="option"]').first();
    await expect(firstFuncao).toBeVisible({ timeout: 3000 });
    const funcaoText = (await firstFuncao.textContent() ?? 'função').trim();
    await firstFuncao.click();
    await page.waitForTimeout(400);
    console.log(`    Função "${funcaoText}" selecionada`);

    const screenshotFuncaoSelecionada = '03-funcao-selecionada.png';
    await page.screenshot({ path: path.join(ssAtribuir, screenshotFuncaoSelecionada), fullPage: false });

    // ====== Clicar em "+ Adicionar" ======
    const adicionarBtn = page.getByRole('button', { name: /Adicionar/i });
    await expect(adicionarBtn).toBeVisible({ timeout: 5000 });
    await adicionarBtn.click();
    await page.waitForTimeout(600);
    console.log('    Usuário adicionado à lista');

    // ====== Clicar em "Salvar alterações" ======
    const salvarBtn = page.getByRole('button', { name: /Salvar alterações/i });
    await expect(salvarBtn).toBeVisible({ timeout: 5000 });
    await salvarBtn.click();

    // Popup de confirmação "Confirme as alterações" → clicar "Sim, salvar"
    const simSalvarBtn = page.getByRole('button', { name: /Sim, salvar/i });
    await expect(simSalvarBtn).toBeVisible({ timeout: 8000 });
    await simSalvarBtn.click();
    await page.waitForTimeout(1000);
    console.log('    Alterações salvas');

    const requestsAtribuirUsuario = getRequests().slice(snapshotBeforeAtribuir.length);
    console.log(`    ${requestsAtribuirUsuario.length} request(s) ao atribuir usuário`);

    const screenshotAposSalvar = '04-apos-salvar.png';
    await page.screenshot({ path: path.join(ssAtribuir, screenshotAposSalvar), fullPage: false });
    console.log('    Screenshots configuracao-usuarios capturadas');

    return {
      screenshotBoardInicial,
      screenshotDialogAberto,
      screenshotUsuarioSelecionado,
      screenshotFuncaoSelecionada,
      screenshotAposSalvar,
      requestsNavegacao,
      requestsAtribuirUsuario,
      crawledAt: new Date().toISOString(),
      ok: true,
    };
  } finally {
    await page.close();
  }
}
