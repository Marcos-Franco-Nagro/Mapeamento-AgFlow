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

### Stack do frontend (identificada na Fase 1)

**Next.js App Router + Material-UI (MUI v5).** Cookie HTTP-only, SSE em `sse.agflow.agrisk.dev/events`. Detalhes completos em `docs/stack-analysis.md`.

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

### Fase 2+3b — Scripts de interação ✅ CONCLUÍDA (11/05/2026)

Todos os scripts de interação das 7 fases implementados e rodados com sucesso.

**Scripts por fase:**

| Fase | Atividades | Ação especial | Avanço |
|------|-----------|--------------|--------|
| 1 — Solicitações Recebidas | `navigate:activities:solicitacoes` | — | `navigate:advance:solicitacoes` |
| 2 — Validação Documental | `navigate:activities:validacao` | — | `navigate:advance:validacao` |
| 3 — Pendência Documental | `navigate:activities:pendencia` | — | `navigate:advance:pendencia` |
| 4 — Análise de Crédito | `navigate:activities:analise` | `navigate:parecer` | `navigate:advance:analise` |
| 5 — Alçadas de Aprovação | `navigate:activities:alcadas` | `navigate:alcada` | `navigate:advance:alcadas` |
| 6 — Crédito Aprovado | — | — | `navigate:advance:aprovado` |
| 7 — Crédito Reprovado | — | — | — (fase final) |

**Regra de ordem dos scripts por fase (IMPORTANTE):**
```
1. navigate:activities:{fase}   — preenche campos (sem avançar)
2. navigate:parecer             — preenche parecer (sem avançar) [apenas fase 4]
3. navigate:alcada              — realiza aprovação de alçada (sem avançar) [apenas fase 5]
4. navigate:advance:{fase}      — avança para próxima fase (SEMPRE POR ÚLTIMO)
```

**Motivo:** scripts que avançam de fase movem o card e impedem os scripts seguintes de encontrá-lo na fase original.

**Quirks descobertos durante implementação:**

- **data-cy com UUID:** alguns campos de upload têm UUID no atributo `data-cy` (ex: `input-documentos_pendentes_enviados_pelo_ctv_<uuid>`). Usar `^=` (starts-with) em vez de `=` (exact) e inspecionar o DOM antes de assumir o nome pelo label.
- **data-step-variant terminal:** fases 5 e 6 só têm botões `success`/`danger` no modal de avanço (sem `info`). O `advanceToNextPhase` já lida com isso: tenta `info` primeiro, cai para qualquer variant se não encontrar.
- **advance do Server Action:** o avanço de etapa usa um Next.js Server Action (`POST .../summary/stages` com `text/x-component`) além do `PATCH` direto à API. Ambos aparecem nos endpoints capturados.
- **waitForResponse no advance:** o `advance-index.ts` usa `page.waitForResponse` para garantir a captura do PATCH antes de ler o snapshot final.
- **Sessão expira rapidamente:** o token do AgFlow tem TTL curto. Rodar `npm run login` imediatamente antes de cada script de interação.

### Fase 2+3c — Scripts de funcionalidades adicionais ✅ CONCLUÍDA (15–18/05/2026)

Scripts além dos 7 de fase, cobrindo módulos e ações transversais:

| Script npm | O que documenta |
|-----------|----------------|
| `navigate:nova-solicitacao` | Modal de nova solicitação de crédito |
| `navigate:startform` | Formulário de start de flow |
| `navigate:radar` | Módulo Radar (análise de crédito) |
| `navigate:balanco:extrair` | Submodulo Balanço — extração de dados |
| `navigate:balanco:revisar` | Submodulo Balanço — revisão de dados |
| `navigate:documentos` | Módulo Documentos (visualizar/gerenciar) |
| `navigate:criar-documento` | Criar documento a partir de template |
| `navigate:motor-credito` | Motor de crédito (políticas e aprovação) |
| `navigate:cashflow:nova-area` | Submodulo Cash Flow — nova área rural |
| `navigate:cashflow:cadastrar-producao` | Submodulo Cash Flow — cadastrar produção |
| `navigate:filtro:simples` | Filtro com 1 condição no board |
| `navigate:filtro:duplo` | Filtro com 2 condições no board |
| `navigate:filtro:multi-grupo` | Filtro com 2 grupos (operador OU) |
| `navigate:adicionar-colunas` | Adicionar colunas na visão tabela do board |
| `navigate:etiquetas` | Adicionar e remover etiqueta em um card |
| `navigate:excluir-card` | Excluir card via botão + modal de confirmação |
| `navigate:comentario` | Adicionar comentário ao card |
| `navigate:ficha-cadastral` | Editar ficha cadastral (dropdown Filial + salvar) |

**Quirks adicionais descobertos nesta fase:**

- **MUI Chips sem role="button":** chips de etiqueta são `div.MuiChip-root` sem role — `getByRole('button')` não os encontra. Usar `[data-testid="addButton"][data-is-current="false/true"]` para chips disponíveis/aplicados.
- **Botão etiqueta:** `button[aria-label="Etiquetas"]` no header do card.
- **Popup de etiqueta é MuiMenu-root (Modal):** tem backdrop invisível que intercepta cliques fora do popup. Não tentar clicar em elementos da página enquanto o popup está aberto.
- **Pasta table/ (não board/):** scripts de visão tabela do board usam `vault/endpoints/table/` e `vault/screenshots/table/` — o board em si é a view kanban, table é a view tabular.
- **Excluir card — CARD_URL descartável:** o script `navigate:excluir-card` deleta o card permanentemente. Atualizar a constante `CARD_URL` em `excluir-card-index.ts` com um card descartável antes de cada execução. Botão: `button[aria-label="Excluir card"]`; confirmação: `getByRole('button', { name: /Sim, excluir/i })`.
- **Aba Comentários:** seletor `getByRole('tab', { name: 'Comentários' })`; textarea via `getByPlaceholder('Escreva aqui...')`; publicar via `getByRole('button', { name: 'Publicar' })`.
- **MUI Select (Ficha cadastral):** usa `role="combobox"` (não `role="button"`). Após clicar, aguardar `ul[role="listbox"]` e clicar em `li[role="option"]`.

**Script de enriquecimento:**
```
npm run enrich:swagger
```
Baixa a spec do Swagger de `api.agflow.agrisk.dev` e adiciona seção `## Swagger` nos arquivos `.md` de endpoints que batem com a spec. Rodar após cada novo script de navegação.

### Fase 4 — Integração Obsidian + MCP ⏳ PRÓXIMA
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

### Fase 5 — Manutenção contínua
- `npm run crawl` executável manualmente quando Marcos quiser refresh do vault
- `npm run enrich:swagger` após cada novo script para enriquecer endpoints com dados do Swagger
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

## Ao abrir uma nova sessão Claude Code neste diretório

1. Ler `CLAUDE.md` inteiro (este arquivo)
2. Rodar `npm run login` — sessão expira rápido, sempre renovar antes de qualquer script
3. Conferir qual script ou funcionalidade será trabalhada e criar branch com data no nome (ex: `18/05/2026-nome-feature`)
4. Após rodar um novo script, executar `npm run enrich:swagger`
5. Commitar + abrir PR

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
