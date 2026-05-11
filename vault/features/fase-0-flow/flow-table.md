---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/table"
path: "/pt/flow/67bf0dccb38591aeceff8121/table"
fase: 0
fase_nome: "Flow"
modulo: "Tabela"
topico: "Tabela"
crawledAt: "2026-05-08T18:26:20.630Z"
tags: [agflow, feature, fase-0, table]
---

# Tabela > Tabela

**Fase:** 0 — Flow
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/table`

![[flow-table.png]]

## Endpoints consumidos

- [[GET-events]]
- [[GET-v1-agrisk-notifications]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[GET-pt-home]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-board]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-form]]

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
| Adicionar colunas | `button:has-text("Adicionar colunas")` | `page.getByRole('button', { name: 'Adicionar colunas' })` | button |
| input | `#_r_7_` | `page.locator('#_r_7_')` | text |
| Código do card | `th:has-text("Código do card")` | `page.getByRole('button', { name: 'Código do card' })` | th |
| Título do card | `th:has-text("Título do card")` | `page.getByRole('button', { name: 'Título do card' })` | th |
| Identificador da fase atual | `th:has-text("Identificador da fase atual")` | `page.getByRole('button', { name: 'Identificador da fase atual' })` | th |
| Valor final | `th:has-text("Valor final")` | `page.getByRole('button', { name: 'Valor final' })` | th |
| Responsável | `th:has-text("Responsável")` | `page.getByRole('button', { name: 'Responsável' })` | th |
| Prazo da etapa | `th:has-text("Prazo da etapa")` | `page.getByRole('button', { name: 'Prazo da etapa' })` | th |
| Data de entrada na fase atual | `th:has-text("Data de entrada na fase atual")` | `page.getByRole('button', { name: 'Data de entrada na fase atual' })` | th |
| Quantidade de propriedades | `th:has-text("Quantidade de propriedades")` | `page.getByRole('button', { name: 'Quantidade de propriedades' })` | th |
| Área total de todas as propriedades | `th:has-text("Área total de todas as propriedades")` | `page.getByRole('button', { name: 'Área total de todas as propriedades' })` | th |
| Área produtiva total | `th:has-text("Área produtiva total")` | `page.getByRole('button', { name: 'Área produtiva total' })` | th |
| CPF/CNPJ da entidade econômica | `th:has-text("CPF/CNPJ da entidade econômica")` | `page.getByRole('button', { name: 'CPF/CNPJ da entidade econômica' })` | th |
| Nome do membro familiar | `th:has-text("Nome do membro familiar")` | `page.getByRole('button', { name: 'Nome do membro familiar' })` | th |
| #0000002411marcos - 1 mapeando agflow (Nao mover)Solicitações recebidas​R$ 1.111 | `tr:has-text("#0000002411marcos - 1 mapeando agflow (N")` | `page.getByRole('button', { name: '#0000002411marcos - 1 mapeando agflow (N' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002410marcos - teste filtros protestosSolicitações recebidas​R$ 1.111,00Não | `tr:has-text("#0000002410marcos - teste filtros protes")` | `page.getByRole('button', { name: '#0000002410marcos - teste filtros protes' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002408teste scr guiSolicitações recebidas​R$ 5.000,00Não informado​Venc.08/ | `tr:has-text("#0000002408teste scr guiSolicitações rec")` | `page.getByRole('button', { name: '#0000002408teste scr guiSolicitações rec' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002407marcos - teste starform externoSolicitações recebidas​R$ 2.222,22Não  | `tr:has-text("#0000002407marcos - teste starform exter")` | `page.getByRole('button', { name: '#0000002407marcos - teste starform exter' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002406marcos - teste criação formulário externoSolicitações recebidas​R$ 1. | `tr:has-text("#0000002406marcos - teste criação formul")` | `page.getByRole('button', { name: '#0000002406marcos - teste criação formul' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002402teste sse Solicitações recebidas​R$ 1.000,00Não informado​Venc.07/05/ | `tr:has-text("#0000002402teste sse Solicitações recebi")` | `page.getByRole('button', { name: '#0000002402teste sse Solicitações recebi' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002398marcos - teste filtro 5Solicitações recebidas​R$ 11,11Não informado​V | `tr:has-text("#0000002398marcos - teste filtro 5Solici")` | `page.getByRole('button', { name: '#0000002398marcos - teste filtro 5Solici' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002396marcos - teste filtro 4Solicitações recebidas​R$ 111,11Não informado​ | `tr:has-text("#0000002396marcos - teste filtro 4Solici")` | `page.getByRole('button', { name: '#0000002396marcos - teste filtro 4Solici' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002391teste sseSolicitações recebidas​R$ 100,00Não informado​Venc.01/05/202 | `tr:has-text("#0000002391teste sseSolicitações recebid")` | `page.getByRole('button', { name: '#0000002391teste sseSolicitações recebid' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000001591Teste formulário 3Solicitações recebidas​R$ 20.000,00Não informado​Ve | `tr:has-text("#0000001591Teste formulário 3Solicitaçõe")` | `page.getByRole('button', { name: '#0000001591Teste formulário 3Solicitaçõe' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002383RafaelSolicitações recebidas​R$ 1.234,56RRafael​Venc.26/04/2026140003 | `tr:has-text("#0000002383RafaelSolicitações recebidas​")` | `page.getByRole('button', { name: '#0000002383RafaelSolicitações recebidas​' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002382marcos - teste complianceSolicitações recebidas​R$ 1,11PRPaulo Robson | `tr:has-text("#0000002382marcos - teste complianceSoli")` | `page.getByRole('button', { name: '#0000002382marcos - teste complianceSoli' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002381NicodemosSolicitações recebidas​R$ 3.454,35Não informado​Venc.25/04/2 | `tr:has-text("#0000002381NicodemosSolicitações recebid")` | `page.getByRole('button', { name: '#0000002381NicodemosSolicitações recebid' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002374teste sse 2Solicitações recebidas​R$ 10.000,00Não informado​Venc.22/0 | `tr:has-text("#0000002374teste sse 2Solicitações receb")` | `page.getByRole('button', { name: '#0000002374teste sse 2Solicitações receb' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002373teste sseSolicitações recebidas​R$ 10.000,00Não informado​Venc.18/04/ | `tr:has-text("#0000002373teste sseSolicitações recebid")` | `page.getByRole('button', { name: '#0000002373teste sseSolicitações recebid' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002372Fábio teste usuario repetido 1Solicitações recebidas​R$ 12.341.241,24 | `tr:has-text("#0000002372Fábio teste usuario repetido ")` | `page.getByRole('button', { name: '#0000002372Fábio teste usuario repetido ' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002371marcos - teste balanço 13 Solicitações recebidas​R$ 1,11Não informado | `tr:has-text("#0000002371marcos - teste balanço 13 Sol")` | `page.getByRole('button', { name: '#0000002371marcos - teste balanço 13 Sol' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002368Teste consulta 1 BrunaSolicitações recebidas​R$ 7.412.589,63Não infor | `tr:has-text("#0000002368Teste consulta 1 BrunaSolicit")` | `page.getByRole('button', { name: '#0000002368Teste consulta 1 BrunaSolicit' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002367Teste consulta 1 MarcosSolicitações recebidas​R$ 124.235.436,56Não in | `tr:has-text("#0000002367Teste consulta 1 MarcosSolici")` | `page.getByRole('button', { name: '#0000002367Teste consulta 1 MarcosSolici' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |
| #0000002365Teste consulta 3 LudgeroSolicitações recebidas​R$ 74.125.895.623.696, | `tr:has-text("#0000002365Teste consulta 3 LudgeroSolic")` | `page.getByRole('button', { name: '#0000002365Teste consulta 3 LudgeroSolic' })` | tr |
| input | `input` | `` | input |
| input | `input` | `` | input |

## Observações de QA

-
