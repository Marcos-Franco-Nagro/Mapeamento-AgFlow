---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/summary/history"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/summary/history"
fase: 7
fase_nome: "Crédito Reprovado"
modulo: "Resumo Geral"
topico: "Histórico"
crawledAt: "2026-05-08T18:43:15.426Z"
tags: [agflow, feature, fase-7, summary]
---

# Resumo Geral > Histórico

**Fase:** 7 — Crédito Reprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/summary/history`

![[fase7-summary-history.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-phases-67bf11b6b38591aeceff969b-actions-opinion]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-fields-phases-67bf11b6b38591aeceff969b]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf7c72c973ce220c469c3-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-registration]]

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
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |

## Observações de QA

-
