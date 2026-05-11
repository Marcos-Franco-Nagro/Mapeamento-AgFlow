---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/agrisk/cash-flow?clientId=69c18b48bc333a6ce8784a5c"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/agrisk/cash-flow"
fase: 4
fase_nome: "Análise de Crédito"
modulo: "AgRisk"
topico: "Financeiro"
crawledAt: "2026-05-08T18:34:55.707Z"
tags: [agflow, feature, fase-4, agrisk]
---

# AgRisk > Financeiro

**Fase:** 4 — Análise de Crédito
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/agrisk/cash-flow?clientId=69c18b48bc333a6ce8784a5c`

![[fase4-agrisk-cash-flow.png]]

## Endpoints consumidos

- [[GET-v1-agrisk-notifications]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-clients]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-phases-67bf10abb38591aeceff8f75-actions-opinion]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-history]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-fields-phases-67bf10abb38591aeceff8f75]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf5782c973ce220c44940-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-stages]]
- [[GET-v1-agrisk-products]]
- [[GET-v1-agrisk-debt-69c18b48bc333a6ce8784a5c]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-sintegra]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-economic-group]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-sintegra]]
- [[GET-v1-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-economic-group]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-judicial]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-cash-flow]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-compliance]]

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
| Cadastro | `a:has-text("Cadastro")` | `page.getByRole('a', { name: 'Cadastro' })` | a |
| Consulta | `div:has-text("Consulta")` | `page.getByRole('button', { name: 'Consulta' })` | div |
| Sintegra | `a:has-text("Sintegra")` | `page.getByRole('a', { name: 'Sintegra' })` | a |
| Grupos | `a:has-text("Grupos")` | `page.getByRole('a', { name: 'Grupos' })` | a |
| Restrições | `div:has-text("Restrições")` | `page.getByRole('button', { name: 'Restrições' })` | div |
| Restritivos | `a:has-text("Restritivos")` | `page.getByRole('a', { name: 'Restritivos' })` | a |
| Compliance | `a:has-text("Compliance")` | `page.getByRole('a', { name: 'Compliance' })` | a |
| Judicial | `a:has-text("Judicial")` | `page.getByRole('a', { name: 'Judicial' })` | a |
| Endividamento | `div:has-text("Endividamento")` | `page.getByRole('button', { name: 'Endividamento' })` | div |
| Financeiro | `a:has-text("Financeiro")` | `page.getByRole('a', { name: 'Financeiro' })` | a |
| CPRs | `a:has-text("CPRs")` | `page.getByRole('a', { name: 'CPRs' })` | a |
| Patrimônio | `div:has-text("Patrimônio")` | `page.getByRole('button', { name: 'Patrimônio' })` | div |
| Patrimônio Veicular | `a:has-text("Patrimônio Veicular")` | `page.getByRole('a', { name: 'Patrimônio Veicular' })` | a |
| Armazéns | `a:has-text("Armazéns")` | `page.getByRole('a', { name: 'Armazéns' })` | a |
| Imóveis rurais | `a:has-text("Imóveis rurais")` | `page.getByRole('a', { name: 'Imóveis rurais' })` | a |
| Autorização | `button:has-text("Autorização")` | `page.getByRole('button', { name: 'Autorização' })` | button |
| Abrir no AgRisk | `a:has-text("Abrir no AgRisk")` | `page.getByRole('a', { name: 'Abrir no AgRisk' })` | a |

## Observações de QA

-
