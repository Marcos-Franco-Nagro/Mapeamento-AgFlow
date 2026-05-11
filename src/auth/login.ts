import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

async function login(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`Navegando para ${BASE_URL}/${LOCALE}/home ...`);
  await page.goto(`${BASE_URL}/${LOCALE}/home`, { timeout: NAV_TIMEOUT });

  console.log('Faça o login manualmente na janela do navegador.');
  console.log('Aguardando redirecionamento para home...');

  // Aguarda até URL estar em /pt/<rota> que não seja pending-login
  await page.waitForURL(
    (url) =>
      url.hostname.includes('agflow') &&
      url.pathname.startsWith(`/${LOCALE}/`) &&
      !url.pathname.includes('pending-login'),
    { timeout: 120_000 }
  );

  await page.waitForLoadState('networkidle');
  console.log(`Login detectado. URL atual: ${page.url()}`);

  await context.storageState({ path: STATE_PATH });
  console.log(`Sessão salva em: ${STATE_PATH}`);

  await browser.close();
}

login().catch((err) => {
  console.error('Erro durante login:', err);
  process.exit(1);
});
