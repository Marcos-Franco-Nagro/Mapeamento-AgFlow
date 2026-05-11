---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/agrisk/judicial"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/agrisk/judicial"
fase: 1
fase_nome: "Solicitações Recebidas"
modulo: "AgRisk"
topico: "Judicial"
crawledAt: "2026-05-08T18:49:22.516Z"
tags: [agflow, feature, fase-1, agrisk]
---

# AgRisk > Judicial

**Fase:** 1 — Solicitações Recebidas
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/agrisk/judicial`

![[fase1-agrisk-judicial.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-clients]]
- [[GET-v1-agrisk-notifications]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-radar]]
- [[GET-v1-agrisk-products]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-sintegra]]
- [[GET-v1-agrisk-lawsuit-69c18b48bc333a6ce8784a5c]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-financial-report]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-economic-group]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-sintegra]]
- [[GET-v1-agrisk-lawsuit-69c18b48bc333a6ce8784a5c-filters]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-compliance]]
- [[GET-v1-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-economic-group]]

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
| input | `#_r_d_` | `page.locator('#_r_d_')` | text |
| input | `input` | `` | input |
| Filtro | `button:has-text("Filtro")` | `page.getByRole('button', { name: 'Filtro' })` | button |
| input | `input` | `` | checkbox |

## Observações de QA

-
