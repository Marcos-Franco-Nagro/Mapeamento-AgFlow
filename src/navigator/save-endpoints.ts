import fs from 'fs/promises';
import path from 'path';
import type { CapturedRequest } from '../crawler/extractors/network.js';

function makeSlug(req: CapturedRequest): string {
  return `${req.method}-${req.url.replace(/[^a-z0-9]/gi, '-').slice(0, 120)}`;
}

function makeMd(req: CapturedRequest, tags: string[]): string {
  return `---\nmethod: ${req.method}\nurl: "${req.url}"\nstatus: ${req.status ?? 'unknown'}\ntags: [${tags.join(', ')}]\n---\n\n# ${req.method} ${req.url}\n\n## Observações\n\n-\n`;
}

/**
 * Salva endpoints em targetDir, ignorando arquivos que já existem nessa mesma pasta.
 * Uso padrão para pastas de ação (editar, excluir, adicionar-comentario…).
 */
export async function saveEndpoints(
  requests: CapturedRequest[],
  targetDir: string,
  tags: string[],
): Promise<void> {
  await fs.mkdir(targetDir, { recursive: true });
  for (const req of requests) {
    try {
      const file = path.join(targetDir, `${makeSlug(req)}.md`);
      try { await fs.access(file); continue; } catch { /* não existe, criar */ }
      await fs.writeFile(file, makeMd(req, tags), 'utf-8');
    } catch { /* ignorar */ }
  }
}

// Salva endpoints de navegação com deduplicação global:
// verifica se o mesmo slug já existe em QUALQUER vault/endpoints/<script>/navegacao/
// e só salva o que for genuinamente novo.
// Retorna { saved, skipped } para o caller logar.
export async function saveNavegacaoEndpoints(
  requests: CapturedRequest[],
  targetDir: string,
  tags: string[],
): Promise<{ saved: number; skipped: number }> {
  // Coleta slugs já capturados em qualquer script de navegação
  const knownSlugs = new Set<string>();
  const vaultEndpoints = path.join('vault', 'endpoints');
  try {
    const scriptDirs = await fs.readdir(vaultEndpoints);
    for (const scriptDir of scriptDirs) {
      const navDir = path.join(vaultEndpoints, scriptDir, 'navegacao');
      try {
        const files = await fs.readdir(navDir);
        for (const f of files) {
          if (f.endsWith('.md')) knownSlugs.add(f.slice(0, -3));
        }
      } catch { /* pasta navegacao não existe nesse script */ }
    }
  } catch { /* vault/endpoints ainda não existe */ }

  await fs.mkdir(targetDir, { recursive: true });
  let saved = 0;
  let skipped = 0;

  for (const req of requests) {
    try {
      const slug = makeSlug(req);
      if (knownSlugs.has(slug)) { skipped++; continue; }

      const file = path.join(targetDir, `${slug}.md`);
      try { await fs.access(file); skipped++; continue; } catch { /* não existe */ }

      await fs.writeFile(file, makeMd(req, tags), 'utf-8');
      saved++;
    } catch { /* ignorar */ }
  }

  return { saved, skipped };
}
