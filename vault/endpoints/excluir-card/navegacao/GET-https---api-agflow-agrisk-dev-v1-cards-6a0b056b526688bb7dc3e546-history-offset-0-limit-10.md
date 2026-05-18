---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/6a0b056b526688bb7dc3e546/history?offset=0&limit=10"
status: 200
tags: [endpoint, agflow, card, excluir-card, navegacao]
---

# GET https://api.agflow.agrisk.dev/v1/cards/6a0b056b526688bb7dc3e546/history?offset=0&limit=10

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

