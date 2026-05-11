import fs from 'fs/promises';
import path from 'path';
import type { ModalData } from './modal-visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';
import { slugify } from '../utils/slug.js';

const VAULT_DIR = 'vault';

function endpointSlug(req: CapturedRequest): string {
  try {
    return `${req.method}-${slugify(new URL(req.url).pathname)}`;
  } catch {
    return `${req.method}-unknown`;
  }
}

export async function writeModalNote(data: ModalData): Promise<void> {
  const featuresDir = path.join(VAULT_DIR, 'features', 'modais');
  const endpointsDir = path.join(VAULT_DIR, 'endpoints', 'modais', 'navegacao');
  await fs.mkdir(featuresDir, { recursive: true });
  await fs.mkdir(endpointsDir, { recursive: true });

  const endpointMap = new Map<string, CapturedRequest>();
  for (const req of data.requests) {
    endpointMap.set(endpointSlug(req), req);
  }

  const endpointLinks =
    endpointMap.size > 0
      ? [...endpointMap.keys()].map((s) => `- [[${s}]]`).join('\n')
      : '- (nenhum capturado)';

  const elementsTable =
    data.elements.length > 0
      ? `| Elemento | Seletor CSS | Locator Playwright | Tipo |\n|----------|-------------|-------------------|------|\n` +
        data.elements
          .map(
            (e) =>
              `| ${e.text || e.tag} | \`${e.selector}\` | \`${e.playwrightLocator}\` | ${e.type ?? e.tag} |`
          )
          .join('\n')
      : '(nenhum encontrado)';

  const frontmatter = [
    '---',
    `url: "${data.triggerUrl}"`,
    `crawledAt: "${data.crawledAt}"`,
    `tags: [agflow, modal]`,
    '---',
  ].join('\n');

  const note = `${frontmatter}

# Modal: ${data.name}

> ${data.description}

**URL de trigger:** \`${data.triggerUrl}\`

![[modal-${data.slug}.png]]

## Endpoints consumidos

${endpointLinks}

## Elementos interativos

${elementsTable}

## Observações de QA

-
`;

  await fs.writeFile(path.join(featuresDir, `modal-${data.slug}.md`), note, 'utf-8');

  for (const [slug, req] of endpointMap.entries()) {
    const endpointFile = path.join(endpointsDir, `${slug}.md`);
    try {
      await fs.access(endpointFile);
    } catch {
      await fs.writeFile(
        endpointFile,
        `---
method: ${req.method}
url: "${req.url}"
status: ${req.status ?? 'unknown'}
tags: [endpoint, agflow]
---

# ${req.method} ${req.url}

## Features que consomem este endpoint

- [[modal-${data.slug}]]

## Observações

-
`,
        'utf-8'
      );
    }
  }
}
