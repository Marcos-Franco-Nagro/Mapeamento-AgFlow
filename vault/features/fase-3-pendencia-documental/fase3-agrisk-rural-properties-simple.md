---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/rural-properties/simple"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/rural-properties/simple"
fase: 3
fase_nome: "Pendência Documental"
modulo: "AgRisk"
topico: "Imóveis Rurais > Simples"
crawledAt: "2026-05-08T18:50:21.715Z"
tags: [agflow, feature, fase-3, agrisk]
---

# AgRisk > Imóveis Rurais > Simples

**Fase:** 3 — Pendência Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fe1d512c973ce220c49757/agrisk/rural-properties/simple`

![[fase3-agrisk-rural-properties-simple.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-v1-cards-69fe1d512c973ce220c49757-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-agrisk-products]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-radar]]
- [[GET-v1-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-rural-properties-car]]
- [[GET-v1-agrisk-rural-properties-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-credit-analysis-financial-report]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-sintegra]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-economic-group]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-restrictives]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-compliance]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-sintegra]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-economic-group]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fe1d512c973ce220c49757-agrisk-compliance]]

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
| CAR | `a:has-text("CAR")` | `page.getByRole('a', { name: 'CAR' })` | a |
| Simples | `a:has-text("Simples")` | `page.getByRole('a', { name: 'Simples' })` | a |

## Observações de QA

-
