---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/documents"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/documents"
fase: 1
fase_nome: "Solicitações Recebidas"
modulo: "Documentos"
topico: "Documentos"
crawledAt: "2026-05-08T18:28:56.838Z"
tags: [agflow, feature, fase-1, documents]
---

# Documentos > Documentos

**Fase:** 1 — Solicitações Recebidas
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/documents`

![[fase1-documents.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-clients]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-history]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-fields-phases-67bf0e91b38591aeceff84a8]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-financial-report]]
- [[GET-v1-documents-cards-69fdf5312c973ce220c447e7-created]]
- [[GET-v1-documents-cards-69fdf5312c973ce220c447e7]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-templates]]

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
| Novo documento | `button:has-text("Novo documento")` | `page.getByRole('button', { name: 'Novo documento' })` | button |
| button | `[aria-label="Adicionar cliente"]` | `page.getByRole('button', { name: 'Adicionar cliente' })` | button |
| input | `#_R_akqavqbtaipfiv5ubtabsnlldb_` | `page.locator('#_R_akqavqbtaipfiv5ubtabsnlldb_')` | text |
| Marcos Franco Oliveira Junior | `button:has-text("Marcos Franco Oliveira Junior")` | `page.getByRole('button', { name: 'Marcos Franco Oliveira Junior' })` | button |
| Maria Julia Gasparelli13 | `button:has-text("Maria Julia Gasparelli13")` | `page.getByRole('button', { name: 'Maria Julia Gasparelli13' })` | button |
| Documentos Gerais | `button:has-text("Documentos Gerais")` | `page.getByRole('button', { name: 'Documentos Gerais' })` | button |
| Imagens | `button:has-text("Imagens")` | `page.getByRole('button', { name: 'Imagens' })` | button |
| Documentos Criados | `button:has-text("Documentos Criados")` | `page.getByRole('button', { name: 'Documentos Criados' })` | button |

## Observações de QA

-
