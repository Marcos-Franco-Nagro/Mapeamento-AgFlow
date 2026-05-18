---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/comments?limit=10&offset=0&active=true"
status: 200
tags: [endpoint, agflow, card, comentario, adicionar-comentario]
---

# GET https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/comments?limit=10&offset=0&active=true

## Observações

-
---

## Swagger

**Operação:** `CardController_findAllComments`

**Resumo:** Listar comentários

**Descrição:** Rota responsável pela listagem dos comentários.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `offset` | query | number |  |  |
| `limit` | query | number |  |  |
| `active` | query | boolean |  |  |

### Response — List comments pagination

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `items` | array | ✓ |  |
