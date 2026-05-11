---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/credit-analysis/cash-flow/rural-properties"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/credit-analysis/cash-flow/rural-properties"
fase: 1
fase_nome: "Solicitações Recebidas"
modulo: "Análise de Crédito"
topico: "Fluxo de caixa > Imóveis rurais"
crawledAt: "2026-05-08T18:28:46.932Z"
tags: [agflow, feature, fase-1, credit-analysis]
---

# Análise de Crédito > Fluxo de caixa > Imóveis rurais

**Fase:** 1 — Solicitações Recebidas
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5312c973ce220c447e7/credit-analysis/cash-flow/rural-properties`

![[fase1-credit-analysis-cash-flow-rural-properties.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-history]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-fields-phases-67bf0e91b38591aeceff84a8]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-v1-cards-69fdf5312c973ce220c447e7-clients]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-summary-history]]
- [[GET-v1-cash-flow-cards-69fdf5312c973ce220c447e7-properties]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-cash-flow-consolidated]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-financial-report]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-cash-flow-consolidated]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5312c973ce220c447e7-credit-analysis-cash-flow-productions]]

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
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |
| button | `button` | `` | button |

## Observações de QA

-
