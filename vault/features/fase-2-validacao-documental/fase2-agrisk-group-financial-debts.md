---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/agrisk/group/financial-debts"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/agrisk/group/financial-debts"
fase: 2
fase_nome: "Validação Documental"
modulo: "AgRisk"
topico: "Grupo > Endividamento Financeiro"
crawledAt: "2026-05-08T18:30:55.975Z"
tags: [agflow, feature, fase-2, agrisk]
---

# AgRisk > Grupo > Endividamento Financeiro

**Fase:** 2 — Validação Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/agrisk/group/financial-debts`

![[fase2-agrisk-group-financial-debts.png]]

## Endpoints consumidos

- [[GET-v1-agrisk-notifications]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-clients]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-history]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-fields-phases-67bf1048b38591aeceff8de6]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-financial-report]]
- [[GET-v1-agrisk-products]]
- [[GET-v1-group-69fdf5492c973ce220c44844-debt]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-members]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-restrictives]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-car]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-compliance]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-members]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-financial-debts]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-car]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-cpr]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-financial-debts]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-group-cpr]]

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
