import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { CrawlQueue } from './queue.js';
import { visitRoute, AuthExpiredError } from './visit.js';
import { writeRouteNote } from '../vault/writer.js';

async function waitForEnter(): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question('', () => { rl.close(); resolve(); }));
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const START_URL = process.env.CRAWL_START_URL ?? `${BASE_URL}/${LOCALE}/home`;
const CRAWL_SCOPE = process.env.CRAWL_SCOPE ?? '';

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  const queue = new CrawlQueue();
  queue.enqueue(START_URL);

  let routeCount = 0;

  console.log(`Iniciando crawler em ${START_URL} ...`);
  if (CRAWL_SCOPE) console.log(`Escopo restrito a: ${CRAWL_SCOPE}`);

  while (!queue.isEmpty()) {
    const url = queue.dequeue()!;
    routeCount++;
    console.log(`[${routeCount}] ${url}`);

    try {
      const data = await visitRoute(context, url, BASE_URL);
      await writeRouteNote(data);

      for (const link of data.links) {
        if (!CRAWL_SCOPE || link.includes(CRAWL_SCOPE)) {
          queue.enqueue(link);
        }
      }

      console.log(`  ✓  "${data.title}" — ${data.requests.length} endpoints, ${data.links.length} links`);
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        console.log('\n⚠️  Sessão expirada!');
        console.log('   1. Na janela do Chromium, clique em "Realizar o login"');
        console.log('   2. Aguarde o popup do AgRisk carregar e feche-o');
        console.log('   3. Dê F5 na página do AgFlow e espere a tela inicial carregar');
        console.log('   4. Pressione Enter aqui para o crawler continuar...\n');
        await waitForEnter();
        queue.requeue(url);
      } else {
        console.error(`  ✗  Erro:`, err instanceof Error ? err.message : err);
      }
    }
  }

  console.log(`\nCrawl concluído — ${routeCount} rotas visitadas.`);
  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal no crawler:', err);
  process.exit(1);
});
