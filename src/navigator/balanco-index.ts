import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, FLOW_ID, getPhaseSlug } from '../fixtures/cards.js';
import { visitBalancoExtrair } from './balanco-extrair-visit.js';
import { visitBalancoRevisar } from './balanco-revisar-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';

const CARD_ID_OVERRIDE = process.env.CARD_ID;
// STEP=extrair | revisar | (vazio = ambos)
const STEP = process.env.STEP;

// Balanço e DRE pode ser acessado de qualquer fase, mas o vault sempre fica em fase-4
const VAULT_PHASE_SLUG = getPhaseSlug(4, 'Análise de Crédito');

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

async function saveEndpoints(requests: CapturedRequest[], phaseSlug: string, folder: string): Promise<void> {
  const endpointsDir = path.join('vault', 'endpoints', phaseSlug, folder);
  await fs.mkdir(endpointsDir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(endpointsDir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, ${folder}]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
        'utf-8',
      );
    } catch { /* ignorar */ }
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

  // Usa o card da fase 4 por padrão; qualquer fase funciona via CARD_ID override
  let cards = CARD_FIXTURES.filter((c) => c.phase === 4);

  if (CARD_ID_OVERRIDE) {
    console.log(`ℹ️  Usando CARD_ID=${CARD_ID_OVERRIDE} (override via env)`);
    cards = cards.map((c) => ({ ...c, cardId: CARD_ID_OVERRIDE }));
  }

  const runExtrair = !STEP || STEP === 'extrair';
  const runRevisar = !STEP || STEP === 'revisar';

  let ok = 0;
  let errors = 0;

  for (const card of cards) {
    console.log(`\n📋 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);
    console.log(`   Vault → ${VAULT_PHASE_SLUG}`);

    try {
      let anoExtraido: string | undefined;

      if (runExtrair) {
        console.log('   [1/2] Extraindo balanço e DRE...');
        const result = await visitBalancoExtrair(context, card, VAULT_PHASE_SLUG, BASE_URL, LOCALE, FLOW_ID);
        await saveEndpoints(result.requestsExtrair, VAULT_PHASE_SLUG, path.join('balanco', 'balanco-extrair'));
        anoExtraido = result.anoSelecionado;
        console.log(`   ✓ extraído — ano ${result.anoSelecionado} — ${result.requestsExtrair.length} endpoint(s)`);
      }

      if (runRevisar) {
        console.log('   [2/2] Revisando e recalculando...');
        const result = await visitBalancoRevisar(context, card, VAULT_PHASE_SLUG, BASE_URL, LOCALE, FLOW_ID, anoExtraido);
        await saveEndpoints(result.requestsRevisar, VAULT_PHASE_SLUG, path.join('balanco', 'balanco-revisar'));
        await saveEndpoints(result.requestsVisaoGeral, VAULT_PHASE_SLUG, path.join('balanco', 'balanco-visao-geral-consolidado'));
        console.log(`   ✓ revisado — ${result.requestsRevisar.length} endpoint(s) revisar, ${result.requestsVisaoGeral.length} endpoint(s) visão geral`);
      }

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
