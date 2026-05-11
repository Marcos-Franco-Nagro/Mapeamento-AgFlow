---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/compliance?clientId=69c18b48bc333a6ce8784a5c"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/compliance"
fase: 5
fase_nome: "Alçadas de Aprovação"
modulo: "AgRisk"
topico: "Compliance"
crawledAt: "2026-05-08T18:37:42.999Z"
tags: [agflow, feature, fase-5, agrisk]
---

# AgRisk > Compliance

**Fase:** 5 — Alçadas de Aprovação
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf6192c973ce220c45316/agrisk/compliance?clientId=69c18b48bc333a6ce8784a5c`

![[fase5-agrisk-compliance.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-opinion]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-clients]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-fields-phases-67bf114fb38591aeceff94fa]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-history]]
- [[GET-v1-agrisk-notifications]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf6192c973ce220c45316-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-register]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-phases-67bf114fb38591aeceff94fa-actions-approval]]
- [[GET-v1-agrisk-products]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-sintegra]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-documents]]
- [[GET-v1-agrisk-compliance-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf6192c973ce220c45316-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-restrictives]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-economic-group]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-compliance]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-sintegra]]
- [[GET-v1-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-judicial]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-economic-group]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-restrictives]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-compliance]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf6192c973ce220c45316-agrisk-cash-flow]]

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
| AmbientalApontamentos: 0 | `button:has-text("AmbientalApontamentos: 0")` | `page.getByRole('button', { name: 'AmbientalApontamentos: 0' })` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| TrabalhistaApontamentos: 0 | `button:has-text("TrabalhistaApontamentos: 0")` | `page.getByRole('button', { name: 'TrabalhistaApontamentos: 0' })` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| CriminalApontamentos: 2 | `button:has-text("CriminalApontamentos: 2")` | `page.getByRole('button', { name: 'CriminalApontamentos: 2' })` | button |
| button | `button` | `` | button |
| FiscalNegativas: 13Positivas: 0Insuficiência: 0Indisponíveis: 0 | `button:has-text("FiscalNegativas: 13Positivas: 0Insuficiê")` | `page.getByRole('button', { name: 'FiscalNegativas: 13Positivas: 0Insuficiê' })` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| PEPApontamentos: 0 | `button:has-text("PEPApontamentos: 0")` | `page.getByRole('button', { name: 'PEPApontamentos: 0' })` | button |
| Check BiomaApontamentos: 0 | `button:has-text("Check BiomaApontamentos: 0")` | `page.getByRole('button', { name: 'Check BiomaApontamentos: 0' })` | button |

## Observações de QA

-
