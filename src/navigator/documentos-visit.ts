import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const FIXTURE_PNG = './tests/fixtures/Minha_assinatura_email.png';

export interface DocumentosResult {
  cardId: string;
  // Forma 1 — "+ Adicionar documento" dentro da subpasta
  screenshotRaiz: string;
  screenshotClientePasta: string;
  screenshotSubpasta: string;
  screenshotForm1Popup: string;
  screenshotForm1Upload: string;
  screenshotForm1Final: string;
  requestsNavPastas: CapturedRequest[];
  requestsForm1Upload: CapturedRequest[];
  // Forma 2 — sidebar "Novo documento" → "Anexar"
  screenshotForm2Popup1: string;
  screenshotForm2Popup2: string;
  screenshotForm2Upload: string;
  screenshotForm2PastaCliente: string;
  screenshotForm2Subpasta: string;
  screenshotForm2Final: string;
  requestsForm2Anexar: CapturedRequest[];
  crawledAt: string;
  form1Ok: boolean;
  form2Ok: boolean;
}

export async function visitDocumentos(
  context: BrowserContext,
  card: CardFixture,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<DocumentosResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const ssNav   = path.join('vault', 'screenshots', 'modulo-documentos', 'navegacao-pastas');
  const ssForma1 = path.join('vault', 'screenshots', 'modulo-documentos', 'forma1-add-doc-diretonapasta');
  const ssForma2 = path.join('vault', 'screenshots', 'modulo-documentos', 'forma2-novo-documento-anexar');
  const outputDir = path.join('crawl-output', 'modulo-documentos');

  const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/documents`;

  try {
    await fs.mkdir(ssNav,    { recursive: true });
    await fs.mkdir(ssForma1, { recursive: true });
    await fs.mkdir(ssForma2, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    // =========================================================
    // FORMA 1 — Navegar na pasta e usar "+ Adicionar documento"
    // =========================================================

    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    await expect(page.getByText('Documentos por cliente')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotRaiz = `${card.cardId}-raiz.png`;
    await page.screenshot({ path: path.join(ssNav, screenshotRaiz), fullPage: true });


    // --- Navegação nas pastas (capturar GETs de carregamento de conteúdo) ---
    const snapshotAntesNav = getRequests();

    // Folder cards são <button data-variant="contained" data-active="false">
    // (role implícito de button, sem tabindex explícito — por isso seletores ARIA falharam antes)
    const primeiraClientePasta = page.locator('button[data-variant="contained"][data-active="false"]').first();
    await expect(primeiraClientePasta).toBeVisible({ timeout: 8000 });
    const clienteFolderText = (await primeiraClientePasta.textContent())?.trim() ?? '';
    console.log(`    Clicando em pasta de cliente: "${clienteFolderText}"`);
    await primeiraClientePasta.click();
    await page.waitForTimeout(1000);

    const screenshotClientePasta = `${card.cardId}-pasta-cliente.png`;
    await page.screenshot({ path: path.join(ssNav, screenshotClientePasta), fullPage: true });

    // Primeira subpasta dentro do cliente — mesmo seletor de folder card
    const primeiraSubpasta = page.locator('button[data-variant="contained"][data-active="false"]').first();
    await expect(primeiraSubpasta).toBeVisible({ timeout: 8000 });
    const subpastaText = (await primeiraSubpasta.textContent())?.trim() ?? '';
    console.log(`    Clicando em subpasta: "${subpastaText}"`);
    await primeiraSubpasta.click();
    await page.waitForTimeout(1000);

    const screenshotSubpasta = `${card.cardId}-subpasta.png`;
    await page.screenshot({ path: path.join(ssNav, screenshotSubpasta), fullPage: true });

    const requestsNavPastas = getRequests().slice(snapshotAntesNav.length);

    // --- Upload via "+ Adicionar documento" (botão do canto superior direito) ---
    const snapshotAntesForm1 = getRequests();

    // aria-label real do botão é "Anexar nessa pasta", não "Adicionar documento"
    const adicionarButton = page.locator('[aria-label="Anexar nessa pasta"]');
    await expect(adicionarButton).toBeVisible({ timeout: 8000 });
    await adicionarButton.click();

    await expect(page.getByText('Adicione um novo documento clicando no botão abaixo'))
      .toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(800);

    const screenshotForm1Popup = `${card.cardId}-form1-popup.png`;
    await page.screenshot({ path: path.join(ssForma1, screenshotForm1Popup), fullPage: true });

    // Input de arquivo está no DOM (hidden) — setInputFiles bypassa o file picker nativo
    const fileInput1 = page.locator('input[type="file"][data-testid="file-upload"]').last();
    await expect(fileInput1).toBeAttached({ timeout: 10000 });
    await fileInput1.setInputFiles(FIXTURE_PNG);
    await page.waitForTimeout(1500);

    const screenshotForm1Upload = `${card.cardId}-form1-arquivo.png`;
    await page.screenshot({ path: path.join(ssForma1, screenshotForm1Upload), fullPage: true });

    const concluirForm1 = page.getByRole('button', { name: 'Concluir', exact: true });
    await expect(concluirForm1).toBeEnabled({ timeout: 30000 });
    await concluirForm1.click();

    await expect(page.getByText('Adicione um novo documento clicando no botão abaixo'))
      .toBeHidden({ timeout: 15000 });

    // Aguardar o arquivo aparecer renderizado na pasta (thumbnail ou nome do arquivo)
    // O documento aparece como card na listagem após o upload ser processado
    await expect(page.locator('[data-testid="imageThumbnail"], [class*="DocumentCard"], [class*="document-card"]').first())
      .toBeVisible({ timeout: 15000 })
      .catch(() => page.waitForTimeout(3000)); // fallback se o seletor de thumbnail não existir
    await page.waitForTimeout(1500);

    const screenshotForm1Final = `${card.cardId}-form1-final.png`;
    await page.screenshot({ path: path.join(ssForma1, screenshotForm1Final), fullPage: true });

    const requestsForm1Upload = getRequests().slice(snapshotAntesForm1.length);

    // =========================================================
    // FORMA 2 — Sidebar "Novo documento" → "Anexar" + seleção de pasta no popup
    // =========================================================

    // Pausa entre as duas formas para a tela da forma 1 estabilizar completamente
    await page.waitForTimeout(2000);

    // Voltar para a raiz do módulo antes de iniciar forma 2
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    await expect(page.getByText('Documentos por cliente')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const snapshotAntesForm2 = getRequests();

    // Clicar em "Novo documento" no sidebar
    const novoDocButton = page.getByRole('button', { name: /Novo documento/i });
    await expect(novoDocButton).toBeVisible({ timeout: 8000 });
    await novoDocButton.click();

    // Aguardar popup de seleção de tipo (Anexar / Criar)
    await expect(page.getByText('Anexar')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotForm2Popup1 = `${card.cardId}-form2-popup1-tipo.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2Popup1), fullPage: true });

    // Clicar em "Anexar" (adicionar arquivo existente)
    // O texto "Anexar" aparece como label dentro do item de lista — busca pelo container
    await page.getByText('Adicionar um novo arquivo para esta operação').click();

    // Aguardar popup de upload + seleção de pasta (step 1 + step 2)
    await expect(page.getByText('Selecione a pasta')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(800);

    const screenshotForm2Popup2 = `${card.cardId}-form2-popup2-upload.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2Popup2), fullPage: true });

    // Step 1 — Upload do arquivo (mesmo padrão: input hidden no DOM)
    const fileInput2 = page.locator('input[type="file"][data-testid="file-upload"]').last();
    await expect(fileInput2).toBeAttached({ timeout: 10000 });
    await fileInput2.setInputFiles(FIXTURE_PNG);
    await page.waitForTimeout(1500);

    const screenshotForm2Upload = `${card.cardId}-form2-arquivo.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2Upload), fullPage: true });

    // Step 2 — Seleção de pasta dentro do popup
    // O heading "Selecione a pasta" fica dentro do popup, APÓS os botões de nav do topo.
    // Usamos XPath following:: a partir desse heading para pegar o primeiro folder card do picker.
    const selecionePastaHeading = page.getByText('Selecione a pasta').first();

    // Picker de pasta: o popup é um React portal — fica no final do <body>,
    // DEPOIS dos card buttons da página principal no DOM.
    // Usando XPath following:: a partir do heading "Selecione a pasta" garantimos
    // que só encontramos botões DENTRO do popup, não os da página por trás.

    const primeiraPickerCliente = selecionePastaHeading
      .locator('xpath=following::button[@data-variant="contained" and @data-active="false"][1]');
    await expect(primeiraPickerCliente).toBeVisible({ timeout: 8000 });
    const pickerClienteText = (await primeiraPickerCliente.textContent())?.trim() ?? '';
    console.log(`    Picker — selecionando cliente: "${pickerClienteText}"`);
    await primeiraPickerCliente.click();
    await page.waitForTimeout(600);

    const screenshotForm2PastaCliente = `${card.cardId}-form2-pasta-cliente.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2PastaCliente), fullPage: true });

    // Após navegar no picker para o cliente, aparecem as subpastas dele
    // O heading "Selecione a pasta" ainda está visível — reutilizamos como âncora
    const primeiraPickerSubpasta = selecionePastaHeading
      .locator('xpath=following::button[@data-variant="contained" and @data-active="false"][1]');
    await expect(primeiraPickerSubpasta).toBeVisible({ timeout: 8000 });
    const pickerSubpastaText = (await primeiraPickerSubpasta.textContent())?.trim() ?? '';
    console.log(`    Picker — selecionando subpasta: "${pickerSubpastaText}"`);
    await primeiraPickerSubpasta.click();
    await page.waitForTimeout(600);

    const screenshotForm2Subpasta = `${card.cardId}-form2-subpasta.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2Subpasta), fullPage: true });

    // Concluir (habilita quando arquivo + pasta estão selecionados)
    const concluirForm2 = page.getByRole('button', { name: 'Concluir', exact: true });
    await expect(concluirForm2).toBeEnabled({ timeout: 30000 });
    await concluirForm2.click();

    await expect(page.getByText('Selecione a pasta')).toBeHidden({ timeout: 15000 });
    await page.waitForTimeout(2000);

    const screenshotForm2Final = `${card.cardId}-form2-final.png`;
    await page.screenshot({ path: path.join(ssForma2, screenshotForm2Final), fullPage: true });

    const requestsForm2Anexar = getRequests().slice(snapshotAntesForm2.length);

    const result: DocumentosResult = {
      cardId: card.cardId,
      screenshotRaiz,
      screenshotClientePasta,
      screenshotSubpasta,
      screenshotForm1Popup,
      screenshotForm1Upload,
      screenshotForm1Final,
      requestsNavPastas,
      requestsForm1Upload,
      screenshotForm2Popup1,
      screenshotForm2Popup2,
      screenshotForm2Upload,
      screenshotForm2PastaCliente,
      screenshotForm2Subpasta,
      screenshotForm2Final,
      requestsForm2Anexar,
      crawledAt: new Date().toISOString(),
      form1Ok: true,
      form2Ok: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-documentos.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
