---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/documents"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/documents"
fase: 6
fase_nome: "Crédito Aprovado"
modulo: "Documentos"
topico: "Documentos"
crawledAt: "2026-05-08T18:42:53.991Z"
tags: [agflow, feature, fase-6, documents]
---

# Documentos > Documentos

**Fase:** 6 — Crédito Aprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/documents`

![[fase6-documents.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-clients]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-phases-67bf118eb38591aeceff95aa-actions-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-history]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-fields-phases-67bf118eb38591aeceff95aa]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf72b2c973ce220c45ead-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-registration]]
- [[GET-v1-documents-cards-69fdf72b2c973ce220c45ead-created]]
- [[GET-v1-documents-cards-69fdf72b2c973ce220c45ead]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-templates]]

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
