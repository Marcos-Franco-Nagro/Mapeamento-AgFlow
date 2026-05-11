import fs from 'fs/promises';
import path from 'path';
import { slugify } from '../utils/slug.js';
import { buildRotaFrontmatter, frontmatterToYaml } from './templates.js';
import type { RouteData } from '../crawler/visit.js';
import type { CapturedRequest } from '../crawler/extractors/network.js';

const VAULT_DIR = 'vault';

function endpointSlug(req: CapturedRequest): string {
  try {
    return `${req.method}-${slugify(new URL(req.url).pathname)}`;
  } catch {
    return `${req.method}-unknown`;
  }
}

export async function writeRouteNote(data: RouteData): Promise<void> {
  const rotasDir = path.join(VAULT_DIR, 'rotas');
  const endpointsDir = path.join(VAULT_DIR, 'endpoints');
  await fs.mkdir(rotasDir, { recursive: true });
  await fs.mkdir(endpointsDir, { recursive: true });

  const fm = buildRotaFrontmatter({
    url: data.url,
    path: data.path,
    title: data.title,
    crawledAt: data.crawledAt,
  });
  const frontmatter = frontmatterToYaml(fm as unknown as Record<string, unknown>);

  // Deduplica endpoints pelo slug
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

  const linkedRoutes =
    data.links.length > 0
      ? data.links.map((l) => `- [[${slugify(l)}]]`).join('\n')
      : '- (nenhum)';

  const noteContent = `${frontmatter}

# ${data.title}

**URL completa:** \`${data.url}\`

![[${data.screenshot}]]

## Endpoints consumidos

${endpointLinks}

## Elementos interativos

${elementsTable}

## Rotas relacionadas

**Destinos:**
${linkedRoutes}

## Observações de QA

-
`;

  await fs.writeFile(path.join(rotasDir, `${data.slug}.md`), noteContent, 'utf-8');

  // Gera nota de endpoint apenas se ainda não existe
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

## Rotas que consomem este endpoint

- [[${data.slug}]]

## Observações

-
`;
      await fs.writeFile(endpointFile, endpointNote, 'utf-8');
    }
  }
}
