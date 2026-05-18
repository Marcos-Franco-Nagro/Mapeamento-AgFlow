---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/comments"
status: 201
tags: [endpoint, agflow, card, comentario, adicionar-comentario]
---

# POST https://api.agflow.agrisk.dev/v1/cards/6a05bfccf3e4ddc495eb845e/comments

## Observações

-
---

## Swagger

**Operação:** `CardController_CreateComment`

**Resumo:** Cadastrar comentário

**Descrição:** Rota responsável pelo cadastro de um comentário.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `text` | string | ✓ |  |

### Response

