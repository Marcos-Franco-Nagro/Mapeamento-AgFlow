---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/history"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/history"
fase: 4
fase_nome: "Análise de Crédito"
modulo: "Resumo Geral"
topico: "Histórico"
crawledAt: "2026-05-08T18:34:16.161Z"
tags: [agflow, feature, fase-4, summary]
---

# Resumo Geral > Histórico

**Fase:** 4 — Análise de Crédito
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/history`

![[fase4-summary-history.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-phases-67bf10abb38591aeceff8f75-actions-opinion]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-clients]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf5782c973ce220c44940-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-stages]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]

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
