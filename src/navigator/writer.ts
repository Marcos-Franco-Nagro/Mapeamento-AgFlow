import fs from 'fs/promises';
import path from 'path';
import type { FeatureData } from './visit.js';
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

export async function writeFeatureNote(data: FeatureData): Promise<void> {
  const featuresDir = path.join(VAULT_DIR, 'features', data.phaseSlug);
  const topicParts = data.topicSlug ? data.topicSlug.split('/') : [];
  const endpointsDir = path.join(VAULT_DIR, 'endpoints', data.phaseSlug, data.scriptType, data.moduleSlug, ...topicParts);
  await fs.mkdir(featuresDir, { recursive: true });
  await fs.mkdir(endpointsDir, { recursive: true });

  const frontmatter = [
    '---',
    `url: "${data.url}"`,
    `path: "${data.path}"`,
    `fase: ${data.phase}`,
    `fase_nome: "${data.phaseName}"`,
    `modulo: "${data.moduleName}"`,
    `topico: "${data.topicName}"`,
    `crawledAt: "${data.crawledAt}"`,
    `tags: [agflow, feature, fase-${data.phase}, ${data.moduleSlug}]`,
    '---',
  ].join('\n');

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

  const note = `${frontmatter}

# ${data.moduleName} > ${data.topicName}

**Fase:** ${data.phase} — ${data.phaseName}
**URL:** \`${data.url}\`

![[${data.screenshot}]]

## Endpoints consumidos

${endpointLinks}

## Elementos interativos

${elementsTable}

## Observações de QA

-
`;

  await fs.writeFile(path.join(featuresDir, `${data.slug}.md`), note, 'utf-8');

  for (const [slug, req] of endpointMap.entries()) {
    const endpointFile = path.join(endpointsDir, `${slug}.md`);
    try {
      await fs.access(endpointFile);
    } catch {
      const endpointNote = `---
method: ${req.method}
url: "${req.url}"
status: ${req.status ?? 'unknown'}
tags: [endpoint, agflow]
---

# ${req.method} ${req.url}

## Features que consomem este endpoint

- [[${data.slug}]]

## Observações

-
`;
      await fs.writeFile(endpointFile, endpointNote, 'utf-8');
    }
  }
}
