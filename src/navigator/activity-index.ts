import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, getPhaseSlug } from '../fixtures/cards.js';
import { discoverClientId } from './visit.js';
import { visitActivity } from './activity-visit.js';
import { writeActivityNote } from './activity-writer.js';
import { AuthExpiredError } from '../crawler/visit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const FLOW_ID = '67bf0dccb38591aeceff8121';

// CARD_ID pode ser passado via env para sobrescrever o fixture da fase.
// Ex: CARD_ID=abc123 npm run navigate:activities
const CARD_ID_OVERRIDE = process.env.CARD_ID;

// CLIENT_ID pode ser passado via env quando o discoverClientId falhar.
// Ex: CARD_ID=abc123 CLIENT_ID=def456 npm run navigate:activities
const CLIENT_ID_OVERRIDE = process.env.CLIENT_ID;

// PHASE filtra quais fases rodar. Ex: PHASE=4 npm run navigate:activities
// Sem PHASE: roda todas as fases com campos mapeados (atualmente só fase 4).
const PHASE_FILTER = process.env.PHASE ? parseInt(process.env.PHASE) : null;

// Fases com campos de atividades implementados
const IMPLEMENTED_PHASES = new Set([1, 4]);

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

  // Monta lista de cards a processar
  let cards = CARD_FIXTURES.filter((c) => IMPLEMENTED_PHASES.has(c.phase));

  if (PHASE_FILTER !== null) {
    cards = cards.filter((c) => c.phase === PHASE_FILTER);
    if (cards.length === 0) {
      console.error(`❌ Fase ${PHASE_FILTER} não tem campos mapeados ou não existe.`);
      await browser.close();
      process.exit(1);
    }
  }

  // Override de cardId: troca o cardId do fixture pelo fornecido via env
  if (CARD_ID_OVERRIDE) {
    console.log(`ℹ️  Usando CARD_ID=${CARD_ID_OVERRIDE} (override via env)`);
    cards = cards.map((c) => ({ ...c, cardId: CARD_ID_OVERRIDE }));
  }

  let ok = 0;
  let errors = 0;

  for (const card of cards) {
    const phaseSlug = getPhaseSlug(card.phase, card.phaseName);
    console.log(`\n📋 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);

    let clientId = CLIENT_ID_OVERRIDE;
    if (!clientId) {
      const overviewUrl = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${card.cardId}/summary/overview`;
      clientId = await discoverClientId(context, overviewUrl);
    }

    if (clientId) {
      console.log(`   clientId: ${clientId}`);
    } else {
      console.log(`   ⚠️  clientId não descoberto — navegando sem ?clientId`);
    }

    try {
      console.log('   Preenchendo atividades da etapa...');
      const result = await visitActivity(context, card, clientId, phaseSlug, BASE_URL, LOCALE, FLOW_ID);
      await writeActivityNote(result);

      const statusSave = result.savedOk ? '✓ salvo' : '⚠️ save incerto';
      console.log(`   ${statusSave} | ${result.fieldCount} campos`);
      ok++;
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        console.error('\n❌ Sessão expirou. Rode "npm run login" e tente novamente.');
        await browser.close();
        process.exit(1);
      }
      errors++;
      console.error(`   ✗ ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\n✅ Concluído — ${ok} ok, ${errors} erro(s).`);
  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
