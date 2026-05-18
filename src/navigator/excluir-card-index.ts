import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { visitExcluirCard } from './excluir-card-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
// URL direta do card descartável — atualizar antes de rodar (o card SERÁ EXCLUÍDO)
const CARD_URL = 'https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/6a0b056b526688bb7dc3e546/summary/overview';

async function checkSession(): Promise<boolean> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });
  const page = await context.newPage();
  try {
    await page.goto('https://agflow.agrisk.dev/pt/home', { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1500);
    return !page.url().includes('pending-login');
  } catch {
    return false;
  } finally {
    await page.close();
    await browser.close();
  }
}

async function saveEndpoints(requests: CapturedRequest[], folder: string): Promise<void> {
  const dir = path.join('vault', 'endpoints', 'excluir-card', folder);
  await fs.mkdir(dir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(dir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe, criar */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, card, excluir-card, ${folder}]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
        'utf-8',
      );
    } catch { /* ignorar */ }
  }
}

async function main(): Promise<void> {
  if (!CARD_URL) {
    console.error('❌ CARD_URL não definida. Atualize a constante em excluir-card-index.ts antes de rodar.');
    process.exit(1);
  }

  console.log('Verificando sessão...');
  if (!(await checkSession())) {
    console.error('❌ Sessão expirada. Rode "npm run login" primeiro.');
    process.exit(1);
  }
  console.log('✓ Sessão válida.\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  try {
    console.log('🗑️  Excluir card');
    console.log(`   URL: ${CARD_URL}\n`);

    const result = await visitExcluirCard(context, CARD_URL);

    await saveEndpoints(result.requestsNavegacao, 'navegacao');
    await saveEndpoints(result.requestsExcluir, 'excluir');

    console.log('\n✅ Concluído.');
    console.log(`   Screenshots: vault/screenshots/excluir-card/`);
    console.log(`   Endpoints:   vault/endpoints/excluir-card/`);
    console.log(`     navegacao: ${result.requestsNavegacao.length} request(s)`);
    console.log(`     excluir:   ${result.requestsExcluir.length} request(s)`);
  } catch (err) {
    if (err instanceof AuthExpiredError) {
      console.error('\n❌ Sessão expirou durante execução. Rode "npm run login" e tente novamente.');
      process.exit(1);
    }
    console.error('\n✗ Erro:', err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
