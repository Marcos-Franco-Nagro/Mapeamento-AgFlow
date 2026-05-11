import fs from 'fs/promises';
import path from 'path';
import type { ParecerResult } from './parecer-visit.js';
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

async function writeEndpoints(
  requests: CapturedRequest[],
  endpointsDir: string,
  featureSlug: string,
): Promise<string[]> {
  await fs.mkdir(endpointsDir, { recursive: true });
  const endpointMap = new Map<string, CapturedRequest>();
  for (const req of requests) endpointMap.set(endpointSlug(req), req);

  for (const [slug, req] of endpointMap.entries()) {
    const file = path.join(endpointsDir, `${slug}.md`);
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(
        file,
        `---
method: ${req.method}
url: "${req.url}"
status: ${req.status ?? 'unknown'}
tags: [endpoint, agflow]
---

# ${req.method} ${req.url}

## Features que consomem este endpoint

- [[${featureSlug}]]

## Observações

-
`,
        'utf-8',
      );
    }
  }
  return [...endpointMap.keys()];
}

export async function writeParecerNote(result: ParecerResult): Promise<void> {
  const featuresDir = path.join(VAULT_DIR, 'features', result.phaseSlug);
  await fs.mkdir(featuresDir, { recursive: true });

  const parecerEndpointsDir = path.join(VAULT_DIR, 'endpoints', result.phaseSlug, 'parecer-de-credito');

  const featureSlug = `${result.phaseSlug}-parecer`;

  const parecerSlugs = await writeEndpoints(result.requestsParecer, parecerEndpointsDir, featureSlug);

  const parecerLinks = parecerSlugs.length > 0
    ? parecerSlugs.map((s) => `- [[${s}]]`).join('\n')
    : '- (nenhum capturado)';

  const statusConcluded = result.concludedOk ? '✅' : '⚠️ verificar';

  const note = `---
cardId: "${result.cardId}"
phaseSlug: "${result.phaseSlug}"
concludedOk: ${result.concludedOk}
crawledAt: "${result.crawledAt}"
tags: [agflow, parecer-de-credito, ${result.phaseSlug}]
---

# Parecer de Crédito — ${result.phaseSlug}

**Card:** \`${result.cardId}\`

## Screenshots

| Momento | Arquivo |
|---------|---------|
| Antes de abrir painel | ![[${result.screenshotBefore}]] |
| Painel preenchido | ![[${result.screenshotFilled}]] |
| Após Concluir análise (${statusConcluded}) | ![[${result.screenshotConcluded}]] |

## Endpoints — Preenchimento do parecer

${parecerLinks}

## Observações de QA

-
`;

  await fs.writeFile(path.join(featuresDir, `${featureSlug}.md`), note, 'utf-8');
}
