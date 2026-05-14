import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, FLOW_ID } from '../fixtures/cards.js';
import { visitCriarDocumento } from './criar-documento-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';

// Card específico para criar-documento (fase 4 com módulo de documentos habilitado)
const CARD_ID_OVERRIDE = process.env.CARD_ID ?? '69f34839c913fbf60a5831ea';
const PHASE_FILTER = process.env.PHASE ? parseInt(process.env.PHASE) : 4;

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

async function saveEndpoints(requests: CapturedRequest[], folder: string): Promise<void> {
  const endpointsDir = path.join('vault', 'endpoints', 'modulo-documentos', folder);
  await fs.mkdir(endpointsDir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(endpointsDir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, documentos, criar-documento]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
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

  let cards = CARD_FIXTURES.filter((c) => c.phase === PHASE_FILTER);

  if (CARD_ID_OVERRIDE) {
    console.log(`ℹ️  Usando CARD_ID=${CARD_ID_OVERRIDE} (override via env)`);
    cards = cards.map((c) => ({ ...c, cardId: CARD_ID_OVERRIDE }));
  }

  if (cards.length === 0) {
    console.error(`❌ Nenhum card encontrado para fase ${PHASE_FILTER}.`);
    await browser.close();
    process.exit(1);
  }

  let ok = 0;
  let errors = 0;

  for (const card of cards) {
    console.log(`\n📄 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);

    try {
      console.log('   Criando documento a partir de template...');
      const result = await visitCriarDocumento(context, card, BASE_URL, LOCALE, FLOW_ID);
      await saveEndpoints(result.requestsCriarDocumento, 'criar-documento');
      await saveEndpoints(result.requestsVisualizacao, 'visualizar-documento');
      console.log(`   ✓ ok — ${result.requestsCriarDocumento.length} endpoint(s) criação, ${result.requestsVisualizacao.length} endpoint(s) visualização`);
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
