import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { FLOW_ID } from '../fixtures/cards.js';
import { visitFiltroMultiGrupo } from './filtro-multi-grupo-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';

async function checkSession(): Promise<boolean> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}/${LOCALE}/home`, { waitUntil: 'load', timeout: 15000 });
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
  const dir = path.join('vault', 'endpoints', 'filtros', 'filtro-multi-grupo', folder);
  await fs.mkdir(dir, { recursive: true });
  for (const req of requests) {
    try {
      const slug = `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
      const file = path.join(dir, `${slug}.md`);
      try { await fs.access(file); continue; } catch { /* não existe, criar */ }
      await fs.writeFile(
        file,
        `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [endpoint, agflow, filtros, filtro-multi-grupo, ${folder}]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`,
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
    console.log('🔍 Filtro multi-grupo — Grupo 1: (Limite = R$150k E Título Contém "teste") OU Grupo 2: (Valor final >= R$149k)');

    const result = await visitFiltroMultiGrupo(context, BASE_URL, LOCALE, FLOW_ID);

    await saveEndpoints(result.requestsNavegacao, 'navegacao');
    await saveEndpoints(result.requestsAplicarFiltro, 'aplicar-filtro');
    await saveEndpoints(result.requestsVisaoTabela, 'visao-tabela');

    console.log('\n✅ Concluído.');
    console.log(`   Screenshots: vault/screenshots/filtros/filtro-multi-grupo/`);
    console.log(`   Endpoints:   vault/endpoints/filtros/filtro-multi-grupo/`);
    console.log(`     navegacao:      ${result.requestsNavegacao.length} request(s)`);
    console.log(`     aplicar-filtro: ${result.requestsAplicarFiltro.length} request(s)`);
    console.log(`     visao-tabela:   ${result.requestsVisaoTabela.length} request(s)`);
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
