---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/stages"
path: "/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/stages"
fase: 4
fase_nome: "Análise de Crédito"
modulo: "Resumo Geral"
topico: "Atividades da Etapa"
crawledAt: "2026-05-08T18:34:05.923Z"
tags: [agflow, feature, fase-4, summary]
---

# Resumo Geral > Atividades da Etapa

**Fase:** 4 — Análise de Crédito
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/69fdf5782c973ce220c44940/summary/stages`

![[fase4-summary-stages.png]]

## Endpoints consumidos

- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-phases-67bf10abb38591aeceff8f75-actions-opinion]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-clients]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-fields-phases-67bf10abb38591aeceff8f75]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-history]]
- [[GET-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121-credit-engine-policies-cards-69fdf5782c973ce220c44940-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-overview]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-documents]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-agrisk-register]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-credit-analysis-radar]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-history]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-card-69fdf5782c973ce220c44940-summary-registration]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c]]
- [[GET-v1-cards-69fdf5782c973ce220c44940-actions-credit-engine-policies-68e6c392a1bd089ba12aedfc-clients-69c18b48bc333a6ce8784a5c-inputs]]

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
| TRTeste Responsável | `button:has-text("TRTeste Responsável")` | `page.getByRole('button', { name: 'TRTeste Responsável' })` | button |
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
| input | `#_r_t_` | `page.locator('#_r_t_')` | number |
| input | `#_r_v_` | `page.locator('#_r_v_')` | number |
| input | `#_r_11_` | `page.locator('#_r_11_')` | number |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `input` | `` | input |
| Gerar análise | `a:has-text("Gerar análise")` | `page.getByRole('a', { name: 'Gerar análise' })` | a |
| Acessar | `a:has-text("Acessar")` | `page.getByRole('a', { name: 'Acessar' })` | a |
| Acessar | `a:has-text("Acessar")` | `page.getByRole('a', { name: 'Acessar' })` | a |
| Mais detalhes | `a:has-text("Mais detalhes")` | `page.getByRole('a', { name: 'Mais detalhes' })` | a |

## Observações de QA

-
