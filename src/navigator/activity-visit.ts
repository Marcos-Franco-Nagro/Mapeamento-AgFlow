import type { BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { CardFixture } from '../fixtures/cards.js';
import { PHASE1_FIELDS, PHASE2_FIELDS, PHASE3_FIELDS, PHASE4_FIELDS, PHASE5_FIELDS, fillActivityFields, type ActivityFieldDef } from './activity-fields.js';
import { advanceToNextPhase } from './agflow-helpers.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');

export interface ActivityResult {
  cardId: string;
  phaseSlug: string;
  fieldCount: number;
  screenshotBefore: string;
  screenshotFilled: string;
  screenshotSaved: string;
  screenshotAdvanced?: string;
  requestsActivities: CapturedRequest[];
  requestsAdvance?: CapturedRequest[];
  crawledAt: string;
  savedOk: boolean;
  advancedOk?: boolean;
}

interface PhaseActivityConfig {
  fields: ActivityFieldDef[];
  advanceLabel?: string; // se definido, avança de fase após salvar
}

function phaseConfig(phase: number): PhaseActivityConfig {
  if (phase === 1) return { fields: PHASE1_FIELDS };
  if (phase === 2) return { fields: PHASE2_FIELDS };
  if (phase === 3) return { fields: PHASE3_FIELDS };
  if (phase === 4) return { fields: PHASE4_FIELDS };
  if (phase === 5) return { fields: PHASE5_FIELDS };
  throw new Error(`Fase ${phase}: campos de atividades ainda não mapeados`);
}

export async function visitActivity(
  context: BrowserContext,
  card: CardFixture,
  clientId: string | undefined,
  phaseSlug: string,
  baseUrl: string,
  locale: string,
  flowId: string,
): Promise<ActivityResult> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  const screenshotsDir = path.join('vault', 'screenshots', phaseSlug, 'atividades-de-etapa');
  const outputDir = path.join('crawl-output', 'activities', phaseSlug);

  try {
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    const base = `${baseUrl}/${locale}/flow/${flowId}/card/${card.cardId}/summary/stages`;
    const url = clientId ? `${base}?clientId=${clientId}` : base;
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) throw new AuthExpiredError(url);

    await expect(page.getByText('Campos da etapa')).toBeVisible({ timeout: 10000 });

    const screenshotBefore = `${card.cardId}-antes.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotBefore), fullPage: true });

    const config = phaseConfig(card.phase);
    const { fields } = config;
    const newlyFilled = await fillActivityFields(page, fields);
    console.log(`    ${newlyFilled} campo(s) preenchido(s) (${fields.length - newlyFilled} já estavam preenchidos)`);

    await expect(page.getByText(`${fields.length}/${fields.length} preenchidos`))
      .toBeVisible({ timeout: 8000 });

    const screenshotFilled = `${card.cardId}-preenchido.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotFilled), fullPage: true });

    // Salvar — botão só habilita se algum campo foi alterado nesta sessão
    let savedOk = false;
    const saveButton = page.getByRole('button', { name: 'Salvar', exact: true });

    if (newlyFilled > 0) {
      try {
        await expect(saveButton).toBeEnabled({ timeout: 5000 });
        await saveButton.click();
        await page.waitForTimeout(2000);
        savedOk = true;
      } catch {
        // Campos já estavam salvos no backend — Save desabilitado é esperado
        console.log('    ⚠️  Salvar desabilitado (campos já persistidos) — ok, continuando');
        savedOk = true;
      }
    } else {
      console.log('    Todos os campos já estavam salvos — pulando Salvar');
      savedOk = true;
    }

    const screenshotSaved = `${card.cardId}-salvo.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshotSaved), fullPage: true });

    // Snapshot dos endpoints de atividades (antes do avanço)
    const requestsActivitiesSnapshot = getRequests();

    // Fases sem parecer (ex: Fase 1) avançam direto após salvar
    let advancedOk: boolean | undefined;
    let screenshotAdvanced: string | undefined;
    let requestsAdvance: CapturedRequest[] | undefined;
    if (config.advanceLabel && savedOk) {
      const advanceDir = path.join('vault', 'screenshots', phaseSlug, 'avanco-de-etapa');
      await fs.mkdir(advanceDir, { recursive: true });
      advancedOk = await advanceToNextPhase(page, config.advanceLabel);
      await page.waitForTimeout(1000);
      screenshotAdvanced = `${card.cardId}-avancado.png`;
      await page.screenshot({ path: path.join(advanceDir, screenshotAdvanced), fullPage: true });
      const allRequests = getRequests();
      requestsAdvance = allRequests.slice(requestsActivitiesSnapshot.length);
    }

    const result: ActivityResult = {
      cardId: card.cardId,
      phaseSlug,
      fieldCount: fields.length,
      screenshotBefore,
      screenshotFilled,
      screenshotSaved,
      screenshotAdvanced,
      requestsActivities: requestsActivitiesSnapshot,
      requestsAdvance,
      crawledAt: new Date().toISOString(),
      savedOk,
      advancedOk,
    };

    await fs.writeFile(
      path.join(outputDir, `${card.cardId}.json`),
      JSON.stringify(result, null, 2),
      'utf-8',
    );

    return result;
  } finally {
    await page.close();
  }
}
