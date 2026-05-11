import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { MODALS } from './modals.js';
import { visitModal } from './modal-visit.js';
import { writeModalNote } from './modal-writer.js';
import { AuthExpiredError } from '../crawler/visit.js';

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

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  console.log('Verificando sessão...');
  if (!(await checkSession(context))) {
    console.error('❌ Sessão expirada. Rode "npm run login" primeiro e tente novamente.');
    await browser.close();
    process.exit(1);
  }
  console.log('✓ Sessão válida. Mapeando modais...\n');

  let count = 0;
  let errors = 0;

  for (const modal of MODALS) {
    const noteFile = `vault/features/modal-${modal.slug}.md`;
    try {
      await fs.access(noteFile);
      console.log(`  ⏭  [skip] ${modal.name}`);
      continue;
    } catch { /* não existe — prosseguir */ }

    count++;
    console.log(`  [${count}] ${modal.name}`);

    try {
      const data = await visitModal(context, modal);
      await writeModalNote(data);
      console.log(`    ✓  ${data.elements.length} elementos, ${data.requests.length} endpoints`);
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        console.error('\n❌ Sessão expirou durante o mapeamento.');
        console.error('   Rode "npm run login" e depois "npm run navigate:modals" novamente.');
        await browser.close();
        process.exit(1);
      }
      errors++;
      console.error(`    ✗  ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\n✅ Modais mapeados — ${count} novo(s), ${errors} erro(s).`);
  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
