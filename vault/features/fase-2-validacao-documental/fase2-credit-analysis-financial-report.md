---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/credit-analysis/financial-report"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/credit-analysis/financial-report"
fase: 2
fase_nome: "Validação Documental"
modulo: "Análise de Crédito"
topico: "Balanço e DRE"
crawledAt: "2026-05-08T18:31:31.611Z"
tags: [agflow, feature, fase-2, credit-analysis]
---

# Análise de Crédito > Balanço e DRE

**Fase:** 2 — Validação Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/credit-analysis/financial-report`

![[fase2-credit-analysis-financial-report.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-clients]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-fields-phases-67bf1048b38591aeceff8de6]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-financial-report]]
- [[GET-v1-financial-reports-clients-69c18b48bc333a6ce8784a5c-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-cash-flow-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-cash-flow-consolidated]]

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
| Painel de alertas | `[aria-label="O painel de alertas não está disponível. Aguarde até a operação avançar para a fase correta"]` | `page.getByRole('a', { name: 'O painel de alertas não está disponível. Aguarde até a operação avançar para a fase correta' })` | a |
| Painel de alertas | `button:has-text("Painel de alertas")` | `page.getByRole('button', { name: 'Painel de alertas' })` | button |
| Fluxo de caixa | `a:has-text("Fluxo de caixa")` | `page.getByRole('a', { name: 'Fluxo de caixa' })` | a |
| Fluxo de caixa | `button:has-text("Fluxo de caixa")` | `page.getByRole('button', { name: 'Fluxo de caixa' })` | button |
| Motor de crédito | `[aria-label="O motor de crédito não está disponível. Aguarde até a operação avançar para a fase correta"]` | `page.getByRole('a', { name: 'O motor de crédito não está disponível. Aguarde até a operação avançar para a fase correta' })` | a |
| Motor de crédito | `button:has-text("Motor de crédito")` | `page.getByRole('button', { name: 'Motor de crédito' })` | button |
| Balanço e DRE | `a:has-text("Balanço e DRE")` | `page.getByRole('a', { name: 'Balanço e DRE' })` | a |
| Balanço e DRE | `button:has-text("Balanço e DRE")` | `page.getByRole('button', { name: 'Balanço e DRE' })` | button |
| Parecer de crédito | `[aria-label="O parecer de crédito não está disponível. Aguarde até a operação avançar para a fase correta"]` | `page.getByRole('a', { name: 'O parecer de crédito não está disponível. Aguarde até a operação avançar para a fase correta' })` | a |
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
