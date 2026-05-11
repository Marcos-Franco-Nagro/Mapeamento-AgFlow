---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/group/cpr"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/group/cpr"
fase: 3
fase_nome: "Pendência Documental"
modulo: "AgRisk"
topico: "Grupo > CPRs"
crawledAt: "2026-05-08T18:33:48.805Z"
tags: [agflow, feature, fase-3, agrisk]
---

# AgRisk > Grupo > CPRs

**Fase:** 3 — Pendência Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/group/cpr`

![[fase3-agrisk-group-cpr.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-v1-group-69fe1d512c973ce220c49757-cpr]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-radar]]
- [[GET-v1-agrisk-products]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-members]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-members]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-restrictives]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-car]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-financial-debts]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-cpr]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-car]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-group-restrictives]]

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
| Consultar | `button:has-text("Consultar")` | `page.getByRole('button', { name: 'Consultar' })` | button |
| input | `input` | `` | input |
| Cadastro | `div:has-text("Cadastro")` | `page.getByRole('button', { name: 'Cadastro' })` | div |
| Integrantes | `a:has-text("Integrantes")` | `page.getByRole('a', { name: 'Integrantes' })` | a |
| Restrições | `div:has-text("Restrições")` | `page.getByRole('button', { name: 'Restrições' })` | div |
| Restrições | `a:has-text("Restrições")` | `page.getByRole('a', { name: 'Restrições' })` | a |
| Compliance | `a:has-text("Compliance")` | `page.getByRole('a', { name: 'Compliance' })` | a |
| Patrimônio | `div:has-text("Patrimônio")` | `page.getByRole('button', { name: 'Patrimônio' })` | div |
| Imóveis CAR | `a:has-text("Imóveis CAR")` | `page.getByRole('a', { name: 'Imóveis CAR' })` | a |
| Endividamento | `div:has-text("Endividamento")` | `page.getByRole('button', { name: 'Endividamento' })` | div |
| Endividamento Financeiro | `a:has-text("Endividamento Financeiro")` | `page.getByRole('a', { name: 'Endividamento Financeiro' })` | a |
| CPRs | `a:has-text("CPRs")` | `page.getByRole('a', { name: 'CPRs' })` | a |

## Observações de QA

-
