# AgFlow QA Mapper

Automação de mapeamento do AgFlow (Nagro) para acelerar documentação de bugs em QA.

**Stack:** Playwright + TypeScript + Obsidian (vault local) + MCP Obsidian + Claude

## O que faz

Navega o AgFlow autenticado, captura screenshots, endpoints consumidos e seletores de cada rota. Gera um vault Obsidian consultável via LLM — transforma o trabalho de documentar bugs de 15min para 2min.

## Como rodar

```bash
npm install
npx playwright install chromium
npm run login   # interativo, salva auth/storageState.json
npm run crawl   # gera vault/ com notas Markdown
```

Abrir `./vault` no Obsidian. Configurar `mcp-obsidian` no cliente Claude apontando para esse caminho.

## Documentação

Ver `CLAUDE.md` para briefing completo do projeto, arquitetura, fases de implementação e convenções.
