---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/cash-flow/rural-properties"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/cash-flow/rural-properties"
fase: 4
fase_nome: "Análise de Crédito"
modulo: "Análise de Crédito"
topico: "Fluxo de caixa > Imóveis rurais"
crawledAt: "2026-05-08T18:36:32.012Z"
tags: [agflow, feature, fase-4, credit-analysis]
---

# Análise de Crédito > Fluxo de caixa > Imóveis rurais

**Fase:** 4 — Análise de Crédito
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/credit-analysis/cash-flow/rural-properties`

![[fase4-credit-analysis-cash-flow-rural-properties.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-phases-67bf10abb38591aeceff8f75-actions-opinion]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-clients]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-history]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-fields-phases-67bf10abb38591aeceff8f75]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf5782c973ce220c44940-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-v1-cash-flow-cards-69fdf5782c973ce220c44940-properties]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-analysis-credit-engine]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-engine]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-financial-report]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-cash-flow-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-credit-opinion]]
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
| Nova área | `button:has-text("Nova área")` | `page.getByRole('button', { name: 'Nova área' })` | button |
| Cadastrar produção | `button:has-text("Cadastrar produção")` | `page.getByRole('button', { name: 'Cadastrar produção' })` | button |
| Consolidado | `a:has-text("Consolidado")` | `page.getByRole('a', { name: 'Consolidado' })` | a |
| Produções | `a:has-text("Produções")` | `page.getByRole('a', { name: 'Produções' })` | a |
| Imóveis rurais | `a:has-text("Imóveis rurais")` | `page.getByRole('a', { name: 'Imóveis rurais' })` | a |
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

## Observações de QA

-
