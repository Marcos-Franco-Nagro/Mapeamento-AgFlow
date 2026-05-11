---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/financial-report"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/financial-report"
fase: 4
fase_nome: "Análise de Crédito"
modulo: "Análise de Crédito"
topico: "Balanço e DRE"
crawledAt: "2026-05-08T18:36:42.317Z"
tags: [agflow, feature, fase-4, credit-analysis]
---

# Análise de Crédito > Balanço e DRE

**Fase:** 4 — Análise de Crédito
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/financial-report`

![[fase4-credit-analysis-financial-report.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-phases-67bf10abb38591aeceff8f75-actions-opinion]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-fields-phases-67bf10abb38591aeceff8f75]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf5782c973ce220c44940-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-financial-reports-clients-69c18b48bc333a6ce8784a5c-consolidated]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-engine]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-cash-flow-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-engine]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-cash-flow-consolidated]]

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
| button | `[aria-label="Adicionar cliente"]` | `page.getByRole('button', { name: 'Adicionar cliente' })` | button |
| input | `#_r_19_` | `page.locator('#_r_19_')` | text |
| button | `[aria-label="Open"]` | `page.getByRole('button', { name: 'Open' })` | button |
| Classificar cliente | `a:has-text("Classificar cliente")` | `page.getByRole('a', { name: 'Classificar cliente' })` | a |
| Gerar análise | `a:has-text("Gerar análise")` | `page.getByRole('a', { name: 'Gerar análise' })` | a |
| Painel de alertas | `a:has-text("Painel de alertas")` | `page.getByRole('a', { name: 'Painel de alertas' })` | a |
| Painel de alertas | `button:has-text("Painel de alertas")` | `page.getByRole('button', { name: 'Painel de alertas' })` | button |
| Fluxo de caixa | `a:has-text("Fluxo de caixa")` | `page.getByRole('a', { name: 'Fluxo de caixa' })` | a |
| Fluxo de caixa | `button:has-text("Fluxo de caixa")` | `page.getByRole('button', { name: 'Fluxo de caixa' })` | button |
| Motor de crédito | `a:has-text("Motor de crédito")` | `page.getByRole('a', { name: 'Motor de crédito' })` | a |
| Motor de crédito | `button:has-text("Motor de crédito")` | `page.getByRole('button', { name: 'Motor de crédito' })` | button |
| Balanço e DRE | `a:has-text("Balanço e DRE")` | `page.getByRole('a', { name: 'Balanço e DRE' })` | a |
| Balanço e DRE | `button:has-text("Balanço e DRE")` | `page.getByRole('button', { name: 'Balanço e DRE' })` | button |
| Parecer de crédito | `a:has-text("Parecer de crédito")` | `page.getByRole('a', { name: 'Parecer de crédito' })` | a |
| Parecer de crédito | `button:has-text("Parecer de crédito")` | `page.getByRole('button', { name: 'Parecer de crédito' })` | button |
| Aprovações de alçada | `[aria-label="Esta operação não foi submetida a alçada de aprovação"]` | `page.getByRole('a', { name: 'Esta operação não foi submetida a alçada de aprovação' })` | a |
| Aprovações de alçada | `button:has-text("Aprovações de alçada")` | `page.getByRole('button', { name: 'Aprovações de alçada' })` | button |
| Visão Geral | `button:has-text("Visão Geral")` | `page.getByRole('tab', { name: 'Visão Geral' })` | button |
| 2024 | `button:has-text("2024")` | `page.getByRole('tab', { name: '2024' })` | button |
| button | `button` | `` | button |
| 2023 | `button:has-text("2023")` | `page.getByRole('tab', { name: '2023' })` | button |
| button | `button` | `` | button |
| 2020 | `button:has-text("2020")` | `page.getByRole('tab', { name: '2020' })` | button |
| button | `button` | `` | button |
| 2019 | `button:has-text("2019")` | `page.getByRole('tab', { name: '2019' })` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| input | `input` | `` | input |
| Extrair balanço e DRE | `button:has-text("Extrair balanço e DRE")` | `page.getByRole('button', { name: 'Extrair balanço e DRE' })` | button |
| Atualizar análise | `button:has-text("Atualizar análise")` | `page.getByRole('button', { name: 'Atualizar análise' })` | button |

## Observações de QA

-
