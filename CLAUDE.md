# AgFlow QA Mapper

> Briefing de projeto para Claude Code. Ao abrir uma nova sessão neste diretório, leia este arquivo inteiro antes de executar qualquer ação. Ele contém todo o contexto acumulado na conversa de planejamento feita no Cowork antes da migração para Claude Code.

---

## Contexto

Marcos Franco Oliveira Junior (marcos.oliveira@nagro.com.br) é estagiário de QA na Nagro, uma agrofintech brasileira que desenvolve o produto **AgFlow** (plataforma de fluxos de crédito agro) e outros produtos da família AgRisk.

Hoje, quando Marcos encontra um bug, ele documenta manualmente: tira screenshot de cada tela envolvida, escreve passo a passo à mão, identifica rota e endpoint por inspeção. Isso consome tempo significativo do trabalho de QA.

Este projeto nasceu de uma conversa com o Claude no Cowork em 24/04/2026 e foi migrado para Claude Code por envolver código que será versionado, executado localmente e evoluído ao longo do tempo.

## Objetivo

Construir uma pipeline que:
1. Navega automaticamente pelo AgFlow autenticado (crawler Playwright)
2. Captura screenshots, endpoints consumidos e seletores de cada rota
3. Gera um vault Obsidian com uma nota Markdown por rota, linkadas entre si
4. Expõe esse vault ao Claude via MCP Obsidian, para que reports de bug sejam gerados com contexto completo da tela sem Marcos precisar digitar o passo a passo manualmente

## Stack

| Peça | Ferramenta | Versão mínima |
|------|-----------|---------------|
| SO do desenvolvedor | Windows | — |
| Runtime | Node.js | 20.x LTS |
| Linguagem | TypeScript | 5.x |
| Crawler | Playwright | latest |
| Gerenciador de pacotes | npm (padrão) | — |
| Storage de knowledge | Obsidian (vault local, Markdown) | — |
| Ponte LLM ↔ vault | mcp-obsidian (npm) | latest |
| Cliente LLM | Claude Desktop ou Claude Code com MCP | — |

## Alvo de mapeamento

**Produto:** AgFlow — plataforma de fluxos de crédito agro da Nagro.

**URL base (dev):** `https://agflow.agrisk.dev`

**Autenticação:** Login federado entre dois subdomínios — o app e o IdP são front-ends separados.

### Fluxo de login observado (evidências em prints anexados no Cowork)

1. Usuário acessa `https://agflow.agrisk.dev/pt/home`
2. Se não autenticado, redireciona para `https://agflow.agrisk.dev/pt/pending-login?origin=<base64>`
   - Tela com fundo ciano, card branco, logo AgFlow, botão "Realizar o login"
3. Ao clicar em "Realizar o login", redireciona para `https://front.agrisk.dev/login/?externalAuth=true`
   - Página do AgRisk com formulário: campo "E-mail ou CPF", campo "Senha", link "Esqueci minha senha", botão "Entrar"
4. Após submit bem-sucedido, há redirect intermediário de volta para `agflow.agrisk.dev/pt/pending-login` exibindo spinner (~2s)
5. Finalmente aterrissa em `https://agflow.agrisk.dev/pt/home`
6. Tela inicial autenticada exibe lista de Flows (workflows de crédito) em cards coloridos: "Fluxo Etiquetas", "Teste motor PF Grão Direto", "Solicitação de Crédito | Balcão", "Implementação AgFlow", "Conta Trial", "QA implementação", "Solicitações de Crédito", "Formalização", "Garantias", "Suporte AgFlow", "Campos condicionais", entre outros.

### Implicações técnicas do fluxo de auth

- O `storageState` do Playwright precisa capturar cookies de **ambos** os domínios (`front.agrisk.dev` e `agflow.agrisk.dev`) para persistir a sessão. O `storageState` padrão do Playwright já faz isso naturalmente se o login completo acontecer na mesma BrowserContext.
- O crawler deve aguardar os redirects completarem. Estratégia: esperar `networkidle` + URL estabilizar em algum path sob `/pt/` que não seja `/pending-login`.
- O parâmetro `origin` na URL de pending-login é base64 do path de destino (ex: `L2hvbWU=` decodifica para `/home`). Pode ser útil para deep-link direto em rotas internas pós-login.
- O rodapé do sidebar exibe `v2.313.0` — provavelmente versão do frontend, útil para anexar em bug reports.

### Stack do frontend (ainda não identificada)

Marcos não sabe qual framework o AgFlow usa.

**Tarefa para a primeira sessão do Claude Code:** ao rodar o primeiro login em modo headed, inspecionar a página via DevTools para identificar:
- Framework (React / Angular / Vue / Svelte) via presença de `window.__REACT_DEVTOOLS_GLOBAL_HOOK__`, `window.ng`, `window.__VUE_DEVTOOLS_GLOBAL_HOOK__`, etc.
- Padrão de roteamento (history API provavelmente, dado o formato de URLs limpas tipo `/pt/home`)
- Disponibilidade de `data-testid` ou seletores semânticos estáveis (se não houver, o crawler precisa cair em seletores CSS estruturais, que são frágeis)
- Versão de build / hash visível em assets

Documentar descoberta em `docs/stack-analysis.md`.

## Arquitetura

```
┌─────────────────┐
│ Playwright      │  ──1── login 1x manual (headed) →
│ crawler (TS)    │       auth/storageState.json
│                 │  ──2── crawl headless usa storageState →
│                 │       visita rotas em BFS
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Obsidian Vault  │  ─── notas Markdown com links [[wiki]]
│ (./vault)       │       grafo navegável rotas ↔ endpoints ↔ fluxos
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MCP Obsidian    │  ─── expõe search_notes / read_note / list_notes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Claude Code /   │  ─── consulta vault ao gerar bug reports
│ Claude Desktop  │
└─────────────────┘
```

## Estrutura de pastas proposta

```
agflow-qa-mapper/
├── CLAUDE.md                    # este arquivo
├── README.md
├── package.json
├── tsconfig.json
├── .gitignore
├── .env.example                 # BASE_URL, timeouts, usuario de teste
├── playwright.config.ts
├── auth/
│   └── storageState.json        # GITIGNORED — contém cookies reais
├── src/
│   ├── auth/
│   │   └── login.ts             # login interativo (headed), salva storageState
│   ├── crawler/
│   │   ├── index.ts             # entrypoint do crawler
│   │   ├── queue.ts             # fila BFS de rotas com dedup
│   │   ├── visit.ts             # visita 1 rota: screenshot + network + seletores
│   │   └── extractors/
│   │       ├── elements.ts      # botões, inputs, links com seletores estáveis
│   │       ├── network.ts       # endpoints HTTP consumidos pela tela
│   │       └── links.ts         # descoberta de rotas filhas
│   ├── vault/
│   │   ├── writer.ts            # gera notas MD a partir dos dados coletados
│   │   └── templates.ts         # templates tipados de rota, endpoint, fluxo
│   └── utils/
│       ├── slug.ts              # url → nome de arquivo seguro
│       └── url.ts               # normalização, dedup de /cliente/123 → /cliente/:id
├── vault/                       # Obsidian vault (output do crawler)
│   ├── rotas/
│   ├── endpoints/
│   ├── fluxos/
│   ├── screenshots/
│   └── templates/
│       ├── rota.md
│       └── bug-report.md
└── docs/
    ├── stack-analysis.md        # preencher na Fase 1
    └── decisions.md             # ADRs curtos quando decisões importantes forem tomadas
```

## Fases de implementação

### Fase 0 — Setup ✅ CONCLUÍDA
- Dependências instaladas: `playwright`, `@playwright/test`, `typescript`, `tsx`, `dotenv`, `@types/node`
- `tsconfig.json`, `playwright.config.ts`, `.env.example`, `.gitignore` criados
- Chromium instalado via `npx playwright install chromium`
- Toda a estrutura `src/` implementada

### Fase 1 — Login interativo + descoberta de stack ✅ CONCLUÍDA
- `src/auth/login.ts` implementado — abre Chromium headed, aguarda login manual, salva `auth/storageState.json`
- Stack identificada: **Next.js App Router + Material-UI**, cookie HTTP-only, SSE em `sse.agflow.agrisk.dev/events`
- `docs/stack-analysis.md` preenchido
- Descobertas que impactaram o código:
  - `waitUntil: 'networkidle'` substituído por `'load' + 1500ms` (SSE impede networkidle)
  - `extractors/elements.ts` gera `playwrightLocator` com `getByRole`/`getByText` (MUI não tem data-testid)
  - Crawler roda em `headless: false` (servidor rejeita headless)
  - Detecção de expiração de sessão + pausa para re-auth manual implementada

### Fase 2+3 — Navegador estruturado + Geração do vault ✅ CONCLUÍDA (08/05/2026)

**200 rotas visitadas, 0 erros** — vault gerado com features, screenshots e endpoints organizados por fase, módulo e tópico.

**Cards fixture atuais** (salvo em `src/fixtures/cards.ts` — atualizar quando cards expirarem):
| Fase | Nome | Card ID |
|------|------|---------|
| 1 | Solicitações Recebidas | `69fdf5312c973ce220c447e7` |
| 2 | Validação Documental | `69fdf5492c973ce220c44844` |
| 3 | Pendência Documental | `69fe1d512c973ce220c49757` |
| 4 | Análise de Crédito ⭐ | `69fdf5782c973ce220c44940` |
| 5 | Alçadas de Aprovação | `69fdf6192c973ce220c45316` |
| 6 | Crédito Aprovado | `69fdf72b2c973ce220c45ead` |
| 7 | Crédito Reprovado | `69fdf7c72c973ce220c469c3` |

**Quirk importante — ERR_TOO_MANY_REDIRECTS:** URLs profundas abertas em aba nova às vezes entram em loop de redirect. Fix implementado em `src/navigator/visit.ts`: tenta a URL diretamente, e só faz warm-up (`goto(overview)`) no retry se der `ERR_TOO_MANY_REDIRECTS`. O warm-up preserva `?clientId` da URL original.

**Estrutura de screenshots:** organizada por `{fase}/{scriptType}/{moduleSlug}/{topicParts}/` — espelha a estrutura de endpoints. Necessário para repositório organizado.

**Cards expiram** — quando um card avança de fase ou é deletado, o fixture precisa ser atualizado com um novo card ID válido naquela fase. Ocorreu durante esta sessão com fases 2 e 3.

### Fase 2+3b — Scripts de interação ✅ PARCIALMENTE CONCLUÍDA (08/05/2026)

Scripts implementados e rodados:
- `npm run navigate:activities:solicitacoes` (fase 1) — preenche 3 campos de upload ✅
- `npm run navigate:parecer` (fase 4) — preenche parecer de crédito ✅

**Pendente para próxima sessão:**
- `npm run navigate:activities:analise` (fase 4) — preenche 10 campos das atividades
- `npm run navigate:advance:solicitacoes` (fase 1) — avança para Validação Documental
- `npm run navigate:advance:analise` (fase 4) — avança para Alçadas de Aprovação

**Regra de ordem dos scripts por fase (IMPORTANTE):**
```
1. navigate:activities:{fase}   — preenche campos (sem avançar)
2. navigate:parecer             — preenche parecer (sem avançar) [apenas fase 4]
3. navigate:advance:{fase}      — avança para próxima fase (SEMPRE POR ÚLTIMO)
```

**Motivo:** scripts que avançam de fase movem o card e impedem os scripts seguintes de encontrá-lo na fase original.

### Fase 4 — Integração Obsidian + MCP ⏳ AGUARDANDO FASE 2+3b
- Abrir `./vault` no Obsidian, verificar grafo e navegação
- Configurar `mcp-obsidian` no cliente Claude:
  ```json
  {
    "mcpServers": {
      "agflow-vault": {
        "command": "npx",
        "args": ["-y", "mcp-obsidian", "C:\\caminho\\absoluto\\para\\agflow-qa-mapper\\vault"]
      }
    }
  }
  ```
- Teste end-to-end: abrir Claude Desktop, perguntar "Me gere um bug report para a tela de Solicitações de Crédito" → Claude usa MCP para ler a nota e retornar template preenchido

### Fase 5 — Scripts de interação por módulo ⏳ PLANEJADA
Decisão de 27/04/2026: scripts de interação servem duplo propósito — documentam endpoints de ações interativas (upload, submit de formulário, botões condicionais) E são a base para automação de testes futura.

Por módulo, criar `src/scripts/<slug-modulo>.ts` que:
- Navega até o módulo com storageState
- Executa a interação (preenche campos, faz upload, clica em submeter)
- Captura todos os endpoints chamados durante a interação
- Tira screenshots de cada estado intermediário
- Gera complemento da nota do vault: seção "Fluxo de interação" com endpoints e screenshots

Isso transforma os scripts em testes Playwright reutilizáveis com mínima adaptação.

### Fase 6 — Manutenção
- `npm run crawl` executável manualmente quando Marcos quiser refresh
- `npm run crawl` pode ser re-apontado para outros flows editando `CRAWL_START_URL` e `CRAWL_SCOPE` no `.env`
- (Opcional futuro) GitHub Action semanal que roda o crawler e abre PR com diffs do vault

## Convenções

- **Idioma:** comentários de código e documentação em **PT-BR** (contexto da empresa e do produto é todo em português). **Identificadores** (nomes de função, variáveis, arquivos, tipos) em **inglês** por padrão de engenharia.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`. Assunto ≤ 50 caracteres.
- **TypeScript:** `strict: true`, sem `any` exceto quando explicitamente justificado em comentário.
- **Nunca commitar:** `auth/storageState.json`, `.env`, credenciais de qualquer tipo, screenshots de dados sensíveis (clientes reais).
- **Screenshots:** fullPage, PNG, nome = slug da rota (ex: `pt-home.png`, `pt-flows-novo.png`).
- **Segurança:** ambiente-alvo é **dev** (`agrisk.dev`). Não crawlear prod sem decisão explícita.

### Convenção de captura de endpoints por ação

**Regra obrigatória para todos os scripts:** endpoints capturados devem ser separados por ação em pastas distintas dentro de `vault/endpoints/{phaseSlug}/`. Cada ação que gera chamadas de rede relevantes recebe sua própria pasta.

**Slugs de pasta padronizados:**

| Ação | Slug da pasta |
|------|--------------|
| Navegação inicial (page.goto) | `navegacao` |
| Preenchimento das Atividades da Etapa | `atividades-de-etapa` |
| Avanço de etapa (moveStep) | `avanco-de-etapa` |
| Parecer de crédito (preencher + concluir) | `parecer-de-credito` |
| Upload de documento | `upload-documento` |
| Qualquer outra ação interativa | `<slug-descritivo-da-acao>` |

**Como implementar a separação:**

Usar snapshots do `getRequests()` antes de cada nova ação, subtraindo o snapshot anterior para isolar os endpoints daquela ação:

```typescript
const getRequests = setupNetworkCapture(page);

// ... ação A ...
const snapshotA = getRequests();                          // endpoints da ação A

// ... ação B ...
const all = getRequests();
const snapshotB = all.slice(snapshotA.length);            // endpoints da ação B

// ... ação C ...
const all2 = getRequests();
const snapshotC = all2.slice(snapshotA.length + snapshotB.length); // endpoints da ação C
```

**Por quê:** a separação permite identificar exatamente qual endpoint é acionado por qual interação do usuário, tornando o vault útil para debug, documentação de API e geração de bug reports precisos. Scripts que misturarem endpoints de ações distintas em uma única pasta devem ser considerados incompletos.

## Decisões pendentes (resolver na primeira sessão Claude Code com Marcos)

1. **Credenciais do crawler:** usar conta pessoal do Marcos ou solicitar ao time uma conta de QA dedicada? Recomendação: conta dedicada, para não poluir o histórico real dele e para poder rotacionar sem impacto.
2. **Ambientes-alvo:** só `agrisk.dev`, ou também `staging`/`prod`? Prod em geral é risco — começar só com dev.
3. **Concorrência:** crawl serial ou paralelo? Recomendação: **serial no MVP** (mais simples, mais amigável ao backend de dev).
4. **Modais e abas:** considerar cada modal/aba como sub-rota? MVP trata como parte da rota pai; futuro pode granularizar.
5. **Rate limiting:** adicionar delay entre rotas (ex: 500ms) para não sobrecarregar dev?

## Primeiros passos ao abrir Claude Code neste diretório

Execute na ordem:

1. Ler `CLAUDE.md` inteiro (este arquivo)
2. Perguntar ao Marcos as 5 decisões pendentes acima
3. Executar **Fase 0** (setup) — criar arquivos de config, instalar deps
4. Executar **Fase 1** (login interativo) — Marcos precisa estar presente para digitar credenciais; aproveitar a sessão headed para descoberta de stack
5. Após login bem-sucedido, preencher `docs/stack-analysis.md` com tudo descoberto
6. Seguir roadmap: Fase 2 → 3 → 4

## Objetivo de interação desejado (quando tudo estiver pronto)

**Marcos:** "Bug na tela de criação de fluxo: o campo nome não valida obrigatoriedade e deixa salvar vazio, aparecendo erro 500 no console."

**Claude (com MCP vault ativo):**
1. `search_notes("criação de fluxo")` → localiza `vault/rotas/pt-flows-novo.md`
2. `read_note("vault/rotas/pt-flows-novo.md")` → extrai URL, endpoints, seletores
3. Retorna bug report estruturado pronto para Marcos colar no GitHub / Jira:
   - URL exata
   - Passo a passo com seletores
   - Endpoint que retornou 500
   - Evidência (link para screenshot no vault)
   - Hipóteses técnicas (validação frontend ausente, handler de erro faltando no front)

Isso transforma a escrita de bug report de ~15min em ~2min, com qualidade mais alta e informação técnica que normalmente um estagiário não documentaria.

---

**Sessão de origem:** Cowork 24/04/2026
**Autor do briefing:** Claude + Marcos
**Próxima revisão deste arquivo:** após Fase 1 concluída, atualizar seção de stack
