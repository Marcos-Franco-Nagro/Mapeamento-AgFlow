---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/form"
path: "/pt/flow/67bf0dccb38591aeceff8121/form"
fase: 0
fase_nome: "Flow"
modulo: "Formulário (StartForm)"
topico: "Formulário (StartForm)"
crawledAt: "2026-05-08T18:26:24.162Z"
tags: [agflow, feature, fase-0, form]
---

# Formulário (StartForm) > Formulário (StartForm)

**Fase:** 0 — Flow
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/form`

![[flow-form.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-pt-home]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-table]]

## Elementos interativos

| Elemento | Seletor CSS | Locator Playwright | Tipo |
|----------|-------------|-------------------|------|
| a | `a` | `` | a |
| button | `[data-testid="back-button"]` | `page.getByTestId('back-button')` | button |
| button | `[aria-label="Funil de crédito - Comercial"]` | `page.getByRole('button', { name: 'Funil de crédito - Comercial' })` | button |
| button | `[data-testid="setting-button"]` | `page.getByTestId('setting-button')` | button |
| MF | `button:has-text("MF")` | `page.getByRole('button', { name: 'MF' })` | button |
| Quadro | `a:has-text("Quadro")` | `page.getByRole('a', { name: 'Quadro' })` | a |
| Tabela | `a:has-text("Tabela")` | `page.getByRole('a', { name: 'Tabela' })` | a |
| Formulário | `a:has-text("Formulário")` | `page.getByRole('a', { name: 'Formulário' })` | a |
| 1Filtrar | `button:has-text("1Filtrar")` | `page.getByRole('button', { name: '1Filtrar' })` | button |
| input | `#_r_14_` | `page.locator('#_r_14_')` | text |
| input | `input` | `` | input |
| input | `#_r_5_` | `page.locator('#_r_5_')` | default_name |
| input | `#_r_7_` | `page.locator('#_r_7_')` | default_document |
| button | `button` | `` | button |
| input | `#_r_a_` | `page.locator('#_r_a_')` | currency |
| input | `input` | `` | input |
| input | `input` | `` | input |
| input | `#_r_i_` | `page.locator('#_r_i_')` | number |
| input | `#_r_k_` | `page.locator('#_r_k_')` | number |
| input | `[data-testid="file-upload"]` | `page.getByTestId('file-upload')` | file |
| input | `[data-testid="file-upload"]` | `page.getByTestId('file-upload')` | file |
| input | `#_r_o_` | `page.locator('#_r_o_')` | text |
| input | `#_r_q_` | `page.locator('#_r_q_')` | email |
| input | `#_r_s_` | `page.locator('#_r_s_')` | phone |
| textarea | `#_r_u_` | `page.locator('#_r_u_')` | textarea |
| textarea | `textarea` | `` | textarea |
| Solicitar análise | `button:has-text("Solicitar análise")` | `page.getByRole('button', { name: 'Solicitar análise' })` | submit |

## Observações de QA

-
