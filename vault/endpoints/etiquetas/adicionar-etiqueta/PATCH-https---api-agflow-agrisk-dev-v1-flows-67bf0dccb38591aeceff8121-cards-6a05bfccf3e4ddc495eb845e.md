---
method: PATCH
url: "https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/cards/6a05bfccf3e4ddc495eb845e"
status: 200
tags: [endpoint, agflow, card, etiquetas, adicionar-etiqueta]
---

# PATCH https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/cards/6a05bfccf3e4ddc495eb845e

## Observações

-
---

## Swagger

**Operação:** `FlowController_updateCard`

**Resumo:** Atualizar oportunidade

**Descrição:** Rota responsável pela atualização de uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `id` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `labels` | array | ✓ |  |
| `dueDate` | string | ✓ |  |

### Response

