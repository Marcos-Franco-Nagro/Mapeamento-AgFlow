import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const DOC_TITLE = `marcos - mapeando ${Date.now()}`;
const TEMPLATE_NAME = 'Análise de Crédito - V2';
const PARECER_TEXT = 'marcos - QA mapeando criação de docs';

// Mapeamento label → valor de preenchimento (template Análise de Crédito)
function getFillValue(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('valor')) return '10000';
  if (l.includes('analista')) return 'marcos - teste';
  return 'teste';
}

export interface CriarDocumentoResult {
  cardId: string;
  screenshotNovoDocPopup: string;
  screenshotStep1Nome: string;
  screenshotStep2Template: string;
  screenshotStep3DadosGerais: string;
  screenshotStep3Parecer: string;
  screenshotFinal: string;
  screenshotDocsCriados: string;
  screenshotDocVisualizado: string;
  requestsCriarDocumento: CapturedRequest[];
  requestsVisualizacao: CapturedRequest[];
  crawledAt: string;
  ok: boolean;
}

export async function visitCriarDocumento(
  context: BrowserContext,
  card: CardFixture,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<CriarDocumentoResult> {
  const page = await context.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.log(`[console.error] ${msg.text()}`); });
  page.on('pageerror', err => console.log(`[pageerror] ${err.message}`));
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', 'modulo-documentos', 'criar-documento');
  const outputDir = path.join('crawl-output', 'modulo-documentos');
  const url = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/documents`;

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);
    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    await expect(page.getByText('Documentos por cliente')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const snapshotAntes = getRequests();

    // Abrir popup de novo documento
    const novoDocButton = page.getByRole('button', { name: /Novo documento/i });
    await expect(novoDocButton).toBeVisible({ timeout: 8000 });
    await novoDocButton.click();

    await expect(page.getByText('Criar um novo documento a partir de um template.')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotNovoDocPopup = `${card.cardId}-criar-popup-tipo.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotNovoDocPopup), fullPage: true });

    // Selecionar opção "Criar" (via texto descritivo)
    await page.getByText('Criar um novo documento a partir de um template.').click();

    // ====== STEP 1 — Nome ======
    await expect(page.getByPlaceholder('Digite aqui')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotStep1Nome = `${card.cardId}-criar-step1-nome.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep1Nome), fullPage: true });

    await page.getByPlaceholder('Digite aqui').fill(DOC_TITLE);
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Próximo', exact: true }).click();

    // ====== STEP 2 — Template ======
    const templateSelect = page.locator('[aria-haspopup="listbox"]').first();
    await expect(templateSelect).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);

    const screenshotStep2Template = `${card.cardId}-criar-step2-template.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep2Template), fullPage: true });

    await templateSelect.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: TEMPLATE_NAME }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Próximo', exact: true }).click();

    // ====== STEP 3 — Valide os dados ======
    // Chegamos na aba "Clientes" por padrão — garantir que o primeiro checkbox está marcado
    const primeiroCheckbox = page.locator('[role="tabpanel"]:not([hidden]) input[type="checkbox"]').first();
    await expect(primeiroCheckbox).toBeAttached({ timeout: 10000 });
    await page.waitForTimeout(500);

    const jaChecked = await primeiroCheckbox.isChecked().catch(() => false);
    if (!jaChecked) {
      // Clicar no label pai (MUI FormControlLabel) para alternar o checkbox
      await primeiroCheckbox.locator('xpath=ancestor::label[1]').click();
      await page.waitForTimeout(600);
      console.log('    Primeiro cliente: checkbox marcado');
    } else {
      console.log('    Primeiro cliente: já estava marcado');
    }

    // Clicar em "Dados gerais" no sidebar esquerdo
    const dadosGeraisTab = page.getByRole('tab', { name: /Dados gerais/i });
    await expect(dadosGeraisTab).toBeVisible({ timeout: 10000 });
    await dadosGeraisTab.click();
    await page.waitForTimeout(800);

    // Preencher TODOS os inputs visíveis (inclusive pré-preenchidos — ex: Valor solicitado)
    const allInputs = page.locator('input[placeholder="Digite aqui"]');
    const inputCount = await allInputs.count();
    console.log(`    Dados gerais — ${inputCount} campo(s) encontrado(s)`);

    for (let i = 0; i < inputCount; i++) {
      const input = allInputs.nth(i);
      if (!(await input.isVisible())) continue;

      const labelText: string = await input.evaluate((el: Element) => {
        let cur: Element | null = el;
        for (let d = 0; d < 8; d++) {
          const parent = cur?.parentElement;
          if (!parent) break;
          const prev = parent.previousElementSibling;
          if (prev) {
            const txt = (prev.textContent ?? '').replace(/\s+/g, ' ').trim();
            if (txt.length > 0 && txt.length < 100) return txt;
          }
          cur = parent;
        }
        return '';
      });
      const cleanLabel = labelText.replace(/\s*[·•]\s*(obrigatório|opcional).*$/gi, '').trim();
      const fillValue = getFillValue(cleanLabel);

      await input.fill(fillValue);
      console.log(`    Campo ${i + 1}: "${cleanLabel || '(sem label)'}" → "${fillValue}"`);
      await page.waitForTimeout(150);
    }

    await page.waitForTimeout(500);
    const screenshotStep3DadosGerais = `${card.cardId}-criar-step3-dados-gerais.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep3DadosGerais), fullPage: true });

    // ====== STEP 3 — Parecer do analista ======
    await page.getByRole('tab', { name: /Parecer do analista/i }).click();
    await page.waitForTimeout(800);

    const parecerEditor = page.locator('[contenteditable="true"]').last();
    await expect(parecerEditor).toBeVisible({ timeout: 8000 });
    await parecerEditor.click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type(PARECER_TEXT);
    await page.waitForTimeout(500);

    const screenshotStep3Parecer = `${card.cardId}-criar-step3-parecer.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotStep3Parecer), fullPage: true });

    // ====== Submeter ======
    // Âncora: texto do stepper (visível enquanto wizard está aberto)
    const wizardAnchor = page.getByText('Informe o nome do documento').first();
    await expect(wizardAnchor).toBeVisible({ timeout: 5000 });

    // button[type="submit"] aria-label="" — filter por texto evita ambiguidade
    await page.locator('button[type="submit"]').filter({ hasText: 'Criar documento' }).click();
    console.log('    Clicou em "Criar documento" — aguardando conclusão...');

    // Wizard fecha quando o documento é criado (step 4 "Criando documento" conclui e modal some)
    await wizardAnchor.waitFor({ state: 'hidden', timeout: 90000 })
      .catch(() => console.log('    Aviso: timeout aguardando wizard fechar'));

    await page.waitForTimeout(2000);

    const screenshotFinal = `${card.cardId}-criar-final.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotFinal), fullPage: true });

    const requestsCriarDocumento = getRequests().slice(snapshotAntes.length);
    console.log(`    ${requestsCriarDocumento.length} request(s) de criação capturado(s)`);

    // ====== Mini-fluxo: visualizar documento criado ======
    const snapshotAntesView = getRequests();

    // Clicar na pasta "Documentos Criados" (data-variant="contained-primary")
    const docsCriadosBtn = page.locator('button[data-variant="contained-primary"]').filter({ hasText: /Documentos Criados/i });
    await expect(docsCriadosBtn).toBeVisible({ timeout: 8000 });
    await docsCriadosBtn.click();
    await page.waitForTimeout(1000);

    const screenshotDocsCriados = `${card.cardId}-docs-criados-lista.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotDocsCriados), fullPage: true });

    // Encontrar a linha pelo título do documento e clicar em "Visualizar"
    // DOC_TITLE não tem .pdf — hasText faz substring match, então encontra "marcos - mapeando 123.pdf"
    const linhaDoc = page.locator('tr').filter({ hasText: DOC_TITLE });
    const visualizarBtn = linhaDoc.getByRole('button', { name: 'Visualizar' });
    await expect(visualizarBtn).toBeVisible({ timeout: 8000 });

    // "Visualizar" abre em nova aba — capturar com waitForEvent
    const [novaAba] = await Promise.all([
      context.waitForEvent('page'),
      visualizarBtn.click(),
    ]);
    await novaAba.waitForLoadState('load');
    await novaAba.waitForTimeout(2000);

    const screenshotDocVisualizado = `${card.cardId}-doc-visualizado.png`;
    await novaAba.screenshot({ path: path.join(screenshotsDir, screenshotDocVisualizado), fullPage: true });
    console.log('    Documento visualizado — screenshot tirada');
    await novaAba.close();

    const requestsVisualizacao = getRequests().slice(snapshotAntesView.length);
    console.log(`    ${requestsVisualizacao.length} request(s) de visualização capturado(s)`);

    const result: CriarDocumentoResult = {
      cardId: card.cardId,
      screenshotNovoDocPopup,
      screenshotStep1Nome,
      screenshotStep2Template,
      screenshotStep3DadosGerais,
      screenshotStep3Parecer,
      screenshotFinal,
      screenshotDocsCriados,
      screenshotDocVisualizado,
      requestsCriarDocumento,
      requestsVisualizacao,
      crawledAt: new Date().toISOString(),
      ok: true,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}-criar-documento.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );
    return result;
  } finally {
    await page.close();
  }
}
