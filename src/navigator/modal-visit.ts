import type { BrowserContext, Page } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { setupNetworkCapture, type CapturedRequest } from '../crawler/extractors/network.js';
import { AuthExpiredError } from '../crawler/visit.js';
import type { ModalDef, FormFill } from './modals.js';
import type { InteractiveElement } from '../crawler/extractors/elements.js';

const NAV_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000');
const SCREENSHOTS_DIR = 'vault/screenshots';
const OUTPUT_DIR = 'crawl-output/modals';

export interface ModalData {
  slug: string;
  name: string;
  description: string;
  triggerUrl: string;
  screenshot: string;
  requests: CapturedRequest[];
  elements: InteractiveElement[];
  crawledAt: string;
}

// Lê e incrementa o contador de runs de um modal (persistido em crawl-output/modals/)
async function getAndIncrementRunCount(slug: string): Promise<number> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const counterPath = path.join(OUTPUT_DIR, `${slug}-counter.json`);
  let count = 1;
  try {
    const raw = await fs.readFile(counterPath, 'utf-8');
    count = (JSON.parse(raw).count ?? 0) + 1;
  } catch { /* arquivo não existe — começa em 1 */ }
  await fs.writeFile(counterPath, JSON.stringify({ count }), 'utf-8');
  return count;
}

// Preenche campos de formulário dentro do modal antes do screenshot
async function fillFormFields(page: Page, fields: FormFill[], runN: number): Promise<void> {
  const suffix = runN <= 1 ? '' : ` ${runN}`;
  for (const field of fields) {
    const value = field.value.replace('{runSuffix}', suffix);
    const input = page.getByLabel(field.label, { exact: false });
    await input.click();
    await input.fill(value);
    if (field.confirmWithEnter) {
      await input.press('Enter');
    }
    await page.waitForTimeout(300);
  }
  // aguarda validações e re-renders do MUI
  await page.waitForTimeout(600);
}

// Extrai elementos interativos com escopo limitado ao [role="dialog"] quando presente
async function extractModalElements(page: Page): Promise<InteractiveElement[]> {
  return page.evaluate((): InteractiveElement[] => {
    const root: Element = document.querySelector('[role="dialog"]') ?? document.body;
    const nodes = Array.from(
      root.querySelectorAll('button, input, select, textarea, a[href], [role="button"]')
    ).slice(0, 80);

    return nodes.map((el) => {
      const tag = el.tagName.toLowerCase();
      const testId = el.getAttribute('data-testid') ?? el.getAttribute('data-test');
      const id = el.getAttribute('id');
      const ariaLabel = el.getAttribute('aria-label');
      const text = ((el as HTMLElement).textContent ?? '').trim().slice(0, 80);
      const role = el.getAttribute('role') ?? tag;

      let selector = tag;
      let playwrightLocator = '';

      if (testId) {
        selector = `[data-testid="${testId}"]`;
        playwrightLocator = `page.getByTestId('${testId}')`;
      } else if (id) {
        selector = `#${id}`;
        playwrightLocator = `page.locator('#${id}')`;
      } else if (ariaLabel) {
        selector = `[aria-label="${ariaLabel}"]`;
        playwrightLocator = `page.getByRole('${role}', { name: '${ariaLabel}' })`;
      } else if (text) {
        selector = `${tag}:has-text("${text.slice(0, 40)}")`;
        playwrightLocator = `page.getByRole('${role}', { name: '${text.slice(0, 40)}' })`;
      }

      return {
        tag,
        selector,
        playwrightLocator,
        text,
        type: el.getAttribute('type') ?? undefined,
      };
    });
  });
}

export async function visitModal(
  context: BrowserContext,
  modal: ModalDef,
): Promise<ModalData> {
  const page = await context.newPage();
  const getRequests = setupNetworkCapture(page);

  try {
    const runN = modal.useRunCounter ? await getAndIncrementRunCount(modal.slug) : 1;

    await page.goto(modal.triggerUrl, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    await page.waitForTimeout(1500);

    if (page.url().includes('pending-login')) {
      throw new AuthExpiredError(modal.triggerUrl);
    }

    const { testId, text, ariaLabel } = modal.trigger;
    if (testId) {
      await page.getByTestId(testId).click();
    } else if (ariaLabel) {
      await page.getByRole('button', { name: ariaLabel }).click();
    } else if (text) {
      await page.getByRole('button', { name: text }).click();
    } else {
      throw new Error(`Modal "${modal.slug}": trigger não definido`);
    }

    const waitSel = modal.waitSelector ?? '[role="dialog"]';
    await page.waitForSelector(waitSel, { timeout: 10000 });
    await page.waitForTimeout(800);

    if (modal.fillForm && modal.fillForm.length > 0) {
      await fillFormFields(page, modal.fillForm, runN);
    }

    await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // screenshot com formulário preenchido (antes de submeter)
    const screenshotFile = `modal-${modal.slug}.png`;
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, screenshotFile), fullPage: true });

    // submete o formulário e captura screenshot do resultado
    if (modal.submit) {
      await page.getByRole('button', { name: modal.submit.buttonText }).click();
      try {
        await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 10000 });
      } catch { /* modal pode não fechar imediatamente */ }
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `modal-${modal.slug}-submitted.png`),
        fullPage: true,
      });
    }

    const elements = await extractModalElements(page);

    const data: ModalData = {
      slug: modal.slug,
      name: modal.name,
      description: modal.description,
      triggerUrl: modal.triggerUrl,
      screenshot: screenshotFile,
      requests: getRequests(),
      elements,
      crawledAt: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(OUTPUT_DIR, `${modal.slug}.json`),
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    return data;
  } finally {
    await page.close();
  }
}
