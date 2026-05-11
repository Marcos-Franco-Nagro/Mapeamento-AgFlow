import type { Page } from 'playwright';

export interface InteractiveElement {
  tag: string;
  selector: string;
  playwrightLocator: string;
  text: string;
  type?: string;
  href?: string;
}

export async function extractElements(page: Page): Promise<InteractiveElement[]> {
  return page.evaluate((): InteractiveElement[] => {
    const nodes = Array.from(
      document.querySelectorAll(
        'button, input, select, textarea, a[href], [role="button"], [role="link"]'
      )
    ).slice(0, 150);

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
        // Fallback: seletor por texto — necessário no AgFlow pois não há testids (MUI)
        selector = `${tag}:has-text("${text.slice(0, 40)}")`;
        playwrightLocator = `page.getByRole('${role}', { name: '${text.slice(0, 40)}' })`;
      }

      return {
        tag,
        selector,
        playwrightLocator,
        text,
        type: el.getAttribute('type') ?? undefined,
        href: el.getAttribute('href') ?? undefined,
      };
    });
  });
}
