---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/summary/overview"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/summary/overview"
fase: 6
fase_nome: "Crédito Aprovado"
modulo: "Resumo Geral"
topico: "Visão Geral"
crawledAt: "2026-05-08T18:39:54.091Z"
tags: [agflow, feature, fase-6, summary]
---

# Resumo Geral > Visão Geral

**Fase:** 6 — Crédito Aprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/summary/overview`

![[fase6-summary-overview.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-clients]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-phases-67bf118eb38591aeceff95aa-actions-opinion]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-fields-phases-67bf118eb38591aeceff95aa]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf72b2c973ce220c45ead-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-registration]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-credit-engine]]

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
| TRTeste Responsável | `button:has-text("TRTeste Responsável")` | `page.getByRole('button', { name: 'TRTeste Responsável' })` | button |
| Visão Geral | `a:has-text("Visão Geral")` | `page.getByRole('a', { name: 'Visão Geral' })` | a |
| Atividades da etapa | `a:has-text("Atividades da etapa")` | `page.getByRole('a', { name: 'Atividades da etapa' })` | a |
| Ficha cadastral | `a:has-text("Ficha cadastral")` | `page.getByRole('a', { name: 'Ficha cadastral' })` | a |
| Histórico | `a:has-text("Histórico")` | `page.getByRole('a', { name: 'Histórico' })` | a |
| a | `a` | `` | a |
| button | `button` | `` | button |
| a | `a` | `` | a |
| button | `button` | `` | button |
| input | `#_r_10_` | `page.locator('#_r_10_')` | text |
| button | `[aria-label="Open"]` | `page.getByRole('button', { name: 'Open' })` | button |
| Classificar cliente | `a:has-text("Classificar cliente")` | `page.getByRole('a', { name: 'Classificar cliente' })` | a |
| Registros | `button:has-text("Registros")` | `page.getByRole('tab', { name: 'Registros' })` | button |
| Comentários | `button:has-text("Comentários")` | `page.getByRole('tab', { name: 'Comentários' })` | button |
| Ver histórico completo | `a:has-text("Ver histórico completo")` | `page.getByRole('a', { name: 'Ver histórico completo' })` | a |
| Ver histórico completo | `a:has-text("Ver histórico completo")` | `page.getByRole('a', { name: 'Ver histórico completo' })` | a |

## Observações de QA

-
