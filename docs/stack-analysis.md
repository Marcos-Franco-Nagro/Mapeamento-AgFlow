# Análise da stack do AgFlow

> Preencher durante a **Fase 1** (sessão headed de login) do roadmap.

## Framework (React / Angular / Vue / outro)

**Resultado:**

- [x] React (Next.js / App Router) — versão: Indeterminada (Detectado pelo uso da biblioteca Material-UI nas classes do DOM e requisições RSC `?_rsc=` no Network).
- [ ] Angular — versão:
- [ ] Vue — versão:
- [ ] Svelte
- [ ] Outro:

## Roteamento

- [x] History API (URLs limpas `/pt/home`)
- [ ] Hash router (`/#/home`)
- [x] Server-side rendering (React Server Components)

Observação: Utiliza rotas internacionalizadas (i18n) como `/pt/`.

## Seletores estáveis disponíveis

Inspecionar um botão do card "Flows" (ex: "Solicitação de Crédito | Balcão"). Existe:

- [ ] `data-testid=`
- [ ] `data-test=`
- [ ] `id=` semântico
- [ ] `aria-label=`
- [x] Apenas classes geradas (Tailwind, CSS-in-JS) — **ruim** para crawler, avaliar estratégia de fallback

**Estratégia recomendada para o Claude/Playwright:** Como a interface usa Material-UI com classes dinâmicas, a automação deve priorizar locators baseados em texto e acessibilidade, como `page.getByRole()` e `page.getByText()`, evitando depender de classes CSS ou estrutura hierárquica rígida.

## Versão do frontend

Visível no rodapé do sidebar: `v2.313.0`

## Padrões de chamada de rede

Na aba Network, filtrar por XHR/Fetch e observar:

- **Base da API:** Mesmo domínio da aplicação (`https://agflow.agrisk.dev`). Aparentemente utiliza o backend integrado do Next.js (BFF).
- **Autenticação em requests:** Provavelmente baseada em Cookies (HTTP-only) gerenciados pelo Next.js, já que as chamadas de navegação não expõem um `Authorization: Bearer` explícito nos cabeçalhos.
- **Content-Type:** `text/x-component` (Identificado nas transições de tela do Next.js).
- **Padrão de URL:** Padrão de rotas do Next.js App Router, utilizando parâmetros dinâmicos nas URLs e a query `?_rsc=` para buscar os React Server Components.

Exemplos de endpoints vistos ao carregar `/pt/home` e navegar:

- `https://agflow.agrisk.dev/pt/flow/[ID]/board?_rsc=ngiky` (Busca do Server Component do board)
- `https://agflow.agrisk.dev/events` (Possível endpoint de analytics ou server-sent events)
- `https://agflow.agrisk.dev/notifications` (Endpoint para buscar notificações do usuário)

## Observações gerais

- O console apresenta avisos do Intercom ("App ID has not been set"), indicando que o widget de chat não está inicializando. Isso é positivo para o Playwright, pois evita que o iframe do chat sobreponha elementos clicáveis durante a automação.
- Existem erros não tratados no `vendor.js` (`No Listener: tabs:outgoing.message.ready`), que são ruídos inofensivos de mensageria e não impactam a automação.