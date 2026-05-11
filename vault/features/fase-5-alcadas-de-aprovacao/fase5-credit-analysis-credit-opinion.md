---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/credit-analysis/credit-opinion"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/credit-analysis/credit-opinion"
fase: 5
fase_nome: "Alçadas de Aprovação"
modulo: "Análise de Crédito"
topico: "Parecer de crédito"
crawledAt: "2026-05-08T18:39:37.939Z"
tags: [agflow, feature, fase-5, credit-analysis]
---

# Análise de Crédito > Parecer de crédito

**Fase:** 5 — Alçadas de Aprovação
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/credit-analysis/credit-opinion`

![[fase5-credit-analysis-credit-opinion.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-opinion]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-clients]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-history]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-fields-phases-67bf114fb38591aeceff94fa]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-approval]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf6192c973ce220c45316-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-credit-engine]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-credit-engine]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-cash-flow-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-financial-report]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-credit-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-approves]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-cash-flow-consolidated]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-credit-opinion]]

## Elementos interativos

| Elemento | Seletor CSS | Locator Playwright | Tipo |
|----------|-------------|-------------------|------|
| a | `a` | `` | a |
| button | `button` | `` | button |
| Resumo geral | `a:has-text("Resumo geral")` | `page.getByRole('a', { name: 'Resumo geral' })` | a |
| AgRisk | `a:has-text("AgRisk")` | `page.getByRole('a', { name: 'AgRisk' })` | a |
| Análise de crédito | `a:has-text("Análise de crédito")` | `page.getByRole('a', { name: 'Análise de crédito' })` | a |
| Documentos | `a:has-text("Documentos")` | `page.getByRole('a', { name: 'Documentos' })` | a |
| button | `[aria-label="Etiquetas"]` | `page.getByRole('button', { name: 'Etiquetas' })` | button |
| button | `[aria-label="Excluir card"]` | `page.getByRole('button', { name: 'Excluir card' })` | button |
| button | `[data-testid="backStep"]` | `page.getByTestId('backStep')` | button |
| button | `[data-testid="moveStep"]` | `page.getByTestId('moveStep')` | button |
| button | `[aria-label="Adicionar cliente"]` | `page.getByRole('button', { name: 'Adicionar cliente' })` | button |
| input | `#_r_17_` | `page.locator('#_r_17_')` | text |
| button | `[aria-label="Open"]` | `page.getByRole('button', { name: 'Open' })` | button |
| Classificar cliente | `a:has-text("Classificar cliente")` | `page.getByRole('a', { name: 'Classificar cliente' })` | a |
| Painel de alertas | `a:has-text("Painel de alertas")` | `page.getByRole('a', { name: 'Painel de alertas' })` | a |
| Painel de alertas | `button:has-text("Painel de alertas")` | `page.getByRole('button', { name: 'Painel de alertas' })` | button |
| Fluxo de caixa | `a:has-text("Fluxo de caixa")` | `page.getByRole('a', { name: 'Fluxo de caixa' })` | a |
| Fluxo de caixa | `button:has-text("Fluxo de caixa")` | `page.getByRole('button', { name: 'Fluxo de caixa' })` | button |
| Motor de crédito | `a:has-text("Motor de crédito")` | `page.getByRole('a', { name: 'Motor de crédito' })` | a |
| Motor de crédito | `button:has-text("Motor de crédito")` | `page.getByRole('button', { name: 'Motor de crédito' })` | button |
| Balanço e DRE | `a:has-text("Balanço e DRE")` | `page.getByRole('a', { name: 'Balanço e DRE' })` | a |
| Balanço e DRE | `button:has-text("Balanço e DRE")` | `page.getByRole('button', { name: 'Balanço e DRE' })` | button |
| Parecer de crédito | `a:has-text("Parecer de crédito")` | `page.getByRole('a', { name: 'Parecer de crédito' })` | a |
| Parecer de crédito | `button:has-text("Parecer de crédito")` | `page.getByRole('button', { name: 'Parecer de crédito' })` | button |
| Aprovações de alçada | `a:has-text("Aprovações de alçada")` | `page.getByRole('a', { name: 'Aprovações de alçada' })` | a |
| Aprovações de alçada | `button:has-text("Aprovações de alçada")` | `page.getByRole('button', { name: 'Aprovações de alçada' })` | button |
| Editar parecer | `button:has-text("Editar parecer")` | `page.getByRole('button', { name: 'Editar parecer' })` | button |

## Observações de QA

-
