import fs from 'fs/promises';
import path from 'path';

const VAULT_ENDPOINTS = path.join('vault', 'endpoints');

async function main(): Promise<void> {
  let scriptDirs: string[];
  try {
    scriptDirs = await fs.readdir(VAULT_ENDPOINTS);
  } catch {
    console.error('vault/endpoints não encontrado.');
    process.exit(1);
  }

  // slug → primeiro script que o possui (canônico)
  const firstSeen = new Map<string, string>();
  let deleted = 0;

  for (const scriptDir of scriptDirs) {
    const navDir = path.join(VAULT_ENDPOINTS, scriptDir, 'navegacao');
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
        firstSeen.set(slug, scriptDir);
        continue;
      }

      // duplicata — deletar
      const filePath = path.join(navDir, file);
      await fs.unlink(filePath);
      console.log(`  DEL  ${scriptDir}/navegacao/${file}`);
      console.log(`       (já existe em: ${firstSeen.get(slug)}/navegacao/)`);
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
