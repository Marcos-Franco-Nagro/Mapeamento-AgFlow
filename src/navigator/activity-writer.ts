import fs from 'fs/promises';
import path from 'path';
import type { ActivityResult } from './activity-visit.js';
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
  for (const req of requests) {
    endpointMap.set(endpointSlug(req), req);
  }
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

export async function writeActivityNote(result: ActivityResult): Promise<void> {
  const featuresDir = path.join(VAULT_DIR, 'features', result.phaseSlug);
  await fs.mkdir(featuresDir, { recursive: true });

  const featureSlug = `${result.phaseSlug}-atividades`;

  const fillEndpointsDir = path.join(VAULT_DIR, 'endpoints', result.phaseSlug, 'atividades-de-etapa');
  const activitySlugs = await writeEndpoints(result.requestsActivities, fillEndpointsDir, featureSlug);

  let advanceSlugs: string[] = [];
  if (result.requestsAdvance) {
    const advanceEndpointsDir = path.join(VAULT_DIR, 'endpoints', result.phaseSlug, 'avanco-de-etapa');
    advanceSlugs = await writeEndpoints(result.requestsAdvance, advanceEndpointsDir, featureSlug);
  }

  const toLinks = (slugs: string[]) =>
    slugs.length > 0 ? slugs.map((s) => `- [[${s}]]`).join('\n') : '- (nenhum capturado)';

  const statusSave = result.savedOk ? '✅' : '⚠️ verificar';
  const statusAdvance = result.advancedOk === undefined ? '' : result.advancedOk ? '✅' : '⚠️ verificar';

  const advanceScreenshotRow = result.screenshotAdvanced
    ? `| Após avançar etapa (${statusAdvance}) | ![[${result.screenshotAdvanced}]] |\n`
    : '';

  const advanceSection = result.requestsAdvance !== undefined
    ? `\n## Endpoints — Avanço de etapa\n\n${toLinks(advanceSlugs)}\n`
    : '';

  const note = `---
cardId: "${result.cardId}"
phaseSlug: "${result.phaseSlug}"
fieldCount: ${result.fieldCount}
savedOk: ${result.savedOk}
advancedOk: ${result.advancedOk ?? false}
crawledAt: "${result.crawledAt}"
tags: [agflow, atividades-de-etapa, ${result.phaseSlug}]
---

# Atividades da Etapa — ${result.phaseSlug}

**Card:** \`${result.cardId}\`
**Campos preenchidos:** ${result.fieldCount}/${result.fieldCount}

## Screenshots

| Momento | Arquivo |
|---------|---------|
| Antes de preencher | ![[${result.screenshotBefore}]] |
| Após preencher | ![[${result.screenshotFilled}]] |
| Após salvar (${statusSave}) | ![[${result.screenshotSaved}]] |
${advanceScreenshotRow}
## Endpoints — Atividades da etapa

${toLinks(activitySlugs)}
${advanceSection}
## Observações de QA

-
`;

  await fs.writeFile(path.join(featuresDir, `${featureSlug}.md`), note, 'utf-8');
}
