---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/documents"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/documents"
fase: 3
fase_nome: "Pendência Documental"
modulo: "Documentos"
topico: "Documentos"
crawledAt: "2026-05-08T18:33:54.195Z"
tags: [agflow, feature, fase-3, documents]
---

# Documentos > Documentos

**Fase:** 3 — Pendência Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/documents`

![[fase3-documents.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-clients]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-fields-phases-67bf1082b38591aeceff8ee3]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-radar]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-history]]
- [[GET-v1-documents-cards-69fe1d512c973ce220c49757-created]]
- [[GET-v1-documents-cards-69fe1d512c973ce220c49757]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-templates]]

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
