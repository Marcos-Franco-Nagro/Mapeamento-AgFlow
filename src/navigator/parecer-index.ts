import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, getPhaseSlug } from '../fixtures/cards.js';
import { discoverClientId } from './visit.js';
import { visitParecer } from './parecer-visit.js';
import { writeParecerNote } from './parecer-writer.js';
import { AuthExpiredError } from '../crawler/visit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const FLOW_ID = '67bf0dccb38591aeceff8121';

const CARD_ID_OVERRIDE = process.env.CARD_ID;
const PHASE_FILTER = process.env.PHASE ? parseInt(process.env.PHASE) : null;

// Fases com parecer de crédito implementado (atualmente só Fase 4)
const IMPLEMENTED_PHASES = new Set([4]);

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

  let cards = CARD_FIXTURES.filter((c) => IMPLEMENTED_PHASES.has(c.phase));

  if (PHASE_FILTER !== null) {
    cards = cards.filter((c) => c.phase === PHASE_FILTER);
    if (cards.length === 0) {
      console.error(`❌ Fase ${PHASE_FILTER} não tem parecer mapeado ou não existe.`);
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
    console.log(`\n📋 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);

    const overviewUrl = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${card.cardId}/summary/overview`;
    const clientId = await discoverClientId(context, overviewUrl);

    if (!clientId) {
      console.error(`   ❌ clientId não encontrado — pulando.`);
      errors++;
      continue;
    }
    console.log(`   clientId: ${clientId}`);

    try {
      console.log('   Preenchendo parecer de crédito...');
      const result = await visitParecer(context, card, clientId, phaseSlug, BASE_URL, LOCALE, FLOW_ID);
      await writeParecerNote(result);

      const statusC = result.concludedOk ? '✓ concluído' : '⚠️ conclusão incerta';
      console.log(`   ${statusC}`);
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
