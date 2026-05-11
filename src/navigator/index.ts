import 'dotenv/config';
import { chromium, type BrowserContext } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { CARD_FIXTURES, getPhaseSlug } from '../fixtures/cards.js';
import { FLOW_ROUTES } from './routes.js';
import { AGFLOW_NAV_MAP, type NavNode } from './navigation-map.js';
import fs from 'fs/promises';
import { visitFeature, discoverClientId } from './visit.js';
import { writeFeatureNote } from './writer.js';
import { AuthExpiredError } from '../crawler/visit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '../../auth/storageState.json');
const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const FLOW_ID = '67bf0dccb38591aeceff8121';
const HAS_GROUP = process.env.HAS_GROUP === 'true';

interface VisitItem {
  moduleSlug: string;
  moduleName: string;
  topicSlug: string;
  topicName: string;
  needsClientId: boolean;
  requiresMultiClient: boolean;
}

interface GapItem {
  path: string;
  reason: string;
}

// Percorre a árvore recursivamente e coleta apenas folhas (nós sem filhos).
// Retorna lista de páginas a visitar e gaps intencionais para o relatório.
function collectLeaves(
  nodes: NavNode[],
  phase: number,
  slugPath: string[] = [],
  namePath: string[] = [],
  inheritedMultiClient = false,
): { items: VisitItem[]; gaps: GapItem[] } {
  const items: VisitItem[] = [];
  const gaps: GapItem[] = [];

  for (const node of nodes) {
    const currentSlugPath = [...slugPath, node.slug];
    const currentNamePath = [...namePath, node.label];
    const isMultiClient = inheritedMultiClient || node.requires === 'multi-client';

    if (!node.enabledInPhases.includes(phase)) {
      gaps.push({
        path: currentSlugPath.join('/') + (node.children ? '/*' : ''),
        reason: `desabilitado na fase ${phase}`,
      });
      continue;
    }

    if (node.children && node.children.length > 0) {
      const result = collectLeaves(node.children, phase, currentSlugPath, currentNamePath, isMultiClient);
      items.push(...result.items);
      gaps.push(...result.gaps);
    } else {
      const moduleSlug = currentSlugPath[0];
      const moduleName = currentNamePath[0];
      const topicNameParts = currentNamePath.slice(1);
      items.push({
        moduleSlug,
        moduleName,
        topicSlug: currentSlugPath.slice(1).join('/'),
        topicName: topicNameParts.length > 0 ? topicNameParts.join(' > ') : moduleName,
        needsClientId: node.needsClientId ?? false,
        requiresMultiClient: isMultiClient,
      });
    }
  }

  return { items, gaps };
}

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

function buildUrl(cardId: string, moduleSlug: string, topicSlug: string, clientId?: string): string {
  const parts = [moduleSlug, topicSlug].filter(Boolean).join('/');
  const url = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${cardId}/${parts}`;
  return clientId ? `${url}?clientId=${clientId}` : url;
}

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: STATE_PATH });

  console.log('Verificando sessão...');
  const sessionValid = await checkSession(context);
  if (!sessionValid) {
    console.error('❌ Sessão expirada. Rode "npm run login" primeiro e tente novamente.');
    await browser.close();
    process.exit(1);
  }
  console.log('✓ Sessão válida. Iniciando navegação...');

  let totalCount = 0;
  let totalErrors = 0;

  const flowPhaseSlug = getPhaseSlug(0, 'Flow');

  console.log('\n🗂️  Rotas do flow...');
  for (const route of FLOW_ROUTES) {
    const url = `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/${route.slug}`;
    const noteFile = path.join('vault', 'features', flowPhaseSlug, `flow-${route.slug}.md`);
    try {
      await fs.access(noteFile);
      console.log(`  ⏭  [skip] ${route.name}`);
      continue;
    } catch { /* não existe — prosseguir */ }

    totalCount++;
    console.log(`  [${totalCount}] ${route.name}`);
    try {
      const data = await visitFeature(context, url, BASE_URL, {
        phase: 0,
        phaseName: 'Flow',
        phaseSlug: flowPhaseSlug,
        scriptType: 'navegacao',
        moduleSlug: route.slug,
        moduleName: route.name,
        topicSlug: '',
        topicName: route.name,
      });
      await writeFeatureNote(data);
      console.log(`    ✓  ${data.requests.length} endpoints`);
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        console.error('\n❌ Sessão expirou.');
        console.error('   Rode "npm run login" e depois "npm run navigate" novamente.');
        await browser.close();
        process.exit(1);
      }
      totalErrors++;
      console.error(`    ✗  ${err instanceof Error ? err.message : err}`);
    }
  }

  for (const card of CARD_FIXTURES) {
    const cardPhaseSlug = getPhaseSlug(card.phase, card.phaseName);
    console.log(`\n📋 Fase ${card.phase} — ${card.phaseName}`);
    console.log(`   Card: ${card.cardId}`);

    const overviewUrl = buildUrl(card.cardId, 'summary', 'overview');
    const clientId = await discoverClientId(context, overviewUrl);
    if (clientId) {
      console.log(`   clientId: ${clientId}`);
    } else {
      console.log(`   ⚠️  clientId não descoberto — tópicos AgRisk navegarão sem ?clientId`);
    }

    const { items, gaps: structuralGaps } = collectLeaves(AGFLOW_NAV_MAP, card.phase);
    const intentionalGaps: string[] = structuralGaps.map(g => `${g.path} (${g.reason})`);

    let cardCount = 0;
    let cardErrors = 0;

    for (const item of items) {
      if (item.requiresMultiClient && !HAS_GROUP) {
        intentionalGaps.push(
          `${item.moduleSlug}/${item.topicSlug} (card de cliente único — defina HAS_GROUP=true para habilitar)`,
        );
        continue;
      }

      const topicClientId = item.needsClientId ? clientId : undefined;
      const url = buildUrl(card.cardId, item.moduleSlug, item.topicSlug, topicClientId);

      const topicPart = item.topicSlug.replace(/\//g, '-');
      const noteSlug = ['fase' + card.phase, item.moduleSlug, topicPart].filter(Boolean).join('-');
      const noteFile = path.join('vault', 'features', cardPhaseSlug, `${noteSlug}.md`);
      try {
        await fs.access(noteFile);
        console.log(`  ⏭  [skip] ${item.moduleName} > ${item.topicName}`);
        continue;
      } catch { /* não existe — prosseguir */ }

      cardCount++;
      totalCount++;
      const label = item.topicSlug ? `${item.moduleName} > ${item.topicName}` : item.moduleName;
      console.log(`  [${cardCount}] ${label}`);

      try {
        const data = await visitFeature(context, url, BASE_URL, {
          phase: card.phase,
          phaseName: card.phaseName,
          phaseSlug: cardPhaseSlug,
          scriptType: 'navegacao',
          moduleSlug: item.moduleSlug,
          moduleName: item.moduleName,
          topicSlug: item.topicSlug,
          topicName: item.topicName,
        });
        await writeFeatureNote(data);
        console.log(`    ✓  ${data.requests.length} endpoints`);
      } catch (err) {
        if (err instanceof AuthExpiredError) {
          console.error('\n❌ Sessão expirou durante a navegação.');
          console.error('   Rode "npm run login" e depois "npm run navigate" novamente.');
          await browser.close();
          process.exit(1);
        }
        cardErrors++;
        totalErrors++;
        console.error(`    ✗  ${err instanceof Error ? err.message : err}`);
      }
    }

    console.log(`\n   📊 Cobertura — Fase ${card.phase} — ${card.phaseName}`);
    console.log(`      ✅ ${cardCount} caminhos navegados, ${cardErrors} erro(s)`);
    if (intentionalGaps.length > 0) {
      console.log(`      ⏭  Gaps intencionais (${intentionalGaps.length}):`);
      intentionalGaps.forEach(g => console.log(`         • ${g}`));
    }
  }

  console.log(`\n✅ Navegação concluída — ${totalCount} rotas visitadas, ${totalErrors} erro(s).`);
  await browser.close();
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
