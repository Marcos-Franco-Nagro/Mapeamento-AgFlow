import 'dotenv/config';
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { FLOW_ID } from '../fixtures/cards.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ storageState: STATE_PATH });
const page = await ctx.newPage();

await page.goto(`${BASE_URL}/${LOCALE}/home`, { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(1500);
await page.goto(`${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/board`, { waitUntil: 'load', timeout: 30000 });

console.log('Browser aberto no board. Feche a janela quando terminar.');
await page.waitForEvent('close', { timeout: 300000 });
await browser.close();
console.log('Feito.');
