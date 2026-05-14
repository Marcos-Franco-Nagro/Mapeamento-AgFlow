---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf6192c973ce220c45316/phases/67bf114fb38591aeceff94fa/actions/opinion"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf6192c973ce220c45316/phases/67bf114fb38591aeceff94fa/actions/opinion

## Features que consomem este endpoint

- [[fase5-agrisk-judicial]]

## Observações

-
---

## Swagger

**Operação:** `CardController_findOpinion`

**Resumo:** Visualizar parecer de crédito

**Descrição:** Rota responsável pela visualização do parecer de crédito.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `phaseId` | path | string | ✓ |  |

### Response — Card opinion

