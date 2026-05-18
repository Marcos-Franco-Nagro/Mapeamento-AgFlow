import fs from 'fs/promises';
import path from 'path';

const VAULT_ENDPOINTS = path.join('vault', 'endpoints');

// Encontra todas as pastas "navegacao" em qualquer profundidade sob vault/endpoints
async function findNavegacaoDirs(dir: string): Promise<string[]> {
  const result: string[] = [];
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return result;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    try {
      const stat = await fs.stat(full);
      if (!stat.isDirectory()) continue;
      if (entry === 'navegacao') {
        result.push(full);
      } else {
        result.push(...await findNavegacaoDirs(full));
      }
    } catch { /* ignorar */ }
  }
  return result;
}

async function main(): Promise<void> {
  const navDirs = await findNavegacaoDirs(VAULT_ENDPOINTS);

  if (navDirs.length === 0) {
    console.log('Nenhuma pasta navegacao encontrada.');
    return;
  }

  console.log(`Encontradas ${navDirs.length} pasta(s) navegacao.\n`);

  // slug → caminho relativo da primeira pasta que o possui (canônico)
  const firstSeen = new Map<string, string>();
  let deleted = 0;

  for (const navDir of navDirs) {
    const relDir = path.relative(VAULT_ENDPOINTS, navDir);
    let files: string[];
    try {
      files = await fs.readdir(navDir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const slug = file.slice(0, -3);

      if (!firstSeen.has(slug)) {
        firstSeen.set(slug, relDir);
        continue;
      }

      const filePath = path.join(navDir, file);
      await fs.unlink(filePath);
      console.log(`  DEL  ${relDir}/${file}`);
      console.log(`       (já existe em: ${firstSeen.get(slug)}/)`);
      deleted++;
    }
  }

  console.log(`\n✅ Limpeza concluída: ${deleted} arquivo(s) deletado(s).`);
  if (deleted === 0) {
    console.log('   Nenhum duplicado encontrado.');
  }
}

main().catch((err) => {
  console.error('Erro:', err);
  process.exit(1);
});
