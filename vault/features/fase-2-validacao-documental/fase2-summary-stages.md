---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/summary/stages"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/summary/stages"
fase: 2
fase_nome: "Validação Documental"
modulo: "Resumo Geral"
topico: "Atividades da Etapa"
crawledAt: "2026-05-08T18:29:07.990Z"
tags: [agflow, feature, fase-2, summary]
---

# Resumo Geral > Atividades da Etapa

**Fase:** 2 — Validação Documental
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5492c973ce220c44844/summary/stages`

![[fase2-summary-stages.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-clients]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-history]]
- [[GET-v1-cards-69fdf5492c973ce220c44844-fields-phases-67bf1048b38591aeceff8de6]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-stages]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-registration]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5492c973ce220c44844-credit-analysis-financial-report]]

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
| adicionar responsável | `button:has-text("adicionar responsável")` | `page.getByRole('button', { name: 'adicionar responsável' })` | button |
| Visão Geral | `a:has-text("Visão Geral")` | `page.getByRole('a', { name: 'Visão Geral' })` | a |
| Atividades da etapa | `a:has-text("Atividades da etapa")` | `page.getByRole('a', { name: 'Atividades da etapa' })` | a |
| Ficha cadastral | `a:has-text("Ficha cadastral")` | `page.getByRole('a', { name: 'Ficha cadastral' })` | a |
| Histórico | `a:has-text("Histórico")` | `page.getByRole('a', { name: 'Histórico' })` | a |
| Solicitações recebidas | `button:has-text("Solicitações recebidas")` | `page.getByRole('tab', { name: 'Solicitações recebidas' })` | button |
| Validação documental | `button:has-text("Validação documental")` | `page.getByRole('tab', { name: 'Validação documental' })` | button |
| Pendência documental | `button:has-text("Pendência documental")` | `page.getByRole('tab', { name: 'Pendência documental' })` | button |
| Análise de crédito | `button:has-text("Análise de crédito")` | `page.getByRole('tab', { name: 'Análise de crédito' })` | button |
| Alçadas de aprovação | `button:has-text("Alçadas de aprovação")` | `page.getByRole('tab', { name: 'Alçadas de aprovação' })` | button |
| Crédito aprovado | `button:has-text("Crédito aprovado")` | `page.getByRole('tab', { name: 'Crédito aprovado' })` | button |
| Crédito reprovado | `button:has-text("Crédito reprovado")` | `page.getByRole('tab', { name: 'Crédito reprovado' })` | button |
| Salvar | `button:has-text("Salvar")` | `page.getByRole('button', { name: 'Salvar' })` | button |
| input | `input` | `` | input |
| textarea | `#_r_j_` | `page.locator('#_r_j_')` | textarea |
| textarea | `textarea` | `` | textarea |
| Mais detalhes | `a:has-text("Mais detalhes")` | `page.getByRole('a', { name: 'Mais detalhes' })` | a |

## Observações de QA

-
