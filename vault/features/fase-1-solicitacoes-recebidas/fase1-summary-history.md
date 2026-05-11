---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/summary/history"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/summary/history"
fase: 1
fase_nome: "Solicitações Recebidas"
modulo: "Resumo Geral"
topico: "Histórico"
crawledAt: "2026-05-08T18:26:45.857Z"
tags: [agflow, feature, fase-1, summary]
---

# Resumo Geral > Histórico

**Fase:** 1 — Solicitações Recebidas
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/summary/history`

![[fase1-summary-history.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-history]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-fields-phases-67bf0e91b38591aeceff84a8]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-registration]]

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
| button | `[data-testid="moveStep"]` | `page.getByTestId('moveStep')` | button |
| button | `[aria-label="Adicionar cliente"]` | `page.getByRole('button', { name: 'Adicionar cliente' })` | button |
| adicionar responsável | `button:has-text("adicionar responsável")` | `page.getByRole('button', { name: 'adicionar responsável' })` | button |
| Visão Geral | `a:has-text("Visão Geral")` | `page.getByRole('a', { name: 'Visão Geral' })` | a |
| Atividades da etapa | `a:has-text("Atividades da etapa")` | `page.getByRole('a', { name: 'Atividades da etapa' })` | a |
| Ficha cadastral | `a:has-text("Ficha cadastral")` | `page.getByRole('a', { name: 'Ficha cadastral' })` | a |
| Histórico | `a:has-text("Histórico")` | `page.getByRole('a', { name: 'Histórico' })` | a |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |

## Observações de QA

-
