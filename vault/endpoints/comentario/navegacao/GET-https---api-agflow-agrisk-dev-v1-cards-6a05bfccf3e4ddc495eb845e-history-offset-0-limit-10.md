---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/history?offset=0&limit=10"
status: 200
tags: [endpoint, agflow, card, comentario, navegacao]
---

# GET https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/history?offset=0&limit=10

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

