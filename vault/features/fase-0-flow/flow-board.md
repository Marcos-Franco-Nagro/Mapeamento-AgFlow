---
url: "https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/board"
path: "/pt/flow/67bf0dccb38591aeceff8121/board"
fase: 0
fase_nome: "Flow"
modulo: "Quadro (Board)"
topico: "Quadro (Board)"
crawledAt: "2026-05-08T18:26:14.924Z"
tags: [agflow, feature, fase-0, board]
---

# Quadro (Board) > Quadro (Board)

**Fase:** 0 — Flow
**URL:** `https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/board`

![[flow-board.png]]

## Endpoints consumidos

- [[GET-v1-agrisk-notifications]]
- [[GET-events]]
- [[GET-pt-home]]
- [[GET-v1-flows-67bf0dccb38591aeceff8121]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf1082b38591aeceff8ee3-cards]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-form]]
- [[GET-pt-flow-67bf0dccb38591aeceff8121-table]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf1048b38591aeceff8de6-cards]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf11b6b38591aeceff969b-cards]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf0e91b38591aeceff84a8-cards]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf118eb38591aeceff95aa-cards]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf10abb38591aeceff8f75-cards]]
- [[POST-api-flows-67bf0dccb38591aeceff8121-phases-67bf114fb38591aeceff94fa-cards]]

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
| input | `#_r_c_` | `page.locator('#_r_c_')` | text |
| 0#0000002411marcos - 1 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `a:has-text("0#0000002411marcos - 1 mapeando agflow (")` | `page.getByRole('a', { name: '0#0000002411marcos - 1 mapeando agflow (' })` | a |
| 0#0000002411marcos - 1 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 0#0000002410marcos - teste filtros protestosR$ 1.111,00Venc.09/05/2026 | `a:has-text("0#0000002410marcos - teste filtros prote")` | `page.getByRole('a', { name: '0#0000002410marcos - teste filtros prote' })` | a |
| 0#0000002410marcos - teste filtros protestosR$ 1.111,00Venc.09/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 1#0000002408teste scr guiR$ 5.000,00Venc.08/05/2026 | `a:has-text("1#0000002408teste scr guiR$ 5.000,00Venc")` | `page.getByRole('a', { name: '1#0000002408teste scr guiR$ 5.000,00Venc' })` | a |
| 1#0000002408teste scr guiR$ 5.000,00Venc.08/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 1#0000002407marcos - teste starform externoR$ 2.222,22Venc.08/05/2026 | `a:has-text("1#0000002407marcos - teste starform exte")` | `page.getByRole('a', { name: '1#0000002407marcos - teste starform exte' })` | a |
| 1#0000002407marcos - teste starform externoR$ 2.222,22Venc.08/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 1#0000002406marcos - teste criação formulário externoR$ 1.111,11Venc.08/05/2026 | `a:has-text("1#0000002406marcos - teste criação formu")` | `page.getByRole('a', { name: '1#0000002406marcos - teste criação formu' })` | a |
| 1#0000002406marcos - teste criação formulário externoR$ 1.111,11Venc.08/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 2#0000002402teste sse R$ 1.000,00Venc.07/05/2026 | `a:has-text("2#0000002402teste sse R$ 1.000,00Venc.07")` | `page.getByRole('a', { name: '2#0000002402teste sse R$ 1.000,00Venc.07' })` | a |
| 2#0000002402teste sse R$ 1.000,00Venc.07/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 8#0000002398marcos - teste filtro 5R$ 11,11Venc.02/05/2026 | `a:has-text("8#0000002398marcos - teste filtro 5R$ 11")` | `page.getByRole('a', { name: '8#0000002398marcos - teste filtro 5R$ 11' })` | a |
| 8#0000002398marcos - teste filtro 5R$ 11,11Venc.02/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 8#0000002396marcos - teste filtro 4R$ 111,11Venc.02/05/2026 | `a:has-text("8#0000002396marcos - teste filtro 4R$ 11")` | `page.getByRole('a', { name: '8#0000002396marcos - teste filtro 4R$ 11' })` | a |
| 8#0000002396marcos - teste filtro 4R$ 111,11Venc.02/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 9#0000002391teste sseR$ 100,00Venc.01/05/2026 | `a:has-text("9#0000002391teste sseR$ 100,00Venc.01/05")` | `page.getByRole('a', { name: '9#0000002391teste sseR$ 100,00Venc.01/05' })` | a |
| 9#0000002391teste sseR$ 100,00Venc.01/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR9#0000001591Teste formulário 3R$ 20.000,00Venc.01/05/2026 | `a:has-text("TR9#0000001591Teste formulário 3R$ 20.00")` | `page.getByRole('a', { name: 'TR9#0000001591Teste formulário 3R$ 20.00' })` | a |
| TR9#0000001591Teste formulário 3R$ 20.000,00Venc.01/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 0#0000002412marcos - 2 mapeando agflow (Nao mover)R$ 1.111,11Venc.12/05/2026 | `a:has-text("0#0000002412marcos - 2 mapeando agflow (")` | `page.getByRole('a', { name: '0#0000002412marcos - 2 mapeando agflow (' })` | a |
| 0#0000002412marcos - 2 mapeando agflow (Nao mover)R$ 1.111,11Venc.12/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 2#0000002403teste sse 2R$ 10,00Venc.09/05/2026 | `a:has-text("2#0000002403teste sse 2R$ 10,00Venc.09/0")` | `page.getByRole('a', { name: '2#0000002403teste sse 2R$ 10,00Venc.09/0' })` | a |
| 2#0000002403teste sse 2R$ 10,00Venc.09/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TO94#0000001121Joao VictorR$ 3.232,13Venc.07/02/2026 | `a:has-text("TO94#0000001121Joao VictorR$ 3.232,13Ven")` | `page.getByRole('a', { name: 'TO94#0000001121Joao VictorR$ 3.232,13Ven' })` | a |
| TO94#0000001121Joao VictorR$ 3.232,13Venc.07/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 94#0000001122João VictorR$ 32.323.213,12Venc.07/02/2026 | `a:has-text("94#0000001122João VictorR$ 32.323.213,12")` | `page.getByRole('a', { name: '94#0000001122João VictorR$ 32.323.213,12' })` | a |
| 94#0000001122João VictorR$ 32.323.213,12Venc.07/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 94#0000001211testeR$ 12.345,66Venc.06/02/2026 | `a:has-text("94#0000001211testeR$ 12.345,66Venc.06/02")` | `page.getByRole('a', { name: '94#0000001211testeR$ 12.345,66Venc.06/02' })` | a |
| 94#0000001211testeR$ 12.345,66Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| JV94#0000000965testeR$ 323,21Venc.06/02/2026 | `a:has-text("JV94#0000000965testeR$ 323,21Venc.06/02/")` | `page.getByRole('a', { name: 'JV94#0000000965testeR$ 323,21Venc.06/02/' })` | a |
| JV94#0000000965testeR$ 323,21Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| RM94#0000001120Daniel RodriguesR$ 200.000,00Venc.06/02/2026 | `a:has-text("RM94#0000001120Daniel RodriguesR$ 200.00")` | `page.getByRole('a', { name: 'RM94#0000001120Daniel RodriguesR$ 200.00' })` | a |
| RM94#0000001120Daniel RodriguesR$ 200.000,00Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TO94#0000001000TesteR$ 123,00Venc.06/02/2026 | `a:has-text("TO94#0000001000TesteR$ 123,00Venc.06/02/")` | `page.getByRole('a', { name: 'TO94#0000001000TesteR$ 123,00Venc.06/02/' })` | a |
| TO94#0000001000TesteR$ 123,00Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 94#0000001405Maria Julia GasparelliR$ 200.000,00Venc.06/02/2026 | `a:has-text("94#0000001405Maria Julia GasparelliR$ 20")` | `page.getByRole('a', { name: '94#0000001405Maria Julia GasparelliR$ 20' })` | a |
| 94#0000001405Maria Julia GasparelliR$ 200.000,00Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 94#0000001032teste jv 2R$ 32.132,13Venc.06/02/2026 | `a:has-text("94#0000001032teste jv 2R$ 32.132,13Venc.")` | `page.getByRole('a', { name: '94#0000001032teste jv 2R$ 32.132,13Venc.' })` | a |
| 94#0000001032teste jv 2R$ 32.132,13Venc.06/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 0#0000002418marcos - 3 mapeando o agflow (Nao mover)R$ 1.111,11Venc.11/05/2026 | `a:has-text("0#0000002418marcos - 3 mapeando o agflow")` | `page.getByRole('a', { name: '0#0000002418marcos - 3 mapeando o agflow' })` | a |
| 0#0000002418marcos - 3 mapeando o agflow (Nao mover)R$ 1.111,11Venc.11/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR0#0000002414marcos - 4 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `a:has-text("TR0#0000002414marcos - 4 mapeando agflow")` | `page.getByRole('a', { name: 'TR0#0000002414marcos - 4 mapeando agflow' })` | a |
| TR0#0000002414marcos - 4 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR23#0000002357GUBERSON REAL V2R$ 1.231.231,23Venc.17/04/2026 | `a:has-text("TR23#0000002357GUBERSON REAL V2R$ 1.231.")` | `page.getByRole('a', { name: 'TR23#0000002357GUBERSON REAL V2R$ 1.231.' })` | a |
| TR23#0000002357GUBERSON REAL V2R$ 1.231.231,23Venc.17/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR23#0000002351fabio teste balanço e dre 2R$ 12.332,21Venc.17/04/2026 | `a:has-text("TR23#0000002351fabio teste balanço e dre")` | `page.getByRole('a', { name: 'TR23#0000002351fabio teste balanço e dre' })` | a |
| TR23#0000002351fabio teste balanço e dre 2R$ 12.332,21Venc.17/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR23#0000002350marcos - teste balanço 8R$ 0,11Venc.17/04/2026 | `a:has-text("TR23#0000002350marcos - teste balanço 8R")` | `page.getByRole('a', { name: 'TR23#0000002350marcos - teste balanço 8R' })` | a |
| TR23#0000002350marcos - teste balanço 8R$ 0,11Venc.17/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 23#0000002349marco - teste balanço 7R$ 111,11Venc.17/04/2026 | `a:has-text("23#0000002349marco - teste balanço 7R$ 1")` | `page.getByRole('a', { name: '23#0000002349marco - teste balanço 7R$ 1' })` | a |
| 23#0000002349marco - teste balanço 7R$ 111,11Venc.17/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR29#0000002267Fabio teste balanço dre 1R$ 1.231,23Venc.11/04/2026 | `a:has-text("TR29#0000002267Fabio teste balanço dre 1")` | `page.getByRole('a', { name: 'TR29#0000002267Fabio teste balanço dre 1' })` | a |
| TR29#0000002267Fabio teste balanço dre 1R$ 1.231,23Venc.11/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR31#0000002263marcos - teste balanço 5R$ 0,08Venc.09/04/2026 | `a:has-text("TR31#0000002263marcos - teste balanço 5R")` | `page.getByRole('a', { name: 'TR31#0000002263marcos - teste balanço 5R' })` | a |
| TR31#0000002263marcos - teste balanço 5R$ 0,08Venc.09/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR31#0000001282Teste Atualização CampoR$ 100,00Venc.09/04/2026 | `a:has-text("TR31#0000001282Teste Atualização CampoR$")` | `page.getByRole('a', { name: 'TR31#0000001282Teste Atualização CampoR$' })` | a |
| TR31#0000001282Teste Atualização CampoR$ 100,00Venc.09/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR32#0000002248marcos - teste balançoR$ 10,00Venc.08/04/2026 | `a:has-text("TR32#0000002248marcos - teste balançoR$ ")` | `page.getByRole('a', { name: 'TR32#0000002248marcos - teste balançoR$ ' })` | a |
| TR32#0000002248marcos - teste balançoR$ 10,00Venc.08/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR39#0000002206teste campos agriskR$ 1.231.231,23Venc.01/04/2026 | `a:has-text("TR39#0000002206teste campos agriskR$ 1.2")` | `page.getByRole('a', { name: 'TR39#0000002206teste campos agriskR$ 1.2' })` | a |
| TR39#0000002206teste campos agriskR$ 1.231.231,23Venc.01/04/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR0#0000002415marcos - 5 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `a:has-text("TR0#0000002415marcos - 5 mapeando agflow")` | `page.getByRole('a', { name: 'TR0#0000002415marcos - 5 mapeando agflow' })` | a |
| TR0#0000002415marcos - 5 mapeando agflow (Nao mover)R$ 1.111,11Venc.10/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR9#0000002262marcos - teste balanço 4R$ 1.111,11Venc.01/05/2026 | `a:has-text("TR9#0000002262marcos - teste balanço 4R$")` | `page.getByRole('a', { name: 'TR9#0000002262marcos - teste balanço 4R$' })` | a |
| TR9#0000002262marcos - teste balanço 4R$ 1.111,11Venc.01/05/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 46#0000002151teste evelinR$ 232,13Venc.25/03/2026 | `a:has-text("46#0000002151teste evelinR$ 232,13Venc.2")` | `page.getByRole('a', { name: '46#0000002151teste evelinR$ 232,13Venc.2' })` | a |
| 46#0000002151teste evelinR$ 232,13Venc.25/03/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR50#0000002161teste disparo cumulativa 2R$ 120.000,00Venc.21/03/2026 | `a:has-text("TR50#0000002161teste disparo cumulativa ")` | `page.getByRole('a', { name: 'TR50#0000002161teste disparo cumulativa ' })` | a |
| TR50#0000002161teste disparo cumulativa 2R$ 120.000,00Venc.21/03/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR50#0000002160teste disparo cumulativaR$ 120.000,00Venc.21/03/2026 | `a:has-text("TR50#0000002160teste disparo cumulativaR")` | `page.getByRole('a', { name: 'TR50#0000002160teste disparo cumulativaR' })` | a |
| TR50#0000002160teste disparo cumulativaR$ 120.000,00Venc.21/03/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR74#0000002029Teste Mensagem 2R$ 115.000,00Venc.25/02/2026 | `a:has-text("TR74#0000002029Teste Mensagem 2R$ 115.00")` | `page.getByRole('a', { name: 'TR74#0000002029Teste Mensagem 2R$ 115.00' })` | a |
| TR74#0000002029Teste Mensagem 2R$ 115.000,00Venc.25/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR76#0000002015teste reduzir caracteresR$ 120.000,00Venc.22/02/2026 | `a:has-text("TR76#0000002015teste reduzir caracteresR")` | `page.getByRole('a', { name: 'TR76#0000002015teste reduzir caracteresR' })` | a |
| TR76#0000002015teste reduzir caracteresR$ 120.000,00Venc.22/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR76#0000002014teste gui 2R$ 100.000,02Venc.22/02/2026 | `a:has-text("TR76#0000002014teste gui 2R$ 100.000,02V")` | `page.getByRole('a', { name: 'TR76#0000002014teste gui 2R$ 100.000,02V' })` | a |
| TR76#0000002014teste gui 2R$ 100.000,02Venc.22/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR76#0000002012teste guiR$ 120.000,00Venc.22/02/2026 | `a:has-text("TR76#0000002012teste guiR$ 120.000,00Ven")` | `page.getByRole('a', { name: 'TR76#0000002012teste guiR$ 120.000,00Ven' })` | a |
| TR76#0000002012teste guiR$ 120.000,00Venc.22/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR77#0000002010teste guiR$ 120.000,00Venc.22/02/2026 | `a:has-text("TR77#0000002010teste guiR$ 120.000,00Ven")` | `page.getByRole('a', { name: 'TR77#0000002010teste guiR$ 120.000,00Ven' })` | a |
| TR77#0000002010teste guiR$ 120.000,00Venc.22/02/2026 | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR0#0000002416marcos - 6 mapeando agflow (Nao mover)R$ 1.111,11Aprovado | `a:has-text("TR0#0000002416marcos - 6 mapeando agflow")` | `page.getByRole('a', { name: 'TR0#0000002416marcos - 6 mapeando agflow' })` | a |
| TR0#0000002416marcos - 6 mapeando agflow (Nao mover)R$ 1.111,11Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR1#0000002268marcos - teste balanço 6R$ 1.000,00Aprovado | `a:has-text("TR1#0000002268marcos - teste balanço 6R$")` | `page.getByRole('a', { name: 'TR1#0000002268marcos - teste balanço 6R$' })` | a |
| TR1#0000002268marcos - teste balanço 6R$ 1.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 16#0000001422Teste alçadasR$ 100.000,00Aprovado | `a:has-text("16#0000001422Teste alçadasR$ 100.000,00A")` | `page.getByRole('a', { name: '16#0000001422Teste alçadasR$ 100.000,00A' })` | a |
| 16#0000001422Teste alçadasR$ 100.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD192#0000001248MARIANA AMORIMR$ 160.000,00Aprovado | `a:has-text("AD192#0000001248MARIANA AMORIMR$ 160.000")` | `page.getByRole('a', { name: 'AD192#0000001248MARIANA AMORIMR$ 160.000' })` | a |
| AD192#0000001248MARIANA AMORIMR$ 160.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 192#0000001021Daniel RodriguesR$ 210,00Aprovado | `a:has-text("192#0000001021Daniel RodriguesR$ 210,00A")` | `page.getByRole('a', { name: '192#0000001021Daniel RodriguesR$ 210,00A' })` | a |
| 192#0000001021Daniel RodriguesR$ 210,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD196#0000001187Amanda Freitas SoaresR$ 500.000,00Aprovado | `a:has-text("AD196#0000001187Amanda Freitas SoaresR$ ")` | `page.getByRole('a', { name: 'AD196#0000001187Amanda Freitas SoaresR$ ' })` | a |
| AD196#0000001187Amanda Freitas SoaresR$ 500.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD199#0000001133Amanda Freitas SoaresR$ 600.000,00Aprovado | `a:has-text("AD199#0000001133Amanda Freitas SoaresR$ ")` | `page.getByRole('a', { name: 'AD199#0000001133Amanda Freitas SoaresR$ ' })` | a |
| AD199#0000001133Amanda Freitas SoaresR$ 600.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD205#0000001049MARIANA AMORIMR$ 170.000,00Aprovado | `a:has-text("AD205#0000001049MARIANA AMORIMR$ 170.000")` | `page.getByRole('a', { name: 'AD205#0000001049MARIANA AMORIMR$ 170.000' })` | a |
| AD205#0000001049MARIANA AMORIMR$ 170.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD206#0000001035Davi Pereira VidotoR$ 300.000,00Aprovado | `a:has-text("AD206#0000001035Davi Pereira VidotoR$ 30")` | `page.getByRole('a', { name: 'AD206#0000001035Davi Pereira VidotoR$ 30' })` | a |
| AD206#0000001035Davi Pereira VidotoR$ 300.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD210#0000001023Amanda Freitas SoaresR$ 400.000,00Aprovado | `a:has-text("AD210#0000001023Amanda Freitas SoaresR$ ")` | `page.getByRole('a', { name: 'AD210#0000001023Amanda Freitas SoaresR$ ' })` | a |
| AD210#0000001023Amanda Freitas SoaresR$ 400.000,00Aprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR0#0000002417marcos - 7 mapeando agflow (Nao mover)R$ 1.111,11Reprovado | `a:has-text("TR0#0000002417marcos - 7 mapeando agflow")` | `page.getByRole('a', { name: 'TR0#0000002417marcos - 7 mapeando agflow' })` | a |
| TR0#0000002417marcos - 7 mapeando agflow (Nao mover)R$ 1.111,11Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 1#0000002354marcos - teste balanço 9R$ 1.000,00Reprovado | `a:has-text("1#0000002354marcos - teste balanço 9R$ 1")` | `page.getByRole('a', { name: '1#0000002354marcos - teste balanço 9R$ 1' })` | a |
| 1#0000002354marcos - teste balanço 9R$ 1.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| TR1#0000002392marcos - teste filtroR$ 1.000,00Reprovado | `a:has-text("TR1#0000002392marcos - teste filtroR$ 1.")` | `page.getByRole('a', { name: 'TR1#0000002392marcos - teste filtroR$ 1.' })` | a |
| TR1#0000002392marcos - teste filtroR$ 1.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 16#0000001642Daniel RodriguesR$ 200.000,00Reprovado | `a:has-text("16#0000001642Daniel RodriguesR$ 200.000,")` | `page.getByRole('a', { name: '16#0000001642Daniel RodriguesR$ 200.000,' })` | a |
| 16#0000001642Daniel RodriguesR$ 200.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| VD118#0000000915Teste Alçada - GuilhermeR$ 1.000,00Reprovado | `a:has-text("VD118#0000000915Teste Alçada - Guilherme")` | `page.getByRole('a', { name: 'VD118#0000000915Teste Alçada - Guilherme' })` | a |
| VD118#0000000915Teste Alçada - GuilhermeR$ 1.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| 118#0000000940JOAQUIM CARVALHO MOTTA JUNIORR$ 170.000,00Reprovado | `a:has-text("118#0000000940JOAQUIM CARVALHO MOTTA JUN")` | `page.getByRole('a', { name: '118#0000000940JOAQUIM CARVALHO MOTTA JUN' })` | a |
| 118#0000000940JOAQUIM CARVALHO MOTTA JUNIORR$ 170.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| VD118#0000000935CLAUDIA YUMI ABIKO SAKAGUTIR$ 120.000,00Reprovado | `a:has-text("VD118#0000000935CLAUDIA YUMI ABIKO SAKAG")` | `page.getByRole('a', { name: 'VD118#0000000935CLAUDIA YUMI ABIKO SAKAG' })` | a |
| VD118#0000000935CLAUDIA YUMI ABIKO SAKAGUTIR$ 120.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD119#0000000964Amanda Freitas SoaresR$ 60.000,00Reprovado | `a:has-text("AD119#0000000964Amanda Freitas SoaresR$ ")` | `page.getByRole('a', { name: 'AD119#0000000964Amanda Freitas SoaresR$ ' })` | a |
| AD119#0000000964Amanda Freitas SoaresR$ 60.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD119#0000000947ARGEMIRO VICENTE LOPES JUNIORR$ 170.000,00Reprovado | `a:has-text("AD119#0000000947ARGEMIRO VICENTE LOPES J")` | `page.getByRole('a', { name: 'AD119#0000000947ARGEMIRO VICENTE LOPES J' })` | a |
| AD119#0000000947ARGEMIRO VICENTE LOPES JUNIORR$ 170.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| AD119#0000000959Amanda Freitas SoaresR$ 120.000,00Reprovado | `a:has-text("AD119#0000000959Amanda Freitas SoaresR$ ")` | `page.getByRole('a', { name: 'AD119#0000000959Amanda Freitas SoaresR$ ' })` | a |
| AD119#0000000959Amanda Freitas SoaresR$ 120.000,00Reprovado | `[data-testid="draggable-card"]` | `page.getByTestId('draggable-card')` | div |
| Nova solicitação | `button:has-text("Nova solicitação")` | `page.getByRole('button', { name: 'Nova solicitação' })` | button |

## Observações de QA

-
