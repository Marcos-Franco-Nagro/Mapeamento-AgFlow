---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/agrisk/registration?clientId=69c18b48bc333a6ce8784a5c"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/agrisk/registration"
fase: 6
fase_nome: "Crédito Aprovado"
modulo: "AgRisk"
topico: "Cadastro"
crawledAt: "2026-05-08T18:40:13.914Z"
tags: [agflow, feature, fase-6, agrisk]
---

# AgRisk > Cadastro

**Fase:** 6 — Crédito Aprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf72b2c973ce220c45ead/agrisk/registration?clientId=69c18b48bc333a6ce8784a5c`

![[fase6-agrisk-registration.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-fields-phases-67bf118eb38591aeceff95aa]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-phases-67bf118eb38591aeceff95aa-actions-opinion]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf72b2c973ce220c45ead-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-credit-analysis-credit-engine]]
- [[GET-v1-agrisk-products]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-sintegra]]
- [[GET-v1-cards-69fdf72b2c973ce220c45ead-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-sintegra]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-economic-group]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-restrictives]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-judicial]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-cash-flow]]
- [[GET-v1-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-compliance]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-economic-group]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf72b2c973ce220c45ead-agrisk-restrictives]]

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
| Abrir no AgRisk | `a:has-text("Abrir no AgRisk")` | `page.getByRole('a', { name: 'Abrir no AgRisk' })` | a |
| Endereços3 | `button:has-text("Endereços3")` | `page.getByRole('tab', { name: 'Endereços3' })` | button |
| Telefones0 | `button:has-text("Telefones0")` | `page.getByRole('tab', { name: 'Telefones0' })` | button |
| Emails0 | `button:has-text("Emails0")` | `page.getByRole('tab', { name: 'Emails0' })` | button |

## Observações de QA

-
