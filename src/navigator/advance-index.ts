import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, getPhaseSlug } from '../fixtures/cards.js';
import { discoverClientId } from './visit.js';
import { advanceToNextPhase } from './agflow-helpers.js';
import { setupNetworkCapture } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const FLOW_ID = '67bf0dccb38591aeceff8121';
const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

const CARD_ID_OVERRIDE = process.env.CARD_ID;
const PHASE_FILTER = process.env.PHASE ? parseInt(process.env.PHASE) : null;

// Rótulo do botão de avanço por fase
const ADVANCE_LABELS: Record<number, string> = {
  1: 'Validação documental',
  2: 'Pendência documental',
  3: 'Análise de crédito',
  4: 'Alçadas de aprovação',
  5: 'Crédito aprovado',
  6: 'Crédito reprovado',
};

async function checkSession(context: BrowserContext): Promise<boolean> {
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}/${LOCALE}/home`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1500);
    return !page.url().includes('pending-login');
  } catch {
    return false;
  } finally {
    await page.close();
  }
}

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  console.log('Verificando sessão...');
  if (!(await checkSession(context))) {
    console.error('❌ Sessão expirada. Rode "npm run login" primeiro.');
    await browser.close();
    process.exit(1);
  }
  console.log('✓ Sessão válida.');

  let cards = CARD_FIXTURES.filter((c) => ADVANCE_LABELS[c.phase] !== undefined);

  if (PHASE_FILTER !== null) {
    cards = cards.filter((c) => c.phase === PHASE_FILTER);
    if (cards.length === 0) {
      console.error(`❌ Fase ${PHASE_FILTER} não tem avanço de etapa mapeado.`);
      await browser.close();
      process.exit(1);
    }
  }

  if (CARD_ID_OVERRIDE) {
    console.log(`ℹ️  Usando CARD_ID=${CARD_ID_OVERRIDE} (override via env)`);
    cards = cards.map((c) => ({ ...c, cardId: CARD_ID_OVERRIDE }));
  }

  let ok = 0;
  let errors = 0;

  for (const card of cards) {
    const phaseSlug = getPhaseSlug(card.phase, card.phaseName);
    const advanceLabel = ADVANCE_LABELS[card.phase];
    console.log(`\n📋 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);

    const overviewUrl = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${card.cardId}/summary/stages`;
    const clientId = await discoverClientId(context, `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${card.cardId}/summary/overview`);
    const url = clientId ? `${overviewUrl}?clientId=${clientId}` : overviewUrl;

    const page = await context.newPage();
    const getRequests = setupNetworkCapture(page);

    try {
      await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
      await page.waitForTimeout(1500);

      if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

      const advanceDir = path.join('vault', 'screenshots', phaseSlug, 'avanco-de-etapa');
      const endpointsDir = path.join('vault', 'endpoints', phaseSlug, 'avanco-de-etapa');
      const outputDir = path.join('crawl-output', 'advance', phaseSlug);
      await fs.mkdir(advanceDir, { recursive: true });
      await fs.mkdir(endpointsDir, { recursive: true });
      await fs.mkdir(outputDir, { recursive: true });

      // waitForResponse precisa ser registrado ANTES do clique para não perder o evento
      const patchDone = page.waitForResponse(
        (res) => res.request().method() === 'PATCH' && res.url().includes(`/cards/${card.cardId}`),
        { timeout: 15000 },
      ).catch(() => null);

      const snapshotBefore = getRequests();
      const advancedOk = await advanceToNextPhase(page, advanceLabel);

      await patchDone; // garante que a resposta do PATCH foi recebida
      // Aguarda os GETs de refetch que o frontend dispara após o PATCH resolver
      await page.waitForTimeout(3000);

      await page.screenshot({
        path: path.join(advanceDir, `${card.cardId}-avancado.png`),
        fullPage: true,
      });

      const requestsAdvance = getRequests().slice(snapshotBefore.length);

      // Salvar endpoints de avanço
      for (const req of requestsAdvance) {
        try {
          const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
          const file = path.join(endpointsDir, `${slug}.md`);
          try { await fs.access(file); continue; } catch { /* não existe */ }
          await fs.writeFile(file, `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, avanco-de-etapa]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`, 'utf-8');
        } catch { /* ignorar */ }
      }

      await fs.writeFile(
        path.join(outputDir, `${card.cardId}.json`),
        JSON.stringify({ cardId: card.cardId, phaseSlug, advancedOk, requestsAdvance, crawledAt: new Date().toISOString() }, null, 2),
        'utf-8',
      );

      const status = advancedOk ? '✓ avançou' : '⚠️ avanço incerto';
      console.log(`   ${status} → "${advanceLabel}"`);
      ok++;
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        console.error('\n❌ Sessão expirou. Rode "npm run login" e tente novamente.');
        await browser.close();
        process.exit(1);
      }
      errors++;
      console.error(`   ✗ ${err instanceof Error ? err.message : err}`);
    } finally {
      await page.close();
    }
  }

  console.log(`\n✅ Concluído — ${ok} ok, ${errors} erro(s).`);
  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
