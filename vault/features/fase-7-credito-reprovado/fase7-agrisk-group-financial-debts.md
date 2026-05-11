---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/agrisk/group/financial-debts"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/agrisk/group/financial-debts"
fase: 7
fase_nome: "Crédito Reprovado"
modulo: "AgRisk"
topico: "Grupo > Endividamento Financeiro"
crawledAt: "2026-05-08T18:44:53.203Z"
tags: [agflow, feature, fase-7, agrisk]
---

# AgRisk > Grupo > Endividamento Financeiro

**Fase:** 7 — Crédito Reprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/agrisk/group/financial-debts`

![[fase7-agrisk-group-financial-debts.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-phases-67bf11b6b38591aeceff969b-actions-opinion]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-clients]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-history]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-fields-phases-67bf11b6b38591aeceff969b]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf7c72c973ce220c469c3-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-group-69fdf7c72c973ce220c469c3-debt]]
- [[GET-v1-agrisk-products]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-members]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-car]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-compliance]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-members]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-financial-debts]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-car]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-group-cpr]]

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
