---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf72b2c973ce220c45ead/phases/67bf118eb38591aeceff95aa/actions/opinion"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf72b2c973ce220c45ead/phases/67bf118eb38591aeceff95aa/actions/opinion

## Features que consomem este endpoint

- [[fase6-credit-analysis-credit-opinion]]

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

