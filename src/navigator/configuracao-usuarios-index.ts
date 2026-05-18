import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { visitConfiguracaoUsuarios } from './configuracao-usuarios-visit.js';
import { AuthExpiredError } from '../crawler/visit.js';
import { saveEndpoints, saveNavegacaoEndpoints } from './save-endpoints.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');

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
    console.log('⚙️  Configuração dos usuários — atribuir usuário ao flow\n');

    const result = await visitConfiguracaoUsuarios(context);

    const tags = ['endpoint', 'agflow', 'board', 'configuracao-usuarios'];

    const navResult = await saveNavegacaoEndpoints(
      result.requestsNavegacao,
      path.join('vault', 'endpoints', 'configuracao-usuarios', 'navegacao'),
      [...tags, 'navegacao'],
    );

    await saveEndpoints(
      result.requestsAtribuirUsuario,
      path.join('vault', 'endpoints', 'configuracao-usuarios', 'atribuir-usuario'),
      [...tags, 'atribuir-usuario'],
    );

    console.log('\n✅ Concluído.');
    console.log(`   Screenshots: vault/screenshots/configuracao-usuarios/`);
    console.log(`   Endpoints:   vault/endpoints/configuracao-usuarios/`);
    console.log(`     navegacao:       ${navResult.saved} novo(s), ${navResult.skipped} já capturado(s) em outros scripts`);
    console.log(`     atribuir-usuario: ${result.requestsAtribuirUsuario.length} request(s)`);
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
