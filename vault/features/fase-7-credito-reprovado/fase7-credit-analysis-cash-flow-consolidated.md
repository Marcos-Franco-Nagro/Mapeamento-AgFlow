---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/credit-analysis/cash-flow/consolidated"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/credit-analysis/cash-flow/consolidated"
fase: 7
fase_nome: "Crédito Reprovado"
modulo: "Análise de Crédito"
topico: "Fluxo de caixa > Consolidado"
crawledAt: "2026-05-08T18:52:18.620Z"
tags: [agflow, feature, fase-7, credit-analysis]
---

# Análise de Crédito > Fluxo de caixa > Consolidado

**Fase:** 7 — Crédito Reprovado
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf7c72c973ce220c469c3/credit-analysis/cash-flow/consolidated`

![[fase7-credit-analysis-cash-flow-consolidated.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-clients]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-phases-67bf11b6b38591aeceff969b-actions-opinion]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-summary-overview]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf7c72c973ce220c469c3-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-credit-analysis-credit-engine]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-radar]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-financial-report]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-credit-engine]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-cash-flow-consolidated]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf7c72c973ce220c469c3-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-credit-opinion]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf7c72c973ce220c469c3-credit-analysis-cash-flow-productions]]

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

## Observações de QA

-
