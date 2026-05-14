---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf5782c973ce220c44940/history?offset=0&limit=10"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf5782c973ce220c44940/history?offset=0&limit=10

## Features que consomem este endpoint

- [[fase4-credit-analysis-financial-report]]

## Observações

-
---

## Swagger

**Operação:** `CardController_findAllHistorys`

**Resumo:** Visualizar histórico

**Descrição:** Rota responsável pela visualização do histórico de atualizações de um card.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `offset` | query | number |  |  |
| `limit` | query | number |  |  |
| `type` | query | string |  |  |

### Response — History card

