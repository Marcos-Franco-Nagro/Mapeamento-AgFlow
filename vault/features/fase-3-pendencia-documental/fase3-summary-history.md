---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/summary/history"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/summary/history"
fase: 3
fase_nome: "Pendência Documental"
modulo: "Resumo Geral"
topico: "Histórico"
crawledAt: "2026-05-08T18:31:57.506Z"
tags: [agflow, feature, fase-3, summary]
---

# Resumo Geral > Histórico

**Fase:** 3 — Pendência Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/summary/history`

![[fase3-summary-history.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-fields-phases-67bf1082b38591aeceff8ee3]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-registration]]

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
