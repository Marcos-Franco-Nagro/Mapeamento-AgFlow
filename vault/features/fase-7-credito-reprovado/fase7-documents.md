---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/documents"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/documents"
fase: 7
fase_nome: "Crédito Reprovado"
modulo: "Documentos"
topico: "Documentos"
crawledAt: "2026-05-08T18:45:50.070Z"
tags: [agflow, feature, fase-7, documents]
---

# Documentos > Documentos

**Fase:** 7 — Crédito Reprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/documents`

![[fase7-documents.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-clients]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-phases-67bf11b6b38591aeceff969b-actions-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-fields-phases-67bf11b6b38591aeceff969b]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-stages]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf7c72c973ce220c469c3-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-documents-cards-69fdf7c72c973ce220c469c3-created]]
- [[GET-v1-documents-cards-69fdf7c72c973ce220c469c3]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-templates]]

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
