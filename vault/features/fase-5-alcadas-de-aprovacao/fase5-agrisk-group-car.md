---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/group/car"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/group/car"
fase: 5
fase_nome: "Alçadas de Aprovação"
modulo: "AgRisk"
topico: "Grupo > Imóveis CAR"
crawledAt: "2026-05-08T18:38:49.023Z"
tags: [agflow, feature, fase-5, agrisk]
---

# AgRisk > Grupo > Imóveis CAR

**Fase:** 5 — Alçadas de Aprovação
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/group/car`

![[fase5-agrisk-group-car.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-opinion]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-approval]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-history]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-fields-phases-67bf114fb38591aeceff94fa]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf6192c973ce220c45316-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-v1-group-69fdf6192c973ce220c45316-car]]
- [[GET-v1-agrisk-products]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]

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
