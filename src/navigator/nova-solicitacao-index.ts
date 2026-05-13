import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { FLOW_ID } from '../fixtures/cards.js';
import { visitNovaSolicitacao } from './nova-solicitacao-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';

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

async function saveEndpoints(requests: CapturedRequest[]): Promise<void> {
  const endpointsDir = path.join('vault', 'endpoints', 'nova-solicitacao');
  await fs.mkdir(endpointsDir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(endpointsDir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, nova-solicitacao]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
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

  try {
    console.log('\n📋 Criando nova solicitação no board...');
    const result = await visitNovaSolicitacao(context, BASE_URL, LOCALE, FLOW_ID);
    await saveEndpoints(result.requestsNovaSolicitacao);
    console.log(`✓ Card criado — ${result.requestsNovaSolicitacao.length} endpoint(s) capturado(s)`);
    console.log('\n✅ Concluído.');
  } catch (err) {
    if (err instanceof AuthExpiredError) {
      console.error('\n❌ Sessão expirou. Rode "npm run login" e tente novamente.');
    } else {
      console.error(`\n✗ ${err instanceof Error ? err.message : err}`);
    }
    await browser.close();
    process.exit(1);
  }

  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
