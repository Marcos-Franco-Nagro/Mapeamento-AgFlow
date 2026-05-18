import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { visitFichaCadastral } from './ficha-cadastral-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
// URL direta da ficha cadastral — atualizar se o card expirar
const FICHA_URL = 'https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/6a05bfccf3e4ddc495eb845e/summary/registration';

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
  const dir = path.join('vault', 'endpoints', 'ficha-cadastral', folder);
  await fs.mkdir(dir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(dir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe, criar */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, card, ficha-cadastral, ${folder}]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
        'utf-8',
      );
    } catch { /* ignorar */ }
  }
}

async function main(): Promise<void> {
  console.log('Verificando sessão...');
  if (!(await checkSession())) {
    console.error('❌ Sessão expirada. Rode "npm run login" primeiro.');
    process.exit(1);
  }
  console.log('✓ Sessão válida.\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  try {
    console.log('📋 Ficha cadastral — editar e salvar');
    console.log(`   URL: ${FICHA_URL}\n`);

    const result = await visitFichaCadastral(context, FICHA_URL);

    await saveEndpoints(result.requestsNavegacao, 'navegacao');
    await saveEndpoints(result.requestsSalvar, 'editar');

    console.log('\n✅ Concluído.');
    console.log(`   Screenshots: vault/screenshots/ficha-cadastral/`);
    console.log(`   Endpoints:   vault/endpoints/ficha-cadastral/`);
    console.log(`     navegacao: ${result.requestsNavegacao.length} request(s)`);
    console.log(`     editar:    ${result.requestsSalvar.length} request(s)`);
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
